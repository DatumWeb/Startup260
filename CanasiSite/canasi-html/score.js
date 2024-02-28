//function getWins() {

//function getLosses() {
    

function displayUsernames() {
    const yourUsername = localStorage.getItem("username");

    document.getElementById("username-score").innerText = yourUsername;
}

function displayWinsAndLosses () {
    const wins = localStorage.getItem("fakeWins");
    const losses = localStorage.reloadCount || 0;

    document.getElementById("wins").innerText = wins;
    document.getElementById("losses").innerText = losses;
    console.log(wins);
    console.log(losses);
}

window.onload = function() {
    displayUsernames();
    displayWinsAndLosses();
};