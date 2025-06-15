import { useState, useEffect, useRef, useMemo } from 'react';
import HeroSection from '../components/home/HeroSection';
import EcosystemOverview from '../components/home/EcosystemOverview';
import CommunityMetrics from '../components/home/CommunityMetrics';
import OnboardingSteps from '../components/home/OnboardingSteps';

const HomePage = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isWheelScrolling, setIsWheelScrolling] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const lastWheelTime = useRef(0);
  const containerRef = useRef(null);
  const navigationTimeout = useRef(null);

  // Memoize section order to prevent useEffect dependency issues
  const sectionOrder = useMemo(() => ['home', 'ecosystem', 'metrics', 'join'], []);
  //const WHEEL_THROTTLE = 1500; // Increased to 1.5 seconds

  // Clear navigation flags after timeout
  const clearNavigationFlag = () => {
    if (navigationTimeout.current) {
      clearTimeout(navigationTimeout.current);
    }
    navigationTimeout.current = setTimeout(() => {
      setIsNavigating(false);
      document.body.classList.remove('warping');
    }, 1500);
  };

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const topBarHeight = 80;
      window.scrollTo({
        top: element.offsetTop - topBarHeight,
        behavior: 'smooth'
      });
    }
  };

  // Handle section change with scroll
  const handleSectionChange = (targetSection, smooth = true) => {
    console.log('Changing section to:', targetSection);
    
    setActiveSection(targetSection);
    
    // Dispatch section change event
    window.dispatchEvent(new CustomEvent('sectionChange', { 
      detail: { section: targetSection } 
    }));

    // Scroll to section
    if (smooth) {
      setTimeout(() => {
        scrollToSection(targetSection);
      }, 50);
    }
  };

  // Handle wheel scrolling - IMMEDIATE RESPONSE WITH NO THROTTLING
  useEffect(() => {
    const handleWheel = (e) => {
      // Always prevent default scroll behavior on homepage
      e.preventDefault();
      
      // Don't handle wheel if currently navigating
      if (isNavigating || isWheelScrolling) {
        return;
      }

      // Much more aggressive throttling - only allow one scroll every 1.5 seconds
      const now = Date.now();
      if (now - lastWheelTime.current < 1500) {
        return;
      }

      const currentIndex = sectionOrder.indexOf(activeSection);
      let nextIndex;

      // Only respond to significant scroll deltas
      if (Math.abs(e.deltaY) < 10) {
        return;
      }

      if (e.deltaY > 0) {
        // Scrolling down - go to next section
        nextIndex = Math.min(currentIndex + 1, sectionOrder.length - 1);
      } else {
        // Scrolling up - go to previous section
        nextIndex = Math.max(currentIndex - 1, 0);
      }

      if (nextIndex !== currentIndex) {
        const targetSection = sectionOrder[nextIndex];
        console.log('Wheel scroll: triggering warp navigation to', targetSection);
        
        lastWheelTime.current = now;
        setIsWheelScrolling(true);
        setIsNavigating(true);
        
        // Immediately block any other scrolling
        document.body.style.overflow = 'hidden';
        
        // Trigger the same warp navigation as top bar clicks
        // This will activate the hologram transition
        window.dispatchEvent(new CustomEvent('warpNavigation', { 
          detail: { section: targetSection } 
        }));

        // Clear flags and restore scrolling after hologram transition completes
        setTimeout(() => {
          setIsWheelScrolling(false);
          setIsNavigating(false);
          document.body.style.overflow = '';
        }, 1500);
      }
    };

    // Add wheel listener to document to catch all scroll events
    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.removeEventListener('wheel', handleWheel);
      // Cleanup - restore scrolling if component unmounts
      document.body.style.overflow = '';
    };
  }, [activeSection, isWheelScrolling, isNavigating, sectionOrder]);

  // Listen for warp navigation from TopBar - ENSURE PROPER SCROLL POSITIONING
  useEffect(() => {
    const handleWarpNavigation = (event) => {
      const targetSection = event.detail.section;
      console.log('Warp navigation to:', targetSection);
      
      // Set navigation state
      setIsNavigating(true);
      
      // Add warping class
      document.body.classList.add('warping');
      
      // Block scrolling during transition
      document.body.style.overflow = 'hidden';
      
      // Change section immediately
      handleSectionChange(targetSection, false); // No smooth scroll for warp
      
      // Force scroll to exact position immediately
      setTimeout(() => {
        const element = document.getElementById(targetSection);
        if (element) {
          const topBarHeight = 80;
          window.scrollTo({
            top: element.offsetTop - topBarHeight,
            behavior: 'auto' // Instant scroll
          });
        }
      }, 10);
      
      // Clear navigation flag and restore scrolling
      setTimeout(() => {
        setIsNavigating(false);
        document.body.classList.remove('warping');
        document.body.style.overflow = '';
      }, 1500);
    };

    window.addEventListener('warpNavigation', handleWarpNavigation);
    return () => {
      window.removeEventListener('warpNavigation', handleWarpNavigation);
      if (navigationTimeout.current) {
        clearTimeout(navigationTimeout.current);
      }
      // Cleanup
      document.body.style.overflow = '';
      document.body.classList.remove('warping');
    };
  }, []);

  // Simplified scroll tracking - only when not navigating
  useEffect(() => {
    const handleScroll = () => {
      // Don't track scroll during navigation or wheel scrolling
      if (isNavigating || isWheelScrolling || document.body.classList.contains('warping')) {
        return;
      }
      
      const topBarHeight = 80;
      const scrollPosition = window.scrollY + topBarHeight + 100; // Increased threshold

      for (let i = sectionOrder.length - 1; i >= 0; i--) {
        const element = document.getElementById(sectionOrder[i]);
        if (element && element.offsetTop <= scrollPosition) {
          if (activeSection !== sectionOrder[i]) {
            console.log('Scroll-based section change to:', sectionOrder[i]);
            setActiveSection(sectionOrder[i]);
            window.dispatchEvent(new CustomEvent('sectionChange', { 
              detail: { section: sectionOrder[i] } 
            }));
          }
          break;
        }
      }
    };

    let scrollTimeout;
    const debouncedHandleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 100);
    };

    // Only enable scroll tracking after a delay
    const setupTimeout = setTimeout(() => {
      window.addEventListener('scroll', debouncedHandleScroll, { passive: true });
    }, 1000);

    return () => {
      clearTimeout(setupTimeout);
      clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, [activeSection, isWheelScrolling, isNavigating, sectionOrder]);

  // Keyboard navigation - TRIGGER HOLOGRAM TRANSITION LIKE TOP NAV
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isWheelScrolling || isNavigating) return;

      const currentIndex = sectionOrder.indexOf(activeSection);
      let nextIndex = currentIndex;

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          nextIndex = Math.min(currentIndex + 1, sectionOrder.length - 1);
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          nextIndex = Math.max(currentIndex - 1, 0);
          break;
        case 'Home':
          e.preventDefault();
          nextIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          nextIndex = sectionOrder.length - 1;
          break;
        default:
          return;
      }

      if (nextIndex !== currentIndex) {
        const targetSection = sectionOrder[nextIndex];
        console.log('Keyboard navigation: triggering warp to', targetSection);
        
        setIsWheelScrolling(true);
        
        // Trigger the same warp navigation as top bar clicks
        // This will activate the hologram transition
        window.dispatchEvent(new CustomEvent('warpNavigation', { 
          detail: { section: targetSection } 
        }));

        // Clear wheel scrolling flag after hologram transition completes
        setTimeout(() => {
          setIsWheelScrolling(false);
        }, 1500); // Match hologram transition duration
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, isWheelScrolling, isNavigating, sectionOrder]);

  // Get section title for progress indicator
  const getSectionTitle = (section) => {
    const titles = {
      home: 'Headquarters',
      ecosystem: 'Mission', 
      metrics: 'Metrics',
      join: 'Recruit'
    };
    return titles[section] || section;
  };

  return (
    <div ref={containerRef} className="w-full hide-scrollbar relative">
      {/* Section Progress Indicator */}
      <div className="fixed top-1/2 right-8 transform -translate-y-1/2 z-50 hidden lg:flex flex-col space-y-4">
        {sectionOrder.map((section) => (
          <button
            key={section}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === section 
                ? 'bg-phoenix-primary shadow-phoenix scale-125' 
                : 'bg-stellar-white/30 hover:bg-stellar-white/60'
            }`}
            onClick={() => {
              if (!isWheelScrolling && !isNavigating && section !== activeSection) {
                console.log('Progress indicator clicked:', section);
                
                // Trigger warp navigation like top bar
                window.dispatchEvent(new CustomEvent('warpNavigation', { 
                  detail: { section } 
                }));
              }
            }}
            disabled={isWheelScrolling || isNavigating}
            title={getSectionTitle(section)}
          />
        ))}
      </div>



      {/* Sections */}
      <section id="home" className="full-screen-section">
        <HeroSection />
      </section>
      
      <section id="ecosystem" className="full-screen-section">
        <EcosystemOverview />
      </section>
      
      <section id="metrics" className="full-screen-section">
        <CommunityMetrics />
      </section>
      
      <section id="join" className="full-screen-section">
        <OnboardingSteps />
      </section>
    </div>
  );
};

export default HomePage;