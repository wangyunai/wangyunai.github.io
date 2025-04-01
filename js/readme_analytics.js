/*
NEXMII Lab Website - Google Analytics Setup Guide

To complete the Google Analytics integration:

1. Create a Google Analytics 4 property:
   - Go to: https://analytics.google.com/
   - Sign in with your Google account
   - Click "Admin" (gear icon) in the bottom left
   - Create a new property for "NEXMII Lab Website"
   - Complete the setup wizard and get your Measurement ID (G-XXXXXXXXXX format)

2. Replace the placeholder in index.html:
   - Find the two instances of G-XXXXXXXXXX in index.html
   - Replace them with your actual Measurement ID

3. Test the tracking:
   - Open your browser console while visiting the site (F12 or right-click -> Inspect -> Console)
   - You should see event tracking logs when interacting with the site
   - Confirm events appear in your Google Analytics dashboard (may take 24-48 hours)

4. Advanced tracking features implemented:
   - Page navigation tracking
   - CV download tracking
   - Social media link clicks
   - Contact form submissions and subject selection
   - Filter usage for publications and news
   - Mobile menu interactions
   - Scroll depth tracking (25%, 50%, 75%, 100%)

For additional tracking needs, use the trackClick() function:
trackClick(category, action, label)

Example: trackClick('Downloads', 'PDF', 'Research Paper')
*/ 