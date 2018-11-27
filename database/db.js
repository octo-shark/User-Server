const options = require('../knexfile');
require('dotenv').config();
let env = process.env.ENVIRONMENT || 'development';
const knex = require('knex')(options[env]);

const getUser = async (username) => {
  let user = await knex.select('*').from('users').where({'username':username});
  return user;
}

//This function is for test purposes only, not for production
// const getAllUsers = async () => {
//   let users = await knex.select('*').from('users');
//   return users;
// }

const getAllActivities = async () => {
  let result = await knex.select('*').from('activities');
  //console.log(result);
  return result;
};

const getCurrentActivities = async (id) => {
  let result = await knex.select('current_activities_array')
  .from('current_activities')
  .where({
    'current_activities_id' : id
  }).then((data) => data[0]);

  return result;
}

const insertNewActivity = async (activity) => {
  console.log(`attempting to insert ${activity.activity_name}`);
  let newActivity = await knex('activities').insert(activity);
  return newActivity;
}

const initializeCurrentActivities = async (activities, userId) => {
  let currentUserActivities = await 
    knex('current_activities')
      .where( {current_activities_id: userId} )
      .update( {current_activities_array : activities} )
  return currentUserActivities;
}

const updateCurrentActivities = async(userId, activityId, index) => {
  let newActivities = await knex.select('current_activities_array')
    .from('current_activities')
    .where({'current_activities_id' : userId})
    .then( (data) => data[0].current_activities_array);

  newActivities.splice(index, 1, parseInt(activityId));

  return knex('current_activities')
    .where({current_activities_id: parseInt(userId)})
    .update({current_activities_array: newActivities});
}

const insertNewUser = async (user) => {
  let newUser = await knex('users').insert(user);
  return newUser;
}

const getActivityNames = async (activityArray) => {
  let names = await knex.select('*')
  .from('activities')
  .whereIn('activity_id', activityArray);
  return names;
}

module.exports = {
  getUser: getUser,
  //getAllUsers: getAllUsers,
  getAllActivities: getAllActivities,
  getCurrentActivities: getCurrentActivities,
  insertNewActivity: insertNewActivity,
  initializeCurrentActivities: initializeCurrentActivities,
  updateCurrentActivities: updateCurrentActivities,
  insertNewUser: insertNewUser,
  getActivityNames: getActivityNames
}