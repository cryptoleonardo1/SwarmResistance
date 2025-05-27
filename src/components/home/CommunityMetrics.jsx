import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, MapPin, Zap } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';

// Metrics data
const metricsData = [
  {
    icon: <Users size={24} className="text-neon-cyan" />,
    title: "ACTIVE RESISTANCE FIGHTERS",
    value: 0,
    target: 8000,
    suffix: "+",
    description: "Combat-ready operatives deployed across web and Telegram battlefronts",
    iconBackground: "bg-neon-cyan/20",
    textColor: "text-neon-cyan",
    color: "#00F0FF",
    buildingImage: "/buildings/blue-tower.png",
  },
  {
    icon: <Shield size={24} className="text-meda-gold" />,
    title: "DEPLOYED HEROES",
    value: 0,
    target: 5000,
    suffix: "+",
    description: "Legendary warriors with specialized combat abilities and battle histories",
    iconBackground: "bg-meda-gold/20",
    textColor: "text-meda-gold",
    color: "#FFB61E",
    buildingImage: "/buildings/gold-tower.png",
  },
  {
    icon: <MapPin size={24} className="text-nebula-pink" />,
    title: "LIBERATED TERRITORIES",
    value: 0,
    target: 12000,
    suffix: "+",
    description: "Strategic zones reclaimed from Swarm control across multiple sectors",
    iconBackground: "bg-nebula-pink/20",
    textColor: "text-nebula-pink",
    color: "#FF3E8A",
    buildingImage: "/buildings/pink-tower.png",
  },
  {
    icon: <Zap size={24} className="text-energy-green" />,
    title: "MEDA GAS EXTRACTED DAILY",
    value: 0,
    target: 250000,
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
    <SectionWrapper
      title="Battle Status Report"
      subtitle="Real-time intelligence from our resistance operations"
      className="relative"
    >
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
        
        {/* Buildings and metrics wrapper */}
        <div ref={sectionRef} className="relative z-10">
          {/* Buildings section */}
          <div className="relative mb-6">
            <div className="flex justify-between items-end max-w-6xl mx-auto px-4">
              {/* Horizontal energy line */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-neon-cyan via-meda-gold through-nebula-pink to-energy-green"></div>
              
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
                      className="h-[120px] md:h-[150px] lg:h-[180px] object-contain transform-gpu cursor-pointer"
                      style={{ 
                        marginBottom: '-3px',
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
                    
                    {/* Energy beam */}
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
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Metrics Cards with connected hover */}
          <div className="pb-20">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto px-4">
              {metricsData.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glassmorphism text-center p-4 relative overflow-hidden group rounded-lg cursor-pointer"
                  whileHover={{ 
                    y: -5, 
                    boxShadow: `0 10px 30px -10px ${metric.color}60`
                  }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  {/* Top border highlight */}
                  <div 
                    className="absolute top-0 left-0 w-full h-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: metric.color }}
                  />
                  
                  {/* Icon */}
                  <div className={`w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full ${metric.iconBackground}`}>
                    {metric.icon}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-sm font-semibold mb-2 text-gray-300">
                    {metric.title}
                  </h3>
                  
                  {/* Value */}
                  <div className="font-jetbrains text-3xl md:text-4xl font-bold mb-2">
                    <motion.span 
                      className={metric.textColor}
                      animate={{ 
                        textShadow: [
                          `0 0 4px ${metric.color}80`, 
                          `0 0 8px ${metric.color}CC`, 
                          `0 0 4px ${metric.color}80`
                        ] 
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {counters[index].toLocaleString()}
                    </motion.span>
                    <span className="text-stellar-white">{metric.suffix}</span>
                  </div>
                  
                  {/* Description */}
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {metric.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default CommunityMetrics;