import { getSession } from 'next-auth/react';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // Check for authorization token
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  
  // In a real app, you would validate the token against your database or auth service
  // For this example, we'll just do a simple check
  if (!token) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  try {
    // Read the athletes data from the JSON file
    const dataFilePath = path.join(process.cwd(), '/public/athletes.json');
    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    const athletes = JSON.parse(fileData);

    // In a real app, you would decode the token to get the user ID
    // For this example, we'll assume the token contains the user ID
    // This is just a simple example - use a proper auth system in production!
    
    // Find the athlete with the matching ID
    // For demo purposes, we'll just return the first athlete
    const athlete = athletes[0];
    
    if (!athlete) {
      return res.status(404).json({ error: 'Athlete not found' });
    }

    res.status(200).json(athlete);
  } catch (error) {
    console.error('Error fetching athlete data:', error);
    res.status(500).json({ error: 'Failed to fetch athlete data' });
  }
}