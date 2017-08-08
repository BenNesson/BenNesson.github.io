// JavaScript source code
(function (scripts) {
    let svgNS = 'http://www.w3.org/2000/svg';
    let root = document.getElementsByTagNameNS(svgNS, 'svg')[0];
    let lastScript;
    let addScript = function (scriptPath) {
        let newScript = document.createElementNS(svgNS, 'script');
        newScript.setAttributeNS(svgNS, 'href', scriptPath);
        if (typeof (lastScript) === 'undefined') {
            let thisScript = document.currentScript;
            thisScript.insertAdjacentElement('afterend', newScript);
            root.removeChild(thisScript);
        } else {
            lastScript.insertAdjacentElement('afterend', newScript);
        }
        lastScript = newScript;
    };
    for (let i in scripts) {
        addScript(scripts[i]);
    }
    lastScript.setAttribute('onload', "alert('bleep')");
    lastScript.setAttribute('onerror', "alert('shit.')");
})([
    "./bus_svg_main.js"
    ]);

function main(evt){}
