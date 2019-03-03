const handleSignIn = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  if(!email || !password) {
    return res.status(400).json('incorrect form submission'); // empty value validation
  }
  db.select('email', 'hash').from('login')
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if(isValid){
        db.select('*').from('users')
          .where('email', '=', email)
          .then(user => {
            res.json(user[0]);
          })
          .catch(err => res.status(400).json('unable to get user data'))
      } else {
        res.status(400).json('incorrect credentials');
      }
    })
}; 

module.exports = {
  handleSignIn: handleSignIn
}