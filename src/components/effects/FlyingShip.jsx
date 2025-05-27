import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const FlyingShip = ({ 
  delay = 0, 
  speed = 15, 
  yPosition = "20%", 
  size = "64px",
  direction = "ltr", // ltr (left to right) or rtl (right to left)
  color = "#FF0000" // Rocket accent color (for fins and nose cone)
}) => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Calculate animation properties based on direction and window size
  const startX = direction === 'ltr' ? -100 : windowSize.width + 100;
  const endX = direction === 'ltr' ? windowSize.width + 100 : -100;
  
  // Custom variants for the ship animation
  const shipVariants = {
    initial: { 
      x: startX,
      opacity: 0 
    },
    animate: { 
      x: endX,
      opacity: 1,
      transition: { 
        x: {
          duration: windowSize.width / (speed * 10), // Adjust duration based on screen width and speed
          repeat: Infinity,
          ease: "linear",
          delay: delay / 1000 // Convert ms to seconds for framer-motion
        },
        opacity: {
          duration: 0.5,
          delay: delay / 1000
        }
      }
    }
  };
  
  // Floating animation applied separately
  const floatVariants = {
    initial: { y: 0 },
    animate: { 
      y: [0, -10, 0, -5, 0], 
      transition: { 
        duration: 4, 
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  // Create two separate SVGs for each direction to avoid transform issues
  // This ensures correct rendering in both directions
  const RocketRight = () => (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 200 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="60" y="30" width="120" height="40" rx="20" fill="#E0E0E0" />
      <rect x="60" y="35" width="120" height="30" rx="15" fill="#F5F5F5" />
      <path d="M180 30 L200 50 L180 70 Z" fill={color} />
      <circle cx="100" cy="50" r="15" fill="#00AAFF" />
      <circle cx="100" cy="50" r="10" fill="#33BBFF" />
      <path d="M60 30 L30 20 L30 40 L60 40 Z" fill={color} />
      <path d="M60 70 L30 60 L30 80 L60 60 Z" fill={color} />
      <rect x="55" y="35" width="5" height="30" fill="#AAAAAA" />
      <rect x="50" y="35" width="5" height="30" fill="#CCCCCC" />
      <g>
        <path
          d="M50 35 L20 50 L50 65"
          fill="#FF9900"
          stroke="#FF9900"
          strokeWidth="2"
        >
          <animate 
            attributeName="d" 
            values="M50 35 L20 50 L50 65;M50 38 L10 50 L50 62;M50 35 L20 50 L50 65" 
            dur="0.5s" 
            repeatCount="indefinite" 
          />
          <animate 
            attributeName="opacity" 
            values="1;0.8;1" 
            dur="0.5s" 
            repeatCount="indefinite" 
          />
        </path>
        <path
          d="M50 40 L25 50 L50 60"
          fill="#FFCC00"
          stroke="#FFCC00"
          strokeWidth="1"
        >
          <animate 
            attributeName="d" 
            values="M50 40 L25 50 L50 60;M50 42 L15 50 L50 58;M50 40 L25 50 L50 60" 
            dur="0.3s" 
            repeatCount="indefinite" 
          />
          <animate 
            attributeName="opacity" 
            values="1;0.9;1" 
            dur="0.3s" 
            repeatCount="indefinite" 
          />
        </path>
        <path
          d="M50 45 L35 50 L50 55"
          fill="#FFFFFF"
          stroke="#FFFF00"
          strokeWidth="0.5"
        >
          <animate 
            attributeName="d" 
            values="M50 45 L35 50 L50 55;M50 47 L30 50 L50 53;M50 45 L35 50 L50 55" 
            dur="0.2s" 
            repeatCount="indefinite" 
          />
          <animate 
            attributeName="opacity" 
            values="1;0.9;1" 
            dur="0.2s" 
            repeatCount="indefinite" 
          />
        </path>
      </g>
    </svg>
  );
  
  const RocketLeft = () => (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 200 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="20" y="30" width="120" height="40" rx="20" fill="#E0E0E0" />
      <rect x="20" y="35" width="120" height="30" rx="15" fill="#F5F5F5" />
      <path d="M20 30 L0 50 L20 70 Z" fill={color} />
      <circle cx="100" cy="50" r="15" fill="#00AAFF" />
      <circle cx="100" cy="50" r="10" fill="#33BBFF" />
      <path d="M140 30 L170 20 L170 40 L140 40 Z" fill={color} />
      <path d="M140 70 L170 60 L170 80 L140 60 Z" fill={color} />
      <rect x="140" y="35" width="5" height="30" fill="#AAAAAA" />
      <rect x="145" y="35" width="5" height="30" fill="#CCCCCC" />
      <g>
        <path
          d="M150 35 L180 50 L150 65"
          fill="#FF9900"
          stroke="#FF9900"
          strokeWidth="2"
        >
          <animate 
            attributeName="d" 
            values="M150 35 L180 50 L150 65;M150 38 L190 50 L150 62;M150 35 L180 50 L150 65" 
            dur="0.5s" 
            repeatCount="indefinite" 
          />
          <animate 
            attributeName="opacity" 
            values="1;0.8;1" 
            dur="0.5s" 
            repeatCount="indefinite" 
          />
        </path>
        <path
          d="M150 40 L175 50 L150 60"
          fill="#FFCC00"
          stroke="#FFCC00"
          strokeWidth="1"
        >
          <animate 
            attributeName="d" 
            values="M150 40 L175 50 L150 60;M150 42 L185 50 L150 58;M150 40 L175 50 L150 60" 
            dur="0.3s" 
            repeatCount="indefinite" 
          />
          <animate 
            attributeName="opacity" 
            values="1;0.9;1" 
            dur="0.3s" 
            repeatCount="indefinite" 
          />
        </path>
        <path
          d="M150 45 L165 50 L150 55"
          fill="#FFFFFF"
          stroke="#FFFF00"
          strokeWidth="0.5"
        >
          <animate 
            attributeName="d" 
            values="M150 45 L165 50 L150 55;M150 47 L170 50 L150 53;M150 45 L165 50 L150 55" 
            dur="0.2s" 
            repeatCount="indefinite" 
          />
          <animate 
            attributeName="opacity" 
            values="1;0.9;1" 
            dur="0.2s" 
            repeatCount="indefinite" 
          />
        </path>
      </g>
    </svg>
  );
  
  return (
    <motion.div
      className="absolute will-change-transform pointer-events-none"
      style={{ 
        top: yPosition,
        width: size,
        height: 'auto'
      }}
      initial="initial"
      animate="animate"
      variants={shipVariants}
    >
      <motion.div
        variants={floatVariants}
        initial="initial"
        animate="animate"
      >
        {/* Render different SVG based on direction */}
        {direction === 'ltr' ? <RocketRight /> : <RocketLeft />}
      </motion.div>
    </motion.div>
  );
};

FlyingShip.propTypes = {
  delay: PropTypes.number,
  speed: PropTypes.number,
  yPosition: PropTypes.string,
  size: PropTypes.string,
  direction: PropTypes.oneOf(['ltr', 'rtl']),
  color: PropTypes.string
};

export default FlyingShip;