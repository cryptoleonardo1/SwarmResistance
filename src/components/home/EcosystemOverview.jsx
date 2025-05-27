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
  
  // Parallax values for cloud layers
  const cloud1Y = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const cloud2Y = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const planetY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const planetScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1.2]);
  const planetRotate = useTransform(scrollYProgress, [0, 1], [0, 30]);
  
  // Feature cards data - updated with gaming focus
  const features = [
    {
      icon: <Gamepad2 size={40} className="text-neon-cyan" />,
      title: "MULTIVERSE GAMING",
      description: "Battle in our 2D shooter, compete in tournaments, and explore strategic gameplay across multiple platforms and games.",
      color: "from-neon-cyan/10 to-transparent",
      borderColor: "border-neon-cyan/30",
      shadowColor: "0 0 20px rgba(0, 240, 255, 0.3)",
      underlineColor: "#FFB61E"
    },
    {
      icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-meda-gold">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>,
      title: "NFT GAMING ASSETS",
      description: "Own Heroes, Weapons, and Lands with unique stories. Trade in our marketplace and use across games as your collection grows.",
      color: "from-meda-gold/10 to-transparent",
      borderColor: "border-meda-gold/30",
      shadowColor: "0 0 20px rgba(255, 182, 30, 0.3)",
      underlineColor: "#FFB61E"
    },
    {
      icon: <Zap size={40} className="text-nebula-pink" />,
      title: "COMMUNITY POWER",
      description: "True community ownership with voting rights, rewards for active members, and no VCs - built by gamers, for gamers.",
      color: "from-nebula-pink/10 to-transparent",
      borderColor: "border-nebula-pink/30",
      shadowColor: "0 0 20px rgba(255, 62, 138, 0.3)",
      underlineColor: "#FFB61E"
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
      {/* Full-width background layers */}
      <div className="absolute inset-0 w-full h-full">
        {/* Cloud layer 1 - parallax */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ 
            backgroundImage: 'url("/cloud-layer.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            y: cloud1Y,
            opacity: 0.7
          }}
        />
        
        {/* Cloud layer 2 - parallax */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ 
            backgroundImage: 'url("/cloud-layer2.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            backgroundRepeat: 'no-repeat',
            y: cloud2Y,
            opacity: 0.5
          }}
        />
        
        {/* Planet with texture - parallax */}
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
        title="Gaming Multiverse Awaits"
        subtitle="Multiple platforms, multiple games, endless possibilities to earn and own in the expanding Meda multiverse."
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
          
          {/* Platform hierarchy diagram - redesigned with horizontal layout */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2 }}
          >
            <div className="max-w-6xl mx-auto rounded-xl p-8 overflow-hidden relative glassmorphism">
              {/* Horizontal structure - reduced height */}
              <div className="relative mx-auto" style={{ minHeight: "300px", maxWidth: "900px" }}>
                
                {/* Left side - Platforms */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-6">
                  <div className="text-center mb-4">
                    <h4 className="text-lg font-bold text-stellar-white mb-2">PLATFORMS</h4>
                  </div>
                  {[
                    { title: "Web Portal", icon: "/portal-city.png", color: "rgba(0, 240, 255, 0.8)" },
                    { title: "Telegram Hub", icon: "/telegram-city.png", color: "rgba(255, 62, 138, 0.8)" }
                  ].map((platform, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <motion.div 
                        className="w-20 h-20 rounded-lg flex items-center justify-center relative overflow-hidden z-20 glassmorphism"
                        style={{
                          border: `2px solid ${platform.color}`,
                          boxShadow: `0 0 15px ${platform.color}`
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          boxShadow: `0 0 25px ${platform.color}`
                        }}
                      >
                        <img src={platform.icon} alt={platform.title} className="w-16 h-16 object-cover" />
                      </motion.div>
                      <p className="text-sm font-semibold mt-2 text-stellar-white text-center">{platform.title}</p>
                    </div>
                  ))}
                </div>
                
                {/* Center - Meda Gas hub */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="relative w-32 h-32">
                    <motion.div 
                      className="absolute inset-0 rounded-full bg-gradient-radial from-meda-gold/60 to-meda-gold/0"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.6, 0.8, 0.6]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <div className="relative w-full h-full rounded-full border-2 border-meda-gold/50 bg-space-blue/70 flex items-center justify-center glassmorphism"
                        style={{ boxShadow: '0 0 25px rgba(255, 182, 30, 0.4)' }}>
                      <img 
                        src="/medatokenicon.png" 
                        alt="Meda Gas" 
                        className="w-20 h-20" 
                        style={{ filter: 'drop-shadow(0 0 12px rgba(255, 182, 30, 0.6))' }}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Right side - Gaming Assets */}
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
                  <div className="text-center mb-4">
                    <h4 className="text-lg font-bold text-stellar-white mb-2">GAMING ASSETS</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { title: "Heroes", icon: "/solana-planet.png", color: "rgba(57, 255, 20, 0.8)" },
                      { title: "Weapons", icon: "/polygon-planet.png", color: "rgba(163, 69, 230, 0.8)" },
                      { title: "Lands", icon: "/ton-planet.png", color: "rgba(0, 136, 204, 0.8)" },
                      { title: "Marketplace", icon: "/portal-city.png", color: "rgba(255, 182, 30, 0.8)" }
                    ].map((asset, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <motion.div 
                          className="w-16 h-16 rounded-full flex items-center justify-center relative overflow-hidden z-20 glassmorphism"
                          style={{
                            border: `2px solid ${asset.color}`,
                            boxShadow: `0 0 12px ${asset.color}`
                          }}
                          whileHover={{ 
                            scale: 1.1,
                            boxShadow: `0 0 20px ${asset.color}`
                          }}
                        >
                          <motion.img 
                            src={asset.icon} 
                            alt={asset.title} 
                            className="w-12 h-12 object-cover rounded-full" 
                            animate={asset.title !== "Marketplace" ? { rotate: -360 } : {}}
                            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                          />
                        </motion.div>
                        <p className="text-xs font-semibold mt-1 text-stellar-white text-center">{asset.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Connection lines - horizontal layout */}
                {/* Left connection */}
                <motion.div 
                  className="absolute h-[3px] z-10" 
                  style={{ 
                    top: "50%",
                    left: "180px",
                    width: "120px",
                    background: 'linear-gradient(to right, rgba(255, 182, 30, 0.7), rgba(255, 182, 30, 0.9))', 
                    boxShadow: '0 0 8px rgba(255, 182, 30, 0.5)' 
                  }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
                
                {/* Right connection */}
                <motion.div 
                  className="absolute h-[3px] z-10" 
                  style={{ 
                    top: "50%",
                    right: "180px",
                    width: "120px",
                    background: 'linear-gradient(to left, rgba(255, 182, 30, 0.7), rgba(255, 182, 30, 0.9))', 
                    boxShadow: '0 0 8px rgba(255, 182, 30, 0.5)' 
                  }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
                
                {/* Energy flow animation - bidirectional */}
                <motion.div 
                  className="absolute w-2 h-2 bg-meda-gold rounded-full z-20"
                  style={{ 
                    top: "calc(50% - 4px)",
                    left: "180px",
                    boxShadow: '0 0 15px rgba(255, 182, 30, 0.8)'
                  }}
                  animate={{
                    x: [0, 240, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                <motion.div 
                  className="absolute w-2 h-2 bg-meda-gold rounded-full z-20"
                  style={{ 
                    top: "calc(50% - 4px)",
                    right: "180px",
                    boxShadow: '0 0 15px rgba(255, 182, 30, 0.8)'
                  }}
                  animate={{
                    x: [0, -240, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 1.5
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default EcosystemOverview;