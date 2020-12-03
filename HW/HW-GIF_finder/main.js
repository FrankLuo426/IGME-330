// 1
window.onload = (e) => {
    document.querySelector("#findmore").disabled = true;
    document.querySelector("#search").onclick = searchButtonClicked
    document.querySelector("#findmore").onclick = findmoreClicked
};

// 2
let displayTerm = "";
let offset = 0;
let info;
// 3
function searchButtonClicked() {

    offset = 0;

    console.log("searchButtonClicked() called");

    const GIPHY_URL = "http://api.giphy.com/v1/gifs/search?";

    let GIPHY_KEY = "tH7NkuJUOcVVGQ7yoFMoUkTgppTJUEY9";

    let url = GIPHY_URL;
    url += "api_key=" + GIPHY_KEY;
    url += "&offset=" + offset;

    let term = document.querySelector("#searchterm").value;
    displayTerm = term;

    term = term.trim();

    term = encodeURIComponent(term);

    if (term.length < 1) return;

    url += "&q=" + term;

    let limit = document.querySelector("#limit").value;
    url += "&limit=" + limit;

    document.querySelector("#status").innerHTML = "<b>Searching for '" + displayTerm + "'</b>";

    console.log(url);

    getData(url);

    info = "(start=" + 1 + "end=" + limit + ")";
    document.querySelector("#findmore").disabled = false;
}

function findmoreClicked() {

    console.log("searchButtonClicked() called");

    const GIPHY_URL = "http://api.giphy.com/v1/gifs/search?";

    let GIPHY_KEY = "tH7NkuJUOcVVGQ7yoFMoUkTgppTJUEY9";

    let url = GIPHY_URL;
    url += "api_key=" + GIPHY_KEY;

    let term = document.querySelector("#searchterm").value;
    displayTerm = term;

    term = term.trim();

    term = encodeURIComponent(term);

    if (term.length < 1) return;

    url += "&q=" + term;

    let limit = document.querySelector("#limit").value;
    url += "&limit=" + limit;
    offset = parseInt(offset) + parseInt(limit);
    url += "&offset=" + offset;

    document.querySelector("#status").innerHTML = "<b>Searching for '" + displayTerm + "'</b>";

    console.log(url);

    getData(url);


    info = "(start=" + (parseInt(offset) + 1) + " end=" + (parseInt(offset) + parseInt(limit)) + ")";
}

function getData(url) {
    let xhr = new XMLHttpRequest();
    xhr.onload = dataLoaded;
    xhr.onerror - dataError;
    xhr.open("GET", url);
    xhr.send();
}



function dataLoaded(e) {
    let xhr = e.target;
    console.log(xhr.responseText);
    let obj = JSON.parse(xhr.responseText);

    if (!obj.data || obj.data.length == 0) {
        document.querySelector("#status").innerHTML = "<b>No results found for '" + displayTerm + "'</b>";
        return;
    }

    let results = obj.data;
    console.log("results.length = " + results.length);
    let bigString = "<p><i>Here are " + results.length + " results for '" + displayTerm + "'</i></p>" + info;

    for (let i = 0; i < results.length; i++) {
        let result = results[i];

        let smallURL = result.images.fixed_width_small.url;
        if (!smallURL) smallURL = "images/no-image-found.png";

        let url = result.url;
        let rating = result.rating.toUpperCase();

        var line = `<div class='result'><img src='${smallURL}' title= '${result.id}' />`;
        line += `<span><a target='_blank' href='${url}'>View on Giphy</a></span>`;
        line += `<p>Rating: ${rating}</p></div>`;
        bigString += line;
    }

    document.querySelector("#content").innerHTML = bigString;

    document.querySelector("#status").innerHTML = "<b>Success!</b>";
}

function dataError(e) {
    console.log("An error occurred");
}