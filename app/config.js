var mongoose = require('mongoose');

mongoose.connect('mongodb://123:123@ds145848.mlab.com:45848/noconlee');


var db = mongoose.connection;

db.on('connected', function() {
  console.log('connected to db');
});

db.on('error', console.error.bind(console, 'connection error:'));

// process.on('SIGINT', function() {
//   mongoose.connection.close(function () {
//     console.log('Mongoose disconnected on app termination');
//     process.exit(0);
//   });
// });

// process.on('SIGTERM', function() {
//   mongoose.connection.close(function () {
//     console.log('Mongoose disconnected on app termination');
//     process.exit(0);
//   });
// });

// process.on('SIGUSR2', function() {
//   mongoose.connection.close(function () {
//     console.log('Mongoose disconnected on app termination');
//     process.exit(0);
//   });
// });

require('./models/link.js');
require('./models/user.js');




// var knex = require('knex')({
//   client: 'sqlite3',
//   connection: {
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   },
//   useNullAsDefault: true
// });
// var db = require('bookshelf')(knex);

// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('baseUrl', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });


