//Require the connection string for the db you will need(This example uses postgres)
var parse = require('pg-connection-string').parse;
//Parse the DB URL
var config = parse(process.env.DATABASE_URL);

// Update with your config settings.  2 Connections 1 for production and 1 for development
var options = {
    development: {
        client: 'pg',
        connection: {
            ssl: { "rejectUnauthorized": false },
            ...config
        },
        pool: { min: 0, max: 10 }
    },
    production: {
        client: 'pg',
        connection: {
            ssl: { "rejectUnauthorized": false },
            ...config
        },
        pool: { min: 0, max: 10 }
    },
};
//Pulls the Enviorment variable from the .env file, sets to development if it cant be found
var environment = process.env.NODE_ENV || 'development';
var config = options[environment];
module.exports = require('knex')(config);