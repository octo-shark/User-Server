require('dotenv').config();

const router = require('express').Router();
const db = require('./database/db.js');

//Get user info from users table;
router.get('/:userID', (req, res) => {
  db.exportCurrentUserData(req.params.userID)
  .then((data) => res.status(200).send(data))
  .catch((err) => {
    console.log('error: ', err);
    res.status(500).send();
  })
});
//db.exportCurrentUserData('ethan')

//Get list of all activities
router.get('/allActivities', (req, res) => {
  db.getAllActivities()
  .then(data => res.status(200).send(data))
  .catch(err => {
    console.log('error: ', err);
    res.status(500).send()
  });
});
//db.getAllActivities();

//----------------------------------POST METHODS---------------------------------------------//

//Insert new activity into activities table
router.post('/newActivity', (req, res) => {
  let activity = {
    activity_name: req.body.activity,
    color: req.body.color,
    owner: req.body.id
  }
  
  db.insertNewActivity(activity)
  .then(() => res.status(201).send(`${activity.activity_name} successfully inserted`))
  .catch(err => {
    console.log('error: ', err);
    res.status(500).send();
  });
});
//db.insertNewActivity({activity_name: 'golding', color: '#', owner: 113})

//Update the users current activities in their specific current activities table
router.post('/updateCurrentActivities', (req, res) => {
  let activities = req.body.activities
  db.updateCurrentActivities(activities, req.body.id)
  .then(() => 
    res.status(201).send(`successfully created activities for user`)
  )
  .catch(err => {
    console.log(`error: ${err}`);
    res.status(500).send();
  });
})
//db.updateCurrentActivities(([76, 77, 77, 77, 76, 77, 77, 79]), 98);

//******  needs to be refactored when authentication is implemented **********
//Insert new user into users table
router.post('/newUser', (req, res) => {
  let user = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  }

  db.insertNewUser(user)
  .then(() => res.status(201).send('user successfully inserted'))
  .catch(err => {
    console.log('error: ', err)
    res.status(500).send();
  });
});

// db.insertNewUser({
//   email: 'NotARealEmail@NotGmail.com',
//   username: 'someUserName',
//   password: '12345'
// });

module.exports = router;