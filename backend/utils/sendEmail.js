import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = Number(process.env.SMTP_PORT) || 587;
  const smtpSecure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE.toLowerCase() === 'true'
    : smtpPort === 465;

  const smtpUser =
    process.env.SMTP_USER ||
    process.env.SMTP_EMAIL ||
    process.env.EMAIL_USER;
  const smtpPass =
    process.env.SMTP_PASS ||
    process.env.SMTP_PASSWORD ||
    process.env.EMAIL_PASSWORD;

  // If no email credentials are provided, log the email instead
  if (!smtpUser || !smtpPass) {
    console.log('='.repeat(50));
    console.log('EMAIL NOT SENT (No SMTP configuration)');
    console.log('To:', options.email);
    console.log('Subject:', options.subject);
    console.log('Message:', options.message);
    console.log('Reset URL:', options.resetUrl);
    console.log('='.repeat(50));
    return { success: false, message: 'Email service not configured' };
  }

  // Create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  // Define email options
  const message = {
    from: `${process.env.FROM_NAME || 'Recipe Generator'} <${smtpUser}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html || options.message.replace(/\n/g, '<br>'),
  };

  try {
    const info = await transporter.sendMail(message);
    console.log('Email sent: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email: ' + error.message);
  }
};

export default sendEmail;

