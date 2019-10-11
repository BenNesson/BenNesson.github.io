let refreshTimeout = 0;

// seems to update every 3 minutes;
// twice the tx rate is necessary and sufficient for rx rate.
let autoRefreshPeriod = 3 * 60 * 1000 / 2;

let img;
let imgTime;
let imgTimeStr;

let Update = () => {
    clearTimeout(refreshTimeout);
    let bridgeCamSrc = "https://www.seattle.gov/trafficcams/images/Westlake_N_Dexter_NS.jpg";
    let newSrc = bridgeCamSrc + "?" + Date.now().toString();
    $.get("https://cors-anywhere.herokuapp.com/" + newSrc, (data, status, xhr) =>{
        imgTimeStr = xhr.getResponseHeader("Last-Modified");
        imgTime = Date.parse(imgTimeStr);
        //let timeStampInfo = document.getElementById("timeStampInfo");
        //timeStampInfo.innerHTML = "Timestamp: " + fileTime;
    });
    img.src = newSrc;
    refreshTimeout = setTimeout(Update, 30000);
};

let UpdateImageAge = () => {
    let now = Date.now();
    let span = now - imgTime;
    let isNegative = span < 0;
    if (isNegative) {
        span = -span;
    }
    let tSeconds = Math.round(span / 1000);
    let minutes = Math.floor(tSeconds / 60);
    let dSeconds = (tSeconds % 60);
    let timeStampInfo = document.getElementById("timeStampInfo");
    timeStampInfo.innerHTML =
        "Supposed image age: " +
        (isNegative ? "-" : "") +
        minutes + ":" +
        ("0" + dSeconds).substr(-2);
};

let Init = () => {
    img = document.getElementById("bridgeCam");
    Update();
    setInterval(UpdateImageAge, 1000);
};

document.addEventListener("DOMContentLoaded", ()=>{ Init(); });

