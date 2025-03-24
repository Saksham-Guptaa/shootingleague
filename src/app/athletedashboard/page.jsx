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
          
          // Save the CSV data to the athlete's profile
          saveCsvData(results.data);
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
        }
      });
    }
  };

  const saveCsvData = async (data) => {
    try {
      const response = await fetch('/api/athletes/csv-upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ csvData: data }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save CSV data');
      }
      
      // Success message or state update
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
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
    {athlete.name.charAt(0)}
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
            
            {csvData.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-3">Uploaded Performance Data</h4>
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
                      {csvData.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-b">
                          {csvHeaders.map((header, colIndex) => (
                            <td key={colIndex} className="py-3 px-4">{row[header]}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
          
          {/* Athlete Directory */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Athlete Directory</h3>
            <p className="text-gray-600 mb-4">
              View profiles and stats of other athletes in the platform.
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
                    <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                      {otherAthlete.image ? (
                        <img 
                          src={otherAthlete.image} 
                          alt={otherAthlete.name} 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No img
                        </div>
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
                      <div className="rounded-lg overflow-hidden bg-gray-200 h-64">
                        {selectedAthlete.image ? (
                          <img 
                            src={selectedAthlete.image} 
                            alt={selectedAthlete.name} 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No Image Available
                          </div>
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
                        <div>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}