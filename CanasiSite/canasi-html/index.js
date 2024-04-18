//const cookieParser = require('cookie-parser');
//const bcrypt = require('bcrypt');
const express = require('express');
const { createUser, updateUser, getUser } = require('./database');
const app = express();


const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Get player record by username
apiRouter.get('/playerRecord/:username', async (req, res) => {
  const username = req.params.username;
  try {
    const playerRecord = await getUser(username);
    if (!playerRecord) {
      res.status(404).json({ error: 'Player not found' });
      return;
    }
    res.json(playerRecord);
  } catch (error) {
    console.error('Error retrieving player record:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update player wins and losses
apiRouter.post('/playerResults', async (req, res) => {
  const { username, gameResult } = req.body;
  try {
    let playerRecord = await getUser(username);
    if (!playerRecord) {
      // Create new user if not found
      playerRecord = await createUser({ username, password: '', wins: 0, losses: 0 });
    }
    // Update wins and losses
    if (gameResult === 'win') {
      playerRecord.wins++;
    } else if (gameResult === 'loss') {
      playerRecord.losses++;
      console.log('Incrementing losses for user:', username);
    }
    console.log('Updated player record:', playerRecord);
    await updateUser(playerRecord);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error updating player record:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
/*
//Gets Wins and Losses
let players = [
    {"username": { wins: 5, losses: 2}}
];

//find()
apiRouter.get('/playerWins', async(req, res) => {
    //res.json({wins: playerWins});

    username = req.body.user;
    res.send(players[username]);
});

apiRouter.post('/playerResults', async(req, res) => {
    const { username, gameResult } = req.body;
    updateWinsLosses(username, gameResult);
    res.send();
});

apiRouter.get('/playerRecord/:username', async(req, res) => {
    const username = req.params.username; 
    const playerRecord = players[username]
    console.log('playerRecord')
    console.log(playerRecord);
    
    res.send(playerRecord);
});

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
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
    console.log(players);

}


*/