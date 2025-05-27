import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, MapPin, Zap } from 'lucide-react';

// Move metricsData outside the component to fix the dependency warning
const metricsData = [
  {
    icon: <Users size={24} className="text-neon-cyan" />,
    title: "ACTIVE EXPLORERS",
    value: 0,
    target: 20000,
    suffix: "+",
    description: "Daily active users across web and Telegram platforms",
    iconBackground: "bg-neon-cyan/20",
    textColor: "text-neon-cyan",
    color: "#00F0FF",
    buildingImage: "/buildings/blue-tower.png",
  },
  {
    icon: <Shield size={24} className="text-meda-gold" />,
    title: "NFT HEROES",
    value: 0,
    target: 5000,
    suffix: "+",
    description: "Unique characters with special abilities and histories",
    iconBackground: "bg-meda-gold/20",
    textColor: "text-meda-gold",
    color: "#FFB61E",
    buildingImage: "/buildings/gold-tower.png",
  },
  {
    icon: <MapPin size={24} className="text-nebula-pink" />,
    title: "LAND PARCELS CLAIMED",
    value: 0,
    target: 12000,
    suffix: "+",
    description: "Territory controlled by players across multiple sectors",
    iconBackground: "bg-nebula-pink/20",
    textColor: "text-nebula-pink",
    color: "#FF3E8A",
    buildingImage: "/buildings/pink-tower.png",
  },
  {
    icon: <Zap size={24} className="text-energy-green" />,
    title: "MEDA GAS PRODUCED DAILY",
    value: 0,
    target: 250000,
    suffix: "+",
    description: "The lifeblood of the Cryptomeda economy",
    iconBackground: "bg-energy-green/20",
    textColor: "text-energy-green",
    color: "#39FF14",
    buildingImage: "/buildings/green-tower.png",
  }
];

const CommunityMetrics = () => {
  // References and state for counter animation
  const [counters, setCounters] = useState(metricsData.map(() => 0));
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

  // Add global smooth scrolling configuration
  useEffect(() => {
    // This sets global smooth scrolling for the entire site
    const smoothScrollCSS = `
      html {
        scroll-behavior: smooth;
        transition-duration: 2s;
        transition-timing-function: cubic-bezier(0.1, 0.9, 0.2, 1);
      }
      
      body {
        scroll-behavior: smooth;
      }
      
      /* Ensure all sections have smooth transitions */
      section {
        transition: all 1.5s cubic-bezier(0.22, 1, 0.36, 1);
      }
      
      /* Fix for full-screen sections */
      .full-screen-section {
        width: 100vw !important;
        max-width: 100vw !important;
        margin: 0 !important;
        padding: 0 !important;
      }
    `;
    
    // Add a style element to the head
    const styleElement = document.createElement('style');
    styleElement.innerHTML = smoothScrollCSS;
    document.head.appendChild(styleElement);
    
    // Cleanup
    return () => {
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative h-screen w-screen flex flex-col overflow-hidden"
      style={{ 
        margin: 0,
        padding: 0,
      }}
    >
      {/* City horizon background - fixed position */}
      <div 
        className="absolute inset-0 w-full bg-no-repeat bg-cover" 
        style={{ 
          backgroundImage: "url('/buildings/city-horizon.png')",
          backgroundPosition: "center bottom",
          backgroundSize: "cover",
          opacity: 0.35,
          zIndex: 0,
          top: "auto",
          bottom: "30%",
          height: "40%",
        }}
      ></div>

      <div className="w-full h-full flex flex-col items-center relative z-10">
        {/* Section title - at the top */}
        <div className="text-center mt-8 mb-4 px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cryptomeda Metrics
          </h2>
          <div className="w-40 h-1 mx-auto mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-meda-gold to-transparent"></div>
          </div>
          <p className="max-w-2xl mx-auto text-gray-300 mb-2">
            Explore the vitals of our thriving digital ecosystem
          </p>
          <p className="max-w-2xl mx-auto text-meda-gold font-bold">
            Collect the most Meda Gas. Expand your empire across the universe.
          </p>
        </div>
        
        {/* Spacer that pushes content to the bottom part of the screen */}
        <div className="flex-grow"></div>
        
        {/* Buildings section - positioned at the bottom */}
        <div className="w-full flex justify-center mb-2">
          <div className="w-full max-w-screen-xl px-4 flex justify-between items-center relative">
            {/* Horizontal energy line */}
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-neon-cyan via-nebula-pink to-energy-green transform -translate-y-1/2 z-0"></div>
            
            {metricsData.map((metric, index) => (
              <div key={index} className="relative z-10 flex flex-col items-center">
                {/* Building Image */}
                <div className="relative">
                  <img 
                    src={metric.buildingImage} 
                    alt={metric.title}
                    className="h-[160px] md:h-[180px] lg:h-[200px] object-contain transform-gpu"
                    style={{ 
                      filter: `drop-shadow(0 0 15px ${metric.color}40)`,
                      marginBottom: "-30px" // Adjust to position directly on the line
                    }}
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
                  ></motion.div>
                </div>
                
                {/* Connector to line - shortened */}
                <div 
                  className="w-[2px] h-[20px]" 
                  style={{ 
                    backgroundColor: metric.color,
                    boxShadow: `0 0 8px ${metric.color}`,
                    marginTop: "-5px" // Fine tuning to connect to the line
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Metrics Cards - below buildings with no margin */}
        <div className="w-full">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 mx-auto" style={{ maxWidth: "calc(100vw - 20px)" }}>
            {metricsData.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="panel text-center p-4 relative overflow-hidden group"
                whileHover={{ 
                  y: -5, 
                  boxShadow: `0 10px 30px -10px ${metric.color}40`
                }}
              >
                {/* Top border highlight */}
                <div 
                  className="absolute top-0 left-0 w-full h-1 opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: metric.color }}
                ></div>
                
                {/* Icon */}
                <div className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 flex items-center justify-center rounded-full ${metric.iconBackground}`}>
                  {metric.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-base md:text-lg font-semibold mb-2 text-gray-300">
                  {metric.title}
                </h3>
                
                {/* Value */}
                <div className="font-jetbrains text-2xl md:text-4xl font-bold mb-2">
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
                <p className="text-xs md:text-sm text-gray-400">
                  {metric.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Bottom spacing */}
        <div className="h-6"></div>
      </div>
      
      {/* Section transition effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void-black to-transparent z-10"></div>
    </section>
  );
};

export default CommunityMetrics;