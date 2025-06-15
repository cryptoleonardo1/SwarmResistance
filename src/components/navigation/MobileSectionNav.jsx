import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

// Section navigation icons - futuristic gaming style
const SectionIcons = {
  home: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="2" fill="currentColor"/>
    </svg>
  ),
  ecosystem: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" stroke="currentColor" strokeWidth="2" fill="none"/>
      <polygon points="12,6 18,9.5 18,14.5 12,18 6,14.5 6,9.5" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="12" cy="12" r="2" fill="currentColor"/>
    </svg>
  ),
  metrics: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M7 8V16M12 10V16M17 6V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="7" cy="8" r="1" fill="currentColor"/>
      <circle cx="12" cy="10" r="1" fill="currentColor"/>
      <circle cx="17" cy="6" r="1" fill="currentColor"/>
    </svg>
  ),
  join: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 21V19C16 17.9 15.1 17 14 17H5C3.9 17 3 17.9 3 19V21" stroke="currentColor" strokeWidth="2"/>
      <circle cx="8.5" cy="9" r="4" stroke="currentColor" strokeWidth="2"/>
      <path d="M20 8V14L17 11L20 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="1" fill="currentColor"/>
    </svg>
  )
};

const MobileSectionNav = ({ activeSection, onSectionChange, isTransitioning }) => {
  // Section items for mobile navigation
  const sectionItems = [
    { 
      id: 'home', 
      name: 'HQ', 
      fullName: 'Headquarters',
      icon: <SectionIcons.home />,
      color: '#FF8C00' // Phoenix primary
    },
    { 
      id: 'ecosystem', 
      name: 'Mission', 
      fullName: 'Mission Brief',
      icon: <SectionIcons.ecosystem />,
      color: '#3B82F6' // Resistance light
    },
    { 
      id: 'metrics', 
      name: 'Intel', 
      fullName: 'Battle Intel',
      icon: <SectionIcons.metrics />,
      color: '#22C55E' // Energy green
    },
    { 
      id: 'join', 
      name: 'Recruit', 
      fullName: 'Join Forces',
      icon: <SectionIcons.join />,
      color: '#8B5CF6' // Energy purple
    },
  ];

  const handleSectionClick = (sectionId) => {
    if (!isTransitioning && activeSection !== sectionId && onSectionChange) {
      console.log('Mobile nav clicked:', sectionId);
      onSectionChange(sectionId);
    }
  };

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }} // Reduced duration and delay
    >
      {/* Glassmorphic background - Optimized */}
      <div 
        className="relative"
        style={{
          background: 'rgba(15, 15, 35, 0.98)', // Increased opacity for better visibility
          backdropFilter: 'blur(16px)', // Reduced blur for performance
          WebkitBackdropFilter: 'blur(16px)',
          borderTop: '1px solid rgba(255, 140, 0, 0.3)', // Slightly more visible border
          boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.5)' // Stronger shadow for better contrast
        }}
      >
        {/* Simplified energy line at top - Static for performance */}
        <div
          className="absolute top-0 left-0 w-full h-0.5 opacity-60"
          style={{
            background: 'linear-gradient(to right, transparent, rgba(255, 140, 0, 0.8), transparent)'
          }}
        />
        
        {/* Navigation items */}
        <div className="flex items-center justify-around py-3 px-4"> {/* Increased padding */}
          {sectionItems.map((item) => {
            const isActive = activeSection === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => handleSectionClick(item.id)}
                disabled={isTransitioning}
                className={`flex flex-col items-center justify-center min-w-0 py-2 px-3 rounded-lg transition-all duration-200 ${
                  isTransitioning ? 'opacity-50 cursor-not-allowed' : ''
                } ${isActive ? 'scale-105' : 'active:scale-95'}`} // Simplified hover/active states
                style={{
                  backgroundColor: isActive ? `${item.color}20` : 'transparent', // More visible active background
                  color: isActive ? item.color : '#9CA3AF',
                  minHeight: '56px', // Larger touch-friendly area
                  minWidth: '56px'
                }}
                whileTap={{ scale: isTransitioning ? 1 : 0.95 }}
                transition={{ duration: 0.1 }} // Faster transitions
              >
                {/* Icon with simplified glow effect */}
                <motion.div
                  className="relative mb-1"
                  style={{
                    filter: isActive ? `drop-shadow(0 0 6px ${item.color}60)` : 'none' // Simpler drop shadow
                  }}
                >
                  {item.icon}
                  
                  {/* Simplified active indicator - Static ring for performance */}
                  {isActive && (
                    <div
                      className="absolute inset-0 rounded-full border border-current opacity-20"
                      style={{ transform: 'scale(1.2)' }}
                    />
                  )}
                </motion.div>
                
                {/* Text label */}
                <span 
                  className={`text-xs font-orbitron font-medium transition-colors duration-200 ${
                    isActive ? 'font-bold' : ''
                  }`}
                  style={{
                    textShadow: isActive ? `0 0 6px ${item.color}40` : 'none' // Subtle text shadow
                  }}
                >
                  {item.name}
                </span>
                
                {/* Simplified active underline - Static for performance */}
                {isActive && (
                  <div
                    className="absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 rounded-full transition-all duration-200"
                    style={{
                      backgroundColor: item.color,
                      width: '60%',
                      boxShadow: `0 0 6px ${item.color}60`
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
        
        {/* Simplified bottom accent lights - Static for performance */}
        <div className="absolute bottom-2 left-4 w-1 h-1 rounded-full bg-phoenix-primary opacity-60" />
        <div className="absolute bottom-2 right-4 w-1 h-1 rounded-full bg-resistance-light opacity-60" />
      </div>
      
      {/* Safe area padding for devices with home indicator */}
      <div 
        className="bg-void-primary"
        style={{ 
          height: 'env(safe-area-inset-bottom, 0px)',
          minHeight: '8px' // Fallback for older devices
        }} 
      />
    </motion.div>
  );
};

MobileSectionNav.propTypes = {
  activeSection: PropTypes.string.isRequired,
  onSectionChange: PropTypes.func.isRequired,
  isTransitioning: PropTypes.bool
};

export default MobileSectionNav;