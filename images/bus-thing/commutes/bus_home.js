// DEFINE JOURNEYS HERE.
// Format:
//   { name: <some useful mnemonic or identifier>,
//     steps:[ { r:'<route ID>', s:'<stop ID where you get on the bus>', e:'<stop ID where you get off the bus>' },
//             { <further stops...> } ]
//   }
// Journeys can have any number of steps.  Each step defines a route, a starting point, and an
// ending point.  Route IDs can be found most easily by looking them up on the onebusaway
// website; they're not necessarily related to the route number provided on the schedule.  The same is generally true for Stop IDs
var journeyDefinitions = [
  { name:'28X -> 45',
      steps:[ { r:'1_100169', s:'1_28376',  e:'1_28600' },
              { r:'1_100225', s:'1_41430',  e:'1_5370'  } ]
  },
  { name:'5 -> 45',
      steps:[ { r:'1_100229', s:'1_6340', e:'1_6640' },
              { r:'1_100225', s:'1_5330', e:'1_5370' } ]
  },
  { name:'40 -> 45',
      steps:[ {r:'1_102574', s:'1_26860', e:'1_35580' },
              {r:'1_100225', s:'1_35580', e:'1_5370' } ]
  },
  { name:'28X -> E-Line',
      steps:[ {r:'1_100169', s:'1_28285', e:'1_6100'  },
              {r:'1_102615', s:'1_6300', e:'1_7730' } ]
  },
  { name:'62 -> E-Line',
      steps:[ {r:'1_100252', s:'1_26510',  e:'1_18340'  },
              {r:'1_102615', s:'1_6300', e:'1_7730' } ]
  },
  { name:'40 -> E-Line',
      steps:[ {r:'1_102574', s:'1_26860',  e:'1_40068'  },
              {r:'1_102615', s:'1_7080', e:'1_7160' } ]
  },
  { name:'62 -> 45',
      steps:[ {r:'1_100252', s:'1_26860', e:'1_16390' },
              {r:'1_100225', s:'1_16520', e:'1_5440' } ]
  },
  { name: '31 -> 45',
  steps: [{ r: '1_100184', s: '1_26860', e: '1_26368' },
      //{ r: '1_100269', s: '1_26368', e: '1_9575' },
              { r:'1_100225',  s:'1_9561',   e:'1_5440'}]
  },
  { name: '32 -> 45',
      steps:[ {r:'1_100193', s:'1_26860', e:'1_26368' },
              {r:'1_100225', s:'1_9561', e:'1_5440'}]
  }
];

// STOPS
// NB 34th and Fremont: 1_26860
// SB 34th and Fremont:
// NB 39th and Fremont:
// WB 38th and Phinney:
// EB 39th and Phinney:

// SB Dexter and Galer: 1_18340
// SB Aurora and Galer:
// NB Aurora and Galer:


// ROUTES

var journey_tree = [
    {
        //34th and Fremont, NB
        stopId: '1_26860',
        routes: [
            {
                // 40
                routeId: '1_102574',
                endPoints: [
                    {
                        // transfer to 45
                        stopId: '1_35580',
                        routes: [{routeId:'1_100225', endPoints:[{stopId:'1_5370', routes:[]}]}]
                    },
                    {
                        //transfer to E-Line
                        stopId: '',
                        routes:[]
                    }
                ]
            }
        ]
    }
];
