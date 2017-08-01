var journeyDefinitions = defineJourneys();

var urlBase = 'https://api.pugetsound.onebusaway.org/api/where/';
var doc;
var g;
var vb, vbx, vby, vbh, vbw;
var border;
var timeFactor = 1000 * 6;
var testTimeAdjustment = 0;
var DEFAULT_TRIES = 10;
var ticksPerMinute = 60000;

var callbacks = new Object();
function request(url, callback, tries) {
    if (typeof (tries) === 'undefined') {
        tries = DEFAULT_TRIES;
    }
    let callbackName = 'cb' + (new Date()).getTime();
    while (typeof callbacks[callbackName] !== 'undefined') callbackName = callbackName + '_';
    let scriptTag = createElement('script');
    callbacks[callbackName] = {
        url: url,
        cb: function (r) {
            if (r.code == 200) {
                callback(r);
            } else if (tries > 0) {
                request(url, callback, tries - 1);
            } else {
                debug.log("Oh fucking goddamn everything.");
            }
            vb.removeChild(scriptTag);
            delete callbacks[callbackName];
        }
    };
    scriptTag.setAttribute('href', url + '&callback=callbacks.' + callbackName + '.cb');
    vb.appendChild(scriptTag);
}

function addParams(url, params) {
    let result = url;
    for (let paramIndex in params)
        result += params[paramIndex];
    return result;
}

var API_KEY = '4f632354-2bad-4b81-8539-fc5be95aaf56';
function type1Method(methodName, params) {
    return addParams(urlBase + methodName + '.json?key=' + API_KEY + '&dummy=' + (new Date()).getTime(), params);
}

function type2Method(methodName, id, params) {
    return addParams(urlBase + methodName + '/' + id + '.json?key=' + API_KEY + '&dummy=' + (new Date()).getTime(), params);
}

function optParam(pValue, pName) {
    return typeof pValue !== 'undefined'
        ? '&' + pName + '=' + pValue
        : '';
}

var CacheEntry = function () {
    this.callbacks = [];
    this.resolved = false;

    let _this = this;
    this.resolve = function (response) {
        if (_this.resolved) {
            // log error
        } else {
            _this.result = response;
            _this.resolved = true;
            for (let i in _this.callbacks) {
                _this.callbacks[i](response);
            }
        }
    };

    this.onResolve = function (callback) {
        if (_this.resolved) {
            callback(_this.result);
        } else {
            _this.callbacks.push(callback);
        }
    }
};

function cacheQuery(cache, key, url, callback) {
    if (!cache.has(key)) {
        let entry = new CacheEntry();
        request(url, entry.resolve);
        cache.set(key, entry);
    }
    cache.get(key).onResolve(callback);
}

var stopCache = new Map();
function queryStop(stopId, callback, minBefore, minAfter) {
    let url = type2Method(
        'arrivals-and-departures-for-stop', stopId,
        [optParam(minBefore, 'minutesBefore'), optParam(minAfter, 'minutesAfter')]);
    cacheQuery(stopCache, [stopId, minBefore, minAfter].join('$'), url, callback);
}

var tripDetailsCache = new Map();
function queryTripDetails(tripId, serviceDate, callback) {
    let url = type2Method(
        'trip-details', tripId,
        [optParam(serviceDate, 'serviceDate')]);
    cacheQuery(tripDetailsCache, [tripId, serviceDate].join('$'), url, callback);
}

var tripAtStopCache = new Map();
function queryTripAtStop(stopId, tripId, serviceDate, callback) {
    let url = type2Method(
        'arrival-and-departure-for-stop', stopId,
        [optParam(tripId, 'tripId'), optParam(serviceDate, 'serviceDate')]);
    cacheQuery(tripAtStopCache, [stopId, tripId, serviceDate].join('$'), url, callback);
}

