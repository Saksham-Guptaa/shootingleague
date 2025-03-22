"use client";
import PartnersSection from "../../Components/PartnersSection";
import React from "react";

const Page = () => {
  return (
    <>
      <div className="font-sans min-h-screen bg-white text-black">
        <header className="bg-white px-6 py-10 text-center md:px-16 md:text-left">
          <h1 className="text-4xl font-bold uppercase leading-tight md:text-7xl 2xl:text-9xl">
            ABOUT GLOBAL SHOOTING LEAGUE
          </h1>
        </header>

        {/* Content Section */}
        <section className="px-6 py-10 md:px-16">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            {/* Image Section */}
            <div className="h-60 w-full overflow-hidden rounded-lg bg-gray-300 shadow-md md:h-80">
              <img
                src="/siteimages/GSL 1 (1).JPG"
                alt="Image"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Text Content */}
            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero dignissimos blanditiis, delectus soluta incidunt vel obcaecati eveniet quas deserunt quaerat praesentium, debitis cupiditate inventore vitae quia ad maiores impedit aperiam excepturi animi! Illum cum quos distinctio architecto aut modi inventore eligendi molestias atque, a autem accusamus consequatur animi libero nesciunt consectetur similique veniam saepe vitae suscipit necessitatibus velit id eos vel! Nemo excepturi voluptatibus alias possimus, aliquid voluptate, quos repellat dolores modi illo deleniti ut dolor consequuntur numquam porro neque cumque fugit. Repellendus eveniet voluptates ducimus non saepe, dolores officiis sequi iusto quas fuga delectus perferendis tenetur, iure, unde laboriosam.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia recusandae earum laudantium porro quo id sunt itaque cum commodi in nisi nemo quos eum, dolores possimus minima minus, nulla at ad, voluptatem ipsum hic dignissimos. Quos quia omnis placeat vitae, magnam ex explicabo? Ipsum vel repellat sint corporis eius suscipit laborum totam? Illo ratione consequatur ducimus aspernatur, ea voluptate veniam nihil vitae cupiditate, vel aut autem laboriosam dolores corporis harum excepturi nulla! Sint adipisci iusto corporis ab sequi sed dolorum!
              </p>
            </div>
          </div>
        </section>

        {/* Why Nebula Accelerator */}
        {/* <section className="bg-gray-50 px-6 py-10 md:px-16">
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
            <h2 className="text-4xl font-bold uppercase">
              Why Nebula Accelerator?
            </h2>
            <ul className="list-disc space-y-4 pl-6 text-lg leading-relaxed">
              <li>Experienced mentors to polish your ideas.</li>
              <li>
                Industry-wide mentors spanning academics, technology, and more.
              </li>
              <li>
                Established promoters with decades of experience help you
                network.
              </li>
              <li>
                Platforms to publish and promote your startup branding stories.
              </li>
              <li>
                Blockchain system ensures complete transparency and trust.
              </li>
              <li>
                Connect with local incubation centers to conceive your ideas.
              </li>
              <li>
                Modern infrastructure with 3D printing, AV, and conferencing.
              </li>
              <li>
                Bridges startups in tier-2 and tier-3 cities with incubation
                centers.
              </li>
              <li>Save time, resources, and money as a founder.</li>
            </ul>
          </div>
        </section> */}

        {/* Vision, Mission, Value Proposition */}
        <section className="bg-[#001f3f] px-6 py-16 text-white md:px-16">
          <div className="space-y-16 lg:grid lg:grid-cols-1 lg:gap-16 lg:space-y-0">
            {/* Vision */}
            <div className="lg:flex lg:justify-between lg:space-x-8">
              <h2 className="mb-6 text-xl font-bold uppercase lg:mb-0 lg:text-7xl">
                Vision
              </h2>
              <p className="text-lg leading-relaxed lg:w-1/2">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi atque quibusdam nihil deserunt assumenda. Nostrum facilis, repudiandae minima harum, voluptatem fuga molestiae, impedit esse itaque sed placeat fugit atque ullam.
              </p>
            </div>

            {/* Mission */}
            <div className="lg:flex lg:items-start lg:justify-between lg:space-x-8">
              <h2 className="mb-6 text-xl font-bold uppercase lg:mb-0 lg:text-7xl">
                Mission
              </h2>
              <p className="text-lg leading-relaxed lg:w-1/2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi atque quibusdam nihil deserunt assumenda. Nostrum facilis, repudiandae minima harum, voluptatem fuga molestiae, impedit esse itaque sed placeat fugit atque ullam.

              </p>
            </div>
          </div>
        </section>    

        <section>
            {/* <PartnersSection/> */}
        </section>
      </div>
    </>
  );
};

export default Page;
