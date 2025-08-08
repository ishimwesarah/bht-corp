import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { name, email, subject, message } = req.body;

  // Configure Nodemailer using your secure environment variables
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Or your preferred email provider
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD, // Use a Gmail App Password
    },
  });

  // Configure the email content
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: 'info.bhtcorporation@gmail.com', // Your organization's email
    replyTo: email, // This is key for easy replies
    subject: `New Contact Form Message: ${subject}`,
    html: `
      <h2>New Message from BHT Corporation Website</h2>
      <p>You have received a new message from your contact form.</p>
      <hr>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <h3>Message:</h3>
      <p style="background: #f4f4f4; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error sending email' });
  }
}