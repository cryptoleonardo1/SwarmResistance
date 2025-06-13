import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useWeb3Auth } from '../../contexts/Web3AuthContext';

// Enhanced Background with Swarm Invasion
const SwarmInvasionBackground = () => {
  const [stars, setStars] = useState([]);
  const [debris, setDebris] = useState([]);
  
  useEffect(() => {
    // Generate background stars
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 150; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleDelay: Math.random() * 4
        });
      }
      setStars(newStars);
    };

    // Generate debris particles
    const generateDebris = () => {
      const newDebris = [];
      for (let i = 0; i < 25; i++) {
        newDebris.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 12 + 4,
          rotation: Math.random() * 360,
          speed: Math.random() * 40 + 20,
          opacity: Math.random() * 0.4 + 0.1
        });
      }
      setDebris(newDebris);
    };

    generateStars();
    generateDebris();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Enhanced background stars */}
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
            opacity: [star.opacity, star.opacity * 0.2, star.opacity],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: star.twinkleDelay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Floating debris with enhanced movement */}
      {debris.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute bg-neutral-medium/40 rounded-sm"
          style={{
            width: `${piece.size}px`,
            height: `${piece.size * 0.6}px`,
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            opacity: piece.opacity
          }}
          animate={{
            x: [0, Math.random() * 60 - 30],
            y: [0, Math.random() * 40 - 20],
            rotate: [piece.rotation, piece.rotation + 720]
          }}
          transition={{
            duration: piece.speed,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      {/* Enhanced Swarm ships */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`swarm-${i}`}
          className="absolute"
          initial={{
            left: '-8%',
            top: `${10 + i * 10}%`,
          }}
          animate={{
            left: ['108%'],
            top: [`${10 + i * 10}%`, `${15 + i * 8}%`, `${10 + i * 10}%`]
          }}
          transition={{
            duration: 15 + i * 3,
            delay: i * 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="relative">
            <motion.div
              className="w-12 h-6 bg-gradient-to-r from-red-900 to-red-600 relative"
              style={{
                clipPath: 'polygon(0% 50%, 30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%)'
              }}
              animate={{
                scale: [1, 1.15, 1],
                filter: ['hue-rotate(0deg)', 'hue-rotate(20deg)', 'hue-rotate(0deg)']
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="absolute inset-0 bg-red-400/60 rounded-full blur-sm" />
              
              {/* Enhanced wing appendages */}
              <div className="absolute -left-2 top-0 w-3 h-2 bg-red-700/70 rounded-full transform -rotate-15" />
              <div className="absolute -left-2 bottom-0 w-3 h-2 bg-red-700/70 rounded-full transform rotate-15" />
              <div className="absolute -right-2 top-0 w-3 h-2 bg-red-700/70 rounded-full transform rotate-15" />
              <div className="absolute -right-2 bottom-0 w-3 h-2 bg-red-700/70 rounded-full transform -rotate-15" />
            </motion.div>
            
            {/* Enhanced trail */}
            <div className="absolute top-1/2 right-full -translate-y-1/2 w-20 h-1 bg-gradient-to-l from-red-400/90 via-red-500/60 to-transparent" />
          </div>
        </motion.div>
      ))}

      {/* Enhanced weapon fire */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`laser-${i}`}
          className="absolute"
          initial={{
            left: `${15 + i * 15}%`,
            top: `${25 + i * 8}%`,
            opacity: 0
          }}
          animate={{
            left: [`${15 + i * 15}%`, `${70 + i * 10}%`],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 1.2,
            delay: 2.5 + i * 0.7,
            repeat: Infinity,
            repeatDelay: 5,
            ease: "easeOut"
          }}
        >
          <div className="w-24 h-1 bg-gradient-to-r from-phoenix-primary via-red-500 to-transparent rounded-full">
            <div className="w-full h-full bg-gradient-to-r from-yellow-200 via-orange-300 to-transparent blur-sm" />
          </div>
        </motion.div>
      ))}

      {/* Enhanced explosion effects */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`explosion-${i}`}
          className="absolute"
          style={{
            left: `${25 + i * 20}%`,
            top: `${20 + i * 15}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 2, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 1.5,
            delay: 4 + i * 2.5,
            repeat: Infinity,
            repeatDelay: 10,
            ease: "easeOut"
          }}
        >
          <div className="w-16 h-16 rounded-full bg-gradient-radial from-yellow-300 via-phoenix-primary to-red-700">
            <div className="absolute inset-0 rounded-full bg-gradient-radial from-white via-yellow-200 to-transparent blur-sm" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useWeb3Auth();
  
  const handleConnectWallet = async () => {
    try {
      await login();
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const handleJoinResistance = () => {
    navigate('/join-resistance');
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Swarm Invasion Background */}
      <SwarmInvasionBackground />
      
      {/* Enhanced gradient layers matching design manual */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-void-primary via-void-secondary to-resistance-primary/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-phoenix-primary/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-void-primary/80 via-transparent to-void-primary/80" />
      </div>
      
      {/* Corruption spread animation with Phoenix colors */}
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
          backgroundImage: `
            radial-gradient(ellipse at center, rgba(255, 140, 0, 0.2) 0%, transparent 70%), 
            radial-gradient(ellipse at bottom right, rgba(220, 38, 38, 0.15) 0%, transparent 60%)
          `,
          backgroundSize: '400% 400%',
        }}
      />
      
      {/* Emergency beacon signals with Phoenix styling */}
      <motion.div 
        className="absolute w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`beacon-${i}`}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: `${15 + i * 17}%`,
              top: `${20 + i * 12}%`,
              backgroundColor: '#FF8C00',
              boxShadow: '0 0 15px #FF8C00'
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.8, 1],
              boxShadow: [
                '0 0 15px rgba(255, 140, 0, 0.5)',
                '0 0 30px rgba(255, 140, 0, 0.8)',
                '0 0 15px rgba(255, 140, 0, 0.5)'
              ]
            }}
            transition={{
              duration: 2.5,
              delay: i * 0.6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
      
      {/* Main Content - Properly centered with sidebar consideration */}
      <div className="relative z-10 min-h-screen w-full pt-20 md:pl-64 flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full">
          
          {/* Main Guardian Image - Holographic appearance animation - Appears Third */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 2, 
              delay: 1.2  // Same timing as smoke
            }}
            className="absolute z-0"
            style={{
              left: '16rem', // Start after sidebar
              right: '0',
              bottom: '130px', // Moved 30px south (was 160px)
              top: '120px', // Add top positioning to avoid topbar overlap
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center'
            }}
          >
            {/* Main Guardian image - Holographic appearance */}
            <motion.img
              src="/main.png"
              alt="Guardian Squad"
              className="object-contain object-bottom"
              style={{
                filter: 'drop-shadow(0 0 30px rgba(255, 140, 0, 0.6))',
                maxWidth: 'calc(100vw - 16rem)',
                maxHeight: 'calc(100vh - 250px + 60px)', // Made 60px bigger (was -280px, now -220px)
                width: 'auto',
                height: 'auto'
              }}
              initial={{ 
                opacity: 0,
                scale: 0.8,
                filter: 'blur(10px) brightness(0) contrast(2)',
              }}
              animate={{ 
                opacity: [0, 0.3, 0.7, 1],
                scale: [0.8, 1.02, 0.98, 1],
                filter: [
                  'blur(10px) brightness(0) contrast(2)',
                  'blur(8px) brightness(0.3) contrast(1.8)',
                  'blur(4px) brightness(0.7) contrast(1.4)',
                  'blur(2px) brightness(0.9) contrast(1.2)',
                  'blur(0px) brightness(1) contrast(1)'
                ]
              }}
              transition={{
                duration: 2.5,
                delay: 1.2, // Same as container delay
                ease: "easeOut",
                opacity: { 
                  duration: 2.5,
                  times: [0, 0.3, 0.7, 1]
                },
                scale: {
                  duration: 2.5,
                  times: [0, 0.6, 0.9, 1],
                  ease: "easeOut"
                },
                filter: {
                  duration: 2.5,
                  times: [0, 0.25, 0.5, 0.75, 1],
                  ease: "easeOut"
                }
              }}
            />
            
            {/* Holographic scan lines effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 2,
                delay: 1.4, // Slightly after main image starts
                ease: "easeInOut"
              }}
            >
              {/* Vertical scan lines */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`scan-${i}`}
                  className="absolute w-px h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
                  style={{
                    left: `${12.5 + i * 12.5}%`,
                    opacity: 0.6
                  }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: [0, 1, 0] }}
                  transition={{
                    duration: 1.5,
                    delay: 1.6 + i * 0.1, // Adjusted for new timing
                    ease: "easeInOut"
                  }}
                />
              ))}
              
              {/* Horizontal scan effect */}
              <motion.div
                className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                initial={{ top: '100%' }}
                animate={{ top: ['100%', '0%', '100%'] }}
                transition={{
                  duration: 1.8,
                  delay: 1.9, // Adjusted for new timing
                  ease: "linear"
                }}
                style={{ opacity: 0.8 }}
              />
            </motion.div>
            
            {/* Energy materialization particles */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 2.5,
                delay: 1.2, // Same as main image
                ease: "easeInOut"
              }}
            >
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    boxShadow: '0 0 6px #00FFFF'
                  }}
                  initial={{ 
                    scale: 0,
                    opacity: 0
                  }}
                  animate={{ 
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                    x: [0, Math.random() * 40 - 20],
                    y: [0, Math.random() * 40 - 20]
                  }}
                  transition={{
                    duration: 2,
                    delay: 1.4 + i * 0.1, // Same as main image particles
                    ease: "easeOut"
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Animated Smoke PNG - Middle Layer (z-10) - Full Width */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 2, 
              delay: 1.2  // Same timing as main.png
            }}
          >
            <div className="relative w-full h-[500px] overflow-hidden">
              <motion.img 
                src="/smoke.png" 
                alt="Battle Smoke" 
                className="absolute bottom-0 left-0 w-full h-full object-cover object-bottom"
                style={{
                  maxWidth: '100%',
                  height: '500px',
                  filter: 'drop-shadow(0 0 20px rgba(255, 140, 0, 0.3))'
                }}
                initial={{ 
                  opacity: 0,
                  scale: 0.9,
                  filter: 'blur(8px) brightness(0.3) contrast(1.5)',
                }}
                animate={{ 
                  opacity: [0, 0.4, 0.8, 1],
                  scale: [0.9, 1.02, 0.99, 1],
                  filter: [
                    'blur(8px) brightness(0.3) contrast(1.5)',
                    'blur(6px) brightness(0.5) contrast(1.3)',
                    'blur(3px) brightness(0.8) contrast(1.1)',
                    'blur(0px) brightness(1) contrast(1)'
                  ]
                }}
                transition={{
                  duration: 2,
                  delay: 1.2, // Same timing as main.png
                  ease: "easeOut",
                  opacity: { 
                    duration: 2,
                    times: [0, 0.3, 0.7, 1]
                  },
                  scale: {
                    duration: 2,
                    times: [0, 0.6, 0.9, 1],
                    ease: "easeOut"
                  },
                  filter: {
                    duration: 2,
                    times: [0, 0.3, 0.7, 1],
                    ease: "easeOut"
                  }
                }}
              />
              
              {/* Smoke materialization particles */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 2,
                  delay: 1.2, // Same timing as main.png
                  ease: "easeInOut"
                }}
              >
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`smoke-particle-${i}`}
                    className="absolute w-2 h-2 bg-orange-400/60 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      bottom: `${Math.random() * 30}%`,
                      boxShadow: '0 0 8px rgba(255, 140, 0, 0.6)'
                    }}
                    initial={{ 
                      scale: 0,
                      opacity: 0
                    }}
                    animate={{ 
                      scale: [0, 1.2, 0],
                      opacity: [0, 0.8, 0],
                      y: [0, -40 - Math.random() * 20]
                    }}
                    transition={{
                      duration: 1.5,
                      delay: 1.4 + i * 0.1, // Same timing as main.png particles
                      ease: "easeOut"
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
          
          {/* Bottom Section - Title and Buttons - Front Layer (z-20) */}
          <div className="absolute bottom-0 left-0 right-0 z-20" style={{ paddingLeft: '16rem' }}>
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
              
              {/* Big Title "GUARDIANS RISE" - Single Line - Appears First */}
              <motion.div
                className="text-center mb-12"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }} // Earlier delay
              >
                <motion.h1 
                  className="text-5xl md:text-6xl lg:text-7xl font-orbitron font-black text-stellar-white mb-4 whitespace-nowrap"
                  style={{
                    textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 140, 0, 0.6)',
                    letterSpacing: '0.05em'
                  }}
                  animate={{
                    textShadow: [
                      '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 140, 0, 0.6)',
                      '0 0 25px rgba(255, 255, 255, 1), 0 0 50px rgba(255, 140, 0, 0.8)',
                      '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 140, 0, 0.6)'
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  GUARDIANS RISE
                </motion.h1>
              </motion.div>
              
              {/* Action Buttons - Same Size - Appears Second */}
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }} // Earlier delay
                className="flex flex-col sm:flex-row gap-8 justify-center items-center"
              >
                {/* CONNECT & BEGIN Button - Green style like TopBar Connect Wallet */}
                <motion.button 
                  className="relative text-2xl font-orbitron font-bold rounded-lg overflow-hidden"
                  style={{
                    padding: '2rem 4rem',
                    minWidth: '300px',
                    background: 'linear-gradient(45deg, rgba(15, 35, 15, 0.95), rgba(34, 197, 94, 0.9))',
                    border: '2px solid rgba(34, 197, 94, 0.9)',
                    color: '#FFFFFF',
                    boxShadow: '0 0 20px rgba(34, 197, 94, 0.6), inset 0 0 15px rgba(34, 197, 94, 0.1)',
                    opacity: isLoading ? 0.5 : 1
                  }}
                  onClick={handleConnectWallet}
                  disabled={isLoading}
                  whileHover={{ 
                    scale: isLoading ? 1 : 1.05,
                    boxShadow: isLoading ? undefined : "0 0 30px rgba(34, 197, 94, 0.8), inset 0 0 20px rgba(34, 197, 94, 0.15)"
                  }}
                  whileTap={{ scale: isLoading ? 1 : 0.95 }}
                >
                  {/* Green shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/20 to-transparent rounded-lg"
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  
                  {/* Button text */}
                  <span 
                    className="relative z-10"
                    style={{
                      textShadow: '0 0 10px rgba(74, 222, 128, 0.8)'
                    }}
                  >
                    {isLoading ? 'INITIALIZING...' : 'CONNECT & BEGIN'}
                  </span>
                  
                  {/* Green corner indicators */}
                  <motion.div
                    className="absolute top-2 left-2 w-2 h-2 rounded-full bg-green-400"
                    animate={{
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      boxShadow: '0 0 8px rgba(74, 222, 128, 0.8)'
                    }}
                  />
                  
                  <motion.div
                    className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-green-400"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      delay: 1,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      boxShadow: '0 0 6px rgba(74, 222, 128, 0.8)'
                    }}
                  />
                </motion.button>
                
                {/* JOIN THE RESISTANCE Button - Blue design, contained shimmer */}
                <motion.button 
                  className="relative text-2xl font-orbitron font-bold rounded-lg overflow-hidden"
                  style={{
                    padding: '2rem 4rem', // Explicit padding to match
                    minWidth: '300px', // Same width as CONNECT button
                    background: 'rgba(30, 58, 138, 0.9)',
                    border: '2px solid rgba(59, 130, 246, 0.8)',
                    color: '#FFFFFF',
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.6), inset 0 0 20px rgba(59, 130, 246, 0.1)'
                  }}
                  onClick={handleJoinResistance}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(59, 130, 246, 0.8), inset 0 0 30px rgba(59, 130, 246, 0.15)",
                    borderColor: "rgba(96, 165, 250, 1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Contained shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-lg"
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      clipPath: 'inset(0)'
                    }}
                  />
                  
                  {/* Button text */}
                  <span 
                    className="relative z-10"
                    style={{
                      textShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
                    }}
                  >
                    JOIN THE RESISTANCE
                  </span>
                  
                  {/* Corner indicators - simplified */}
                  <motion.div
                    className="absolute top-2 left-2 w-2 h-2 rounded-full bg-resistance-glow"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      boxShadow: '0 0 8px rgba(96, 165, 250, 0.8)'
                    }}
                  />
                  
                  <motion.div
                    className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-resistance-glow"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      delay: 1,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      boxShadow: '0 0 8px rgba(96, 165, 250, 0.8)'
                    }}
                  />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Emergency alert streaks */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`alert-${i}`}
          className="absolute w-2 h-2 bg-phoenix-primary rounded-full"
          initial={{ 
            top: `${Math.random() * 60}%`,
            left: '-8%',
            opacity: 0
          }}
          animate={{
            left: ['115%'],
            top: [`${Math.random() * 60}%`, `${Math.random() * 40 + 60}%`],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 2,
            delay: i * 2.5 + 4,
            repeat: Infinity,
            repeatDelay: 8,
            ease: "easeIn"
          }}
        >
          <div className="absolute inset-0 w-32 h-1 bg-gradient-to-r from-transparent to-phoenix-primary/90 transform -translate-y-1/2 origin-right -rotate-45" />
        </motion.div>
      ))}
      
      {/* Subtle creative transition to next section - no blue/black elements */}
      <div className="absolute bottom-0 left-0 right-0 h-80 pointer-events-none z-20">
        {/* Subtle energy particle streams flowing to next section - centered */}
        <div className="absolute inset-0" style={{ left: '16rem' }}>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`flow-particle-${i}`}
              className="absolute w-1 h-16 rounded-full"
              style={{
                left: `${30 + i * 6}%`,
                top: '60%',
                background: `linear-gradient(to bottom, transparent, ${i % 2 === 0 ? 'rgba(255, 140, 0, 0.3)' : 'rgba(59, 130, 246, 0.3)'})`,
                filter: 'blur(2px)'
              }}
              animate={{
                y: ['0px', '120px'],
                opacity: [0, 0.6, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 4,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
        
        {/* Sidebar interaction particles */}
        <div className="absolute left-0 top-0 w-64 h-full">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`sidebar-particle-${i}`}
              className="absolute w-2 h-2 rounded-full bg-phoenix-primary/40"
              style={{
                left: `${60 + i * 20}%`,
                top: `${30 + i * 20}%`
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.3, 1]
              }}
              transition={{
                duration: 3 + i,
                delay: i * 0.8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        {/* Subtle atmospheric glow - no harsh lines */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-20"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255, 140, 0, 0.1) 0%, transparent 70%)',
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Final gentle blend overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void-primary/30" />
      </div>
    </div>
  );
};

export default HeroSection;