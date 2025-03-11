const express=require("express");
const router=express.Router();

const {auth}=require("../middleware/auth");
const { getCategoryStats } = require("../controllers/Stats");

router.post("/getStats",auth,getCategoryStats);

module.exports=router;