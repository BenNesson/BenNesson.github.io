// This script does things in kind of a weird way for purposes of enabling convenient Intellisense in VS.
function prettifyStops(raw) {
    let On3rd = {
        AtPine: {
            NWB: raw.STOP_3RD_PINE_NWB,
            SEB: raw.STOP_3RD_PINE_SEB
        },
        AtPike: {
            NWB: raw.STOP_3RD_PIKE_NWB
        },
        AtVirginia: {
            NWB: raw.STOP_3RD_VIRGINIA_NWB
        }
    };
    let On4th = {
        AtPine: {
            WB: raw.STOP_4TH_PINE_WB
        },
    };
    let On5th = {
        AtPine: {
            SWB: raw.STOP_5TH_PINE_SWB
        }
    };
    let On8th = {
        At85th: {
            NB: raw.STOP_8TH_85TH_NB,
            SB: raw.STOP_8TH_85TH_SB,
            EB: raw.STOP_8TH_85TH_EB,
            WB: raw.STOP_8TH_85TH_WB
        }
    };
    let On12th = {
        AtCampusParkway: {
            WB: raw.STOP_12TH_CAMPUS_WB
        }
    };
    let On15th = {
        At85th: {
            NB: raw.STOP_15TH_85TH_NB,
            SB: raw.STOP_15TH_85TH_SB,
            EB: raw.STOP_15TH_85TH_EB,
            WB: raw.STOP_15TH_85TH_WB
        },
        AtCampusParkway: {
            SB: raw.STOP_15TH_CAMPUS_SB
        },
    };
    let On20th = {
        At85th: {
            EB: raw.STOP_20TH_85TH_EB,
            WB: raw.STOP_20TH_85TH_WB
        },
    };
    let On34th = {
        AtFremont: {
            NB: raw.STOP_FREMONT_34TH_NB,
            SB: raw.STOP_FREMONT_34TH_SB
        },
    };
    let On35th = {
        AtStone: {
            EB: raw.STOP_STONE_35TH_EB,
            WB: raw.STOP_STONE_35TH_WB
        },
        AtWoodlawn: {
            EB: raw.STOP_WOODLAWN_35TH_EB,
            WB: raw.STOP_WOODLAWN_35TH_WB
        }
    };
    let On38th = {
        AtAurora: {
            NWB: raw.STOP_AURORA_38TH_NWB,
            SEB: raw.STOP_AURORA_38TH_SEB
        },
    };
    let On40th = {
        AtAshworth: {
            EB: raw.STOP_ASHWORTH_40TH_EB,
            WB: raw.STOP_ASHWORTH_40TH_WB
        },
        AtWallingford: {
            EB: raw.STOP_WALLINGFORD_40TH_EB,
            WB: raw.STOP_WALLINGFORD_40TH_WB
        }
    };
    let On41st = {
        AtUniversity: {
            NB: raw.STOP_UNIVERSITY_41ST_NB,
            SB: raw.STOP_UNIVERSITY_41ST_SB
        },
    };
    let On45th = {
        AtStone: {
            SB: raw.STOP_STONE_45TH_SB,
            EB: raw.STOP_STONE_45TH_EB
        }
    };
    let On46th = {
        AtAurora: {
            NB: raw.STOP_AURORA_46TH_NB,
            SB: raw.STOP_AURORA_46TH_SB
        }
    };
    let On82nd = {
        AtWallingford: {
            NB: raw.STOP_WALLINGFORD_82ND_NB,
            SB: raw.STOP_WALLINGFORD_82ND_SB
        }
    };
    let On85th = {
        At8th: On8th.At85th,
        At15th: On15th.At85th,
        At20th: On20th.At85th,
        AtAurora: {
            NB: raw.STOP_AURORA_85TH_NB,
            SB: raw.STOP_AURORA_85TH_SB,
            EB: raw.STOP_AURORA_85TH_EB,
            WB: raw.STOP_AURORA_85TH_WB
        },
        AtGreenwood: {
            NB: raw.STOP_GREENWOOD_85TH_NB,
            SB: raw.STOP_GREENWOOD_85TH_SB,
            EB: raw.STOP_GREENWOOD_85TH_EB,
            WB: raw.STOP_GREENWOOD_85TH_WB
        },
        AtStone: {
            EB: raw.STOP_STONE_85TH_EB,
            WB: raw.STOP_STONE_85TH_WB
        }
    };
    let On92nd = {
        AtCorliss: {
            EB: raw.STOP_92ND_CORLISS_EB,
            WB: raw.STOP_92ND_CORLISS_WB
        }
    };
    let On105th = {
        AtAurora: {
            NB: raw.STOP_AURORA_105TH_NB,
            SB: raw.STOP_AURORA_105TH_SB,
            EB: raw.STOP_AURORA_105TH_EB,
            WB: raw.STOP_AURORA_105TH_WB
        },
    };
    let On165th = {
        AtAurora: {
            NB: raw.STOP_AURORA_165TH_NB,
            SB: raw.STOP_AURORA_165TH_SB
        }
    };
    let On167th = {
        AtMeridian: {
            NB: raw.STOP_MERIDIAN_167TH_NB,
            SB: raw.STOP_MERIDIAN_167TH_SB
        }
    };
    let On175th = {
        AtMeridian: {
            NB: raw.STOP_MERIDIAN_175TH_NB,
            SB: raw.STOP_MERIDIAN_175TH_SB,
            EB: raw.STOP_MERIDIAN_175TH_EB,
            WB: raw.STOP_MERIDIAN_175TH_WB
        }
    };
    let OnAshworth = {
        At40th: On40th.AtAshworth
    };
    let OnAurora = {
        At38th: On38th.AtAurora,
        At46th: On46th.AtAurora,
        At85th: On85th.AtAurora,
        At105th: On105th.AtAurora,
        At165th: On165th.AtAurora,
        AtGaler: {
            NB: raw.STOP_AURORA_GALER_NB,
            SB: raw.STOP_AURORA_GALER_SB
        }
    };
    let OnBroadway = {
        AtPine: {
            EB: raw.STOP_BROADWAY_PINE_EB,
            WB: raw.STOP_BROADWAY_PINE_WB
        },
    };
    let OnCampusParkway = {
        At12th: On12th.AtCampusParkway,
        At15th: On15th.AtCampusParkway,
        AtUniversity: {
            EB: raw.STOP_UNIVERSITY_CAMPUS_EB
        }
    };
    let OnCorliss = {
        At92nd: On92nd.AtCorliss
    };
    let OnDenny = {
        AtDexter: {
            SB: raw.STOP_DEXTER_DENNY_SB,
            EB: raw.STOP_DEXTER_DENNY_EB
        },
        AtOlive: {
            EB: raw.STOP_OLIVE_DENNY_EB
        }
    };
    let OnDexter = {
        AtDenny: OnDenny.AtDexter,
        AtGaler: {
            NB: raw.STOP_DEXTER_GALER_NB,
            SB: raw.STOP_DEXTER_GALER_SB
        }
    };
    let OnFremont = {
        At34th: On34th.AtFremont
    };
    let OnGaler = {
        AtAurora: OnAurora.AtGaler,
        AtDexter: OnDexter.AtGaler
    };
    let OnGreenwood = {
        At85th: On85th.AtGreenwood
    };
    let OnHarvard = {
        AtSeneca: {
            SB: raw.STOP_SENECA_HARVARD_SB
        }
    };
    let OnMeridian = {
        At167th: On167th.AtMeridian,
        At175th: On175th.AtMeridian
    };
    let OnOlive = {
        AtDenny: OnDenny.AtOlive
    };
    let OnPike = {
        At3rd: On3rd.AtPike
    };
    let OnPine = {
        At3rd: On3rd.AtPine,
        At4th: On4th.AtPine,
        At5th: On5th.AtPine,
        AtBroadway: OnBroadway.AtPine
    };
    let OnRainierVis = {
        AtStevens: {
            NEB: raw.STOP_STEVENS_RAINIER_NEB
        },
    };
    let OnRavenna = {
        AtWoodlawn: {
            NEB: raw.STOP_RAVENNA_WOODLAWN_NEB,
            NWB: raw.STOP_RAVENNA_WOODLAWN_NWB,
            SEB: raw.STOP_RAVENNA_WOODLAWN_SEB,
            SEB_26Only: raw.STOP_RAVENNA_WOODLAWN_SEB_26,
            SWB: raw.STOP_RAVENNA_WOODLAWN_SWB
        },
    };
    let OnSeneca = {
        AtHarvard: OnHarvard.AtSeneca
    };
    let OnStevens = {
        AtRainierVis: OnRainierVis.AtStevens
    };
    let OnStone = {
        At35th: On35th.AtStone,
        At45th: On45th.AtStone,
        At85th: On85th.AtStone
    };
    let OnUniversity = {
        At41st: On41st.AtUniversity,
        AtCampusParkway: OnCampusParkway.AtUniversity
    };
    let OnVirginia = {
        At3rd: On3rd.AtVirginia
    };
    let OnWallingford = {
        At40th : On40th.AtWallingford,
        At82nd : On82nd.AtWallingford
    };
    let OnWoodlawn = {
        At35th: On35th.AtWoodlawn,
        AtRavenna: OnRavenna.AtWoodlawn
    };
    let Misc = {
        CapitolHillLinkStation: {
            NB: raw.STOP_CAPITOL_HILL_LINK_NB,
            SB: raw.STOP_CAPITOL_HILL_LINK_SB
        },
        UniversityDistrictLinkStation: {
            SB: raw.STOP_UDIST_LINK_SB
        },
        WestlakeStation: {
            BayA: {
                NEB: raw.STOP_WESTLAKE_STATION_A_NEB
            }
        }
    };

    let stop = {
        On3rd: On3rd,
        On4th: On4th,
        On5th: On5th,
        On8th: On8th,
        On15th: On15th,
        On20th: On20th,
        On34th: On34th,
        On35th: On35th,
        On38th: On38th,
        On40th: On40th,
        On41st: On41st,
        On45th: On45th,
        On46th: On46th,
        On82nd: On82nd,
        On85th: On85th,
        On92nd: On92nd,
        On105th: On105th,
        On165th: On165th,
        On167th: On167th,
        On175th: On175th,
        OnAshworth: OnAshworth,
        OnAurora: OnAurora,
        OnBroadway: OnBroadway,
        OnCampusParkway: OnCampusParkway,
        OnCorliss: OnCorliss,
        OnDenny: OnDenny,
        OnDexter: OnDexter,
        OnFremont: OnFremont,
        OnGaler: OnGaler,
        OnGreenwood: OnGreenwood,
        OnHarvard: OnHarvard,
        OnMeridian: OnMeridian,
        OnOlive: OnOlive,
        OnPike: OnPike,
        OnPine: OnPine,
        OnRainierVis: OnRainierVis,
        OnRavenna: OnRavenna,
        OnSeneca: OnSeneca,
        OnStevens: OnStevens,
        OnStone: OnStone,
        OnUniversity: OnUniversity,
        OnVirginia: OnVirginia,
        OnWallingford: OnWallingford,
        OnWoodlawn: OnWoodlawn,
        Misc: Misc
    };

    return stop;
}

