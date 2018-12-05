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
  let historicalActivities = knex.select('*')
  .from('activities')
  return historicalActivities;
}

const getCurrentActivities = async (id) => {
  console.log('getCurrentAct: ', id)
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
  let newActivity = await knex('activities').insert(activity).returning('activity_id');
  console.log('newActivity = ', newActivity)
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
  let ids = [];
  //master list-------------------

  let templateActivities = [
    {activity_name: 'Reading', color: '#b9f6ca'},
    {activity_name: 'Phone Calls', color: '#84ffff'},
    {activity_name: 'Browsing Reddit', color: '#b388ff'},
    {activity_name: 'Complaining', color: '#ff80ab'},
    {activity_name: 'Walking in Circles', color: '#ff9e80'},
    {activity_name: 'Debugging', color: '#ffff8d'},
    {activity_name: 'Napping', color: '#80d8ff'},
    {activity_name: 'Lunch', color: '#ea80fc'}
  ]
  for(let i = 0; i < 8; i++){
    let activity = templateActivities[i];
    // console.log('Activity to db: ',activity)
    let id = await insertNewActivity(activity)
    ids.push(id[0])
  }
  console.log(ids)
  // knex.select('activity_id').from('activities').limit(8).then((data) =>{
  //   ids = data;
  //   let expample=ids.map(i => {return i.activity_id})
  //   console.log('activityIDs', expample)
  // })
  
  let newUser = await knex('users').insert(user)
    .then(() => 
      knex('current_activities').insert({
        current_activities_id: knex.select('id').from('users').where({googleID: user.googleID}), 
        current_activities_array: ids.map(i => {return i}) //[473,474,475,476,474,478,479,480]
      }))
  console.log('newUser inserted: ',newUser);
  return newUser;
};

const updateActivity = async (activity) => {
  let updatedActivities = await 
    knex('activities')
      .where({activity_id :activity.activity_id})
      .update({
        activity_name: activity.activity_name,
        color: activity.color
      })
  return updatedActivities;
}
  

module.exports = {
  getUser: getUser,
  getHistoricalActivities: getHistoricalActivities,
  getAllActivities: getAllActivities,
  getCurrentActivities: getCurrentActivities,
  exportCurrentUserData: exportCurrentUserData,
  insertNewActivity: insertNewActivity,
  updateCurrentActivities: updateCurrentActivities,
  insertNewUser: insertNewUser,
  updateActivity: updateActivity,
  //getAllUsers: getAllUsers,
  //getActivityNames: getActivityNames
};