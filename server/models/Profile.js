const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    gender:{
        type:String
    },
    dateOfBirth:{
        type:String
    },
    contactNumber:{
        type:Number,
        trim:true
    }

});

module.exports=mongoose.model("Profile",profileSchema);

