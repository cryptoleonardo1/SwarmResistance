import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Gamepad2, Zap } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';

const EcosystemOverview = () => {
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
  
  // Feature cards data - updated with clear project explanation
  const features = [
    {
      icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-neon-cyan">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>,
      title: "MEDA WARS STRATEGY",
      description: "Deploy your NFT Heroes and Weapons on strategic Land plots. Build powerful combinations to maximize daily Meda Gas production and strengthen the resistance.",
      color: "from-neon-cyan/10 to-transparent",
      borderColor: "border-neon-cyan/30",
      shadowColor: "0 0 20px rgba(0, 240, 255, 0.3)",
      underlineColor: "#00F0FF"
    },
    {
      icon: <Gamepad2 size={40} className="text-meda-gold" />,
      title: "MEDA SHOOTER & MINI-GAMES",
      description: "Battle Swarm hordes in our 2D shooter, spin the daily login wheel, test your reflexes, answer trivia questions. Every game session earns valuable Meda Gas.",
      color: "from-meda-gold/10 to-transparent",
      borderColor: "border-meda-gold/30",
      shadowColor: "0 0 20px rgba(255, 182, 30, 0.3)",
      underlineColor: "#FFB61E"
    },
    {
      icon: <Zap size={40} className="text-nebula-pink" />,
      title: "MEDA GAS REWARDS",
      description: "All resistance activities generate Meda Gas - the key to future token airdrops. Complete daily tasks, participate in battles, and climb the ranks to earn more.",
      color: "from-nebula-pink/10 to-transparent",
      borderColor: "border-nebula-pink/30",
      shadowColor: "0 0 20px rgba(255, 62, 138, 0.3)",
      underlineColor: "#FF3E8A"
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };
  
  // Space traffic animation - full width
  const spaceTraffic = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    delay: i * 1.5,
    duration: 8 + Math.random() * 4,
    size: 3 + Math.random() * 4,
    top: 10 + Math.random() * 80,
    color: i % 3 === 0 ? "#FFB61E" : i % 3 === 1 ? "#00F0FF" : "#FF3E8A"
  }));

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Custom cartoon-style space background with parallax */}
      <div className="absolute inset-0 w-full h-full">
        {/* Base space gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-space-blue to-cosmic-purple/60" />
        
        {/* Animated background stars - Layer 1 */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ y: starsY }}
        >
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                delay: Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
        
        {/* Nebula Layer 1 - Blue nebula clouds */}
        <motion.div 
          className="absolute inset-0 w-full h-full opacity-40"
          style={{ y: nebula1Y }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`nebula1-${i}`}
              className="absolute rounded-full blur-xl"
              style={{
                left: `${Math.random() * 80}%`,
                top: `${Math.random() * 80}%`,
                width: `${200 + Math.random() * 300}px`,
                height: `${150 + Math.random() * 200}px`,
                background: `radial-gradient(ellipse, rgba(59, 130, 246, ${0.2 + Math.random() * 0.3}) 0%, transparent 70%)`,
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3]
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
        
        {/* Nebula Layer 2 - Purple nebula clouds */}
        <motion.div 
          className="absolute inset-0 w-full h-full opacity-30"
          style={{ y: nebula2Y }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`nebula2-${i}`}
              className="absolute rounded-full blur-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${150 + Math.random() * 250}px`,
                height: `${100 + Math.random() * 180}px`,
                background: `radial-gradient(ellipse, rgba(147, 51, 234, ${0.2 + Math.random() * 0.4}) 0%, transparent 60%)`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 60 - 30],
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 12 + Math.random() * 6,
                delay: Math.random() * 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
        
        {/* Cosmic dust particles */}
        <motion.div className="absolute inset-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`dust-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${0.5 + Math.random() * 1.5}px`,
                height: `${0.5 + Math.random() * 1.5}px`,
                backgroundColor: i % 2 === 0 ? '#FFB61E' : '#00F0FF',
                boxShadow: `0 0 ${2 + Math.random() * 4}px currentColor`,
              }}
              animate={{
                x: [0, Math.random() * 200 - 100],
                y: [0, Math.random() * 150 - 75],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                delay: Math.random() * 5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </motion.div>
        
        {/* Animated cosmic energy waves */}
        <motion.div 
          className="absolute inset-0 w-full h-full opacity-20"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 20% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 70%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 20%, rgba(255, 182, 30, 0.2) 0%, transparent 40%)
            `,
            backgroundSize: '300% 300%',
          }}
        />
        
        {/* Planet with texture - parallax (keeping as requested) */}
        <motion.div 
          className="absolute -bottom-40 -right-60 w-[800px] h-[800px] pointer-events-none"
          style={{ 
            y: planetY,
            scale: planetScale,
            rotate: planetRotate
          }}
        >
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div 
              className="absolute inset-0 rounded-full"
              style={{ 
                backgroundImage: 'url("/planet-texture.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.6
              }}
            />
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-cosmic-purple/20 to-space-blue/40 rounded-full" />
          </div>
        </motion.div>
      </div>
      
      {/* Full-width space traffic lanes */}
      <div className="absolute inset-0 w-screen overflow-hidden pointer-events-none">
        {spaceTraffic.map(traffic => (
          <motion.div
            key={traffic.id}
            className="absolute h-[3px] rounded-full"
            style={{ 
              top: `${traffic.top}%`,
              left: "-5%",
              width: `${traffic.size * 10}px`,
              backgroundColor: traffic.color,
              boxShadow: `0 0 15px ${traffic.color}`,
            }}
            animate={{
              x: ['0vw', '110vw'],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: traffic.duration,
              delay: traffic.delay,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Section content */}
      <SectionWrapper
        ref={sectionRef}
        title="Fight the Swarm, Reclaim the Universe"
        subtitle="The Swarm has invaded Cryptomeda. Unite the community, participate in the resistance, and earn Meda Gas for future token airdrops."
        className="relative z-10"
      >
        <div className="flex-1 flex flex-col justify-center">
          {/* Feature cards - reduced height and padding */}
          <motion.div 
            className="grid md:grid-cols-3 gap-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="relative rounded-xl overflow-hidden backdrop-blur-md transition-all duration-300 glassmorphism p-6"
                variants={itemVariants}
                style={{
                  border: `1px solid ${feature.borderColor.replace('border-', '').replace('/30', '')}`,
                  minHeight: '200px'
                }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 },
                  boxShadow: feature.shadowColor
                }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 flex items-center justify-center bg-space-blue/40 rounded-lg mr-3">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-stellar-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
                
                <motion.div 
                  className="h-0.5 w-0 bg-meda-gold mt-4"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1.5, delay: 0.2 * index }}
                />
              </motion.div>
            ))}
          </motion.div>
          
          {/* Platform hierarchy diagram - simplified and focused on user journey */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2 }}
          >
            <div className="max-w-6xl mx-auto rounded-xl p-8 overflow-hidden relative glassmorphism">
              {/* Main heading for the flow */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-stellar-white mb-2">Your Resistance Journey</h3>
                <p className="text-gray-400">Choose your battlefield, earn Meda Gas, prepare for airdrops</p>
              </div>
              
              {/* Simplified horizontal flow */}
              <div className="relative mx-auto" style={{ minHeight: "250px", maxWidth: "800px" }}>
                
                {/* Step 1 - Join the Fight */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
                  <motion.div 
                    className="w-24 h-24 rounded-xl flex items-center justify-center relative overflow-hidden z-20 glassmorphism mb-4"
                    style={{
                      border: '2px solid rgba(0, 240, 255, 0.8)',
                      boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)'
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: '0 0 30px rgba(0, 240, 255, 0.6)'
                    }}
                  >
                    <Gamepad2 size={32} className="text-neon-cyan" />
                  </motion.div>
                  <h4 className="text-lg font-bold text-stellar-white mb-2">CHOOSE BATTLEFRONT</h4>
                  <p className="text-sm text-gray-400 text-center max-w-32">Web Portal or Telegram Hub</p>
                </div>
                
                {/* Step 2 - Participate */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <motion.div 
                    className="w-24 h-24 rounded-xl flex items-center justify-center relative overflow-hidden z-20 glassmorphism mb-4"
                    style={{
                      border: '2px solid rgba(255, 182, 30, 0.8)',
                      boxShadow: '0 0 20px rgba(255, 182, 30, 0.4)'
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: '0 0 30px rgba(255, 182, 30, 0.6)'
                    }}
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-meda-gold">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                  <h4 className="text-lg font-bold text-stellar-white mb-2">FIGHT & PLAY</h4>
                  <p className="text-sm text-gray-400 text-center max-w-36">Meda Wars, Shooter, Mini-games, Daily Tasks</p>
                </div>
                
                {/* Step 3 - Earn Rewards */}
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
                  <motion.div 
                    className="w-24 h-24 rounded-xl flex items-center justify-center relative overflow-hidden z-20 glassmorphism mb-4"
                    style={{
                      border: '2px solid rgba(255, 62, 138, 0.8)',
                      boxShadow: '0 0 20px rgba(255, 62, 138, 0.4)'
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: '0 0 30px rgba(255, 62, 138, 0.6)'
                    }}
                  >
                    <Zap size={32} className="text-nebula-pink" />
                  </motion.div>
                  <h4 className="text-lg font-bold text-stellar-white mb-2">EARN MEDA GAS</h4>
                  <p className="text-sm text-gray-400 text-center max-w-32">Accumulate for Token Airdrop</p>
                </div>
                
                {/* Connection arrows */}
                <motion.div 
                  className="absolute h-[3px] z-10" 
                  style={{ 
                    top: "50%",
                    left: "120px",
                    width: "140px",
                    background: 'linear-gradient(to right, rgba(0, 240, 255, 0.7), rgba(255, 182, 30, 0.9))', 
                    boxShadow: '0 0 8px rgba(255, 182, 30, 0.5)' 
                  }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
                
                <motion.div 
                  className="absolute h-[3px] z-10" 
                  style={{ 
                    top: "50%",
                    right: "120px",
                    width: "140px",
                    background: 'linear-gradient(to right, rgba(255, 182, 30, 0.9), rgba(255, 62, 138, 0.7))', 
                    boxShadow: '0 0 8px rgba(255, 62, 138, 0.5)' 
                  }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
                
                {/* Flowing energy particles */}
                <motion.div 
                  className="absolute w-2 h-2 bg-neon-cyan rounded-full z-20"
                  style={{ 
                    top: "calc(50% - 4px)",
                    left: "120px",
                    boxShadow: '0 0 15px rgba(0, 240, 255, 0.8)'
                  }}
                  animate={{
                    x: [0, 420, 0],
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>
              
              {/* Bottom section - Key benefits */}

            </div>
          </motion.div>
        </div>
      </SectionWrapper>
      
      {/* Smooth transition to next section - similar to hero section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
        {/* Gradient transition from current space theme to metrics/city theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/30 to-void-black/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-space-blue/20 to-cosmic-purple/60" />
        
        {/* Animated transition particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`transition-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${5 + i * 8}%`,
              background: i % 4 === 0 ? 'rgba(255, 182, 30, 0.7)' : 
                         i % 4 === 1 ? 'rgba(0, 240, 255, 0.6)' : 
                         i % 4 === 2 ? 'rgba(255, 62, 138, 0.5)' : 'rgba(57, 255, 20, 0.4)',
              boxShadow: i % 4 === 0 ? '0 0 8px rgba(255, 182, 30, 0.7)' : 
                        i % 4 === 1 ? '0 0 8px rgba(0, 240, 255, 0.6)' : 
                        i % 4 === 2 ? '0 0 8px rgba(255, 62, 138, 0.5)' : '0 0 8px rgba(57, 255, 20, 0.4)'
            }}
            animate={{
              y: [0, -80, 0],
              opacity: [0.2, 1, 0.2],
              scale: [0.6, 1.4, 0.6]
            }}
            transition={{
              duration: 5,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Data stream lines flowing downward */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`data-stream-${i}`}
            className="absolute w-0.5 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              height: '60px',
              background: `linear-gradient(to bottom, transparent, ${
                i % 3 === 0 ? '#FFB61E' : i % 3 === 1 ? '#00F0FF' : '#FF3E8A'
              }, transparent)`,
              boxShadow: `0 0 6px ${
                i % 3 === 0 ? '#FFB61E' : i % 3 === 1 ? '#00F0FF' : '#FF3E8A'
              }`,
            }}
            animate={{
              y: [-60, 120],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: 3,
              delay: i * 0.4,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
        
        {/* Energy wave transition */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-neon-cyan/40 via-meda-gold/50 through-nebula-pink/40 to-energy-green/30"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundSize: '300% 100%'
          }}
        />
        
        {/* 3D depth effect with layered gradients */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void-black/20 transform skew-y-1" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cosmic-purple/10 transform -skew-y-1" />
        </div>
        
        {/* Floating geometric shapes for depth */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`geo-${i}`}
            className="absolute"
            style={{
              left: `${20 + i * 20}%`,
              bottom: `${10 + Math.random() * 15}px`,
              width: `${6 + Math.random() * 4}px`,
              height: `${6 + Math.random() * 4}px`,
              background: i % 2 === 0 ? 'rgba(255, 182, 30, 0.3)' : 'rgba(0, 240, 255, 0.3)',
              borderRadius: i % 2 === 0 ? '50%' : '2px',
              boxShadow: `0 0 12px ${i % 2 === 0 ? 'rgba(255, 182, 30, 0.5)' : 'rgba(0, 240, 255, 0.5)'}`
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 6 + i,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default EcosystemOverview;