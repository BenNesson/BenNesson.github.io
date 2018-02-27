/// <reference path="./OBA_data.js" />

function defineJourneys() {
    let d = defineIdentifiers();
    let route = d.route;
    let stop = d.stop;

    let walkStep = min => ({ w: min });
    let ride = route => ({ from: boardStop => ({ to: departStop => ({ r: route, s: boardStop, e: departStop }) }) });

    // define the stuff that gets used multiple times
    let ride373ToUDistrict = ride(route.Number373)
        .from(stop.OnMeridian.At175th.EB)
        .to(stop.On41st.AtUniversity.SB),
        ride346ToNSC = ride(route.Number346)
            .from(stop.OnMeridian.At167th.SB)
            .to(stop.OnCorliss.At92nd.EB),
        ride26FromNSC = ride(route.Number26)
            .from(stop.OnCorliss.At92nd.WB),
        ride26FromNSCToWallingford = ride26FromNSC
            .to(stop.On40th.AtWallingford.WB),
        rideELineSouth = ride(route.ELine).from(stop.OnAurora.At165th.SB),
        rideELineTo46th = rideELineSouth.to(stop.OnAurora.At46th.SB),
        rideELineToGaler = rideELineSouth.to(stop.OnAurora.AtGaler.SB),
        ride62 = ride(route.Number62),
        ride28X = ride(route.Number28X),
        walk = {
            toELine: walkStep(18),
            to346: walkStep(5),
            to373: walkStep(13)
        };

    return [
        {
            name: 'E-Line -> walk',
            steps: [
                walk.toELine,
                rideELineTo46th,
                walkStep(30)
            ]
        },
        {
            name: 'E-Line -> 62 SB',
            steps: [
                walk.toELine,
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
                walk.toELine,
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
                walk.toELine,
                rideELineToGaler,
                walkStep(3),
                ride62
                    .from(stop.OnDexter.AtGaler.NB)
                    .to(stop.OnStone.At35th.EB),
                walkStep(7)
            ]
        },
        {
            name: '346 -> 26',
            steps: [
                walk.to346,
                ride346ToNSC,
                walkStep(2),
                ride26FromNSCToWallingford,
                walkStep(11)
            ]
        },
        {
            name: '346 -> 26 -> 62',
            steps: [
                walk.to346,
                ride346ToNSC,
                walkStep(2),
                ride26FromNSC.to(stop.OnWoodlawn.AtRavenna.SWB),
                ride(route.Number62).from(stop.OnWoodlawn.AtRavenna.SWB).to(stop.OnStone.At35th.WB),
                walkStep(7)
            ]
        },
        {
            name: '346 -> 26 -> 31',
            steps: [
                walk.to346,
                ride346ToNSC,
                walkStep(2),
                ride26FromNSCToWallingford,
                ride(route.Number31)
                    .from(stop.On40th.AtWallingford.WB)
                    .to(stop.On35th.AtWoodlawn.WB),
                walkStep(3)
            ]
        },
        {
            name: '346 -> 26 -> 32',
            steps: [
                walk.to346,
                ride346ToNSC,
                walkStep(2),
                ride26FromNSCToWallingford,
                ride(route.Number32)
                    .from(stop.On40th.AtWallingford.WB)
                    .to(stop.On35th.AtWoodlawn.WB),
                walkStep(3)
            ]
        },
        {
            name: '373 -> 31',
            steps: [
                walk.to373,
                ride373ToUDistrict,
                walkStep(3),
                ride(route.Number31)
                    .from(stop.OnCampusParkway.At12th.WB)
                    .to(stop.On35th.AtWoodlawn.WB),
                walkStep(3)
            ]
        },
        {
            name: '373 -> 32',
            steps: [
                walk.to373,
                ride373ToUDistrict,
                walkStep(3),
                ride(route.Number32)
                    .from(stop.OnCampusParkway.At12th.WB)
                    .to(stop.On35th.AtWoodlawn.WB),
                walkStep(3)
            ]
        }
    ];
}