function defineIdentifiers() {
    let raw = {
        ROUTE_45: '1_100225',
        ROUTE_5: '1_100229',
        ROUTE_28X: '1_100169',
        ROUTE_40: '1_102574',
        ROUTE_ELINE: '1_102615',
        ROUTE_62: '1_100252',
        ROUTE_31: '1_100184',
        ROUTE_32: '1_100193',
        ROUTE_49: '1_100447',
        ROUTE_11: '1_100009',
        ROUTE_LINK: '40_100479',
        ROUTE_8: '1_100275',
        ROUTE_2: '1_100089',
        ROUTE_26: '1_100151',

        ROUTE_373: '1_100215',
        ROUTE_346: '1_100203',
        ROUTE_331: '1_100196',
        ROUTE_301: '1_100175',
        ROUTE_316: '1_100190',
        ROUTE_303: '1_100177',

        // Near House
        STOP_MERIDIAN_167TH_NB: '1_16660',
        STOP_MERIDIAN_167TH_SB: '1_16260',
        STOP_MERIDIAN_175TH_EB: '1_75756',
        STOP_MERIDIAN_175TH_WB: '1_75884',
        STOP_MERIDIAN_175TH_NB: '1_16680',
        STOP_MERIDIAN_175TH_SB: '1_16240',
        STOP_AURORA_165TH_NB: '1_75860',
        STOP_AURORA_165TH_SB: '1_75780',

        // House <-> Work transfer points
        STOP_92ND_CORLISS_EB: '1_17022',
        STOP_92ND_CORLISS_WB: '1_17698',
        STOP_WALLINGFORD_40TH_EB: '1_26965',
        STOP_WALLINGFORD_40TH_WB: '1_26400',

        // Near Old Apartment
        STOP_AURORA_85TH_NB: '1_7730',
        STOP_AURORA_85TH_SB: '1_7160',
        STOP_AURORA_85TH_WB: '1_5450',
        STOP_AURORA_85TH_EB: '1_5370',
        STOP_STONE_85TH_WB: '1_5440',
        STOP_STONE_85TH_EB: '1_5380',
        STOP_WALLINGFORD_82ND_NB: '1_17650',
        STOP_WALLINGFORD_82ND_SB: '1_17070',

        // Old Apartment <-> Work transfer points
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
        STOP_RAVENNA_WOODLAWN_SEB_26: '1_26210',

        STOP_AURORA_46TH_NB: '1_75409',
        STOP_AURORA_46TH_SB: '1_75408',
        STOP_STONE_45TH_SB: '1_7350',
        STOP_STONE_45TH_EB: '1_29231',

        STOP_AURORA_38TH_NWB: '1_6340',
        STOP_AURORA_38TH_SEB: '1_6050',

        STOP_AURORA_GALER_NB: '1_6300',
        STOP_AURORA_GALER_SB: '1_6100',
        STOP_DEXTER_GALER_NB: '1_18505',
        STOP_DEXTER_GALER_SB: '1_18340',

        STOP_UNIVERSITY_CAMPUS_EB: '1_9575',
        STOP_12TH_CAMPUS_WB: '1_9138',
        STOP_UNIVERSITY_41ST_NB: '1_9581',
        STOP_UNIVERSITY_41ST_SB: '1_9142',
        STOP_15TH_CAMPUS_SB: '1_10914',

        // Near Work
        STOP_FREMONT_34TH_NB: '1_26860',
        STOP_FREMONT_34TH_SB: '1_26510',

        STOP_STONE_35TH_WB: '1_26480',
        STOP_STONE_35TH_EB: '1_26885',

        STOP_WOODLAWN_35TH_WB: '1_26460',
        STOP_WOODLAWN_35TH_EB: '1_26901',

        STOP_ASHWORTH_40TH_EB: '1_17360',
        STOP_ASHWORTH_40TH_WB: '1_17350',

        // Work -> Bill's transfer points
        STOP_STEVENS_RAINIER_NEB: '1_75415',
        STOP_UDIST_LINK_SB: '1_99604',

        STOP_DEXTER_DENNY_EB: '1_2250',
        STOP_DEXTER_DENNY_SB: '1_18402',

        STOP_3RD_PINE_SEB: '1_430',
        STOP_4TH_PINE_WB: '1_1120',
        STOP_WESTLAKE_STATION_A_NEB: '1_1121',
        STOP_3RD_PINE_NWB: '1_575',
        STOP_5TH_PINE_SWB: '1_1110',
        STOP_3RD_PIKE_NWB: '1_578',
        STOP_3RD_VIRGINIA_NWB: '1_600',

        // Near Bill's
        STOP_BROADWAY_PINE_WB: '1_11080',
        STOP_BROADWAY_PINE_EB: '1_11150',
        STOP_CAPITOL_HILL_LINK_NB: '1_99603',
        STOP_CAPITOL_HILL_LINK_SB: '1_99610',
        STOP_OLIVE_DENNY_EB: '1_2265',
        STOP_SENECA_HARVARD_SB: '1_3033'
    };

    // prettify routes
    let route = {
        Number2: raw.ROUTE_2,
        Number5: raw.ROUTE_5,
        Number8: raw.ROUTE_8,
        Number11: raw.ROUTE_11,
        Number26: raw.ROUTE_26,
        Number28X: raw.ROUTE_28X,
        Number31: raw.ROUTE_31,
        Number32: raw.ROUTE_32,
        Number40: raw.ROUTE_40,
        Number45: raw.ROUTE_45,
        Number49: raw.ROUTE_49,
        Number62: raw.ROUTE_62,
        Number316: raw.ROUTE_316,
        Number346: raw.ROUTE_346,
        Number373: raw.ROUTE_373,
        ELine: raw.ROUTE_ELINE,
        Link: raw.ROUTE_LINK
    };

    return { raw: raw, route: route, stop: prettifyStops(raw) };
}
