const options = require('../knexfile');
require('dotenv').config();
let env = process.env.ENVIRONMENT || 'development';
const knex = require('knex')(options[env]);

//This function is for test purposes only, not for production
// const getAllUsers = async () => {
  //   let users = await knex.select('*').from('users');
  //   return users;
  // }

//------------------ GET METHODS --------------------------------------------------------------------//

const getUser = async (googleID) => {
  let user = await knex.select('id', 'googleID', 'username').from('users').where({googleID});
  if(!user){
    return null
  }
  return user[0];
}

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
  return result;
}

const exportCurrentUserData = async (googleID) => { // this variable here is the unique google ID google gives us. FIX ME?
  let user = await getUser(googleID);
  if(!user){
    return;
  }
  let activities = await getCurrentActivities(user.id);
  let history = await getHistoricalActivities(user.id);
  let data = {
    activities: history,
    assigned_activities: activities,
    account: user
  }
  return data;
  console.log(data);
}

const getAllActivities = async () => {
  let result = await knex.select('*').from('activities');
  console.log(result);
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

//------------------ POST METHODS --------------------------------------------------------------------//

const insertNewActivity = async (activity) => {
  console.log(`attempting to insert ${activity.activity_name}`);
  let newActivity = await knex('activities').insert(activity);
  return newActivity;
};

const updateCurrentActivities = async (activities, userId) => {
  if(activities.length > 8) {
    console.log('invalid array length');
    throw new Error('invalid array length');
  }
  let currentUserActivities = await 
    knex('current_activities')
      .where( {current_activities_id: userId} )
      .update( {current_activities_array : activities} )
  return currentUserActivities;
};

const insertNewUser = async (user) => {
  let newUser = await knex('users').insert(user)
    .then(() => 
      knex('current_activities').insert({
        current_activities_id: knex.select('id').from('users').where({'username': user.username}), 
        current_activities_array: Array(8).fill(0,0,8)
      }))
  console.log('newUser inserted: ',newUser);
  return newUser;
};

module.exports = {
  getUser: getUser,
  getHistoricalActivities: getHistoricalActivities,
  getAllActivities: getAllActivities,
  getCurrentActivities: getCurrentActivities,
  exportCurrentUserData: exportCurrentUserData,
  insertNewActivity: insertNewActivity,
  updateCurrentActivities: updateCurrentActivities,
  insertNewUser: insertNewUser,
  //getAllUsers: getAllUsers,
  //getActivityNames: getActivityNames
};