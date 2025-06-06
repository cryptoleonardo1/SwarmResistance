import HeroSection from '../components/home/HeroSection';
import EcosystemOverview from '../components/home/EcosystemOverview';
import CommunityMetrics from '../components/home/CommunityMetrics';
import OnboardingSteps from '../components/home/OnboardingSteps';

const HomePage = () => {
  return (
    <div className="w-full hide-scrollbar">
      {/* Headquarters - Main Hero Section */}
      <section id="home" className="full-screen-section">
        <HeroSection />
      </section>
      
      {/* Mission Briefing - About the Resistance */}
      <section id="ecosystem" className="full-screen-section">
        <EcosystemOverview />
      </section>
      
      {/* Battle Status - NFT Stats and Metrics */}
      <section id="metrics" className="full-screen-section">
        <CommunityMetrics />
      </section>
      
      {/* Join the Fight - Onboarding Process */}
      <section id="join" className="full-screen-section">
        <OnboardingSteps />
      </section>
    </div>
  );
};

export default HomePage;