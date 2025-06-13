import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

// Import your sections
import HeroSection from './HeroSection';
import EcosystemOverview from './EcosystemOverview';
import CommunityMetrics from './CommunityMetrics';
import OnboardingSteps from './OnboardingSteps';

const SectionManager = ({ activeSection = 'home', isTransitioning = false }) => {
  const [currentSection, setCurrentSection] = useState(activeSection);
  const [transitionDirection, setTransitionDirection] = useState('down');

  // Update section when activeSection prop changes
  useEffect(() => {
    if (activeSection !== currentSection) {
      // Determine transition direction
      const sectionOrder = ['home', 'ecosystem', 'metrics', 'join'];
      const currentIndex = sectionOrder.indexOf(currentSection);
      const nextIndex = sectionOrder.indexOf(activeSection);
      
      setTransitionDirection(nextIndex > currentIndex ? 'down' : 'up');
      setCurrentSection(activeSection);
    }
  }, [activeSection, currentSection]);

  // Section configuration with enhanced transitions
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

  // Enhanced transition variants
  const transitionVariants = {
    initial: (direction) => ({
      y: direction === 'down' ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95
    }),
    animate: {
      y: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      y: direction === 'down' ? '-100%' : '100%',
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait" custom={transitionDirection}>
        <motion.div
          key={currentSection}
          id={currentSection}
          custom={transitionDirection}
          variants={transitionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ 
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth feel
            opacity: { duration: 0.4 },
            scale: { duration: 0.6 }
          }}
          className="absolute inset-0 w-full h-full"
        >
          {sections[currentSection]?.component || sections.home.component}
        </motion.div>
      </AnimatePresence>
      
      {/* Transition overlay effect */}
      <AnimatePresence>
        {isTransitioning && (
          <>
            {/* Subtle grid overlay during transition */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255, 140, 0, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255, 140, 0, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}
            />
            
            {/* Energy pulse effect */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.3 }}
              exit={{ scale: 1.5, opacity: 0 }}
              className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center"
            >
              <div 
                className="w-32 h-32 rounded-full border-2 border-phoenix-primary"
                style={{
                  boxShadow: '0 0 50px rgba(255, 140, 0, 0.5)'
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Hidden sections for accessibility - Fixed: removed unused variable */}
      {Object.entries(sections).map(([key]) => (
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
  activeSection: PropTypes.string,
  isTransitioning: PropTypes.bool
};

export default SectionManager;