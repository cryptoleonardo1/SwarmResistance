import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

// Import your sections
import HeroSection from './HeroSection';
import EcosystemOverview from './EcosystemOverview';
import CommunityMetrics from './CommunityMetrics';
import OnboardingSteps from './OnboardingSteps';

const SectionManager = ({ activeSection = 'home' }) => {
  const [currentSection, setCurrentSection] = useState(activeSection);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Update section when activeSection prop changes
  useEffect(() => {
    if (activeSection !== currentSection) {
      setIsTransitioning(true);
      
      // Brief delay to sync with warp effect
      setTimeout(() => {
        setCurrentSection(activeSection);
        setIsTransitioning(false);
      }, 50);
    }
  }, [activeSection, currentSection]);

  // Section configuration
  const sections = {
    home: {
      component: <HeroSection />,
      id: 'home'
    },
    ecosystem: {
      component: <EcosystemOverview />,
      id: 'ecosystem'
    },
    metrics: {
      component: <CommunityMetrics />,
      id: 'metrics'
    },
    join: {
      component: <OnboardingSteps />,
      id: 'join'
    }
  };

  return (
    <div className="relative w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          id={currentSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 0.3,
            ease: "easeInOut"
          }}
          className="w-full"
        >
          {sections[currentSection]?.component || sections.home.component}
        </motion.div>
      </AnimatePresence>
      
      {/* Hidden sections for scroll positioning (invisible) */}
      {Object.entries(sections).map(([key, section]) => (
        key !== currentSection && (
          <div
            key={key}
            id={key}
            className="absolute top-0 left-0 w-full h-screen pointer-events-none opacity-0"
            aria-hidden="true"
          />
        )
      ))}
    </div>
  );
};

SectionManager.propTypes = {
  activeSection: PropTypes.string
};

export default SectionManager;