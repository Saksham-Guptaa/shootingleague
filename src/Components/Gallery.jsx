"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
  "/images/Abhinav.jpg",
  "/news1.png",
  "/news2.png",
  "/news3.png",
  "/news4.png",
  "/news5.png",
  "/news6.png",
  "/news7.png",
  "/news8.png",
  "/news9.png",
];

const Gallery = () => {
  return (
    <div className="bg-gray-100 py-12 md:mx-10 lg:mx-16">
      {/* Title */}
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-blue-600 md:text-6xl lg:text-7xl">
          GALLERY
        </h1>
      </div>

      {/* Two-Row Carousel */}
      <div className="space-y-6">
        {[0, 1].map((row) => (
          <Swiper
            key={row}
            modules={[Autoplay, Navigation]}
            slidesPerView={4}
            spaceBetween={20}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="pb-4"
          >
            {images.slice(row * 5, row * 5 + 5).map((src, index) => (
              <SwiperSlide key={index}>
                <div className="rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={src}
                    alt={`Gallery Image ${index + 1}`}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
