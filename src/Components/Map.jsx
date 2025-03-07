// "use client"
// import { useEffect, useRef } from "react";
// import { Loader } from "@googlemaps/js-api-loader";

// export default function Map({ ranges }) {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     const loader = new Loader({
//       apiKey: "YOUR_GOOGLE_MAPS_API_KEY",
//       version: "weekly",
//     });

//     loader.load().then(() => {
//       const map = new google.maps.Map(mapRef.current, {
//         center: { lat: 20.5937, lng: 78.9629 },
//         zoom: 5,
//       });

//       ranges.forEach((range) => {
//         new google.maps.Marker({
//           position: range.location,
//           map,
//           title: range.name,
//         });
//       });
//     });
//   }, [ranges]);

//   return <div ref={mapRef} className="h-full w-full rounded"></div>;
// }
import React from 'react'

const Map = () => {
  return (
    <div>Map</div>
  )
}

export default Map