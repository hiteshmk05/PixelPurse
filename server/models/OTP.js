const mongoose= require("mongoose");
const mailSender = require("../utils/mailSender");

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60
    }
});
//check what is this what why it was made this way 
// read for post pre in mongoose
async function sendVerificationEmail(email,otp){
    try{
        const mailResponse = await mailSender(email,"verification email",otp);
    }catch(error){
        console.log(error.message);
        console.log("error occured while sending mail");
        throw error;
    }
} 

otpSchema.pre("save", async function (next){
    await sendVerificationEmail(this.email,this.otp);
    next();
});

module.exports=mongoose.model("OTP",otpSchema);