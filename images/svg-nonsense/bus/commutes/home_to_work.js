/// <reference path="../OBA_data.js" />

function defineJourneys() {
    let d = defineIdentifiers();
    let route = d.route;
    let stop = d.stop;

    let walkStep = min => ({ w: min });
    let busStep = (route, start, end) => ({ r: route, s: start, e: end });
    let ride = route => ({ from: boardStop => ({ to: departStop => ({ r: route, s: boardStop, e: departStop }) }) });

    return [
        {
            name: '45 -> 5',
            steps: [
                busStep(route.Number45, stop.OnAurora.At85th.WB, stop.OnGreenwood.At85th.WB),
                walkStep(2),
                busStep(route.Number5, stop.OnGreenwood.At85th.SB, stop.OnAurora.At38th.SEB),
                walkStep(15)
            ]
        },
        {
            name: '45 -> 28X',
            steps: [
                busStep(route.Number45, stop.OnAurora.At85th.WB, stop.On8th.At85th.WB),
                walkStep(3),
                busStep(route.Number28X, stop.On8th.At85th.SB, stop.OnAurora.At38th.SEB),
                walkStep(15)
            ]
        },
        {
            name: 'E-Line -> walk',
            steps: [
                busStep(route.ELine, stop.OnAurora.At85th.SB, stop.OnAurora.At46th.SB),
                walkStep(30)
            ]
        },
        {
            name: 'E-Line -> 62 SB',
            steps: [
                busStep(route.ELine, stop.OnAurora.At85th.SB, stop.OnAurora.At46th.SB),
                walkStep(6),
                busStep(route.Number62, stop.OnStone.At45th.SB, stop.OnStone.At35th.WB),
                walkStep(8)
            ]
        },
        {
            name: 'E-Line -> 28X',
            steps: [
                busStep(route.ELine, stop.OnAurora.At85th.SB, stop.OnAurora.AtGaler.SB),
                walkStep(2),
                busStep(route.Number28X, stop.OnAurora.AtGaler.NB, stop.OnAurora.At38th.NWB),
                walkStep(16)
            ]
        },
        {
            name: 'E-Line -> 62 NB',
            steps: [
                busStep(route.ELine, stop.OnAurora.At85th.SB, stop.OnAurora.AtGaler.SB),
                walkStep(3),
                busStep(route.Number62, stop.OnDexter.AtGaler.NB, stop.OnStone.At35th.EB),
                walkStep(7)
            ]
        },
        {
            name: '45 -> 62',
            steps: [
                busStep(route.Number45, stop.OnStone.At85th.EB, stop.OnRavenna.AtWoodlawn.SEB),
                walkStep(2),
                busStep(route.Number62, stop.OnRavenna.AtWoodlawn.SWB, stop.OnStone.At35th.WB),
                walkStep(8)
            ]
        }
    ];
}
