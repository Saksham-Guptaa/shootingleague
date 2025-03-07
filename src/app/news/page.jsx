"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const articles = [
  {
    title: "Evolution of Paralympic Shooting",
    description:
      "Although shooting has a rich and distinguished past, its inclusion in the Paralympic Games represents a new chapter in the history of the sport and the Paralympic movement...",
    image: "/news5.png",
    featured: true,
  },
  {
    title: "Applied Neuroscience for Superior Performance in Competitive Shooting",
    image: "/news6.png",
  },
  {
    title: "Jonas Jacobsson: A Legend of Paralympic Shooting",
    image: "/news7.png",
  },
  {
    title: "From Toy Guns to Top Ranks: Srijay Ranjan Early Fascination with Shooting",
    image: "/news8.png",
  },
  {
    title: "Shooting Schools and Training Centers for Para Athletes: Nurturing Future Champions",
    image: "/news9.png",
  },
  {
    title: "Diet and Health for Sports Shooting: Fuelling Precision and Performance",
    image: "/news10.png",
  },
  {
    title: "Gagan Narang: The Shooting Sensation",
    image: "/news11.png",
  },
  {
    title: "The Visionary Journey of Col JS Nagpal",
    image: "/news12.png",
  },
  {
    title: "The Intense Selection Process for India's Elite Shooters",
    image: "/news13.png",
  },
];

const LatestNews = () => {
  return (
    <div className="py-12 px-6 md:px-16">
      {/* Title */}
      <h1 className="text-4xl font-bold text-black mb-6">LATEST NEWS</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Featured News */}
        <div className="md:col-span-2">
          <div className="rounded-lg overflow-hidden shadow-md">
            <Image
              src={articles[0].image}
              alt={articles[0].title}
              width={800}
              height={400}
              className="w-full h-auto"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-black">{articles[0].title}</h2>
              <p className="text-gray-700">{articles[0].description}</p>
            </div>
          </div>
        </div>

        {/* Right-side Grid */}
        <div className="grid grid-cols-2 gap-4">
          {articles.slice(1, 5).map((article, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-md">
              <Image
                src={article.image}
                alt={article.title}
                width={200}
                height={120}
                className="w-full h-auto"
              />
              <p className="p-2 text-sm font-semibold">{article.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Section */}
      <div className="mt-8">
        <Swiper
          modules={[Autoplay, Navigation]}
          slidesPerView={3}
          spaceBetween={20}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          navigation
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {articles.slice(5).map((article, index) => (
            <SwiperSlide key={index}>
              <div className="rounded-lg overflow-hidden shadow-md">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover"
                />
                <p className="p-2 text-sm font-semibold">{article.title}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default LatestNews;
