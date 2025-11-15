import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { readFileSync } from 'fs';
import { join } from 'path';

// Google Sheets API integration
async function appendToSheet(orderData: any) {
  try {
    // Read credentials from JSON file
    const credentialsPath = join(process.cwd(), 'google-credentials.json');
    const credentials = JSON.parse(readFileSync(credentialsPath, 'utf8'));

    // Create auth client
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    // Prepare the row data
    const row = [
      orderData.timestamp,
      orderData.orderId,
      orderData.firstName,
      orderData.lastName,
      orderData.phone,
      orderData.address,
      orderData.quantity,
      orderData.total,
      orderData.status
    ];

    // Append to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:I',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });

    return true;
  } catch (error) {
    throw error;
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

    // Calculate total with correct pricing (23 TND + 8 TND shipping)
    const productPrice = 23; // TND
    const shippingPrice = 8; // TND
    const totalPrice = (productPrice * parseInt(quantity)) + shippingPrice;

    // Prepare order data
    const orderData = {
      timestamp: new Date().toLocaleString('fr-TN', { timeZone: 'Africa/Tunis' }),
      orderId: `CMD-${Date.now()}`,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      quantity: parseInt(quantity),
      total: `${totalPrice} TND`,
      status: 'Nouvelle'
    };

    // Check if Google Sheets integration is configured
    const fs = require('fs');
    const path = require('path');
    const credentialsPath = path.join(process.cwd(), 'google-credentials.json');

    if (fs.existsSync(credentialsPath) && process.env.GOOGLE_SHEET_ID && 
        process.env.GOOGLE_SHEET_ID !== 'your-google-sheet-id-here') {
      
      try {
        // Append to Google Sheet
        await appendToSheet(orderData);
      } catch (sheetError) {
        // Continue with success response even if sheet fails
        // You might want to implement a fallback storage mechanism
      }
    }
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Commande enregistrée avec succès',
        orderId: orderData.orderId,
        total: orderData.total
      },
      { status: 200 }
    );

  } catch (error) {
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