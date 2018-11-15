const express = require('express');
const router = require('express').Router();
const db = require('./database/db.js');
const knex = require('knex')

//   This route is for testing only, not for production
//Get user info from users table;
router.get('/allUsers', (req, res) => {
  db.getAllUsers()
  .then((data) => res.status(200).send(data))
  .catch((err) => {
    console.log('error: ', err);
    res.status(500).send();
  })
});

//Get list of all activities
router.get('/allActivities', (req, res) => {
  db.getAllActivities()
  .then(data => {
    console.log(data);
    res.status(200).json(data)
  })
  .catch(err => {
    console.log('error: ', err);
    res.status(500).send()
  });
});

//Get list of a users current activities
router.get('/currentActivities', (req, res) => {
  //console.log(req.query.id)
  db.getCurrentActivities(req.query.id)
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => {
    console.log('error: ', err);
    res.status(500).send();
  })
});


//Insert new activity into activities table
router.post('/newActivity', (req, res) => {
  let activity = {
    activity_name: req.query.activity,
    color: req.query.color
  }
  
  db.insertNewActivity(activity)
  .then(() => 
  res.status(201).send(`${activity.activity_name} successfully inserted`)
  )
  .catch(err => {
    console.log('error: ', err);
    res.status(500).send();
  });
});

router.post('/initialCurrentActivities', (req, res) => {
  //console.log(req.query);
  let activities = req.query.activities
  db.initializeCurrentActivities(JSON.parse(activities), req.query.id)
  .then(() => 
    res.status(201).send(`successfully created activities for user`)
  )
  .catch(err => {
    console.log(`error: ${err}`);
    res.status(500).send();
  });
})

//Update the users current activities in their specific current activities table
router.post('/updateCurrentActivities', (req, res) => {
  //console.log(req.query);
  db.updateCurrentActivities(req.query.userId, req.query.activityId, req.query.index)
  .then(() => 
    res.status(201).send(`successfully updated activities`)
  )
  .catch(err => {
    console.log('error: ', err);
    res.status(500).send();
  })
});

//******  needs to be refactored when authentication is implemented **********
//Insert new user into users table
router.post('/newUser', (req, res) => {
  let user = {
    email: req.query.email,
    username: req.query.username,
    password: req.query.password
  }

  db.insertNewUser(user)
  .then(() => 
    res.status(201).send('user successfully inserted')
  )
  .catch(err => {
    console.log('error: ', err)
    res.status(500).send();
  });
});

module.exports = router;