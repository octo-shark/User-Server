
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('current_activities')
    .del()
    .then(() => knex('activities').del())
    .then(() => knex('users').del())
    .then(() => 
      // Inserts seed entries
       knex('users').insert([
        {googleID: 'Null1', username: 'user1'},
        {googleID: 'Null2', username: 'user2'},
        {googleID: 'Null3', username: 'user3'},
        {googleID: 'Null4', username: 'user4'},
        {googleID: 'Null5', username: 'user5'}
      ])
    )
    .then(() => 
      knex('activities').insert([
        {activity_name: 'Reading', color: '#b9f6ca'},
        {activity_name: 'Phone Calls', color: '#84ffff'},
        {activity_name: 'Browsing Reddit', color: '#b388ff'},
        {activity_name: 'Complaining', color: '#ff80ab'},
        {activity_name: 'Walking in Circles', color: '#ff9e80'},
        {activity_name: 'Debugging', color: '#ffff8d'},
        {activity_name: 'Napping', color: '#80d8ff'},
        {activity_name: 'Lunch', color: '#ea80fc'}
      ])
    )
    .then(async () => {
      const users = await knex.select().from('users');
      const firstActivity = await knex.select('activity_id').from('activities');
      const result = await users.map((user, i) => {
        return {current_activities_id: user.id, current_activities_array: Array(8).fill(firstActivity[0].activity_id,0,8)}
      })
      return knex('current_activities').insert([...result])
    })
};