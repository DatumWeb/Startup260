//Username JS
function displayUsernames() {
    const yourUsername = localStorage.getItem("username");
    const opponentUsername = "Nykta" //change this to active opponent

    document.getElementById("your-username").innerText = yourUsername;
    document.getElementById("opponent-username").innerText = opponentUsername;
}


function test() {
    console.log("hello");
}

//Board JS

placingTiles = false;
declareMove = false;
moveTurn = false;
selectingPiece = false;
movingPiece = false;
piecesPlaced = 0;
numRows = 7;
numColumns =7;


class BabyCanasiBoard {
    boardArray = [];
    currentMovingPiece = null;
    oldLocation = null;

    constructor() {
        
    }
    initialize() {
        this.createBoard();
        this.boardArray = this.createBoardArray();
    }
    
    createBoard() {
        let fullBoard = document.getElementById("full-board");
        fullBoard.addEventListener("click", (event) => this.tileClicked(event));
        for (let i = 0; i < numColumns; i++) {
            for (let j = 0; j < numRows; j++) {
                fullBoard.innerHTML += `<div id="${i}${j}" class="board-cell" style="display: flex; justify-content:center;align-items:center;"></div>`;
                
            }
        }
    }

    tileClicked(clickEvent) {
        let coords = clickEvent.target.id;
        let x = Number(String(coords)[0]);
        console.log(x);
        let y = Number(String(coords)[1]);
        if(placingTiles == true) {
            //if statment to see if a piece is already there
            if (piecesPlaced < 3) {
                let piece = new BabySiluanai();
                this.boardArray[x][y] = piece;
                piecesPlaced += 1;
                this.updateBoard();
            } else {
                let piece = new BabyScrivtre();
                this.boardArray[x][y] = piece;
                piecesPlaced += 1;
                placingTiles = false;
                moveTurn = true;
                selectingPiece = true;
                
                this.updateBoard();
                return;

            }
        }
        
         if (declareMove == true){
            if (selectingPiece == true){
                if (this.boardArray[x][y] != 0 ) { //&& piece.player == player.active   
                  
                }
            }
            


        }

        if (moveTurn == true){
            console.log(selectingPiece)
            if (selectingPiece == true) {
                console.log(x);
                if (this.boardArray[x][y] != 0) { //piece.player == player.active
                    this.currentMovingPiece = this.boardArray[x][y];
                    this.oldLocation = [x, y];  //saves location to be deleted 
                    selectingPiece = false;
                    movingPiece = true;
                }

            }
            else if (movingPiece == true) {
                if (this.boardArray[x][y] == 0 ) { //piece.player == player.active
                    //if statment to check xy distance
                    this.boardArray[x][y] = this.currentMovingPiece;
                    this.boardArray[this.oldLocation[0]][this.oldLocation[1]] = 0;
                    console.log(this.oldLocation);
                    movingPiece = false;
                    selectingPiece = true;
            }

            this.updateBoard();
            

        }

        }
    }

    updateBoard() {
        for (let i = 0; i < numColumns; i++) {
            for (let j = 0; j < numRows; j++) {
                let activeTile = document.getElementById(`${i}${j}`);
                if (this.boardArray[i][j] != 0) {
                    activeTile.innerHTML = `<img id="${i}${j}" class="placed-piece" src="${this.boardArray[i][j].pieceImg}">`;
                }
                else {
                    activeTile.innerHTML = ``;
                }

            }
        }
    }

    createBoardArray () {
        let gameBoardArray = []
        for (let i = 0; i < numColumns; i++) {
            var row = [];
            for (let j = 0; j < numRows; j++) {
                row.push(0);
            }
            gameBoardArray.push(row);
        }
        return gameBoardArray;
    }

    }


//Pieces JS
class BabyCanasiPieces {
    constructor(player) {
        this.player = player;
        this.hitPoints = 2;
        this.pieceImg = "";

    }
}

class BabyScrivtre extends BabyCanasiPieces {
    constructor(player) {
        super(player);
        this.hitPoints = 3
        this.pieceImg = "scrivtrePlaceHolder.jpg"
    }
}

class BabySiluanai extends BabyCanasiBoard {
    constructor(player) {
        super(player);
        this.pieceImg = "silunaiPiece.jpg"
    }
}

//Game JS


class BabyCanasi {
    constructor() {
       

    }
    initialize() {
        this.turnZero();
    }

    turnZero () {
        document.getElementById("move-prompt").innerText = "Click on 4 tiles to choose your starting location. First 3 are Silunai, the last is the Scrivtre";
        placingTiles = true;
    
    }

    movePiece () {
        document.getElementById("move-prompt").innerText = "Click on a piece and and a tile to move it.";


    }


}


//instances
let board = new BabyCanasiBoard();
let game = new BabyCanasi(); 

window.onload = function() {
    displayUsernames();
    board.initialize();
    game.initialize();
};

