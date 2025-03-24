// File: app/api/athletes/sessions/route.js
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Get the user ID from the request headers (set by middleware)
    const userId = request.headers.get('user-id');
    
    // Path to user's sessions directory
    const sessionsDir = path.join(process.cwd(), 'data', 'users', userId, 'sessions');
    
    // Check if sessions directory exists
    if (!fs.existsSync(sessionsDir)) {
      return NextResponse.json({ sessions: [] });
    }
    
    // Read all session files
    const sessionFiles = fs.readdirSync(sessionsDir).filter(file => file.endsWith('.json'));
    
    // Load session data
    const sessions = [];
    
    for (const file of sessionFiles) {
      const filePath = path.join(sessionsDir, file);
      const fileData = fs.readFileSync(filePath, 'utf8');
      const sessionData = JSON.parse(fileData);
      
      sessions.push({
        id: sessionData.id,
        timestamp: sessionData.timestamp,
        data: sessionData.data
      });
    }
    
    // Sort sessions by timestamp (newest first)
    sessions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    return NextResponse.json({ sessions });
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sessions' },
      { status: 500 }
    );
  }
}