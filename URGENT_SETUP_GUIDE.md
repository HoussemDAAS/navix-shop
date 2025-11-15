# 🚨 URGENT: Complete Your Google Sheets Setup

## ✅ What You Have Already (GOOD!)
- **Sheet ID**: `1Nf7bz2_hf-UGxrdN1GaXLZcJDkfK4r5xJz81_UKpMw8` ✅
- **Service Account Email**: `service-account@lithe-willow-468111-q3.iam.gserviceaccount.com` ✅
- **API Key**: `AIzaSyDbJalcx1XhMVINsbhrhTt-7xxyOxfN_sM` ✅

## ⚠️ What You Need to Get (CRITICAL)
**You need the PRIVATE KEY from your service account JSON file.**

### 🔑 Step 1: Download Your Service Account JSON File

1. **In Google Cloud Console** (you should have this open)
2. **Click on your service account email** (service-account@lithe-willow-468111-q3.iam.gserviceaccount.com)
3. **Click the "KEYS" tab** at the top
4. **Click "ADD KEY" → "Create New Key"**
5. **Choose "JSON" format**
6. **Click "CREATE"**
7. **A file will download automatically** - SAVE THIS FILE!

### 📄 Step 2: Extract the Private Key

1. **Open the downloaded JSON file** in a text editor
2. **Look for the line that starts with**: `"private_key": "-----BEGIN PRIVATE KEY-----`
3. **Copy the ENTIRE private key** (including the BEGIN and END lines)
4. **It should look like this**:
```
-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC7VJTUt9Us8cKB
[MANY LINES OF TEXT]
-----END PRIVATE KEY-----
```

### 📝 Step 3: Update Your .env.local File

**Replace the placeholder in your `.env.local` file** with the actual private key:

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=service-account@lithe-willow-468111-q3.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----
[PASTE_YOUR_ENTIRE_PRIVATE_KEY_HERE]
-----END PRIVATE KEY-----
GOOGLE_SHEET_ID=1Nf7bz2_hf-UGxrdN1GaXLZcJDkfK4r5xJz81_UKpMw8
```

### 🎯 Step 4: Create Your Google Sheet

1. **Go to [Google Sheets](https://sheets.google.com/)**
2. **Create a new blank spreadsheet**
3. **Name it**: "Navix Shop Orders"
4. **In Row 1, add these headers** (exactly like this):
   - A1: `Timestamp`
   - B1: `Order ID`
   - C1: `First Name`
   - D1: `Last Name`
   - E1: `Phone`
   - F1: `Address`
   - G1: `Quantity`
   - H1: `Total`
   - I1: `Status`

5. **Share the sheet** with your service account:
   - Click "Share" (top right)
   - Add: `service-account@lithe-willow-468111-q3.iam.gserviceaccount.com`
   - Set permission to "Editor"
   - Click "Send"

### 🔄 Step 5: Restart Your Application

```bash
# In your terminal, restart the app:
npm run dev
```

### 🧪 Step 6: Test Your Integration

1. **Open your website**: http://localhost:3002
2. **Place a test order**:
   - First Name: `Test`
   - Last Name: `Order`
   - Phone: `+21612345678`
   - Address: `123 Test Street, Tunis`
   - Quantity: `1` (should be default)
3. **Click "Commander Maintenant"**
4. **Check your Google Sheet** - you should see the order appear!

---

## 🚨 CRITICAL WARNING
**The API key you provided (`AIzaSyDbJalcx1XhMVINsbhrhTt-7xxyOxfN_sM`) is NOT the same as the private key.**
- **API Key** = for making API calls (you have this)
- **Private Key** = for authentication (you need this from JSON file)

**You MUST get the private key from the JSON file for this to work!**

---

## ✅ Success Checklist
- [ ] Downloaded service account JSON file
- [ ] Copied the private key (BEGIN to END)
- [ ] Updated `.env.local` file
- [ ] Created Google Sheet with headers
- [ ] Shared sheet with service account
- [ ] Restarted application
- [ ] Tested with sample order
- [ ] Order appears in Google Sheet

**Once you complete these steps, your Navix Shop will automatically save all orders to Google Sheets!** 🎉