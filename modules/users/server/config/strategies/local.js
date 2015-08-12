'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  User = require('mongoose').model('User');

module.exports = function () {
  // Use local strategy
  passport.use(new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password'
    },
    function (username, password, done) {
      User.findOne({
        username: username.toLowerCase()
      }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user || !user.authenticate(password) || !user.isUserActivated()) {
          if (user && !user.isUserActivated()) {
            return done(null, false, {
              message: 'Username not activated yet. Please contact administrators to get your username activated.'
            });            
          } else {
            return done(null, false, {
              message: 'Invalid username or password'
            });
          }
        }

        return done(null, user);
      });
    }
  ));
};
