//Username JS
function displayUsernames() {
    const yourUsername = localStorage.getItem("username");
    console.log("Your Username:");
    const opponentUsername = "Nykta" //change this to active opponent

    document.getElementById("your-username").innerText = yourUsername;
    document.getElementById("opponent-username").innerText = opponentUsername;


}

window.onload = function() {
    displayUsernames();
    createBoard();
};



//Board JS
function createBoard() {
    fullBoard = document.getElementById("full-board");
    numRows = 7;
    numColumns =7;
    for (i = 0; i < numRows; i++) {
        fullBoard.innerHTML += "<div class=\"board-cell\"></div>";

        for (j = 1; j < numColumns; j++) {
            fullBoard.innerHTML += "<div class=\"board-cell\"></div>";
        }
        
    }
}

class babyCanasiBoard {
    constructor() {

    }
}

//Pieces JS
class babyCanasiPieces {
    constructor(owner) {
        this.owner = owner;
        this.hitPoints = 2;
    }
}

class babyScrivtre extends babyCanasiPieces {
    constructor(owner) {
        super(owner);
        this.hitPoints = 3
    }
}

class babySiluanai extends babyCanasiBoard {
    constructor(owner) {
        super(owner);
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