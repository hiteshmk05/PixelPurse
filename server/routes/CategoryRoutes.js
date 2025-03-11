const express = require("express");
const router = express.Router();
const {auth} = require("../middleware/auth");
const {addCategory, getAllCategories}=require("../controllers/Category");

router.post("/addCategory", auth, addCategory);
router.post("/getAllCategories",auth,getAllCategories);

module.exports = router;