// Sometimes a given journey step will last multiple trips.  This function figures out what
// trip actually gets to the given stop, and then queries for that trip at that stop.
function actuallyGetTripAtStop(stopId, tripId, serviceDate, callback) {
    queryTripDetails(tripId, serviceDate, function (tripResponse) {
        let entry = tripResponse.data.entry;
        let correctTrip = false;
        for (let i in entry.schedule.stopTimes) {
            let _stopId = entry.schedule.stopTimes[i].stopId;
            if (_stopId === stopId) {
                correctTrip = true;
                queryTripAtStop(stopId, tripId, serviceDate, callback);
                break;
            }
        }
        if (!correctTrip) {
            let nextTripId = entry.schedule.nextTripId;
            if (nextTripId !== "") {
                actuallyGetTripAtStop(stopId, nextTripId, serviceDate, callback);
            }
        }
    });
}

function bestArrivalTimeEstimate(arrival) {
    return arrival.predicted ? arrival.predictedArrivalTime : arrival.scheduledArrivalTime;
}

function getFirstByRoute(adList, routeId, tOffset) {
    for (let adIndex in adList) {
        ad = adList[adIndex];
        if (ad.routeId == routeId && bestArrivalTimeEstimate(ad) > tOffset) {
            return ad;
        }
    }
    return null;
}

function resize(x, y, w, h) {
    let changed = false;
    if (x < vbx) {
        vbx = x;
        changed = true;
    }
    if (y < vby) {
        vby = y;
        changed = true;
    }
    let newWidth = x + w - vbx;
    let newHeight = y + h - vby;
    if (newHeight > vbh) {
        vbh = newHeight;
        changed = true;
    }
    if (newWidth > vbw) {
        vbw = newWidth;
        changed = true;
    }
    if (changed) {
        vb.setAttribute('viewBox', '' + (vbx - 10) + ' ' + (vby - 5) + ' ' + (vbw + 20) + ' ' + (vbh + 20));
        border.setAttribute('x', vbx - 5);
        border.setAttribute('y', vby - 3);
        border.setAttribute('width', vbw + 10);
        border.setAttribute('height', vbh + 18);
    }
}

function createElement(elementName) {
    return doc.createElementNS('http://www.w3.org/2000/svg', elementName);
}

