const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('./config/passport');
const db = require('./models');
const app = express();
const port = 3000;

// set up view engine
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// set up bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

// set up session and flash
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages');
  res.locals.error_messages = req.flash('error_messages');
  res.locals.user = req.user;
  next();
});

// set up passport
app.use(passport.initialize());
app.use(passport.session());

app.listen(port, () => {
  db.sequelize.sync();
  console.log(`Example app listening on port ${port}`);
});

require('./routes')(app, passport);
