import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Globe, MessageSquare, Layers } from 'lucide-react';

const EcosystemOverview = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Improved parallax values
  const cloudOpacity1 = useTransform(scrollYProgress, [0, 0.2], [0, 0.7]);
  const cloudOpacity2 = useTransform(scrollYProgress, [0.1, 0.3], [0, 0.5]);
  const planetY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const planetScale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1.1]);
  
  // Feature cards data
  const features = [
    {
      icon: <Globe size={60} className="text-neon-cyan" />,
      title: "WEB EXPERIENCE",
      description: "Immerse yourself in the full Cryptomeda ecosystem through our feature-rich web platform. Manage your NFT collection, participate in Meda Wars, trade assets, and dive into browser-based games.",
      color: "from-neon-cyan/10 to-transparent",
      borderColor: "border-neon-cyan/30",
      shadowColor: "0 0 20px rgba(0, 240, 255, 0.3)"
    },
    {
      icon: <MessageSquare size={60} className="text-meda-gold" />,
      title: "TELEGRAM PORTAL",
      description: "Take Cryptomeda with you anywhere through the Meda Portal Telegram app. Discover games, complete challenges, earn rewards, and stay connected to the community on mobile.",
      color: "from-meda-gold/10 to-transparent",
      borderColor: "border-meda-gold/30",
      shadowColor: "0 0 20px rgba(255, 182, 30, 0.3)"
    },
    {
      icon: <Layers size={60} className="text-nebula-pink" />,
      title: "CROSS-CHAIN FRAMEWORK",
      description: "Operate seamlessly across Polygon, TON, and Solana with our unified Meda Gas economy. Your resources, reputation, and achievements follow you across chains.",
      color: "from-nebula-pink/10 to-transparent",
      borderColor: "border-nebula-pink/30",
      shadowColor: "0 0 20px rgba(255, 62, 138, 0.3)"
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
  
  // Space traffic animation
  const spaceTraffic = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    delay: i * 0.7,
    duration: 6 + Math.random() * 4,
    size: 2 + Math.random() * 3,
    top: 15 + Math.random() * 70,
    color: i % 3 === 0 ? "#FFB61E" : i % 3 === 1 ? "#00F0FF" : "#FF3E8A"
  }));

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Section divider - connects from previous section */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-space-blue to-transparent z-10"></div>
      
      {/* Improved atmospheric background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary cloud layer - full width, positioned higher */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-[100%]"
          style={{ 
            opacity: cloudOpacity1,
            backgroundImage: 'url("/cloud-layer.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            y: useTransform(scrollYProgress, [0, 1], ['-10%', '-30%']),
          }}
        />
        
        {/* Secondary cloud layer - more movement */}
        <motion.div 
          className="absolute top-[10%] left-0 w-full h-[100%]"
          style={{ 
            opacity: cloudOpacity2,
            backgroundImage: 'url("/cloud-layer2.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            y: useTransform(scrollYProgress, [0, 1], ['0%', '-40%']),
          }}
        />
      </div>
      
      {/* Background planet */}
      <motion.div 
        className="absolute bottom-0 right-0 w-[900px] h-[900px] pointer-events-none"
        style={{ 
          y: planetY,
          scale: planetScale,
        }}
      >
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-radial from-cosmic-purple/30 via-space-blue/10 to-transparent rounded-full" 
            style={{ backgroundImage: 'url("/planet-texture.png")', backgroundSize: 'cover', opacity: 0.7 }}
          ></div>
        </div>
      </motion.div>
      
      {/* Space traffic lanes - more visible */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Traffic lane paths - made more visible */}
        {/*<div className="absolute top-[30%] -left-[10%] w-[120%] h-[2px] bg-gradient-to-r from-transparent via-stellar-white/20 to-transparent transform -rotate-[15deg]"></div>
        <div className="absolute top-[60%] -left-[10%] w-[120%] h-[2px] bg-gradient-to-r from-transparent via-stellar-white/20 to-transparent transform rotate-[8deg]"></div>
        */}
        {/* Moving traffic */}
        {spaceTraffic.map(traffic => (
          <motion.div
            key={traffic.id}
            className="absolute h-[3px] rounded-full"
            style={{ 
              top: `${traffic.top}%`,
              left: "-5%",
              width: "30px",
              backgroundColor: traffic.color,
              boxShadow: `0 0 15px ${traffic.color}`,
            }}
            animate={{
              x: window.innerWidth * 1.1,
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
      <div className="container mx-auto px-4 relative z-10">
        {/* Section title - enhanced */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
            <span className="relative z-10">One Ecosystem, Multiple Dimensions</span>
            <motion.span 
              className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-meda-gold to-transparent"
              initial={{ width: 0, left: '50%' }}
              whileInView={{ width: '100%', left: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            ></motion.span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300 mt-6">
            The Cryptomeda universe spans across platforms and chains, offering a connected experience wherever you choose to play.
          </p>
        </motion.div>

        {/* Feature cards - improved hover effects */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative rounded-xl overflow-hidden backdrop-blur-md transition-all duration-300"
              variants={itemVariants}
              style={{
                background: `linear-gradient(135deg, rgba(28, 19, 58, 0.7), rgba(28, 19, 58, 0.4))`,
                border: `1px solid ${feature.borderColor.replace('border-', '').replace('/30', '')}`,
              }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 },
                boxShadow: feature.shadowColor
              }}
            >
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 flex items-center justify-center bg-space-blue/40 rounded-lg mr-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-stellar-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-300">
                  {feature.description}
                </p>
                
                <motion.div 
                  className="h-1 w-0 bg-gradient-to-r from-transparent via-stellar-white/30 to-transparent mt-4"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1.5, delay: 0.2 * index }}
                />
              </div>
              
              {/* Top highlight */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-stellar-white/30 to-transparent"></div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Improved platform diagram with properly connected golden lines */}
          <motion.div 
            className="mt-20 relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2 }}
          >
            <div className="max-w-4xl mx-auto rounded-xl p-12 overflow-hidden relative"
                style={{ background: 'linear-gradient(to bottom, rgba(28, 19, 58, 0.7), rgba(18, 13, 38, 0.7))', 
                          backdropFilter: 'blur(10px)', 
                          border: '1px solid rgba(74, 43, 159, 0.3)' }}>
              <div className="absolute top-0 left-0 w-full h-full bg-cyber-grid opacity-20"></div>
              
              {/* T-structure hierarchical layout with golden lines that stop at element edges */}
              <div className="relative mx-auto" style={{ height: "520px", width: "100%", maxWidth: "500px" }}>
                {/* Top row - Web interfaces */}
                <div className="absolute top-0 left-0 right-0 flex justify-between" style={{ width: "400px", left: "50%", transform: "translateX(-50%)" }}>
                  {[
                    { title: "WEB PORTAL", icon: "/portal-city.png", color: "rgba(0, 240, 255, 0.8)" },
                    { title: "TELEGRAM APP", icon: "/telegram-city.png", color: "rgba(255, 62, 138, 0.8)" }
                  ].map((platform, index) => (
                    <div key={index} className="flex flex-col items-center" style={{ width: "0px" }}>
                      {/* Platform node */}
                      <motion.div 
                        className="w-20 h-20 rounded-lg flex items-center justify-center relative overflow-hidden z-20"
                        style={{
                          background: 'rgba(28, 19, 58, 0.7)',
                          backdropFilter: 'blur(5px)',
                          border: `2px solid ${platform.color}`,
                          boxShadow: `0 0 12px ${platform.color}`
                        }}
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: `0 0 20px ${platform.color}`
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <img src={platform.icon} alt={platform.title} className="w-16 h-16 object-cover" />
                      </motion.div>
                      
                      <p className="text-sm font-bold mt-3 mb-1 text-stellar-white/90 text-center">{platform.title}</p>
                    </div>
                  ))}
                </div>
                
                {/* Center - Meda Gas hub */}
                <div className="absolute left-1/2 z-20" style={{ top: "115px", transform: "translateX(-50%)" }}>
                  <div className="relative w-32 h-32">
                    <div className="absolute inset-0 rounded-full bg-gradient-radial from-meda-gold/60 to-meda-gold/0 animate-pulse-slow"></div>
                    <div className="relative w-full h-full rounded-full border-2 border-meda-gold/50 bg-space-blue/70 flex items-center justify-center"
                        style={{ boxShadow: '0 0 25px rgba(255, 182, 30, 0.3)' }}>
                      <img 
                        src="/medatokenicon.png" 
                        alt="Meda Gas" 
                        className="w-20 h-20" 
                        style={{ filter: 'drop-shadow(0 0 10px rgba(255, 182, 30, 0.6))' }}
                      />
                    </div>
                    <motion.div 
                      className="absolute -inset-3 border border-meda-gold/10 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    ></motion.div>
                    <motion.div 
                      className="absolute -inset-6 border border-meda-gold/5 rounded-full"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    ></motion.div>
                  </div>
                </div>
                
                {/* Bottom row - Blockchain platforms */}
                <div className="absolute left-0 right-0 flex justify-between" 
                    style={{ 
                      top: "415px", 
                      width: "410px", 
                      left: "50%", 
                      transform: "translateX(-50%)" 
                    }}>
                  {[
                    { title: "NFT Heroes", icon: "/solana-planet.png", color: "rgba(57, 255, 20, 0.8)" },
                    { title: "NFT Weapons", icon: "/polygon-planet.png", color: "rgba(163, 69, 230, 0.8)" },
                    { title: "NFT Lands", icon: "/ton-planet.png", color: "rgba(0, 136, 204, 0.8)" }
                  ].map((platform, index) => (
                    <div key={index} className="flex flex-col items-center" style={{ width: "90px" }}>
                      {/* Platform node */}
                      <motion.div 
                        className="w-20 h-20 rounded-full flex items-center justify-center relative overflow-hidden z-20"
                        style={{
                          background: 'rgba(28, 19, 58, 0.7)',
                          backdropFilter: 'blur(5px)',
                          border: `2px solid ${platform.color}`,
                          boxShadow: `0 0 12px ${platform.color}`
                        }}
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: `0 0 20px ${platform.color}`
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.img 
                          src={platform.icon} 
                          alt={platform.title} 
                          className="w-20 h-20 object-cover" 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        />
                      </motion.div>
                      
                      <p className="text-sm font-bold mt-3 text-stellar-white/90 text-center">{platform.title}</p>
                    </div>
                  ))}
                </div>
                
                {/* Connection lines - golden color with proper edge connections */}
                
                {/* Top horizontal line connecting web interfaces - stopping at element edges */}
                <div className="absolute h-[3px] z-10" 
                    style={{ 
                      top: "40px",
                      left: "90px",
                      width: "320px",
                      background: 'linear-gradient(to right, rgba(255, 182, 30, 0.7), rgba(255, 182, 30, 0.9), rgba(255, 182, 30, 0.7))', 
                      boxShadow: '0 0 8px rgba(255, 182, 30, 0.5)' 
                    }}></div>
                
                {/* Vertical line from top to center - stopping at the top of meda token */}
                <div className="absolute w-[3px] z-10" 
                    style={{ 
                      top: "43px",
                      left: "250px",
                      height: "71px",
                      background: 'linear-gradient(to bottom, rgba(255, 182, 30, 0.7), rgba(255, 182, 30, 0.9))',
                      boxShadow: '0 0 8px rgba(255, 182, 30, 0.5)'
                    }}></div>
                
                {/* Vertical line from center to bottom - starting from bottom edge of meda token */}
                <div className="absolute w-[3px] z-10" 
                    style={{ 
                      top: "246px",
                      left: "250px",
                      height: "90px",
                      background: 'linear-gradient(to bottom, rgba(255, 182, 30, 0.9), rgba(255, 182, 30, 0.7))',
                      boxShadow: '0 0 8px rgba(255, 182, 30, 0.5)'
                    }}></div>
                
                {/* Bottom horizontal line connecting planets - stopping at vertical lines */}
                <div className="absolute h-[3px] z-10" 
                    style={{ 
                      top: "336px",
                      left: "90px",
                      width: "320px",
                      background: 'linear-gradient(to right, rgba(255, 182, 30, 0.7), rgba(255, 182, 30, 0.9), rgba(255, 182, 30, 0.7))', 
                      boxShadow: '0 0 8px rgba(255, 182, 30, 0.5)' 
                    }}></div>
                
                {/* Bottom vertical lines to planets - stopping at top edge of planets */}
                {[
                  { left: 90, height: 74 },  // Left (Polygon)
                  { left: 250, height: 74 }, // Center (TON)
                  { left: 407, height: 74 }  // Right (Solana)
                ].map((line, index) => (
                  <div key={index} className="absolute w-[3px] z-10" 
                      style={{ 
                        top: "339px",
                        left: `${line.left}px`,
                        height: `${line.height}px`,
                        background: 'linear-gradient(to bottom, rgba(255, 182, 30, 0.8), rgba(255, 182, 30, 0.9))',
                        boxShadow: '0 0 8px rgba(255, 182, 30, 0.5)'
                      }}></div>
                ))}
              </div>
            </div>
          </motion.div>
      </div>
      
      {/* Enhanced transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void-black via-space-blue/30 to-transparent"></div>
    </section>
  );
};

export default EcosystemOverview;