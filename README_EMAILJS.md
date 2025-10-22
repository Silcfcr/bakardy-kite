# EmailJS Setup for Contact Form

## Quick Setup (Using Default Template)

Your contact form is now configured to use EmailJS's default "Contact Us" template. Here's what you need to do:

### 1. Get Your EmailJS Credentials
1. Go to [emailjs.com](https://www.emailjs.com/) and sign up
2. In your dashboard, go to "Email Services" and add your Gmail account
3. Copy your **Service ID** (starts with `service_`)
4. Copy your **Public Key** from "Account" → "General"

### 2. Update Configuration
Open `src/config/emailjs.ts` and replace:
```typescript
serviceId: 'service_YOUR_ACTUAL_SERVICE_ID',
publicKey: 'YOUR_ACTUAL_PUBLIC_KEY'
```

### 3. That's It!
- The template ID is already set to use the default "Contact Us" template
- All emails will be sent to `alaswanybakar2@gmail.com`
- The form will automatically work once you add your Service ID and Public Key

### What Happens When Form is Submitted:
- User's name, email, and message are sent via EmailJS
- Email is delivered to `alaswanybakar2@gmail.com`
- Form resets automatically
- User gets success/error notifications

No need to create custom templates - everything is ready to go!
