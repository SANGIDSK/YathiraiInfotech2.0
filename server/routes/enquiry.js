const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Enquiry = require('../models/Enquiry');

let transporter = null;
let usingTestAccount = false;

function buildAdminNotificationHtml({ name, email, phone, course, message }) {
  return `
    <div style="font-family: Arial, sans-serif; background: #f4f7fb; padding: 24px;">
      <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.08);">
        <div style="background: linear-gradient(135deg, #0f4c81, #1d6eb3); padding: 24px 32px; color: #ffffff; text-align: center;">
          <div style="font-size: 28px; font-weight: 700; letter-spacing: 1px;">YATHIRAI INFOTECH</div>
          <div style="margin-top: 8px; font-size: 14px; opacity: 0.9;">New enquiry received from the website</div>
        </div>
        <div style="padding: 28px 32px; color: #233142;">
          <h2 style="margin: 0 0 12px; font-size: 22px; color: #0f4c81;">New enquiry received</h2>
          <p style="margin: 0 0 16px; line-height: 1.6;">A new enquiry has been submitted through the website.</p>
          <ul style="margin: 0; padding-left: 18px; line-height: 1.8;">
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phone || 'N/A'}</li>
            <li><strong>Course:</strong> ${course || 'N/A'}</li>
          </ul>
          <div style="margin-top: 16px; padding: 14px 16px; background: #f8fbff; border-left: 4px solid #1d6eb3; border-radius: 6px;">
            <strong>Message:</strong><br />${message || 'N/A'}
          </div>
        </div>
      </div>
    </div>
  `;
}

function buildAutoReplyHtml({ name }) {
  return `
    <div style="font-family: Arial, sans-serif; background: #f4f7fb; padding: 24px;">
      <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.08);">
        <div style="background: linear-gradient(135deg, #0f4c81, #1d6eb3); padding: 24px 32px; color: #ffffff; text-align: center;">
          <div style="font-size: 28px; font-weight: 700; letter-spacing: 1px;">YATHIRAI INFOTECH</div>
          <div style="margin-top: 8px; font-size: 14px; opacity: 0.9;">Thank you for reaching out</div>
        </div>
        <div style="padding: 28px 32px; color: #233142; line-height: 1.7;">
          <h2 style="margin: 0 0 12px; font-size: 22px; color: #0f4c81;">Thanks for reaching out, ${name || 'there'}!</h2>
          <p style="margin: 0 0 12px;">We have received your enquiry and appreciate you taking the time to contact us.</p>
          <p style="margin: 0 0 12px;">Our team will review your message and get back to you shortly.</p>
          <p style="margin: 0;">Warm regards,<br />The Yathirai Infotech Team</p>
        </div>
      </div>
    </div>
  `;
}

async function getTransporter() {
  if (transporter) return transporter;

  if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_SECURE === 'true',
      requireTLS: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    return transporter;
  }

  const testAccount = await nodemailer.createTestAccount();
  transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
  usingTestAccount = true;
  console.log('Using Nodemailer Ethereal test SMTP account:', testAccount.user);
  return transporter;
}

// POST /api/enquiry — Submit a new enquiry
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message, course } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }

    const enquiry = new Enquiry({ name, email, phone, message, course });
    await enquiry.save();

    const emailTransporter = await getTransporter();
    const adminMailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER || 'no-reply@yathirai.in',
      to: process.env.ENQUIRY_TO || 'yathirai.in@gmail.com',
      replyTo: email,
      subject: `New enquiry from ${name}`,
      text: `New enquiry received:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nCourse: ${course || 'N/A'}\nMessage:\n${message || 'N/A'}`,
      html: buildAdminNotificationHtml({ name, email, phone, course, message }),
    };

    const autoReplyMailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER || 'no-reply@yathirai.in',
      to: email,
      replyTo: process.env.EMAIL_FROM || process.env.EMAIL_USER || 'no-reply@yathirai.in',
      subject: `Thanks for reaching out to Yathirai Infotech, ${name}`,
      text: `Hi ${name},\n\nThank you for reaching out to Yathirai Infotech. We have received your enquiry and will get back to you shortly.\n\nWarm regards,\nThe Yathirai Infotech Team`,
      html: buildAutoReplyHtml({ name }),
    };

    let adminEmailSent = false;
    let autoReplySent = false;
    let emailError = null;

    try {
      const info = await emailTransporter.sendMail(adminMailOptions);
      adminEmailSent = true;
      if (usingTestAccount) {
        console.log('Enquiry email preview URL:', nodemailer.getTestMessageUrl(info));
      }
    } catch (mailError) {
      emailError = mailError.message;
      console.error('Enquiry email error:', mailError);
    }

    try {
      await emailTransporter.sendMail(autoReplyMailOptions);
      autoReplySent = true;
    } catch (mailError) {
      console.error('Auto-reply email error:', mailError);
    }

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully!',
      emailSent: adminEmailSent && autoReplySent,
      adminEmailSent,
      autoReplySent,
      emailError,
      data: enquiry,
    });
  } catch (error) {
    console.error('Enquiry error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// GET /api/enquiry — Get all enquiries (admin use)
router.get('/', async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