var baseMinutesAfter = 60;
var Journey_Step = function (stepDef) {
    this.route = stepDef.r;
    this.start = stepDef.s;
    this.end = stepDef.e;
    this.walkTime = stepDef.w;

    this.process = function (completionCallback, tOffset) {
        this.onComplete = completionCallback;
        this.processStart(tOffset);
    };

    this.processStart = function (tOffset) {
        let minBefore = -1 * Math.ceil(tOffset / ticksPerMinute);
        let minAfter = baseMinutesAfter - minBefore;
        if (typeof (this.walkTime) === 'undefined') {
            this.isWalkSegment = false;
            queryStop(
                this.start,
                function (startResponse) {
                    this.startResponse = startResponse;
                    this.startData = getFirstByRoute(
                        startResponse.data.entry.arrivalsAndDepartures,
                        this.route,
                        startResponse.currentTime + tOffset);
                    this.processEnd(this.startData.tripId);
                }.bind(this),
                minBefore,
                minAfter
            );
        } else {
            this.isWalkSegment = true;
            this.startTime = tOffset;
            this.endTime = tOffset + this.walkTime * ticksPerMinute;
            this.onComplete(tOffset + this.walkTime * ticksPerMinute);
        }
    };

    this.processEnd = function (tripId) {
        actuallyGetTripAtStop(
            this.end,
            tripId,
            this.startData.serviceDate,
            function (endResponse) {
                this.endResponse = endResponse;
                this.endData = endResponse.data.entry;
                this.processData();
            }.bind(this)
        );
    };

    this.processData = function () {
        if (this.startData.predicted) {
            this.predicted = true;
            this.startTime = this.startData.predictedDepartureTime;
            if (this.endData.predicted) {
                this.endTime = this.endData.predictedArrivalTime;
            } else {
                let offSet = this.startTime - this.startResponse.currentTime;
                this.endTime = this.endData.scheduledArrivalTime + offSet;
            }
        } else {
            if (this.endData.predicted) {
                this.predicted = true;
                this.endTime = this.endData.predictedArrivalTime;
                let offset = this.endData.predictedArrivalTime - this.endResponse.currentTime;
                this.startTime = this.startData.scheduledDepartureTime + offset;
            } else {
                this.predicted = false;
                this.startTime = this.startData.scheduledDepartureTime;
                this.endTime = this.endData.scheduledArrivalTime;
            }
        }
        this.currentTime = this.startResponse.currentTime;
        this.endOffset = this.endTime - this.startResponse.currentTime;

        this.adjustTimes();

        this.onComplete(this.endOffset);
    };

    this.adjustTimes = function () {
        let adjustment = testTimeAdjustment * ticksPerMinute;
        this.startTime -= adjustment;
        this.endTime -= adjustment;
    };

    this.drawSegment = function (t0, y) {
        if (this.isWalkSegment) {
            this.drawWalkSegment(t0, y);
        } else {
            this.drawBusSegment(t0, y);
        }
    };

    this.drawWalkSegment = function (t0, y) {
        let x = this.startTime / timeFactor;
        let width = (this.endTime - this.startTime) / timeFactor;
        drawWalkArrow(x, y + 12, width);

        drawTimeMark(x + width, y + 24, this.endTime, false);
    }

    this.drawBusSegment = function (t0, y) {
        let x = (this.startTime - t0) / timeFactor;
        let width = (this.endTime - this.startTime) / timeFactor;
        let color;
        let eString;
        if (!this.predicted) {
            color = 'lightgray';
            eString = 'Unknown';
        } else {
            let lateBy = this.startTime - this.startData.scheduledDepartureTime;
            if (lateBy < - 1 * ticksPerMinute) {
                color = 'red';
                eString = msToMinAndSec(-lateBy) + ' early';
            } else if (lateBy > 1 * ticksPerMinute) {
                color = 'cyan';
                eString = msToMinAndSec(lateBy) + ' late';
            } else {
                color = 'limegreen';
                eString = 'On time';
            }
        }

        drawRectangle(x, y, width, 24, color);

        let rtext = createElement('text');
        rtext.setAttribute('x', x + 2);
        rtext.setAttribute('y', y + 14);
        rtext.textContent = this.startData.routeShortName;
        g.appendChild(rtext);

        let eText = createElement('text');
        eText.setAttribute('x', x + 2);
        eText.setAttribute('y', y + 22);
        eText.setAttribute('font-size', '8px');
        eText.textContent = eString;
        g.appendChild(eText);

        drawTimeMark(x, y + 24, this.startTime - t0, true);
        drawTimeMark(x + width, y + 24, this.endTime - t0, false);
    }
};

function RectangleClick(rect) {
    rect.setAttribute('fill', rect.isActivated ? rect.unselectedColor : 'violet');
    rect.isActivated = !rect.isActivated;
}

function drawRectangle(x, y, width, height, color) {
    let adRect = createElement('rect');
    adRect.setAttribute('x', x);
    adRect.setAttribute('y', y);
    adRect.setAttribute('width', width);
    adRect.setAttribute('height', height);
    adRect.setAttribute('fill', color);
    adRect.setAttribute('stroke', 'black');

    adRect.unselectedColor = color;
    adRect.onclick = function () { RectangleClick(adRect); }

    g.insertBefore(adRect, g.childNodes[0]);
    resize(x, y, width, height);
}

