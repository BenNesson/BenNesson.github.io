/// <reference path="../OBA_data.js" />

var walkStep = min => ({ w: min });
var busStep = (route, start, end) => ({ r: route, s: start, e: end });

function defineJourneys() {
    var d = defineIdentifiers();
    return [
        {
            name: '45 -> 5',
            steps: [
                busStep(d.route.Number45, d.stop.OnAurora.At85th.WB, d.stop.OnGreenwood.At85th.WB),
                walkStep(2),
                busStep(d.route.Number5, d.stop.OnGreenwood.At85th.SB, d.stop.OnAurora.At38th.SEB),
                walkStep(15)
            ]
        },
        {
            name: '45 -> 28X',
            steps: [
                busStep(d.route.Number45, d.stop.OnAurora.At85th.WB, d.stop.On8th.At85th.WB),
                walkStep(3),
                busStep(d.route.Number28X, d.stop.On8th.At85th.SB, d.stop.OnAurora.At38th.SEB),
                walkStep(15)
            ]
        },
        {
            name: 'E-Line -> walk',
            steps: [
                busStep(d.route.ELine, d.stop.OnAurora.At85th.SB, d.stop.OnAurora.At46th.SB),
                walkStep(30)
            ]
        },
        {
            name: 'E-Line -> 62 SB',
            steps: [
                busStep(d.route.ELine, d.stop.OnAurora.At85th.SB, d.stop.OnAurora.At46th.SB),
                walkStep(6),
                busStep(d.route.Number62, d.stop.OnStone.At45th.SB, d.stop.OnStone.At35th.WB),
                walkStep(8)
            ]
        },
        {
            name: 'E-Line -> 28X',
            steps: [
                busStep(d.route.ELine, d.stop.OnAurora.At85th.SB, d.stop.OnAurora.AtGaler.SB),
                walkStep(2),
                busStep(d.route.Number28X, d.stop.OnAurora.AtGaler.NB, d.stop.OnAurora.At38th.NWB),
                walkStep(16)
            ]
        },
        {
            name: 'E-Line -> 62 NB',
            steps: [
                busStep(d.route.ELine, d.stop.OnAurora.At85th.SB, d.stop.OnAurora.AtGaler.SB),
                walkStep(3),
                busStep(d.route.Number62, d.stop.OnDexter.AtGaler.NB, d.stop.OnStone.At35th.EB),
                walkStep(7)
            ]
        },
        {
            name: '45 -> 62',
            steps: [
                busStep(d.route.Number45, d.stop.OnStone.At85th.EB, d.stop.OnRavenna.AtWoodlawn.SEB),
                walkStep(2),
                busStep(d.route.Number62, d.stop.OnRavenna.AtWoodlawn.SWB, d.stop.OnStone.At35th.WB),
                walkStep(8)
            ]
        }
    ];
}
