"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";

const NewsForum = () => {
  const articles = [
    {
      title: "Article 2",
      description:
        "Next-Gen EV Startup Secures $100M Funding to Supercharge Solar Charging Tech",
        image: "/news1.png",
    },
    {
      title: "Article 3",
      description:
        "Quantum Computing Pioneer Hits Milestone with World's Fastest Algorithm",
        image: "/news6.png",
    },
    {
      title: "Article 4",
      description:
        "India's defence Budget Boost Fuels Record-Breaking R&D in Hypersonic Missiles",
        image: "/news5.png",
    },
    {
      title: "Article 5",
      description:
        "FinTech Giant Expands into Metaverse Banking with Immersive Customer Experience",
      image: "/news7.png",
    },
    {
      title: "Article 6",
      description:
        "Global Semiconductor Supply Chain Gets $1B Boost from Public-Private Partnership",
        image: "/news1.png",
    },
  ];

  return (
    <div className="bg-gray-100 py-12 md:mx-10 lg:mx-16">
      {/* Title */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-red-600 md:text-6xl lg:text-8xl">
          NEWS FORUM
        </h1>
      </div>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        spaceBetween={20}
        navigation
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="pb-8"
      >
        {articles.map((article, index) => (
          <SwiperSlide key={index}>
            <div className="mx-2 min-w-[250px] max-w-[300px] md:mx-4 md:min-w-[300px]">
              <Image
                src={article.image}
                alt={article.title}
                className="h-40 w-full rounded-lg object-cover shadow-md md:h-48"
                width={300}
                height={200}
              />
              <p className="mt-2 text-sm font-bold text-gray-900 md:text-base">
                {article.description}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Show All Button */}
      <div className="text-center mt-4">
        <Link href="/news" className="text-[#2aaee2] underline">Show All →</Link>
      </div>
    </div>
  );
};

export default NewsForum;
