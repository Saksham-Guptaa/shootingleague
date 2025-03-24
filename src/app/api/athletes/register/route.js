import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    
    // Remove plain password and replace with hashed one
    const { password, ...userWithoutPassword } = data;
    const userToSave = { ...userWithoutPassword, password: password };
    
    // Read the current athletes.json file
    const filePath = path.join(process.cwd(), '/public/athletes.json');
    let athletes = [];
    
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      athletes = JSON.parse(fileContent);
    }
    
    // Check if email already exists
    const existingUser = athletes.find(user => user.email === data.email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }
    
    // Add the new user
    athletes.push(userToSave);
    
    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(athletes, null, 2));
    
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    );
  }
}