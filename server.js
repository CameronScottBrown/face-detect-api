const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(
    'this is working'
  );
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
    * 
    * 
    * 
*/