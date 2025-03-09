const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587, // Port as a number
    // secure: false, // Use TLS (STARTTLS)
    auth: {
      user: process.env.SMTP_USER, // Your Brevo SMTP login
      pass: process.env.SMTP_PASSWORD, // Your Brevo SMTP password
    },
  });
  

// const sendConfirmation = async (email,starttime,endtime,gameName) => {
//       // Send Confirmation Email
//       const mailOptions = {
//         from: process.env.SENDER_EMAIL,
//         to: email, // Send email to the user
//         subject: "Booking Confirmation",
//         text: `Your slot for ${gameName} from ${starttime} to ${endtime} has been successfully booked! 🎉`,
//       };

//     try {
//         await transporter.sendMail(mailOptions);
//         console.log(`Mail successfully sent to ${email}`);
//     } catch (err) {
//         console.error('Error sending confirmation:', err);
//         throw new Error('Failed to send confitmaitoon email');
//     }
// };

module.exports = {transporter};
