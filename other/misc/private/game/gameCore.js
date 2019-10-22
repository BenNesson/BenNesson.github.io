let gameEvent = () => {
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

let attachAppendChild = (element) => {
    element.appendNewChild = (tag) => {
        let newChild = document.createElement(tag);
        attachAppendChild(newChild);
        element.appendChild(newChild);
        return newChild;
    };
};

let digitsFactor = 1000;

let formatScore = (score) => Math.round(score * digitsFactor) / digitsFactor;

let formatOdds = (odds) => "" + formatScore(odds * 100) + "%";

let factList = [ 1 ];
let fact = n => {
    for (let i = factList.length; i <= n; i++) {
        factList.push(factList[i - 1] * i);
    }
    return factList[n];
};

let nCr = (n, r) => fact(n) / (fact(r) * fact(n - r));

let calcOdds = (loseOdds, winsNeeded, roundsLeft) => {
    if (winsNeeded > roundsLeft) { return 0; }
    if (winsNeeded <= 0) { return 1; }

    let winOdds = 1 - loseOdds;
    totalOdds = 0;
    for (let i = winsNeeded; i <= roundsLeft; i++) {
        let oddsOfWins = Math.pow(winOdds, i);
        let oddsOfLosses = Math.pow(loseOdds, roundsLeft - i);
        let oddsEach = oddsOfWins * oddsOfLosses;
        let oddsThisN = oddsEach * nCr(roundsLeft, i);
        totalOdds = totalOdds + oddsThisN;
    }
    return totalOdds;
};

let cookieMonster = (() => {
    let _this = {
        get cookieDict() {
            let result = {};
            let cookieStr = document.cookie;
            if (cookieStr !== "") {
                let cookieSplit = cookieStr.split("; ");
                for (let i in cookieSplit) {
                    let entry = cookieSplit[i];
                    let entrySplit = entry.split("=");
                    result[entrySplit[0]] = entrySplit[1];
                }
            }
            return result;
        },
    };

    let _getExprTime = () => {
        let today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        let result = new Date(today.setMilliseconds(0) + 24 * 60 * 60 * 1000);
        return result.toUTCString();
    };

    _this.get = (key) => _this.cookieDict[key];
    _this.set = (key, val) => document.cookie = key + "=" + val + "; expires=" + _getExprTime();
    _this.has = (key) => Object.keys(_this.cookieDict).indexOf(key) > -1;
    _this.delete = (key) => document.cookie = key + '=""; expires=Thu, 01 Jan 1970 00:00:00 UTC';
    return _this;
})();
