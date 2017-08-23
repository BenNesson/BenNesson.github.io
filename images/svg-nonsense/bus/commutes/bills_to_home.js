/// <reference path="./OBA_data.js" />

function defineJourneys() {
    let d = defineIdentifiers();
    let route = d.route;
    let stop = d.stop;

    let walk = min => ({ w: min });
    let ride = route => ({ from: boardStop => ({ to: departStop => ({ r: route, s: boardStop, e: departStop }) }) });

    // define the stuff that gets used multiple times.
    let rideEline = ride(route.ELine),
        rideElineHomeFromPike = rideEline.from(stop.OnPike.At3rd.NWB).to(stop.OnAurora.At85th.NB);

    // return a big ol' array.
    return [
        {
            name: '49 -> E-Line',
            steps: [
                walk(1),
                ride(route.Number49).from(stop.OnPine.AtBroadway.WB).to(stop.OnPine.At5th.SWB),
                walk(4),
                rideElineHomeFromPike
            ]
        },
        {
            name: '2 -> E-Line',
            steps: [
                walk(4),
                ride(route.Number2).from(stop.OnSeneca.AtHarvard.SB).to(stop.On3rd.AtVirginia.NWB),
                rideEline.from(stop.On3rd.AtVirginia.NWB).to(stop.OnAurora.At85th.NB)
            ]
        },
        {
            name: 'walk to E-Line',
            steps: [
                walk(18),
                rideElineHomeFromPike
            ]
        },
        {
            name: '11 -> ELine',
            steps: [
                walk(1),
                ride(route.Number11).from(stop.OnPine.AtBroadway.WB).to(stop.OnPine.At4th.WB),
                walk(2),
                rideElineHomeFromPike
            ]
        }
    ];
}
