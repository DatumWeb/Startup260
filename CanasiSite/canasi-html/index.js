//const cookieParser = require('cookie-parser');
//const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(express.static('public'));






// Return the application's default page if the path is unknown from simon
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });
  
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);


//Gets Wins and Losses
let players = [
    //{"username": { wins: 5, losses: 2}
];

//find()
apiRouter.get('/playerWins/:user', (req, res) => {
    //res.json({wins: playerWins});
    username = req.params.user;
    res.json(players[username]);
});

apiRouter.post('/playerResults', (req, res) => {
    const { username, gameResult } = req.body;
    updateWinsLosses(username, gameResult);
    res.send();
});

//tracks wins and losses

function updateWinsLosses(username, gameResult) {
    if (!players[username]) {
        players[username] = { wins: 0, losses: 0 };
    }


    if (gameResult == "win") {
        players[username].wins++;
    } else if (gameResult == "loss") {
        players[username].losses++;
    }

}

// this might be better
/* // Initial values for wins and losses
let playerWins = 0;
let playerLosses = 0;

// Get player wins
apiRouter.get('/playerWins', (_req, res) => {
    res.json({ wins: playerWins });
});

// Get player losses
apiRouter.get('/playerLosses', (_req, res) => {
    res.json({ losses: playerLosses });
});

// Log game result (win/loss)
apiRouter.post('/logResult', (req, res) => {
    const { result } = req.body;
    if (result === "win") {
        playerWins++;
    } else if (result === "loss") {
        playerLosses++;
    }
    res.sendStatus(200);
});*/

