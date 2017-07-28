var urlBase = 'http://api.pugetsound.onebusaway.org/api/where/';
var doc;
var g;
var vb, vbx, vby, vbh, vbw;
var border;
var colorToUse = 'blue';
var timeFactor = 1000 * 6;
var testTimeAdjustment = 0;

var API_KEY = API_KEY ? API_KEY : '4f632354-2bad-4b81-8539-fc5be95aaf56';

// BEGIN: QUERY PARAMETER SHIT
function ArgumentCollection(dict, _default) {
    return {
        has: dict.hasOwnProperty.bind(dict),
        get: function(k) {
            return this.has(k) ? dict[k] : _default;
        }
    };
}

function GetQueryParameters(_default) {
    var url = window.location.href;
    var urlSplit = url.split("?", 2);
    if (urlSplit.length == 1) {
        return ArgumentCollection({}, _default);
    }
    var dict = {};
    var querySplit = urlSplit[1].split("&");
    for (var i in querySplit) {
        var pair = querySplit[i].split("=", 2);
        dict[pair[0]] = pair.length == 2 ? pair[1] : true;
    }
    return ArgumentCollection(dict, _default);
}
// END: QUERY PARAMETER SHIT


// BEGIN: PROMISE SHIT
function Promise() {
    this._cbs = { s: [], f: [] };
    this._status = 0;
    this._result = undefined;
    this._exception = undefined;
}

Promise.prototype.resolve = function (r) {
    if (this._status !== 0)
        return;
    this._status = 1;
    for (var i in this._cbs.s) {
        this._cbs.s[i](r);
    }
};

Promise.prototype.reject = function (e) {
    if (this._status !== 0)
        return;
    this._status = -1;
    for (var i in this._cbs.f) {
        this._cbs.f[i](e);
    }
};

function passthru(a) { return a; }
function defaultPassthru(f) { return typeof (f) === 'undefined' ? passthru : f; }

Promise.prototype.then = function (s, f) {
    var childPromise = new Promise();
    var _s = defaultPassthru(s);
    var _f = defaultPassthru(f);
    var do_s = function (r) { childPromise.resolve(_s(r)); };
    var do_f = function (e) { childPromise.reject(_f(e)); };

    if (this._status < 0) {
        do_f(this._exception);
    } else if (this._status > 0) {
        do_s(this._result);
    } else {
        this._cbs.s.push(do_s);
        this._cbs.f.push(do_f);
    }
    return childPromise;
};

Promise.prototype.success = function (s) { return this.then(s); };

Promise.prototype.failure = function (e) { return this.then(undefined, e); }

function testPromises() {
    var ResolveMe = new Promise();
    ResolveMe.then(
        function (r) { console.log("OKAY!") },
        function (e) { console.log("FAIL!"); });
    ResolveMe.resolve(5);
    var RejectMe = new Promise();
    RejectMe.then(
        function (r) { console.log("FAIL!"); },
        function (e) { console.log("OKAY!"); });
    RejectMe.reject(1);
    var Chain = new Promise(), expected = 10;
    Chain
        .then(function (r) { return r + 1; })
        .then(function (r) { console.log(expected === r ? "OKAY!" : "FAILED!"); });
    Chain.resolve(expected - 1);

}
// END: PROMISE SHIT

var callbacks = new Object();
function request(url, callback) {
    var callbackName = 'cb' + (new Date()).getTime();
    while (typeof callbacks[callbackName] !== 'undefined') callbackName = callbackName + '_';
    var scriptTag = createElement('script');
    callbacks[callbackName] = {
        url: url,
        cb: function(r) {
            callback(r);
            vb.removeChild(scriptTag);
            delete callbacks[callbackName];
        }
    };
    scriptTag.setAttributeNS("http://www.w3.org/1999/xlink", 'href', url + '&callback=callbacks.' + callbackName + '.cb');
    scriptTag.setAttributeNS("http://www.w3.org/1999/xlink", 'type', 'text/ecmascript');
    vb.appendChild(scriptTag);
}

function createAsyncifier() {
    var _this;
    _this = {
        resolved: false,
        result: undefined,
        callbacks: [],
        then: function (func) {
            if (_this.resolved) {
                func(result);
            } else {
                this.callbacks.push(func);
            }
        },
        resolve: function (r) {
            var c = _this.callbacks.length;
            for (var i = 0; i < c; i++) {
                _this.callbacks.shift()(r);
            }
            _this.result = r;
            _this.resolved = true;
        }
    }
    return _this;
}

