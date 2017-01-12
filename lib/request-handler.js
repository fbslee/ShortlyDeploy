var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Link = mongoose.model('Link');
require('../app/config.js');
// var User = require('../app/models/user');
// var Link = require('../app/models/link');
// var Users = require('../app/collections/users');
// var Links = require('../app/collections/links');

exports.renderIndex = function(req, res) {
  res.render('index');
};

exports.signupUserForm = function(req, res) {
  res.render('signup');
};

exports.loginUserForm = function(req, res) {
  res.render('login');
};

exports.logoutUser = function(req, res) {
  req.session.destroy(function() {
    res.redirect('/login');
  });
};

exports.fetchLinks = function(req, res) {
  Link
  .find().then(function(links) {
    res.status(200).send(links);
  });
};

exports.saveLink = function(req, res) {
  var uri = req.body.url;
  var title = req.body.title;
  if (!util.isValidUrl(uri)) {
    console.log('Not a valid url: ', uri);
    return res.sendStatus(404);
  }

  Link.find({ url: uri })
  .then(function(found) {
    if (found.length !== 0) {
      res.status(200).send(found);
    } else {
      util.getUrlTitle(uri, function(err, title) {
        if (err) {
          console.log('Error reading URL heading: ', err);
          return res.sendStatus(404);
        }
        util.codemaker(uri)
        .then(function(codeMade) {
            Link.create({
              url: uri,
              title: title,
              baseUrl: req.headers.origin,
              visits: 0,
              code: codeMade
            })
            .then(function(newLink) {
              console.log('new link ', newLink);
              res.status(200).send(newLink);
            });
          });

        })
    }
  });
};

exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

    User.findOne({username : username})
    .then(function(user) {
      if (!user) {
        res.redirect('/signup');
      } else {
        console.log('user in loginUser', user);
        user.comparePassword(password, user.password)
        .then(function(match) {
            if (match) {
              util.createSession(req, res, username);
            } else {
              res.redirect('/login');
            }
        });
      }
    });
};

exports.signupUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

    User
    .findOne({ username: username })
    .then(function(user) {

      if (!user) {
        util.hashPassword(password).then(function(hash){
        User.create({
          username: username,
          password: hash
        })
        .then(function(newUser) {
            util.createSession(req, res, newUser);
          });

        })
      } else {
        console.log('Account already exists');
        res.redirect('/signup');
      }
    });
};

exports.navToLink = function(req, res) {
   Link.findOne({code: req.params[0]})
    .then(function(link) {
    if (!link) {
      res.redirect('/');
    } else {
      Link.findOneAndUpdate({code: link.code}, { visits: link.visits + 1 }, function(){
            res.redirect(link.url);
      })
    }
  });
};
