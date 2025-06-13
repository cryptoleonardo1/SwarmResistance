import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
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
  X,
  ArrowRight,
} from 'lucide-react';

// Mock SectionWrapper component - simplified to avoid conflicts
const SectionWrapper = ({ children, className }) => (
  <div className={`min-h-screen w-full relative overflow-hidden ${className || ''}`}>
    {children}
  </div>
);

SectionWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

// Hover Popup Component with typing animation
const HoverPopup = ({ mission }) => {
  const [typedName, setTypedName] = useState('');
  const [typedDescription, setTypedDescription] = useState('');
  const [typedRewards, setTypedRewards] = useState('');

  useEffect(() => {
    // Type name first
    let nameIndex = 0;
    const nameInterval = setInterval(() => {
      setTypedName(mission.name.slice(0, nameIndex));
      nameIndex++;
      if (nameIndex > mission.name.length) {
        clearInterval(nameInterval);
        
        // Then type description
        let descIndex = 0;
        const descInterval = setInterval(() => {
          setTypedDescription(mission.description.slice(0, descIndex));
          descIndex++;
          if (descIndex > mission.description.length) {
            clearInterval(descInterval);
            
            // Finally type rewards
            const rewardText = `Rewards: ${mission.rewards}`;
            let rewardIndex = 0;
            const rewardInterval = setInterval(() => {
              setTypedRewards(rewardText.slice(0, rewardIndex));
              rewardIndex++;
              if (rewardIndex > rewardText.length) {
                clearInterval(rewardInterval);
              }
            }, 30);
          }
        }, 25);
      }
    }, 50);

    return () => {
      clearInterval(nameInterval);
    };
  }, [mission.name, mission.description, mission.rewards]);
  
  // Smart positioning to avoid cutoff and overlaps
  const getPopupPosition = (mission) => {
    // eslint-disable-next-line react/prop-types
    const { x, y, id } = mission;
    let positionClass = '';
    let transformClass = '';
    
    // Special handling for Meda Shooter to ensure it's always on top
    if (id === 'meda-shooter') {
      positionClass = 'left-full ml-4 top-1/2';
      transformClass = '-translate-y-1/2';
    }
    // For Intel Briefing (top right) - position to the left to avoid overlap
    else if (id === 'resistance-trivia') {
      positionClass = 'right-full mr-4 top-1/2';
      transformClass = '-translate-y-1/2';
    }
    // For missions on the right side
    else if (x > 60) {
      positionClass = 'right-full mr-4 top-1/2';
      transformClass = '-translate-y-1/2';
    }
    // For missions on the left side
    else if (x < 40) {
      positionClass = 'left-full ml-4 top-1/2';
      transformClass = '-translate-y-1/2';
    }
    // For missions at the top
    else if (y < 40) {
      positionClass = 'top-full mt-4 left-1/2';
      transformClass = '-translate-x-1/2';
    }
    // For missions at the bottom
    else {
      positionClass = 'bottom-full mb-4 left-1/2';
      transformClass = '-translate-x-1/2';
    }
    
    return { positionClass, transformClass };
  };
  
  const { positionClass, transformClass } = getPopupPosition(mission);
  
  return (
    <motion.div
      className={`absolute ${positionClass} transform ${transformClass} z-40 bg-void-black/95 backdrop-blur-md border border-cosmic-purple/50 rounded-lg p-4 min-w-64 max-w-80`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      style={{
        boxShadow: `0 0 20px ${mission.color}30, 0 0 40px ${mission.color}20`
      }}
    >
      <div className="text-center">
        <h3 className="text-lg font-bold text-stellar-white mb-2 font-jetbrains">
          {typedName}
          {typedName !== mission.name && <span className="animate-pulse text-meda-gold">_</span>}
        </h3>
        <p className="text-sm text-gray-300 mb-2 font-jetbrains min-h-[2.5rem]">
          {typedDescription}
          {typedDescription !== mission.description && typedName === mission.name && (
            <span className="animate-pulse text-meda-gold">_</span>
          )}
        </p>
        <div className="text-xs text-meda-gold font-medium font-jetbrains min-h-[1rem]">
          {typedRewards}
          {typedRewards !== `Rewards: ${mission.rewards}` && typedDescription === mission.description && (
            <span className="animate-pulse text-meda-gold">_</span>
          )}
        </div>
        {mission.type !== 'locked' && typedRewards === `Rewards: ${mission.rewards}` && (
          <motion.div 
            className="mt-3 text-xs text-neon-cyan flex items-center justify-center gap-1 font-jetbrains"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Click to deploy <ArrowRight size={12} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

HoverPopup.propTypes = {
  mission: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    rewards: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    position: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }).isRequired,
    icon: PropTypes.node,
    size: PropTypes.string,
    details: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      mechanics: PropTypes.arrayOf(PropTypes.string)
    })
  }).isRequired
};

