import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'gihijlbnnj;78978907908'; // Use same secret as login

export async function GET(request) {
  // Check for authorization token
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const token = authHeader.split(' ')[1];
  
  // Validate the token and extract user ID
  let userId;
  try {
    // Verify and decode the JWT token
    const decoded = jwt.verify(token, JWT_SECRET);
    userId = decoded.id; // Extract user ID from token
    
    if (!userId) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
  
  try {
    // Read the athletes data from the JSON file
    const dataFilePath = path.join(process.cwd(), '/public/athletes.json');
    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    const athletes = JSON.parse(fileData);
    
    // Find the athlete with the matching ID from the token
    const athlete = athletes.find(a => a.id.toString() === userId.toString());
    
    if (!athlete) {
      return NextResponse.json({ error: 'Athlete not found' }, { status: 404 });
    }
    
    // Remove sensitive information before sending back
    const { password, ...athleteWithoutPassword } = athlete;
    
    return NextResponse.json(athleteWithoutPassword, { status: 200 });
  } catch (error) {
    console.error('Error fetching athlete data:', error);
    return NextResponse.json({ error: 'Failed to fetch athlete data' }, { status: 500 });
  }
}