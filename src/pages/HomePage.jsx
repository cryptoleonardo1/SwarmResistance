import { useState, useEffect, useRef, useMemo } from 'react';
import HeroSection from '../components/home/HeroSection';
import EcosystemOverview from '../components/home/EcosystemOverview';
import CommunityMetrics from '../components/home/CommunityMetrics';
import OnboardingSteps from '../components/home/OnboardingSteps';

const HomePage = () => {
  // Use sessionStorage to persist navigation state
  const getInitialSection = () => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('targetSection') || 'home';
    }
    return 'home';
  };

  const [activeSection, setActiveSection] = useState(getInitialSection);
  const [isWheelScrolling, setIsWheelScrolling] = useState(false);
  const lastWheelTime = useRef(0);
  const containerRef = useRef(null);
  const isInitialMount = useRef(true);

  // Memoize section order to prevent useEffect dependency issues
  const sectionOrder = useMemo(() => ['home', 'ecosystem', 'metrics', 'join'], []);
  const WHEEL_THROTTLE = 1000;

  // Memoize section titles
  const getSectionTitle = useMemo(() => {
    const titles = {
      home: 'Headquarters',
      ecosystem: 'Missions', 
      metrics: 'Metrics',
      join: 'Recruit'
    };
    return (section) => titles[section] || section;
  }, []);

  // Clear any stored navigation on mount, then check for target
  useEffect(() => {
    if (isInitialMount.current) {
      console.log('Initial mount - checking for target section');
      
      const targetSection = sessionStorage.getItem('targetSection');
      if (targetSection && targetSection !== 'home') {
        console.log('Found target section:', targetSection);
        setActiveSection(targetSection);
        
        // Clear the target after using it
        sessionStorage.removeItem('targetSection');
        
        // Scroll immediately to target section
        setTimeout(() => {
          const element = document.getElementById(targetSection);
          if (element) {
            const topBarHeight = 80;
            const elementPosition = element.offsetTop - topBarHeight;
            console.log('Immediate scroll to:', targetSection, 'Position:', elementPosition);
            
            window.scrollTo({
              top: elementPosition,
              behavior: 'instant'
            });
            
            // CRITICAL: Prevent scroll tracking from interfering
            document.body.classList.add('warping');
            setTimeout(() => {
              document.body.classList.remove('warping');
            }, 2000); // Longer delay to prevent interference
          }
        }, 50);
      }
      
      isInitialMount.current = false;
    }
  }, []);

  // Handle wheel scrolling
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      
      const now = Date.now();
      if (now - lastWheelTime.current < WHEEL_THROTTLE || isWheelScrolling) {
        return;
      }

      const currentIndex = sectionOrder.indexOf(activeSection);
      let nextIndex;

      if (e.deltaY > 0) {
        nextIndex = Math.min(currentIndex + 1, sectionOrder.length - 1);
      } else {
        nextIndex = Math.max(currentIndex - 1, 0);
      }

      if (nextIndex !== currentIndex) {
        lastWheelTime.current = now;
        setIsWheelScrolling(true);
        const targetSection = sectionOrder[nextIndex];
        
        setActiveSection(targetSection);
        document.body.classList.add('warping');
        
        window.dispatchEvent(new CustomEvent('sectionChange', { 
          detail: { section: targetSection } 
        }));

        setTimeout(() => {
          const element = document.getElementById(targetSection);
          if (element) {
            const topBarHeight = 80;
            window.scrollTo({
              top: element.offsetTop - topBarHeight,
              behavior: 'smooth'
            });
          }
          
          setTimeout(() => {
            document.body.classList.remove('warping');
            setIsWheelScrolling(false);
          }, 800);
        }, 50);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [activeSection, isWheelScrolling, sectionOrder]);

  // Listen for warp navigation - STORE TARGET IN sessionStorage
  useEffect(() => {
    const handleWarpNavigation = (event) => {
      const targetSection = event.detail.section;
      console.log('Warp navigation - storing target:', targetSection);
      
      // Store the target section
      sessionStorage.setItem('targetSection', targetSection);
      
      // Set active section immediately
      setActiveSection(targetSection);
      
      // Add warping class for extended period
      document.body.classList.add('warping');
      
      // Dispatch section change immediately
      window.dispatchEvent(new CustomEvent('sectionChange', { 
        detail: { section: targetSection } 
      }));
      
      // Scroll immediately
      setTimeout(() => {
        const element = document.getElementById(targetSection);
        if (element) {
          const topBarHeight = 80;
          const elementPosition = element.offsetTop - topBarHeight;
          console.log('Warp scroll to:', targetSection, 'Position:', elementPosition);
          
          window.scrollTo({
            top: elementPosition,
            behavior: 'instant'
          });
        }
        
        // Keep warping class longer to prevent scroll tracking interference
        setTimeout(() => {
          document.body.classList.remove('warping');
        }, 2000); // 2 seconds
      }, 10);
    };

    window.addEventListener('warpNavigation', handleWarpNavigation);
    return () => window.removeEventListener('warpNavigation', handleWarpNavigation);
  }, []);

  // Simplified scroll tracking - COMPLETELY DISABLE for longer period
  useEffect(() => {
    const handleScroll = () => {
      if (document.body.classList.contains('warping') || isWheelScrolling) {
        console.log('Scroll tracking blocked - warping or wheel scrolling');
        return;
      }
      
      const topBarHeight = 80;
      const scrollPosition = window.scrollY + topBarHeight + 50;

      for (let i = sectionOrder.length - 1; i >= 0; i--) {
        const element = document.getElementById(sectionOrder[i]);
        if (element && element.offsetTop <= scrollPosition) {
          if (activeSection !== sectionOrder[i]) {
            console.log('Scroll-based section change:', sectionOrder[i]);
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
      scrollTimeout = setTimeout(handleScroll, 200); // Increased delay
    };

    // MUCH LONGER delay before enabling scroll tracking
    const setupTimeout = setTimeout(() => {
      console.log('Setting up scroll tracking');
      window.addEventListener('scroll', debouncedHandleScroll, { passive: true });
    }, 3000); // 3 seconds delay

    return () => {
      clearTimeout(setupTimeout);
      clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, [activeSection, isWheelScrolling, sectionOrder]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isWheelScrolling) return;

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
        setIsWheelScrolling(true);
        const targetSection = sectionOrder[nextIndex];
        
        setActiveSection(targetSection);
        document.body.classList.add('warping');
        
        window.dispatchEvent(new CustomEvent('sectionChange', { 
          detail: { section: targetSection } 
        }));

        setTimeout(() => {
          const element = document.getElementById(targetSection);
          if (element) {
            window.scrollTo({
              top: element.offsetTop - 80,
              behavior: 'smooth'
            });
          }
          
          setTimeout(() => {
            document.body.classList.remove('warping');
            setIsWheelScrolling(false);
          }, 800);
        }, 50);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, isWheelScrolling, sectionOrder]);

  console.log('Rendering HomePage with activeSection:', activeSection);

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
              if (!isWheelScrolling && section !== activeSection) {
                setActiveSection(section);
                document.body.classList.add('warping');
                
                window.dispatchEvent(new CustomEvent('warpNavigation', { 
                  detail: { section } 
                }));
              }
            }}
            disabled={isWheelScrolling}
            title={getSectionTitle(section)}
          />
        ))}
      </div>

      {/* Scroll Hint */}
      {activeSection === 'home' && !isWheelScrolling && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 flex flex-col items-center text-stellar-white/60 animate-fade-in-delayed">
          <span className="text-sm font-orbitron mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-stellar-white/30 rounded-full flex justify-center animate-bounce-slow">
            <div className="w-1 h-3 bg-stellar-white/60 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      )}

      {/* Debug info */}
      <div className="fixed top-20 left-4 z-50 bg-black/50 text-white p-2 text-xs">
        Active: {activeSection}
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