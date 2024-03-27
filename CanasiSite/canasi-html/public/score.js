//function getWins() {

//function getLosses() {
    

function displayUsernames() {
    const yourUsername = localStorage.getItem("username");

    document.getElementById("username-score").innerText = yourUsername;
}

async function displayWinsAndLosses () {
    let wins = 0;
    const responseWins = await fetch('/api/playerWins');
    wins = await responseWins.json()
    //const wins = localStorage.getItem("fakeWins");
    let losses = 0;
    const responseLosses = await fetch('/api/Playerlosses');

    losses = await responseLosses.json();

    
    document.getElementById("wins").innerText = wins;
    document.getElementById("losses").innerText = losses;
    console.log(wins);
    console.log(losses);
}

window.onload = function() {
    displayUsernames();
    displayWinsAndLosses();
};