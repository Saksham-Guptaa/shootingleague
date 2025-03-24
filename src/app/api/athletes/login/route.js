import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import bcrypt, { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'gihijlbnnj;78978907908'; // Use env variable in production

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    
    // Read the athletes.json file
    const filePath = path.join(process.cwd(), '/public/athletes.json');
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 400 }
      );
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const athletes = JSON.parse(fileContent);
    // Find the user by email
    const user = athletes.find(user => user.email === email);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 400 }
      );
    }
    
    // Check if password matches
    const isMatch =  compare({
        password,
        hash: user.password
    });
    
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 400 }
      );
    }
    
    // Create a user object without the password
    const { password: userPassword, ...userWithoutPassword } = user;
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    return NextResponse.json({
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}