# Portfolio Website with Contact Backend

This is a modern portfolio website with a particle background effect and a functional contact form backend.

## Features

✨ **Particle Background** - Interactive particle animations on the homepage  
📧 **Contact Form** - Submit messages directly from the website  
📬 **Email Notifications** - Receive emails instantly when someone contacts you  
✅ **Confirmation Email** - Automatic reply to visitors  
🎨 **Responsive Design** - Works on all devices  

## Project Structure

```
├── index.html              # Main portfolio website
├── server.js              # Node.js/Express backend
├── package.json           # Node dependencies
├── .env                   # Configuration (email & port)
├── .gitignore            # Git ignore rules
├── css/                  # Stylesheets
├── js/                   # JavaScript files
├── images/               # Portfolio images
├── fonts/                # Font files
└── lib/                  # Third-party libraries
```

## Setup Instructions

### 1. Install Node.js
Download and install Node.js from [nodejs.org](https://nodejs.org/)

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Email (Gmail)

#### Step 1: Enable 2-Factor Authentication
1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Click "Security" in the left menu
3. Enable "2-Step Verification"

#### Step 2: Generate App Password
1. Go back to Security settings
2. Find "App passwords" (only visible if 2FA is enabled)
3. Select "Mail" and "Windows Computer"
4. Copy the 16-character password

#### Step 3: Update .env File
Open `.env` and update:
```
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASSWORD=your_16_char_app_password
RECIPIENT_EMAIL=your_gmail@gmail.com
PORT=3000
```

### 4. Start the Server

**For development:**
```bash
npm run dev
```

**For production:**
```bash
npm start
```

The server will run at `http://localhost:3000`

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Fill out the contact form with your details
3. Submit the form
4. You'll receive an email confirmation, and the message will be sent to your email

## Email Details

- **From:** The email address configured in .env (EMAIL_USER)
- **To:** The recipient email (RECIPIENT_EMAIL in .env)
- **Contains:** Visitor name, email, and message
- **Confirmation:** Automatic reply sent to the visitor

## File Descriptions

### server.js
- Express.js server setup
- Email configuration with Nodemailer
- Contact form API endpoint (`/api/contact`)
- Input validation and error handling
- HTML escaping for security

### index.html
- Portfolio website with particles.js integration
- Contact form with JavaScript form handler
- Responsive design with Bootstrap

### Particles.js
- Interactive particle background
- Hover effects
- Click to add particles
- Responsive to screen size

## Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript, Bootstrap
- **Backend:** Node.js, Express.js
- **Email:** Nodemailer with Gmail SMTP
- **Animations:** Particles.js, AOS (Animate On Scroll)
- **Build Tools:** npm

## Troubleshooting

### "Error: EAUTH 535-5.7.8"
- Your Gmail app password is incorrect
- Make sure 2-Factor Authentication is enabled
- Regenerate the app password

### "Cannot find module 'nodemailer'"
- Run `npm install` to install all dependencies

### Form not submitting
- Make sure the server is running (`npm start`)
- Check browser console for errors (F12)
- Verify .env configuration

### Emails not arriving
- Check spam/promotions folder in Gmail
- Verify email addresses in .env are correct
- Check server logs for errors

## Security Notes

- Never commit `.env` file to Git (it's in .gitignore)
- Always use App Passwords, not your real Gmail password
- Input validation prevents script injection
- HTML content is escaped to prevent XSS attacks

## Deployment

To deploy this to a hosting service:

1. **Heroku:**
   ```bash
   npm install -g heroku
   heroku login
   heroku create your-app-name
   git push heroku main
   ```

2. **Environment Variables:** Set them in Heroku dashboard

3. **Other Platforms:** AWS, DigitalOcean, Vercel, Netlify (with serverless functions)

## License

ISC - Use freely!

## Support

For issues or questions, open a GitHub issue or contact through the website form.
