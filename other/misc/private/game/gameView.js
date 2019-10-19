/// <reference path="./gameCore.js" />
/// <reference path="./gameModel.js" />

let ValueView = (valModel) => {
    let m_playButton = document.createElement("input");
    m_playButton.disabled = true;
    m_playButton.type = "button";
    m_playButton.addEventListener("click", () => { valModel.evaluate(); });
    m_playButton.classList.add("gameButton");
    let _isEnabled = () => !m_playButton.disabled;
    let _enable = () => { m_playButton.disabled = valModel.isSet; };
    let _disable = () => { m_playButton.disabled = true; };

    let m_scoreSpan = document.createElement("span");
    m_scoreSpan.innerText = ". . .";

    let _formatValue = (v) => {
        let factor = 1000;
        return Math.floor(factor * v) / factor;
    }

    let _handleEval = (v) => {
        m_scoreSpan.innerText = _formatValue(v);
        _disable();
    };
    valModel.evaluatedEvent.addHandler(_handleEval);

    return {
        get playButton() { return m_playButton; },
        get buttonText() { return m_playButton.value; },
        set buttonText(val) { m_playButton.value = val; },
        get isEnabled() { return _isEnabled(); },
        enable: _enable,
        disable: _disable,
        get scoreSpan() { return m_scoreSpan; }
    };
};

let GameView = (gameModel) => {
    let m_barView = ValueView(gameModel.barModel);
    m_barView.buttonText = "Set Bar...";
    let m_roundViews = [];
    for (let i = 0; i < gameModel.roundCount; i++){
        let roundView = ValueView(gameModel.getRoundModel(i)) ;
        roundView.buttonText = "Play...";
        m_roundViews.push(roundView);
    }
    let m_resultsSpan = document.createElement("span");
    gameModel.gameWonEvent.addHandler(rc => {
        m_resultsSpan.innerText = "Yay you won!  (after " + rc + " rounds)";
    });
    gameModel.gameLostEvent.addHandler(rc => {
        m_resultsSpan.innerText = "Sorry, you lost.  (after " + rc + " rounds)";
    });

    m_barView.enable();
    gameModel.barModel.evaluatedEvent.addHandler(x => {
        for (let i = 0; i < gameModel.roundCount; i++) {
            m_roundViews[i].enable();
        }
    });
    let m_roundTable = (()=>{
        let table = document.createElement("table");
        attachAppendChild(table);
        let headerRow = table.appendNewChild("tr");
        headerRow.appendNewChild("th").innerText = "Round";
        headerRow.appendNewChild("th").innerText = "Play";
        headerRow.appendNewChild("th").innerText = "Score";
        for (let i = 0; i < gameModel.roundCount; i++) {
            let roundModel = gameModel.getRoundModel(i);
            let row = table.appendNewChild("tr");
            roundModel.evaluatedEvent.addHandler(score => {
                row.style.background = (score >= gameModel.barModel.value ? "green" : "red");
            });
            row.appendNewChild("td").innerText = "Round " + (i + 1);
            row.appendNewChild("td").appendNewChild("div").appendChild(m_roundViews[i].playButton);
            row.appendNewChild("td").appendNewChild("div").appendChild(m_roundViews[i].scoreSpan);
        }

        return table;
    })();

    let m_resultsTable = (() => {
        let table = document.createElement("table");
        attachAppendChild(table);

        let addResultEntry = (label) => {
            let row = table.appendNewChild("tr");
            row.appendNewChild("td").innerText = label;
            return row.appendNewChild("td");
        };

        addResultEntry("Rounds").appendNewChild("span").innerText = gameModel.roundCount;
        addResultEntry("Win Target").appendNewChild("span").innerText = gameModel.winTarget;
        
        let winCountSpan = addResultEntry("Wins").appendNewChild("span");
        winCountSpan.innerText = 0;
        let roundsLeftSpan = addResultEntry("Rounds Remaining").appendNewChild("span");
        roundsLeftSpan.innerText = gameModel.roundCount;
        for (let i = 0; i < gameModel.roundCount; i++) {
            gameModel.roundEvaluatedEvents[i].addHandler(_ => {
                winCountSpan.innerText = gameModel.roundsWon;
                roundsLeftSpan.innerText = gameModel.roundsLeft;
            });
        }

        let oddsDiv = addResultEntry("Odds");
        let oddsSpan = oddsDiv.appendNewChild("span");
        oddsSpan.innerText = formatOdds(1/(gameModel.roundCount + 1));
        let reCalcOdds = () => {
            let newOdds = calcOdds(
                gameModel.barModel.value,
                gameModel.winsNeeded,
                gameModel.roundsLeft);
            oddsSpan.innerText = formatOdds(newOdds);
        }
        gameModel.barModel.evaluatedEvent.addHandler(_ => { reCalcOdds(); });
        for (let i = 0; i < gameModel.roundCount; i++) {
            gameModel.getRoundModel(i).evaluatedEvent.addHandler(_ => { reCalcOdds(); });
        }

        let playRemaining = (start) => {
            let triggerNext = (i) => {
                setTimeout(() => { playRemaining(i); }, 250);
            };
            if (typeof(start) === "undefined") {
                triggerNext(0);
            } else {
                for (let i = start; i < gameModel.roundCount; i++) {
                    let roundModel = gameModel.getRoundModel(i);
                    if (!roundModel.isSet) {
                        roundModel.evaluate();
                        triggerNext(i + 1);
                        break;
                    }
                }
            }
        };

        let outcomeDiv = addResultEntry("Outcome");
        let outcomeSpan = outcomeDiv.appendNewChild("span");
        outcomeSpan.innerText = "In progress...";
        gameModel.gameWonEvent.addHandler(rc => {
            outcomeDiv.style.background = "green";
            outcomeSpan.innerText = "WON (in " + rc + " rounds)";
            playRemaining();
        });
        gameModel.gameLostEvent.addHandler(rc => {
            outcomeDiv.style.background = "red";
            outcomeSpan.innerText = "LOST (in " + rc + " rounds)";
            playRemaining();
        });

        return table;
    })();

    return {
        get roundTable() { return m_roundTable; },
        get setBarButton() { return m_barView.playButton; },
        get barValueSpan() { return m_barView.scoreSpan; },
        get resultsTable() { return m_resultsTable; },
    };
};
