import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Gamepad2, Shield } from 'lucide-react';

const MissionBriefing = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Simplified parallax values
  const starsY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const planetY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  
  // Updated feature cards with current features and wider styling
  const missionObjectives = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-phoenix-primary">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "MEDA SHOOTER",
      description: "Train your combat skills in our 2D space shooter. Deploy Hero and Weapon NFTs to enhance your abilities.",
      borderColor: "border-phoenix-primary/30",
      shadowColor: "0 0 30px rgba(255, 140, 0, 0.5)",
      underlineColor: "#FF8C00"
    },
    {
      icon: <Gamepad2 size={32} className="text-resistance-light" />,
      title: "BATTLE MISSIONS",
      description: "Complete daily challenges and tactical operations. Earn Meda Gas through various combat scenarios.",
      borderColor: "border-resistance-light/30",
      shadowColor: "0 0 30px rgba(59, 130, 246, 0.5)",
      underlineColor: "#3B82F6"
    },
    {
      icon: <Shield size={32} className="text-energy-green" />,
      title: "RESISTANCE HUB",
      description: "Access all missions and activities here. Your gateway to earning Meda Gas for Phoenix Essence airdrops.",
      borderColor: "border-energy-green/30",
      shadowColor: "0 0 30px rgba(34, 197, 94, 0.5)",
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

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Simplified transition from previous section */}
      <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none z-20">
        <div className="absolute inset-0" style={{ left: '16rem', top: '160px' }}>
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`flow-${i}`}
              className="absolute w-1 h-12 rounded-full"
              style={{
                left: `${40 + i * 10}%`,
                top: '0px',
                background: `linear-gradient(to bottom, ${i % 2 === 0 ? 'rgba(255, 140, 0, 0.2)' : 'rgba(59, 130, 246, 0.2)'}, transparent)`,
                filter: 'blur(1px)'
              }}
              animate={{
                y: ['0px', '100px'],
                opacity: [0, 0.4, 0]
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
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-void-primary via-void-secondary to-resistance-primary/40" />
        
        {/* Reduced background stars */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ y: starsY }}
        >
          {[...Array(20)].map((_, i) => (
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
        
        {/* Simplified energy nebula */}
        <motion.div className="absolute inset-0 w-full h-full opacity-20">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`nebula-${i}`}
              className="absolute rounded-full blur-2xl"
              style={{
                left: `${Math.random() * 80}%`,
                top: `${Math.random() * 80}%`,
                width: `${200 + Math.random() * 200}px`,
                height: `${150 + Math.random() * 150}px`,
                background: `radial-gradient(ellipse, rgba(255, 140, 0, ${0.3 + Math.random() * 0.2}) 0%, transparent 70%)`,
              }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                delay: Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
        
        {/* Simplified planet */}
        <motion.div 
          className="absolute -bottom-32 -right-48 w-[600px] h-[600px] pointer-events-none opacity-30"
          style={{ y: planetY }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-radial from-phoenix-primary/20 via-resistance-primary/30 to-void-secondary/60" />
        </motion.div>
      </div>

      {/* Section content */}
      <div className="relative z-10 min-h-screen w-full pt-6 md:pl-64">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
          
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-orbitron font-bold text-center mb-4 text-phoenix-primary relative inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Fight the Swarm. Reclaim the Universe.
            </motion.h2>
            
            <motion.p 
              className="mt-4 text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed text-phoenix-light/80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              The Swarm has invaded our galaxy, but the Resistance is ready to fight back. Join us in a series of epic missions to reclaim our universe and earn rewards along the way. Your journey begins here.
            </motion.p>
          </motion.div>
          
          {/* Mission Objectives Grid - Wider elements with icons on left */}
          <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {missionObjectives.map((objective, index) => (
              <motion.div
                key={index}
                className="relative rounded-xl overflow-hidden backdrop-blur-md transition-all duration-300 glass-phoenix p-8"
                variants={itemVariants}
                style={{
                  border: `2px solid rgba(255, 140, 0, 0.3)`,
                  minHeight: '200px',
                  maxWidth: '400px',
                  margin: '0 auto'
                }}
                whileHover={{ 
                  y: -8,
                  scale: 1.03,
                  transition: { duration: 0.3 },
                  boxShadow: objective.shadowColor
                }}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center glass-resistance rounded-lg mr-4 mt-1">
                    {objective.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-orbitron font-bold text-stellar-white mb-3">
                      {objective.title}
                    </h3>
                    <p className="text-neutral-light text-base leading-relaxed">
                      {objective.description}
                    </p>
                  </div>
                </div>
                
                <motion.div 
                  className="h-1 w-0 rounded-full mt-6"
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
          
          {/* Guardian Command Structure - Bigger elements */}
          <motion.div 
            className="relative flex-1 flex items-start"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.5 }}
          >
            <div className="w-full max-w-7xl mx-auto rounded-xl p-8 overflow-hidden relative glass-void">
              
              {/* Command briefing header */}
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-orbitron font-bold text-phoenix-primary mb-6">
                  Your Resistance Journey
                </h3>
              </div>
              
              {/* Enhanced command flow with images */}
              <div className="relative mx-auto" style={{ minHeight: "320px", maxWidth: "1000px" }}>
                
                {/* Phase 1 - Connect Wallet */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
                  <motion.div 
                    className="w-32 h-32 rounded-xl overflow-hidden relative z-20 mb-6"
                    style={{
                      border: '3px solid rgba(59, 130, 246, 0.8)',
                      boxShadow: '0 0 25px rgba(59, 130, 246, 0.5)'
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: '0 0 35px rgba(59, 130, 246, 0.7)'
                    }}
                  >
                    <img 
                      src="/portal-city.png" 
                      alt="Portal City"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <h4 className="text-2xl md:text-3xl font-orbitron font-bold text-stellar-white mb-3">CONNECT WALLET</h4>
                  <p className="text-lg text-neutral-light text-center max-w-40">Join the resistance with your Web3 identity</p>
                </div>
                
                {/* Phase 2 - Join the Fight */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <motion.div 
                    className="w-32 h-32 rounded-xl overflow-hidden relative z-20 mb-6"
                    style={{
                      border: '3px solid rgba(255, 140, 0, 0.8)',
                      boxShadow: '0 0 25px rgba(255, 140, 0, 0.5)'
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: '0 0 35px rgba(255, 140, 0, 0.7)'
                    }}
                  >
                    <img 
                      src="/telegram-city.png" 
                      alt="Telegram City"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <h4 className="text-2xl md:text-3xl font-orbitron font-bold text-stellar-white mb-3">JOIN THE FIGHT</h4>
                  <p className="text-lg text-neutral-light text-center max-w-44">Deploy NFTs, play games, complete missions</p>
                </div>
                
                {/* Phase 3 - Earn Rewards */}
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
                  <motion.div 
                    className="w-32 h-32 rounded-xl overflow-hidden relative z-20 mb-6"
                    style={{
                      border: '3px solid rgba(34, 197, 94, 0.8)',
                      boxShadow: '0 0 25px rgba(34, 197, 94, 0.5)'
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: '0 0 35px rgba(34, 197, 94, 0.7)'
                    }}
                  >
                    <img 
                      src="/polygon-planet.png" 
                      alt="Polygon Planet"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <h4 className="text-2xl md:text-3xl font-orbitron font-bold text-stellar-white mb-3">EARN REWARDS</h4>
                  <p className="text-lg text-neutral-light text-center max-w-40">Accumulate Phoenix Essence for token airdrops</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MissionBriefing;