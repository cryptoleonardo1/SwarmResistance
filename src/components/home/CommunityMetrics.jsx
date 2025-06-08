import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, MapPin, Zap } from 'lucide-react';

// Metrics data
const metricsData = [
  {
    icon: <Users size={24} className="text-neon-cyan" />,
    title: "HERO ARTIFACTS",
    value: 0,
    target: 4023,
    //suffix: "+",
    description: "Combat-ready operatives deployed across web and Telegram battlefronts",
    iconBackground: "bg-neon-cyan/20",
    textColor: "text-neon-cyan",
    color: "#00F0FF",
    buildingImage: "/buildings/blue-tower.png",
  },
  {
    icon: <Shield size={24} className="text-meda-gold" />,
    title: "WEAPONS",
    value: 0,
    target: 10350,
    //suffix: "+",
    description: "Legendary warriors with specialized combat abilities and battle histories",
    iconBackground: "bg-meda-gold/20",
    textColor: "text-meda-gold",
    color: "#FFB61E",
    buildingImage: "/buildings/gold-tower.png",
  },
  {
    icon: <MapPin size={24} className="text-nebula-pink" />,
    title: "LIBERATED LANDS",
    value: 0,
    target: 449,
    //suffix: "+",
    description: "Strategic zones reclaimed from Swarm control across multiple sectors",
    iconBackground: "bg-nebula-pink/20",
    textColor: "text-nebula-pink",
    color: "#FF3E8A",
    buildingImage: "/buildings/pink-tower.png",
  },
  {
    icon: <Zap size={24} className="text-energy-green" />,
    title: "MEDA GAS Released",
    value: 0,
    target: 15000000,
    //suffix: "+",
    description: "Critical energy resources powering the resistance war machine",
    iconBackground: "bg-energy-green/20",
    textColor: "text-energy-green",
    color: "#39FF14",
    buildingImage: "/buildings/green-tower.png",
  }
];

