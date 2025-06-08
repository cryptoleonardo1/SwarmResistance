import { useState, useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import EcosystemOverview from '../components/home/EcosystemOverview';
import CommunityMetrics from '../components/home/CommunityMetrics';
import OnboardingSteps from '../components/home/OnboardingSteps';

const HomePage = () => {
  const [activeSection, setActiveSection] = useState('home');

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Don't update during warp transitions
      if (document.body.classList.contains('warping')) return;
      
      const sections = ['home', 'ecosystem', 'metrics', 'join'];
      const topBarHeight = 80;
      const scrollPosition = window.scrollY + topBarHeight + 50;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          if (activeSection !== sections[i]) {
            setActiveSection(sections[i]);
            // Dispatch event for TopBar to sync
            window.dispatchEvent(new CustomEvent('sectionChange', { 
              detail: { section: sections[i] } 
            }));
          }
          break;
        }
      }
    };

    // Debounced scroll handler
    let scrollTimeout;
    const debouncedHandleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 50);
    };

    window.addEventListener('scroll', debouncedHandleScroll, { passive: true });
    
    // Initial check after a brief delay to ensure sections are rendered
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [activeSection]);

  // Listen for warp navigation from TopBar
  useEffect(() => {
    const handleWarpNavigation = (event) => {
      const targetSection = event.detail.section;
      
      // Update active section immediately
      setActiveSection(targetSection);
      
      // Add warping class to prevent scroll tracking
      document.body.classList.add('warping');
      
      setTimeout(() => {
        const element = document.getElementById(targetSection);
        if (element) {
          const topBarHeight = 80;
          const elementPosition = element.offsetTop - topBarHeight;
          
          window.scrollTo({
            top: elementPosition,
            behavior: 'instant' // Instant scroll during warp
          });
        }
        
        // Remove warping class after scroll
        setTimeout(() => {
          document.body.classList.remove('warping');
        }, 100);
      }, 400); // Sync with warp peak timing
    };

    window.addEventListener('warpNavigation', handleWarpNavigation);

    return () => {
      window.removeEventListener('warpNavigation', handleWarpNavigation);
    };
  }, []);

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