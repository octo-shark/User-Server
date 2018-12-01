
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('current_activities')
    .del()
    .then(() => knex('activities').del())
    .then(() => knex('users').del())
    .then(() => 
      // Inserts seed entries
       knex('users').insert([
        {googleID: 'Null1', username: 'mitch', current_activities: 1},
        {googleID: 'Null2', username: 'chris', current_activities: 2},
        {googleID: 'Null3', username: 'ethan', current_activities: 3},
        {googleID: 'Null4', username: 'rikki', current_activities: 4},
        {googleID: 'Null5', username: 'stephen', current_activities: 5}
      ])
    )

    /*
    '1': {color: '#b9f6ca', name: 'Reading'},
    '2': {color: '#84ffff', name: 'Phone Calls'},
    '3': {color: '#b388ff', name: 'Browsing Reddit'},
    '4': {color: '#ff80ab', name: 'Walking in Circles'},
    '26': {color: '#ff9e80', name: 'Complaining'},
    '33': {color: '#ffff8d', name: 'Debugging'},
    '66': {color: '#80d8ff', name: 'Lunch'},
    '76': {color: '#ea80fc', name: 'Napping'}
    */
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
      console.log(firstActivity)
      const result = await users.map((user, i) => {
        return {current_activities_id: user.id, current_activities_array: Array(8).fill(firstActivity[0].activity_id,0,8)}
      })
      return knex('current_activities').insert([...result])
    })
};