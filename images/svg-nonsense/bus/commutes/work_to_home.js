/// <reference path="./OBA_data.js" />

function defineJourneys() {
    let d = defineIdentifiers();
    let route = d.route;
    let stop = d.stop;

    let walkStep = min => ({ w: min });
    let ride = route => ({
         from: boardStop => ({
             to: departStop => ({ r: route, s: boardStop, e: departStop })
         }),
         to: departStop => ({
             from: boardStop => ({ r: route, s: boardStop, e: departStop })
         })
    });

    // define the stuff that gets used multiple times.
    let ride62 = ride(route.Number62),
        ride62East = ride62.from(stop.OnStone.At35th.EB),
        ride62ToGreenLake = ride62East.to(stop.OnWoodlawn.AtRavenna.SEB),
        rideELineTo165th = ride(route.ELine)
            .to(stop.OnAurora.At165th.NB),
        rideELineGalerTo165th = rideELineTo165th
            .from(stop.OnAurora.AtGaler.NB),
        ride28X = ride(route.Number28X),
        ride26 = ride(route.Number26),
        ride26FromWork = ride26.from(stop.On40th.AtWallingford.EB),
        ride26ToNSC = ride26FromWork.to(stop.Misc.NorthSeattleCollege.EB),
        ride26To90th = ride26FromWork.to(stop.OnWallingford.At90th.NB),
        ride346FromNSC = ride(route.Number346)
            .from(stop.OnCollegeWay.At97th.NB)
            .to(stop.OnMeridian.At167th.NB),
        ride316Home = ride(route.Number316)
            .to(stop.OnMeridian.At167th.NB),
        ride316From90th = ride316Home
            .from(stop.OnWallingford.At90th.NB),
        ride316From42nd = ride316Home
            .from(stop.On42nd.At7th.NB),
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
                rideELineTo165th
                    .from(stop.OnAurora.At46th.NB),
                walkFromELine
            ]
        },
        {
            name: '62 NB -> 316',
            steps: [
                walkStep(8),
                ride62ToGreenLake,
                walkStep(5),
                ride(route.Number316)
                    .from(stop.OnRavenna.AtWoodlawn.NWB)
                    .to(stop.OnMeridian.At167th.NB),
                walkFrom346
            ]
        },
        {
            name: '62 NB -> 26 -> 346',
            steps: [
                walkStep(8),
                ride62ToGreenLake,
                walkStep(2),
                ride26
                    .from(stop.OnRavenna.AtWoodlawn.SEB_26Only)
                    .to(stop.Misc.NorthSeattleCollege.EB),
                walkStep(4),
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
            name: '26 -> 316',
            steps: [
                walkStep(11),
                ride26To90th,
                ride316From90th,
                walkFrom346
            ]
        },
        {
            name: '26 -> 346',
            steps: [
                walkStep(11),
                ride26ToNSC,
                walkStep(4),
                ride346FromNSC,
                walkFrom346
            ]
        },
        {
            name: '31 -> 316',
            steps: [
                walkTo31Or32,
                ride31East.to(stop.OnNorthlake.At7th.EB),
                walkStep(7),
                ride316From42nd,
                walkFrom346
            ]
        },
        {
            name: '31 -> 26 -> 316',
            steps: [
                walkTo31Or32,
                ride31East.to(stop.On40th.AtWallingford.EB),
                ride26To90th,
                ride316From90th,
                walkFrom346
            ]
        },
        {
            name: '31 -> 26 -> 346',
            steps: [
                walkTo31Or32,
                ride31East.to(stop.On40th.AtWallingford.EB),
                ride26ToNSC,
                walkStep(4),
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
            name: '31 -> 316',
            steps: [
                walkTo31Or32,
                ride32East.to(stop.OnNorthlake.At7th.EB),
                walkStep(7),
                ride316From42nd,
                walkFrom346
            ]
        },
        {
            name: '32 -> 26 -> 316',
            steps: [
                walkTo31Or32,
                ride32East.to(stop.On40th.AtWallingford.EB),
                ride26To90th,
                ride316From90th,
                walkFrom346
            ]
        },
        {
            name: '32 -> 26 -> 346',
            steps: [
                walkTo31Or32,
                ride32East.to(stop.On40th.AtWallingford.EB),
                ride26ToNSC,
                walkStep(4),
                ride346FromNSC,
                walkFrom346
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
