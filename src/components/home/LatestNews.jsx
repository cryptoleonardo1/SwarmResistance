import { motion } from 'framer-motion';
import { Gamepad2, Users, Trophy, Zap } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';

const LatestNews = () => {
  // News/campaign data - updated with real project info
  const newsItems = [
    {
      icon: <Gamepad2 size={24} className="text-neon-cyan" />,
      title: "MEDA SHOOTER MOVING TO TELEGRAM",
      content: "Our popular 2D shooter is expanding to Telegram gaming! Experience fast-paced battles with your NFT heroes in the most accessible gaming platform.",
      category: "GAMING",
      bgImage: "linear-gradient(to right, rgba(28, 19, 58, 0.8), rgba(18, 13, 38, 0.9))",
      accentColor: "border-neon-cyan",
      iconColor: "#00F0FF"
    },
    {
      icon: <Users size={24} className="text-nebula-pink" />,
      title: "COMMUNITY GOVERNANCE LIVE",
      content: "Voting power is now in your hands! Community members can propose and vote on platform decisions. No VCs, no centralized control - true community ownership.",
      category: "COMMUNITY",
      bgImage: "linear-gradient(to right, rgba(28, 19, 58, 0.8), rgba(18, 13, 38, 0.9))",
      accentColor: "border-nebula-pink",
      iconColor: "#FF3E8A"
    },
    {
      icon: <Trophy size={24} className="text-meda-gold" />,
      title: "MEDA WARS STRATEGY UPDATE",
      content: "Major upgrade incoming! Build structures on your lands, mine Meda Gas more efficiently, and prepare for epic turn-based battles against other landowners.",
      category: "UPDATE",
      bgImage: "linear-gradient(to right, rgba(28, 19, 58, 0.8), rgba(18, 13, 38, 0.9))",
      accentColor: "border-meda-gold",
      iconColor: "#FFB61E"
    },
    {
      icon: <Zap size={24} className="text-energy-green" />,
      title: "TELEGRAM GAME HUB LAUNCH",
      content: "Discover the best Telegram games in crypto! Our new game hub features curated games, challenges, and exclusive rewards for active explorers.",
      category: "LAUNCH",
      bgImage: "linear-gradient(to right, rgba(28, 19, 58, 0.8), rgba(18, 13, 38, 0.9))",
      accentColor: "border-energy-green",
      iconColor: "#39FF14"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <SectionWrapper
      title="Multiverse Updates"
      subtitle="Latest developments across our expanding gaming ecosystem"
      className="relative"
    >
      <div className="flex-1 flex flex-col justify-center">
        {/* News grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {newsItems.map((item, index) => (
            <motion.div
              key={index}
              className={`glassmorphism rounded-lg p-6 relative overflow-hidden group hover:border-t-2 ${item.accentColor} transition-all duration-300`}
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                boxShadow: `0 10px 30px -10px ${item.iconColor}40`
              }}
            >
              {/* Category badge */}
              <div className="flex justify-between items-center mb-4">
                <span className={`text-xs px-3 py-1 rounded-full ${
                  index === 0 ? 'bg-neon-cyan/20 text-neon-cyan' : 
                  index === 1 ? 'bg-nebula-pink/20 text-nebula-pink' :
                  index === 2 ? 'bg-meda-gold/20 text-meda-gold' :
                  'bg-energy-green/20 text-energy-green'
                }`}>
                  {item.category}
                </span>
                <div className="p-2 rounded-lg bg-space-blue/40">
                  {item.icon}
                </div>
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-bold mb-3 text-stellar-white">
                {item.title}
              </h3>
              
              {/* Content */}
              <p className="text-gray-300 mb-4 text-sm">
                {item.content}
              </p>
              
              {/* Action button */}
              <motion.button 
                className="text-sm font-semibold flex items-center space-x-2 text-gray-300 hover:text-neon-cyan transition-colors group/btn"
                whileHover={{ x: 5 }}
              >
                <span>Read More</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
              
              {/* Hover effect line */}
              <motion.div 
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-stellar-white/50 to-transparent"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Command Center Visualization */}
        <motion.div 
          className="relative mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto glassmorphism rounded-xl p-6 relative overflow-hidden">
            {/* Command Center Header */}
            <div className="text-center mb-4">
              <motion.h3 
                className="text-xl font-bold text-stellar-white mb-1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                MEDA COMMAND CENTER
              </motion.h3>
              <p className="text-gray-400 text-xs">Real-time multiverse monitoring system</p>
            </div>

            {/* Command Center Grid - Now 5 columns */}
            <div className="grid md:grid-cols-5 gap-4">
              {/* Left Panel - System Status */}
              <div className="glassmorphism p-3 rounded-lg">
                <h4 className="text-xs font-semibold text-meda-gold mb-2">SYSTEM STATUS</h4>
                <div className="space-y-1">
                  {[
                    { label: "Web Portal", status: "ONLINE", color: "text-energy-green" },
                    { label: "Telegram Hub", status: "ONLINE", color: "text-energy-green" },
                    { label: "NFT Systems", status: "ACTIVE", color: "text-neon-cyan" },
                    { label: "Game Servers", status: "OPTIMAL", color: "text-energy-green" }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-xs text-gray-300">{item.label}</span>
                      <motion.span 
                        className={`text-xs font-semibold ${item.color}`}
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {item.status}
                      </motion.span>
                    </div>
                  ))}
                </div>
              </div>

              {/* NFT Marketplace Stats */}
              <div className="glassmorphism p-3 rounded-lg">
                <h4 className="text-xs font-semibold text-nebula-pink mb-2">NFT MARKETPLACE</h4>
                <div className="space-y-1">
                  {[
                    { label: "Heroes Listed", value: "1,247", color: "text-meda-gold" },
                    { label: "Weapons Active", value: "892", color: "text-neon-cyan" },
                    { label: "Lands Available", value: "456", color: "text-nebula-pink" },
                    { label: "24h Volume", value: "15.2K", color: "text-energy-green" }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-xs text-gray-300">{item.label}</span>
                      <span className={`text-xs font-semibold ${item.color}`}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Center Panel - Holographic Display */}
              <div className="relative">
                <div className="glassmorphism p-4 rounded-lg h-full flex items-center justify-center relative overflow-hidden">
                  {/* Holographic Grid */}
                  <div className="absolute inset-0 opacity-20">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={`h-line-${i}`}
                        className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-neon-cyan to-transparent"
                        style={{ top: `${25 + i * 20}%` }}
                        animate={{ opacity: [0.3, 0.8, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={`v-line-${i}`}
                        className="absolute h-full w-0.5 bg-gradient-to-b from-transparent via-neon-cyan to-transparent"
                        style={{ left: `${25 + i * 20}%` }}
                        animate={{ opacity: [0.3, 0.8, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                      />
                    ))}
                  </div>

                  {/* Central Hologram */}
                  <motion.div 
                    className="relative w-16 h-16 rounded-full border-2 border-meda-gold/50 flex items-center justify-center"
                    animate={{ 
                      rotate: 360,
                      boxShadow: [
                        '0 0 15px rgba(255, 182, 30, 0.3)',
                        '0 0 25px rgba(255, 182, 30, 0.6)',
                        '0 0 15px rgba(255, 182, 30, 0.3)'
                      ]
                    }}
                    transition={{ 
                      rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                      boxShadow: { duration: 2, repeat: Infinity }
                    }}
                  >
                    <div className="w-10 h-10 rounded-full bg-meda-gold/20 flex items-center justify-center">
                      <Zap size={16} className="text-meda-gold" />
                    </div>
                  </motion.div>

                  {/* Orbiting Elements */}
                  {[0, 120, 240].map((angle, index) => (
                    <motion.div
                      key={`orbit-${index}`}
                      className="absolute w-2 h-2 rounded-full bg-neon-cyan"
                      style={{
                        boxShadow: '0 0 8px rgba(0, 240, 255, 0.8)',
                      }}
                      animate={{
                        x: [
                          Math.cos((angle * Math.PI) / 180) * 32,
                          Math.cos(((angle + 360) * Math.PI) / 180) * 32
                        ],
                        y: [
                          Math.sin((angle * Math.PI) / 180) * 32,
                          Math.sin(((angle + 360) * Math.PI) / 180) * 32
                        ]
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Live Activity Feed */}
              <div className="glassmorphism p-3 rounded-lg">
                <h4 className="text-xs font-semibold text-neon-cyan mb-2">LIVE ACTIVITY</h4>
                <div className="space-y-1">
                  {[
                    { action: "Hero minted", time: "2m ago", color: "text-meda-gold" },
                    { action: "Tournament joined", time: "5m ago", color: "text-neon-cyan" },
                    { action: "Land claimed", time: "12m ago", color: "text-nebula-pink" },
                    { action: "Meda Gas mined", time: "18m ago", color: "text-energy-green" }
                  ].map((activity, index) => (
                    <motion.div 
                      key={index} 
                      className="flex justify-between items-center text-xs"
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className={activity.color}>{activity.action}</span>
                      <span className="text-gray-400">{activity.time}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Data Streams */}
              <div className="glassmorphism p-3 rounded-lg">
                <h4 className="text-xs font-semibold text-energy-green mb-2">DATA STREAMS</h4>
                <div className="space-y-1 mb-2">
                  {[...Array(4)].map((_, index) => (
                    <motion.div
                      key={index}
                      className="h-1 bg-gradient-to-r from-transparent via-energy-green to-transparent rounded"
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                      }}
                      transition={{
                        duration: 2 + index * 0.5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      style={{
                        backgroundSize: '200% 100%'
                      }}
                    />
                  ))}
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-300">Network Load</span>
                    <span className="text-energy-green">87%</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-300">Gas Mining</span>
                    <span className="text-meda-gold">Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scanning Lines Effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(0, 240, 255, 0.1) 50%, transparent 100%)'
              }}
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
        </motion.div>

        {/* View all button */}
        <div className="text-center">
          <motion.button 
            className="btn-secondary-glass mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Updates
          </motion.button>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default LatestNews;