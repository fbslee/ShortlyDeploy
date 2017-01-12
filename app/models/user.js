var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');

// userSchema.methods.comparePassword = function(attemptedPassword, hashedPassword) {
//   return new Promise(function(resolve, reject){
//     bcrypt.compare(attemptedPassword, hashedPassword, function(err, isMatch) {
//       if(err){
//         reject(err);
//       } else {
//         resolve(isMatch);
//       }
//     });
//   })
//  };


// var User = db.model('User', userSchema);


var userSchema = new mongoose.Schema({
      username: String,
      password: String
    });



userSchema.methods.comparePassword = function(attemptedPassword, hashedPassword) {
    return new Promise(function(resolve, reject){
      bcrypt.compare(attemptedPassword, hashedPassword, function(err, isMatch) {
        if(err){
          reject(err);
        } else {
          resolve(isMatch);
        }
      });
    })
   };

mongoose.model('User', userSchema);

var User = mongoose.model('User', userSchema);

// User.create({username: "Jesse", password: 1234}, function(err, user) {
//   console.log('err', err, 'link', user);
// });


console.log('inside user.js')
module.exports = userSchema



// module.exports = User;











// extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function() {
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   hashPassword: function() {
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });
