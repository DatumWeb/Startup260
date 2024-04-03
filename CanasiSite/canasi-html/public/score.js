//function getWins() {

//const { response } = require("express");

//function getLosses() {
    

function displayUsernames() {
    const yourUsername = localStorage.getItem("username");

    document.getElementById("username-score").innerText = yourUsername;
}

async function displayWinsAndLosses () {
    const yourUsername = localStorage.getItem("username");
    let wins = 0;
    let losses = 0;
    try {
        console.log(yourUsername)
        const playerRecord = await fetch(`/api/playerRecord/${yourUsername}`)
        const recordData = await playerRecord.json();
        wins = recordData.wins;
        losses = recordData.losses;
        console.log(wins)
        console.log(losses)
    } catch (error) {
        console.error('Error fetching wins or losses:', error);
    }
    


    
    document.getElementById("wins").innerText = wins;
    document.getElementById("losses").innerText = losses;
    console.log(wins);
    console.log(losses);
}

window.onload = function() {
    displayUsernames();
    displayWinsAndLosses();
};