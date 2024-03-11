const exp = require('constants');
const express = require('express');
const app = express();

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
let playerWins = 0;
let playerLosses = 0;
apiRouter.get('/playerWins', (_req, res) => {
    //res.json({wins: playerWins});
    res.send(playerWins);
});

apiRouter.post('/playerWins', (req, res) => {
    playerWins = updateWinsLosses(req.body, playerWins)
    res.send(playerWins);
})

//tracks wins and losses

function updateWinsLosses(gameResult) {
    if (gameResult == "win") {
        playerWins++;
    } else if (gameResult == "loss") {
        playerLosses++;
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

