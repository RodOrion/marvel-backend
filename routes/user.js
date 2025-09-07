const express = require("express");
const router = express.Router();
router.use(express.json());
const fileUpload = require("express-fileupload");
const { signup, login } = require("../controllers/user/user.js");

/** models **/
const User = require("../models/User");

/*** API ***/
router.post("/user/signup", fileUpload(), signup);

router.post("/user/login", login);

module.exports = router;
