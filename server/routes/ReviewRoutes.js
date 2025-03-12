const express=require("express");
const {Review}=require("../controllers/Review");
const router=express.Router();

router.post("/sendReview",Review);
module.exports=router;
