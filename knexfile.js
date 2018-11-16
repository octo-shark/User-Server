// Update with your config settings.
require('dotenv').config();
module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'timemate',
      user:     '',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/migrations'
    },
    seeds: {
      directory: './seeds'
  }
  },

  staging: {
    client: 'pg',
    connection: {
      database:  process.env.RDS_DB,
      host     : process.env.RDS_HOSTNAME,
      user     : process.env.RDS_USERNAME,
      password : process.env.RDS_PASSWORD,
      port     : process.env.RDS_PORT
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/migrations'
    },
    seeds: {
      directory: './seeds'
  }
  },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

};
