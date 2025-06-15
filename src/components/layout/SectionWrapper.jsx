import PropTypes from 'prop-types';
import { forwardRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SectionWrapper = forwardRef(({ 
  children, 
  title, 
  subtitle,
  variant = "default", // "default", "phoenix", "resistance"
  isHeroSection = false // New prop to identify hero section
}, ref) => {
  
  const [isMobile, setIsMobile] = useState(false);
  const [particles, setParticles] = useState([]);

  // Detect mobile device and screen size
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Generate fewer particles on mobile for performance
      const particleCount = mobile ? 8 : 20;
      const newParticles = [];
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          delay: i * 0.2,
          duration: 3 + Math.random() * 2
        });
      }
      setParticles(newParticles);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Set CSS custom property for dynamic viewport height
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('resize', setVH);
    };
  }, []);
  
  // Get variant-specific styles
  const getVariantStyles = () => {
    switch (variant) {
      case "phoenix":
        return {
          background: "linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #FF8C00 100%)",
          titleClass: "section-title-phoenix",
          subtitleClass: "text-phoenix-light"
        };
      case "resistance":
        return {
          background: "linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #1E3A8A 100%)",
          titleClass: "text-2xl md:text-4xl lg:text-5xl font-orbitron font-bold text-center mb-4 md:mb-6 text-resistance-light text-shadow-resistance",
          subtitleClass: "text-resistance-light/80"
        };
      default:
        return {
          background: "linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #1A1A2E 100%)",
          titleClass: "text-2xl md:text-4xl lg:text-5xl font-orbitron font-bold text-center mb-4 md:mb-6 text-stellar-white",
          subtitleClass: "text-neutral-light"
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <div 
      ref={ref} 
      className="min-h-screen w-full relative overflow-hidden flex flex-col"
      style={{
        background: variantStyles.background,
        // Use dynamic viewport height for mobile compatibility
        minHeight: 'calc(var(--vh, 1vh) * 100)'
      }}
    >
      {/* Mobile-optimized Background Effects */}
      <div className="absolute inset-0">
        {/* Ambient particles - Responsive count and performance */}
        {particles.map((particle) => (
          <motion.div
            key={`ambient-${particle.id}`}
            className={`absolute w-1 h-1 rounded-full ${
              isMobile ? 'bg-white/15' : 'bg-white/30'
            }`}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Energy grid overlay - Responsive grid size for performance */}
        <div 
          className={`absolute inset-0 ${isMobile ? 'opacity-5' : 'opacity-10'}`}
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: isMobile ? '80px 80px' : '50px 50px'
          }}
        />
      </div>

      {/* Responsive Content container */}
      <div className={`relative z-10 flex-1 flex flex-col ${
        isHeroSection 
          ? 'justify-center items-center min-h-screen px-4 sm:px-6' 
          : 'pt-16 md:pt-20 min-h-screen'
      }`}>
        
        {/* Mobile-first content wrapper */}
        <div className={`${
          isHeroSection 
            ? 'w-full h-full flex flex-col justify-center items-center' 
            : 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center pb-4 md:pb-8'
        }`}>
          
          {/* Section Header with Enhanced Mobile Styling */}
          {title && !isHeroSection && (
            <motion.div 
              className="text-center mb-6 md:mb-8 lg:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className={`${variantStyles.titleClass} relative inline-block px-2 leading-tight`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {title}
                
                {/* Enhanced underline - Responsive width */}
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 h-0.5 md:h-1 rounded-full bg-gradient-to-r from-transparent via-phoenix-primary to-transparent"
                  style={{ 
                    bottom: '-4px',
                    width: isMobile ? '80%' : '100%'
                  }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  viewport={{ once: true }}
                />
              </motion.h2>
              
              {subtitle && (
                <motion.p 
                  className={`mt-4 md:mt-6 lg:mt-8 text-sm md:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed ${variantStyles.subtitleClass} px-2`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  {subtitle}
                </motion.p>
              )}
            </motion.div>
          )}
          
          {/* Section Content with Animation - Responsive container */}
          <motion.div 
            className={`${
              isHeroSection 
                ? 'flex-1 flex flex-col justify-center items-center w-full' 
                : 'flex-1 flex flex-col justify-center w-full'
            }`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: title && !isHeroSection ? 0.7 : 0 }}
            viewport={{ once: true }}
          >
            {children}
          </motion.div>
        </div>
      </div>
      
      {/* Mobile-optimized section transition effect */}
      <div className={`absolute bottom-0 left-0 right-0 ${isMobile ? 'h-16' : 'h-32'} pointer-events-none`}>
        <div className={`absolute inset-0 bg-gradient-to-b from-transparent ${
          isMobile ? 'to-void-primary/30' : 'to-void-primary/50'
        }`} />
        
        {/* Flowing transition particles - Fewer on mobile */}
        {[...Array(isMobile ? 3 : 6)].map((_, i) => (
          <motion.div
            key={`section-transition-${i}`}
            className={`absolute rounded-full ${
              isMobile 
                ? 'w-0.5 h-0.5 bg-phoenix-primary/40' 
                : 'w-1 h-1 bg-phoenix-primary/60'
            }`}
            style={{
              left: `${30 + i * 15}%`,
              bottom: '10px'
            }}
            animate={{
              y: [0, isMobile ? -20 : -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 3,
              delay: i * 0.4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Mobile safe area indicator */}
      {isMobile && (
        <div className="absolute bottom-0 left-0 right-0 h-safe-area-inset-bottom bg-void-primary/20 pointer-events-none" />
      )}
    </div>
  );
});

SectionWrapper.displayName = 'SectionWrapper';

SectionWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  variant: PropTypes.oneOf(["default", "phoenix", "resistance"]),
  isHeroSection: PropTypes.bool
};

export default SectionWrapper;