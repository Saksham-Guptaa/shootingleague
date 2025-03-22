"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

const AthleteProfile = () => {
  const { id } = useParams();
  const [athlete, setAthlete] = useState(null);

  useEffect(() => {
    fetch("/athletes.json")
      .then((res) => res.json())
      .then((data) => {
        const foundAthlete = data.find((ath) => ath.id === parseInt(id));
        setAthlete(foundAthlete);
      });
  }, [id]);

  if (!athlete) return <p className="text-center">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 md:px-16">
      {/* Header Section */}
      <div className="bg-blue-900 text-white rounded-lg p-6 flex flex-col md:flex-row items-center">
        <Image
          src={athlete.image}
          alt={athlete.name}
          width={150}
          height={150}
          className="rounded-lg"
        />
        <div className="ml-6">
          <h1 className="text-3xl font-bold">{athlete.name}</h1>
          <div className="flex items-center mt-2">
            <span className="ml-2">{athlete.country}</span>
          </div>
          <p className="mt-2"><strong>GENDER:</strong> {athlete.gender}</p>
          <p><strong>BIRTHDAY:</strong> {athlete.birthday}</p>
          <p><strong>AGE:</strong> {athlete.age} years</p>
          <p><strong>RESIDENCE:</strong> {athlete.residence}</p>
          <p><strong>HEIGHT:</strong> {athlete.height}</p>
          <p><strong>WEIGHT:</strong> {athlete.weight}</p>
        </div>
      </div>

      {/* Medals Section */}
      <h2 className="text-2xl font-bold mt-8">Medals</h2>
      <table className="w-full mt-4 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Event</th>
            <th className="p-2 border">Gold</th>
            <th className="p-2 border">Silver</th>
            <th className="p-2 border">Bronze</th>
            <th className="p-2 border">Total</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(athlete.medals).map(([event, medals]) => (
            <tr key={event} className="text-center">
              <td className="p-2 border">{event}</td>
              <td className="p-2 border">{medals.gold}</td>
              <td className="p-2 border">{medals.silver}</td>
              <td className="p-2 border">{medals.bronze}</td>
              <td className="p-2 border">{medals.gold + medals.silver + medals.bronze}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Achievements Section */}
      <h2 className="text-2xl font-bold mt-8">Achievements</h2>
      {athlete.achievements.map((achievement, index) => (
        <div key={index} className="bg-blue-900 text-white p-4 rounded-lg mt-4">
          <p className="font-bold">{achievement.event}</p>
          <p>🏅 Rank: {achievement.rank}</p>
          <p>📍 City: {achievement.city}</p>
          <p>📅 Year: {achievement.year}</p>
        </div>
      ))}
    </div>
  );
};

export default AthleteProfile;
