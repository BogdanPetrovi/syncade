const express = require('express');
const router = express.Router();
const passport = require('./authConfig');
const bodyParser = require('body-parser');
const {body, validationResult} = require('express-validator');
const db = require('../db/database');
const bcrypt = require('bcrypt');
require('dotenv').config();
const isLoggedIn = require('./isLoggedIn');

router.use(bodyParser.json());

router.get('/validate', isLoggedIn, (req, res) => {
  res.status(200).json({
    "status":"success",
    "authenticated": true,
    "user": req.user
  })
})

router.post('/register', [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  body('name').isLength({ min: 2 }).withMessage('Name needs to be at least 2 letters'),
  body('surname').isLength({ min: 3 }).withMessage('Surname needs to be at least 3 letters')
], async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password, name, surname } = req.body;
  const saltRounds = Number(process.env.SALT_ROUNDS);

  bcrypt.hash(password, saltRounds , async (err, hash) => {
    if (err) return res.status(500).send(console.log(err));
    try {
      const result = await db.query(
        'INSERT INTO users(email, password, name, surname) VALUES($1, $2, $3, $4) RETURNING *;',
         [email, hash, name, surname]);
      const user = result.rows[0];
      req.login(user, (err) => {
        if(err) res.status(500).json({error: err.message})
        res.status(200).json({"status":"success", "user": user});
      })
    } catch (err) {
      console.log(err);
      res.status(500).send(console.log(err));
    }
  });
});

router.post('/login',
  express.json(),
  passport.authenticate('local', {failureMessage: true}),
  function(req, res) {
    res.status(200).json({"status": "success", "user": req.user});
});


router.post('/logout', function(req, res, next){
  req.logout(function(err) {
      if (err) { return next(err); }
      res.status(200).json({"status":"success", "isAuthenticated": false});
  });
});

module.exports = router;