const CommunityMetrics = () => {
  // References and state for counter animation
  const [counters, setCounters] = useState(metricsData.map(() => 0));
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const sectionRef = useRef(null);
  const animationTriggered = useRef(false);

  // Counter animation effect
  useEffect(() => {
    const currentSectionRef = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        
        if (entry.isIntersecting && !animationTriggered.current) {
          animationTriggered.current = true;
          
          // Start counting animation for each metric
          metricsData.forEach((metric, index) => {
            const duration = 2000; // 2 seconds
            const frameDuration = 1000 / 60; // 60fps
            const totalFrames = Math.round(duration / frameDuration);
            const step = metric.target / totalFrames;
            
            let currentValue = 0;
            let frame = 0;
            
            const intervalId = setInterval(() => {
              frame++;
              currentValue += step;
              
              if (frame === totalFrames) {
                clearInterval(intervalId);
                currentValue = metric.target;
              }
              
              setCounters(prevCounters => {
                const newCounters = [...prevCounters];
                newCounters[index] = Math.floor(currentValue);
                return newCounters;
              });
            }, frameDuration);
          });
        }
      },
      { threshold: 0.3 }
    );
    
    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }
    
    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Diamond mirror pattern transition from previous section */}
      <div className="absolute top-0 left-0 right-0 h-80 pointer-events-none z-20">      
        {/* Subtle energy cascade - less visible */}
        <div className="absolute inset-0" style={{ left: '16rem' }}>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`cascade-${i}`}
              className="absolute w-1 h-16 rounded-full"
              style={{
                left: `${35 + i * 8}%`,
                top: '20px',
                background: `linear-gradient(to bottom, ${i % 2 === 0 ? 'rgba(255, 140, 0, 0.2)' : 'rgba(59, 130, 246, 0.2)'}, transparent)`,
                filter: 'blur(2px)'
              }}
              animate={{
                y: ['0px', '180px'],
                opacity: [0, 0.4, 0]
              }}
              transition={{
                duration: 3.5,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Enhanced space background */}
      <div className="absolute inset-0 w-full h-full">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-void-primary via-void-secondary to-resistance-primary/40" />
        
        {/* Animated background stars */}
        <motion.div className="absolute inset-0 w-full h-full">
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${1 + Math.random() * 3}px`,
                height: `${1 + Math.random() * 3}px`,
                backgroundColor: i % 3 === 0 ? '#FF8C00' : i % 3 === 1 ? '#3B82F6' : '#FFFFFF',
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.3, 1]
              }}
              transition={{
                duration: 2 + Math.random() * 4,
                delay: Math.random() * 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Section content with optimized spacing */}
      <div className="relative z-10 min-h-screen w-full pt-6 md:pl-64">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
          
          {/* Optimized Section Header - Matching Mission Briefing style */}
          <motion.div 
            className="text-center mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-orbitron font-bold text-center mb-3 text-phoenix-primary relative inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Battle Status Report
            </motion.h2>
            
            <motion.p 
              className="mt-2 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-phoenix-light/80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Real-time intelligence from our resistance operations
            </motion.p>
          </motion.div>

          {/* Content wrapper */}
          <div className="relative w-full flex flex-col justify-end flex-1" style={{ minHeight: 'calc(100vh - 200px)' }}>
            {/* Spacer to push content down more */}
            <div className="flex-grow" style={{ minHeight: '120px' }}></div>
            
            {/* Simplified traffic animation layer - positioned between title and city */}
            <div className="absolute inset-x-0 pointer-events-none" style={{ bottom: '600px', height: '200px' }}>
              {/* Horizontal fast gold lines moving left to right */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`gold-line-ltr-${i}`}
                  className="absolute"
                  style={{
                    top: `${20 + i * 20}%`,
                    left: '-200px',
                    height: '2px',
                    width: '100px',
                  }}
                  animate={{
                    x: ['0px', 'calc(100vw + 400px)'],
                  }}
                  transition={{
                    duration: 2 + (i % 2) * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.8,
                  }}
                >
                  <div 
                    className="w-full h-full bg-gradient-to-r from-transparent via-meda-gold to-transparent"
                    style={{
                      boxShadow: '0 0 8px #FFB61E, 0 0 15px #FFB61E80',
                    }}
                  />
                </motion.div>
              ))}

              {/* Diagonal fast gold lines moving right to left */}
              {[...Array(2)].map((_, i) => (
                <motion.div
                  key={`gold-line-rtl-${i}`}
                  className="absolute"
                  style={{
                    top: `${40 + i * 25}%`,
                    right: '-150px',
                    height: '2px',
                    width: '80px',
                    transform: 'rotate(-15deg)',
                  }}
                  animate={{
                    x: ['0px', 'calc(-100vw - 300px)'],
                  }}
                  transition={{
                    duration: 1.8 + (i % 2) * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 1.2 + 1,
                  }}
                >
                  <div 
                    className="w-full h-full bg-gradient-to-r from-transparent via-meda-gold to-transparent"
                    style={{
                      boxShadow: '0 0 6px #FFB61E, 0 0 12px #FFB61E60',
                    }}
                  />
                </motion.div>
              ))}
            </div>
            
            {/* Full-width city horizon background - positioned lower */}
            <div 
              className="absolute w-screen -ml-[50vw] left-1/2"
              style={{ 
                bottom: '320px',
                height: '400px'
              }}
            >
              <div 
                className="absolute inset-0 w-full h-full bg-no-repeat bg-bottom opacity-40"
                style={{ 
                  backgroundImage: "url('/buildings/city-horizon.png')",
                  backgroundSize: "contain",
                  backgroundPosition: "center bottom"
                }}
              />
            </div>
            
            {/* Buildings section - moved up */}
            <div ref={sectionRef} className="relative z-10 mb-4">
              <div className="flex justify-between items-end max-w-6xl mx-auto px-4">
                {metricsData.map((metric, index) => (
                  <div key={index} className="relative flex flex-col items-center flex-1">
                    {/* Building Image with connected hover effects */}
                    <div className="relative">
                      {/* Hover glow effect around building */}
                      <motion.div
                        className="absolute inset-0 -m-8 rounded-full pointer-events-none"
                        style={{
                          background: `radial-gradient(circle, ${metric.color}30 0%, ${metric.color}15 30%, transparent 70%)`,
                        }}
                        animate={{
                          opacity: hoveredIndex === index ? 1 : 0,
                          scale: hoveredIndex === index ? 1.2 : 0.8,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      <motion.img 
                        src={metric.buildingImage} 
                        alt={metric.title}
                        className="h-[120px] md:h-[150px] lg:h-[240px] object-contain transform-gpu cursor-pointer"
                        style={{ 
                          marginBottom: '+5px',
                          transformOrigin: 'bottom center'
                        }}
                        animate={{
                          scale: hoveredIndex === index ? 1.3 : 1,
                          filter: hoveredIndex === index 
                            ? `drop-shadow(0 0 25px ${metric.color}) drop-shadow(0 0 40px ${metric.color}80)`
                            : `drop-shadow(0 0 15px ${metric.color}50)`
                        }}
                        transition={{ duration: 0.3 }}
                        onHoverStart={() => setHoveredIndex(index)}
                        onHoverEnd={() => setHoveredIndex(null)}
                        onError={(e) => {
                          console.error(`Failed to load image: ${metric.buildingImage}`);
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Horizontal energy lines positioned at city horizon edge */}
            <div className="relative w-full mb-6">
              <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-4 gap-4">
                  {metricsData.map((metric, index) => (
                    <motion.div
                      key={index}
                      className="h-[3px] rounded-full"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${metric.color}, transparent)`,
                        boxShadow: `0 0 8px ${metric.color}80`
                      }}
                      animate={{
                        opacity: [0.6, 1, 0.6],
                        boxShadow: [
                          `0 0 8px ${metric.color}80`,
                          `0 0 15px ${metric.color}CC`,
                          `0 0 8px ${metric.color}80`
                        ]
                      }}
                      transition={{
                        duration: 2 + index * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Metrics Cards with enhanced border styling */}
            <div className="pb-24">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto px-4">
                {metricsData.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center p-6 relative overflow-hidden group rounded-lg cursor-pointer backdrop-blur-md"
                    style={{
                      background: 'rgba(15, 15, 35, 0.4)',
                      border: `2px solid ${metric.color}`,
                      boxShadow: `0 0 20px ${metric.color}40`
                    }}
                    whileHover={{ 
                      y: -8,
                      boxShadow: `0 0 30px ${metric.color}80, 0 15px 40px -15px ${metric.color}60`
                    }}
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                  >
                    {/* Enhanced glowing border effect */}
                    <motion.div
                      className="absolute inset-0 rounded-lg pointer-events-none"
                      style={{
                        border: `2px solid ${metric.color}`,
                        opacity: 0.6
                      }}
                      animate={{
                        opacity: [0.6, 1, 0.6],
                        boxShadow: [
                          `inset 0 0 20px ${metric.color}20, 0 0 20px ${metric.color}40`,
                          `inset 0 0 30px ${metric.color}40, 0 0 30px ${metric.color}80`,
                          `inset 0 0 20px ${metric.color}20, 0 0 20px ${metric.color}40`
                        ]
                      }}
                      transition={{
                        duration: 2 + index * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                    />
                    
                    {/* Corner accent lights */}
                    <motion.div
                      className="absolute top-2 left-2 w-2 h-2 rounded-full"
                      style={{
                        background: metric.color,
                        boxShadow: `0 0 8px ${metric.color}`
                      }}
                      animate={{
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3
                      }}
                    />
                    
                    <motion.div
                      className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full"
                      style={{
                        background: metric.color,
                        boxShadow: `0 0 6px ${metric.color}`
                      }}
                      animate={{
                        opacity: [0.4, 0.8, 0.4],
                        scale: [1, 1.3, 1]
                      }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3 + 0.5
                      }}
                    />
                    
                    {/* Title with enhanced styling - bigger text */}
                    <h3 className="text-lg md:text-xl font-bold mb-4 font-orbitron tracking-wide"
                        style={{ color: metric.color }}>
                      {metric.title}
                    </h3>
                    
                    {/* Value with enhanced glow */}
                    <div className="font-jetbrains text-3xl md:text-4xl font-bold mb-3">
                      <motion.span 
                        className={metric.textColor}
                        style={{
                          textShadow: `0 0 10px ${metric.color}80`
                        }}
                        animate={{ 
                          textShadow: [
                            `0 0 10px ${metric.color}80`, 
                            `0 0 20px ${metric.color}CC`, 
                            `0 0 10px ${metric.color}80`
                          ] 
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {counters[index].toLocaleString()}
                      </motion.span>
                      <span className="text-stellar-white">{metric.suffix}</span>
                    </div>

                    {/* Bottom accent line */}
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-1 rounded-b-lg"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${metric.color}, transparent)`
                      }}
                      animate={{
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.4
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Cyberpunk Ground Effect - Full Width Below City */}
      <div className="absolute bottom-0 left-0 right-0 h-96 pointer-events-none z-5">
        {/* Main cyberpunk grid floor spanning full width */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-full"
          style={{
            background: `
              linear-gradient(90deg, rgba(0, 240, 255, 0.4) 1px, transparent 1px),
              linear-gradient(0deg, rgba(0, 240, 255, 0.4) 1px, transparent 1px),
              linear-gradient(45deg, rgba(255, 140, 0, 0.3) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(255, 140, 0, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px, 60px 60px, 120px 120px, 120px 120px',
            transform: 'perspective(1000px) rotateX(80deg)',
            transformOrigin: 'bottom center',
            opacity: 0.7
          }}
          animate={{
            backgroundPosition: [
              '0px 0px, 0px 0px, 0px 0px, 0px 0px',
              '60px 0px, 0px 60px, 120px 0px, -120px 0px'
            ]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Glowing horizontal grid lines */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`grid-h-${i}`}
            className="absolute w-full h-px"
            style={{
              bottom: `${80 + i * 35}px`,
              background: 'linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.9), transparent)',
              transform: 'perspective(1000px) rotateX(80deg)',
              transformOrigin: 'bottom center'
            }}
            animate={{
              opacity: [0.4, 0.9, 0.4],
              boxShadow: [
                '0 0 8px rgba(0, 240, 255, 0.6)',
                '0 0 20px rgba(0, 240, 255, 0.9)',
                '0 0 8px rgba(0, 240, 255, 0.6)'
              ]
            }}
            transition={{
              duration: 4 + i * 0.5,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Vertical perspective grid lines */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`grid-v-${i}`}
            className="absolute h-full w-px"
            style={{
              left: `${8 + i * 8}%`,
              background: 'linear-gradient(180deg, transparent, rgba(255, 140, 0, 0.7), rgba(0, 240, 255, 0.9))',
              transform: 'perspective(1000px) rotateX(80deg)',
              transformOrigin: 'bottom center'
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
              boxShadow: [
                '0 0 4px rgba(255, 140, 0, 0.5)',
                '0 0 12px rgba(255, 140, 0, 0.8)',
                '0 0 4px rgba(255, 140, 0, 0.5)'
              ]
            }}
            transition={{
              duration: 5 + i * 0.2,
              delay: i * 0.15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Data stream particles racing across the grid */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`data-particle-${i}`}
            className="absolute w-3 h-3 rounded-full"
            style={{
              background: i % 3 === 0 ? 'rgba(0, 240, 255, 1)' : i % 3 === 1 ? 'rgba(255, 140, 0, 1)' : 'rgba(34, 197, 94, 1)',
              boxShadow: `0 0 15px ${i % 3 === 0 ? '#00F0FF' : i % 3 === 1 ? '#FF8C00' : '#22C55E'}`,
              bottom: '100px',
              transform: 'perspective(1000px) rotateX(80deg)',
              transformOrigin: 'bottom center'
            }}
            animate={{
              x: ['-100px', 'calc(100vw + 100px)'],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: 12 + i * 2,
              delay: i * 4,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
        
        {/* Cyberpunk energy pulses from center */}
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-32"
          style={{
            background: 'radial-gradient(ellipse at center bottom, rgba(0, 240, 255, 0.4) 0%, rgba(255, 140, 0, 0.3) 40%, transparent 70%)',
            transform: 'perspective(1000px) rotateX(80deg)',
            transformOrigin: 'bottom center'
          }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Matrix-style data cascades */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`matrix-cascade-${i}`}
            className="absolute w-px h-24"
            style={{
              left: `${15 + i * 12}%`,
              background: 'linear-gradient(180deg, transparent, rgba(0, 240, 255, 1), rgba(0, 240, 255, 0.3), transparent)',
              transform: 'perspective(1000px) rotateX(80deg)',
              transformOrigin: 'bottom center'
            }}
            animate={{
              y: ['150px', '-150px'],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 4,
              delay: i * 0.8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
        
        {/* Horizon glow effect */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20"
          style={{
            background: 'linear-gradient(180deg, transparent, rgba(0, 240, 255, 0.2), rgba(255, 140, 0, 0.3))',
            transform: 'perspective(1000px) rotateX(80deg)',
            transformOrigin: 'bottom center'
          }}
        />
      </div>
      
      {/* Diamond mirror pattern transition to next section - above cyberpunk ground */}
      <div className="absolute bottom-0 left-0 right-0 h-80 pointer-events-none z-20">

        
        {/* Subtle energy streams - less visible */}
        <div className="absolute inset-0" style={{ left: '16rem' }}>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`descent-stream-${i}`}
              className="absolute w-1 h-16 rounded-full"
              style={{
                left: `${38 + i * 8}%`,
                bottom: '20px',
                background: `linear-gradient(to top, ${i % 2 === 0 ? 'rgba(255, 140, 0, 0.2)' : 'rgba(59, 130, 246, 0.2)'}, transparent)`,
                filter: 'blur(2px)'
              }}
              animate={{
                y: ['0px', '-150px'],
                opacity: [0, 0.4, 0]
              }}
              transition={{
                duration: 4,
                delay: i * 0.4,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
        
        {/* Subtle atmospheric blend */}
        <div className="absolute inset-0 bg-gradient-to-t from-void-primary/20 via-transparent to-transparent" />
      </div>
    </div>
  );
};

export default CommunityMetrics;