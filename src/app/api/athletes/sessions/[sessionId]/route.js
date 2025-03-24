// File: app/api/athletes/sessions/[sessionId]/route.js
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const sessionId = params.sessionId;
    const userId = request.headers.get('user-id');
    
    const sessionFilePath = path.join(
      process.cwd(), 
      'data', 
      'users', 
      userId, 
      'sessions', 
      `${sessionId}.json`
    );
    
    if (!fs.existsSync(sessionFilePath)) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }
    
    const fileData = fs.readFileSync(sessionFilePath, 'utf8');
    const sessionData = JSON.parse(fileData);
    
    return NextResponse.json(sessionData);
  } catch (error) {
    console.error('Error fetching session:', error);
    return NextResponse.json(
      { error: 'Failed to fetch session' },
      { status: 500 }
    );
  }
}