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

const sendConfirmation = async (email,starttime,endtime,gameName) => {
      // Send Confirmation Email
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email, // Send email to the user
        subject: "Booking Confirmation",
        text: `Your slot for ${gameName} from ${starttime} to ${endtime} has been successfully booked! 🎉`,
      };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Mail successfully sent to ${email}`);
    } catch (err) {
        console.error('Error sending confirmation:', err);
        throw new Error('Failed to send confitmaitoon email');
    }
};

module.exports = { sendConfirmation };
