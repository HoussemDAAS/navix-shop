# Google Sheets Integration Guide

## Setup Instructions

To enable Google Sheets integration for storing orders, follow these steps:

### 1. Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

### 2. Create Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the service account details
4. Click "Create and Continue"
5. Grant "Editor" role
6. Click "Done"

### 3. Generate Credentials

1. Click on your service account
2. Go to "Keys" tab
3. Click "Add Key" > "Create New Key"
4. Choose "JSON" format
5. Save the downloaded JSON file securely

### 4. Create Google Sheet

1. Create a new Google Sheet
2. Add these column headers in row 1:
   - A: Timestamp
   - B: Order ID
   - C: First Name
   - D: Last Name
   - E: Phone
   - F: Address
   - G: Quantity
   - H: Total (€)
   - I: Status
3. Share the sheet with your service account email (from JSON file)
4. Copy the Sheet ID from the URL

### 5. Environment Variables

Add these to your `.env.local` file:

```
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nYourPrivateKeyHere\n-----END PRIVATE KEY-----\n
GOOGLE_SHEET_ID=your-sheet-id-here
```

### 6. Install Google Sheets Package

```bash
npm install googleapis
```

### 7. Update API Route

Replace the current `/src/app/api/orders/route.ts` with the Google Sheets version provided below.

## Usage

Once configured, all orders will automatically be stored in your Google Sheet with real-time updates.