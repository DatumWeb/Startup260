const cookieParser = require('cookie-parser');
const express = require('express');
const { createUser, updateUser, getUser } = require('./database');
const app = express();

app.use(cookieParser());

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(express.static('public'));

function authenticate(req, res, next) {
  // Check if authentication cookie exists
  if (req.cookies.authToken) {
      // User is authenticated, allow access to the next middleware
      next();
  } else {
      // User is not authenticated, send an error response
      res.status(401).send('Unauthorized: You must sign in to access this page.');
  }
}

// Apply the authentication middleware to relevant routes
app.get('/game', authenticate, (req, res) => {
  // Route handler for the game page
  res.send('Welcome to the game page!');
});

app.get('/scores', authenticate, (req, res) => {
  res.send('Here are the scores')
})







// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);


app.get('/api/username', authenticate, async (req, res) => {
  try {
    const user = await getUser(req.user.username); // Assuming req.user contains the authenticated user details
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json({ username: user.username });
  } catch (error) {
    console.error('Error retrieving username:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

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


app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  // Authenticate user
  const isAuthenticated = await authenticateUser(username, password);
  if (!isAuthenticated) {
    return res.status(401).send('Invalid username or password');
  }

  // Set authentication cookie or token
  const authToken = generateAuthToken(username); // Implement this function to generate a token
  res.cookie(authCookieName, authToken, { httpOnly: true });
  res.status(200).send('Login successful');
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