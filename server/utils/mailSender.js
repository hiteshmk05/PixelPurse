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

const mailSender = async (email, title, body,template='default') => {
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

        const templates = {
            default: `
                <html>
                    <head>
                        <style>
                            /* ... existing OTP styles ... */
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
            `,
            contact: `
                <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                line-height: 1.6;
                                color: #333;
                            }
                            .container {
                                max-width: 600px;
                                margin: 20px auto;
                                padding: 20px;
                                background-color: #f8f9fa;
                                border-radius: 8px;
                            }
                            .header {
                                font-size: 24px;
                                color: #4a5568;
                                margin-bottom: 20px;
                                text-align: center;
                            }
                            .content {
                                background-color: white;
                                padding: 20px;
                                border-radius: 4px;
                            }
                            .field {
                                margin-bottom: 15px;
                            }
                            .label {
                                font-weight: bold;
                                color: #4a5568;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">${title}</div>
                            <div class="content">
                                ${body}
                            </div>
                        </div>
                    </body>
                </html>
            `
        };

        let info = await transporter.sendMail({
            from: "PixelPurse",
            to: `${email}`,
            subject: `${title}`,
            html: templates[template]
        });

        console.log(info);
        return info;
    } catch (error) {
        console.log(error.message);
        console.log("Mail could not be sent");
    }
};

module.exports = mailSender;
