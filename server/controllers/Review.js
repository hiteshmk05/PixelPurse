const mailSender = require("../utils/mailSender");
exports.Review= async (req,res)=>{
    try {
        const {firstName,lastName,email,review}=req.body;

        if(!firstName || !lastName || !email || !review){
            return res.status(400).json({
                success:false,
                message:"Please fill out the missing fields"
            });
        }
        const emailBody = `
            <div class="field">
                <span class="label">Name:</span> ${firstName} ${lastName}
            </div>
            <div class="field">
                <span class="label">Email:</span> ${email}
            </div>
            <div class="field">
                <span class="label">Review:</span>
                <p>${review}</p>
            </div>
        `;
        await mailSender(
            process.env.MAIL_USER, 
            'contact and review thingy Submission',
            emailBody,
            'contact'
        );
        return res.status(200).json({
            success:true,
            message:"review contact form submitted successfully",

        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success:false,
            message:"error in sending the message",
            error:error.message,
        });
    }
};