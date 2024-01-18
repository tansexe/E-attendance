// importing files
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { users } = require("./roles/data.js");
const { authUser } = require("./roles/basicAuth.js");
require("dotenv").config();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
  } else {
    next();
  }
});
mongoose.connect(process.env.DATABASE_URL, {});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

// Creating user routes
const usersRouter = require("./routes/users.js");
app.use("/users", usersRouter);

app.use(setUser);

// Managing user roles
app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/dashboard", authUser, (req, res) => {
  res.send("Dashboard Page");
});

app.get("/admin", (req, res) => {
  res.send("Admin Page");
});

function setUser(req, res, next) {
  const userId = req.body.userId;
  if (userId) {
    req.user = users.find((user) => user.id === parseInt(userId));
  }
  next();
}

// Starting Server
app.listen(3000, () => console.log("Server Started"));
