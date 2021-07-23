const express = require("express");
const app = express();
const http = require("http");
const server = http.Server(app);
const sequelize = require("./config/db");
const passport = require("passport");

const PORT = process.env.PORT || 3000;

const User = require("./models/User");
const Todo = require("./models/Todo");

//middleware
app.use(
  require("express-session")({
    secret: process.env.COOKIE_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const cors = require("cors");
app.use(cors());

//routes
const userApiRouter = require("./routes/api/user");
app.use("/api/user", userApiRouter);

const todoApiRouter = require("./routes/api/todo");
app.use("/api/todo", todoApiRouter);

async function start() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await User.sync({ force: true });
    await Todo.sync({ force: true });

    server.listen(PORT, () => {
      console.log(`=== The server is running on PORT ${PORT} ===`);
    });
  } catch (err) {
    console.log(err);
  }
}

start();
