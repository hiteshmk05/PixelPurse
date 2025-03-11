const mongoose= require("mongoose");

const categorySchema= mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    categoryName:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    date:{
        type:Date,
        required:true,
        default:Date.now
    },
    expenses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expense", 
    }],
});

module.exports=mongoose.model("Category",categorySchema);