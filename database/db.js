const options = require('../knexfile');
require('dotenv').config();
let env = process.env.ENVIRONMENT || 'development';
const knex = require('knex')(options[env]);

//This function is for test purposes only, not for production
// const getAllUsers = async () => {
  //   let users = await knex.select('*').from('users');
  //   return users;
  // }

const getUser = async (username) => {
  let user = await knex.select('id', 'email', 'username').from('users').where({'username':username});
  //console.log(user);
  return user[0];
}

  
const getAllActivities = async () => {
  let result = await knex.select('*').from('activities');
  //console.log(result);
  return result;
};
  
//---------------- Not in Use -------------------------------//
// const getActivityNames = async (activityArray) => {
//   let names = await knex.select('*')
//     .from('activities')
//     .whereIn('activity_id', activityArray);
//   return names;
// }
//----------------------------------------------------------//

const getHistoricalActivities = async (id) => {
  let history = knex.select('*')
    .from('activities')
    .where({'owner' : id})
    return history;
}

const getCurrentActivities = async (id) => {
  let result = await knex.select('current_activities_array')
    .from('current_activities')
    .where({
      'current_activities_id' : id
    })
    .then((data) => data[0].current_activities_array);
  //console.log(result);
  return result;
}

const exportCurrentUserData = async (username) => {
  let user = await getUser(username);
  //console.log(user);
  let activities = await getCurrentActivities(user.id);
  //console.log(activities)
  let history = await getHistoricalActivities(user.id);
  let data = {
    user: user,
    historicalActivities: history,
    currentActivities: activities
  }
  console.log(data);
}

const insertNewActivity = async (activity) => {
  console.log(`attempting to insert ${activity.activity_name}`);
  let newActivity = await knex('activities').insert(activity);
  return newActivity;
}

//------------ need to refactor both functions to work properly -----------------\\
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
//--------------------------------------------------------------------------------\\

const insertNewUser = async (user) => {
  let newUser = await knex('users').insert(user);
  return newUser;
}

module.exports = {
  getUser: getUser,
  //getAllUsers: getAllUsers,
  getHistoricalActivities: getHistoricalActivities,
  getAllActivities: getAllActivities,
  getCurrentActivities: getCurrentActivities,
  exportCurrentUserData: exportCurrentUserData,
  insertNewActivity: insertNewActivity,
  initializeCurrentActivities: initializeCurrentActivities,
  updateCurrentActivities: updateCurrentActivities,
  insertNewUser: insertNewUser,
  //getActivityNames: getActivityNames
}