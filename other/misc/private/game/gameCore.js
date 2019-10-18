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
