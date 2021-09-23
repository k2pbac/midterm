// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require("morgan");
const cookieSession = require("cookie-session");
// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);

db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.set("json spaces", 2);
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/styles",
  sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: "expanded",
  })
);
app.use(express.static("public"));
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

app.use((req, res, next) => {
  res.locals.email = req.session.email;
  next();
});

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const voteRoutes = require("./routes/votes");
const newPollsRoutes = require("./routes/new_poll");
const pollsRoutes = require("./routes/polls");
const voteHelpers = require("./helpers/votehelpers")(db);
const userHelpers = require("./helpers/userHelpers")(db);
const pollHelpers = require("./helpers/pollHelpers");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/", usersRoutes(userHelpers));
app.use("/api/polls", newPollsRoutes(db));
app.use("/polls", voteRoutes(voteHelpers));
app.use("/polls", newPollsRoutes(db));
app.use("/api/polls", pollsRoutes(db));

// Note: mount other resources here, using the same pattern above

const pollResultsRouter = require("./routes/pollResultsRouter");

app.use("/api/users", usersRoutes(db));
// Note: mount other resources here, using the same pattern above
// app.use("/api/results", resultsRoutes(db)); For rendering the page
app.use("/results", pollResultsRouter(db));

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  pollHelpers
    .renderHomePagePolls(db)
    .then((polls) => {
      res.render("index", polls);
    })
    .catch((err) => err.message);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
