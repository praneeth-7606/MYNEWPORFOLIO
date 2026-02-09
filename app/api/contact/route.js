import axios from 'axios';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create and configure Nodemailer transporter with environment-based configuration
const createTransporter = () => {
  const config = {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD || process.env.GMAIL_PASSKEY, // Support both variable names
    },
  };

  // Add service if specified (optional, for common providers)
  if (process.env.EMAIL_SERVICE) {
    config.service = process.env.EMAIL_SERVICE;
  }

  return nodemailer.createTransport(config);
};

const transporter = createTransporter();

// Helper function to send a message via Telegram
async function sendTelegramMessage(token, chat_id, message) {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  try {
    const res = await axios.post(url, {
      text: message,
      chat_id,
    });
    return res.data.ok;
  } catch (error) {
    console.error('Error sending Telegram message:', error.response?.data || error.message);
    return false;
  }
};

// HTML email template with enhanced styling
const generateEmailTemplate = (name, email, phone, projectType, userMessage) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">New Contact Form Submission</h1>
        <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 14px;">From your portfolio website</p>
      </div>
      
      <!-- Content -->
      <div style="padding: 30px;">
        <div style="background-color: #f8fafc; border-left: 4px solid #667eea; padding: 20px; margin-bottom: 20px; border-radius: 4px;">
          <h2 style="color: #1e293b; margin: 0 0 15px 0; font-size: 20px;">Contact Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600; width: 120px;">Name:</td>
              <td style="padding: 8px 0; color: #1e293b;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Phone:</td>
              <td style="padding: 8px 0; color: #1e293b;">${phone}</td>
            </tr>
            ` : ''}
            ${projectType && projectType.length > 0 ? `
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600; vertical-align: top;">Project Type:</td>
              <td style="padding: 8px 0; color: #1e293b;">${projectType.join(', ')}</td>
            </tr>
            ` : ''}
          </table>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px;">Message</h3>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <p style="color: #334155; line-height: 1.6; margin: 0; white-space: pre-wrap;">${userMessage}</p>
          </div>
        </div>
        
        <!-- Action Button -->
        <div style="text-align: center; margin-top: 30px;">
          <a href="mailto:${email}?subject=Re: Portfolio Contact" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">Reply to ${name}</a>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="color: #64748b; margin: 0; font-size: 12px;">This email was sent from your portfolio contact form</p>
        <p style="color: #94a3b8; margin: 5px 0 0 0; font-size: 11px;">Timestamp: ${new Date().toLocaleString()}</p>
      </div>
    </div>
  </body>
  </html>
`;

// Helper function to send an email via Nodemailer
async function sendEmail(payload, message) {
  const { name, email, phone, projectType, message: userMessage } = payload;
  
  const fromAddress = process.env.EMAIL_FROM || process.env.EMAIL_ADDRESS;
  const fromName = process.env.EMAIL_FROM_NAME || 'Portfolio Contact Form';
  const toAddress = process.env.EMAIL_TO || process.env.EMAIL_ADDRESS;
  
  const mailOptions = {
    from: `"${fromName}" <${fromAddress}>`, 
    to: toAddress, 
    subject: `🔔 New Portfolio Message from ${name}`, 
    text: message, 
    html: generateEmailTemplate(name, email, phone, projectType, userMessage), 
    replyTo: email, 
  };
  
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error while sending email:', error);
    return false;
  }
};

export async function POST(request) {
  try {
    const payload = await request.json();
    const { name, email, phone, projectType, message: userMessage } = payload;

    // Validate required fields
    if (!name || !email || !userMessage) {
      return NextResponse.json({
        success: false,
        message: 'Name, email, and message are required.',
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({
        success: false,
        message: 'Invalid email format.',
      }, { status: 400 });
    }

    // Check if email is configured
    if (!process.env.EMAIL_ADDRESS || !process.env.EMAIL_PASSWORD) {
      console.error('Email configuration missing');
      return NextResponse.json({
        success: false,
        message: 'Email service is not configured.',
      }, { status: 500 });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chat_id = process.env.TELEGRAM_CHAT_ID;

    // Build message for Telegram
    const telegramMessage = `🔔 New Portfolio Contact\n\n` +
      `👤 Name: ${name}\n` +
      `📧 Email: ${email}\n` +
      `${phone ? `📱 Phone: ${phone}\n` : ''}` +
      `${projectType && projectType.length > 0 ? `💼 Project: ${projectType.join(', ')}\n` : ''}` +
      `\n💬 Message:\n${userMessage}\n\n` +
      `⏰ ${new Date().toLocaleString()}`;

    // Send email (primary notification)
    const emailSuccess = await sendEmail(payload, telegramMessage);

    // Send Telegram message (optional secondary notification)
    let telegramSuccess = true; // Default to true if not configured
    if (token && chat_id) {
      telegramSuccess = await sendTelegramMessage(token, chat_id, telegramMessage);
    }

    // Consider it successful if email is sent (Telegram is optional)
    if (emailSuccess) {
      return NextResponse.json({
        success: true,
        message: 'Message sent successfully!',
      }, { status: 200 });
    }

    return NextResponse.json({
      success: false,
      message: 'Failed to send message. Please try again later.',
    }, { status: 500 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error occurred. Please try again later.',
    }, { status: 500 });
  }
};