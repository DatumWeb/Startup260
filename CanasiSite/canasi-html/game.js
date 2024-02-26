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
    for (i = 0; i < numColumns; i++) {
        for (j = 0; j < numRows; j++) {
            fullBoard.innerHTML += `<div id="${i}${j}" class="board-cell"></div>`;
        }
    }
}

class babyCanasiBoard {
    constructor() {
        
    }
}

//Pieces JS
class babyCanasiPieces {
    constructor(player) {
        this.player = player;
        this.hitPoints = 2;
    }
}

class babyScrivtre extends babyCanasiPieces {
    constructor(player) {
        super(player);
        this.hitPoints = 3
        scrivtreIMG = "scrivtrePlaceHolder.jpg"
    }
}

class babySiluanai extends babyCanasiBoard {
    constructor(player) {
        super(player);
        siluanaiIMG = "silunaiPiece.jpg"
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