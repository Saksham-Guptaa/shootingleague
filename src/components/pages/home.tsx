import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronRight, Settings, User, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../supabase/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";
import HeroSection from "../dashboard/HeroSeciton";
import rangesData from "../../../public/ranges.json";
import Map from "../dashboard/Map";
import NewsForum from "../dashboard/News";
import Gallery from "../dashboard/Gallery";
import InfiniteCarousel from "../dashboard/Infinitemoving";
import TeamVictorySection from "../dashboard/Victory";
import RankingsSection from "../dashboard/RankingSection";
import Footer from "../dashboard/Footer";
import ExecutiveCommittee from "../dashboard/Team";
import MediaSection from "../dashboard/Fame";
import Layout from "./Layout";

export default function LandingPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [ranges, setRanges] = useState(rangesData);
  const [selectedRange, setSelectedRange] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const filteredRanges = ranges.filter((range) =>
    range.name.toLowerCase().includes(search.toLowerCase())
  );

  // Sample data for rankings
  const mensRankings = [
    { rank: 1, name: "John Smith", country: "USA", score: 598 },
    { rank: 2, name: "Wei Zhang", country: "China", score: 596 },
    { rank: 3, name: "Alexei Petrov", country: "Russia", score: 595 },
    { rank: 4, name: "Rajiv Kumar", country: "India", score: 594 },
    { rank: 5, name: "Hans Mueller", country: "Germany", score: 593 },
  ];

  const womensRankings = [
    { rank: 1, name: "Maria Garcia", country: "Spain", score: 597 },
    { rank: 2, name: "Li Na", country: "China", score: 596 },
    { rank: 3, name: "Sarah Johnson", country: "USA", score: 595 },
    { rank: 4, name: "Aisha Patel", country: "India", score: 594 },
    { rank: 5, name: "Yuki Tanaka", country: "Japan", score: 592 },
  ];

  // Carousel slide data
  const carouselSlides = [
    {
      title: "Focus",
      subtitle: "Clear your mind, set your intention",
      image: "/hero1.png",
      cta: "Learn the mental game",
      url: "https://docs.google.com/forms/d/1M0X1fogAsXitDTiH6eT2PzLTeH6TkARser65F774WYE/viewform?edit_requested=true",
    },
    {
      title: "Aim",
      subtitle: "Precision is everything",
      image: "/hero2.png",
      cta: "Improve your technique",
      url: "https://docs.google.com/forms/d/1M0X1fogAsXitDTiH6eT2PzLTeH6TkARser65F774WYE/viewform?edit_requested=true",
    },
    {
      title: "Breathe",
      subtitle: "Control your breathing, control your shot",
      image: "/hero1.png",
      cta: "Master your breathing",
      url: "https://docs.google.com/forms/d/1M0X1fogAsXitDTiH6eT2PzLTeH6TkARser65F774WYE/viewform?edit_requested=true",
    },
    {
      title: "Shoot",
      subtitle: "Execute with confidence",
      image: "/hero2.png",
      cta: "Perfect your form",
      url: "https://docs.google.com/forms/d/1M0X1fogAsXitDTiH6eT2PzLTeH6TkARser65F774WYE/viewform?edit_requested=true",
    },
    {
      title: "Repeat",
      subtitle: "Consistency builds champions",
      image: "/hero1.png",
      cta: "Join our training program",
      url: "https://docs.google.com/forms/d/1M0X1fogAsXitDTiH6eT2PzLTeH6TkARser65F774WYE/viewform?edit_requested=true",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-white text-black">
        <main>
          {/* Hero Carousel */}
          <section className="relative">
            <Carousel className="w-full">
              <CarouselContent>
                {carouselSlides.map((slide, index) => (
                  <CarouselItem key={index} className="pl-0">
                    <div className="relative h-[80vh] w-full">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slide.image})` }}
                      >
                        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                      </div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                        <h2 className="text-6xl md:text-8xl font-bold tracking-tight mb-4">
                          {slide.title}
                        </h2>
                        <p className="text-xl md:text-2xl mb-8 max-w-2xl text-center">
                          {slide.subtitle}
                        </p>
                        <a
                          href={slide.url}
                          target="_blank"
                          className="bg-blue-700 hover:bg-blue-800 text-white rounded-full px-8 py-6 text-lg"
                        >
                          {slide.cta}
                        </a>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </section>
          {/* <HeroSection /> */}
          <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-10">
                Upcoming Events
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-48 bg-gray-200 relative">
                    <img
                      src="/events/upcoming1.png"
                      alt="World Championship"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-blue-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Jun 15-20
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">
                      World Championship
                    </h3>
                    <p className="text-gray-600 mb-4">Munich, Germany</p>
                    <p className="text-gray-700 mb-4">
                      The premier event of the year featuring the world's top
                      shooters competing for the championship title.
                    </p>
                    <Link
                      to="/events"
                      className="text-blue-600 hover:underline font-medium inline-flex items-center"
                    >
                      Learn more <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-48 bg-gray-200 relative">
                    <img
                      src="/events/upcoming2.png"
                      alt="Asian Cup"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-blue-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Jul 8-12
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">Asian Cup</h3>
                    <p className="text-gray-600 mb-4">Tokyo, Japan</p>
                    <p className="text-gray-700 mb-4">
                      A prestigious competition showcasing the best talent from
                      across Asia in multiple shooting disciplines.
                    </p>
                    <Link
                      to="/events"
                      className="text-blue-600 hover:underline font-medium inline-flex items-center"
                    >
                      Learn more <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-48 bg-gray-200 relative">
                    <img
                      src="/events/upcoming3.png"
                      alt="Junior Championship"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-blue-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Aug 5-8
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">
                      Junior Championship
                    </h3>
                    <p className="text-gray-600 mb-4">Madrid, Spain</p>
                    <p className="text-gray-700 mb-4">
                      The future stars of shooting sports compete in this
                      special event for athletes under 21 years of age.
                    </p>
                    <Link
                      to="/events"
                      className="text-blue-600 hover:underline font-medium inline-flex items-center"
                    >
                      Learn more <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="text-center mt-10">
                <Link to="/events">
                  <Button className="bg-blue-700 hover:bg-blue-800 text-white rounded-full px-6">
                    View All Events
                  </Button>
                </Link>
              </div>
            </div>
          </section>
          <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-10">
                Global Rankings
              </h2>

              <Tabs defaultValue="men" className="max-w-3xl mx-auto">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="men">Men's Rankings</TabsTrigger>
                  <TabsTrigger value="women">Women's Rankings</TabsTrigger>
                </TabsList>

                <TabsContent
                  value="men"
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-blue-700 text-white">
                        <tr>
                          <th className="py-3 px-4 text-left">Rank</th>
                          <th className="py-3 px-4 text-left">Name</th>
                          <th className="py-3 px-4 text-left">Country</th>
                          <th className="py-3 px-4 text-right">Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mensRankings.map((shooter) => (
                          <tr
                            key={shooter.rank}
                            className="border-b border-gray-200 hover:bg-gray-50"
                          >
                            <td className="py-3 px-4 font-medium">
                              {shooter.rank}
                            </td>
                            <td className="py-3 px-4">{shooter.name}</td>
                            <td className="py-3 px-4">{shooter.country}</td>
                            <td className="py-3 px-4 text-right font-medium">
                              {shooter.score}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-4 text-center">
                    <Link
                      to="/shooters"
                      className="text-blue-600 hover:underline font-medium inline-flex items-center"
                    >
                      View full rankings{" "}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </TabsContent>

                <TabsContent
                  value="women"
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-blue-700 text-white">
                        <tr>
                          <th className="py-3 px-4 text-left">Rank</th>
                          <th className="py-3 px-4 text-left">Name</th>
                          <th className="py-3 px-4 text-left">Country</th>
                          <th className="py-3 px-4 text-right">Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {womensRankings.map((shooter) => (
                          <tr
                            key={shooter.rank}
                            className="border-b border-gray-200 hover:bg-gray-50"
                          >
                            <td className="py-3 px-4 font-medium">
                              {shooter.rank}
                            </td>
                            <td className="py-3 px-4">{shooter.name}</td>
                            <td className="py-3 px-4">{shooter.country}</td>
                            <td className="py-3 px-4 text-right font-medium">
                              {shooter.score}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-4 text-center">
                    <Link
                      to="/shooters"
                      className="text-blue-600 hover:underline font-medium inline-flex items-center"
                    >
                      View full rankings{" "}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>
          <RankingsSection />
          <NewsForum />
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
                  Showing {Math.min(visibleCount, filteredRanges.length)} of{" "}
                  {filteredRanges.length} results
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
                      <p>
                        {range.status} • {range.openingHours}
                      </p>
                      <p className="text-green-600 font-semibold">
                        {range.price}
                      </p>
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
          <ExecutiveCommittee />
          <MediaSection />
          <Gallery />
          {/* <TeamVictorySection /> */}
          <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto text-center px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6">
                Our Mission
              </h2>
              <p className="text-lg md:text-2xl text-gray-700 leading-relaxed mb-8">
                To create an ecosystem to promote sports shooting in general and
                in India, in particular, by co-opting all the stakeholders viz
                the shooters, coaches, ranges, OEMs, entrepreneurs,
                broadcasters, administrators, spectators and other members of
                the community. To utilize appropriate technological means to
                create awareness about sports shooting among the masses and
                aggregate all the interested stakeholders under one platform
                (Website and App). To create a nursery of young shooters across
                India and harness the best talent for the country in the sports
                shooting domain. To create world class sports shooting
                ranges/infrastructure across the country, and establish centres
                of excellence in each zone/region. To conduct sports shooting
                tournaments at various levels, and undertake professional talent
                management across the board. To facilitate establishment of a
                manufacturing hub for top of the line sports shooting rifles,
                pistols, pellets and other equipment under the Make-In-India
                programme.
              </p>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
