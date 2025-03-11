const express = require("express");
const router = express.Router();
const {auth} = require("../middleware/auth");
const {signup,sendOTP,login,getUserData} = require("../controllers/Auth"); 

router.post("/signup", signup);

router.post("/sendOTP", sendOTP);  

router.post("/login", login);

router.get("/verify", auth, getUserData);

module.exports = router;

