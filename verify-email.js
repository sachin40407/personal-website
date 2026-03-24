#!/usr/bin/env node
/**
 * Setup Verification Script
 * Run this to verify your email configuration is correct
 */

require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('\n╔════════════════════════════════════════════════════════╗');
console.log('║        Portfolio Email Configuration Checker            ║');
console.log('╚════════════════════════════════════════════════════════╝\n');

// Step 1: Check environment variables
console.log('📋 Step 1: Checking Environment Variables...\n');

if (!process.env.EMAIL_USER) {
  console.error('❌ ERROR: EMAIL_USER not set in .env file');
  process.exit(1);
}

if (!process.env.EMAIL_PASSWORD) {
  console.error('❌ ERROR: EMAIL_PASSWORD not set in .env file');
  process.exit(1);
}

if (!process.env.RECIPIENT_EMAIL) {
  console.error('❌ ERROR: RECIPIENT_EMAIL not set in .env file');
  process.exit(1);
}

console.log(`✅ EMAIL_USER: ${process.env.EMAIL_USER}`);
console.log(`✅ EMAIL_PASSWORD: ${'*'.repeat(process.env.EMAIL_PASSWORD.length)}`);
console.log(`✅ RECIPIENT_EMAIL: ${process.env.RECIPIENT_EMAIL}\n`);

// Step 2: Test Gmail connection
console.log('📧 Step 2: Testing Gmail Connection...\n');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email Configuration Error:\n', error.message);
    
    if (error.message.includes('Invalid login')) {
      console.error('\n⚠️  Likely Causes:');
      console.error('   1. Gmail 2-Factor Authentication (2FA) not enabled');
      console.error('   2. Using regular Gmail password instead of App Password');
      console.error('   3. App Password is incorrect\n');
      console.error('📌 Solution:');
      console.error('   1. Go to: https://myaccount.google.com/security');
      console.error('   2. Enable 2-Step Verification (2FA)');
      console.error('   3. Go back to Security and click "App passwords"');
      console.error('   4. Select "Mail" and "Windows Computer"');
      console.error('   5. Copy the 16-character password');
      console.error('   6. Update EMAIL_PASSWORD in .env\n');
    }
    
    process.exit(1);
  } else {
    console.log('✅ Gmail connection successful!\n');
    
    // Step 3: Send test email
    console.log('📬 Step 3: Sending Test Email...\n');
    
    const testEmail = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: 'Portfolio Contact Form - Test Email',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4CAF50;">✅ Email Configuration Test Successful!</h2>
          <p>If you received this email, your portfolio contact form is ready to use.</p>
          <hr>
          <p><strong>Test Details:</strong></p>
          <ul>
            <li>From: ${process.env.EMAIL_USER}</li>
            <li>To: ${process.env.RECIPIENT_EMAIL}</li>
            <li>Sent at: ${new Date().toLocaleString()}</li>
          </ul>
          <hr>
          <p style="color: #666; font-size: 12px;">This is an automated test email from your portfolio setup verification.</p>
        </div>
      `
    };
    
    transporter.sendMail(testEmail, (error, info) => {
      if (error) {
        console.error('❌ Failed to send test email:\n', error.message);
        process.exit(1);
      } else {
        console.log('✅ Test email sent successfully!\n');
        console.log('═══════════════════════════════════════════════════════');
        console.log('          ✅ ALL CHECKS PASSED - READY TO USE! ✅');
        console.log('═══════════════════════════════════════════════════════\n');
        console.log('Your portfolio contact form is properly configured.');
        console.log('Start the server with: npm start\n');
        process.exit(0);
      }
    });
  }
});
