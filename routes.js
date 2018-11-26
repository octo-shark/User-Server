require('dotenv').config();

const router = require('express').Router();
const db = require('./database/db.js');

//Get user info from users table;
router.get('/:userID', (req, res) => {
  db.getUser(req.params.userID)
  .then((data) => res.status(200).send(data))
  .catch((err) => {
    console.log('error: ', err);
    res.status(500).send();
  })
});

// This route is for testing only, not for production
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
    res.status(200).send(data)
  })
  .catch(err => {
    console.log('error: ', err);
    res.status(500).send()
  });
});

//Get list of a users current activities
router.get('/currentActivities', (req, res) => {
  db.getCurrentActivities(req.body.id)
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => {
    console.log('error: ', err);
    res.status(500).send();
  })
});

//Get activity names based on user's current activity id #'s
router.get('/activityNames', (req, res) => {
  db.getActivityNames(req.body.activityArray)
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => {
    console.log('error: ', err)
    res.status(500).send();
  });
})

//Insert new activity into activities table
router.post('/newActivity', (req, res) => {
  let activity = {
    activity_name: req.body.activity,
    color: req.body.color
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
  let activities = req.body.activities
  db.initializeCurrentActivities(JSON.parse(activities), req.body.id)
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
  db.updateCurrentActivities(req.body.userId, req.body.activityId, req.body.index)
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
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
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