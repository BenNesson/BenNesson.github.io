let roundCount = 9;
let winTarget = 8;
let wins = 0;
let mainDiv;
let bar;
let scoreThings = [];

let modelEvent = () => {
    let m_fired = false;
    let m_onFire = [];
    return {
        get fired() { return m_fired; },
        addHandler: (handler) => {
            if (!m_fired) {
                m_onFire.push(handler);
            }
        },
        fire: (v) => {
            if (!m_fired) {
                m_fired = true;
                for (let i in m_onFire) {
                    m_onFire[i](v);
                }
            }
        }
    };
};

let valueModel = () => {
    let m_isSet = false;
    let m_value = undefined;
    let m_evalEvent = modelEvent();
    return {
        get isSet() { return m_isSet; },
        get value() { return m_value; },
        get evaluatedEvent() {
            if (!m_isSet) {
                return m_evalEvent;
            } else {
                return undefined;
            }
        },
        evaluate: () => {
            if (!m_isSet) {
                m_isSet = true;
                m_value = Math.random();
                m_evalEvent.fire(m_value);
            }
        },
    };
};

let GameModel = (roundCount, winTarget) => {
    let m_barValue = valueModel();
    let m_gameEndedEvent = modelEvent();
    let m_gameWonEvent = modelEvent();
    let m_gameLostEvent = modelEvent();
    let m_roundsPlayed = 0;
    let m_wins = 0;

    let roundsLeft = () => roundCount - m_roundsPlayed;
    let winsNeeded = () => winTarget - m_wins;
    let canWin = () => roundsLeft() >= winsNeeded();

    let playedRound = (v) => {
        m_roundsPlayed++;
        if (v > m_barValue.value) {
            m_wins++;
            if (m_wins >= winTarget) {
                m_gameWonEvent.fire(m_roundsPlayed);
            }
        } else if (!canWin()) {
            m_gameLostEvent.fire(m_roundsPlayed);
        }
        if (m_roundsPlayed === roundCount) {
            m_gameEndedEvent.fire(m_wins);
        }
    };

    let m_rounds = [];
    let m_roundEvaluatedEvents = [];

    for (let i = 0; i < roundCount; i++) {
        let newRound = valueModel();
        newRound.evaluatedEvent.addHandler(playedRound);
        m_rounds.push(newRound);
        m_roundEvaluatedEvents.push(newRound.evaluatedEvent);
    }

    return {
        get barSetEvent() { return m_barValue.evaluatedEvent; },
        get roundEvaluatedEvents() { return m_roundEvaluatedEvents; },
        get gameEndedEvent() { return m_gameEndedEvent; },
        get gameWonEvent() { return m_gameWonEvent; },
        get gameLostEvent() { return m_gameLostEvent; },
        get roundsPlayed() { return m_roundsPlayed; },
        get roundsWon() { return m_wins; },
        get roundsLeft() { return roundsLeft(); },
        get winsNeeded() { return winsNeeded(); },
        setBar: () => { m_barValue.evaluate(); },
        playRound: (i) => { m_rounds[i].evaluate(); },
    };
};

let TestGame = (roundCount, winTarget) => {
    let gameModel = GameModel(roundCount, winTarget);
    let reporter = (str) => {
        return (v) => {
            console.log(str + " fired: " + v);
        };
    };
    gameModel.barSetEvent.addHandler(reporter("barSetEvent"));
    gameModel.gameEndedEvent.addHandler(reporter("gameEndedEvent"));
    gameModel.gameWonEvent.addHandler(reporter("gameWonEvent"));
    gameModel.gameLostEvent.addHandler(reporter("gameLostEvent"));
    for (let i = 0; i < roundCount; i++) {
        gameModel.roundEvaluatedEvents[i].addHandler(reporter("roundEvaluatedEvents[" + i + "]"));
    }
    return gameModel;
};

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

let attachAppendChild = (element) => {
    element.appendNewChild = (tag) => {
        let newChild = document.createElement(tag);
        attachAppendChild(newChild);
        element.appendChild(newChild);
        return newChild;
    };
};

let Initialize = () => {
    mainDiv = document.getElementById("main");
    attachAppendChild(mainDiv);

    for (let i = 0; i < roundCount; i++) {
        scoreThings.push(scoreThing());
    }

    let table = mainDiv.appendNewChild("table");
    let headerRow = table.appendNewChild("tr");
    headerRow.appendNewChild("th").innerText = "BEEP";
    headerRow.appendNewChild("th").innerText = "BOOP";
    for (let i = 0; i < roundCount; i++) {
        let row = table.appendNewChild("tr");
        row.appendNewChild("td").innerText = "Round " + (i + 1);
        row.appendChild(scoreThings[i].element);
    }
    let totalRow = table.appendNewChild("tr");

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
