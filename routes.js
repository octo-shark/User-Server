require('dotenv').config();

const router = require('express').Router();
const db = require('./database/db.js');

//Get user info from users table;
router.get('/:userID', (req, res) => {
  db.exportCurrentUserData(req.params.userID)
  .then((data) => {
    if(!data){ 
      let user = {
        googleID: req.params.userID,
        username: req.body.username,
      }
      db.insertNewUser(user)
      .then(() => {
        db.getUser(user.googleID)
        .then(user => {
          db.getCurrentActivities(user.id).then((activities) =>{
            res.status(201).send(JSON.stringify({user, activities}))
            return;
          })
        })
      })
      .catch(err => {
        console.log('error db.insertNewUser(user): ', err)
        res.status(500).send();
      });
    }else{
      res.status(200).send(JSON.stringify({user: data.account, activities: data.activities, assigned_activities: data.assigned_activities}))
    }

  })
  .catch((err) => {
    console.log('error db.exportCurrentUserData(req.params.userID): ', err);
    res.status(500).send();
  })
});

//Get list of all activities
router.get('/allActivities', (req, res) => {
  db.getAllActivities()
  .then(data => res.status(200).send(data))
  .catch(err => {
    console.log('error db.getAllActivities(): ', err);
    res.status(500).send()
  });
});

//----------------------------------POST METHODS---------------------------------------------//

//Insert new activity into activities table
router.post('/newActivity', (req, res) => {
  let activity = {
    activity_name: req.body.activity,
    color: req.body.color,
  }
  
  db.insertNewActivity(activity)
  .then(() => res.status(201).send(`${activity.activity_name} successfully inserted`))
  .catch(err => {
    console.log('error db.insertNewActivity(activity): ', err);
    res.status(500).send();
  });
});

//Update the users current activities in their specific current activities table
router.post('/updateCurrentActivities', (req, res) => {
  let activities = req.body.activities
  db.updateCurrentActivities(activities, req.body.id)
  .then(() => 
    res.status(201).send(`successfully created activities for user`)
  )
  .catch(err => {
    console.log(`error db.updateCurrentActivities(activities, req.body.id): ${err}`);
    res.status(500).send();
  });
});

router.post('/updateActivity', (req, res) => {
  db.updateActivity(req.body)
  .then(() => 
    res.status(201).send('successfully updated activity') 
  )
  .catch(err => {
    console.log('error: ', err);
    res.status(500).send();
  })
})

module.exports = router;