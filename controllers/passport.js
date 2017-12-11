// config/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var User = require('../db/models/').User;

// expose this function to our app using module.exports
module.exports = function (passport) {

  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    User.findById(id).then(user => {
      done(null, user);
    });
  });

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-signup', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function (req, username, password, done) {
      // asynchronous
      // User.findOne wont fire unless data is sent back

      process.nextTick(function () {

        console.log(username, password);
        if (username == '' || password == '') {
          return done(null, false, req.flash('danger', 'You can\'t leave username or password empty'));
        }

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.find({
          where: {username: username}
        }).then(user => {
          // if there are any errors, return the error
          // if (err)
          //     return done(err);

          // check to see if theres already a user with that email
          if (user) {
            return done(null, false, req.flash('danger','That email is already taken.'));
            // return done(null, false, {message: 'That email is already taken.'});
          } else {

            // if there is no user with that email
            // create the user
            User.create({username: username}).then(newUser => {
              newUser.password = newUser.generateHash(password);
              newUser.save({}).then(() => {
                return done(null, newUser, req.flash('success','Your account was created.'));
              });
            });

          }

        });

      });

    }));

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-login', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function (req, username, password, done) { // callback with email and password from our form
      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      console.log(username);
      if (username == '' || password == '') {
        return done(null, false, req.flash('danger', 'You have to enter a username and/or password'));
      } // req.flash is the way to set flashdata using connect-flash

      User.find({
        where: {username: username}
      }).then(user => {
        // if there are any errors, return the error before anything else
        // if no user is found, return the message
        if (!user) {
          return done(null, false, req.flash('danger', 'Oops, no user found.'));
        } // req.flash is the way to set flashdata using connect-flash

        // if the user is found but the password is wrong
        if (!user.validatePassword(password)) {
          return done(null, false, req.flash('danger', 'Oops! Wrong password or username.')); // create the loginMessage and save it to session as flashdata
        }
        // all is well, return successful user
        return done(null, user);
      });

    }));

};
