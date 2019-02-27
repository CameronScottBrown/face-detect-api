const express = require('express');
const app = express();


const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date()
    }
  ]
}

app.get('/', (req, res) => {
  res.send(
    'this is working'
  );
});

app.post('/signin', (req, res) => {
  
  res.json('signing in');
});

app.post('/register', (req, res) => {
  res.json('registering');
});

app.listen(3000, () => {
  console.log('server running on port 3000');
});

/*
  Planning the API routes:
    routes                  type  return
    ------------------------------------
    * /                 --> GET:  this is working
    * /signin           --> POST: success/fail
    * /register         --> POST: user data
    * /profile/:userId  --> GET:  user data
    * /image            --> PUT:  user data
    * 
    * 
*/