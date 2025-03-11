const jwt=require("jsonwebtoken");
const User=require("../models/User");
require("dotenv"). config();

exports.auth= async function (req,res,next){
    console.log("here");
    try {

        const token =req.headers.authorization?.split(" ")[1] || req.cookies.token || req.body.token;

        if(!token){
            return res.status(401).json({
                success:false,
                message:"token is missing"
            });
        }

        try {
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            // if(decode.exp*1000 < Date.now()){
            //     return res.status(401).json({
            //         success:false,
            //         message:"token is expired",
            //     })
            // }
            req.user=decode;
            req.user.token=token;
        } catch (error) {
            return res.status(401).json({
                success:false,
                message:"token is invalid"
            });
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success:false,
            message:"error in authorization in token"
        });   
    }
}

