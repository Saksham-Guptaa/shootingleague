import ExecutiveCommittee from "../Components/ExecutiveCommittee";
import Gallery from "../Components/Gallery";
import HeroSection from "../Components/HeroSection";
import NewsForum from "../Components/News";
import PartnersSection from "../Components/PartnersSection";
import RankingsSection from "../Components/RankingSection";
import TeamVictorySection from "../Components/TeamVictorySection";

export default function Home() {
  return (
    <div className="bg-white" >
      <HeroSection/>
      <TeamVictorySection/>
      <RankingsSection/>
      <ExecutiveCommittee/>
      <NewsForum/>
      <Gallery/>
      <PartnersSection/>
    </div>
  );
}
