"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import PartnersSection from "../../Components/PartnersSection";

const upcomingEvents = [
  {
    title: "Khelo India University Games  Shooting Championship",
    date: "01-05 Apr 2025",
    location: "Delhi, India",
    image: "/events/upcoming1.png",
  },
  {
    title: "Asian Shooting Championships 2025",
    date: "21-24 MAy 2025",
    location: "Jakarta, Indonesia",
    image: "/events/upcoming2.png",
  },
  {
    title: "ISSF Junior World Cup 2025",
    date: "14-16 jun 2025",
    location: "Delhi, India",
    image: "/events/upcoming3.png",
  },
];

const latestResults = [
  {
    title: "World Shooting Championship 2024",
    date: "Feb 20, 2024",
    winner: "John Doe (USA)",
    score: "Gold - 98.7",
    image: "/events/result1.png",
  },
  {
    title: "European Shooting Masters",
    date: "Jan 15, 2024",
    winner: "Emma Smith (UK)",
    score: "Gold - 97.5",
    image: "/events/result1.png",
  },
  {
    title: "European Shooting Masters",
    date: "Jan 15, 2024",
    winner: "Emma Smith (UK)",
    score: "Gold - 97.5",
    image: "/events/result1.png",
  },
];

const Competitions = () => {
  return (
    <div className="py-12 px-6 md:px-16">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-black mb-8">COMPETITIONS</h1>

      {/* UPCOMING EVENTS */}
      <div className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Upcoming Events</h2>
        <Swiper
          modules={[Autoplay, Navigation]}
          slidesPerView={1}
          spaceBetween={20}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          navigation
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {upcomingEvents.map((event, index) => (
            <SwiperSlide key={index}>
              <div className="rounded-lg overflow-hidden shadow-md bg-white">
                <Image
                  src={event.image}
                  alt={event.title}
                  width={400}
                  height={250}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold">{event.title}</h3>
                  <p className="text-gray-700">{event.date}</p>
                  <p className="text-gray-500">{event.location}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* LATEST EVENT RESULTS */}
      <div>
        <h2 className="text-3xl font-semibold mb-4">Latest Event Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestResults.map((result, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden shadow-md bg-white"
            >
              <Image
                src={result.image}
                alt={result.title}
                width={400}
                height={250}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold">{result.title}</h3>
                <p className="text-gray-700">{result.date}</p>
                <p className="text-gray-900 font-semibold">
                  🏆 {result.winner}
                </p>
                <p className="text-gray-600">{result.score}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PartnersSection />
    </div>
  );
};

export default Competitions;
