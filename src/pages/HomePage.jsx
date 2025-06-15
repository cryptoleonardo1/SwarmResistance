import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import HeroSection from '../components/home/HeroSection';
import EcosystemOverview from '../components/home/EcosystemOverview';
import CommunityMetrics from '../components/home/CommunityMetrics';
import OnboardingSteps from '../components/home/OnboardingSteps';
import MobileSectionNav from '../components/navigation/MobileSectionNav';

const HomePage = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isWheelScrolling, setIsWheelScrolling] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const lastWheelTime = useRef(0);
  const containerRef = useRef(null);

  // Memoize section order to prevent useEffect dependency issues
  const sectionOrder = useMemo(() => ['home', 'ecosystem', 'metrics', 'join'], []);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll to section function
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const topBarHeight = isMobile ? 64 : 80;
      window.scrollTo({
        top: element.offsetTop - topBarHeight,
        behavior: 'smooth'
      });
    }
  }, [isMobile]);

  // Handle section change with scroll
  const handleSectionChange = useCallback((targetSection, smooth = true) => {
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
  }, [scrollToSection]);

  // Mobile section change handler for bottom navigation
  const handleMobileSectionChange = useCallback((targetSection) => {
    if (!isNavigating && activeSection !== targetSection) {
      console.log('Mobile navigation: changing to', targetSection);
      
      // For mobile, just scroll to section smoothly (no warp effect)
      setActiveSection(targetSection);
      
      // Dispatch section change event
      window.dispatchEvent(new CustomEvent('sectionChange', { 
        detail: { section: targetSection } 
      }));
      
      // Smooth scroll to section
      scrollToSection(targetSection);
    }
  }, [isNavigating, activeSection, scrollToSection]);

  // Handle wheel scrolling - Desktop only
  useEffect(() => {
    // Skip wheel handling on mobile - use standard scrolling
    if (isMobile) return;

    const handleWheel = (e) => {
      // Always prevent default scroll behavior on homepage for desktop
      e.preventDefault();
      
      // Don't handle wheel if currently navigating
      if (isNavigating || isWheelScrolling) {
        return;
      }

      // Aggressive throttling - only allow one scroll every 1.5 seconds
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
  }, [activeSection, isWheelScrolling, isNavigating, sectionOrder, isMobile]);

  // Listen for warp navigation from TopBar
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
          const topBarHeight = isMobile ? 64 : 80;
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
      // Cleanup
      document.body.style.overflow = '';
      document.body.classList.remove('warping');
    };
  }, [isMobile, handleSectionChange]);

  // Standard scroll tracking for mobile - works with normal scrolling
  useEffect(() => {
    const handleScroll = () => {
      // Don't track scroll during navigation or wheel scrolling
      if (isNavigating || isWheelScrolling || document.body.classList.contains('warping')) {
        return;
      }
      
      const topBarHeight = isMobile ? 64 : 80;
      const scrollPosition = window.scrollY + topBarHeight + 100;

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

    // Enable scroll tracking for mobile (standard scrolling)
    window.addEventListener('scroll', debouncedHandleScroll, { passive: true });

    return () => {
      clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, [activeSection, isWheelScrolling, isNavigating, sectionOrder, isMobile]);

  // Keyboard navigation - Desktop only
  useEffect(() => {
    // Skip keyboard handling on mobile
    if (isMobile) return;

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
        window.dispatchEvent(new CustomEvent('warpNavigation', { 
          detail: { section: targetSection } 
        }));

        // Clear wheel scrolling flag after hologram transition completes
        setTimeout(() => {
          setIsWheelScrolling(false);
        }, 1500);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, isWheelScrolling, isNavigating, sectionOrder, isMobile]);

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
    <div 
      ref={containerRef} 
      className="w-full hide-scrollbar relative"
    >
      {/* Section Progress Indicator - Desktop Only */}
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

      {/* Mobile Section Navigation - Only show on mobile */}
      {isMobile && (
        <MobileSectionNav
          activeSection={activeSection}
          onSectionChange={handleMobileSectionChange}
          isTransitioning={isNavigating}
        />
      )}
    </div>
  );
};

export default HomePage;