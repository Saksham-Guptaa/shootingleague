"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import rangesData from "../../../public/ranges.json";

const Map = dynamic(() => import("../../Components/Map"), { ssr: false });

export default function ShootingRanges() {
  const [search, setSearch] = useState("");
  const [ranges, setRanges] = useState(rangesData);
  const [selectedRange, setSelectedRange] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);

  const filteredRanges = ranges.filter((range) =>
    range.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center">Shooting Ranges</h1>
      <div className="flex justify-between items-center mt-4">
        <input
          type="text"
          placeholder="Search"
          className="border p-2 w-full rounded"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-blue-100 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">
            Showing {Math.min(visibleCount, filteredRanges.length)} of {filteredRanges.length} results
          </h2>
          {filteredRanges.slice(0, visibleCount).map((range) => (
            <button
              key={range.id}
              onClick={() => setSelectedRange(range)}
              className="block md:flex items-center gap-5 bg-white p-4 rounded mb-4 shadow w-full text-left"
            >
              <img
                src={range.image}
                alt={range.name}
                className="w-full md:w-1/2 h-32 object-cover rounded"
              />
              <div className="w-full md:w-1/2">
                <h3 className="text-lg font-bold mt-2">{range.name}</h3>
                <p>{range.address}</p>
                <p>{range.status} • {range.openingHours}</p>
                <p className="text-green-600 font-semibold">{range.price}</p>
              </div>
            </button>
          ))}
          {visibleCount < filteredRanges.length && (
            <button
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded w-full"
            >
              Load More
            </button>
          )}
        </div>
        <div className="h-96">
          <Map ranges={filteredRanges} selectedRange={selectedRange} />
        </div>
      </div>
    </div>
  );
}