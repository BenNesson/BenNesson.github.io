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
        rideELine = ride(route.ELine),
        rideELineGalerTo165th = rideELine
            .from(stop.OnAurora.AtGaler.NB)
            .to(stop.OnAurora.At165th.NB),
        ride28X = ride(route.Number28X),
        ride26 = ride(route.Number26),
        ride26ToNSC = ride26
            .from(stop.On40th.AtWallingford.EB)
            .to(stop.OnCorliss.At92nd.EB),
        ride346FromNSC = ride(route.Number346)
            .from(stop.OnCorliss.At92nd.WB)
            .to(stop.OnMeridian.At167th.NB),
        ride31East = ride(route.Number31).from(stop.On35th.AtWoodlawn.EB),
        ride32East = ride(route.Number32).from(stop.On35th.AtWoodlawn.EB),
        ride373FromUDistrict = ride(route.Number373)
            .from(stop.OnUniversity.At41st.NB)
            .to(stop.OnMeridian.At175th.NB),
        walkTo31Or32 = walkStep(3),
        walkFromELine = walkStep(18),
        walkFrom373 = walkStep(13),
        walkFrom346 = walkStep(5);

    return [
        {
            name: '62 SB -> E-Line',
            steps: [
                walkStep(7),
                ride62
                    .from(stop.OnStone.At35th.WB)
                    .to(stop.OnDexter.AtGaler.SB),
                walkStep(4),
                rideELineGalerTo165th,
                walkFromELine
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
                    .to(stop.OnAurora.At165th.NB),
                walkFromELine
            ]
        },
        {
            name: '64 NB -> 26 -> 346',
            steps: [
                walkStep(8),
                ride62East.to(stop.OnWoodlawn.AtRavenna.SEB),
                walkStep(2),
                ride26
                    .from(stop.OnRavenna.AtWoodlawn.SEB_26Only)
                    .to(stop.OnCorliss.At92nd.EB),
                walkStep(2),
                ride346FromNSC,
                walkFrom346
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
                rideELineGalerTo165th,
                walkFromELine
            ]
        },
        {
            name: '26 -> 346',
            steps: [
                walkStep(11),
                ride26ToNSC,
                walkStep(2),
                ride346FromNSC,
                walkFrom346
            ]
        },
        {
            name: '31 -> 26 -> 346',
            steps: [
                walkTo31Or32,
                ride31East.to(stop.On40th.AtWallingford.EB),
                ride26ToNSC,
                walkStep(2),
                ride346FromNSC,
                walkFrom346
            ]
        },
        {
            name: '32 -> 26 -> 346',
            steps: [
                walkTo31Or32,
                ride32East.to(stop.On40th.AtWallingford.EB),
                ride26ToNSC,
                walkStep(2),
                ride346FromNSC,
                walkFrom346
            ]
        },
        {
            name: '31 -> 373',
            steps: [
                walkTo31Or32,
                ride31East.to(stop.OnCampusParkway.AtUniversity.EB),
                walkStep(5),
                ride373FromUDistrict,
                walkFrom373
            ]
        },
        {
            name: '32 -> 373',
            steps: [
                walkTo31Or32,
                ride32East.to(stop.OnCampusParkway.AtUniversity.EB),
                walkStep(5),
                ride373FromUDistrict,
                walkFrom373
            ]
        }
    ];
}
