/// <reference path="./OBA_data.js" />

function defineJourneys() {
    let d = defineIdentifiers();
    let route = d.route;
    let stop = d.stop;

    let walkStep = min => ({ w: min });
    let ride = route => ({ from: boardStop => ({ to: departStop => ({ r: route, s: boardStop, e: departStop }) }) });

    // define the stuff that gets used multiple times
    let ride373ToUDistrict = ride(route.Number373).from(stop.OnMeridian.AtOn175th.EB).to(stop.On41st.AtUniversity.SB),
        ride346ToNSC = ride(route.Number346).from(stop.OnMeridian.AtOn167th.SB).to(stop.OnCorliss.At92nd.EB),
        ride26FromNSC = ride(route.Number26).from(stop.OnCorliss.At92nd.WB).to(stop.On40th.AtWallingford.WB),
        ride45 = ride(route.Number45),
        ride45East = ride45.from(stop.On85th.AtStone.EB),
        ride45ToUDistrict = ride45East.to(stop.On41st.AtUniversity.SB),
        ride45West = ride45.from(stop.OnAurora.At85th.WB),
        rideELineSouth = ride(route.ELine).from(stop.OnAurora.At165th.SB),
        rideELineTo46th = rideELineSouth.to(stop.OnAurora.At46th.SB),
        rideELineToGaler = rideELineSouth.to(stop.OnAurora.AtGaler.SB),
        ride62 = ride(route.Number62),
        ride28X = ride(route.Number28X);

    return [
        //{
        //    name: '45 -> 5',
        //    steps: [
        //        ride45West.to(stop.OnGreenwood.At85th.WB),
        //        walkStep(2),
        //        ride(route.Number5)
        //            .from(stop.OnGreenwood.At85th.SB)
        //            .to(stop.OnAurora.At38th.SEB),
        //        walkStep(15)
        //    ]
        //},
        //{
        //    name: '45 -> 28X',
        //    steps: [
        //        ride45West.to(stop.On8th.At85th.WB),
        //        walkStep(3),
        //        ride28X
        //            .from(stop.On8th.At85th.SB)
        //            .to(stop.OnAurora.At38th.SEB),
        //        walkStep(15)
        //    ]
        //},
        {
            name: 'E-Line -> walk',
            steps: [
                walkStep(18),
                rideELineTo46th,
                walkStep(30)
            ]
        },
        {
            name: 'E-Line -> 62 SB',
            steps: [
                walkStep(18),
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
                walkStep(18),
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
                walkStep(18),
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
                walkStep(5),
                ride346ToNSC,
                walkStep(2),
                ride26FromNSC,
                walkStep(11)
            ]
        },
        {
            name: '346 -> 26 -> 31',
            steps: [
                walkStep(5),
                ride346ToNSC,
                walkStep(2),
                ride26FromNSC,
                ride(route.Number31)
                    .from(stop.On40th.AtWallingford.WB)
                    .to(stop.On35th.AtWoodlawn.WB),
                walkStep(3)
            ]
        },
        {
            name: '346 -> 26 -> 32',
            steps: [
                walkStep(5),
                ride346ToNSC,
                walkStep(2),
                ride26FromNSC,
                ride(route.Number32)
                    .from(stop.On40th.AtWallingford.WB)
                    .to(stop.On35th.AtWoodlawn.WB),
                walkStep(3)
            ]
        },
        {
            name: '373 -> 31',
            steps: [
                walkStep(13),
                ride373ToUDistrict,
                walkStep(3),
                ride(route.Number31)
                    .from(stop.OnCampusParkway.At12th.WB)
                    .to(stop.On35th.AtWoodlawn.WB),
            ]
        },
        {
            name: '373 -> 32',
            steps: [
                walkStep(13),
                ride373ToUDistrict,
                walkStep(3),
                ride(route.Number32)
                    .from(stop.OnCampusParkway.At12th.WB)
                    .to(stop.On35th.AtWoodlawn.WB),
            ]
        }
        //{
        //    name: 'Just the 26',
        //    steps: [
        //        walkStep(10),
        //        ride(route.Number26)
        //            .from(stop.OnWallingford.At82nd.SB)
        //            .to(stop.OnAshworth.At40th.WB),
        //        walkStep(13)
        //    ]
        //}
    ];
}
