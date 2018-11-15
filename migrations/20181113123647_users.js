
exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('email').unique();
      table.string('username');
      table.string('password');
    })
    .createTable('current_activities', (table) => {
      table.integer('current_activities_id');
      table.specificType('current_activities_array', 'integer ARRAY [8]');
      table.foreign('current_activities_id').references('id').inTable('users');
    })
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('current_activities')
  ])
};