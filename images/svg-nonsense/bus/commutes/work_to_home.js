/// <reference path="./OBA_data.js" />

function defineJourneys() {
    let d = defineIdentifiers();
    let route = d.route;
    let stop = d.stop;

    let walkStep = min => ({ w: min });
    let ride = route => ({ from: boardStop => ({ to: departStop => ({ r: route, s: boardStop, e: departStop }) }) });

    // define the stuff that gets used multiple times.
    let ride62 = ride(route.Number62),
        ride62East = ride62.from(stop.OnStone.At35th.EB),
        ride45 = ride(route.Number45),
        rideELine = ride(route.ELine),
        rideELineGalerTo85th = rideELine
            .from(stop.OnAurora.AtGaler.NB)
            .to(stop.OnAurora.At85th.NB),
        ride28X = ride(route.Number28X);

    return [
        {
            name: '32 -> 45',
            steps: [
                walkStep(3),
                ride(route.Number32)
                    .from(stop.OnWoodlawn.At35th.EB)
                    .to(stop.OnUniversity.AtCampusParkway.EB),
                walkStep(2),
                ride45
                    .from(stop.OnUniversity.At41st.NB)
                    .to(stop.OnStone.At85th.WB)
            ]
        },
        {
            name: '31 -> 45',
            steps: [
                walkStep(3),
                ride(route.Number31)
                    .from(stop.OnWoodlawn.At35th.EB)
                    .to(stop.OnUniversity.AtCampusParkway.EB),
                walkStep(2),
                ride45
                    .from(stop.OnUniversity.At41st.NB)
                    .to(stop.OnStone.At85th.WB)
            ]
        },
        {
            name: '62 SB -> E-Line',
            steps: [
                walkStep(7),
                ride62
                    .from(stop.OnStone.At35th.WB)
                    .to(stop.OnDexter.AtGaler.SB),
                walkStep(4),
                rideELineGalerTo85th
            ]
        },
        {
            name: '62 -> 45',
            steps: [
                walkStep(8),
                ride62East.to(stop.OnRavenna.AtWoodlawn.SEB),
                walkStep(2),
                ride45
                    .from(stop.OnRavenna.AtWoodlawn.NWB)
                    .to(stop.OnStone.At85th.WB)
            ]
        },
        {
            name: '62 NB -> E-Line',
            steps: [
                walkStep(8),
                ride62East.to(stop.OnStone.At45th.EB),
                walkStep(7),
                rideELine
                    .from(stop.OnAurora.At46th.NB)
                    .to(stop.OnAurora.At85th.NB)
            ]
        },
        {
            name: '28X -> 45',
            steps: [
                walkStep(15),
                ride28X
                    .from(stop.OnAurora.At38th.NWB)
                    .to(stop.On8th.At85th.NB),
                walkStep(3),
                ride45
                    .from(stop.On8th.At85th.EB)
                    .to(stop.OnAurora.At85th.EB)
            ]
        },
        {
            name: '5 -> 45',
            steps: [
                walkStep(15),
                ride(route.Number5)
                    .from(stop.OnAurora.At38th.NWB)
                    .to(stop.OnGreenwood.At85th.NB),
                walkStep(2),
                ride45
                    .from(stop.OnGreenwood.At85th.EB)
                    .to(stop.OnAurora.At85th.EB)
            ]
        },
        {
            name: '28X -> E-Line',
            steps: [
                walkStep(16),
                ride28X
                    .from(stop.OnAurora.At38th.SEB)
                    .to(stop.OnAurora.AtGaler.SB),
                walkStep(2),
                rideELineGalerTo85th
            ]
        }
    ];
}
