/// <reference path="./gameCore.js" />
/// <reference path="./gameModel.js" />
/// <reference path="./gameView.js" />

let roundCount = 9;
let winTarget = 8;
let wins = 0;
let mainDiv;
let bar;
let scoreThings = [];

let displayThing = (tag) => {
    let value = 0;
    let element = document.createElement(tag);
    return {
        get element() { return element; },
        get value() { return value; },
        set value(v) {
            value = v;
            element.innerText = v;
        }
    };
}

let scoreThing = (i) => {
    let display = displayThing("td");
    return {
        get element() { return display.element; },
        get score() { return display.value; },
        set score(v) { display.value = v; }
    };
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

let setBar = () => {
    bar = Math.random();
};

let playRound = (i) => {
    scoreThings[i].score = Math.random();
    if (scoreThings[i].score > bar){
        wins++;
    }
};

window.addEventListener('load', (e)=>{
    Initialize();
});
