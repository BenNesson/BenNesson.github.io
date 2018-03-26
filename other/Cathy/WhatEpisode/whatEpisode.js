let showData = [{
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
let showPicker, seasonCell, episodeCell;
let initElements = function () {
    showPicker = document.getElementById("ShowPicker");
    seasonCell = document.getElementById("seasonCell");
    episodeCell = document.getElementById("episodeCell");
};
let populate = function () {
    for (let i in showData) {
        let newOption = document.createElement("OPTION");
        newOption.setAttribute("value", i);
        newOption.innerHTML = showData[i].name;
        showPicker.appendChild(newOption);
    }
};
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

function pickEpisode() {
    let selection = showPicker.value;
    let seasons = showData[selection].seasons;
    let pick = pickEpisodeFromSeasons(seasons);
    seasonCell.innerHTML = pick.season;
    episodeCell.innerHTML = pick.episode;
}
function init() {
    initElements();
    populate();
    pickEpisode();
}
