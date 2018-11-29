
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('current_activities')
    .del()
    .then(() => knex('activities').del())
    .then(() => knex('users').del())
    .then(() => 
      // Inserts seed entries
       knex('users').insert([
        {email: 'mitch@gmail.com', username: 'mitch', password: '12345'},
        {email: 'chris@gmail.com', username: 'chris', password: '12345'},
        {email: 'ethan@gmail.com', username: 'ethan', password: '12345'},
        {email: 'rikki@gmail.com', username: 'rikki', password: '12345'},
        {email: 'steven@gmail.com', username: 'steven', password: '12345'}
      ])
    )
    .then(() => 
      knex('activities').insert([
        {activity_name: 'Activity Not Set', color: '#'},
        {activity_name: 'send emails', color: 'blue', owner: knex.select('id').from('users').where({'username': 'mitch'})},
        {activity_name: 'phone calls', color: 'red', owner: knex.select('id').from('users').where({'username': 'mitch'})},
        {activity_name: 'do work', color: 'green', owner: knex.select('id').from('users').where({'username': 'mitch'})},
        {activity_name: 'break time', color: 'yellow', owner: knex.select('id').from('users').where({'username': 'mitch'})},
        {activity_name: 'coffee break', color: 'brown', owner: knex.select('id').from('users').where({'username': 'mitch'})},
        {activity_name: 'meetings', color: 'orange', owner: knex.select('id').from('users').where({'username': 'mitch'})},
        {activity_name: 'lunch', color: 'pink', owner: knex.select('id').from('users').where({'username': 'mitch'})},
        {activity_name: 'bathroom break', color: 'purple', owner: knex.select('id').from('users').where({'username': 'mitch'})},
        {activity_name: 'business reports', color: 'silver', owner: knex.select('id').from('users').where({'username': 'chris'})},
        {activity_name: 'Browsing Reddit', color: 'crimson', owner: knex.select('id').from('users').where({'username': 'steven'})},
        {activity_name: 'Complaining', color: '#', owner: knex.select('id').from('users').where({'username': 'ethan'})},
        {activity_name: 'Walking in Circles', color: '#', owner: knex.select('id').from('users').where({'username': 'ethan'})},
        {activity_name: 'Debugging', color: '$', owner: knex.select('id').from('users').where({'username': 'rikki'})},
        {activity_name: 'napping', color: '#', owner: knex.select('id').from('users').where({'username': 'rikki'})},
        {activity_name: 'clean office', color: 'gold', owner: knex.select('id').from('users').where({'username': 'chris'})}
      ])
    )
    .then(async () => {
      const users = await knex.select().from('users');
      const firstActivity = await knex.select('activity_id').from('activities').where({'activity_name': 'Activity Not Set'});
      const result = await users.map(user => {
        return {current_activities_id: user.id, current_activities_array: Array(8).fill(firstActivity[0].activity_id,0,8)}
      })
      // console.log(users);
      return knex('current_activities').insert([...result])
    })
};