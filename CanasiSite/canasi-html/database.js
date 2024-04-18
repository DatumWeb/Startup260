const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const config = require('./dbConfig.json');
const uuid = require('uuid');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}/`
const client = new MongoClient(url);
const db = client.db('startup');
const usersCollection = db.collection('users');


(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});


function getUser(username) {
  return usersCollection.findOne({ username: username})
}

function getUserByToken(token) {
  return usersCollection.findOne({ token: token });
}
async function createUser(user) {
  // Hash the password before inserting it into the database
  const passwordHash = await bcrypt.hash(user.password, 10);

  const newUser = {
    username: user.username,
    password: passwordHash,
    token: uuid.v4(),
    wins: 0, // Initial wins
    losses: 0 // Initial losses
  };
  
  await usersCollection.insertOne(newUser);

  return newUser;
}


async function updateUser(user) {
  const filter = { username: user.username };
  const update = {
    $set: { wins: user.wins, losses: user.losses }
  };

  const result = await usersCollection.updateOne(filter, update);
  return result;
}

module.exports = {   
  updateUser, 
  createUser,
  getUser,
  getUserByToken,
  
};
