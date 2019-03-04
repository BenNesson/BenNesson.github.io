// SHOW DATA
// Format is pretty obvious: an array of objects, where "name" is the name of
// the show, and "seasons" is an array of integers representing how many
// episodes are in each season.
let seriesData = [{
    // DONE
    name: "Parks and Recreation",
    seasons: [6, 24, 16, 22, 22, 22, 13]
}, {
    // in season 9 (going up live, but I ain't updating this every week)
    name: "Bob's Burgers",
    seasons: [13, 9, 23, 22, 21, 19, 22, 21]
}, {
    // in season 6 (going up live, but I ain't updating this every week)
    name: "Brooklyn 99",
    seasons: [22, 23, 23, 22, 22]
}, {
    // DONE
    name: "30 Rock",
    seasons: [21, 15, 22, 22, 22, 22, 13]
}, {
    // DONE
    name: "King of the Hill",
    seasons: [12, 23, 25, 24, 20, 22, 23, 22, 15, 15, 12, 22, 24]
}, {
    // DONE
    name: "The League",
    seasons: [6, 13, 13, 13, 13, 13, 13]
}, {
    // still airing / latest not on Hulu yet
    name: "Always Sunny",
    seasons: [7, 10, 15, 13, 12, 13, 13, 10, 10, 10, 10, 10]
}, {
    // season 10 coming
    name: "Archer",
    seasons: [10, 13, 13, 13, 13, 13, 10, 8, 8]
}, {
    // season 4 coming (apparently)
    name: "Rick and Morty",
    seasons: [11, 10, 10]
}
];

// IGNORE THIS
// It's a thing I use to pull episode/season counts directly from Hulu's data,
// it's annoying to use, and I don't want to have to re figure it out.
/*
// one-line:
((items)=>items.reduce((sc,i)=>(sc[i.season-1]++,sc),Array(items.reduce((s,i)=>(s.add(i.season),s),new Set()).size).fill(0)))(JSON.parse(document.body.children[0].innerText).components[0].items)

// semi-readable
(
  (items)=>items.reduce(
    (sc,i)=>(
      sc[i.season-1]++,
      sc
    ),
    Array(
      items.reduce(
        (s,i)=>(
          s.add(i.season),
          s
        ),
        new Set()
      ).size
    ).fill(0)
  )
)(
  JSON.parse(document.body.children[0].innerText)
    .components[0]
    .items
)
*/

// GLOBALS
let showPicker, seasonCell, episodeCell;


// INTERNAL FUNCTIONS
let initElements = function () {
    seriesPicker = document.getElementById("seriesPicker");
    seasonCell = document.getElementById("seasonCell");
    episodeCell = document.getElementById("episodeCell");
};

// Populate the combobox with seriesData values
let populate = function () {
    for (let i in seriesData) {
        let newOption = document.createElement("OPTION");
        newOption.setAttribute("value", i);
        newOption.innerHTML = seriesData[i].name;
        seriesPicker.appendChild(newOption);
    }
};

// We want all episodes to have an equal chance of being selected, regardless of
// how many episodes were in the same season.  Picking a random season and then
// a random episode from it biases the selection toward episodes from seasons
// with fewer episodes.  E.g., P & R season 1 only had six episodes, so if all
// seasons are equally likely, those six episodes will get picked four times as
// often (on average) as season 2's 24 episodes.
// To avoid this, we total the episode counts, pick a random number in that
// range, and then work out what season that episode was in and where it falls
// in that season.
let pickEpisodeFromSeasons = function (seasons) {
    // Add up the episode total
    let total = seasons.reduce((t, c) => t + c);
    // Pick a number in that range
    let episodeIndex = Math.ceil(Math.random() * total);

    // As an example, assume we want the 41st episode of Parks and Recreation.
    // We start out assuming we want season 1, episode 41.  But season 1 only
    // has 6 episodes, so it can't be in season 1.  Season 1, episode 41 is
    // equivalent to season 2, episode 35.  (That is, 41 minus the 6 episodes
    // in season 1.)  But again, season 2 only has 24 episodes, so we add a
    // season and subtract 24 episodes to get season 3, episode 11, which does
    // exist.  So that's our result.
    let result = { season: 1, episode: episodeIndex };
    while (result.episode > seasons[result.season - 1]) {
        result.episode -= seasons[result.season - 1];
        result.season++;
    }
    return result;
};

// EXPORTED FUNCTIONS
function pickEpisode() {
    let selection = seriesPicker.value;
    let seasons = seriesData[selection].seasons;
    let pick = pickEpisodeFromSeasons(seasons);
    seasonCell.innerHTML = pick.season;
    episodeCell.innerHTML = pick.episode;
}

function init() {
    initElements();
    populate();
    pickEpisode();
}
