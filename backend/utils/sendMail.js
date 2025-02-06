const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  // Your Gmail ID
        pass: process.env.PASSWORD,  // MUST be an App Password (not your real password)
    },
});

const sendOtp = async (email, otp) => {
    const mailOptions = {
        from: `"OTP Service" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP Code is: ${otp}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP successfully sent to ${email}`);
    } catch (err) {
        console.error('Error sending OTP:', err);
        throw new Error('Failed to send OTP email');
    }
};

module.exports = { sendOtp };
