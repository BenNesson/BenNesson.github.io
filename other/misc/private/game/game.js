/// <reference path="./gameCore.js" />
/// <reference path="./gameModel.js" />
/// <reference path="./gameView.js" />

let roundCount = 12;
let winTarget = 11;
let wins = 0;
let mainDiv;
let bar;
let scoreThings = [];

let isDevMode = (()=>{
    let devCheck = "devCheck";
    cookieMonster.set(devCheck, devCheck);
    if (cookieMonster.get(devCheck) === devCheck) {
        cookieMonster.delete(devCheck);
        return false;
    }
    return true;
})();

let isWindowOpen = (()=> {
    let now = new Date();
    let nowHours = now.getHours();
    return nowHours === 15;
})();

//let isTooEarly 

let tomorrowMidnight = (() => {
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    return new Date(today.setMilliseconds(0) + 24 * 60 * 60 * 1000);
})();

let mcSim = (iterations) => {
    let winCount = 0;
    for (let i = 0; i < iterations; i++) {
        let keepPlaying = true;
        let gm = GameModel(roundCount, winTarget);
        gm.gameWonEvent.addHandler(()=>{
            keepPlaying = false;
            winCount++;
        });
        gm.gameLostEvent.addHandler(()=>{
            keepPlaying = false;
        });
        gm.setBar();
        for (let j = 0; keepPlaying && j < roundCount; j++) {
            gm.playRound(j);
        }
    }
    return winCount / iterations;
};

let Initialize = () => {
    mainDiv = document.getElementById("main");
    attachAppendChild(mainDiv);
    let barDiv = mainDiv.appendNewChild("div");
    barDiv.classList.add("barDiv");

    let gameModel = GameModel(roundCount, winTarget);
    let gameView = GameView(gameModel);
    barDiv.appendNewChild("div").appendChild(gameView.setBarButton);
    barDiv.appendNewChild("div").appendChild(gameView.barValueSpan);
    mainDiv.appendChild(gameView.roundTable);
    mainDiv.appendNewChild("div").appendChild(gameView.resultsTable);
};

window.addEventListener('load', (e)=>{
    Initialize();
});
