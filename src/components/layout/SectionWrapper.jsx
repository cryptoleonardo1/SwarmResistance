import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const SectionWrapper = forwardRef(({ 
  children, 
  title, 
  subtitle,
  variant = "default", // "default", "phoenix", "resistance"
  isHeroSection = false // New prop to identify hero section
}, ref) => {
  
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
          titleClass: "text-4xl md:text-5xl font-orbitron font-bold text-center mb-6 text-resistance-light text-shadow-resistance",
          subtitleClass: "text-resistance-light/80"
        };
      default:
        return {
          background: "linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #1A1A2E 100%)",
          titleClass: "text-4xl md:text-5xl font-orbitron font-bold text-center mb-6 text-stellar-white",
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
        background: variantStyles.background
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Ambient particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`ambient-${i}`}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Energy grid overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Content container - fixed positioning */}
      <div className={`relative z-10 flex-1 flex flex-col ${
        isHeroSection 
          ? 'justify-center items-center min-h-screen' 
          : 'pt-20 md:pl-64 min-h-screen' // Exactly 80px for top bar
      }`}>
        <div className={`${
          isHeroSection 
            ? 'w-full h-full flex flex-col justify-center items-center px-4' 
            : 'w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center pb-4' // Added pb-4 to prevent overflow
        }`}>
          {/* Section Header with Enhanced Styling */}
          {title && !isHeroSection && (
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className={`${variantStyles.titleClass} relative inline-block`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {title}
                
                {/* Single enhanced underline directly below title */}
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 h-1 rounded-full bg-gradient-to-r from-transparent via-phoenix-primary to-transparent"
                  style={{ 
                    bottom: '-8px',
                    width: '120%' // Slightly wider than title for better visual effect
                  }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1.2, delay: 0.8 }}
                  viewport={{ once: true }}
                />
              </motion.h2>
              
              {subtitle && (
                <motion.p 
                  className={`mt-8 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${variantStyles.subtitleClass}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  {subtitle}
                </motion.p>
              )}
            </motion.div>
          )}
          
          {/* Section Content with Animation */}
          <motion.div 
            className={`${
              isHeroSection 
                ? 'flex-1 flex flex-col justify-center items-center' 
                : 'flex-1 flex flex-col justify-center'
            }`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: title && !isHeroSection ? 0.9 : 0 }}
            viewport={{ once: true }}
          >
            {children}
          </motion.div>
        </div>
      </div>
      
      {/* Section transition effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-void-primary/50" />
        
        {/* Flowing transition particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`section-transition-${i}`}
            className="absolute w-1 h-1 rounded-full bg-phoenix-primary/60"
            style={{
              left: `${20 + i * 12}%`,
              bottom: '20px'
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 4,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
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