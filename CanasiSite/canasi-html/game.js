//Username JS
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
//Board JS
class babyCanasiBoard {
    constructor() {

    }
}

//Pieces JS
class babyCanasiPieces {
    constructor() {
        
    }
}

//Game JS
class babyCanasi {
    constructor() {

    }

    futureMove() {

    }

    movePiece() {

    }

    adjustWinLoss() {

    }

    win() {
    }

    lose() {

    }
}