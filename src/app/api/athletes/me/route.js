import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
// Note: If you need auth, you'd import from next-auth in a different way for App Router
// import { getServerSession } from "next-auth/next";

export async function GET(request) {
  // Check for authorization token
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const token = authHeader.split(' ')[1];
  
  // In a real app, you would validate the token against your database or auth service
  // For this example, we'll just do a simple check
  if (!token) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
  
  try {
    // Read the athletes data from the JSON file
    const dataFilePath = path.join(process.cwd(), '/public/athletes.json');
    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    const athletes = JSON.parse(fileData);
    
    // In a real app, you would decode the token to get the user ID
    // For this example, we'll assume the token contains the user ID
    // This is just a simple example - use a proper auth system in production!
    
    // Find the athlete with the matching ID
    // For demo purposes, we'll just return the first athlete
    const athlete = athletes[0];
    
    if (!athlete) {
      return NextResponse.json({ error: 'Athlete not found' }, { status: 404 });
    }
    
    return NextResponse.json(athlete, { status: 200 });
  } catch (error) {
    console.error('Error fetching athlete data:', error);
    return NextResponse.json({ error: 'Failed to fetch athlete data' }, { status: 500 });
  }
}