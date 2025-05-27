import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import StarfieldBackground from '../effects/StarfieldBackground';

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
  
  // Enhanced planets and space objects
  const spaceObjects = [
    // Original 4 colorful planets
    {
      type: "planet",
      name: "Meda Prime",
      color: "from-meda-gold/60 via-meda-gold/20 to-transparent",
      size: "w-24 h-24 md:w-32 md:h-32",
      position: "bottom-[25%] right-[10%]",
      rotationDuration: "180s",
      floatDuration: "8s",
      floatDelay: "0s",
      shadow: "shadow-meda-gold",
      parallaxSpeed: 0.1
    },
    {
      type: "planet",
      name: "Cybertron",
      color: "from-neon-cyan/60 via-neon-cyan/20 to-transparent",
      size: "w-20 h-20 md:w-28 md:h-28",
      position: "top-[20%] left-[5%]",
      rotationDuration: "160s",
      floatDuration: "12s",
      floatDelay: "2s",
      shadow: "shadow-neon-cyan",
      parallaxSpeed: 0.15
    },
    {
      type: "planet",
      name: "Nebulon",
      color: "from-nebula-pink/60 via-nebula-pink/20 to-transparent",
      size: "w-16 h-16 md:w-24 md:h-24",
      position: "top-[30%] right-[15%]",
      rotationDuration: "120s",
      floatDuration: "10s",
      floatDelay: "4s",
      shadow: "shadow-nebula-pink",
      parallaxSpeed: 0.2
    },
    {
      type: "planet",
      name: "Energos",
      color: "from-energy-green/60 via-energy-green/20 to-transparent",
      size: "w-14 h-14 md:w-20 md:h-20",
      position: "bottom-[35%] left-[10%]",
      rotationDuration: "140s",
      floatDuration: "7s",
      floatDelay: "1s",
      shadow: "shadow-energy-green",
      parallaxSpeed: 0.12
    },
    // Additional space objects
    {
      type: "asteroid",
      color: "from-gray-400/40 via-gray-500/20 to-transparent",
      size: "w-8 h-8 md:w-12 md:h-12",
      position: "top-[45%] left-[25%]",
      rotationDuration: "100s",
      floatDuration: "15s",
      floatDelay: "3s",
      shadow: "shadow-gray-400",
      parallaxSpeed: 0.25
    },
    {
      type: "nebula",
      color: "from-purple-500/30 via-pink-500/10 to-transparent",
      size: "w-32 h-32 md:w-48 md:h-48",
      position: "top-[10%] right-[30%]",
      rotationDuration: "300s",
      floatDuration: "20s",
      floatDelay: "0s",
      shadow: "shadow-purple-500",
      parallaxSpeed: 0.05
    },
    {
      type: "comet",
      color: "from-blue-400/50 via-cyan-400/20 to-transparent",
      size: "w-6 h-6 md:w-10 md:h-10",
      position: "bottom-[20%] right-[40%]",
      rotationDuration: "80s",
      floatDuration: "9s",
      floatDelay: "5s",
      shadow: "shadow-blue-400",
      parallaxSpeed: 0.3
    }
  ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center">
      {/* Enhanced Starfield Background */}
      <StarfieldBackground />
      
      {/* Deep space gradient layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-space-blue/50 to-void-black opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-space-blue/30 to-space-blue/60" />
      </div>
      
      {/* Animated nebula clouds */}
      <motion.div 
        className="absolute w-full h-full opacity-30"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundImage: 'radial-gradient(ellipse at center, rgba(74, 43, 159, 0.3) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(255, 62, 138, 0.2) 0%, transparent 50%)',
          backgroundSize: '200% 200%',
        }}
      />
      
      {/* Main orbital system */}
      <motion.div 
        className="absolute w-[1000px] h-[1000px] opacity-20 pointer-events-none"
        style={{ 
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          y: scrollY * 0.1,
        }}
      >
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-cosmic-purple/20 to-transparent blur-xl"></div>
        <motion.div 
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 border border-cosmic-purple/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 border border-cosmic-purple/10 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 border border-neon-cyan/5 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
      
      {/* Space objects with parallax */}
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
            {/* Planet details */}
            {obj.type === "planet" && (
              <>
                <div className="absolute inset-[20%] rounded-full bg-gradient-to-br from-transparent via-stellar-white/10 to-transparent" />
                {index % 2 === 0 && (
                  <div className="absolute top-1/2 left-1/2 w-[120%] h-[35%] -translate-x-1/2 -translate-y-1/2 border-t border-b border-stellar-white/20 rounded-[100%] transform -rotate-[15deg]" />
                )}
              </>
            )}
            
            {/* Nebula glow */}
            {obj.type === "nebula" && (
              <div className="absolute inset-0 rounded-full blur-2xl animate-pulse-slow" />
            )}
            
            {/* Comet tail */}
            {obj.type === "comet" && (
              <div className="absolute top-1/2 left-0 w-20 h-0.5 bg-gradient-to-l from-transparent to-blue-400/50 -translate-y-1/2 -translate-x-full" />
            )}
          </motion.div>
        </motion.div>
      ))}
      
      {/* Comet swarm animation - cartoon style */}
      <motion.div
        className="absolute w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        {/* Main comet swarm */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`comet-${i}`}
            className="absolute"
            initial={{ 
              right: '-10%',
              top: `${20 + i * 10}%`,
              scale: 0.8 + i * 0.1,
            }}
            animate={{
              right: ['110%'],
              top: [`${20 + i * 10}%`, `${25 + i * 8}%`, `${20 + i * 10}%`],
              scale: [0.8 + i * 0.1, 1 + i * 0.1, 0.8 + i * 0.1],
            }}
            transition={{
              duration: 8 + i * 0.5,
              delay: i * 0.3,
              repeat: Infinity,
              repeatDelay: 8,
              ease: "easeInOut"
            }}
          >
            {/* Comet head - cartoon style */}
            <div className="relative">
              <div 
                className={`w-6 h-6 md:w-8 md:h-8 rounded-full relative ${
                  i % 3 === 0 ? 'bg-gradient-to-br from-yellow-300 to-orange-400' :
                  i % 3 === 1 ? 'bg-gradient-to-br from-blue-300 to-purple-400' :
                  'bg-gradient-to-br from-pink-300 to-red-400'
                }`}
                style={{
                  boxShadow: `0 0 20px ${
                    i % 3 === 0 ? 'rgba(255, 200, 0, 0.8)' :
                    i % 3 === 1 ? 'rgba(100, 150, 255, 0.8)' :
                    'rgba(255, 100, 150, 0.8)'
                  }`
                }}
              >
                {/* Cute face */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-black rounded-full"></div>
                    <div className="w-1 h-1 bg-black rounded-full"></div>
                  </div>
                </div>
                {/* Highlight */}
                <div className="absolute top-1 right-1 w-2 h-2 bg-white/60 rounded-full"></div>
              </div>
              
              {/* Comet tail - cartoon style */}
              <div className="absolute top-1/2 right-full -translate-y-1/2">
                <div className="flex items-center">
                  {[...Array(4)].map((_, j) => (
                    <motion.div
                      key={j}
                      className={`rounded-full ${
                        i % 3 === 0 ? 'bg-yellow-200' :
                        i % 3 === 1 ? 'bg-blue-200' :
                        'bg-pink-200'
                      }`}
                      style={{
                        width: `${12 - j * 2}px`,
                        height: `${12 - j * 2}px`,
                        marginRight: `${j * 2}px`,
                        opacity: 1 - j * 0.2
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [1 - j * 0.2, 0.8 - j * 0.2, 1 - j * 0.2]
                      }}
                      transition={{
                        duration: 0.5,
                        delay: j * 0.1,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
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
              className="max-w-3xl mx-auto mb-12 glassmorphism p-8 rounded-xl backdrop-blur-md"
            >
              <p className="font-jetbrains text-stellar-white/90 text-base md:text-lg leading-relaxed">
                {typedText}
                <span className="animate-pulse">_</span>
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
              <Link to="/story">
                <motion.button 
                  className="btn-secondary-glass text-lg px-8 py-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join the Resistance
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Animated shooting stars */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
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
            duration: 2,
            delay: i * 3 + 5,
            repeat: Infinity,
            repeatDelay: 7,
            ease: "easeIn"
          }}
        >
          <div className="absolute inset-0 w-20 h-0.5 bg-gradient-to-r from-transparent to-white/50 transform -translate-y-1/2 origin-right -rotate-45" />
        </motion.div>
      ))}
      
      {/* Subtle transition effect to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-transparent via-transparent to-transparent pointer-events-none">
        {/* Animated star particles flowing down */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-stellar-white/50 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
            }}
            animate={{
              y: [-20, 100],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "easeIn"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;