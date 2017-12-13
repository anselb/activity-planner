var express = require('express');
var app = express();
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
require('dotenv').config();

var models = require('./db/models');

// create .env file in root direct if not present, assign a value to SESSION_SECRET=SOMESTRING
app.use(cookieParser());                // read cookies (needed for auth)
app.use(bodyParser());                  // get information from html forms
app.use(methodOverride('_method'));
app.use(session({secret: process.env.SESSION_SECRET})); // session secret
app.use(passport.initialize());
app.use(passport.session());            // persistent login sessions
app.use(flash());
app.use(express.static('./public'));    // set directory for static files

app.set('views', './views');            // set express view template directory for express
app.set('view engine', 'jade');        // set express view engine to use jade


// SET FLASH MESSAGES
app.get('*', function (req, res, next) {
  res.locals.successes = req.flash('success');
  res.locals.dangers = req.flash('danger');
  res.locals.warnings = req.flash('warning');
  next();
});

app.get('/profile', function (req, res) {
  models.Tip.findAll({owner: req.user.username}).then((tips) => {
    res.render('profile', {currentUser: req.user, tips: tips});
  })
});

// ROUTES
require('./controllers/index')(app);                   // Route for search
require('./controllers/passport')(passport);           // required for passport
require('./controllers/auth')(app, passport);          //  Routes for authentication
require('./controllers/activities')(app);              // Routes for Tips
require('./controllers/itineraries')(app);             // Route for search


module.exports = app;
