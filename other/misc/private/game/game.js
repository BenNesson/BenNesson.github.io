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

    let gameModel = GameModel(roundCount, winTarget);
    let gameView = GameView(gameModel);
    barDiv.appendNewChild("div").appendChild(gameView.setBarButton);
    barDiv.appendNewChild("div").appendChild(gameView.barValueSpan);
    /*
    for (let i = 0; i < roundCount; i++) {
        let valueView = ValueView(gameModel.getRoundModel(i));
        valueView.buttonText = "Play...";
        valueView.enable();
        scoreThings.push(valueView);
    }

    let table = mainDiv.appendNewChild("table");
    let headerRow = table.appendNewChild("tr");
    headerRow.appendNewChild("th").innerText = "Round";
    headerRow.appendNewChild("th").innerText = "Play";
    headerRow.appendNewChild("th").innerText = "Score";
    for (let i = 0; i < roundCount; i++) {
        let row = table.appendNewChild("tr");
        row.appendNewChild("td").innerText = "Round " + (i + 1);
        row.appendNewChild("td").appendChild(scoreThings[i].playButton);
        row.appendNewChild("td").appendChild(scoreThings[i].scoreSpan);
    }
    let totalRow = table.appendNewChild("tr");
    /*/
    mainDiv.appendChild(gameView.roundTable);
    //*/
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
