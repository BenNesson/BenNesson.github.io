/// <reference path="../OBA_data.js" />

function walkStep(min) {
    return { w: min };
}

function busStep(route, start, end) {
    return { r: route, s: start, e: end };
}

function defineJourneys() {
    var d = defineIdentifiers();
    return [
        {
            name: '62 -> 11',
            steps: [
                walkStep(7),
                busStep(d.route.Number62, d.stop.OnStone.At35th.WB, d.stop.On3rd.AtPine.SEB),
                walkStep(3),
                busStep(d.route.Number11, d.stop.On4th.AtPine.WB, d.stop.OnBroadway.AtPine.EB)
            ]
        },
        {
            name: '62 -> 8',
            steps: [
                walkStep(7),
                busStep(d.route.Number62, d.stop.OnStone.At35th.WB, d.stop.OnDexter.AtDenny.SB),
                busStep(d.route.Number8, d.stop.OnDexter.AtDenny.EB, d.stop.OnOlive.AtDenny.EB),
                walkStep(8)
            ]
        },
        {
            name: '62 -> LINK',
            steps: [
                walkStep(7),
                busStep(d.route.Number62, d.stop.OnStone.At35th.WB, d.stop.On3rd.AtPine.SEB),
                busStep(d.route.Link, d.stop.Misc.WestlakeStation.BayA.NEB, d.stop.Misc.CapitolHillLinkStation.NB),
                walkStep(5)
            ]
        },
        {
            name: '62 -> 49',
            steps: [
                walkStep(7),
                busStep(d.route.Number62, d.stop.OnStone.At35th.WB, d.stop.On3rd.AtPine.SEB),
                walkStep(3),
                busStep(d.route.Number49, d.stop.On3rd.AtPine.NWB, d.stop.OnBroadway.AtPine.EB)
            ]
        },
        {
            name: '31 -> 49',
            steps: [
                walkStep(3),
                busStep(d.route.Number31, d.stop.OnWoodlawn.At35th.EB, d.stop.OnUniversity.AtCampusParkway.EB),
                walkStep(3),
                busStep(d.route.Number49, d.stop.On15th.AtCampusParkway.SB, d.stop.OnBroadway.AtPine.WB)
            ]
        },
        {
            name: '32 -> 49',
            steps: [
                walkStep(3),
                busStep(d.route.Number32, d.stop.OnWoodlawn.At35th.EB, d.stop.OnUniversity.AtCampusParkway.EB),
                walkStep(3),
                busStep(d.route.Number49, d.stop.On15th.AtCampusParkway.SB, d.stop.OnBroadway.AtPine.WB)
            ]
        },
        {
            name: '31 -> LINK',
            steps: [
                walkStep(3),
                busStep(d.route.Number31, d.stop.OnWoodlawn.At35th.EB, d.stop.OnStevens.AtRanierVis.NEB),
                walkStep(5),
                busStep(d.route.Link, d.stop.Misc.UniversityDistrictLinkStation.SB, d.stop.Misc.CapitolHillLinkStation.SB),
                walkStep(5)
            ]
        },
        {
            name: '32 -> LINK',
            steps: [
                walkStep(3),
                busStep(d.route.Number32, d.stop.OnWoodlawn.At35th.EB, d.stop.OnStevens.AtRanierVis.NEB),
                walkStep(3),
                busStep(d.route.Link, d.stop.Misc.UniversityDistrictLinkStation.SB, d.stop.Misc.CapitolHillLinkStation.SB),
                walkStep(5)
            ]
        }
    ];
}
