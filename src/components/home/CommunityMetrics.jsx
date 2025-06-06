import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, MapPin, Zap } from 'lucide-react';

// Metrics data
const metricsData = [
  {
    icon: <Users size={24} className="text-neon-cyan" />,
    title: "HERO ARTIFACTS",
    value: 0,
    target: 3000,
    suffix: "+",
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
    target: 15000,
    suffix: "+",
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
    target: 3500,
    suffix: "+",
    description: "Strategic zones reclaimed from Swarm control across multiple sectors",
    iconBackground: "bg-nebula-pink/20",
    textColor: "text-nebula-pink",
    color: "#FF3E8A",
    buildingImage: "/buildings/pink-tower.png",
  },
  {
    icon: <Zap size={24} className="text-energy-green" />,
    title: "MEDA GAS PRODUCED",
    value: 0,
    target: 400000,
    suffix: "+",
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
      <div className="relative z-10 min-h-screen w-full pt-16 md:pl-64">
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
            
            {/* Traffic animation layer - positioned between title and city */}
            <div className="absolute inset-x-0 pointer-events-none" style={{ bottom: '600px', height: '200px' }}>
              {/* Horizontal fast gold lines moving left to right */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`gold-line-ltr-${i}`}
                  className="absolute"
                  style={{
                    top: `${15 + i * 15}%`,
                    left: '-200px',
                    height: '2px',
                    width: '100px',
                  }}
                  animate={{
                    x: ['0px', 'calc(100vw + 400px)'],
                  }}
                  transition={{
                    duration: 1.5 + (i % 3) * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.4,
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
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`gold-line-rtl-${i}`}
                  className="absolute"
                  style={{
                    top: `${25 + i * 18}%`,
                    right: '-150px',
                    height: '2px',
                    width: '80px',
                    transform: 'rotate(-15deg)',
                  }}
                  animate={{
                    x: ['0px', 'calc(-100vw - 300px)'],
                  }}
                  transition={{
                    duration: 1.2 + (i % 2) * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.6 + 0.8,
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

              {/* Curved gold traffic paths */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`gold-curve-${i}`}
                  className="absolute"
                  style={{
                    left: `${15 + i * 30}%`,
                    top: `${35 + i * 10}%`,
                  }}
                >
                  <motion.div
                    className="w-3 h-3 rounded-full bg-meda-gold"
                    style={{
                      boxShadow: '0 0 12px #FFB61E, 0 0 20px #FFB61E60',
                    }}
                    animate={{
                      x: [0, 100, 200, 180, 80, 0],
                      y: [0, -30, -15, 10, 20, 0],
                      opacity: [0.8, 1, 1, 1, 0.8, 0.8],
                    }}
                    transition={{
                      duration: 4 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 1.2,
                    }}
                  />
                  {/* Trail effect */}
                  <motion.div
                    className="absolute top-0 left-0 w-2 h-2 rounded-full bg-meda-gold/60"
                    style={{
                      boxShadow: '0 0 8px #FFB61E60',
                    }}
                    animate={{
                      x: [0, 100, 200, 180, 80, 0],
                      y: [0, -30, -15, 10, 20, 0],
                      opacity: [0.4, 0.7, 0.7, 0.7, 0.4, 0.4],
                    }}
                    transition={{
                      duration: 4 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 1.2 + 0.1,
                    }}
                  />
                </motion.div>
              ))}

              {/* Fast streaking gold lines (shooting star effect) */}
              {[...Array(2)].map((_, i) => (
                <motion.div
                  key={`gold-streak-${i}`}
                  className="absolute"
                  style={{
                    top: `${30 + i * 25}%`,
                    left: '-100px',
                    height: '3px',
                    width: '180px',
                    transform: `rotate(${-10 + i * 5}deg)`,
                  }}
                  animate={{
                    x: ['0px', 'calc(100vw + 300px)'],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeIn",
                    delay: i * 3 + 2,
                    repeatDelay: 4,
                  }}
                >
                  <div 
                    className="w-full h-full bg-gradient-to-r from-transparent via-meda-gold to-meda-gold/20"
                    style={{
                      boxShadow: '0 0 12px #FFB61E, 0 0 20px #FFB61E80',
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
            <div ref={sectionRef} className="relative z-10 mb-4"> {/* Reduced margin from mb-6 to mb-4 */}
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
                        className="h-[120px] md:h-[150px] lg:h-[220px] object-contain transform-gpu cursor-pointer" // Increased height as in your code
                        style={{ 
                          marginBottom: '+10px', // As in your code
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
                      
                      {/* Energy beam 
                      <motion.div
                        className="absolute bottom-0 left-1/2 w-[3px] transform -translate-x-1/2"
                        style={{ 
                          backgroundColor: metric.color, 
                          boxShadow: `0 0 8px ${metric.color}`,
                          height: '0%'
                        }}
                        animate={{ 
                          height: ["0%", "100%", "0%"]
                        }}
                        transition={{
                          duration: 3,
                          ease: "easeInOut",
                          times: [0, 0.5, 1],
                          repeat: Infinity,
                          repeatDelay: 1,
                          delay: index * 0.5
                        }}
                      />
                      */}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Horizontal energy lines positioned at city horizon edge */}
            <div className="relative w-full mb-6"> {/* Reduced margin from mb-8 to mb-6 */}
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
            <div className="pb-24"> {/* Increased bottom padding from pb-20 to pb-24 */}
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
    </div>
  );
};

export default CommunityMetrics;