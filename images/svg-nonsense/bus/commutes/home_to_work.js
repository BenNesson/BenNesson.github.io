function defineJourneys() {
    var d = _defineIdentifiers();
    return [
        {
            name: '45 -> 5',
            steps: [{ r: d.ROUTE_45, s: d.STOP_AURORA_85TH_WB, e: d.STOP_GREENWOOD_85TH_WB }, { w: 2 },
            { r: d.ROUTE_5, s: d.STOP_GREENWOOD_85TH_SB, e: d.STOP_AURORA_38TH_SEB }, { w: 15 }]
        },
        {
            name: '45 -> 28X',
            steps: [{ r: d.ROUTE_45, s: d.STOP_AURORA_85TH_WB, e: d.STOP_8TH_85TH_WB }, { w: 3 },
            { r: d.ROUTE_28X, s: d.STOP_8TH_85TH_SB, e: d.STOP_AURORA_38TH_SEB }, { w: 15 }]
        },
        {
            name: 'E-Line -> 28X',
            steps: [{ r: d.ROUTE_ELINE, s: d.STOP_AURORA_85TH_SB, e: d.STOP_AURORA_GALER_SB }, { w: 2 },
            { r: d.ROUTE_28X, s: d.STOP_AURORA_GALER_NB, e: d.STOP_AURORA_38TH_NWB }, { w: 16 }]
        },
        {
            name: 'E-Line -> 62',
            steps: [{ r: d.ROUTE_ELINE, s: d.STOP_AURORA_85TH_SB, e: d.STOP_AURORA_GALER_SB }, { w: 3 },
            { r: d.ROUTE_62, s: d.STOP_DEXTER_GALER_NB, e: d.STOP_STONE_35TH_EB }, { w: 7 }]
        },
        {
            name: '45 -> 62',
            steps: [{ r: d.ROUTE_45, s: d.STOP_STONE_85TH_EB, e: d.STOP_RAVENNA_WOODLAWN_SEB }, { w: 2 },
            { r: d.ROUTE_62, s: d.STOP_RAVENNA_WOODLAWN_SWB, e: d.STOP_STONE_35TH_WB }, { w: 8 }]
        }
    ];
}

function _defineIdentifiers() {
    return {
        ROUTE_45: '1_100225',
        ROUTE_5: '1_100229',
        ROUTE_28X: '1_100169',
        ROUTE_40: '1_102574',
        ROUTE_ELINE: '1_102615',
        ROUTE_62: '1_100252',
        ROUTE_31: '1_100184',
        ROUTE_32: '1_100193',

        STOP_AURORA_85TH_NB: '1_7730',
        STOP_AURORA_85TH_SB: '1_7160',
        STOP_AURORA_85TH_WB: '1_5450',
        STOP_AURORA_85TH_EB: '1_5370',
        STOP_STONE_85TH_WB: '1_5440',
        STOP_STONE_85TH_EB: '1_5380',

        STOP_AURORA_105TH_NB: '1_7810',
        STOP_AURORA_105TH_SB: '1_7080',
        STOP_AURORA_105TH_EB: '1_40068',
        STOP_AURORA_105TH_WB: '1_40032',

        STOP_GREENWOOD_85TH_WB: '1_41450',
        STOP_GREENWOOD_85TH_EB: '1_5330',
        STOP_GREENWOOD_85TH_SB: '1_5790',
        STOP_GREENWOOD_85TH_NB: '1_6640',

        STOP_8TH_85TH_WB: '1_37060',
        STOP_8TH_85TH_EB: '1_41430',
        STOP_8TH_85TH_NB: '1_28600',
        STOP_8TH_85TH_SB: '1_28080',

        STOP_15TH_85TH_NB: '1_14360',
        STOP_15TH_85TH_SB: '1_13600',
        STOP_15TH_85TH_EB: '1_35600',
        STOP_15TH_85TH_WB: '1_37081',

        STOP_20TH_85TH_WB: '1_37083',
        STOP_20TH_85TH_EB: '1_35580',

        STOP_RAVENNA_WOODLAWN_NWB: '1_16520',
        STOP_RAVENNA_WOODLAWN_SWB: '1_17170',
        STOP_RAVENNA_WOODLAWN_NEB: '1_17550',
        STOP_RAVENNA_WOODLAWN_SEB: '1_16390',

        STOP_AURORA_38TH_NWB: '1_6340',
        STOP_AURORA_38TH_SEB: '1_6050',

        STOP_FREMONT_34TH_NB: '1_26860',
        STOP_FREMONT_34TH_SB: '1_26510',

        STOP_STONE_35TH_WB: '1_26480',
        STOP_STONE_35TH_EB: '1_26885',

        STOP_WOODLAWN_35TH_WB: '1_26460',
        STOP_WOODLAWN_35TH_EB: '1_26901',

        STOP_AURORA_GALER_NB: '1_6300',
        STOP_AURORA_GALER_SB: '1_6100',
        STOP_DEXTER_GALER_NB: '1_18505',
        STOP_DEXTER_GALER_SB: '1_18340',

        STOP_UNIVERSITY_CAMPUS_EB: '1_9575',
        STOP_UNIVERSITY_CAMPUS_WB: '1_9138',
        STOP_UNIVERSITY_41ST_NB: '1_9581',
        STOP_UNIVERSITY_41ST_SB: '1_9142'
    };
}
