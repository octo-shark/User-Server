const options = require('../knexfile');
require('dotenv').config();
let env = process.env.ENVIRONMENT || 'development';
const knex = require('knex')(options[env]);

//This function is for test purposes only, not for production
module.exports.getAllUsers = async () => {
  let users = await knex.select('*').from('users');
  console.log(users);
  return users;
}

module.exports.getAllActivities = async () => {
  let result = await knex.select('*').from('activities');
  return result;
};

module.exports.getCurrentActivities = async (id) => {
  let result = await knex.select('current_activities_array')
  .from('current_activities')
  .where({
    'current_activities_id' : id
  }).then((data) => data[0]);

  return result;
}

module.exports.insertNewActivity = async (activity) => {
  console.log(`attempting to insert ${activity.activity_name}`);
  let newActivity = await knex('activities').insert(activity);
  return newActivity;
}

module.exports.initializeCurrentActivities = async (activities, userId) => {
  let currentUserActivities = await 
    knex('current_activities')
      .where( {current_activities_id: userId} )
      .update( {current_activities_array : activities} )
  return currentUserActivities;
}

module.exports.updateCurrentActivities = async(userId, activityId, index) => {
  let newActivities = await knex.select('current_activities_array')
    .from('current_activities')
    .where({'current_activities_id' : userId})
    .then( (data) => data[0].current_activities_array);

  newActivities.splice(index, 1, parseInt(activityId));

  return knex('current_activities')
    .where({current_activities_id: parseInt(userId)})
    .update({current_activities_array: newActivities});
}

module.exports.insertNewUser = async (user) => {
  let newUser = await knex('users').insert(user);
  return newUser;
}