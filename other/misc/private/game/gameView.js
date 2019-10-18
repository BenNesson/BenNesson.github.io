/// <reference path="./gameCore.js" />
/// <reference path="./gameModel.js" />

let ValueView = (valModel) => {
    let m_playButton = document.createElement("input");
    m_playButton.disabled = true;
    m_playButton.type = "button";
    m_playButton.addEventListener("click", () => { valModel.evaluate(); });
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
            row.appendNewChild("td").appendChild(m_roundViews[i].playButton);
            row.appendNewChild("td").appendChild(m_roundViews[i].scoreSpan);
        }

        return table;
    })();

    return {
        get roundTable() { return m_roundTable; },
        get setBarButton() { return m_barView.playButton; },
        get barValueSpan() { return m_barView.scoreSpan; },
        //get 
    };
};
