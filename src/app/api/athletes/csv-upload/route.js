// pages/api/upload-session.js
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = authHeader.split(' ')[1];
  const userId = req.headers['user-id'];
  
  // In a real app, you would validate the token
  if (!token || !userId) {
    return res.status(401).json({ error: 'Invalid token or user ID' });
  }

  try {
    const { csvData, sessionName, date } = req.body;
    
    if (!csvData || !sessionName) {
      return res.status(400).json({ error: 'Missing required fields' });
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
      return res.status(404).json({ error: 'Athlete not found' });
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
    
    res.status(200).json({ success: true, session: newSession });
  } catch (error) {
    console.error('Error processing CSV upload:', error);
    res.status(500).json({ error: 'Failed to process CSV upload' });
  }
}

// Configure API route to handle larger payloads if needed
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb', // Adjust based on your expected CSV file sizes
    },
  },
};