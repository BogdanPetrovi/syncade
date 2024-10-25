const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../db/database');
require('dotenv').config();
const passport = require('./authConfig');
const session = require('express-session');
const routes = require('./authRouter');
const isLoggedIn = require('./isLoggedIn');

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

router.get('/user/teams', isLoggedIn, async (req, res) => {
  try {
    const user = req.user;
    const result = await db.query(
      'SELECT team_name, teams.id FROM user_teams JOIN teams ON teams.id = user_teams.team_id WHERE user_teams.user_id = $1',
    [user.id]);
    res.status(200).json({
      "status": "success",
      "teams": result
    });
  } catch (err) {
    console.log(err)
  }
});

router.get('/team/projects/:id', isLoggedIn, async (req, res) => {
  try {
    const team_id = req.params.id;
    console.log(team_id);
    const result = await 
      db.query(
        'SELECT * FROM project_teams JOIN projects ON projects.id = project_teams.project_id WHERE team_id=$1;'
      , [team_id]
      );
    res.status(200).json({
      "status":"success",
      "projects": result
    })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router;