const JoinResistancePage = () => {
  const [hoveredStar, setHoveredStar] = useState(null);
  const [selectedMission, setSelectedMission] = useState(null);

  // Mission configurations - positioned exactly on constellation corners
  const missions = [
    {
      id: 'daily-login',
      name: 'Daily Command',
      description: 'Report for duty daily and earn increasing rewards',
      icon: <Calendar className="w-10 h-10" />,
      type: 'daily',
      position: { x: 16, y: 15 }, // Top left corner
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
      position: { x: 45, y: 10 }, // Top center corner
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
      position: { x: 70, y: 16 }, // Top right corner
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
      position: { x: 75, y: 48 }, // Right corner
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
      position: { x: 45, y: 52 }, // Bottom center corner - main mission
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
      position: { x: 20, y: 50 }, // Left corner
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
    <div className="full-screen-section relative overflow-hidden bg-void-primary">
      {/* Background with original purple gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-indigo-900 to-purple-900">
        {/* Simple nebula overlay without stars */}
        <div className="absolute inset-0 bg-gradient-radial from-cosmic-purple/30 via-transparent to-void-primary/60" />
      </div>

      {/* Main content container with centered layout like marketplace */}
      <div className="relative z-10 min-h-screen w-full pt-16 md:pl-64">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
          
          {/* Header - centered title section */}
          <motion.div 
            className="text-center mb-6 pt-8"
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

          {/* Mission Constellation - centered within content area */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-full h-96 max-w-4xl mx-auto">
              
              {/* Constellation connections - Gold colored with animations */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFB61E" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#FF9D00" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#FFB61E" stopOpacity="0.9" />
                  </linearGradient>
                  
                  <filter id="goldGlow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Main constellation pattern - exact corner connections */}
                {/* Top triangle: Daily Login -> Swarm Eliminator -> Intel Briefing */}
                <motion.line
                  x1="25%" y1="20%" x2="50%" y2="15%"
                  stroke="url(#goldGradient)"
                  strokeWidth="2.5"
                  filter="url(#goldGlow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: [0, 1, 0.8, 1],
                    strokeWidth: [2.5, 3, 2.5, 3]
                  }}
                  transition={{ 
                    duration: 2, 
                    delay: 1,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                
                <motion.line
                  x1="50%" y1="15%" x2="75%" y2="20%"
                  stroke="url(#goldGradient)"
                  strokeWidth="2.5"
                  filter="url(#goldGlow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: [0, 1, 0.8, 1],
                    strokeWidth: [2.5, 3, 2.5, 3]
                  }}
                  transition={{ 
                    duration: 2, 
                    delay: 1.3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                
                {/* Center connections */}
                <motion.line
                  x1="50%" y1="15%" x2="50%" y2="60%"
                  stroke="url(#goldGradient)"
                  strokeWidth="3"
                  filter="url(#goldGlow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: [0, 1, 0.8, 1],
                    strokeWidth: [3, 3.5, 3, 3.5]
                  }}
                  transition={{ 
                    duration: 2.5, 
                    delay: 1.6,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                
                <motion.line
                  x1="75%" y1="20%" x2="75%" y2="55%"
                  stroke="url(#goldGradient)"
                  strokeWidth="2.5"
                  filter="url(#goldGlow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: [0, 1, 0.8, 1],
                    strokeWidth: [2.5, 3, 2.5, 3]
                  }}
                  transition={{ 
                    duration: 2, 
                    delay: 1.9,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                
                <motion.line
                  x1="75%" y1="55%" x2="50%" y2="60%"
                  stroke="url(#goldGradient)"
                  strokeWidth="2.5"
                  filter="url(#goldGlow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: [0, 1, 0.8, 1],
                    strokeWidth: [2.5, 3, 2.5, 3]
                  }}
                  transition={{ 
                    duration: 2, 
                    delay: 2.2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                
                <motion.line
                  x1="50%" y1="60%" x2="25%" y2="55%"
                  stroke="url(#goldGradient)"
                  strokeWidth="2.5"
                  filter="url(#goldGradient)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: [0, 1, 0.8, 1],
                    strokeWidth: [2.5, 3, 2.5, 3]
                  }}
                  transition={{ 
                    duration: 2, 
                    delay: 2.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                
                <motion.line
                  x1="25%" y1="55%" x2="25%" y2="20%"
                  stroke="url(#goldGradient)"
                  strokeWidth="2.5"
                  filter="url(#goldGlow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: [0, 1, 0.8, 1],
                    strokeWidth: [2.5, 3, 2.5, 3]
                  }}
                  transition={{ 
                    duration: 2, 
                    delay: 2.8,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </svg>

              {/* Mission stars - ALL 6 MISSIONS */}
              {missions.map((mission, index) => (
                <motion.div
                  key={mission.id}
                  className="absolute cursor-pointer z-10"
                  style={{
                    left: `${mission.position.x}%`,
                    top: `${mission.position.y}%`,
                    transform: 'translate(-50%, -50%)',
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

                    {/* Subtle glow effect on hover */}
                    {hoveredStar === mission.id && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ 
                          background: `radial-gradient(circle, ${mission.color}40 0%, ${mission.color}20 50%, transparent 70%)` 
                        }}
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                  </div>

                  {/* Mission info popup - Positioned to avoid cutoff */}
                  <AnimatePresence>
                    {hoveredStar === mission.id && (
                      <HoverPopup mission={mission} />
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
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
    </div>
  );
};

export default JoinResistancePage;