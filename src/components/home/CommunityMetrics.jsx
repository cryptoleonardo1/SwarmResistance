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
    description: "Combat-ready operatives deployed across web and Telegram battlefronts",
    iconBackground: "bg-neon-cyan/20",
    textColor: "text-neon-cyan",
    color: "#00F0FF",
    buildingImage: "/buildings/blue-tower.png",
  },
  {
    icon: <Shield size={24} className="text-meda-gold" />,
    title: "UPGRADABLE WEAPONS",
    value: 0,
    target: 10350,
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
    description: "Strategic zones reclaimed from Swarm control across multiple sectors",
    iconBackground: "bg-nebula-pink/20",
    textColor: "text-nebula-pink",
    color: "#FF3E8A",
    buildingImage: "/buildings/pink-tower.png",
  },
  {
    icon: <Zap size={24} className="text-energy-green" />,
    title: "MEDA GAS OUT (Mil)",
    value: 0,
    target: 150,
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
      {/* Simplified transition from previous section */}
      <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none z-20">      
        {/* Minimal energy cascade */}
        <div className="absolute inset-0" style={{ left: '16rem' }}>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`cascade-${i}`}
              className="absolute w-1 h-12 rounded-full"
              style={{
                left: `${40 + i * 15}%`,
                top: '10px',
                background: `linear-gradient(to bottom, ${i % 2 === 0 ? 'rgba(255, 140, 0, 0.3)' : 'rgba(59, 130, 246, 0.3)'}, transparent)`,
                filter: 'blur(1px)'
              }}
              animate={{
                y: ['0px', '120px'],
                opacity: [0, 0.5, 0]
              }}
              transition={{
                duration: 3,
                delay: i * 0.8,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Simplified background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-void-primary via-void-secondary to-resistance-primary/30" />
        
        {/* Reduced background stars */}
        <motion.div className="absolute inset-0 w-full h-full">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
                backgroundColor: i % 3 === 0 ? '#FF8C00' : i % 3 === 1 ? '#3B82F6' : '#FFFFFF',
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Section content with proper layout flow */}
      <div className="relative z-10 min-h-screen w-full pt-6 md:pl-64">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
          
          {/* Section Header */}
          <motion.div 
            className="text-center mb-8"
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

          {/* Content positioned to fit screen */}
          <div className="flex-1 flex flex-col justify-end relative">
            
            {/* Traffic animation positioned absolutely */}
            <div className="absolute top-20 left-0 right-0 h-20 pointer-events-none z-10">
              {[...Array(2)].map((_, i) => (
                <motion.div
                  key={`gold-line-${i}`}
                  className="absolute"
                  style={{
                    top: `${20 + i * 30}px`,
                    left: '-150px',
                    height: '2px',
                    width: '80px',
                  }}
                  animate={{
                    x: ['0px', 'calc(100vw + 300px)'],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 1.5,
                  }}
                >
                  <div 
                    className="w-full h-full bg-gradient-to-r from-transparent via-meda-gold to-transparent"
                    style={{
                      boxShadow: '0 0 8px #FFB61E',
                    }}
                  />
                </motion.div>
              ))}
            </div>
            
            {/* Main visual section - increased height for full city horizon */}
            <div className="relative" style={{ height: '700px' }}>
              
              {/* City horizon background - full width, much larger height */}
              <div className="absolute bottom-0 w-screen left-1/2 transform -translate-x-1/2">
                <div 
                  className="w-full h-[500px] bg-no-repeat bg-bottom opacity-40"
                  style={{ 
                    backgroundImage: "url('/buildings/city-horizon.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center bottom"
                  }}
                />
              </div>
              
              {/* Buildings positioned to align with city horizon - bigger sizes */}
              <div ref={sectionRef} className="absolute bottom-0 left-0 right-0 z-10">
                <div className="flex justify-between items-end max-w-6xl mx-auto px-4">
                  {metricsData.map((metric, index) => (
                    <div key={index} className="relative flex flex-col items-center flex-1">
                      <div className="relative">
                        {/* Hover glow effect */}
                        {hoveredIndex === index && (
                          <motion.div
                            className="absolute inset-0 -m-10 rounded-full pointer-events-none"
                            style={{
                              background: `radial-gradient(circle, ${metric.color}20 0%, transparent 60%)`,
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1.1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                        
                        <motion.img 
                          src={metric.buildingImage} 
                          alt={metric.title}
                          className="h-[220px] md:h-[280px] lg:h-[350px] object-contain transform-gpu cursor-pointer"
                          style={{ 
                            transformOrigin: 'bottom center'
                          }}
                          animate={{
                            scale: hoveredIndex === index ? 1.15 : 1,
                            filter: hoveredIndex === index 
                              ? `drop-shadow(0 0 30px ${metric.color})`
                              : `drop-shadow(0 0 20px ${metric.color}50)`
                          }}
                          transition={{ duration: 0.2 }}
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
              
              {/* Energy lines positioned BELOW buildings */}
              <div className="absolute -bottom-8 left-0 right-0 z-10">
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
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.3
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Metrics Cards - bigger size with better spacing */}
            <div className="mt-12 mb-20">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
                {metricsData.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center p-8 relative overflow-hidden group rounded-lg cursor-pointer backdrop-blur-md"
                    style={{
                      background: 'rgba(15, 15, 35, 0.4)',
                      border: `2px solid ${metric.color}`,
                      boxShadow: `0 0 20px ${metric.color}40`
                    }}
                    whileHover={{ 
                      y: -8,
                      boxShadow: `0 0 30px ${metric.color}70`
                    }}
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                  >
                    {/* Enhanced border effect */}
                    <motion.div
                      className="absolute inset-0 rounded-lg pointer-events-none"
                      style={{
                        border: `1px solid ${metric.color}`,
                        opacity: 0.4
                      }}
                      animate={{
                        opacity: [0.4, 0.8, 0.4],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.4
                      }}
                    />
                    
                    {/* Corner accent - bigger */}
                    <motion.div
                      className="absolute top-3 left-3 w-2 h-2 rounded-full"
                      style={{
                        background: metric.color,
                        boxShadow: `0 0 8px ${metric.color}`
                      }}
                      animate={{
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2
                      }}
                    />
                    
                    {/* Title - bigger */}
                    <h3 className="text-xl md:text-2xl font-bold mb-6 font-orbitron tracking-wide"
                        style={{ color: metric.color }}>
                      {metric.title}
                    </h3>
                    
                    {/* Value - bigger */}
                    <div className="font-jetbrains text-4xl md:text-5xl font-bold mb-4">
                      <motion.span 
                        className={metric.textColor}
                        style={{
                          textShadow: `0 0 10px ${metric.color}70`
                        }}
                        animate={{ 
                          textShadow: [
                            `0 0 10px ${metric.color}70`, 
                            `0 0 15px ${metric.color}90`, 
                            `0 0 10px ${metric.color}70`
                          ] 
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {counters[index].toLocaleString()}
                      </motion.span>
                    </div>

                    {/* Bottom accent line - enhanced */}
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-1.5 rounded-b-lg"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${metric.color}, transparent)`
                      }}
                      animate={{
                        opacity: [0.4, 0.8, 0.4],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Simplified Ground Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-5">
        {/* Main grid floor */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-full opacity-50"
          style={{
            background: `
              linear-gradient(90deg, rgba(0, 240, 255, 0.3) 1px, transparent 1px),
              linear-gradient(0deg, rgba(0, 240, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            transform: 'perspective(800px) rotateX(75deg)',
            transformOrigin: 'bottom center'
          }}
          animate={{
            backgroundPosition: [
              '0px 0px, 0px 0px',
              '80px 0px, 0px 80px'
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Horizontal grid lines */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`grid-h-${i}`}
            className="absolute w-full h-px"
            style={{
              bottom: `${40 + i * 30}px`,
              background: 'linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.6), transparent)',
              transform: 'perspective(800px) rotateX(75deg)',
              transformOrigin: 'bottom center'
            }}
            animate={{
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3 + i * 0.5,
              delay: i * 0.4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Data particles */}
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={`data-particle-${i}`}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: i % 2 === 0 ? 'rgba(0, 240, 255, 1)' : 'rgba(255, 140, 0, 1)',
              boxShadow: `0 0 10px ${i % 2 === 0 ? '#00F0FF' : '#FF8C00'}`,
              bottom: '60px',
              transform: 'perspective(800px) rotateX(75deg)',
              transformOrigin: 'bottom center'
            }}
            animate={{
              x: ['-80px', 'calc(100vw + 80px)'],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: 8 + i * 2,
              delay: i * 4,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
        
        {/* Center energy pulse */}
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-16"
          style={{
            background: 'radial-gradient(ellipse at center bottom, rgba(0, 240, 255, 0.3) 0%, transparent 60%)',
            transform: 'perspective(800px) rotateX(75deg)',
            transformOrigin: 'bottom center'
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-20">
        <div className="absolute inset-0" style={{ left: '16rem' }}>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`descent-stream-${i}`}
              className="absolute w-1 h-12 rounded-full"
              style={{
                left: `${40 + i * 10}%`,
                bottom: '10px',
                background: `linear-gradient(to top, ${i % 2 === 0 ? 'rgba(255, 140, 0, 0.2)' : 'rgba(59, 130, 246, 0.2)'}, transparent)`,
                filter: 'blur(1px)'
              }}
              animate={{
                y: ['0px', '-80px'],
                opacity: [0, 0.4, 0]
              }}
              transition={{
                duration: 3,
                delay: i * 0.6,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityMetrics;