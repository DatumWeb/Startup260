//function getWins {

//function getLosses {
    

function displayUsernames() {
    const yourUsername = localStorage.getItem("username");

    document.getElementById("username-score").innerText = yourUsername;
}

window.onload = function() {
    displayUsernames();
};