function requestAsync(url) {
    var asyncifier = createAsyncifier();
    request(url, asyncifier.resolve);
    return asyncifier;
}

function addParams(url, params) {
    var result = url;
    for (paramIndex in params)
        result += params[paramIndex];
    return result;
}

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

function queryStop(stopId, callback, minBefore, minAfter) {
    var url = type2Method(
      'arrivals-and-departures-for-stop', stopId,
      [ optParam(minBefore, 'minutesBefore'), optParam(minAfter, 'minutesAfter') ]);
    requestAsync(url).then(callback);
    //request(url, callback);
}

function queryStopAsync(stopId, minBefore, minAfter) {
    var asyncifier = createAsyncifier();
    queryStop(stopId, asyncifier.resolve, minBefore, minAfter);
    return asyncifier;
}

function queryTripAtStop(stopId, tripId, serviceDate, callback) {
    var url = type2Method(
      'arrival-and-departure-for-stop', stopId,
      [ optParam(tripId, 'tripId'), optParam(serviceDate, 'serviceDate') ] );
    requestAsync(url).then(callback);
    //request(url, callback);
}

function queryTripAtStopAsync(stopId, tripId, serviceDate) {
    var asyncifier = createAsyncifier();
    queryTripAtStop(stopId, tripId, serviceDate, asyncifier.resolve);
    return asyncifier;
}

function getFirstByRoute(adList, routeId) {
    for (adIndex in adList) {
        ad = adList[adIndex];
        if (ad.routeId == routeId) {
            return ad;
        }
    }
    return null;
}

