const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../db/database');
require('dotenv').config();
const passport = require('./authConfig');
const session = require('express-session');
const routes = require('./authRouter');

router.use(session({
  secret: process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized: true,
  cookie:{
    maxAge: 1000 * 60 * 60 * 24
  }
}));

router.use(passport.initialize());
router.use(passport.session());

router.use(bodyParser.json());
router.use('/', routes);

//TODO: 1. ISTRAZITI AKO MOZE DA SE EXPORTUJE FUNCKICJA IS AUTH ROUTERA ZA ISLOGGED IN
//      2. FRONTEND ZA LOGIN/REGISTER
//      3. KRENUTI SA RUTAMA

module.exports = router;