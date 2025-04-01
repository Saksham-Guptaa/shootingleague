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
import EventsSection from "../dashboard/Events";

export default function LandingPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [ranges, setRanges] = useState(rangesData);
  const [selectedRange, setSelectedRange] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const filteredRanges = ranges.filter(
    (range) =>
      range.name.toLowerCase().includes(search.toLowerCase()) ||
      range.address.toLowerCase().includes(search.toLowerCase())
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
      image: "/GSL1.JPG",
      cta: "Learn the mental game",
      url: "https://docs.google.com/forms/d/1M0X1fogAsXitDTiH6eT2PzLTeH6TkARser65F774WYE/viewform?edit_requested=true",
    },
    {
      title: "Aim",
      subtitle: "Precision is everything",
      image: "/GSL2.jpg",
      cta: "Improve your technique",
      url: "https://docs.google.com/forms/d/1M0X1fogAsXitDTiH6eT2PzLTeH6TkARser65F774WYE/viewform?edit_requested=true",
    },
    {
      title: "Breathe",
      subtitle: "Control your breathing, control your shot",
      image: "/GSL3.JPG",
      cta: "Master your breathing",
      url: "https://docs.google.com/forms/d/1M0X1fogAsXitDTiH6eT2PzLTeH6TkARser65F774WYE/viewform?edit_requested=true",
    },
    {
      title: "Shoot",
      subtitle: "Execute with confidence",
      image: "/GSL7.JPG",
      cta: "Perfect your form",
      url: "https://docs.google.com/forms/d/1M0X1fogAsXitDTiH6eT2PzLTeH6TkARser65F774WYE/viewform?edit_requested=true",
    },
    {
      title: "Repeat",
      subtitle: "Consistency builds champions",
      image: "/GSL11.JPG",
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
          <EventsSection />
          {/* <section className="py-16 bg-gray-50">
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
          </section> */}
          <RankingsSection />
          <NewsForum />
          <div className="container mx-auto p-4 max-w-7xl">
            <h1 className="text-4xl font-bold text-center mb-6 text-blue-800">
              Shooting Ranges Finder
            </h1>

            <div className="mb-6">
              <input
                type="text"
                placeholder="Search by name or location..."
                className="border-2 border-blue-300 p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Map section - larger and more prominent */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <h2 className="bg-blue-700 text-white p-3 text-xl font-semibold">
                Location Map
              </h2>
              <div className="h-96 w-full">
                <Map ranges={filteredRanges} selectedRange={selectedRange} />
              </div>
            </div>

            {/* Ranges section - now below the map */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <h2 className="bg-blue-700 text-white p-3 text-xl font-semibold">
                Available Ranges ({filteredRanges.length})
              </h2>

              <div className="p-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredRanges.slice(0, visibleCount).map((range) => (
                    <button
                      key={range.id}
                      onClick={() => setSelectedRange(range)}
                      className={`flex flex-col md:flex-row items-center gap-4 p-4 rounded-lg w-full text-left transition-all duration-200 hover:shadow-md ${
                        selectedRange?.id === range.id
                          ? "bg-blue-50 border-2 border-blue-500"
                          : "bg-gray-50 border border-gray-200"
                      }`}
                    >
                      <img
                        src={range.image}
                        alt={range.name}
                        className="w-full md:w-2/5 h-48 md:h-32 object-cover rounded-lg"
                      />
                      <div className="w-full md:w-3/5 mt-2 md:mt-0">
                        <h3 className="text-xl font-bold text-blue-800">
                          {range.name}
                        </h3>
                        <p className="text-gray-700 mt-1">{range.address}</p>
                        <div className="flex items-center mt-2">
                          <span
                            className={`inline-block w-3 h-3 rounded-full mr-2 ${
                              range.status === "Open"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          ></span>
                          <span
                            className={
                              range.status === "Open"
                                ? "text-green-700"
                                : "text-red-700"
                            }
                          >
                            {range.status}
                          </span>
                          <span className="mx-2">•</span>
                          <span className="text-gray-600">
                            {range.openingHours}
                          </span>
                        </div>
                        <p className="text-green-600 font-semibold mt-2">
                          {range.price}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

                {visibleCount < filteredRanges.length && (
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 3)}
                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-medium w-full transition-colors duration-200"
                  >
                    Load More Ranges
                  </button>
                )}
              </div>
            </div>
          </div>
          <ExecutiveCommittee />
          {/* <MediaSection /> */}
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
