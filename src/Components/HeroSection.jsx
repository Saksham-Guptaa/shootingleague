"use client";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const heroNews = [
  {
    title: "Global Shooting League 2025",
    description:
      "Witness history as the best marksmen from around the world battle for glory in the Global Shooting League 2025! Precision, skill, and determination.",
    image: "/hero1.png", // Ensure correct path
  },
  {
    title: "New Shooting Stars Emerge",
    description:
      "Young marksmen dominate the championship, setting new records and raising the competition bar.",
    image: "/hero2.png",
  },
];

const newsItems = [
  {
    title: "Shooting Trials: Saurabh Chaudhary returns...",
    category: "ISSF CHAMPIONSHIP, 2024",
    image: "/news1.png",
  },
  {
    title: "Rahi Sarnobat puts behind serious health scare",
    category: "ISSF CHAMPIONSHIP, 2024",
    image: "/news2.png",
  },
  {
    title: "Saurabh Chaudhary sets National Record, eyes...",
    category: "ISSF CHAMPIONSHIP, 2024",
    image: "/news3.png",
  },
  {
    title: "Rs 182-cr world-class shooting range in...",
    category: "ISSF CHAMPIONSHIP, 2024",
    image: "/news4.png",
  },
  
];

const HeroSection = () => {
  const heroSliderRef = useRef(null);

  return (
    <section className="relative">
      {/* Hero Carousel */}
      <div className="relative w-full h-[60vh] md:h-[75vh] lg:h-[80vh]">
        <Swiper
          modules={[Navigation, Autoplay]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          slidesPerView={1}
          onSwiper={(swiper) => (heroSliderRef.current = swiper)}
          className="w-full h-full"
        >
          {heroNews.map((news, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover  "
                />
                <div className="absolute inset-0 bg-black/25 flex flex-col justify-center px-6 md:px-12 lg:px-20 text-white">
                  <p className="text-sm uppercase tracking-wide">DISCOVER</p>
                  <h1 className="text-3xl md:text-5xl font-bold">{news.title}</h1>
                  <p className="mt-2 text-sm md:text-lg max-w-2xl">
                    {news.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <div className="absolute bottom-4 right-6 flex gap-2">
          <button
            onClick={() => heroSliderRef.current?.slidePrev()}
            className="bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-300"
          >
            <FaChevronLeft size={20} />
          </button>
          <button
            onClick={() => heroSliderRef.current?.slideNext()}
            className="bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-300"
          >
            <FaChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* News Scrolling Section */}
      <div className="bg-blue-900 py-6 px-4">
        <Swiper
          modules={[Autoplay]}
          loop={true}
          spaceBetween={15}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          speed={5000}
          allowTouchMove={false}
          className="overflow-hidden"
        >
          {newsItems.map((news, index) => (
            <SwiperSlide key={index} className="w-[250px] md:w-[280px] lg:w-[300px]">
              <div className=" rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-all">
                <img src={news.image} alt={news.title} className="w-full h-40 object-cover" />
                <div className="p-3">
                  <p className="text-xs text-white">{news.category}</p>
                  <p className="text-sm font-semibold">{news.title}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HeroSection;
