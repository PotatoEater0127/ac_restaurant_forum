const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('./config/passport');
const db = require('./models');
const app = express();
const port = 3000;

//* set up view engine
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//* set up bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

//* set up session and flash
const SUCCESS_MSG = 'success_messages';
const ERROR_MSG = 'error_messages';
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(flash());
app.use((req, res, next) => {
  res.locals[SUCCESS_MSG] = req.flash(SUCCESS_MSG);
  res.locals[ERROR_MSG] = req.flash(ERROR_MSG);
  res.locals.user = req.user;
  next();
});
// falsh utilities
app.use((req, res, next) => {
  req.flashSuccess = message => req.flash(SUCCESS_MSG, message);
  req.flashError = message => req.flash(ERROR_MSG, message);
  next();
});
//*

//* set up passport
app.use(passport.initialize());
app.use(passport.session());

app.listen(port, () => {
  db.sequelize.sync();
  console.log(`Example app listening on port ${port}`);
});

require('./routes')(app, passport);
