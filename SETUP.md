# ⚡ Quick Setup Guide - Portfolio Contact Form

## 🚀 Follow These Steps to Fix Email Issues

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Get Gmail App Password
1. Open: **https://myaccount.google.com/security**
2. Click **"2-Step Verification"** and enable it (if not already enabled)
3. Go back to Security settings
4. Find **"App passwords"** (only visible if 2FA is ON)
5. Select **"Mail"** and **"Windows Computer"**
6. Copy the **16-character password** Google generates

### Step 3: Configure .env File
Open the `.env` file in your project and update:
```
EMAIL_USER=sachin40407@gmail.com
EMAIL_PASSWORD=your_16_character_password_here
RECIPIENT_EMAIL=sachin40407@gmail.com
PORT=3000
NODE_ENV=development
```

**⚠️ Important:** Replace `your_16_character_password_here` with the actual App Password from Step 2

### Step 4: Verify Email Configuration
Run this command to test your setup:
```bash
node verify-email.js
```

You should see:
```
✅ EMAIL_USER: sachin40407@gmail.com
✅ EMAIL_PASSWORD: ******* (hidden)
✅ RECIPIENT_EMAIL: sachin40407@gmail.com
✅ Gmail connection successful!
✅ Test email sent successfully!
═══════════════════════════════════════════════════════
          ✅ ALL CHECKS PASSED - READY TO USE! ✅
═══════════════════════════════════════════════════════
```

### Step 5: Start Your Server
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

### Step 6: Test the Contact Form
1. Open: **http://localhost:3000** in your browser
2. Scroll to **"Send me a Message"**
3. Fill in:
   - Name: Your Name
   - Email: Your email address
   - Message: Test message
4. Click **"Send Message"**
5. You should see: ✅ **Success! Message sent successfully.**
6. Check your Gmail inbox for the message

## ❌ If It Still Doesn't Work

### Check Browser Console (F12)
1. Press **F12** in your browser
2. Click **"Console"** tab
3. Try submitting the form again
4. Look for error messages (they're in red)
5. Share those messages in the terminal error logs

### Check Server Terminal
Look for error messages starting with **❌** in the terminal where you ran `npm start`

### Common Solutions

| Problem | Solution |
|---------|----------|
| "Invalid login" error | Make sure you generated App Password, not using regular Gmail password |
| "All fields required" | Fill in all three form fields |
| Button says "Sending..." forever | Server might not be running - open http://localhost:3000 and check if page loads |
| Gmail 2FA not enabled | Go to myaccount.google.com/security and enable 2-Step Verification |
| Not getting test email | Check Spam/Promotions folder in Gmail |

## ✅ If Email Works But Server Doesn't Start

Try rebuilding:
```bash
rm -r node_modules
npm install
npm start
```

## 📞 Fallback Option

If the backend keeps having issues, the form will automatically show a fallback:
```
📧 Fallback Option: [Send via Gmail Instead]
```

Users can click this button to email you directly using their email client.

---

### Need More Help?

Check these files for detailed troubleshooting:
- `TROUBLESHOOTING.md` - Detailed error solutions
- `README-BACKEND.md` - Full backend documentation
