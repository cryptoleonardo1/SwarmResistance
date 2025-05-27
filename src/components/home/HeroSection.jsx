import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// New Swarm Invasion Background Component
const SwarmInvasionBackground = () => {
  const [stars, setStars] = useState([]);
  const [debris, setDebris] = useState([]);
  
  useEffect(() => {
    // Generate background stars
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 100; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleDelay: Math.random() * 3
        });
      }
      setStars(newStars);
    };

    // Generate debris particles
    const generateDebris = () => {
      const newDebris = [];
      for (let i = 0; i < 20; i++) {
        newDebris.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 8 + 4,
          rotation: Math.random() * 360,
          speed: Math.random() * 30 + 20,
          opacity: Math.random() * 0.6 + 0.2
        });
      }
      setDebris(newDebris);
    };

    generateStars();
    generateDebris();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 0.3, star.opacity]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: star.twinkleDelay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Floating debris */}
      {debris.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute bg-gray-400/40 rounded-sm"
          style={{
            width: `${piece.size}px`,
            height: `${piece.size * 0.6}px`,
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            opacity: piece.opacity
          }}
          animate={{
            x: [0, Math.random() * 50 - 25],
            y: [0, Math.random() * 30 - 15],
            rotate: [piece.rotation, piece.rotation + 360]
          }}
          transition={{
            duration: piece.speed,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      {/* Swarm ships moving across screen */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`swarm-${i}`}
          className="absolute"
          initial={{
            left: '-5%',
            top: `${15 + i * 12}%`,
          }}
          animate={{
            left: ['105%'],
            top: [`${15 + i * 12}%`, `${20 + i * 10}%`, `${15 + i * 12}%`]
          }}
          transition={{
            duration: 12 + i * 2,
            delay: i * 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {/* Swarm ship - insectoid design */}
          <div className="relative">
            <motion.div
              className="w-8 h-4 bg-gradient-to-r from-red-900 to-red-700 rounded-full relative"
              style={{
                clipPath: 'polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%)'
              }}
              animate={{
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Swarm ship glow */}
              <div className="absolute inset-0 bg-red-500/50 rounded-full blur-sm" />
              
              {/* Wing-like appendages */}
              <div className="absolute -left-1 top-0 w-2 h-1 bg-red-800/60 rounded-full transform -rotate-12" />
              <div className="absolute -left-1 bottom-0 w-2 h-1 bg-red-800/60 rounded-full transform rotate-12" />
              <div className="absolute -right-1 top-0 w-2 h-1 bg-red-800/60 rounded-full transform rotate-12" />
              <div className="absolute -right-1 bottom-0 w-2 h-1 bg-red-800/60 rounded-full transform -rotate-12" />
            </motion.div>
            
            {/* Swarm ship trail */}
            <div className="absolute top-1/2 right-full -translate-y-1/2 w-12 h-0.5 bg-gradient-to-l from-red-500/80 to-transparent" />
          </div>
        </motion.div>
      ))}

      {/* Weapon fire across screen */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`laser-${i}`}
          className="absolute"
          initial={{
            left: `${20 + i * 20}%`,
            top: `${30 + i * 10}%`,
            opacity: 0
          }}
          animate={{
            left: [`${20 + i * 20}%`, `${60 + i * 15}%`],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 0.8,
            delay: 2 + i * 0.5,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "easeOut"
          }}
        >
          <div className="w-16 h-0.5 bg-gradient-to-r from-orange-500 via-red-500 to-transparent rounded-full">
            <div className="w-full h-full bg-gradient-to-r from-yellow-300 via-orange-400 to-transparent blur-sm" />
          </div>
        </motion.div>
      ))}

      {/* Explosion effects */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`explosion-${i}`}
          className="absolute"
          style={{
            left: `${30 + i * 25}%`,
            top: `${25 + i * 20}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 1.2,
            delay: 3 + i * 2,
            repeat: Infinity,
            repeatDelay: 8,
            ease: "easeOut"
          }}
        >
          <div className="w-12 h-12 rounded-full bg-gradient-radial from-yellow-400 via-orange-500 to-red-600">
            <div className="absolute inset-0 rounded-full bg-gradient-radial from-white via-yellow-300 to-transparent blur-sm" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const HeroSection = () => {
  // Terminal text effect - updated with Swarm Resistance story
  const [typedText, setTypedText] = useState('');
  const fullText = 'The Swarm has consumed our empire... Cryptomeda lies in ruins... But from collapse comes rebirth... Renegades and Goliaths now fight as one... The resistance needs heroes willing to reclaim what was lost.';
  
  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setTypedText(fullText.slice(0, index));
      index++;
      
      if (index > fullText.length) {
        clearInterval(intervalId);
      }
    }, 35);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Parallax effect
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Corrupted/burning planets and space objects
  const spaceObjects = [
    {
      type: "burning-planet",
      name: "Meda Prime - Burning",
      color: "from-red-500/60 via-orange-500/40 to-yellow-500/20",
      size: "w-24 h-24 md:w-32 md:h-32",
      position: "bottom-[25%] right-[10%]",
      rotationDuration: "180s",
      floatDuration: "8s",
      floatDelay: "0s",
      shadow: "shadow-red-500",
      parallaxSpeed: 0.1,
      corrupted: true
    },
    {
      type: "damaged-planet",
      name: "Cybertron - Corrupted",
      color: "from-neon-cyan/40 via-red-400/30 to-gray-500/20",
      size: "w-20 h-20 md:w-28 md:h-28",
      position: "top-[20%] left-[15%]",
      rotationDuration: "160s",
      floatDuration: "12s",
      floatDelay: "2s",
      shadow: "shadow-red-400",
      parallaxSpeed: 0.15,
      corrupted: true
    },
    {
      type: "dying-planet",
      name: "Nebulon - Dying",
      color: "from-gray-400/60 via-red-400/20 to-transparent",
      size: "w-16 h-16 md:w-24 md:h-24",
      position: "top-[30%] right-[15%]",
      rotationDuration: "120s",
      floatDuration: "10s",
      floatDelay: "4s",
      shadow: "shadow-gray-400",
      parallaxSpeed: 0.2,
      corrupted: true
    },
    {
      type: "infected-planet",
      name: "Energos - Infected",
      color: "from-green-400/30 via-red-500/40 to-orange-400/20",
      size: "w-14 h-14 md:w-20 md:h-20",
      position: "bottom-[35%] left-[10%]",
      rotationDuration: "140s",
      floatDuration: "7s",
      floatDelay: "1s",
      shadow: "shadow-orange-400",
      parallaxSpeed: 0.12,
      corrupted: true
    },
    {
      type: "debris-field",
      color: "from-gray-500/40 via-red-400/30 to-transparent",
      size: "w-32 h-32 md:w-48 md:h-48",
      position: "top-[10%] right-[30%]",
      rotationDuration: "300s",
      floatDuration: "20s",
      floatDelay: "0s",
      shadow: "shadow-gray-500",
      parallaxSpeed: 0.05
    }
  ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center">
      {/* Swarm Invasion Background */}
      <SwarmInvasionBackground />
      
      {/* Apocalyptic gradient layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-red-900/30 to-void-black opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-900/20 to-red-900/40" />
      </div>
      
      {/* Corruption spread animation */}
      <motion.div 
        className="absolute w-full h-full opacity-40"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundImage: 'radial-gradient(ellipse at center, rgba(220, 38, 38, 0.3) 0%, transparent 60%), radial-gradient(ellipse at bottom right, rgba(255, 100, 0, 0.2) 0%, transparent 50%)',
          backgroundSize: '300% 300%',
        }}
      />
      
      {/* Emergency beacon signals */}
      <motion.div 
        className="absolute w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`beacon-${i}`}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + i * 15}%`,
              backgroundColor: '#ff4444',
              boxShadow: '0 0 10px #ff4444'
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 2,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
      
      {/* Corrupted space objects with parallax */}
      {spaceObjects.map((obj, index) => (
        <motion.div
          key={index}
          className={`absolute ${obj.position} ${obj.size} pointer-events-none`}
          style={{ 
            y: scrollY * obj.parallaxSpeed,
            x: scrollY * (index % 2 === 0 ? obj.parallaxSpeed * 0.5 : -obj.parallaxSpeed * 0.5),
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 + index * 0.1 }}
        >
          <motion.div 
            className={`w-full h-full relative rounded-full bg-gradient-radial ${obj.color} ${obj.shadow}`}
            animate={{
              rotate: 360,
              y: [0, -10, 0],
            }}
            transition={{
              rotate: { duration: obj.rotationDuration, repeat: Infinity, ease: "linear" },
              y: { duration: obj.floatDuration, repeat: Infinity, ease: "easeInOut", delay: obj.floatDelay }
            }}
          >
            {/* Corrupted planet effects */}
            {obj.corrupted && (
              <>
                {/* Crack patterns */}
                <div className="absolute inset-[25%] rounded-full bg-gradient-to-br from-red-500/30 via-transparent to-orange-500/20" />
                
                {/* Pulsing corruption */}
                <motion.div 
                  className="absolute inset-0 rounded-full bg-red-500/20"
                  animate={{
                    opacity: [0.2, 0.6, 0.2],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </>
            )}
            
            {/* Debris field effects */}
            {obj.type === "debris-field" && (
              <div className="absolute inset-0 rounded-full">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-gray-400 rounded-full"
                    style={{
                      left: `${Math.random() * 80 + 10}%`,
                      top: `${Math.random() * 80 + 10}%`,
                    }}
                    animate={{
                      x: [0, Math.random() * 20 - 10],
                      y: [0, Math.random() * 20 - 10],
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 10 + Math.random() * 10,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      ))}
      
      {/* Content - Centered */}
      <div className="section-content relative z-10">
        <div className="content-wrapper flex items-center justify-center min-h-screen">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main Headline with underline - Updated */}
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="section-title text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              The Universe <span className="text-gradient-gold">Collapses</span>
            </motion.h1>
            
            {/* Tagline - Updated */}
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-2xl md:text-3xl font-medium mb-10 text-stellar-white/90"
            >
              Unite Against Extinction
            </motion.p>
            
            {/* Animated Description - Terminal text effect - Updated */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="max-w-3xl mx-auto mb-12 glassmorphism p-8 rounded-xl backdrop-blur-md border border-red-500/20"
              style={{
                boxShadow: '0 0 20px rgba(239, 68, 68, 0.1)'
              }}
            >
              <p className="font-jetbrains text-stellar-white/90 text-base md:text-lg leading-relaxed">
                {typedText}
                <span className="animate-pulse text-red-400">_</span>
              </p>
            </motion.div>
            
            {/* CTA Buttons - Updated */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <motion.button 
                className="btn-primary-glass text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Connect Wallet & Begin
              </motion.button>
              <motion.button 
                className="btn-secondary-glass text-lg px-8 py-4 border-red-400/30 hover:border-red-400/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join the Resistance
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Emergency alert streaks instead of shooting stars */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`alert-${i}`}
          className="absolute w-1 h-1 bg-red-400 rounded-full"
          initial={{ 
            top: `${Math.random() * 50}%`,
            left: '-5%',
            opacity: 0
          }}
          animate={{
            left: ['110%'],
            top: [`${Math.random() * 50}%`, `${Math.random() * 50 + 50}%`],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 1.5,
            delay: i * 2 + 3,
            repeat: Infinity,
            repeatDelay: 6,
            ease: "easeIn"
          }}
        >
          <div className="absolute inset-0 w-20 h-0.5 bg-gradient-to-r from-transparent to-red-400/80 transform -translate-y-1/2 origin-right -rotate-45" />
        </motion.div>
      ))}
      
      {/* Smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
        {/* Gradient transition from red/orange corruption to blue/purple */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-900/20 to-space-blue/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-900/10 to-cosmic-purple/40" />
        
        {/* Animated transition particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`transition-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${15 + i * 10}%`,
              background: i % 2 === 0 ? 'rgba(255, 182, 30, 0.6)' : 'rgba(0, 240, 255, 0.4)',
              boxShadow: i % 2 === 0 ? '0 0 8px rgba(255, 182, 30, 0.6)' : '0 0 8px rgba(0, 240, 255, 0.4)'
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 4,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Flowing energy transition */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500/30 via-meda-gold/40 to-neon-cyan/30"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundSize: '200% 100%'
          }}
        />
      </div>
    </div>
  );
};

export default HeroSection;