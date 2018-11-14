const express = require('express');
const router = require('express').Router();
const db = require('./database/db.js');
const knex = require('knex')

//router.get('/user', (req, res) => {
  //get user info from users table;
//});

router.get('/currentActivities', (req, res) => {
  //get list of a users current activities
  console.log(req.query.id)
  db.getCurrentActivities(req.query.id)
  .then(data => {
    //console.log(data);
    res.status(200).json(data);
  })
  .catch(err => {
    console.log('error: ', err);
    res.status(500).send();
  })
});

router.get('/allActivities', (req, res) => {
  //get list of all activities
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

router.post('/userInfo', (req, res) => {
  //insert new user into users table
});

router.post('/newActivity', (req, res) => {
  //insert new activity into activities table
});

router.post('/updateCurrentActivities', (req, res) => {
  //update the users current activities in their specific current activities table
});




module.exports = router;