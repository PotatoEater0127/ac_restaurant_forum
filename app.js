const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const passport = require("./config/passport");
const flashHelper = require("./middlewares/flashHelper.js");
const hbsHelpers = require("./config/handlebars-helpers.js");

const app = express();
const port = process.env.PORT || 3000;

app.engine(
  "handlebars",
  handlebars({ defaultLayout: "main", helpers: hbsHelpers })
);
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: true }), bodyParser.json());
app.use(methodOverride("_method"));
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize(), passport.session());
app.use(flash(), flashHelper("success_messages", "error_messages"));
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use("/upload", express.static(`${__dirname}/upload`));

app.listen(port, () => {
  //* using migration instead
  // db.sequelize.sync();
  console.log(`Example app listening on port ${port}`);
});

require("./routes")(app);
