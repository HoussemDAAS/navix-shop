# 🚀 Complete Google Sheets Integration Guide for Navix Shop

## 📋 Overview
This guide will walk you through connecting your Navix Shop to Google Sheets so all orders are automatically stored in a spreadsheet.

## ✅ Prerequisites
- Your Navix Shop application is running
- You have a Google account
- Basic understanding of copying/pasting information

---

## 🔧 Step 1: Google Cloud Console Setup

### 1.1 Access Google Cloud Console
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Sign In" (top right) if not already logged in
3. If it's your first time, click "Agree and Continue" to terms

### 1.2 Create a New Project
1. Click the project dropdown at the top (it might say "Select a project")
2. Click "New Project"
3. **Project Name**: Type `Navix Shop Orders`
4. **Location**: Leave as "No organization"
5. Click "Create"
6. Wait 10-15 seconds for creation
7. Click "Select Project" to activate it

### 1.3 Enable Google Sheets API
1. In the search bar at the top, type: `Google Sheets API`
2. Click on "Google Sheets API" result
3. Click the blue "Enable" button
4. Wait for it to finish enabling (10-15 seconds)

---

## 🔐 Step 2: Create Service Account (API Key)

### 2.1 Go to Credentials
1. In the left sidebar, click "Credentials" (under "APIs & Services")
2. Click "Create Credentials" (blue button at top)
3. Select "Service Account"

### 2.2 Configure Service Account
1. **Service Account Name**: Type `Navix Shop Orders`
2. **Service Account ID**: Will auto-generate (leave as is)
3. **Description**: Type `For storing Navix Shop orders in Google Sheets`
4. Click "Create and Continue"

### 2.3 Grant Access
1. **Role**: Click dropdown and select "Editor" (under "Basic")
2. Click "Continue"
3. Click "Done" (skip the optional steps)

---

## 🔑 Step 3: Generate Your API Key

### 3.1 Find Your Service Account
1. You should see "Navix Shop Orders" in the credentials list
2. Click on the email address (it looks like: `navix-shop-orders@your-project.iam.gserviceaccount.com`)
3. This opens the details page

### 3.2 Create the Key
1. Click the "Keys" tab at the top
2. Click "Add Key" → "Create New Key"
3. Select "JSON" format
4. Click "Create"
5. **IMPORTANT**: A file will download automatically - SAVE THIS FILE!
6. Keep this file safe and secure

---

## 📊 Step 4: Create Your Orders Spreadsheet

### 4.1 Create New Google Sheet
1. Go to [Google Sheets](https://sheets.google.com/)
2. Click the "+" to create a blank spreadsheet
3. **Name your sheet**: `Navix Shop Orders`

### 4.2 Set Up Column Headers
In **Row 1**, type these exact headers in each column:

| Column | Header | Description |
|--------|--------|-------------|
| A | Timestamp | When order was placed |
| B | Order ID | Unique order number |
| C | First Name | Customer first name |
| D | Last Name | Customer last name |
| E | Phone | Customer phone number |
| F | Address | Delivery address |
| G | Quantity | Number of items |
| H | Total | Total price in TND |
| I | Status | Order status |

### 4.3 Format the Headers
1. Select Row 1 (click on the "1" on the left)
2. Make text **bold** (Ctrl+B or click B icon)
3. Add background color (light gray recommended)
4. Center align the text

---

## 🔗 Step 5: Share Sheet with Your Service Account

### 5.1 Get Your Service Account Email
1. Open the JSON file you downloaded earlier
2. Look for the line: `"client_email": "something@your-project.iam.gserviceaccount.com"`
3. Copy that email address

### 5.2 Share the Spreadsheet
1. In your Google Sheet, click "Share" (top right)
2. Paste the service account email in the "Add people" field
3. Set permission to "Editor"
4. Click "Send" (you can skip the notification email)

---

## 📋 Step 6: Get Your Sheet ID

### 6.1 Copy Sheet ID from URL
1. Look at your Google Sheet URL in the browser
2. It looks like: `https://docs.google.com/spreadsheets/d/LONG_STRING_OF_CHARACTERS/edit`
3. Copy the part between `/d/` and `/edit`
4. This is your **Sheet ID** - save it!

---

## ⚙️ Step 7: Configure Your Application

### 7.1 Create Environment File
1. In your project folder, create a new file called `.env.local`
2. Open it with a text editor

### 7.2 Add Your Configuration
Copy and paste this exact template:

```env
# Google Sheets Configuration
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account-email@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----
YourPrivateKeyHere
-----END PRIVATE KEY-----
GOOGLE_SHEET_ID=your-sheet-id-here
```

### 7.3 Fill in Your Details
1. **GOOGLE_SERVICE_ACCOUNT_EMAIL**: Copy from your JSON file (the client_email)
2. **GOOGLE_PRIVATE_KEY**: Copy the entire private_key from JSON (including the -----BEGIN and -----END lines)
3. **GOOGLE_SHEET_ID**: Paste the Sheet ID you copied earlier

### 7.4 Format the Private Key Correctly
The private key should look like this:
```
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC7VJTUt9Us8cKB
[... many more lines ...]
-----END PRIVATE KEY-----
```

**Important**: Replace any `\n` in the key with actual line breaks.

---

## 🧪 Step 8: Test Your Integration

### 8.1 Restart Your Application
1. Stop your current app (Ctrl+C in terminal)
2. Start it again: `npm run dev`
3. This loads the new environment variables

### 8.2 Place a Test Order
1. Open your website: http://localhost:3002
2. Fill out the order form:
   - First Name: `Test`
   - Last Name: `Order`
   - Phone: `+21612345678`
   - Address: `123 Test Street, Tunis`
   - Quantity: `1` (should be default)
3. Click "Commander Maintenant"

### 8.3 Check Your Google Sheet
1. Go back to your Google Sheet
2. You should see a new row with your test order!
3. The timestamp should show the current time

---

## 🔍 Troubleshooting

### ❌ "Order saved but not in Google Sheets"
- Check your `.env.local` file is in the correct location
- Verify all 3 environment variables are correct
- Check console logs for any error messages
- Make sure you shared the sheet with the service account email

### ❌ "Authentication error"
- Double-check the private key format (should have line breaks)
- Verify the service account email is correct
- Make sure Google Sheets API is enabled in your project

### ❌ "Sheet not found"
- Verify your Sheet ID is correct
- Make sure the sheet name is exactly "Sheet1" (or update the range in the code)

---

## ✅ Success Indicators
You'll know it's working when:
- Orders appear in your Google Sheet within seconds
- Each order has a unique Order ID (CMD-1234567890)
- The total shows "31 TND" for quantity 1 (23 + 8 shipping)
- No error messages in your browser console

---

## 📱 Your Final Setup
- **Quantity defaults to 1** ✅
- **Mobile responsive** ✅
- **Google Sheets integration** ✅
- **French language** ✅
- **Correct pricing (23 TND + 8 TND)** ✅
- **AliExpress-style design** ✅

---

## 🎉 Congratulations!
Your Navix Shop is now fully connected to Google Sheets. Every order will automatically appear in your spreadsheet, making it easy to manage and track customer orders.

**Next steps**: You can customize the spreadsheet with additional formatting, create charts to track sales, or set up email notifications for new orders.