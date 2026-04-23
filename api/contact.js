/**
 * Vercel Serverless Function - Contact Form Handler
 * Replaces the legacy mail.php functionality
 * 
 * To enable actual email delivery, integrate with a transactional email service:
 * - Resend: https://resend.com (recommended - free tier available)
 * - SendGrid: https://sendgrid.com
 * - Mailgun: https://mailgun.com
 * 
 * Set your API key as an environment variable in the Vercel dashboard.
 */

const querystring = require('querystring');

module.exports = async (req, res) => {
  // Set response headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only accept POST requests (matching original mail.php behavior)
  if (req.method !== 'POST') {
    return res.status(403).send('There was a problem with your submission, please try again.');
  }

  // Parse application/x-www-form-urlencoded body
  const chunks = [];
  try {
    for await (const chunk of req) {
      chunks.push(chunk);
    }
  } catch (err) {
    console.error('Error reading request body:', err);
    return res.status(500).send("Oops! Something went wrong and we couldn't send your message.");
  }

  const body = Buffer.concat(chunks).toString();
  const data = querystring.parse(body);

  // Extract and sanitize form fields (matching original PHP logic)
  const name = data.name ? data.name.toString().replace(/\r|\n/g, ' ').trim() : '';
  const email = data.email ? data.email.toString().trim() : '';
  const subjectField = data.subject ? data.subject.toString().trim() : '';
  const number = data.number ? data.number.toString().trim() : '';
  const message = data.message ? data.message.toString().trim() : '';

  // Validation (matching original PHP validation)
  if (!name || !message || !number || !subjectField || !email || !email.includes('@')) {
    return res.status(400).send('Please complete the form and try again.');
  }

  // Log submission to Vercel function logs (visible in dashboard)
  console.log('Contact form submission received:', {
    timestamp: new Date().toISOString(),
    name,
    email,
    subject: subjectField,
    number,
    messagePreview: message.substring(0, 200) + (message.length > 200 ? '...' : '')
  });

  // ===============================
  // EMAIL INTEGRATION (Optional)
  // ===============================
  // Uncomment and configure one of the following to enable email delivery:
  //
  // --- Using Resend (Recommended) ---
  // const { Resend } = require('resend');
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // try {
  //   await resend.emails.send({
  //     from: 'AM DECOR <onboarding@resend.dev>',
  //     to: 'your-email@example.com',
  //     subject: `New contact from ${subjectField}`,
  //     text: `Name: ${name}\nSubject: ${subjectField}\nEmail: ${email}\nPhone: ${number}\n\nMessage:\n${message}`,
  //   });
  // } catch (err) {
  //   console.error('Email send failed:', err);
  //   return res.status(500).send("Oops! Something went wrong and we couldn't send your message.");
  // }
  //
  // --- Using SendGrid ---
  // const sgMail = require('@sendgrid/mail');
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  // try {
  //   await sgMail.send({
  //     to: 'your-email@example.com',
  //     from: 'noreply@yourdomain.com',
  //     subject: `New contact from ${subjectField}`,
  //     text: `Name: ${name}\nSubject: ${subjectField}\nEmail: ${email}\nPhone: ${number}\n\nMessage:\n${message}`,
  //   });
  // } catch (err) {
  //   console.error('Email send failed:', err);
  //   return res.status(500).send("Oops! Something went wrong and we couldn't send your message.");
  // }
  //
  // --- Using Nodemailer with SMTP ---
  // const nodemailer = require('nodemailer');
  // const transporter = nodemailer.createTransport({
  //   host: process.env.SMTP_HOST,
  //   port: parseInt(process.env.SMTP_PORT || '587'),
  //   auth: {
  //     user: process.env.SMTP_USER,
  //     pass: process.env.SMTP_PASS,
  //   },
  // });
  // try {
  //   await transporter.sendMail({
  //     from: `"AM DECOR" <${process.env.SMTP_USER}>`,
  //     to: 'your-email@example.com',
  //     subject: `New contact from ${subjectField}`,
  //     text: `Name: ${name}\nSubject: ${subjectField}\nEmail: ${email}\nPhone: ${number}\n\nMessage:\n${message}`,
  //   });
  // } catch (err) {
  //   console.error('Email send failed:', err);
  //   return res.status(500).send("Oops! Something went wrong and we couldn't send your message.");
  // }

  // Return success response (matching original PHP response)
  return res.status(200).send('Thank You! Your message has been sent.');
};
