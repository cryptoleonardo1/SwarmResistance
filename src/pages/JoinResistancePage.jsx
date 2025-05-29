import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Target, 
  Brain, 
  Gamepad2, 
  Crown, 
  Trophy,
  Zap,
  Shield,
  Sword,
  Users,
  X,
  ArrowRight,
  Star
} from 'lucide-react';
import SectionWrapper from '../components/layout/SectionWrapper';

const JoinResistancePage = () => {
  const [hoveredStar, setHoveredStar] = useState(null);
  const [selectedMission, setSelectedMission] = useState(null);

  // Mission configurations - repositioned to avoid overlaps and create constellation
  const missions = [
    {
      id: 'daily-login',
      name: 'Daily Command',
      description: 'Report for duty daily and earn increasing rewards',
      icon: <Calendar className="w-10 h-10" />,
      type: 'daily',
      position: { x: 15, y: 35 }, // Left side, clear of bar
      color: '#FF6B00',
      size: 'xlarge',
      rewards: '100-3000 MG',
      details: {
        title: 'Daily Command Center',
        description: 'Lucky wheel with increasing rewards. Day 1: 100 MG → Day 30: 3000 MG. Miss a day = reset to Day 1.',
        mechanics: [
          'Progressive rewards over 30 days',
          'Lucky wheel spinning animation',
          'Reset penalty for missed days',
          'Visual feedback with cosmic effects'
        ]
      }
    },
    {
      id: 'swarm-eliminator',
      name: 'Swarm Eliminator',
      description: 'Test your reflexes against Swarm scouts',
      icon: <Target className="w-10 h-10" />,
      type: 'action',
      position: { x: 70, y: 30 }, // Top right, away from bar
      color: '#FF3E8A',
      size: 'xlarge',
      rewards: 'Score ÷ 10 MG',
      details: {
        title: 'Swarm Eliminator Protocol',
        description: '60-second intense reflex training. Click/tap to eliminate Swarm scouts before they escape.',
        mechanics: [
          '60-second rapid-fire rounds',
          'Increasing spawn rate difficulty',
          'Combo multipliers up to 5x',
          'Speed bonus for quick elimination'
        ]
      }
    },
    {
      id: 'resistance-trivia',
      name: 'Intel Briefing',
      description: 'Test your knowledge of Swarm tactics',
      icon: <Brain className="w-10 h-10" />,
      type: 'knowledge',
      position: { x: 25, y: 75 }, // Bottom left
      color: '#39FF14',
      size: 'large',
      rewards: '200 MG correct / 50 MG participation',
      details: {
        title: 'Daily Intelligence Briefing',
        description: 'One strategic question per day. Categories: Swarm lore, Game mechanics, Blockchain basics.',
        mechanics: [
          'One question per day',
          '4 multiple choice answers',
          '30-second decision timer',
          'Reward for participation even if wrong'
        ]
      }
    },
    {
      id: 'meda-shooter',
      name: 'Meda Shooter',
      description: 'Elite combat training simulator',
      icon: <Gamepad2 className="w-10 h-10" />,
      type: 'combat',
      position: { x: 55, y: 70 }, // Bottom right
      color: '#4A2B9F',
      size: 'xlarge',
      rewards: 'Weekly leaderboard rewards',
      details: {
        title: 'Meda Shooter Training',
        description: 'Advanced combat simulator with weekly tournaments. Top 100 fighters earn bonus Meda Gas.',
        mechanics: [
          'Weekly leaderboard competitions',
          'Anti-cheat validation system',
          'Ranked combat scenarios',
          'Elite pilot recognition system'
        ]
      }
    },
    {
      id: 'meda-wars',
      name: 'Meda Wars',
      description: 'Strategic land operations command',
      icon: <Crown className="w-12 h-12" />,
      type: 'strategy',
      position: { x: 45, y: 50 }, // Center - main mission
      color: '#FF6B00',
      size: 'xxlarge',
      rewards: 'Daily production income',
      details: {
        title: 'Meda Wars Command',
        description: 'Deploy Heroes and Weapons on captured land to generate daily Meda Gas income.',
        mechanics: [
          'Land system: Common (1 plot) to Legendary (7 plots)',
          'Hero assignment: 1 per plot, 2 weapons per hero',
          'Production formula: Hero power + Weapon power',
          'Real-time tactical interface'
        ]
      }
    },
    {
      id: 'coming-soon-1',
      name: 'Classified',
      description: 'New missions being decoded...',
      icon: <Shield className="w-8 h-8" />,
      type: 'locked',
      position: { x: 50, y: 25 }, // Top center, clear of bar
      color: '#666666',
      size: 'medium',
      rewards: 'TBA',
      details: {
        title: 'Classified Mission',
        description: 'Intelligence suggests new mission types are being developed by resistance command.',
        mechanics: ['Coming in Phase 2', 'Stay tuned for updates']
      }
    }
  ];

  // Simple star field background - performance optimized
  const backgroundStars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.6 + 0.2,
    duration: Math.random() * 4 + 3
  }));

  const getMissionSize = (size) => {
    switch (size) {
      case 'small': return 'w-12 h-12';
      case 'medium': return 'w-16 h-16';
      case 'large': return 'w-20 h-20';
      case 'xlarge': return 'w-24 h-24';
      case 'xxlarge': return 'w-28 h-28';
      default: return 'w-16 h-16';
    }
  };

  const getMissionGlow = (color) => ({
    boxShadow: `0 0 20px ${color}50, 0 0 40px ${color}30, 0 0 60px ${color}20`
  });

  return (
    <SectionWrapper className="relative overflow-hidden">
      {/* Simple animated star field background */}
      <div className="absolute inset-0 overflow-hidden">
        {backgroundStars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            animate={{
              opacity: [star.opacity, star.opacity * 0.3, star.opacity],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 text-center py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-stellar-white mb-4">
              <span className="text-gradient-gold">JOIN THE</span>
              <br />
              <span className="glow-text-cyan">RESISTANCE</span>
            </h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Choose Your Mission • Earn Meda Gas • Fight The Swarm
            </motion.p>
          </motion.div>
        </div>

        {/* Mission Constellation */}
        <div className="flex-1 relative min-h-0">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full max-w-6xl max-h-[600px]">
              
              {/* Constellation connections - matching your reference image */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#4A2B9F" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#FF3E8A" stopOpacity="0.8" />
                  </linearGradient>
                  
                  <filter id="connectionGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Main constellation pattern */}
                {/* Daily Command to Center */}
                <motion.line
                  x1="15" y1="35" x2="45" y2="50"
                  stroke="url(#connectionGradient)"
                  strokeWidth="0.4"
                  filter="url(#connectionGlow)"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 1 }}
                />
                
                {/* Swarm Eliminator to Center */}
                <motion.line
                  x1="70" y1="30" x2="45" y2="50"
                  stroke="url(#connectionGradient)"
                  strokeWidth="0.4"
                  filter="url(#connectionGlow)"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 1.3 }}
                />
                
                {/* Intel Briefing to Center */}
                <motion.line
                  x1="25" y1="75" x2="45" y2="50"
                  stroke="url(#connectionGradient)"
                  strokeWidth="0.4"
                  filter="url(#connectionGlow)"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 1.6 }}
                />
                
                {/* Meda Shooter to Center */}
                <motion.line
                  x1="75" y1="70" x2="45" y2="50"
                  stroke="url(#connectionGradient)"
                  strokeWidth="0.4"
                  filter="url(#connectionGlow)"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 1.9 }}
                />
                
                {/* Classified to Center - dashed */}
                <motion.line
                  x1="50" y1="25" x2="45" y2="50"
                  stroke="#666666"
                  strokeWidth="0.3"
                  strokeDasharray="2,1"
                  filter="url(#connectionGlow)"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 1.5, delay: 2.2 }}
                />
                
                {/* Outer constellation connections */}
                <motion.line
                  x1="15" y1="35" x2="70" y2="30"
                  stroke="url(#connectionGradient)"
                  strokeWidth="0.3"
                  filter="url(#connectionGlow)"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 2, delay: 2.5 }}
                />
                
                <motion.line
                  x1="70" y1="30" x2="75" y2="70"
                  stroke="url(#connectionGradient)"
                  strokeWidth="0.3"
                  filter="url(#connectionGlow)"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 2, delay: 2.8 }}
                />
                
                <motion.line
                  x1="75" y1="70" x2="25" y2="75"
                  stroke="url(#connectionGradient)"
                  strokeWidth="0.3"
                  filter="url(#connectionGlow)"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 2, delay: 3.1 }}
                />
                
                <motion.line
                  x1="25" y1="75" x2="15" y2="35"
                  stroke="url(#connectionGradient)"
                  strokeWidth="0.3"
                  filter="url(#connectionGlow)"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 2, delay: 3.4 }}
                />
              </svg>

              {/* Mission stars */}
              {missions.map((mission, index) => (
                <motion.div
                  key={mission.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{
                    left: `${mission.position.x}%`,
                    top: `${mission.position.y}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: index * 0.2 + 0.5,
                    duration: 0.6,
                    type: "spring",
                    stiffness: 200
                  }}
                  onHoverStart={() => setHoveredStar(mission.id)}
                  onHoverEnd={() => setHoveredStar(null)}
                  onClick={() => setSelectedMission(mission)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Mission star */}
                  <div 
                    className={`${getMissionSize(mission.size)} rounded-full backdrop-blur-md border-2 flex items-center justify-center text-stellar-white relative overflow-hidden group`}
                    style={{
                      backgroundColor: `${mission.color}20`,
                      borderColor: mission.color,
                      ...(hoveredStar === mission.id ? getMissionGlow(mission.color) : {})
                    }}
                  >
                    {/* Pulsing background */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: mission.color }}
                      animate={{
                        opacity: hoveredStar === mission.id ? [0.1, 0.3, 0.1] : [0.05, 0.1, 0.05]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    
                    {/* Icon */}
                    <div className="relative z-10">
                      {mission.icon}
                    </div>

                    {/* Orbiting particles */}
                    {hoveredStar === mission.id && (
                      <div className="absolute inset-0">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 rounded-full"
                            style={{ backgroundColor: mission.color }}
                            animate={{
                              rotate: [0, 360],
                              x: [0, 30, 0, -30, 0],
                              y: [0, -30, 0, 30, 0],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              delay: i * 0.5,
                              ease: "linear"
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Mission info popup */}
                  <AnimatePresence>
                    {hoveredStar === mission.id && (
                      <motion.div
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-void-black/90 backdrop-blur-md border border-cosmic-purple/50 rounded-lg p-4 min-w-64 z-20"
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="text-center">
                          <h3 className="text-lg font-bold text-stellar-white mb-2">
                            {mission.name}
                          </h3>
                          <p className="text-sm text-gray-300 mb-2">
                            {mission.description}
                          </p>
                          <div className="text-xs text-meda-gold font-medium">
                            Rewards: {mission.rewards}
                          </div>
                          {mission.type !== 'locked' && (
                            <motion.div 
                              className="mt-3 text-xs text-neon-cyan flex items-center justify-center gap-1"
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              Click to deploy <ArrowRight size={12} />
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              {/* Central command indicator */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 60,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="w-32 h-32 rounded-full border border-cosmic-purple/20 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-meda-gold/30 flex items-center justify-center">
                    <Users className="w-8 h-8 text-meda-gold/50" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Enhanced Resistance Command Status Bar */}
        <div className="absolute top-4 right-4 md:top-8 md:right-8">
          <motion.div 
            className="bg-void-black/80 backdrop-blur-md border border-cosmic-purple/50 rounded-xl p-4 md:p-6 min-w-80"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-cosmic-purple/30">
              <div className="w-10 h-10 rounded-full bg-meda-gold/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-meda-gold" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stellar-white">Resistance Command</h3>
                <p className="text-xs text-gray-400">Galactic Operations Center</p>
              </div>
            </div>

            {/* Mission Status */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-meda-gold" />
                  <span className="text-sm text-gray-300">Active Missions:</span>
                </div>
                <span className="text-stellar-white font-bold">
                  {missions.filter(m => m.type !== 'locked').length}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-energy-green" />
                  <span className="text-sm text-gray-300">Resistance Status:</span>
                </div>
                <span className="text-energy-green font-bold">ACTIVE</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-nebula-pink" />
                  <span className="text-sm text-gray-300">Total Fighters:</span>
                </div>
                <span className="text-nebula-pink font-bold">1,247</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-neon-cyan" />
                  <span className="text-sm text-gray-300">Sectors Liberated:</span>
                </div>
                <span className="text-neon-cyan font-bold">34/100</span>
              </div>
            </div>

            {/* Threat Level */}
            <div className="bg-nebula-pink/10 rounded-lg p-3 mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-nebula-pink">Swarm Threat Level</span>
                <span className="text-xs text-gray-400">Updated 2m ago</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-void-black/50 rounded-full h-2">
                  <motion.div 
                    className="bg-gradient-to-r from-energy-green via-meda-gold to-nebula-pink h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '67%' }}
                    transition={{ delay: 2, duration: 1.5 }}
                  />
                </div>
                <span className="text-sm font-bold text-nebula-pink">HIGH</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-meda-gold/10 rounded-lg p-2 text-center">
                <div className="text-meda-gold font-bold">24.7K</div>
                <div className="text-gray-400">Daily MG Earned</div>
              </div>
              <div className="bg-energy-green/10 rounded-lg p-2 text-center">
                <div className="text-energy-green font-bold">156</div>
                <div className="text-gray-400">Online Now</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mission Details Modal */}
      <AnimatePresence>
        {selectedMission && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMission(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-void-black/80 backdrop-blur-sm" />
            
            {/* Modal */}
            <motion.div
              className="relative bg-space-blue/90 backdrop-blur-md border border-cosmic-purple/50 rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedMission(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-stellar-white transition-colors"
              >
                <X size={24} />
              </button>

              {/* Mission header */}
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-16 h-16 rounded-full border-2 flex items-center justify-center text-stellar-white"
                  style={{
                    backgroundColor: `${selectedMission.color}20`,
                    borderColor: selectedMission.color
                  }}
                >
                  {selectedMission.icon}
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-stellar-white mb-2">
                    {selectedMission.details.title}
                  </h2>
                  <div className="flex items-center gap-4">
                    <span 
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: `${selectedMission.color}20`,
                        color: selectedMission.color
                      }}
                    >
                      {selectedMission.type.toUpperCase()}
                    </span>
                    <span className="text-meda-gold font-medium">
                      {selectedMission.rewards}
                    </span>
                  </div>
                </div>
              </div>

              {/* Mission description */}
              <div className="mb-8">
                <p className="text-gray-300 text-lg leading-relaxed">
                  {selectedMission.details.description}
                </p>
              </div>

              {/* Mission mechanics */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-stellar-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-energy-green" />
                  Mission Mechanics
                </h3>
                <div className="space-y-3">
                  {selectedMission.details.mechanics.map((mechanic, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-void-black/40 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-2 h-2 rounded-full bg-energy-green mt-2 flex-shrink-0" />
                      <span className="text-gray-300">{mechanic}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {selectedMission.type !== 'locked' ? (
                  <>
                    <motion.button
                      className="flex-1 bg-gradient-to-r from-meda-gold to-[#FF9D00] text-void-black font-bold py-4 px-6 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        // Handle mission start - will implement game logic later
                        console.log(`Starting mission: ${selectedMission.id}`);
                      }}
                    >
                      <Sword className="w-5 h-5" />
                      Deploy Now
                    </motion.button>
                    <motion.button
                      className="flex-1 bg-transparent border border-neon-cyan text-neon-cyan font-bold py-4 px-6 rounded-lg hover:bg-neon-cyan/10 transition-all duration-300 flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        // Handle leaderboard view
                        console.log(`Viewing leaderboard: ${selectedMission.id}`);
                      }}
                    >
                      <Trophy className="w-5 h-5" />
                      Leaderboard
                    </motion.button>
                  </>
                ) : (
                  <div className="flex-1 bg-gray-600/20 text-gray-400 font-bold py-4 px-6 rounded-lg text-center">
                    Mission Locked - Coming Soon
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
};

export default JoinResistancePage;