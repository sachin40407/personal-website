# Troubleshooting Contact Form Issues

## Error: Message Not Sending

### Step 1: Check Email Configuration
Make sure your `.env` file contains these exact settings:
```
EMAIL_USER=sachin40407@gmail.com
EMAIL_PASSWORD=your_16_char_app_password
RECIPIENT_EMAIL=sachin40407@gmail.com
```

### Step 2: Generate Gmail App Password
1. Go to https://myaccount.google.com/security
2. Enable "2-Step Verification" if not already done
3. Find "App passwords" (appears only if 2FA is enabled)
4. Select "Mail" and "Windows Computer"
5. Google will generate a 16-character password
6. Copy this password to `EMAIL_PASSWORD` in `.env`

### Step 3: Verify Server is Running
```bash
npm start
```

You should see:
```
╔════════════════════════════════════════════════════════╗
║                  Portfolio Server Started               ║
╚════════════════════════════════════════════════════════╝

✅ Server running at http://localhost:3000
📧 Email Configuration:
   Status: ✅ Configured
```

### Step 4: Test the Form
1. Open http://localhost:3000
2. Scroll to "Send me a Message" section
3. Fill in the form (Name, Email, Message)
4. Click "Send Message"

### Common Errors & Solutions

#### Error: "EAUTH 535-5.7.8"
**Cause:** Invalid Gmail credentials
**Solution:**
- Make sure 2FA is enabled on your Gmail
- Generate a new App Password
- Don't use your regular Gmail password

#### Error: "ECONNREFUSED"
**Cause:** Server not running or email service unreachable
**Solution:**
- Make sure you ran `npm install` first
- Restart the server: `npm start`
- Check internet connection

#### Error: "Email service not ready"
**Cause:** Email credentials not set in `.env`
**Solution:**
- Edit `.env` file
- Replace `your_app_password` with actual password
- Restart server

#### Error: "All fields are required"
**Cause:** Form field is empty
**Solution:**
- Fill in all three fields: Name, Email, Message

#### Button shows "Sending..." forever
**Cause:** Server not responding or email service issue
**Solution:**
- Check browser console (F12, Console tab) for errors
- Check server terminal for error messages
- Verify `.env` configuration
- Alternative: Contact directly at sachin40407@gmail.com

## How to Check Server Logs

1. Open terminal in your project folder
2. Run: `npm start`
3. Watch the terminal output for:
   - ✅ "Email service ready"
   - ✅ "Owner email sent to: sachin40407@gmail.com"
   - ❌ Any error messages starting with "❌"

## How to Check Browser Console Logs

1. Open your portfolio: http://localhost:3000
2. Right-click → "Inspect" or press F12
3. Click "Console" tab
4. Try submitting the form
5. Look for error messages in red

## If Still Not Working

1. Make sure Node.js is installed: `node --version`
2. Reinstall dependencies: `rm node_modules && npm install`
3. Check that Gmail 2-Factor Authentication is enabled
4. Try a different Gmail address as EMAIL_USER
5. Check firewall isn't blocking port 3000

## Alternative: Use Direct Email

If the form backend continues to have issues, you can still contact users by adding a direct mailto link in the HTML form or providing your email prominently on the page.

---

For more help, check the main README-BACKEND.md file.
