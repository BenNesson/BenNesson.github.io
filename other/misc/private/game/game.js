/// <reference path="./gameCore.js" />
/// <reference path="./gameModel.js" />
/// <reference path="./gameView.js" />

let roundCount = 15;
let winTarget = 14;
let wins = 0;
let mainDiv;
let bar;
let scoreThings = [];
let windowStart = 15;
let windowEnd = 16;

let getWindowTiming = (loadTime) => {
    let loadHour = loadTime.getHours();
    let loadMinute = loadTime.getMinutes();
    let loadSecond = loadTime.getSeconds();

    if (loadTime.getMonth() !== 9) {
        if (loadHour < windowStart) {
            return {
                okay: false,
                error: "early",
                hours: windowStart - loadHour - 1,
                minutes: 60 - loadMinute,
                seconds: 60 - loadSecond
            };
        } else if (loadHour >= windowEnd) {
            return {
                okay: false,
                error: "late",
                hours: loadHour - windowEnd,
                minutes: loadMinute,
                seconds: loadSecond
            };
        }
    }

    return { okay: true };
};

let isDevMode = (()=>{
    let devCheck = "devCheck";
    cookieMonster.set(devCheck, devCheck);
    if (cookieMonster.get(devCheck) === devCheck) {
        cookieMonster.delete(devCheck);
        return false;
    }
    return true;
})();

let loadTime = () => {
    let loadTimeKey = "loadTime";
    window.clearLoadTimeCookie = () => cookieMonster.delete(loadTimeKey);

    let result;
    if (cookieMonster.has(loadTimeKey)) {
        let resultMS = Date.parse(cookieMonster.get(loadTimeKey))
        result = new Date(resultMS);
    } else {
        result = new Date();
        cookieMonster.set(loadTimeKey, result);
    }
    return result;
};

let InitializeGame = (mainDiv) => {
    let barDiv = mainDiv.appendNewChild("div");
    barDiv.classList.add("barDiv");

    let gameStateKey = "gameState";
    let gameModel = GameModel(roundCount, winTarget);
    gameModel.serializationKey = gameStateKey;
    let gameView = GameView(gameModel);
    if (cookieMonster.has(gameStateKey)) {
        gameModel.deserialize(cookieMonster.get(gameStateKey));
    }
    barDiv.appendNewChild("div").appendChild(gameView.setBarButton);
    barDiv.appendNewChild("div").appendChild(gameView.barValueSpan);
    mainDiv.appendChild(gameView.roundTable);
    mainDiv.appendNewChild("div").appendChild(gameView.resultsTable);
};

let InitializeTimeOutOfBounds = (mainDiv, loadTiming) => {
    let oobString = "Sorry, you loaded the game " + 
        loadTiming.hours + " hours, " +
        loadTiming.minutes + " minutes, and " +
        loadTiming.seconds + " seconds too " +
        loadTiming.error + " today.";

    let appendDiv = (text) => {
        mainDiv.appendNewChild("div")
               .appendNewChild("span")
               .innerText = text;
    }
    appendDiv(oobString);
    mainDiv.appendNewChild("div").style.height = "4vw";
    appendDiv("You're locked out for the rest of the day.");
    mainDiv.appendNewChild("div").style.height = "4vw";
    appendDiv("Better luck tomorrow!");
};

let Initialize = () => {
    mainDiv = document.getElementById("main");
    attachAppendChild(mainDiv);
    let loadTiming = getWindowTiming(loadTime());
    if (loadTiming.okay) {
        InitializeGame(mainDiv);
    } else {
        InitializeTimeOutOfBounds(mainDiv, loadTiming);
    }
};

window.addEventListener('load', (e)=>{
    Initialize();
});
