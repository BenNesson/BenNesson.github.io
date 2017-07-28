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

function generateRowForArrival(currentTime, arrival){
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
    
    routeCell.innerHTML = arrival.routeShortName;
    vehicleCell.innerHTML = arrival.vehicleId;
    
    var arrivalTime = arrival.predicted ? arrival.predictedArrivalTime : arrival.scheduledArrivalTime;
    arrivalTimeCell.innerHTML = formatMillisecondTimespan(arrivalTime - currentTime);
    if (arrival.predicted) {
        var threshold = 30 * 1000;
        var howLate = arrival.predictedArrivalTime - arrival.scheduledArrivalTime;
        var latenessClass = "on-time";
        if (howLate < 0) {
            latenessClass = "early";
        } else if (howLate > threshold) {
            latenessClass = "late";
        }
        row.setAttribute("class", latenessClass);
        howLateCell.innerHTML = formatMillisecondTimespan(howLate);
        howOldCell.innerHTML = formatMillisecondTimespan(currentTime - arrival.tripStatus.lastUpdateTime);
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

var handleStopResponse;

function QueryStop(stopId) {
    var url = "./dummy.json";
    if (stopId !== "dummy") {
        url = "https://api.pugetsound.onebusaway.org/api/where/"
            + "arrivals-and-departures-for-stop/"
            + stopId + ".json?"
            + "key=" + urlParams["key"]
            + "&minutesBefore=" + urlParams["minutesBefore"]
            + "&minutesAfter=" + urlParams["minutesAfter"]
            + "&includeReferences=false"
            + "&callback=handleStopResponse"
            + "&dummy=" + new Date().getTime();
    }
    var headElement = document.getElementById("h");
    var scriptTag = document.createElement("SCRIPT");
    scriptTag.setAttribute("src", url);
    handleStopResponse = function(response) {
        headElement.removeChild(scriptTag);
        LoadStop(response);
        setTimeout(Update, urlParams["refreshRate"] * 1000);
    };
    headElement.appendChild(scriptTag);
}

function LoadStopInfo(response) {
    var stopNameTag = document.getElementById("stopName");
    stopNameTag.innerHTML = response.data.entry.name;
    var stopDetailTag = document.getElementById("stopDetail");
    stopDetailTag.innerHTML = "Stop #" + response.data.entry.code + " - " + response.data.entry.direction + " bound";
}

function QueryStopInfo(stopId) {
    url = "https://api.pugetsound.onebusaway.org/api/where/"
            + "stop/"
            + stopId + ".json?"
            + "key=" + urlParams["key"]
            + "&includeReferences=false"
            + "&callback=LoadStopInfo";
    var headElement = document.getElementById("h");
    var scriptTag = document.createElement("SCRIPT");
    scriptTag.setAttribute("src", url);
    headElement.appendChild(scriptTag);
}

function LoadStop(response) {
    //var response = GetData(stopId);
    var currentTime = response.currentTime;
    var stopTable = document.getElementById("stopTable");
    
    while (stopTable.childElementCount > 0) {
        stopTable.removeChild(stopTable.childNodes[0]);
    }
    
    var headers = ["Route", "Vehicle ID", "Arrival In", "How Late?", "Ping Age?"];
    var headerRow = document.createElement("TR");
    for (var hi in headers) {
        var h = document.createElement("TH");
        h.innerHTML = headers[hi];
        headerRow.appendChild(h);
    }
    stopTable.appendChild(headerRow);
    
    var arrivalsAndDepartures = response.data.entry.arrivalsAndDepartures;
    for (var i in arrivalsAndDepartures) {
        stopTable.appendChild(generateRowForArrival(currentTime, arrivalsAndDepartures[i]));
    }
}
