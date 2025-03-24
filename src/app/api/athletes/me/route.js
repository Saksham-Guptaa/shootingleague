import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Get the user ID from the request headers (set by middleware)
    const userId = request.headers.get('user-id');
    

    
    // Read the athletes data from the JSON file
    const filePath = path.join(process.cwd(), 'athletes.json');
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'No athletes found' },
        { status: 404 }
      );
    }
    
    const fileData = fs.readFileSync(filePath, 'utf8');
    const athletes = JSON.parse(fileData);
    
    // Find the current athlete
    const currentAthlete = athletes.find(athlete => athlete.id === Number(userId));
    
    // Remove sensitive data
    const { password, ...safeAthlete } = currentAthlete;
    
    return NextResponse.json(safeAthlete);
  } catch (error) {
    console.error('Error reading athlete data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch athlete data' },
      { status: 500 }
    );
  }
}
