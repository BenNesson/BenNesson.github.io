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
            name: '32 -> 45',
            steps: [
                walkStep(3),
                busStep(route.Number32, stop.OnWoodlawn.At35th.EB, stop.OnUniversity.AtCampusParkway.EB),
                walkStep(2),
                busStep(route.Number45, stop.OnUniversity.At41st.NB, stop.OnStone.At85th.WB)
            ]
        },
        {
            name: '31 -> 45',
            steps: [
                walkStep(3),
                busStep(route.Number31, stop.OnWoodlawn.At35th.EB, stop.OnUniversity.AtCampusParkway.EB),
                walkStep(2),
                busStep(route.Number45, stop.OnUniversity.At41st.NB, stop.OnStone.At85th.WB)
            ]
        },
        {
            name: '62 SB -> E-Line',
            steps: [
                walkStep(7),
                busStep(route.Number62, stop.OnStone.At35th.WB, stop.OnDexter.AtGaler.SB),
                walkStep(4),
                busStep(route.ELine, stop.OnAurora.AtGaler.NB, stop.OnAurora.At85th.NB)
            ]
        },
        {
            name: '62 -> 45',
            steps: [
                walkStep(8),
                busStep(route.Number62, stop.OnStone.At35th.EB, stop.OnRavenna.AtWoodlawn.SEB),
                walkStep(2),
                busStep(route.Number45, stop.OnRavenna.AtWoodlawn.NWB, stop.OnStone.At85th.WB)
            ]
        },
        {
            name: '62 NB -> E-Line',
            steps: [
                walkStep(8),
                busStep(route.Number62, stop.OnStone.At35th.EB, stop.OnStone.At45th.EB),
                walkStep(7),
                busStep(route.ELine, stop.OnAurora.At46th.NB, stop.OnAurora.At85th.NB)
            ]
        },
        {
            name: '28X -> 45',
            steps: [
                walkStep(15),
                busStep(route.Number28X, stop.OnAurora.At38th.NWB, stop.On8th.At85th.NB),
                walkStep(3),
                busStep(route.Number45, stop.On8th.At85th.EB, stop.OnAurora.At85th.EB)
            ]
        },
        {
            name: '5 -> 45',
            steps: [
                walkStep(15),
                busStep(route.Number5, stop.OnAurora.At38th.NWB, stop.OnGreenwood.At85th.NB),
                walkStep(2),
                busStep(route.Number45, stop.OnGreenwooAt85th.EB, stop.OnAurora.At85th.EB)
            ]
        },
        {
            name: '28X -> E-Line',
            steps: [
                walkStep(16),
                busStep(route.Number28X, stop.OnAurora.At38th.SEB, stop.OnAurora.AtGaler.SB),
                walkStep(2),
                busStep(route.ELine, stop.OnAurora.AtGaler.NB, stop.OnAurora.At85th.NB)
            ]
        }
    ];
}
