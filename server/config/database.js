const mongoose = require("mongoose");
require("dotenv").config;

exports.connect = ()=>{
    mongoose.connect(process.env.MONGODB_URL,{

    })
    .then(()=> console.log("database connected successfully"))
    .catch((error)=>{
        console.log(error);
        console.log("couldn't connect to database");
        process.exit(1);
    });
};