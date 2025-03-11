const express=require("express");
const { auth } = require("../middleware/auth");
const { updateProfile } = require("../controllers/Profile");
const router=express.Router();

router.post("/updateProfile",auth,updateProfile);

module.exports=router;