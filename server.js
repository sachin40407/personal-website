const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Check if environment variables are set
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
  console.error('ERROR: EMAIL_USER or EMAIL_PASSWORD not set in .env file');
  console.error('Please configure your .env file with valid Gmail credentials');
}

// Configure Nodemailer transporter with better error handling
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

// Verify transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email configuration error:', error.message);
    console.error('Make sure you have:');
    console.error('1. Set EMAIL_USER and EMAIL_PASSWORD in .env');
    console.error('2. Enabled 2-Factor Authentication on your Gmail');
    console.error('3. Generated an App Password (not your regular password)');
  } else {
    console.log('✅ Email service ready - Messages can be sent');
  }
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required' 
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide a valid email address' 
    });
  }

  try {
    // Email to you (portfolio owner)
    const ownerMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `
    };

    // Confirmation email to visitor
    const visitorMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'We received your message',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${escapeHtml(name)},</p>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p><strong>Your message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
        <hr>
        <p>Best regards,<br>Sachin</p>
      `
    };

    // Send emails
    await transporter.sendMail(ownerMailOptions);
    await transporter.sendMail(visitorMailOptions);

    res.json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });

  } catch (error) {
    console.error('❌ Email sending error:', error.message);
    console.error('Error details:', error);
    
    // Provide helpful error message
    let userMessage = 'Failed to send message. Please try again later.';
    
    if (error.message.includes('Invalid login') || error.message.includes('Bad credentials')) {
      userMessage = 'Email service configuration error. Please contact the site owner.';
      console.error('⚠️ Check your EMAIL_USER and EMAIL_PASSWORD in .env file');
    } else if (error.message.includes('ECONNREFUSED')) {
      userMessage = 'Server connection error. Please check your internet and try again.';
    } else if (error.message.includes('timeout')) {
      userMessage = 'Request timeout. Please try again.';
    }
    
    res.status(500).json({ 
      success: false, 
      message: userMessage 
    });
  }
});

// Helper function to escape HTML
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'An error occurred. Please try again.' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log('\n╔════════════════════════════════════════════════════════╗');
  console.log('║                  Portfolio Server Started               ║');
  console.log('╚════════════════════════════════════════════════════════╝');
  console.log(`\n✅ Server running at http://localhost:${PORT}`);
  console.log('\n📧 Email Configuration:');
  
  if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
    console.log(`   EMAIL_USER: ${process.env.EMAIL_USER}`);
    console.log(`   RECIPIENT_EMAIL: ${process.env.RECIPIENT_EMAIL}`);
    console.log('   Status: ✅ Configured');
  } else {
    console.error('   Status: ❌ NOT CONFIGURED');
    console.error('   Please set EMAIL_USER and EMAIL_PASSWORD in .env file');
  }
  
  console.log('\n📝 Testing the contact form:');
  console.log('   Open http://localhost:${PORT} in your browser');
  console.log('   Fill in and submit the contact form');
  console.log('\n');
});
