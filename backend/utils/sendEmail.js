const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        // these 2 "host,port" are optional. Use if nodemailer not works in some case
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject : options.subject,
        text: options.message,
    };

    // await transporter.sendMail(mailOptions);
    console.log(mailOptions);
}

module.exports = sendEmail;