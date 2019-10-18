/// <reference path="./gameCore.js" />

let ValueModel = () => {
    let m_isSet = false;
    let m_value = undefined;
    let m_evalEvent = gameEvent();
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
    let m_barValue = ValueModel();
    let m_gameEndedEvent = gameEvent();
    let m_gameWonEvent = gameEvent();
    let m_gameLostEvent = gameEvent();
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
        let newRound = ValueModel();
        newRound.evaluatedEvent.addHandler(playedRound);
        m_rounds.push(newRound);
        m_roundEvaluatedEvents.push(newRound.evaluatedEvent);
    }

    return {
        get roundCount() { return roundCount; },
        get winTarget() { return winTarget; },
        get barSetEvent() { return m_barValue.evaluatedEvent; },
        get roundEvaluatedEvents() { return m_roundEvaluatedEvents; },
        get gameEndedEvent() { return m_gameEndedEvent; },
        get gameWonEvent() { return m_gameWonEvent; },
        get gameLostEvent() { return m_gameLostEvent; },
        get roundsPlayed() { return m_roundsPlayed; },
        get roundsWon() { return m_wins; },
        get roundsLeft() { return roundsLeft(); },
        get winsNeeded() { return winsNeeded(); },
        get barModel() { return m_barValue; },
        get roundModels() { return m_rounds; },
        getRoundModel: (i) => m_rounds[i],
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

