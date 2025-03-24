import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Read the athletes data from the JSON file
    const filePath = path.join(process.cwd(), '/public/athletes.json');
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'No athletes found' }, { status: 404 });
    }
    
    const fileData = fs.readFileSync(filePath, 'utf8');
    const athletes = JSON.parse(fileData);
    
    // Remove sensitive data like passwords before sending
    const safeAthletes = athletes.map(athlete => {
      const { password, ...safeAthlete } = athlete;
      return safeAthlete;
    });
    
    return NextResponse.json(safeAthletes);
  } catch (error) {
    console.error('Error reading athletes data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch athletes data' },
      { status: 500 }
    );
  }
}
