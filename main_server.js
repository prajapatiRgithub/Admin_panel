
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookie = require('cookie-parser');
const path = require('path');
const hbs = require('hbs');
const ejs =  require('ejs');
// Set hbs as templating engine

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views/partials'));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookie());
app.use('/', require('./routes/route'));
app.use(express.static('public/upload'));
app.use('/', require('./routes/contact'));
app.use('/',require('./routes/category'));
app.use('/',require('./routes//portfolio'));


const port = process.env.PORT || 4002;
app.listen(port,() => console.log(`Listening on port ${port}...`));
































// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// // New stuff to add
// //---------------------------------------------------
// const hbs = require('hbs');
// const MongoClient = require('mongodb').MongoClient;
// const passport = require('passport');
// const Strategy = require('passport-local').Strategy;
// const authUtils = require('./utils/auth');
// const session = require('express-session');
// const flash = require('connect-flash');
// // --------------------------------------------------

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var apiRouter = require('./routes/api');

// // Add new routes
// // --------------------------------------------------
// const authRouter = require('./routes/auth');
// // --------------------------------------------------

// var app = express();



// // Configure passport
// // --------------------------------------------------
// passport.use(new Strategy(
//   (username, password, done) => {
//     app.locals.users.findOne({ username }, (err, user) => {
//       if (err) {
//         return done(err);
//       }

//       if (!user) {
//         return done(null, false);
//       }

//       if (user.password != authUtils.hashPassword(password)) {
//         return done(null, false);
//       }

//       return done(null, user);
//     });
//   }
// ));

// passport.serializeUser((user, done) => {
//   done(null, user._id);
// });

// passport.deserializeUser((id, done) => {
//   done(null, { id });
// });
// // --------------------------------------------------


// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

// // Set partials for handlebars
// // --------------------------------------------------
// hbs.registerPartials(path.join(__dirname, 'views/partials'));
// // --------------------------------------------------

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


// // Configure session, passport, flash
// // --------------------------------------------------
// app.use(session({
//   secret: 'session secret',
//   resave: false,
//   saveUninitialized: false,
// }));

// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());

// app.use((req, res, next) => {
//   res.locals.loggedIn = req.isAuthenticated();
//   next();
// });
// // --------------------------------------------------

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/api', apiRouter);

// // Add new routes
// // --------------------------------------------------
// app.use('/auth', authRouter);
// // --------------------------------------------------

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// const port = process.env.PORT || 4002;
// app.listen(port, () => {
//     console.log(`server is Running at port no ${port}`);
// });

