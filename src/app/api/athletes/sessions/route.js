import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const userId = request.headers.get('user-id');
    const { sessionData } = await request.json();

    if (!userId || !sessionData) {
      return NextResponse.json({ error: 'User ID and session data are required' }, { status: 400 });
    }

    const sessionFilePath = path.join(process.cwd(), 'data', 'users', userId, 'sessions.json');

    let sessions = [];

    if (fs.existsSync(sessionFilePath)) {
      const fileData = fs.readFileSync(sessionFilePath, 'utf8');
      sessions = JSON.parse(fileData);
    }

    sessions.push(sessionData);

    // Ensure directory exists before writing file
    fs.mkdirSync(path.dirname(sessionFilePath), { recursive: true });
    fs.writeFileSync(sessionFilePath, JSON.stringify(sessions, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving session:', error);
    return NextResponse.json({ error: 'Failed to save session' }, { status: 500 });
  }
}
