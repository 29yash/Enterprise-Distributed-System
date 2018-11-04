var express = require('express');
var App = express();
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var passport = require('passport');
var SignupRouter = require('./routes/signup');
var LoginRouter = require('./routes/login');
var LogoutRouter = require('./routes/logout');
var UserProfileRouter = require('./routes/userProfile');
var BookingRouter = require('./routes/booking');
var SearchPropertyRouter = require('./routes/searchProperty');
var PostPropertyRouter = require('./routes/postProperty');
var BookingHistoryRouter = require('./routes/bookingHistory');

// Set up middleware
var authHook = passport.authenticate('jwt', {session: true});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

//use cors to allow cross origin resource sharing
App.use(cors({ origin: 'http://localhost:3000', credentials: true }));
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: true })); 
App.use(cookieParser());

//use express session to maintain session data
App.use(expressSession({
    secret              : 'cmpe273_homeaway',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

//Allow Access Control
App.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

App.use(passport.initialize());

// Bring in defined Passport Strategy
require('./auth/passport')(passport);

App.use("/photos", express.static(__dirname + '/photos'));

App.use("/", LoginRouter);
App.use("/", SignupRouter);


App.use("/", authHook, LogoutRouter);
App.use("/", authHook, UserProfileRouter);
App.use("/", authHook, PostPropertyRouter);
App.use("/", authHook, BookingRouter);
App.use("/", authHook, SearchPropertyRouter);
App.use("/", authHook, BookingHistoryRouter);

var server = App.listen(8080, function () {
  console.log("Server started on port 8080");
});