const User=require("../models/User");
const Profile=require("../models/Profile");

exports.updateProfile=async (req,res)=>{
    try {
        const email=req.body.email;
        const {gender,dateOfBirth,contactNumber}=req.body;

        const userExists=await Profile.find({email:email});

        if(!userExists){
            return res.status(400).json({
                success:false,
                message:"user does not exists",
            });
        }

        const updatedProfile = await Profile.findOneAndUpdate(
            { email },
            { gender, dateOfBirth, contactNumber },
            { new: true, runValidators: true } // Return the updated document
        );

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            updatedProfile,
        });



    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"internal servver error",
        });
    }
};