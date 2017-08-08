/// <reference path="./OBA_data.js" />

function defineJourneys() {
    let d = defineIdentifiers();
    let route = d.route;
    let stop = d.stop;

    let walkStep = min => ({ w: min });
    let ride = route => ({ from: boardStop => ({ to: departStop => ({ r: route, s: boardStop, e: departStop }) }) });

    // define the stuff that gets used multiple times
    let ride45 = ride(route.Number45),
        ride45West = ride45.from(stop.OnAurora.At85th.WB),
        rideELineSouth = ride(route.ELine).from(stop.OnAurora.At85th.SB),
        rideELineTo46th = rideELineSouth.to(stop.OnAurora.At46th.SB),
        rideELineToGaler = rideELineSouth.to(stop.OnAurora.AtGaler.SB),
        ride62 = ride(route.Number62),
        ride28X = ride(route.Number28X);

    return [
        {
            name: '45 -> 5',
            steps: [
                ride45West.to(stop.OnGreenwood.At85th.WB),
                walkStep(2),
                ride(route.Number5)
                    .from(stop.OnGreenwood.At85th.SB)
                    .to(stop.OnAurora.At38th.SEB),
                walkStep(15)
            ]
        },
        {
            name: '45 -> 28X',
            steps: [
                ride45West.to(stop.On8th.At85th.WB),
                walkStep(3),
                ride28X
                    .from(stop.On8th.At85th.SB)
                    .to(stop.OnAurora.At38th.SEB),
                walkStep(15)
            ]
        },
        {
            name: 'E-Line -> walk',
            steps: [
                rideELineTo46th,
                walkStep(30)
            ]
        },
        {
            name: 'E-Line -> 62 SB',
            steps: [
                rideELineTo46th,
                walkStep(6),
                ride62
                    .from(stop.OnStone.At45th.SB)
                    .to(stop.OnStone.At35th.WB),
                walkStep(8)
            ]
        },
        {
            name: 'E-Line -> 28X',
            steps: [
                rideELineToGaler,
                walkStep(2),
                ride28X
                    .from(stop.OnAurora.AtGaler.NB)
                    .to(stop.OnAurora.At38th.NWB),
                walkStep(16)
            ]
        },
        {
            name: 'E-Line -> 62 NB',
            steps: [
                rideELineToGaler,
                walkStep(3),
                ride62
                    .from(stop.OnDexter.AtGaler.NB)
                    .to(stop.OnStone.At35th.EB),
                walkStep(7)
            ]
        },
        {
            name: '45 -> 62',
            steps: [
                ride45
                    .from(stop.OnStone.At85th.EB)
                    .to(stop.OnRavenna.AtWoodlawn.SEB),
                walkStep(2),
                ride62
                    .from(stop.OnRavenna.AtWoodlawn.SWB)
                    .to(stop.OnStone.At35th.WB),
                walkStep(8)
            ]
        },
        {
            name: 'Just the 26',
            steps: [
                walkStep(10),
                ride(route.Number26)
                    .from(stop.OnWallingford.At82nd.SB)
                    .to(stop.OnAshworth.At40th.WB),
                walkStep(13)
            ]
        }
    ];
}
