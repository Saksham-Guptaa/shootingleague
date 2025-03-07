"use client";

import { useParams } from "next/navigation";
import rangesData from "../../../../public/ranges.json";

export default function RangeDetails() {
  const { id } = useParams(); // Correct way to get the dynamic ID
  const range = rangesData.find((r) => r.id.toString() === id);

  if (!range) return <p>Range not found</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">{range.name}</h1>
      <img src={range.image} alt={range.name} className="w-full h-64 object-cover rounded" />
      <p className="mt-4">{range.description}</p>
      <h2 className="text-xl font-semibold mt-6">Booking Options</h2>
      <ul>
        {range.bookingOptions.map((option) => (
          <li key={option} className="border p-2 rounded mt-2">{option}</li>
        ))}
      </ul>
    </div>
  );
}
