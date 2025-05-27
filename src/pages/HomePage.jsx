import HeroSection from '../components/home/HeroSection';
import EcosystemOverview from '../components/home/EcosystemOverview';
import CommunityMetrics from '../components/home/CommunityMetrics';
import LatestNews from '../components/home/LatestNews';
import OnboardingSteps from '../components/home/OnboardingSteps';

const HomePage = () => {
  return (
    <div className="w-full">
      {/* Each section is wrapped with full-screen container */}
      <section id="home" className="full-screen-section">
        <HeroSection />
      </section>
      
      <section id="ecosystem" className="full-screen-section">
        <EcosystemOverview />
      </section>
      
      <section id="metrics" className="full-screen-section">
        <CommunityMetrics />
      </section>
      
      <section id="news" className="full-screen-section">
        <LatestNews />
      </section>
      
      <section id="join" className="full-screen-section">
        <OnboardingSteps />
      </section>
    </div>
  );
};

export default HomePage;