function drawWalkArrow(x, y, width) {
    let arrowHalfHeight = 3;
    let arrowWidth = 5;
    let lineWidth = width - arrowWidth;
    let adLine = createElement('line');
    adLine.setAttribute('x1', x);
    adLine.setAttribute('x2', x + lineWidth);
    adLine.setAttribute('y1', y);
    adLine.setAttribute('y2', y);
    adLine.setAttribute('stroke', 'black');
    adLine.setAttribute('stroke-width', 1);
    adLine.setAttribute('stroke-dasharray', '5,3');
    g.insertBefore(adLine, g.childNodes[0]);

    let arrowHead = createElement('polyline');
    arrowHead.setAttribute('points', ''
        + (x + lineWidth) + ',' + (y - arrowHalfHeight) + ' '
        + (x + width) + ',' + y + ' '
        + (x + lineWidth) + ',' + (y + arrowHalfHeight));
    arrowHead.setAttribute('fill', 'black');
    g.insertBefore(arrowHead, adLine);

    let stopLine = createElement('line');
    stopLine.setAttribute('x1', x + width);
    stopLine.setAttribute('x2', x + width);
    stopLine.setAttribute('y1', y - 12);
    stopLine.setAttribute('y2', y + 12);
    stopLine.setAttribute('stroke', 'black');
    stopLine.setAttribute('stroke-width', 0.5);
    g.insertBefore(stopLine, arrowHead);

    resize(x, y - arrowHalfHeight, width, 2 * arrowHalfHeight);
}

function drawTimeMark(x, y, ms, isStart) {
    let caret = createElement('polyline');
    caret.setAttribute('points', '' + x + ',' + y + ' '
        + (x - 2) + ',' + (y + 3) + ' '
        + (x + 2) + ',' + (y + 3));
    caret.setAttribute('fill', 'black');
    g.appendChild(caret);

    let anchor = typeof isStart !== 'undefined'
        ? isStart ? 'start' : 'end'
        : 'middle';
    let text = createElement('text');
    text.textContent = msToMinAndSec(ms);
    text.setAttribute('x', x);
    text.setAttribute('y', y + 9.5);
    text.setAttribute('text-anchor', anchor);
    text.setAttribute('font-size', '7.5px');
    g.appendChild(text);
}

function msToMinAndSec(ms) {
    let negative = false;
    let seconds = Math.round(ms / 1000);
    if (seconds < 0) {
        negative = true;
        seconds = -seconds;
    }
    let minutes = Math.floor(seconds / 60);
    let remainder = seconds % 60;
    if (remainder < 10) { remainder = '0' + remainder; }
    return (negative ? '-' : '') + minutes + ':' + remainder;
}

function ParseStepDefinition(stepDef) {
    return new Journey_Step(stepDef);
}

var Journey = function (steps) {
    this.stepDefs = steps;
    this.steps = [];

    for (let stepIndex in steps) {
        this.steps.push(ParseStepDefinition(steps[stepIndex]));
    }

    this.load = function (y) {
        let nextCallbackObj = {};
        nextCallbackObj.fn = function (unused) { this.drawSegments(y); }.bind(this);
        nextCallbackObj.debug_name = 'final_callback';
        for (let stepIndex in this.steps) {
            let realIndex = (this.steps.length - stepIndex) - 1;
            let callbackObj = {};
            callbackObj.nextObj = nextCallbackObj;
            callbackObj.targetStep = this.steps[realIndex];
            callbackObj.debug_name = 'callback ' + realIndex;
            callbackObj.fn = function (tOffset) { this.targetStep.process(this.nextObj.fn, tOffset); }.bind(callbackObj);
            nextCallbackObj = callbackObj;
        }
        nextCallbackObj.fn(testTimeAdjustment);
    };

    this.drawSegments = function (y) {
        let t0;
        for (let stepIndex in this.steps) {
            if (typeof (t0) === 'undefined' || this.steps[stepIndex].currentTime < t0) {
                t0 = this.steps[stepIndex].currentTime
            }
        }

        for (let stepIndex in this.steps) {
            this.steps[stepIndex].drawSegment(t0, y);
        }
    };
};

function main(evt) {
    doc = evt.target.ownerDocument
    g = doc.getElementById('block')
    vb = doc.getElementById('vb');
    vbx = 0;
    vby = 0;
    vbh = 0;
    vbw = 0;
    border = doc.getElementById('border');
    let status = doc.getElementById('status');
    let y = 0;
    let journeys = [];

    for (let journeyIndex in journeyDefinitions) {
        let journey = new Journey(journeyDefinitions[journeyIndex].steps);
        journeys.push(journey);
        journey.load(y);
        y += 36;
    }
}