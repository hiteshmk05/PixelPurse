// const nodemailer=require("nodemailer");

// const mailSender = async(email ,title , body) => {
//     console.log("Recipient Email: ", email);

//     try{
//         let transporter=nodemailer.createTransport({
//             host:process.env.MAIL_HOST, //read what is this
//             port:465,
//             secure:true,

//             auth:{
//                 user:process.env.MAIL_USER,
//                 pass:process.env.MAIL_PASS
//             }
//         });
//         let info = await transporter.sendMail({
//             from: "study notion" ,
//             to: `${email}` ,
//             subject: `${title}` ,
//             html: `${body}`
//         }); 
        
//         console.log(info);
//         return info;
//     }catch(error){
//         console.log(error.message);
//         console.log("mail could not be sent");

//     }
// };

// module.exports=mailSender;



// // T3ST_T3ST1NG

const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    console.log("Recipient Email: ", email);

    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST, // your SMTP host
            port: 465,
            secure: true, // Use SSL
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const htmlContent = `
            <html>
                <head>
                    <style>
                        /* Inline Styles for Email */
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #F4F4F9;
                            margin: 0;
                            padding: 0;
                            color: #333;
                        }
                        .email-container {
                            max-width: 600px;
                            margin: 20px auto;
                            background-color: #E6E0FF;
                            padding: 20px;
                            border-radius: 10px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        }
                        .email-header {
                            font-size: 24px;
                            font-weight: bold;
                            text-align: center;
                            color: #333;
                        }
                        .otp-code {
                            font-size: 32px;
                            font-weight: bold;
                            color: #A89EFF;
                            text-align: center;
                            margin: 20px 0;
                        }
                        .button {
                            display: block;
                            width: 200px;
                            margin: 20px auto;
                            padding: 10px;
                            background-color: #B8A4FF;
                            color: white;
                            text-align: center;
                            border-radius: 5px;
                            text-decoration: none;
                            font-size: 18px;
                        }
                        .footer {
                            text-align: center;
                            font-size: 14px;
                            color: #777;
                            margin-top: 30px;
                        }
                    </style>
                </head>
                <body>
                    <div class="email-container">
                        <div class="email-header">${title}</div>
                        <p>Hello,</p>
                        <p>We received a request to verify your email address. Please find your OTP below:</p>
                        <div class="otp-code">${body}</div>
                        <a href="#" class="button">Verify OTP</a>
                        <div class="footer">
                            <p>If you didn't request this, please ignore this email.</p>
                        </div>
                    </div>
                </body>
            </html>
        `;

        let info = await transporter.sendMail({
            from: "study notion",
            to: `${email}`,
            subject: `${title}`,
            html: htmlContent
        });

        console.log(info);
        return info;
    } catch (error) {
        console.log(error.message);
        console.log("Mail could not be sent");
    }
};

module.exports = mailSender;
