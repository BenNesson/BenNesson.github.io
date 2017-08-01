/// <reference path="../OBA_data.js" />

var walk = min => ({ w: min });
var ride = route => ({ from: boardStop => ({ to: departStop => ({ r: route, s: boardStop, e:departStop }) }) });

function defineJourneys() {
    let d = defineIdentifiers();
    let route = d.route;
    let stop = d.stop;
    return [
        {
            name: '62 -> 11',
            steps: [
                walk(7),
                ride(route.Number62)
                    .from(stop.OnStone.At35th.WB)
                    .to(stop.On3rd.AtPine.SEB),
                walk(3),
                ride(route.Number11)
                    .from(stop.On4th.AtPine.WB)
                    .to(stop.OnBroadway.AtPine.EB)
                    
            ]
        },
        {
            name: '62 -> 8',
            steps: [
                walk(7),
                ride(route.Number62)
                    .from(stop.OnStone.At35th.WB)
                    .to(stop.OnDexter.AtDenny.SB),
                ride(route.Number8)
                    .from(stop.OnDexter.AtDenny.EB)
                    .to(stop.OnOlive.AtDenny.EB),
                walk(8)
            ]
        },
        {
            name: '62 -> LINK',
            steps: [
                walk(7),
                ride(route.Number62)
                    .from(stop.OnStone.At35th.WB)
                    .to(stop.On3rd.AtPine.SEB),
                ride(route.Link)
                    .from(stop.Misc.WestlakeStation.BayA.NEB)
                    .to(stop.Misc.CapitolHillLinkStation.NB),
                walk(5)
            ]
        },
        {
            name: '62 -> 49',
            steps: [
                walk(7),
                ride(route.Number62)
                    .from(stop.OnStone.At35th.WB)
                    .to(stop.On3rd.AtPine.SEB),
                walk(3),
                ride(route.Number49)
                    .from(stop.On3rd.AtPine.NWB)
                    .to(stop.OnBroadway.AtPine.EB)
            ]
        },
        {
            name: '31 -> 49',
            steps: [
                walk(3),
                ride(route.Number31)
                    .from(stop.OnWoodlawn.At35th.EB)
                    .to(stop.OnUniversity.AtCampusParkway.EB),
                walk(3),
                ride(route.Number49)
                    .from(stop.On15th.AtCampusParkway.SB)
                    .to(stop.OnBroadway.AtPine.WB)
            ]
        },
        {
            name: '32 -> 49',
            steps: [
                walk(3),
                ride(route.Number32)
                    .from(stop.OnWoodlawn.At35th.EB)
                    .to(stop.OnUniversity.AtCampusParkway.EB),
                walk(3),
                ride(route.Number49)
                    .from(stop.On15th.AtCampusParkway.SB)
                    .to(stop.OnBroadway.AtPine.WB)
            ]
        },
        {
            name: '31 -> LINK',
            steps: [
                walk(3),
                ride(route.Number31)
                    .from(stop.OnWoodlawn.At35th.EB)
                    .to(stop.OnStevens.AtRainierVis.NEB),
                walk(5),
                ride(route.Link)
                    .from(stop.Misc.UniversityDistrictLinkStation.SB)
                    .to(stop.Misc.CapitolHillLinkStation.SB),
                walk(5)
            ]
        },
        {
            name: '32 -> LINK',
            steps: [
                walk(3),
                ride(route.Number32)
                    .from(stop.OnWoodlawn.At35th.EB)
                    .to(stop.OnStevens.AtRainierVis.NEB),
                walk(3),
                ride(route.Link)
                    .from(stop.Misc.UniversityDistrictLinkStation.SB)
                    .to(stop.Misc.CapitolHillLinkStation.SB),
                walk(5)
            ]
        }
    ];
}
