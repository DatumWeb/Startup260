//function getWins() {

//function getLosses() {
    

function displayUsernames() {
    const yourUsername = localStorage.getItem("username");

    document.getElementById("username-score").innerText = yourUsername;
}

async function displayWinsAndLosses () {
    let wins = 0;
    let losses = 0;
    try {
        const responseWins = await fetch('/api/playerWins');
        const winsData = await responseWins.json();
        wins = winsData.wins;

        const responseLosses = await fetch('/api/playerLosses');
        const lossesData = await responseLosses.json();
        losses = lossesData.losses;
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