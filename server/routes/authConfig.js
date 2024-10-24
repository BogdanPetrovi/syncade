const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('../db/database');

passport.use(new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  async function(email, password, cb) {
    try {
      const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      if(result.rows.length > 0){
        const user = result.rows[0];
        bcrypt.compare(password, user.password, (err, result) =>{
          if(err) cb(err)
          if(result) cb(null, user)
          else cb(null, false)
          })
        } else {
        cb(null, false)
      }
    } catch (err) {
      cb(err)
    }
  }
))

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});


module.exports = passport;