/// <reference path="./OBA_data.js" />

function defineJourneys() {
    let d = defineIdentifiers();
    let route = d.route;
    let stop = d.stop;

    let walk = min => ({ w: min });
    let ride = route => ({ from: boardStop => ({ to: departStop => ({ r: route, s: boardStop, e: departStop }) }) });

    // define the stuff that gets used multiple times.
    let ride62West = ride(route.Number62)
            .from(stop.OnStone.At35th.WB),
        ride62Downtown = ride62West
            .to(stop.On3rd.AtPine.SEB),
        ride31East = ride(route.Number31)
            .from(stop.OnWoodlawn.At35th.EB),
        ride32East = ride(route.Number32)
            .from(stop.OnWoodlawn.At35th.EB),
        rideLink = ride(route.Link),
        rideLinkUDistToCapHill = rideLink
            .from(stop.Misc.UniversityDistrictLinkStation.SB)
            .to(stop.Misc.CapitolHillLinkStation.SB),
        ride49 = ride(route.Number49),
        ride49FromUDistToCapitolHill = ride49
            .from(stop.On15th.AtCampusParkway.SB)
            .to(stop.OnBroadway.AtPine.WB);

    // return a big ol' array.
    return [
        {
            name: '62 -> 8',
            steps: [
                walk(7),
                ride62West.to(stop.OnDexter.AtDenny.SB),
                ride(route.Number8)
                    .from(stop.OnDexter.AtDenny.EB)
                    .to(stop.OnOlive.AtDenny.EB),
                walk(8)
            ]
        },
        {
            name: '62 -> 11',
            steps: [
                walk(7),
                ride62Downtown,
                walk(3),
                ride(route.Number11)
                    .from(stop.On4th.AtPine.WB)
                    .to(stop.OnBroadway.AtPine.EB)
                    
            ]
        },
        {
            name: '62 -> LINK',
            steps: [
                walk(7),
                ride62Downtown,
                rideLink
                    .from(stop.Misc.WestlakeStation.BayA.NEB)
                    .to(stop.Misc.CapitolHillLinkStation.NB),
                walk(5)
            ]
        },
        {
            name: '62 -> 49',
            steps: [
                walk(7),
                ride62Downtown,
                walk(3),
                ride49
                    .from(stop.On3rd.AtPine.NWB)
                    .to(stop.OnBroadway.AtPine.EB)
            ]
        },
        {
            name: '31 -> 49',
            steps: [
                walk(3),
                ride31East.to(stop.OnUniversity.AtCampusParkway.EB),
                walk(3),
                ride49FromUDistToCapitolHill
            ]
        },
        {
            name: '32 -> 49',
            steps: [
                walk(3),
                ride32East.to(stop.OnUniversity.AtCampusParkway.EB),
                walk(3),
                ride49FromUDistToCapitolHill
            ]
        },
        {
            name: '31 -> LINK',
            steps: [
                walk(3),
                ride31East.to(stop.OnStevens.AtRainierVis.NEB),
                walk(5),
                rideLinkUDistToCapHill,
                walk(5)
            ]
        },
        {
            name: '32 -> LINK',
            steps: [
                walk(3),
                ride32East.to(stop.OnStevens.AtRainierVis.NEB),
                walk(3),
                rideLinkUDistToCapHill,
                walk(5)
            ]
        }
    ];
}
