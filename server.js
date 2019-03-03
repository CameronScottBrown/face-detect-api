const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres', //change this hopefully
    password : 'dbpass', //this too
    database : 'face-detect'
  }
});

const pg = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: ['knex', 'public'],
});

db.select('*').from('users').then(data => {
  //console.log(data);
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

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
  ],
  login: [
    {
      id: '987',
      hash: '',
      email: 'john@gmail.com'
    }
  ]
}

app.get('/', (req, res) => {
  res.send(database.users);
});

app.post('/signin', (req, res) => {
  // Load hash from your password DB.
  bcrypt.compare(req.password, '$2a$10$m13QXFIQwJKY1v6VYhL9O.D8VnviYiKp2O/d0BWU7/L7P.s8E209G', function(err, res) {
    console.log('match');
  });
  if(req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
    res.json(database.users[0]);
  } else {
    res.status(400).json('error logging in'); 
  }
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, null, null, function(err, hash) {
    // Store hash in your password DB.
    //console.log(hash);
  }); 
  db('users')
    .returning('*')
    .insert({
        name: name,
        email: email,
        joined: new Date()
    })
    .then(user => {
      res.json(user[0]);
    })
    .catch(err => res.status(400).json('unable to join'));
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  db.select('*').from('users').where({id})
    .then(user => {
      if(user.length){
        res.json(use[0]);
      } else {
        res.status(400).json('user not found'); // user doesn't exist
      }
    })
    .catch(err => res.status(400).json('error getting user')); // systemic error

});

app.put('/image', (req, res) => {
  const { id } = req.body;
  db.where('id', '=', id)
  .increment('entries', 1)
});





// bcrypt.compare("veggies", hash, function(err, res) {
//   // res = false
// });

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