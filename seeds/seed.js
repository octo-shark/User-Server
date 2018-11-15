
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
        {activity_name: 'send emails', color: 'blue'},
        {activity_name: 'phone calls', color: 'red'},
        {activity_name: 'do work', color: 'green'},
        {activity_name: 'break time', color: 'yellow'},
        {activity_name: 'coffee break', color: 'brown'},
        {activity_name: 'meetings', color: 'orange'},
        {activity_name: 'lunch', color: 'pink'},
        {activity_name: 'bathroom break', color: 'purple'},
        {activity_name: 'business reports', color: 'silver'},
        {activity_name: 'clean office', color: 'gold'}
      ])
    )
    .then(async () => {
      const users = await knex.select().from('users');
      const result = await users.map(user => {
        return {current_activities_id: user.id, current_activities_array: []}
      })
      console.log(users);
      return knex('current_activities').insert([...result])
    })
};
