
exports.up = function(knex, Promise) {
  return knex.schema.createTable('activities', (table) => {
    table.increments('activity_id').primary();
    table.string('activity_name');
    table.string('color');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('activities');
};
