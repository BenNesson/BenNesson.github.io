/// <reference path="../core/onebusaway.interop.js" />

var urlParams = {
    "minutesBefore": 5,
    "minutesAfter": 35,
    "refreshRate": 10,
    "key": "TEST"
};
(window.onpopstate = function() {
    var match,
        pl = /\+/g,
        search = /([^&=]+)=?([^&]*)/g,
        decode = function(s) { return decodeURIComponent(s.replace(pl, " ")); },
        query = window.location.search.substring(1);

    while (match = search.exec(query)) {
        urlParams[decode(match[1])] = decode(match[2]);
    }
})();

function Launch() {
    QueryStopInfo(urlParams["stopId"]);
    Update();
}

function Update() {
    if (updateTimeout) {
        clearTimeout(updateTimeout);
    }
    QueryStop(urlParams["stopId"]);
}

function formatMillisecondTimespan(milliseconds){
    var isNegative = false;
    if (milliseconds < 0) {
        isNegative = true;
        milliseconds = -milliseconds;
    }
    var diff = new Date(milliseconds);
    var totalMinutes = diff.getUTCHours() * 60 
                     + diff.getUTCMinutes();
    var totalSeconds = diff.getUTCSeconds();
    return (isNegative ? "-" : "") + totalMinutes + (totalSeconds < 10 ? ":0" : ":") + totalSeconds;
}

function isActuallyPredicted(arrival) {
    return arrival.predicted && arrival.predictedArrivalTime != 0;
}

let maxTimeToLive = 20;
function createCacheNode(arrival) {
    return {
        a: arrival,
        ttl: maxTimeToLive,
        get: function (update) {
            this.ttl = maxTimeToLive;
            if (isActuallyPredicted(update) && update.lastUpdateTime > this.a.lastUpdateTime) {
                this.a = update;
            }
            return this.a;
        }
    }
}

var cache = new Map();
function getLatestData(currentTime, arrival) {
    let tripId = arrival.tripId;
    if (!cache.has(tripId)) {
        cache.set(tripId, createCacheNode(arrival));
    }

    return cache.get(tripId).get(arrival);
}

function keepCacheFresh() {
    let staleKeys = [];
    for (let kvp of cache.entries()) {
        if (kvp[1].ttl <= 0) {
            staleKeys.push(kvp[0]);
        } else {
            kvp[1].ttl--;
        }
    }
    for (let key of staleKeys) {
        cache.delete(key);
    }
}

function generateRowForArrival(currentTime, arrival) {
    let latestArrival = getLatestData(currentTime, arrival);
    var row = document.createElement("TR");
    var routeCell = document.createElement("TD");
    var vehicleCell = document.createElement("TD");
    var arrivalTimeCell = document.createElement("TD");
    var departureTimeCell = document.createElement("TD");
    var howLateCell = document.createElement("TD");
    var howOldCell = document.createElement("TD");
    row.appendChild(routeCell);
    row.appendChild(vehicleCell);
    row.appendChild(arrivalTimeCell);
    row.appendChild(howLateCell);
    row.appendChild(howOldCell);

    routeCell.innerHTML = latestArrival.routeShortName;
    vehicleCell.innerHTML = latestArrival.vehicleId;

    let actuallyPredicted = isActuallyPredicted(latestArrival);
    var arrivalTime = actuallyPredicted ? latestArrival.predictedArrivalTime : latestArrival.scheduledArrivalTime;
    arrivalTimeCell.innerHTML = formatMillisecondTimespan(arrivalTime - currentTime);
    if (actuallyPredicted) {
        var threshold = 30 * 1000;
        var howLate = latestArrival.predictedArrivalTime - latestArrival.scheduledArrivalTime;
        var latenessClass = "on-time";
        if (howLate < 0) {
            latenessClass = "early";
        } else if (howLate > threshold) {
            latenessClass = "late";
        }
        row.setAttribute("class", latenessClass);
        howLateCell.innerHTML = formatMillisecondTimespan(howLate);
        howOldCell.innerHTML = formatMillisecondTimespan(currentTime - latestArrival.tripStatus.lastUpdateTime);
    } else {
        howLateCell.innerHTML = "???";
        howLateCell.setAttribute("class", "no-prediction");
        howOldCell.innerHTML = "???";
        howOldCell.setAttribute("class", "no-prediction");
    }
    return row;
}

var debugDiv;
function debug(msg) {
    if (typeof debugDiv === 'undefined') {
        debugDiv = document.getElementById('debug');
    }
    debugDiv.innerHTML += ("<br />" + msg);
}

var updateTimeout;

function QueryStop(stopId) {
    OBA.api_request(
        {
            method: "arrivals-and-departures-for-stop",
            id: stopId,
            params: {
                key: urlParams["key"],
                minutesBefore: urlParams["minutesBefore"],
                minutesAfter: urlParams["minutesAfter"],
                includeReferences: false,
                dummy: new Date().getTime()
            },
            callback: function (response) {
                LoadStop(response);
                updateTimeout = setTimeout(Update, urlParams["refreshRate"] * 1000);
            }
        }
    );
}

function LoadStopInfo(response) {
    var stopNameTag = document.getElementById("stopName");
    stopNameTag.innerHTML = response.data.entry.name;
    var stopDetailTag = document.getElementById("stopDetail");
    stopDetailTag.innerHTML = "Stop #" + response.data.entry.code + " - " + response.data.entry.direction + " bound";
}

function QueryStopInfo(stopId) {
    OBA.api_request({
        method: "stop",
        id: stopId,
        params: {
            key: urlParams["key"],
            includeReferences: false
        },
        callback: LoadStopInfo
    });
}

function LoadStop(response) {
    keepCacheFresh();
    var currentTime = response.currentTime;
    var stopTable = document.getElementById("stopTable");

    // clear the table
    while (stopTable.childElementCount > 0) {
        stopTable.removeChild(stopTable.childNodes[0]);
    }

    //write the headers
    var headers = ["Route", "Vehicle ID", "Arrival In", "How Late?", "Ping Age?"];
    var headerRow = document.createElement("TR");
    for (var hi in headers) {
        var h = document.createElement("TH");
        h.innerHTML = headers[hi];
        headerRow.appendChild(h);
    }
    stopTable.appendChild(headerRow);

    // populate the table
    var arrivalsAndDepartures = response.data.entry.arrivalsAndDepartures;
    for (var i in arrivalsAndDepartures) {
        stopTable.appendChild(generateRowForArrival(currentTime, arrivalsAndDepartures[i]));
    }
}
