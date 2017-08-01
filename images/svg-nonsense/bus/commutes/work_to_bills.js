/// <reference path="../OBA_data.js" />

var walk = min => ({ w: min });
var ride = route => ({ from: boardStop => ({ to: departStop => ({ r: route, s: boardStop, e:departStop }) }) });

function defineJourneys() {
    var d = defineIdentifiers();
    return [
        {
            name: '62 -> 11',
            steps: [
                walk(7),
                ride(d.route.Number62)
                    .from(d.stop.OnStone.At35th.WB)
                    .to(d.stop.On3rd.AtPine.SEB),
                walk(3),
                ride(d.route.Number11)
                    .from(d.stop.On4th.AtPine.WB)
                    .to(d.stop.OnBroadway.AtPine.EB)
                    
            ]
        },
        {
            name: '62 -> 8',
            steps: [
                walk(7),
                ride(d.route.Number62)
                    .from(d.stop.OnStone.At35th.WB)
                    .to(d.stop.OnDexter.AtDenny.SB),
                ride(d.route.Number8)
                    .from(d.stop.OnDexter.AtDenny.EB)
                    .to(d.stop.OnOlive.AtDenny.EB),
                walk(8)
            ]
        },
        {
            name: '62 -> LINK',
            steps: [
                walk(7),
                ride(d.route.Number62)
                    .from(d.stop.OnStone.At35th.WB)
                    .to(d.stop.On3rd.AtPine.SEB),
                ride(d.route.Link)
                    .from(d.stop.Misc.WestlakeStation.BayA.NEB)
                    .to(d.stop.Misc.CapitolHillLinkStation.NB),
                walk(5)
            ]
        },
        {
            name: '62 -> 49',
            steps: [
                walk(7),
                ride(d.route.Number62)
                    .from(d.stop.OnStone.At35th.WB)
                    .to(d.stop.On3rd.AtPine.SEB),
                walk(3),
                ride(d.route.Number49)
                    .from(d.stop.On3rd.AtPine.NWB)
                    .to(d.stop.OnBroadway.AtPine.EB)
            ]
        },
        {
            name: '31 -> 49',
            steps: [
                walk(3),
                ride(d.route.Number31)
                    .from(d.stop.OnWoodlawn.At35th.EB)
                    .to(d.stop.OnUniversity.AtCampusParkway.EB),
                walk(3),
                ride(d.route.Number49)
                    .from(d.stop.On15th.AtCampusParkway.SB)
                    .to(d.stop.OnBroadway.AtPine.WB)
            ]
        },
        {
            name: '32 -> 49',
            steps: [
                walk(3),
                ride(d.route.Number32)
                    .from(d.stop.OnWoodlawn.At35th.EB)
                    .to(d.stop.OnUniversity.AtCampusParkway.EB),
                walk(3),
                ride(d.route.Number49)
                    .from(d.stop.On15th.AtCampusParkway.SB)
                    .to(d.stop.OnBroadway.AtPine.WB)
            ]
        },
        {
            name: '31 -> LINK',
            steps: [
                walk(3),
                ride(d.route.Number31)
                    .from(d.stop.OnWoodlawn.At35th.EB)
                    .to(d.stop.OnStevens.AtRainierVis.NEB),
                walk(5),
                ride(d.route.Link)
                    .from(d.stop.Misc.UniversityDistrictLinkStation.SB)
                    .to(d.stop.Misc.CapitolHillLinkStation.SB),
                walk(5)
            ]
        },
        {
            name: '32 -> LINK',
            steps: [
                walk(3),
                ride(d.route.Number32)
                    .from(d.stop.OnWoodlawn.At35th.EB)
                    .to(d.stop.OnStevens.AtRainierVis.NEB),
                walk(3),
                ride(d.route.Link)
                    .from(d.stop.Misc.UniversityDistrictLinkStation.SB)
                    .to(d.stop.Misc.CapitolHillLinkStation.SB),
                walk(5)
            ]
        }
    ];
}
