import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Gamepad2, Shield } from 'lucide-react';

const EcosystemOverview = () => {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Reduced parallax effects on mobile
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', isMobile ? '15%' : '30%']);
  const starsY = useTransform(scrollYProgress, [0, 1], ['0%', isMobile ? '-10%' : '-20%']);
  const particlesY = useTransform(scrollYProgress, [0, 1], ['0%', isMobile ? '8%' : '15%']);

  // Reduced particles on mobile
  const particles = Array.from({ length: isMobile ? 6 : 15 }).map((_, i) => ({
    id: i,
    delay: i * 0.3,
    duration: isMobile ? 16 : 12 + Math.random() * 6,
    size: 1.5 + Math.random() * 2.5,
    left: Math.random() * 100,
    color: i % 4 === 0 ? "#FF8C00" : i % 4 === 1 ? "#60A5FA" : i % 4 === 2 ? "#8B5CF6" : "#22C55E"
  }));

  // Reduced fire particles on mobile
  const fireParticles = Array.from({ length: isMobile ? 3 : 8 }).map((_, i) => ({
    id: i,
    delay: i * 1.2,
    duration: isMobile ? 8 : 6 + Math.random() * 3,
    left: 10 + Math.random() * 80,
  }));
  
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
      transition: { staggerChildren: isMobile ? 0.2 : 0.3 }
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
    <div ref={sectionRef} className="min-h-screen w-full relative overflow-hidden bg-void-primary">
      {/* Enhanced background layers - Optimized for mobile */}
      {!isMobile && (
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ y: backgroundY }}
        >
          {/* Starfield background - Desktop only */}
          <motion.div 
            className="absolute inset-0 w-full h-full opacity-40"
            style={{ 
              backgroundImage: `radial-gradient(2px 2px at 20px 30px, #FF8C00, transparent),
                               radial-gradient(2px 2px at 40px 70px, #60A5FA, transparent),
                               radial-gradient(1px 1px at 90px 40px, #8B5CF6, transparent),
                               radial-gradient(1px 1px at 130px 80px, #22C55E, transparent),
                               radial-gradient(2px 2px at 160px 30px, #FF8C00, transparent)`,
              backgroundRepeat: 'repeat',
              backgroundSize: '200px 100px',
              y: starsY
            }}
          />
          
          {/* Nebula overlay */}
          <div className="absolute inset-0 bg-gradient-radial from-cosmic-purple/30 via-transparent to-void-primary/60" />
          <div className="absolute inset-0 bg-gradient-conic from-phoenix-primary/10 via-resistance-primary/10 to-energy-purple/10 opacity-30" />
        </motion.div>
      )}

      {/* Simplified mobile background */}
      {isMobile && (
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-void-primary via-void-secondary to-resistance-primary/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-phoenix-primary/5 via-transparent to-transparent" />
        </div>
      )}

      {/* Enhanced floating particles - Reduced on mobile */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y: particlesY }}
      >
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.left}%`,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * (isMobile ? 3 : 6)}px ${particle.color}`,
            }}
            animate={{
              y: ['120vh', '-10vh'],
              x: [0, Math.sin(particle.id * 0.5) * (isMobile ? 75 : 150)],
              opacity: [0, 0.8, 0.8, 0],
              scale: [0.5, 1, 1, 0.3]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
        
        {/* Phoenix fire particles - Reduced on mobile */}
        {fireParticles.map(particle => (
          <motion.div
            key={`fire-${particle.id}`}
            className={`absolute ${isMobile ? 'w-2 h-4' : 'w-4 h-8'} rounded-full`}
            style={{
              left: `${particle.left}%`,
              background: 'linear-gradient(to top, #FF8C00, #FFB84D)',
            }}
            animate={{
              y: ['100vh', '-50px'],
              opacity: [0, 1, 1, 0],
              scale: [0.8, 1.2, 1, 0.6]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        ))}
      </motion.div>

      {/* RESPONSIVE Section content */}
      <div className="relative z-10 min-h-screen w-full">
        {/* Mobile Layout */}
        {isMobile ? (
          <div className="w-full h-full flex flex-col pt-16 pb-24 px-4">
            {/* Mobile Header */}
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-2xl sm:text-3xl font-orbitron font-bold text-phoenix-primary mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Fight the Swarm. Reclaim the Universe.
              </motion.h2>
              
              <motion.p 
                className="text-sm sm:text-base text-phoenix-light/80 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                The Swarm has invaded our galaxy, but the Resistance is ready to fight back. Join us in epic missions to reclaim our universe.
              </motion.p>
            </motion.div>
            
            {/* Mobile Mission Objectives */}
            <motion.div 
              className="space-y-6 mb-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {missionObjectives.map((objective, index) => (
                <motion.div
                  key={index}
                  className="rounded-xl overflow-hidden backdrop-blur-md transition-all duration-300 glass-phoenix p-6"
                  variants={itemVariants}
                  style={{
                    border: `2px solid rgba(255, 140, 0, 0.3)`,
                  }}
                  whileHover={{ 
                    y: -4,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center glass-resistance rounded-lg mr-3">
                      {objective.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-orbitron font-bold text-stellar-white mb-2">
                        {objective.title}
                      </h3>
                      <p className="text-neutral-light text-sm leading-relaxed">
                        {objective.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Mobile Journey Steps */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.5 }}
            >
              <div className="text-center mb-6">
                <h3 className="text-xl font-orbitron font-bold text-phoenix-primary mb-4">
                  Your Resistance Journey
                </h3>
              </div>
              
              {/* Mobile Journey Steps */}
              <div className="space-y-6">
                {[
                  {
                    step: "[1] CONNECT WALLET",
                    description: "Join the resistance with your Web3 identity",
                    image: "/portal-city.png",
                    color: "#3B82F6"
                  },
                  {
                    step: "[2] JOIN THE FIGHT", 
                    description: "Deploy NFTs, play games, complete missions",
                    image: "/telegram-city.png",
                    color: "#FF8C00"
                  },
                  {
                    step: "[3] EARN REWARDS",
                    description: "Accumulate Phoenix Essence for token airdrops", 
                    image: "/polygon-planet.png",
                    color: "#22C55E"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-4 glass-void rounded-xl p-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div 
                      className="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0"
                      style={{
                        border: `2px solid ${item.color}80`,
                        boxShadow: `0 0 15px ${item.color}40`
                      }}
                    >
                      <img 
                        src={item.image}
                        alt={item.step}
                        className="w-full h-full object-contain object-bottom"
                        style={{ filter: `drop-shadow(0 0 8px ${item.color}40)` }}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-orbitron font-bold text-stellar-white mb-1">
                        {item.step}
                      </h4>
                      <p className="text-neutral-light text-sm">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          /* Desktop Layout - Original */
          <div className="pt-6 md:pl-64">
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
              
              {/* Mission Objectives Grid */}
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
              
              {/* Guardian Command Structure */}
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
                  <div className="relative mx-auto" style={{ minHeight: "400px", maxWidth: "1000px" }}>
                    
                    {/* Phase 1 - Connect Wallet */}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
                      <motion.div 
                        className="w-32 h-48 rounded-xl overflow-hidden relative z-20 mb-6 bg-gradient-to-b from-void-primary/20 to-transparent"
                        style={{
                          border: '3px solid rgba(59, 130, 246, 0.8)',
                          boxShadow: '0 0 25px rgba(59, 130, 246, 0.5)',
                          aspectRatio: '1400/2400'
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          boxShadow: '0 0 35px rgba(59, 130, 246, 0.7)'
                        }}
                      >
                        <img 
                          src="/portal-city.png" 
                          alt="Connect Wallet Character"
                          className="w-full h-full object-contain object-bottom"
                          style={{ filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))' }}
                        />
                      </motion.div>
                      <h4 className="text-2xl md:text-3xl font-orbitron font-bold text-stellar-white mb-3">[1] CONNECT WALLET</h4>
                      <p className="text-lg text-neutral-light text-center max-w-40">Join the resistance with your Web3 identity</p>
                    </div>
                    
                    {/* Phase 2 - Join the Fight */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                      <motion.div 
                        className="w-32 h-48 rounded-xl overflow-hidden relative z-20 mb-6 bg-gradient-to-b from-void-primary/20 to-transparent"
                        style={{
                          border: '3px solid rgba(255, 140, 0, 0.8)',
                          boxShadow: '0 0 25px rgba(255, 140, 0, 0.5)',
                          aspectRatio: '1400/2400'
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          boxShadow: '0 0 35px rgba(255, 140, 0, 0.7)'
                        }}
                      >
                        <img 
                          src="/telegram-city.png" 
                          alt="Join the Fight Character"
                          className="w-full h-full object-contain object-bottom"
                          style={{ filter: 'drop-shadow(0 0 10px rgba(255, 140, 0, 0.3))' }}
                        />
                      </motion.div>
                      <h4 className="text-2xl md:text-3xl font-orbitron font-bold text-stellar-white mb-3">[2] JOIN THE FIGHT</h4>
                      <p className="text-lg text-neutral-light text-center max-w-44">Deploy NFTs, play games, complete missions</p>
                    </div>
                    
                    {/* Phase 3 - Earn Rewards */}
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
                      <motion.div 
                        className="w-32 h-48 rounded-xl overflow-hidden relative z-20 mb-6 bg-gradient-to-b from-void-primary/20 to-transparent"
                        style={{
                          border: '3px solid rgba(34, 197, 94, 0.8)',
                          boxShadow: '0 0 25px rgba(34, 197, 94, 0.5)',
                          aspectRatio: '1400/2400'
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          boxShadow: '0 0 35px rgba(34, 197, 94, 0.7)'
                        }}
                      >
                        <img 
                          src="/polygon-planet.png" 
                          alt="Earn Rewards Character"
                          className="w-full h-full object-contain object-bottom"
                          style={{ filter: 'drop-shadow(0 0 10px rgba(34, 197, 94, 0.3))' }}
                        />
                      </motion.div>
                      <h4 className="text-2xl md:text-3xl font-orbitron font-bold text-stellar-white mb-3">[3] EARN REWARDS</h4>
                      <p className="text-lg text-neutral-light text-center max-w-40">Accumulate Phoenix Essence for token airdrops</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EcosystemOverview;