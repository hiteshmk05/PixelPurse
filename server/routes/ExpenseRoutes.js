const express = require("express");
const router = express.Router();
const {auth} = require("../middleware/auth");
const {addExpense,getAllExpenses, getFilteredExpenses, editExpense,
    updateExpenseStatus} = require("../controllers/Expense");


router.post("/addExpense",auth,addExpense);
router.post("/getAllExpenses",auth,getAllExpenses);
router.post("/updateNamePrice",auth,editExpense);
router.post("/updateExpenseStatus",auth,updateExpenseStatus);

router.get("/getFilteredExpenses",auth,getFilteredExpenses);

module.exports = router;