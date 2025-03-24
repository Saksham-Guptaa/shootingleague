import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Get the user ID from the request headers (set by middleware)
    const userId = request.headers.get('user-id');
    
    const { csvData } = await request.json();
    
    if (!csvData || !Array.isArray(csvData)) {
      return NextResponse.json(
        { error: 'Invalid CSV data' },
        { status: 400 }
      );
    }
    
    // Read the athletes data from the JSON file
    const filePath = path.join(process.cwd(), '/athletes.json');
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'No athletes found' },
        { status: 404 }
      );
    }
    
    const fileData = fs.readFileSync(filePath, 'utf8');
    const athletes = JSON.parse(fileData);
    
    // Find the current athlete
    const athleteIndex = athletes.findIndex(athlete => athlete.id === Number(userId));
    
    if (athleteIndex === -1) {
      return NextResponse.json(
        { error: 'Athlete not found' },
        { status: 404 }
      );
    }
    
    // Update the athlete with the CSV data
    athletes[athleteIndex].performanceData = csvData;
    
    // Write the updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(athletes, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving CSV data:', error);
    return NextResponse.json(
      { error: 'Failed to save CSV data' },
      { status: 500 }
    );
  }
}