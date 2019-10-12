/// <reference path="../core/onebusaway.interop.js" />

var urlParams = {
    "minutesBefore": 5,
    "minutesAfter": 35,
    "refreshRate": 10,
    "key": "TEST"
};

let StringType = "text";
let NumberType = "number";

let Param = (name, type) => {
    let _type = type;
    let _hasValue = false;
    let _value = null;
    let _hasDefault = false;
    let _default = null;
    let _isHidden = false;

    let _inputElement = document.createElement("input");
    _inputElement.type = type;
    _inputElement.onchange = () => {
        _hasValue = true;
        _value = _inputElement.value;
    };

    let _this;
    let _setDefault = (v) => {
        _hasDefault = true;
        _default = v;
        if (_value === null) {
            _setValue(v);
        }
        return _this;
    };
    let _getDefault = () => _default;
    let _setValue = (v) => {
        _hasValue = true;
        _value = v;
        _inputElement.value = v;
        return _this;
    };
    let _getValue = () => _hasValue ? _value : _default;
    let _hide = () => {
        _isHidden = true;
        return _this;
    };
    let _getIsHidden = () => _isHidden;

    _this = {
        Name: name,
        Input: _inputElement,

        setDefault: _setDefault,
        getDefault: _getDefault,
        setValue: _setValue,
        getValue: _getValue,
        hide: _hide,
        isHidden: _getIsHidden,
    };

    if (type === NumberType) {
        let _step = 1;
        _this.getStep = () => _step;
        _this.setStep = (s) => {
            _step = s;
            _inputElement.step = s;
            return _this;
        };
    }

    return _this;
};

let Params = (pArray) => {
    let dictionary = {};
    let _keys = () => Object.keys(dictionary);
    let _paramUndefined = (name) => _keys().indexOf(name) == -1;
    let _get = (key) => dictionary[key];
    let _getValue = (key) => _paramUndefined(key) ? undefined : _get(key).getValue();
    let _set = (key, value) => {
        if (_paramUndefined(key)) {
            dictionary[key] = Param(key, isNaN(value) ? StringType : NumberType).setValue(value);
        } else {
            dictionary[key].setValue(value);
        }
    };
    let _isHidden = (key) => _paramUndefined(key) || dictionary[key].isHidden();

    for (let i in pArray) {
        dictionary[pArray[i].Name] = pArray[i];
    }
    return {
        get: _get,
        getValue: _getValue,
        set: _set,
        keys: _keys,
        isHidden: _isHidden,
    };
};

var urlParams_ = Params([
    Param("minutesBefore", NumberType).setDefault(5).setStep(5),
    Param("minutesAfter", NumberType).setDefault(35).setStep(5),
    Param("refreshRate", NumberType).setDefault(10),
    Param("key", StringType).setDefault("TEST").hide()
]);

(window.onpopstate = function() {
    var match,
        pl = /\+/g,
        search = /([^&=]+)=?([^&]*)/g,
        decode = function(s) { return decodeURIComponent(s.replace(pl, " ")); },
        query = window.location.search.substring(1);

    while (match = search.exec(query)) {
        //urlParams[decode(match[1])] = decode(match[2]);
        urlParams_.set(decode(match[1]), decode(match[2]));
    }
})();

function Toggle() {
    let stopTable = document.getElementById("stopTable");
    let settingsTable = document.getElementById("settings");
    if (stopTable.classList.contains("slid-in")) {
        stopTable.classList.remove("slid-in");
        stopTable.classList.add("slid-out");
        settingsTable.classList.remove("slid-out");
        settingsTable.classList.add("slid-in");
    } else {
        settingsTable.classList.remove("slid-in");
        settingsTable.classList.add("slid-out");
        stopTable.classList.remove("slid-out");
        stopTable.classList.add("slid-in");
    }
}

function Launch() {
    ConfigureSettings();
    QueryStopInfo(urlParams_.getValue("stopId"));
    Update();
}

function ConfigureSettings() {
    let settingsTable = document.getElementById("settings");
    let createRow = (paramName, paramValue) => {
        let row = document.createElement("tr");
        let labelCell = document.createElement("td");
        labelCell.innerText = paramName;
        row.appendChild(labelCell);
        let inputCell = document.createElement("td");
        let input = document.createElement("input");
        input.setAttribute("value", paramValue);
        input.setAttribute("type", isNaN(paramValue) ? "text" : "number");
        input.onchange = () => {
            urlParams_.set(paramName, input.value);
        };
        inputCell.appendChild(input);
        row.appendChild(inputCell);
        return row;
    };
    let urlParamKeys = urlParams_.keys();
    for (let i in urlParamKeys) {
        let key = urlParamKeys[i];
        if (!urlParams_.isHidden(key)) {
            let row = document.createElement("tr");
            let labelCell = document.createElement("td");
            labelCell.innerText = key;
            row.appendChild(labelCell);
            let inputCell = document.createElement("td");
            inputCell.appendChild(urlParams_.get(key).Input);
            row.appendChild(inputCell);
            //settingsTable.appendChild(createRow(key, urlParams_.getValue(key)));
            settingsTable.appendChild(row);
        }
    }
}

