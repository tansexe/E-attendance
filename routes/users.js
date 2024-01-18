const express = require("express");
const userController = require("../controllers/users");
const router = express.Router();

router.get("/getAllUsers", userController.getAllUsers);

router.post("/Login", userController.login);

router.post("/Signup", userController.register);

module.exports = router;
