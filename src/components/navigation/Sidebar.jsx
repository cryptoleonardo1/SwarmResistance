import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, ShoppingBag, Sword, Book, Bot, Gem } from 'lucide-react';
import PropTypes from 'prop-types';

// Fire Particle Component
const FireParticle = ({ delay, startX, size = 1 }) => {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${startX}%`,
        bottom: '-10px',
        width: `${4 * size}px`,
        height: `${8 * size}px`,
      }}
      initial={{ opacity: 0, y: 0, scale: 0.8 }}
      animate={{
        opacity: [0, 1, 1, 0.8, 0],
        y: [0, -window.innerHeight * 0.4], // Only go up 1/3 of sidebar height
        scale: [0.8, size, size * 1.2, 0],
        x: [0, Math.random() * 20 - 10, Math.random() * 30 - 15],
      }}
      transition={{
        duration: 4 + Math.random() * 1, // Shorter duration since particles travel less distance
        delay: delay,
        repeat: Infinity,
        ease: "easeOut"
      }}
    >
      {/* Main fire particle */}
      <div
        className="w-full h-full rounded-full"
        style={{
          background: 'linear-gradient(to top, #FF8C00, #FFB84D, #FFAA1A)',
          filter: 'blur(0.5px)',
          boxShadow: '0 0 8px rgba(255, 140, 0, 0.8)'
        }}
      />
      
      {/* Inner white-hot core */}
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-1/3 rounded-full"
        style={{
          background: 'linear-gradient(to top, rgba(255, 255, 255, 0.9), rgba(255, 220, 77, 0.7))',
          filter: 'blur(0.3px)'
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

// Add PropTypes for FireParticle
FireParticle.propTypes = {
  delay: PropTypes.number.isRequired,
  startX: PropTypes.number.isRequired,
  size: PropTypes.number
};

// Fire Effect Generator
const FireEffect = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      // Generate particles along the sidebar width
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          delay: Math.random() * 6,
          startX: 5 + Math.random() * 90, // Spread across sidebar width
          size: 0.6 + Math.random() * 0.8,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
    
    // Regenerate particles periodically for continuous effect
    const interval = setInterval(generateParticles, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <FireParticle
          key={particle.id}
          delay={particle.delay}
          startX={particle.startX}
          size={particle.size}
        />
      ))}
      
      {/* Additional flowing energy streams - limited to bottom 1/3 */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`stream-${i}`}
          className="absolute opacity-40"
          style={{
            left: `${15 + i * 20}%`,
            bottom: '0px',
            width: '2px',
            height: '60px',
            background: 'linear-gradient(to top, transparent, var(--phoenix-primary), var(--phoenix-light), transparent)',
            filter: 'blur(1px)'
          }}
          animate={{
            y: [0, -window.innerHeight * 0.35], // Limited to bottom 1/3
            opacity: [0, 0.6, 0.8, 0.4, 0],
            scaleY: [1, 1.2, 0.8, 0]
          }}
          transition={{
            duration: 5, // Shorter duration
            delay: i * 1.5,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
      
      {/* Ember particles - also limited to bottom area */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`ember-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${10 + Math.random() * 80}%`,
            bottom: '0px',
            background: '#FFAA1A',
            boxShadow: '0 0 4px rgba(255, 170, 26, 0.8)'
          }}
          animate={{
            y: [0, -window.innerHeight * 0.4], // Limited to bottom 1/3
            opacity: [0, 1, 1, 0.6, 0],
            scale: [0.5, 1, 0.5],
            x: [0, Math.random() * 40 - 20]
          }}
          transition={{
            duration: 6 + Math.random() * 2, // Shorter duration
            delay: i * 0.8,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

const Sidebar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Updated navigation items
  const navItems = [
    { icon: <User size={24} />, text: 'Profile', path: '/profile' },
    { icon: <Sword size={24} />, text: 'Join Resistance', path: '/join-resistance' },
    { icon: <ShoppingBag size={24} />, text: 'Marketplace', path: '/marketplace' },
    { icon: <Gem size={24} />, text: 'Lore', path: '/story' },
    { icon: <Book size={24} />, text: 'Blog', path: '/blog' },
    { icon: <Bot size={24} />, text: 'AI Commander', path: '/ai-commander' },
  ];

  // Social icons with enhanced Phoenix styling
  const socialIcons = [
    { 
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-.38.24-1.09.76-.98.7-1.96 1.99-2.07 2.04-.17.08-.49.05-.49.05s-.69-.23-.69-.23s-.43-.27-.43-.27s-.63-.39-.63-.39c.91-.59 2.66-1.7 2.66-1.7s.18-.14.35-.21c.16-.06.43-.12.43-.12s.18-.04.33-.04.30.04.30.04.12 0 .23.06c.11.05.24.15.24.15l3.5 2.4s.64.43.64 1.03z"/>
        </svg>
      ), 
      link: '#', 
      label: 'Telegram',
      color: 'hover:text-resistance-light'
    },
    { 
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.736-8.84L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ), 
      link: '#', 
      label: 'X (Twitter)',
      color: 'hover:text-phoenix-primary'
    },
  ];

  const handleNavClick = (path) => {
    navigate(path);
  };

  return (
    <motion.aside 
      className="fixed hidden md:flex md:flex-col w-64 h-full z-40"
      style={{
        background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.1) 0%, rgba(26, 26, 46, 0.15) 50%, rgba(15, 15, 35, 0.1) 100%)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRight: '1px solid rgba(255, 140, 0, 0.1)',
      }}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Fire Effect Background */}
      <FireEffect />
      
      {/* Logo Section with enhanced styling */}
      <motion.div 
        className="flex justify-center items-center h-16 border-b relative z-10"
        style={{
          borderColor: 'rgba(255, 140, 0, 0.2)'
        }}
        whileHover={{ 
          boxShadow: "0 5px 15px -5px rgba(255,140,0,0.3)",
          borderColor: "rgba(255,140,0,0.4)"
        }}
      >
        <motion.img 
          src="/logo.png" 
          alt="Swarm Resistance Logo" 
          className="w-36" 
          whileHover={{ 
            scale: 1.05,
            filter: "drop-shadow(0 0 12px rgba(255,140,0,0.6))"
          }}
        />
      </motion.div>
      
      {/* Navigation Links with holographic effects */}
      <nav className="mt-6 px-3 flex-grow relative z-10">
        {navItems.map((item, index) => (
          <motion.div
            key={index} 
            className={`relative overflow-hidden group cursor-pointer rounded-lg mb-2 transition-all duration-300 ${
              location.pathname === item.path 
                ? 'text-phoenix-primary' 
                : 'text-stellar-white' // Changed from text-neutral-light to text-stellar-white
            }`}
            style={{
              backgroundColor: location.pathname === item.path 
                ? 'rgba(255, 140, 0, 0.15)' 
                : 'transparent',
              borderLeft: location.pathname === item.path 
                ? '3px solid #FF8C00' 
                : '3px solid transparent'
            }}
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => handleNavClick(item.path)}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 0 15px rgba(255,140,0,0.2)"
            }}
          >
            {/* Holographic background effect */}
            {hoveredItem === index && (
              <motion.div 
                className="absolute inset-0 rounded-lg"
                style={{
                  background: 'linear-gradient(90deg, rgba(255, 140, 0, 0.1) 0%, rgba(255, 140, 0, 0.2) 50%, rgba(255, 140, 0, 0.1) 100%)',
                }}
                layoutId="hoverBackground"
                initial={{ opacity: 0, x: -100 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
              />
            )}
            
            <motion.div 
              className="relative flex items-center p-4"
              whileHover={{ x: 6 }}
              transition={{ duration: 0.2 }}
            >
              {/* Icon with enhanced animations */}
              <motion.div
                className="relative"
                whileHover={{ 
                  scale: 1.2,
                  rotate: [0, -8, 8, -8, 0]
                }}
                transition={{ 
                  duration: 0.6,
                  rotate: { duration: 0.8, ease: "easeInOut" }
                }}
              >
                {item.icon}
                
                {/* Energy particle orbit around icon */}
                {hoveredItem === index && (
                  <motion.div 
                    className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full"
                    style={{
                      background: '#FF8C00',
                      boxShadow: '0 0 6px rgba(255, 140, 0, 0.8)'
                    }}
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    transformTemplate={({ rotate }) => 
                      `translate(-50%, -50%) rotate(${rotate}) translateX(20px) rotate(${-rotate})`
                    }
                  />
                )}
              </motion.div>
              
              <span className={`ml-4 text-lg font-orbitron font-medium transition-all duration-300 ${
                location.pathname === item.path 
                  ? 'text-phoenix-primary' 
                  : 'group-hover:text-phoenix-light text-stellar-white' // Added text-stellar-white
              }`}
              style={{
                textShadow: location.pathname === item.path 
                  ? '0 0 8px rgba(255, 140, 0, 0.6)' 
                  : 'none'
              }}
              >
                {item.text}
              </span>
              
              {/* Active indicator */}
              {location.pathname === item.path && (
                <motion.div
                  className="absolute right-3 w-2 h-2 rounded-full"
                  style={{
                    background: '#FF8C00',
                    boxShadow: '0 0 8px rgba(255, 140, 0, 0.8)'
                  }}
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
            </motion.div>
          </motion.div>
        ))}
      </nav>
      
      {/* Enhanced Social Media Section */}
      <div className="border-t pt-6 mt-auto mb-8 px-4 relative z-10"
        style={{
          borderColor: 'rgba(255, 140, 0, 0.2)'
        }}
      >
        <motion.div 
          className="text-center mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm font-orbitron text-stellar-white uppercase tracking-wide font-medium">
            Join the Resistance
          </p>
        </motion.div>
        
        <div className="flex justify-center space-x-6">
          {socialIcons.map((item, index) => (
            <motion.a 
              key={index} 
              href={item.link} 
              className={`text-stellar-white ${item.color} transition-all duration-300 p-3 rounded-lg relative bg-phoenix-primary/5`}
              title={item.label}
              whileHover={{ 
                scale: 1.3, 
                rotate: [0, -10, 10, -10, 0],
                boxShadow: "0 0 15px rgba(255,140,0,0.4)"
              }}
              transition={{ 
                duration: 0.5,
                rotate: { duration: 0.8, ease: "easeInOut" }
              }}
            >
              {item.icon}
              
              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 rounded-lg -z-10 bg-phoenix-primary/20"
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.a>
          ))}
        </div>
        
        {/* Enhanced Resistance motto - Much Larger */}
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <p 
            className="text-lg font-orbitron italic font-bold tracking-wide text-phoenix-primary"
            style={{
              textShadow: '0 0 12px rgba(255, 140, 0, 0.8)'
            }}
          >
            "United We Rise"
          </p>
        </motion.div>
      </div>
      
      {/* Ambient energy border effect */}
      <motion.div
        className="absolute top-0 right-0 w-0.5 h-full"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(255, 140, 0, 0.5), transparent)'
        }}
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Corner accent lights */}
      <motion.div
        className="absolute top-4 right-4 w-2 h-2 rounded-full"
        style={{
          background: '#FF8C00',
          boxShadow: '0 0 8px rgba(255, 140, 0, 0.8)'
        }}
        animate={{
          opacity: [0.4, 1, 0.4],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full"
        style={{
          background: '#60A5FA',
          boxShadow: '0 0 6px rgba(96, 165, 250, 0.8)'
        }}
        animate={{
          opacity: [0.4, 1, 0.4],
          scale: [1, 1.3, 1]
        }}
        transition={{
          duration: 2.5,
          delay: 1,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.aside>
  );
};

export default Sidebar;