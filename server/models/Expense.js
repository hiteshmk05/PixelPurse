const mongoose=require("mongoose");

const expenseSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    expenseName:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true,
        default:Date.now
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category", 
        required: true,
    },
    status:{
        type:String,
        enum:["paid","unpaid"],
        required:true,
    },
});

module.exports=mongoose.model("Expense",expenseSchema);