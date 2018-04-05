var urlParams = {
    "key": "TEST"
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

let setLat, setLon;

function getLocation() {
    return navigator.geolocation.getCurrentPosition(pos => {
        setLat(pos.coords.latitude);
        setLon(pos.coords.longitude);
    });
}

function Launch() {
    let latDiv = document.getElementById("lat");
    let lonDiv = document.getElementById("lon");
    setLat = lat => latDiv.innerHTML = lat;
    setLon = lon => lonDiv.innerHTML = lon;
    Update();
}

function Update() {
    getLocation();
}
