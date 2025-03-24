"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Papa from 'papaparse';

export default function AthleteDashboard() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [athlete, setAthlete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [csvData, setCsvData] = useState([]);
  const [csvHeaders, setCsvHeaders] = useState([]);
  const [otherAthletes, setOtherAthletes] = useState([]);
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [sessionName, setSessionName] = useState('');
  const [sessions, setSessions] = useState([]);
  const [viewingSession, setViewingSession] = useState(null);

  useEffect(() => {
    // Check for token in localStorage
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      router.push('/login');
      return;
    }
    
    setToken(storedToken);
    
    // Fetch the current athlete data
    const fetchAthleteData = async () => {
      try {
        const response = await fetch('/api/athletes/me', {
          headers: {
            'Authorization': `Bearer ${storedToken}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setAthlete(data);
          
          // Fetch sessions for the current athlete
          if (data.sessions) {
            setSessions(data.sessions);
          }
        } else {
          // Handle unauthorized or error
          if (response.status === 401) {
            localStorage.removeItem('token');
            router.push('/login');
          }
        }
      } catch (error) {
        console.error('Error fetching athlete data:', error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch other athletes for the directory
    const fetchOtherAthletes = async () => {
      try {
        const response = await fetch('/api/athletes', {
          headers: {
            'Authorization': `Bearer ${storedToken}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setOtherAthletes(data);
        }
      } catch (error) {
        console.error('Error fetching other athletes:', error);
      }
    };

    fetchAthleteData();
    fetchOtherAthletes();
  }, [router]);

  const handleCsvUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setCsvData(results.data);
          if (results.data.length > 0) {
            setCsvHeaders(Object.keys(results.data[0]));
          }
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
        }
      });
    }
  };

  const saveCsvData = async () => {
    if (!sessionName.trim()) {
      alert('Please provide a session name');
      return;
    }
  
    if (csvData.length === 0) {
      alert('Please upload CSV data first');
      return;
    }
  
    // Check if athlete data is available
    if (!athlete || !athlete.id) {
      alert('Athlete information is not available. Please try again or reload the page.');
      return;
    }
  
    try {
      const response = await fetch('/api/athletes/csv-upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'user-id': athlete.id.toString()
        },
        body: JSON.stringify({ 
          csvData,
          sessionName: sessionName,
          date: new Date().toISOString().split('T')[0]
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save CSV data');
      }
      
      // Update local sessions state
      const newSession = {
        id: Date.now(),
        name: sessionName,
        date: new Date().toISOString().split('T')[0],
        data: csvData
      };
      
      setSessions([...sessions, newSession]);
      setSessionName('');
      setCsvData([]);
      setCsvHeaders([]);
      
      // Success message
      alert('Performance data uploaded successfully!');
    } catch (error) {
      console.error('Error saving CSV data:', error);
      alert('Failed to upload data. Please try again.');
    }
  };

  const viewAthleteDetails = (id) => {
    const athlete = otherAthletes.find(a => a.id === id);
    setSelectedAthlete(athlete);
  };

  const viewSession = (session) => {
    setViewingSession(session);
  };

  const closeSessionView = () => {
    setViewingSession(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Athlete Dashboard | Shooting Sport Platform</title>
      </Head>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Shooting Sport Platform</h1>
            <div className="space-x-4">
              <button 
                onClick={() => router.push('/dashboard')} 
                className="px-4 py-2 text-sm bg-blue-700 hover:bg-blue-800 rounded"
              >
                Dashboard
              </button>
              <button 
                onClick={handleLogout} 
                className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
        
        <main className="container mx-auto px-4 py-8">
          {/* Profile Overview */}
          {athlete && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/4">
                  <div className="rounded-lg overflow-hidden bg-gray-200 h-64 flex items-center justify-center">
                    {athlete.image ? (
                      <img 
                        src={athlete.image} 
                        alt={athlete.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-5xl font-bold">
                        {getInitial(athlete.name)}
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full md:w-3/4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-3xl font-bold">{athlete.name}</h2>
                      <div className="flex items-center mt-2">
                        {athlete.flag && (
                          <img 
                            src={athlete.flag} 
                            alt={athlete.country} 
                            className="w-6 h-4 mr-2" 
                          />
                        )}
                        <span className="text-gray-600">{athlete.country}</span>
                      </div>
                    </div>
                    <div className="bg-blue-100 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-blue-800">Athlete ID: {athlete.id}</h3>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div>
                      <h3 className="text-sm text-gray-500">Gender</h3>
                      <p className="font-medium">{athlete.gender}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-500">Age</h3>
                      <p className="font-medium">{athlete.age} years</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-500">Birthday</h3>
                      <p className="font-medium">{athlete.birthday}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-500">Residence</h3>
                      <p className="font-medium">{athlete.residence}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-500">Height</h3>
                      <p className="font-medium">{athlete.height}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-500">Weight</h3>
                      <p className="font-medium">{athlete.weight}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Medals Section */}
              {athlete.medals && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Medal Collection</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {Object.entries(athlete.medals).map(([competition, medals]) => (
                      <div key={competition} className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">{competition}</h4>
                        <div className="flex space-x-4">
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-yellow-400 mr-2"></div>
                            <span>{medals.gold}</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-gray-300 mr-2"></div>
                            <span>{medals.silver}</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-amber-600 mr-2"></div>
                            <span>{medals.bronze}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Achievements Section */}
              {athlete.achievements && athlete.achievements.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Top Achievements</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="py-3 px-4 text-left">Rank</th>
                          <th className="py-3 px-4 text-left">Event</th>
                          <th className="py-3 px-4 text-left">City</th>
                          <th className="py-3 px-4 text-left">Year</th>
                          <th className="py-3 px-4 text-left">Qualification</th>
                          <th className="py-3 px-4 text-left">Final</th>
                        </tr>
                      </thead>
                      <tbody>
                        {athlete.achievements.map((achievement, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-3 px-4">{achievement.rank}</td>
                            <td className="py-3 px-4">{achievement.event}</td>
                            <td className="py-3 px-4">{achievement.city}</td>
                            <td className="py-3 px-4">{achievement.year}</td>
                            <td className="py-3 px-4">{achievement.qualification}</td>
                            <td className="py-3 px-4">{achievement.final}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* CSV Upload Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-bold mb-4">Upload Performance Data</h3>
            <p className="text-gray-600 mb-4">
              Upload your shooting performance data in CSV format. The system will automatically process and display your stats.
            </p>
            
            <div className="mb-6">
              <label className="block mb-2 font-medium text-gray-700">
                Select CSV File
              </label>
              <input
                type="file"
                accept=".csv"
                onChange={handleCsvUpload}
                className="block w-full text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="mb-6">
              <label className="block mb-2 font-medium text-gray-700">
                Session Name
              </label>
              <input
                type="text"
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
                placeholder="e.g. Morning Practice 2025-03-24"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <button
              onClick={saveCsvData}
              disabled={csvData.length === 0 || !sessionName.trim()}
              className={`px-4 py-2 rounded-md text-white ${
                csvData.length === 0 || !sessionName.trim() 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Save Session
            </button>
            
            {csvData.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-3">Data Preview</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                      <tr>
                        {csvHeaders.map((header, index) => (
                          <th key={index} className="py-3 px-4 text-left">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {csvData.slice(0, 5).map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-b">
                          {csvHeaders.map((header, colIndex) => (
                            <td key={colIndex} className="py-3 px-4">{row[header]}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {csvData.length > 5 && (
                    <p className="text-gray-500 mt-2 text-sm">Showing 5 of {csvData.length} rows</p>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Training Sessions Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-bold mb-4">My Training Sessions</h3>
            
            {sessions.length === 0 ? (
              <p className="text-gray-600">
                You haven't uploaded any training sessions yet. Start by uploading a CSV file above.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 text-left">Session Name</th>
                      <th className="py-3 px-4 text-left">Date</th>
                      <th className="py-3 px-4 text-left">Records</th>
                      <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map((session, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-4">{session.name}</td>
                        <td className="py-3 px-4">{session.date}</td>
                        <td className="py-3 px-4">{session.data ? session.data.length : 0} records</td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => viewSession(session)}
                            className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
          {/* Athlete Directory */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Athlete Directory</h3>
            <p className="text-gray-600 mb-4">
              View profiles, stats, and training sessions of other athletes in the platform.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherAthletes
                .filter(a => a.id !== athlete?.id)
                .map(otherAthlete => (
                <div 
                  key={otherAthlete.id} 
                  className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                  onClick={() => viewAthleteDetails(otherAthlete.id)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-blue-500 rounded-full overflow-hidden flex items-center justify-center text-white text-xl font-bold">
                      {otherAthlete.image ? (
                        <img 
                          src={otherAthlete.image} 
                          alt={otherAthlete.name} 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        getInitial(otherAthlete.name)
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold">{otherAthlete.name}</h4>
                      <div className="flex items-center mt-1">
                        {otherAthlete.flag && (
                          <img 
                            src={otherAthlete.flag} 
                            alt={otherAthlete.country} 
                            className="w-5 h-3 mr-1" 
                          />
                        )}
                        <span className="text-gray-600 text-sm">{otherAthlete.country}</span>
                      </div>
                      {otherAthlete.sessions && (
                        <div className="text-gray-500 text-sm mt-1">
                          {otherAthlete.sessions.length} training session(s)
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Athlete Detail Modal */}
          {selectedAthlete && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-bold">{selectedAthlete.name}</h2>
                    <button 
                      onClick={() => setSelectedAthlete(null)}
                      className="p-2 rounded-full hover:bg-gray-100"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3">
                      <div className="rounded-lg overflow-hidden bg-blue-500 h-64 flex items-center justify-center text-white text-6xl font-bold">
                        {selectedAthlete.image ? (
                          <img 
                            src={selectedAthlete.image} 
                            alt={selectedAthlete.name} 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          getInitial(selectedAthlete.name)
                        )}
                      </div>
                      
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm text-gray-500">Gender</h3>
                          <p className="font-medium">{selectedAthlete.gender}</p>
                        </div>
                        <div>
                          <h3 className="text-sm text-gray-500">Age</h3>
                          <p className="font-medium">{selectedAthlete.age} years</p>
                        </div>
                        <div>
                          <h3 className="text-sm text-gray-500">Birthday</h3>
                          <p className="font-medium">{selectedAthlete.birthday}</p>
                        </div>
                        <div>
                          <h3 className="text-sm text-gray-500">Residence</h3>
                          <p className="font-medium">{selectedAthlete.residence}</p>
                        </div>
                        <div>
                          <h3 className="text-sm text-gray-500">Height</h3>
                          <p className="font-medium">{selectedAthlete.height}</p>
                        </div>
                        <div>
                          <h3 className="text-sm text-gray-500">Weight</h3>
                          <p className="font-medium">{selectedAthlete.weight}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-2/3">
                      {/* Medals Section */}
                      {selectedAthlete.medals && (
                        <div className="mb-6">
                          <h3 className="text-xl font-bold mb-4">Medal Collection</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(selectedAthlete.medals).map(([competition, medals]) => (
                              <div key={competition} className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold mb-2">{competition}</h4>
                                <div className="flex space-x-4">
                                  <div className="flex items-center">
                                    <div className="w-6 h-6 rounded-full bg-yellow-400 mr-2"></div>
                                    <span>{medals.gold}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <div className="w-6 h-6 rounded-full bg-gray-300 mr-2"></div>
                                    <span>{medals.silver}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <div className="w-6 h-6 rounded-full bg-amber-600 mr-2"></div>
                                    <span>{medals.bronze}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Achievements Section */}
                      {selectedAthlete.achievements && selectedAthlete.achievements.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-xl font-bold mb-4">Top Achievements</h3>
                          <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                              <thead className="bg-gray-100">
                                <tr>
                                  <th className="py-3 px-4 text-left">Rank</th>
                                  <th className="py-3 px-4 text-left">Event</th>
                                  <th className="py-3 px-4 text-left">City</th>
                                  <th className="py-3 px-4 text-left">Year</th>
                                  <th className="py-3 px-4 text-left">Qualification</th>
                                  <th className="py-3 px-4 text-left">Final</th>
                                </tr>
                              </thead>
                              <tbody>
                                {selectedAthlete.achievements.map((achievement, index) => (
                                  <tr key={index} className="border-b">
                                    <td className="py-3 px-4">{achievement.rank}</td>
                                    <td className="py-3 px-4">{achievement.event}</td>
                                    <td className="py-3 px-4">{achievement.city}</td>
                                    <td className="py-3 px-4">{achievement.year}</td>
                                    <td className="py-3 px-4">{achievement.qualification}</td>
                                    <td className="py-3 px-4">{achievement.final}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                      
                      {/* Training Sessions Section */}
                      {selectedAthlete.sessions && selectedAthlete.sessions.length > 0 && (
                        <div>
                          <h3 className="text-xl font-bold mb-4">Training Sessions</h3>
                          <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                              <thead className="bg-gray-100">
                                <tr>
                                  <th className="py-3 px-4 text-left">Session Name</th>
                                  <th className="py-3 px-4 text-left">Date</th>
                                  <th className="py-3 px-4 text-left">Records</th>
                                  <th className="py-3 px-4 text-left">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {selectedAthlete.sessions.map((session, index) => (
                                  <tr key={index} className="border-b">
                                    <td className="py-3 px-4">{session.name}</td>
                                    <td className="py-3 px-4">{session.date}</td>
                                    <td className="py-3 px-4">{session.data ? session.data.length : 0} records</td>
                                    <td className="py-3 px-4">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          viewSession(session);
                                        }}
                                        className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded"
                                      >
                                        View
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Session Data Modal */}
          {viewingSession && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-6xl w-full max-h-screen overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold">{viewingSession.name}</h2>
                      <p className="text-gray-600">{viewingSession.date}</p>
                    </div>
                    <button 
                      onClick={closeSessionView}
                      className="p-2 rounded-full hover:bg-gray-100"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                  
                  {viewingSession.data && viewingSession.data.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white">
                        <thead className="bg-gray-100">
                          <tr>
                            {Object.keys(viewingSession.data[0]).map((header, index) => (
                              <th key={index} className="py-3 px-4 text-left">{header}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {viewingSession.data.map((row, rowIndex) => (
                            <tr key={rowIndex} className="border-b">
                              {Object.keys(viewingSession.data[0]).map((header, colIndex) => (
                                <td key={colIndex} className="py-3 px-4">{row[header]}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-600">No data available for this session.</p>
                  )}
                  
                  {/* Performance Summary Section */}
                  {viewingSession.data && viewingSession.data.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-xl font-bold mb-4">Performance Summary</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* This would be replaced with actual performance metrics based on your data structure */}
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-800 mb-2">Average Score</h4>
                          <p className="text-3xl font-bold text-blue-600">
                            {(viewingSession.data.reduce((sum, item) => 
                              sum + (parseFloat(item.score) || 0), 0) / viewingSession.data.length).toFixed(2)}
                          </p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4">
                          <h4 className="font-semibold text-green-800 mb-2">Best Series</h4>
                          <p className="text-3xl font-bold text-green-600">
                            {Math.max(...viewingSession.data.map(item => parseFloat(item.score) || 0)).toFixed(1)}
                          </p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4">
                          <h4 className="font-semibold text-purple-800 mb-2">Total Shots</h4>
                          <p className="text-3xl font-bold text-purple-600">
                            {viewingSession.data.length}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
        </main>
      </div>
    </>
  );
}