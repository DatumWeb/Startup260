const exp = require('constants');
const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(express.static('pulic'));






// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });
  
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

//tracks wins and losses
let playerWins = 0;
let playerLosses = 0;
function updateWinsLosses(gameResult) {
    if (gameResult == "win") {
        playerWins++;
    } else if (gameResult == "loss") {
        playerLosses++;
    }

}