function futureMove() {

}

function displayUsernames() {
    const yourUsername = localStorage.getItem("username");
    console.log("Your Username:");
    const opponentUsername = "Knight" //change this but idk how

    document.getElementById("your-username").innerText = yourUsername;
    document.getElementById("opponent-username").innerText = opponentUsername;


}

window.onload = function() {
    displayUsernames();
};