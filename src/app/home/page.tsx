"use client";
import Gallery from "../../Components/Gallery";
import HeroSection from "../../Components/HeroSection";
import NewsForum from "../../Components/News";
import RankingsSection from "../../Components/RankingSection";
import TeamVictorySection from "../../Components/TeamVictorySection";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
export default function Home() {
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
  return (
    <div className="bg-white">
      <HeroSection />
      <div className="py-12 px-6 md:px-16">
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
                  <img
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
      </div>

      <TeamVictorySection />
      <RankingsSection />
      {/* <ExecutiveCommittee/> */}
      <NewsForum />
      <Gallery />
      {/* <PartnersSection/> */}
    </div>
  );
}
