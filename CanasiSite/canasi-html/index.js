const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const DB = require('./database.js');
const app = express();

const authCookieName = 'token';



const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());

app.use(express.static('public'));

app.set('trust proxy', true);

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.username)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.username, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.username);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

//gets info
apiRouter.get('/user/:username', async (req, res) => {
  const user = await DB.getUser(req.params.username);
  if (user) {
    const token = req?.cookies.token;
    res.send({ username: user.username, authenticated: token === user.token, wins: user.wins, losses: user.losses});
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});

// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// Get player record by username
apiRouter.get('/playerRecord/:username', async (req, res) => {
  const username = req.params.username;
  try {
    const playerRecord = await DB.getUser(username);
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



//////////////////

// Apply the authentication middleware to relevant routes



// Update player wins and losses
apiRouter.post('/playerResults', async (req, res) => {
  const { username, gameResult } = req.body;
  try {
    let playerRecord = await DB.getUser(username);
    if (!playerRecord) {
      // Create new user if not found
      playerRecord = await DB.createUser({ username, password: '', wins: 0, losses: 0 });
    }
    // Update wins and losses
    if (gameResult === 'win') {
      playerRecord.wins++;
    } else if (gameResult === 'loss') {
      playerRecord.losses++;
      console.log('Incrementing losses for user:', username);
    }
    console.log('Updated player record:', playerRecord);
    await DB.updateUser(playerRecord);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error updating player record:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

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