function Update() {
    if (updateTimeout) {
        clearTimeout(updateTimeout);
    }
    QueryStop(urlParams_.getValue("stopId"));
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

function timeAlongRoute(tripStatus) {
    return tripStatus.lastUpdateTime - (tripStatus.scheduleDeviation * 1000);
}

function calculateUpdateDelta(firstStatus, secondStatus) {
    return secondStatus.lastUpdateTime - firstStatus.lastUpdateTime;
}

function calculateDeviationRate(firstArrival, secondArrival) {
    let firstTripStatus = firstArrival.tripStatus;
    let secondTripStatus = secondArrival.tripStatus;
    let deviationDelta = timeAlongRoute(firstTripStatus) - timeAlongRoute(secondTripStatus);
    let updateDelta = -1 * calculateUpdateDelta(firstTripStatus, secondTripStatus);
    return deviationDelta / updateDelta;
}

function updateCacheNodeData(data, newArrival) {
    if (!data.hasPrediction) {
        // First predicted arrival.  Throw away the other info, it's useless for calculating deltas.
        data.initialArrival = newArrival;
        data.previousArrival = newArrival;
        data.currentArrival = newArrival;
        data.hasPrediction = true;
    } else {
        data.previousArrival = data.currentArrival;
        data.currentArrival = newArrival;

        // calculate deltas
        data.totalDelta = calculateDeviationRate(data.initialArrival, data.currentArrival);
        data.latestDelta = calculateDeviationRate(data.previousArrival, data.currentArrival);

        data.totalSpan = calculateUpdateDelta(data.initialArrival.tripStatus, data.currentArrival.tripStatus);
        data.latestSpan = calculateUpdateDelta(data.previousArrival.tripStatus, data.currentArrival.tripStatus);

        data.hasDelta = true;
    }
}

let maxTimeToLive = 20;
function createCacheNode(arrival) {
    return {
        data: {
            initialArrival: arrival,
            currentArrival: arrival,
            previousArrival: arrival,
            hasPrediction: isActuallyPredicted(arrival),
            hasDelta: false,
            totalDelta: 0,
            totalSpan: 0,
            latestDelta: 0,
            latestSpan: 0
        },
        ttl: maxTimeToLive,
        get: function (update) {
            this.ttl = maxTimeToLive;
            if (isActuallyPredicted(update) && update.lastUpdateTime > this.data.currentArrival.lastUpdateTime) {
                updateCacheNodeData(this.data, update);
            }
            return this.data;
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

// iterate through the cache and remove any entries that have aged out.
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
    let latestData = getLatestData(currentTime, arrival);
    let latestArrival = latestData.currentArrival;
    let row = document.createElement("TR");
    let routeCell = document.createElement("TD");
    let vehicleCell = document.createElement("TD");
    let arrivalTimeCell = document.createElement("TD");
    let howLateCell = document.createElement("TD");
    let howOldCell = document.createElement("TD");
    let deltaCell = document.createElement("TD");
    row.appendChild(routeCell);
    row.appendChild(vehicleCell);
    row.appendChild(arrivalTimeCell);
    row.appendChild(howLateCell);
    row.appendChild(howOldCell);
    row.appendChild(deltaCell);

    routeCell.innerHTML = latestArrival.routeShortName;
    vehicleCell.innerHTML = latestArrival.vehicleId;

    let actuallyPredicted = isActuallyPredicted(latestArrival);
    let arrivalTime = actuallyPredicted ? latestArrival.predictedArrivalTime : latestArrival.scheduledArrivalTime;
    arrivalTimeCell.innerHTML = formatMillisecondTimespan(arrivalTime - currentTime);
    if (actuallyPredicted) {
        let threshold = 30 * 1000;
        let howLate = latestArrival.predictedArrivalTime - latestArrival.scheduledArrivalTime;
        let latenessClass = "on-time";
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

    if (latestData.hasDelta) {
        deltaCell.setAttribute("class", "delta-info");
        //deltaCell.innerHTML = 
        //    latestData.totalDelta.toFixed(1) + "/" +
        //    latestData.latestDelta.toFixed(1);
        let topDiv = document.createElement("DIV");
        let bottomDiv = document.createElement("DIV");
        
        topDiv.innerHTML =
            "" + formatMillisecondTimespan(latestData.totalSpan) + ": " +
            latestData.totalDelta.toFixed(1);
        bottomDiv.innerHTML =
            "" + formatMillisecondTimespan(latestData.latestSpan) + ": " +
            latestData.latestDelta.toFixed(1);

        deltaCell.appendChild(topDiv);
        deltaCell.appendChild(bottomDiv);
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
                key: urlParams_.getValue("key"),
                minutesBefore: urlParams_.getValue("minutesBefore"),
                minutesAfter: urlParams_.getValue("minutesAfter"),
                includeReferences: false,
                dummy: new Date().getTime()
            },
            callback: function (response) {
                LoadStop(response);
                updateTimeout = setTimeout(Update, urlParams_.getValue("refreshRate") * 1000);
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
            key: urlParams_.getValue("key"),
            includeReferences: false
        },
        callback: LoadStopInfo,
        onError: () => { }
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
    var headers = ["Route", "Vehicle ID", "Arrival In", "How Late?", "Ping Age", "ΔRate"];
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
