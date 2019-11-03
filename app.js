const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const passport = require("./config/passport");
const flashHelper = require("./middlewares/flashHelper.js");

const db = require("./models");

const app = express();
const port = process.env.PORT || 3000;

//* set up view engine
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
//* set up bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
//* set up method override
app.use(methodOverride("_method"));
//* set up session and flash
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
//* set up passport
app.use(passport.initialize());
app.use(passport.session());
//* set up flash and flash-helper
app.use(flash(), flashHelper("success_messages", "error_messages"));

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use("/upload", express.static(`${__dirname}/upload`));

app.listen(port, () => {
  db.sequelize.sync();
  console.log(`Example app listening on port ${port}`);
});

require("./routes")(app, passport);
