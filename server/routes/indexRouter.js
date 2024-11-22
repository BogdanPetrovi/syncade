const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../db/database');
require('dotenv').config();
const passport = require('./authConfig');
const session = require('express-session');
const routes = require('./authRouter');
const {body, validationResult} = require('express-validator');
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

router.get('/user/:id', isLoggedIn, async (req, res) => {
  try {
    const userId = req.params.id;
    var result = await db.query(
      'SELECT * FROM users JOIN user_teams ON user_teams.user_id = users.id JOIN teams ON user_teams.team_id = teams.id WHERE users.id = $1;',
    [userId])
    if(result.rows.length === 0){
      result = await db.query('SELECT * FROM users WHERE id = $1', [userId]); // If user is not assigned into a team
    }
    res.status(200).json({
      "status": "success",
      "data": result
    });
  } catch (err) {
    console.log(err)
  }
});

router.get('/project/:id', isLoggedIn, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.query(
      'SELECT * FROM projects LEFT JOIN project_teams ON projects.id = project_teams.project_id FULL JOIN teams ON  project_teams.team_id = teams.id WHERE projects.id = $1;',
      [id]
    );
    res.status(200).json({
      "status": "success",
      "data": result
    });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
})

router.post('/new/project', isLoggedIn, 
  [ 
    body('name').isLength({ min: 3 }).withMessage('Name needs to be at least 3 characters'),
    body('description').isLength({ min: 5 }).withMessage('Description needs to be at least 5 characters'),
    body('deadline').isDate().withMessage('Deadline needs to be a date')
  ]
  ,async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const userId = req.user.id;
      const { name, description, status, priority, deadline } = req.body;
      const result = await db.query(
        'INSERT INTO projects(project_name, project_description, creator_id, status, priority, deadline) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;',
        [name, description, userId, status, priority, deadline]
      )
      res.status(200).json({
        "status": "success",
        "data": result
      })
    } catch (err) {
      console.log(err)
    }
  }
)

module.exports = router;