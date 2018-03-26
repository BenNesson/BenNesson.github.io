// SHOW DATA
// Format is pretty obvious: an array of objects, where "name" is the name of
// the show, and "seasons" is an array of integers representing how many
// episodes are in each season.
let seriesData = [{
    name: "Parks and Recreation",
    seasons: [6, 24, 16, 22, 22, 22, 13]
}, {
    name: "Bob's Burgers",
    seasons: [13, 9, 23, 22, 21, 19, 22, 21]
}, {
    name: "Chowder",
    seasons: [20, 20, 9]
}, {
    name: "Gravity Falls",
    seasons: [20, 20]
}, {
    name: "Will and Grace",
    seasons: [22, 24, 25, 27, 24, 24, 24, 24, 16]
}, {
    name: "Brooklyn 99",
    seasons: [22, 23, 23, 22]
}];

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
// how many episodes were in the same season.Picking a random season and then a
// random episode from it biases the selection toward episodes from seasons with
// fewer episodes.E.g., P & R season 1 only had six episodes, so if all seasons
// are equally likely, those six episodes will get picked four times as often
// (on average) as season 2's 24 episodes.
// To avoid this, we total the episode counts, pick a random number in that
// range, and then work out what season that episode was in and where it falls
// in that season.
let pickEpisodeFromSeasons = function (seasons) {
    let total = seasons.reduce((t, c) => t + c);
    let episodeIndex = Math.ceil(Math.random() * total);

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
