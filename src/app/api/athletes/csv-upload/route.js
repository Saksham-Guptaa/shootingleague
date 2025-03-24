import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Handler for POST requests
export async function POST(request) {
  // Get authorization headers
  const authHeader = request.headers.get('authorization');
  const userId = request.headers.get('user-id');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const token = authHeader.split(' ')[1];
  
  // In a real app, you would validate the token
  if (!token || !userId) {
    return NextResponse.json({ error: 'Invalid token or user ID' }, { status: 401 });
  }

  try {
    // Parse request body
    const body = await request.json();
    const { csvData, sessionName, date } = body;
    
    if (!csvData || !sessionName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Read the athletes data from the JSON file
    const dataFilePath = path.join(process.cwd(), 'public', 'athletes.json');
    
    // Check if file exists and create it if it doesn't
    if (!fs.existsSync(dataFilePath)) {
      fs.writeFileSync(dataFilePath, JSON.stringify([], null, 2));
    }
    
    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    const athletes = JSON.parse(fileData);
    
    // Find the athlete with the matching ID
    const athleteIndex = athletes.findIndex(a => a.id.toString() === userId.toString());
    
    if (athleteIndex === -1) {
      return NextResponse.json({ error: 'Athlete not found' }, { status: 404 });
    }
    
    // Create a new session
    const newSession = {
      id: Date.now(),
      name: sessionName,
      date: date || new Date().toISOString().split('T')[0],
      data: csvData
    };
    
    // Add the session to the athlete's sessions
    if (!athletes[athleteIndex].sessions) {
      athletes[athleteIndex].sessions = [];
    }
    
    athletes[athleteIndex].sessions.push(newSession);
    
    // Write the updated data back to the file
    fs.writeFileSync(dataFilePath, JSON.stringify(athletes, null, 2));
    
    return NextResponse.json({ success: true, session: newSession }, { status: 200 });
  } catch (error) {
    console.error('Error processing CSV upload:', error);
    return NextResponse.json({ error: 'Failed to process CSV upload' }, { status: 500 });
  }
}