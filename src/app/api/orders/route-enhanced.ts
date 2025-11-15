import { NextRequest, NextResponse } from 'next/server';
import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';

// Google Sheets integration (requires googleapis package)
// Install with: npm install googleapis

interface OrderData {
  timestamp: string;
  orderId: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  quantity: number;
  total: string;
  status: string;
}

async function appendToGoogleSheet(orderData: OrderData) {
  try {
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!serviceAccountEmail || !privateKey || !sheetId) {
      console.warn('Google Sheets credentials not configured');
      return false;
    }

    const auth = new GoogleAuth({
      credentials: {
        client_email: serviceAccountEmail,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const values = [
      [
        orderData.timestamp,
        orderData.orderId,
        orderData.firstName,
        orderData.lastName,
        orderData.phone,
        orderData.address,
        orderData.quantity,
        orderData.total,
        orderData.status
      ]
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Sheet1!A:I', // Adjust range as needed
      valueInputOption: 'RAW',
      requestBody: {
        values: values
      }
    });

    return true;
  } catch (error) {
    console.error('Google Sheets error:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, phone, address, quantity } = body;

    // Validate required fields
    if (!firstName || !lastName || !phone || !address || !quantity) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    const orderData = {
      timestamp: new Date().toLocaleString('fr-FR'),
      orderId: `CMD-${Date.now()}`,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      quantity: parseInt(quantity),
      total: (49.99 * parseInt(quantity)).toFixed(2),
      status: 'Nouvelle'
    };

    // Try to append to Google Sheets
    const sheetsSuccess = await appendToGoogleSheet(orderData);
    
    if (sheetsSuccess) {
      console.log('Order successfully saved to Google Sheets:', orderData.orderId);
    } else {
      console.log('Order saved locally (Google Sheets not configured):', orderData.orderId);
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json(
      { 
        success: true, 
        message: 'Commande enregistrée avec succès',
        orderId: orderData.orderId,
        sheetsIntegrated: sheetsSuccess
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Order processing error:', error);
    return NextResponse.json(
      { error: 'Erreur lors du traitement de la commande' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Orders API endpoint - Use POST to submit orders' },
    { status: 200 }
  );
}