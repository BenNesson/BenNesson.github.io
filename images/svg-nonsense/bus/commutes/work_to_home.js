/// <reference path="../OBA_data.js" />

function walk(min) {
    return { w: min };
}

function busStep(route, start, end) {
    return { r: route, s: start, e: end };
}

function defineJourneys() {
    var d = defineIdentifiers();
    return [
        {
            name: '32 -> 45',
            steps: [
                walk(3),
                busStep(d.route.Number32, d.stop.OnWoodlawn.At35th.EB, d.stop.OnUniversity.AtCampusParkway.EB),
                walk(2),
                busStep(d.route.Number45, d.stop.OnUniversity.At41st.NB, d.stop.OnStone.At85th.WB)
            ]
        },
        {
            name: '31 -> 45',
            steps: [
                walk(3),
                busStep(d.route.Number31, d.stop.OnWoodlawn.At35th.EB, d.stop.OnUniversity.AtCampusParkway.EB),
                walk(2),
                busStep(d.route.Number45, d.stop.OnUniversity.At41st.NB, d.stop.OnStone.At85th.WB)
            ]
        },
        {
            name: '62 SB -> E-Line',
            steps: [
                walk(7),
                busStep(d.route.Number62, d.stop.OnStone.At35th.WB, d.stop.OnDexter.AtGaler.SB),
                walk(4),
                busStep(d.route.ELine, d.stop.OnAurora.AtGaler.NB, d.stop.OnAurora.At85th.NB)
            ]
        },
        {
            name: '62 -> 45',
            steps: [
                walk(8),
                busStep(d.route.Number62, d.stop.OnStone.At35th.EB, d.stop.OnRavenna.AtWoodlawn.SEB),
                walk(2),
                busStep(d.route.Number45, d.stop.OnRavenna.AtWoodlawn.NWB, d.stop.OnStone.At85th.WB)
            ]
        },
        {
            name: '62 NB -> E-Line',
            steps: [
                walk(8),
                busStep(d.route.Number62, d.stop.OnStone.At35th.EB, d.stop.OnStone.At45th.EB),
                walk(7),
                busStep(d.route.ELine, d.stop.OnAurora.At46th.NB, d.stop.OnAurora.At85th.NB)
            ]
        },
        {
            name: '28X -> 45',
            steps: [
                walk(15),
                busStep(d.route.Number28X, d.stop.OnAurora.At38th.NWB, d.stop.On8th.At85th.NB),
                walk(3),
                busStep(d.route.Number45, d.stop.On8th.At85th.EB, d.stop.OnAurora.At85th.EB)
            ]
        },
        {
            name: '5 -> 45',
            steps: [
                walk(15),
                busStep(d.route.Number5, d.stop.OnAurora.At38th.NWB, d.stop.OnGreenwood.At85th.NB),
                walk(2),
                busStep(d.route.Number45, d.stop.OnGreenwood.At85th.EB, d.stop.OnAurora.At85th.EB)
            ]
        },
        {
            name: '28X -> E-Line',
            steps: [
                walk(16),
                busStep(d.route.Number28X, d.stop.OnAurora.At38th.SEB, d.stop.OnAurora.AtGaler.SB),
                walk(2),
                busStep(d.route.ELine, d.stop.OnAurora.AtGaler.NB, d.stop.OnAurora.At85th.NB)
            ]
        }
    ];
}
