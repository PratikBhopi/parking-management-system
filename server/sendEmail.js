const nodemailer = require('nodemailer');
const emailValidator = require('email-validator');
require('dotenv').config()

// Function to send an email
async function sendEmail(recipientEmail,slotNo, vehicleNo,fromTime,toTime) {
  // Validate the email
  if (!emailValidator.validate(recipientEmail)) {
    throw new Error('Invalid email address');
  }

  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services
    auth: {
      user: process.env.EMAIL, // Your email
      pass: process.env.EMAIL_KEY,  // Your email password (consider using environment variables for security)
    },
  });

  // Set up email data
  let mailOptions = {
    from: '"Parking-Mangement-System" process.env.EMAIL ', // Sender address
    to: recipientEmail, // List of receivers
    subject: 'Slot Booked!', // Subject line
    text: `Your slot at ${slotNo} has been booked! Your Vehicle No. is ${vehicleNo}`, // Plain text body
    html: `<h3>Your slot at ${slotNo} has beeen booked.Park your vehicle from ${fromTime} to ${toTime} Your Vehicle No. is ${vehicleNo}</h3> <br>
    <b>Thank you</b>`, // HTML body
  };

  // Send email
  let info = await transporter.sendMail(mailOptions);
  console.log('Message sent: %s', info.messageId);
}

// Export the sendEmail function
module.exports = sendEmail
