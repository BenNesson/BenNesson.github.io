/// <reference path="../core/onebusaway.interop.js" />

var urlParams = {
    "key": "TEST",
    "radius": 100
};
(window.onpopstate = function () {
    var match,
        pl = /\+/g,
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query = window.location.search.substring(1);

    while (match = search.exec(query)) {
        urlParams[decode(match[1])] = decode(match[2]);
    }
})();

let setLat, setLon, createElement, createRow, createCell, createHeader;

function handlePositionResponse(position) {
    setLat(position.coords.latitude);
    setLon(position.coords.longitude);
    OBA.api_request({
        method: "stops-for-location",
        params: {
            key: urlParams["key"],
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            radius: urlParams["radius"]
        },
        callback: LoadStops
    });
}

function LoadStops(response) {
    let stopTable = document.getElementById("stopTable");

    // clear the table
    while (stopTable.childElementCount > 0) {
        stopTable.removeChild(stopTable.childNodes[0]);
    }

    // write the headers
    let headers = ["Stop #", "Location", "Dir"];
    let headerRow = document.createElement("TR");
    for (let hi in headers) {
        let h = document.createElement("TH");
        h.innerHTML = headers[hi];
        headerRow.appendChild(h);
    }
    stopTable.appendChild(headerRow);

    //populate the table
    let stops = response.data.list;
    for (let i in stops) {
        stopTable.appendChild(generateRowForStop(stops[i]));
    }
}

function generateRowForStop(stopData) {
    let row = createRow();
    let codeCell = createCell();
    let nameCell = createCell();
    let directionCell = createCell();
    row.appendChild(codeCell);
    row.appendChild(nameCell);
    row.appendChild(directionCell);

    codeCell.innerHTML = linkToStop(stopData.code, stopData.id);
    nameCell.innerHTML = stopData.name;
    directionCell.innerHTML = stopData.direction;

    return row;
}

function linkToStop(code, id) {
    let key = urlParams["key"];
    let link = `<a href="../stop.html?key=${key}&stopId=${id}">${code}</a>`;
    return link;
}

function getLocation() {
    return navigator.geolocation.getCurrentPosition(handlePositionResponse);
}

function Launch() {
    let latDiv = document.getElementById("lat");
    let lonDiv = document.getElementById("lon");
    setLat = lat => latDiv.innerHTML = lat;
    setLon = lon => lonDiv.innerHTML = lon;
    createElement = tag => document.createElement(tag);
    createRow = () => createElement("TR");
    createCell = () => createElement("TD");
    createHeader = () => createElement("TH");
    Update();
}

function Update() {
    getLocation();
}
