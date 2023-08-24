 require('dotenv').config({
  path: `./${process.env.NODE_ENV || 'development'}.env`,
});
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
//Configuring cookie-parser
app.use(cookieParser());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set("views", __dirname + "/views");
app.set('view engine', 'ejs');
app.use(expressLayouts);

/* GET home page. */
app.get("/", (req, res) => {
  res.render("../views/pages/login.ejs");
});
app.use(require('./routes/indexRoute'));

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("I am running..............",port);
});
module.exports = app;
