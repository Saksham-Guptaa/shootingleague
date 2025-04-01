import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../supabase/auth";
import InfiniteCarousel from "../dashboard/Infinitemoving";
import Layout from "./Layout";

export default function AboutPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <Layout>
        <main className="pt-16">
          <section className="py-20 bg-blue-700 text-white">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About the Global Shooting League
              </h1>
            </div>
          </section>

          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-10">
                Our Story
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
                <div>
                  <img
                    src="/siteimages/2.JPG"
                    alt="Founding of GSL"
                    className="rounded-lg shadow-md"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">The Beginning</h3>
                  <p className="text-gray-700 mb-4">
                    The Global Shooting League was founded group of passionate
                    shooting sports enthusiasts who saw the need for a unified
                    international platform for competitive shooting.
                  </p>
                  <p className="text-gray-700">
                    What began as a small series of regional competitions has
                    grown into the world's premier shooting sports organization,
                    with events held across six continents and participants from
                    over 80 countries.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
                <div className="order-2 md:order-1">
                  <h3 className="text-xl font-bold mb-4">Our Growth</h3>
                  <p className="text-gray-700 mb-4">
                    We've expanded our reach and impact, establishing
                    partnerships with national shooting federations, equipment
                    manufacturers, and media outlets to elevate the profile of
                    shooting sports globally.
                  </p>
                  <p className="text-gray-700">
                    Today, GSL competitions are recognized as the gold standard
                    in the industry, attracting the world's top talent and
                    setting new benchmarks for excellence in organization and
                    execution.
                  </p>
                </div>
                <div className="order-1 md:order-2">
                  <img
                    src="/siteimages/4.jpg"
                    alt="GSL Growth"
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <img
                    src="/siteimages/3.JPG"
                    alt="GSL Today"
                    className="rounded-lg shadow-md"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">GSL Today</h3>
                  <p className="text-gray-700 mb-4">
                    The Global Shooting League now encompasses multiple
                    disciplines, including rifle, pistol, and shotgun events,
                    with specialized competitions for juniors, seniors, and
                    para-athletes.
                  </p>
                  <p className="text-gray-700">
                    Our commitment to innovation, safety, and inclusivity has
                    made us a leader in the sporting world, and we continue to
                    evolve to meet the needs of our athletes and fans.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="px-6  md:px-16">
            {/* <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            <div className="h-60 w-full overflow-hidden rounded-lg bg-gray-300 shadow-md md:h-80">
              <img
                src="/siteimages/GSL 1 (1).JPG"
                alt="Image"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero
                dignissimos blanditiis, delectus soluta incidunt vel obcaecati
                eveniet quas deserunt quaerat praesentium, debitis cupiditate
                inventore vitae quia ad maiores impedit aperiam excepturi animi!
                Illum cum quos distinctio architecto aut modi inventore eligendi
                molestias atque, a autem accusamus consequatur animi libero
                nesciunt consectetur similique veniam saepe vitae suscipit
                necessitatibus velit id eos vel! Nemo excepturi voluptatibus
                alias possimus, aliquid voluptate, quos repellat dolores modi
                illo deleniti ut dolor consequuntur numquam porro neque cumque
                fugit. Repellendus eveniet voluptates ducimus non saepe, dolores
                officiis sequi iusto quas fuga delectus perferendis tenetur,
                iure, unde laboriosam.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                recusandae earum laudantium porro quo id sunt itaque cum commodi
                in nisi nemo quos eum, dolores possimus minima minus, nulla at
                ad, voluptatem ipsum hic dignissimos. Quos quia omnis placeat
                vitae, magnam ex explicabo? Ipsum vel repellat sint corporis
                eius suscipit laborum totam? Illo ratione consequatur ducimus
                aspernatur, ea voluptate veniam nihil vitae cupiditate, vel aut
                autem laboriosam dolores corporis harum excepturi nulla! Sint
                adipisci iusto corporis ab sequi sed dolorum!
              </p>
            </div>
          </div> */}
          </section>
          {/* Vision, Mission, Value Proposition */}
          <section className="bg-[#001f3f] px-6 py-16 text-white md:px-16">
            <div className="space-y-16 lg:grid lg:grid-cols-1 lg:gap-16 lg:space-y-0">
              {/* Vision */}
              <div className="lg:flex lg:justify-between lg:space-x-8">
                <h2 className="mb-6 text-xl font-bold uppercase lg:mb-0 lg:text-7xl">
                  Vision
                </h2>
                <p className="text-lg leading-relaxed lg:w-1/2">
                  To democratize sports shooting across geographies by infusion
                  of appropriate technology and other innovative ways & means by
                  30 June 2030.
                </p>
              </div>

              {/* Mission */}
              <div className="lg:flex lg:items-start lg:justify-between lg:space-x-8">
                <h2 className="mb-6 text-xl font-bold uppercase lg:mb-0 lg:text-7xl">
                  Mission
                </h2>
                <p className="text-lg leading-relaxed lg:w-1/2">
                  To create an ecosystem to promote sports shooting in general
                  and in India, in particular, by co-opting all the stakeholders
                  viz the shooters, coaches, ranges, OEMs, entrepreneurs,
                  broadcasters, administrators, spectators and other members of
                  the community. To utilize appropriate technological means to
                  create awareness about sports shooting among the masses and
                  aggregate all the interested stakeholders under one platform
                  (Website and App). To create a nursery of young shooters
                  across India and harness the best talent for the country in
                  the sports shooting domain. To create world class sports
                  shooting ranges/infrastructure across the country, and
                  establish centres of excellence in each zone/region. To
                  conduct sports shooting tournaments at various levels, and
                  undertake professional talent management across the board. To
                  facilitate establishment of a manufacturing hub for top of the
                  line sports shooting rifles, pistols, pellets and other
                  equipment under the Make-In-India programme.
                </p>
              </div>
            </div>
          </section>

          <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">
                Our Core Values
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-blue-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Safety</h3>
                  <p className="text-gray-700">
                    We prioritize safety above all else, implementing rigorous
                    protocols and standards at all our events and training
                    programs to ensure a secure environment for participants and
                    spectators alike.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-blue-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Inclusivity</h3>
                  <p className="text-gray-700">
                    We believe that shooting sports should be accessible to all,
                    regardless of background, gender, or ability. Our programs
                    and competitions are designed to welcome and support diverse
                    participation.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-blue-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Excellence</h3>
                  <p className="text-gray-700">
                    We strive for excellence in everything we do, from the
                    organization of our events to the development of our
                    athletes. We set high standards and continuously work to
                    exceed them.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Leadership Team */}
          <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">
                Our Leadership Team
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="mb-4 relative">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Robert"
                      alt="Robert Chen"
                      className="w-40 h-40 rounded-full mx-auto"
                    />
                  </div>
                  <h3 className="text-xl font-bold">Robert Chen</h3>
                  <p className="text-blue-700 mb-2">President</p>
                  <p className="text-gray-600 text-sm">
                    Former Olympic gold medalist with 20+ years of experience in
                    shooting sports administration.
                  </p>
                </div>

                <div className="text-center">
                  <div className="mb-4">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Elena"
                      alt="Elena Petrova"
                      className="w-40 h-40 rounded-full mx-auto"
                    />
                  </div>
                  <h3 className="text-xl font-bold">Elena Petrova</h3>
                  <p className="text-blue-700 mb-2">Vice President</p>
                  <p className="text-gray-600 text-sm">
                    Three-time world champion and advocate for women in shooting
                    sports.
                  </p>
                </div>

                <div className="text-center">
                  <div className="mb-4">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=James"
                      alt="James Wilson"
                      className="w-40 h-40 rounded-full mx-auto"
                    />
                  </div>
                  <h3 className="text-xl font-bold">James Wilson</h3>
                  <p className="text-blue-700 mb-2">Technical Director</p>
                  <p className="text-gray-600 text-sm">
                    Renowned coach and equipment specialist with expertise in
                    competition setup and rules.
                  </p>
                </div>

                <div className="text-center">
                  <div className="mb-4">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha"
                      alt="Aisha Rahman"
                      className="w-40 h-40 rounded-full mx-auto"
                    />
                  </div>
                  <h3 className="text-xl font-bold">Aisha Rahman</h3>
                  <p className="text-blue-700 mb-2">Development Director</p>
                  <p className="text-gray-600 text-sm">
                    Leads our global initiatives to grow participation in
                    shooting sports, especially in developing regions.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-blue-700 text-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">
                Join the Global Shooting League Community
              </h2>
              <p className="text-xl mb-8">
                Whether you're an experienced shooter or just getting started,
                there's a place for you in our global community.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/signup">
                  <button className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-3 rounded-full font-bold text-lg">
                    Sign Up Today
                  </button>
                </Link>
              </div>
            </div>
          </section>
        </main>
      </Layout>
    </div>
  );
}
