const options = require('../knexfile');
let env = 'development';
const knex = require('knex')(options[env]);

module.exports.getAllActivities = async () => {
  let result = await knex.select('*').from('activities');
  return result;
};

module.exports.getCurrentActivities = (id) => {
  return knex.select('current_activities_array')
  .from('current_activities')
  .where({
    'current_activities_id' : id
  });
}

module.exports.insertNewUser = (user) => {
  return knex('users').insert(user);
}