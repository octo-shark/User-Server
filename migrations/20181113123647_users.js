
exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('googleID').unique();
      table.string('username');
      table.integer('current_activities_id');
    })
    .createTable('current_activities', (table) => {
      table.integer('current_activities_id');
      table.specificType('current_activities_array', 'integer ARRAY [8]');
    })
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('current_activities')
  ])
};