import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Gamepad2, Zap, Shield } from 'lucide-react';


const MissionBriefing = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax values for background layers
  const nebula1Y = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const nebula2Y = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const starsY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const planetY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const planetScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1.2]);
  const planetRotate = useTransform(scrollYProgress, [0, 1], [0, 30]);
  
  // Updated feature cards with shorter descriptions
  const missionObjectives = [
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-phoenix-primary">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "PHOENIX ESSENCE WARFARE",
      description: "Deploy Hero Artifacts and Weapon NFTs on strategic territories. Build synergies to maximize Phoenix Essence generation daily.",
      color: "from-phoenix-primary/10 to-transparent",
      borderColor: "border-phoenix-primary/30",
      shadowColor: "0 0 25px rgba(255, 140, 0, 0.4)",
      underlineColor: "#FF8C00"
    },
    {
      icon: <Gamepad2 size={40} className="text-resistance-light" />,
      title: "TACTICAL OPERATIONS",
      description: "Battle the Swarm through 2D shooter, mini-games, daily missions, and strategic challenges across multiple platforms.",
      color: "from-resistance-light/10 to-transparent",
      borderColor: "border-resistance-light/30",
      shadowColor: "0 0 25px rgba(59, 130, 246, 0.4)",
      underlineColor: "#3B82F6"
    },
    {
      icon: <Shield size={40} className="text-energy-green" />,
      title: "GUARDIAN ADVANCEMENT",
      description: "Accumulate Phoenix Essence through all activities. Rise through Guardian ranks and prepare for future token airdrops.",
      color: "from-energy-green/10 to-transparent",
      borderColor: "border-energy-green/30",
      shadowColor: "0 0 25px rgba(34, 197, 94, 0.4)",
      underlineColor: "#22C55E"
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };
  
  // Enhanced space traffic with resistance ships
  const resistanceFleet = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    delay: i * 2,
    duration: 10 + Math.random() * 4,
    size: 4 + Math.random() * 3,
    top: 15 + Math.random() * 70,
    color: i % 2 === 0 ? "#FF8C00" : "#3B82F6"
  }));

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Enhanced space background with Phoenix colors */}
      <div className="absolute inset-0 w-full h-full">
        {/* Base gradient with Phoenix theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-void-primary via-void-secondary to-resistance-primary/40" />
        
        {/* Animated background stars */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ y: starsY }}
        >
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
        
        {/* Phoenix Energy Nebula Layer */}
        <motion.div 
          className="absolute inset-0 w-full h-full opacity-30"
          style={{ y: nebula1Y }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`phoenix-nebula-${i}`}
              className="absolute rounded-full blur-2xl"
              style={{
                left: `${Math.random() * 80}%`,
                top: `${Math.random() * 80}%`,
                width: `${250 + Math.random() * 300}px`,
                height: `${200 + Math.random() * 250}px`,
                background: `radial-gradient(ellipse, rgba(255, 140, 0, ${0.2 + Math.random() * 0.3}) 0%, transparent 70%)`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 10 + Math.random() * 5,
                delay: Math.random() * 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
        
        {/* Resistance Energy Nebula Layer */}
        <motion.div 
          className="absolute inset-0 w-full h-full opacity-25"
          style={{ y: nebula2Y }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`resistance-nebula-${i}`}
              className="absolute rounded-full blur-xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${180 + Math.random() * 280}px`,
                height: `${150 + Math.random() * 200}px`,
                background: `radial-gradient(ellipse, rgba(59, 130, 246, ${0.2 + Math.random() * 0.4}) 0%, transparent 60%)`,
              }}
              animate={{
                x: [0, Math.random() * 120 - 60],
                y: [0, Math.random() * 80 - 40],
                scale: [1, 1.3, 1],
                opacity: [0.15, 0.4, 0.15]
              }}
              transition={{
                duration: 15 + Math.random() * 8,
                delay: Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
        
        {/* Phoenix Essence particles */}
        <motion.div className="absolute inset-0 w-full h-full">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={`essence-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
                backgroundColor: i % 2 === 0 ? '#FF8C00' : '#FFB84D',
                boxShadow: `0 0 ${4 + Math.random() * 6}px currentColor`,
              }}
              animate={{
                x: [0, Math.random() * 300 - 150],
                y: [0, Math.random() * 200 - 100],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 20 + Math.random() * 15,
                delay: Math.random() * 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </motion.div>
        
        {/* Cosmic energy waves with Phoenix colors */}
        <motion.div 
          className="absolute inset-0 w-full h-full opacity-20"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 25% 25%, rgba(255, 140, 0, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse at 75% 75%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 10%, rgba(34, 197, 94, 0.2) 0%, transparent 40%)
            `,
            backgroundSize: '400% 400%',
          }}
        />
        
        {/* Resistance Command Planet */}
        <motion.div 
          className="absolute -bottom-40 -right-60 w-[900px] h-[900px] pointer-events-none"
          style={{ 
            y: planetY,
            scale: planetScale,
            rotate: planetRotate
          }}
        >
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div 
              className="absolute inset-0 rounded-full bg-gradient-radial from-phoenix-primary/20 via-resistance-primary/30 to-void-secondary/60"
            />
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-resistance-primary/10 to-void-primary/60 rounded-full" />
            
            {/* Planet surface details */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`surface-${i}`}
                className="absolute rounded-full"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  width: `${10 + Math.random() * 30}px`,
                  height: `${10 + Math.random() * 30}px`,
                  background: i % 2 === 0 ? 'rgba(255, 140, 0, 0.3)' : 'rgba(59, 130, 246, 0.2)',
                  filter: 'blur(2px)'
                }}
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Resistance fleet movements */}
      <div className="absolute inset-0 w-screen overflow-hidden pointer-events-none">
        {resistanceFleet.map(ship => (
          <motion.div
            key={ship.id}
            className="absolute h-[4px] rounded-full"
            style={{ 
              top: `${ship.top}%`,
              left: "-8%",
              width: `${ship.size * 12}px`,
              backgroundColor: ship.color,
              boxShadow: `0 0 20px ${ship.color}`,
            }}
            animate={{
              x: ['0vw', '115vw'],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: ship.duration,
              delay: ship.delay,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Section content with optimized spacing */}
      <div className="relative z-10 min-h-screen w-full pt-16 md:pl-64"> {/* Reduced top padding from pt-24 to pt-16 */}
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
          
          {/* Optimized Section Header - Closer spacing */}
          <motion.div 
            className="text-center mb-6" // Reduced from mb-8 to mb-6
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-orbitron font-bold text-center mb-3 text-phoenix-primary relative inline-block" // Changed from text-stellar-white to text-phoenix-primary (gold)
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Mission Briefing
              {/* Removed the enhanced underline */}
            </motion.h2>
            
            <motion.p 
              className="mt-2 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-phoenix-light/80" // Reduced from mt-8 to mt-2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }} // Reduced delay from 0.7 to 0.5
              viewport={{ once: true }}
            >
              The Swarm has invaded Cryptomeda. Unite as Guardians, deploy your Hero NFTs, and earn Phoenix Essence to reclaim the galaxy.
            </motion.p>
          </motion.div>
          
          {/* Mission Objectives Grid - moved up */}
          <motion.div 
            className="grid md:grid-cols-3 gap-6 mb-8" // Reduced from mb-12 to mb-8
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {missionObjectives.map((objective, index) => (
              <motion.div
                key={index}
                className="relative rounded-xl overflow-hidden backdrop-blur-md transition-all duration-300 glass-phoenix p-6"
                variants={itemVariants}
                style={{
                  border: `2px solid rgba(255, 140, 0, 0.3)`,
                  minHeight: '180px'
                }}
                whileHover={{ 
                  y: -6,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                  boxShadow: objective.shadowColor
                }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 flex items-center justify-center glass-resistance rounded-xl mr-3">
                    {objective.icon}
                  </div>
                  <h3 className="text-lg font-orbitron font-bold text-stellar-white">
                    {objective.title}
                  </h3>
                </div>
                <p className="text-neutral-light text-sm leading-relaxed">
                  {objective.description}
                </p>
                
                <motion.div 
                  className="h-1 w-0 rounded-full mt-4"
                  style={{ 
                    background: `linear-gradient(90deg, ${objective.underlineColor}, ${objective.underlineColor}80)`,
                    boxShadow: `0 0 8px ${objective.underlineColor}40`
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1.5, delay: 0.2 * index }}
                />
              </motion.div>
            ))}
          </motion.div>
          
          {/* Guardian Command Structure - moved up and optimized */}
          <motion.div 
            className="relative flex-1 flex items-start pt-4" // Changed to flex-1 and items-start with small top padding
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.5 }}
          >
            <div className="w-full max-w-7xl mx-auto rounded-xl p-6 overflow-hidden relative glass-void"> {/* Reduced padding from p-8 to p-6 */}
              
              {/* Command briefing header - reduced spacing */}
              <div className="text-center mb-6"> {/* Reduced from mb-10 to mb-6 */}
                <h3 className="text-2xl font-orbitron font-bold text-phoenix-primary mb-4"> {/* Reduced from mb-6 to mb-4 */}
                  Your Resistance Journey
                </h3>
              </div>
              
              {/* Enhanced command flow - optimized height */}
              <div className="relative mx-auto" style={{ minHeight: "200px", maxWidth: "900px" }}> {/* Reduced from 250px to 200px */}
                
                {/* Phase 1 - Connect Wallet */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
                  <motion.div 
                    className="w-20 h-20 rounded-xl flex items-center justify-center relative overflow-hidden z-20 glass-resistance mb-3" // Reduced size and margin
                    style={{
                      border: '3px solid rgba(59, 130, 246, 0.8)',
                      boxShadow: '0 0 25px rgba(59, 130, 246, 0.5)'
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: '0 0 35px rgba(59, 130, 246, 0.7)'
                    }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-resistance-light"> {/* Reduced icon size */}
                      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="2"/>
                      <line x1="9" y1="15" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </motion.div>
                  <h4 className="text-lg font-orbitron font-bold text-stellar-white mb-1">CONNECT WALLET</h4> {/* Reduced margin */}
                  <p className="text-sm text-neutral-light text-center max-w-32">Join the resistance with your Web3 identity</p>
                </div>
                
                {/* Phase 2 - Join the Fight */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <motion.div 
                    className="w-20 h-20 rounded-xl flex items-center justify-center relative overflow-hidden z-20 glass-phoenix mb-3" // Reduced size and margin
                    style={{
                      border: '3px solid rgba(255, 140, 0, 0.8)',
                      boxShadow: '0 0 25px rgba(255, 140, 0, 0.5)'
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: '0 0 35px rgba(255, 140, 0, 0.7)'
                    }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-phoenix-primary"> {/* Reduced icon size */}
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </motion.div>
                  <h4 className="text-lg font-orbitron font-bold text-stellar-white mb-1">JOIN THE FIGHT</h4> {/* Reduced margin */}
                  <p className="text-sm text-neutral-light text-center max-w-36">Deploy NFTs, play games, complete missions</p>
                </div>
                
                {/* Phase 3 - Earn Rewards */}
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
                  <motion.div 
                    className="w-20 h-20 rounded-xl flex items-center justify-center relative overflow-hidden z-20 glass-void mb-3" // Reduced size and margin
                    style={{
                      border: '3px solid rgba(34, 197, 94, 0.8)',
                      boxShadow: '0 0 25px rgba(34, 197, 94, 0.5)'
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: '0 0 35px rgba(34, 197, 94, 0.7)'
                    }}
                  >
                    <Zap size={28} className="text-energy-green" /> {/* Reduced icon size */}
                  </motion.div>
                  <h4 className="text-lg font-orbitron font-bold text-stellar-white mb-1">EARN REWARDS</h4> {/* Reduced margin */}
                  <p className="text-sm text-neutral-light text-center max-w-32">Accumulate Phoenix Essence for token airdrops</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Enhanced transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-resistance-primary/20 to-void-primary/90" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-phoenix-primary/10 to-void-secondary/70" />
        

        
        {/* Energy wave transition with Phoenix colors */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-resistance-light/40 via-phoenix-primary/60 via-energy-green/40 to-phoenix-light/50"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundSize: '400% 100%'
          }}
        />
      </div>
    </div>
  );
};

export default MissionBriefing;