function resize(x,y,w,h) {
    var changed = false;
    if (x < vbx) {
        vbx = x;
        changed = true;
    }
    if (y < vby) {
        vby = y;
        changed = true;
    }
    var newWidth = x + w - vbx;
    var newHeight = y + h - vby;
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
var Journey_Step = function(stepDef) {
    this.route = stepDef.r;
    this.start = stepDef.s;
    this.end = stepDef.e;

    this.process = function(completionCallback, tOffset) {
        this.onComplete = completionCallback;
        this.processStart(tOffset);
    };

    this.processStart = function(tOffset) {
        // CLOSURE
        queryStopAsync(this.start, -1 * tOffset, baseMinutesAfter + tOffset)
            .then(function (startResponse) {
                this.startResponse = startResponse;
                this.startData = getFirstByRoute(startResponse.data.entry.arrivalsAndDepartures, this.route);
                this.processEnd(this.startData.tripId);
            }.bind(this));
    };

    this.processEnd = function(tripId) {
        queryTripAtStopAsync(this.end, tripId, this.startData.serviceDate)
            .then(function (endResponse) {
                this.endResponse = endResponse;
                this.endData = endResponse.data.entry;
                this.processData();
            }.bind(this));
    };

    this.processData = function() {
        if (this.startData.predicted) {
            this.predicted = true;
            this.startTime = this.startData.predictedDepartureTime;
            if (this.endData.predicted) {
                this.endTime = this.endData.predictedArrivalTime;
            } else {
                var offSet = this.startTime - this.startResponse.currentTime;
                this.endTime = this.endData.scheduledArrivalTime + offSet;
            }
        } else {
            if (this.endData.predicted) {
                this.predicted = true;
                this.endTime = this.endData.predictedArrivalTime;
                var offset = this.endData.predictedArrivalTime - this.endResponse.currentTime;
                this.startTime = this.startData.scheduledDepartureTime + offset;
            } else {
                this.predicted = false;
                this.startTime = this.startData.scheduledDepartureTime;
                this.endTime = this.endData.scheduledArrivalTime;
            }
        }
        this.currentTime = this.startResponse.currentTime;
        this.endOffset = Math.ceil((this.endTime - this.startResponse.currentTime)/60000);

        this.adjustTimes();

        this.onComplete(this.endOffset);
    };

    this.adjustTimes = function() {
        var adjustment = testTimeAdjustment * 60 * 1000;
        this.startTime -= adjustment;
        this.endTime -= adjustment;
    };

    this.drawSegment = function(t0, y) {
        var x = (this.startTime - t0) / timeFactor;
        var width = (this.endTime - this.startTime) / timeFactor;
        var color;
        var eString;
        if (!this.predicted) {
            color = 'lightgray';
            eString = 'Unknown';
        } else {
            var lateBy = this.startTime - this.startData.scheduledDepartureTime;
            if (lateBy < -60000) {
                color = 'red';
                eString = msToMinAndSec(-lateBy) + ' early';
            } else if (lateBy > 60000) {
                color = 'cyan';
                eString = msToMinAndSec(lateBy) + ' late';
            } else {
                color = 'limegreen';
                eString = 'On time';
            }
        }

        drawRectangle(x, y, width, 24, color);

        var rtext = createElement('text');
        rtext.setAttribute('x', x + 2);
        rtext.setAttribute('y', y+14);
        rtext.textContent = this.startData.routeShortName;
        g.appendChild(rtext);

        var eText = createElement('text');
        eText.setAttribute('x', x + 2);
        eText.setAttribute('y', y + 22);
        eText.setAttribute('font-size', '8px');
        eText.textContent = eString;
        g.appendChild(eText);

        drawTimeMark(x, y + 24, this.startTime - t0, true);
        drawTimeMark(x + width, y + 24, this.endTime - t0, false);
    }
}

function drawRectangle(x,y,width,height,color) {
    var adRect = createElement('rect');
    adRect.setAttribute('x', x);
    adRect.setAttribute('y', y);
    adRect.setAttribute('width', width);
    adRect.setAttribute('height', height);
    adRect.setAttribute('fill', color);
    adRect.setAttribute('stroke', 'black');
    g.insertBefore(adRect, g.childNodes[0]);
    resize(x,y,width,height);
}

function drawTimeMark(x, y, ms, isStart) {
    var caret = createElement('polyline');
    caret.setAttribute('points', '' +    x    + ',' + y + ' '
                                         + (x - 2) + ',' + (y + 3) + ' '
                                         + (x + 2) + ',' + (y + 3) );
    caret.setAttribute('fill', 'black');
    g.appendChild(caret);

    var anchor = typeof isStart !== 'undefined'
                 ? isStart ? 'start' : 'end'
                 : 'middle';
    var text = createElement('text');
    text.textContent = msToMinAndSec(ms);
    text.setAttribute('x', x);
    text.setAttribute('y', y + 9.5);
    text.setAttribute('text-anchor', anchor );
    text.setAttribute('font-size', '7.5px');
    g.appendChild(text);
}

function msToMinAndSec(ms) {
    var negative = false;
    var seconds = Math.round(ms / 1000);
    if (seconds < 0) {
        negative = true;
        seconds = -seconds;
    }
    var minutes = Math.floor(seconds / 60);
    var remainder = seconds % 60;
    if (remainder < 10) { remainder = '0' + remainder; }
    return (negative ? '-' : '') + minutes + ':' + remainder;
}

var Journey = function(steps) {
    this.stepDefs = steps;
    this.steps = [];

    for (stepIndex in steps) {
        this.steps.push(new Journey_Step(steps[stepIndex]));
    }

    this.load = function(y) {
        // CLOSURE
        var nextCallbackObj = {};
        nextCallbackObj.fn = function(unused) { this.drawSegments(y); }.bind(this);
        nextCallbackObj.debug_name = 'final_callback';
        for (stepIndex in this.steps) {
            var realIndex = (this.steps.length - stepIndex) - 1;
            var callbackObj = {};
            callbackObj.nextObj = nextCallbackObj;
            callbackObj.targetStep = this.steps[realIndex];
            callbackObj.debug_name = 'callback ' + realIndex;
            callbackObj.fn = function(tOffset) { this.targetStep.process(this.nextObj.fn, tOffset); }.bind(callbackObj);
            nextCallbackObj = callbackObj;
        }
        nextCallbackObj.fn(testTimeAdjustment);
    };

    this.drawSegments = function(y) {
        var t0 = 0;
        for (stepIndex in this.steps) {
            if (t0 == 0 || this.steps[stepIndex].currentTime < t0) {
                t0 = this.steps[stepIndex].currentTime
            }
        }

        for (stepIndex in this.steps) {
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
    var status = doc.getElementById('status');
    var y = 0;
    var journeys = [];

    for (journeyIndex in journeyDefinitions) {
        var journey = new Journey(journeyDefinitions[journeyIndex].steps);
        journeys.push(journey);
        journey.load(y);
        y += 36;
    }
}
