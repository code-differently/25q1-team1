// API GET endpoint — fetches all available items from Firestore

import { NextResponse } from 'next/server';

// Handle GET requests
export async function GET() {
  return NextResponse.json({ message: 'Hello, World!' }, { status: 200 });
}
