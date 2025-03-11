const User = require("../models/User");
const Profile=require("../models/Profile");
const Category = require("../models/Category");
const OTP=require("../models/OTP");
const bcrypt=require("bcrypt");
const otpGenerator = require('otp-generator');
const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.sendOTP = async (req , res) => {
    try {
        const {email,firstName,lastName,password,confirmPassword}=req.body;

        //checking if user already exists
        if(!firstName || !lastName || !email || !password || !confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Please fill out the missing fields"
            });
        }
        if(confirmPassword!==password){
            return res.status(400).json({
                success:false,
                message:"Password and Confirm Password are not same"
            });
        }
        const checkUserPresent=await User.findOne({email: email}); 
    
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"user already exists"
            })
        }

        // generate otp

        let otp =otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        });
        
        //making sure that the otp is unique if a otp already exists then keep generating new otp 
        //very bad code a lot of database calls
        const result=await OTP.findOne({otp:otp});

        while(result){
            otp =otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            });
            result=await OTP.findOne({otp:otp});
        }

        const otpPayload={email,otp:String(otp)};

        const otpBody=await OTP.create(otpPayload); 

        return res.status(200).json({
            success:true,
            message:"otp sent successfully"
        });

        
    } catch (error) {
        console.log(error);
        console.log("otp couldnot be generated");
        return res.status(500).json({
            success:false,
            message:"otp could not be generated"
        })
    }
};

exports.signup= async (req,res) => {
    try {
        const {firstName,lastName,email,password,confirmPassword,otp}=req.body;
        
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(400).json({
                success:false,
                message:"Please fill out the missing fields"
            });
        }

        if(confirmPassword!==password){
            return res.status(400).json({
                success:false,
                message:"Password and Confirm Password are not same"
            });
        }
        
        const userExists = await User.findOne({email:email});
        
        if(userExists){
            return res.status(400).json({
                success:false,
                message:"user already exists"
            });
        }

        const recentOtp=await OTP.find({email}).sort({createdAt:-1}).limit(1);

        if(recentOtp.length===0){
            console.log("bad request");
            return res.status(400).json({
                success:false,
                message:"otp not found"
            });
        }
        if(recentOtp[0].otp!==otp){
            console.log("bad request");
            return res.status(400).json({
                success:false,
                message:"otp does not match",
            });
        }

        const hashedPwd=await bcrypt.hash(password,10);

        const profileDetails= await Profile.create({
            email:email,
            gender:null,
            dateOfBirth:null,
            // about:null
            contactNumber:null
        });

        const defaultCategories= [
            { categoryName: "Groceries", description: "Expenses on groceries", email:email ,expenses:[]},
            { categoryName: "Bills", description: "Monthly bills and utilities", email:email,expenses: [] },
            { categoryName: "Travel", description: "Travel-related expenses", email:email,expenses:[] },
            { categoryName: "Misc", description: "Miscellaneous expenses", email:email,expenses:[]},
        ];

        const createdCategories = [];

        for (const category of defaultCategories) {
            const createdCategory = await Category.create(category);
            createdCategories.push(createdCategory);
        }

        const categoryIds = createdCategories.map((category) => category._id);

        const user=await User.create({
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:hashedPwd,
            additionalDetails:profileDetails._id,
            categories:categoryIds,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`
        });

        return res.status(200).json({
            success:true,
            message:"user created successfully mojj"
        });

    } catch (error) {
        console.log(error);
        return res.status(404).json({
            success:false,
            message:"user could not be created - internal server error"
        });
    }
};

exports.login = async (req , res) => {
    try {
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"please fill the highlighted fields"
            });
        }

        const userExists=await User.findOne({email:email}).populate("additionalDetails").populate("categories");

        if(!userExists){
            return res.status(400).json({
                success:false,
                message:"user does not exist sign up first"
            });
        }

        if(await bcrypt.compare(password,userExists.password)){
            const payload={
                email:userExists.email,
                id:userExists._id,
            }
            const token =jwt.sign(payload,process.env.JWT_SECRET , {expiresIn:"3h"});

            userExists.token=token;
            userExists.password=undefined;

            const options = {
                expires: new Date(Date.now() +2*60*60*1000),
                httpOnly:true
            };

            res.cookie("token",token,options).status(200).json({
                success:true,
                token:token,
                userExists,
                message:"logged in successfully"
            });
        }else{
            return res.status(400).json({
                success:false,
                message:"password does not match"
            });
        }


    } catch (error) {
        return res.status(404).json({
            success:false,
            message:"server refused"
        });
    }
};

exports.getUserData=async (req,res) => {
    try {
        const userId=req.user.id;
        const userExists=await User.findById(userId).populate("additionalDetails").populate("categories");

        if(!userExists){
            return res.status(404).json({
                success: false,
                message: "not found user get rekt"
            });
        }

        userExists.password=undefined;
        return res.status(200).json({
            success:true,
            message:"user logged in using token",
            token:req.user.token,
            user:userExists
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"internal server error"
        });
    }
};  
