import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

const WarpGateTransition = ({ isActive = false, onComplete = () => {}, direction = 'forward' }) => {
  const [stage, setStage] = useState('idle'); // idle, opening, warp, closing

  useEffect(() => {
    if (isActive) {
      setStage('opening');
      
      // Quick opening sequence
      const openingTimer = setTimeout(() => {
        setStage('warp');
      }, 300);

      // Brief warp effect
      const warpTimer = setTimeout(() => {
        setStage('closing');
      }, 800);

      // Complete transition
      const completeTimer = setTimeout(() => {
        setStage('idle');
        onComplete();
      }, 1200);

      return () => {
        clearTimeout(openingTimer);
        clearTimeout(warpTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [isActive, onComplete]);

  if (!isActive && stage === 'idle') return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Central Warp Gate Ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative w-96 h-96"
            initial={{ scale: 0, rotate: 0, opacity: 0 }}
            animate={{
              scale: stage === 'opening' ? [0, 1.2, 1] : 
                     stage === 'warp' ? [1, 2, 0] : 
                     0,
              rotate: stage === 'warp' ? (direction === 'forward' ? 720 : -720) : 0,
              opacity: stage === 'opening' ? [0, 1, 1] : 
                      stage === 'warp' ? [1, 1, 0] : 
                      0
            }}
            transition={{
              scale: { duration: stage === 'opening' ? 0.3 : 0.5, ease: "easeOut" },
              rotate: { duration: 0.5, ease: "easeInOut" },
              opacity: { duration: stage === 'opening' ? 0.2 : 0.3 }
            }}
          >
            {/* Main Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-4"
              style={{
                background: 'conic-gradient(from 0deg, rgba(255, 140, 0, 0.9), rgba(59, 130, 246, 0.9), rgba(34, 197, 94, 0.9), rgba(255, 62, 138, 0.9), rgba(255, 140, 0, 0.9))',
                borderColor: '#FF8C00',
                boxShadow: '0 0 60px rgba(255, 140, 0, 0.8), inset 0 0 60px rgba(255, 140, 0, 0.4)'
              }}
              animate={{
                rotate: [0, direction === 'forward' ? 360 : -360]
              }}
              transition={{
                duration: 0.8,
                ease: "linear",
                repeat: stage === 'warp' ? Infinity : 0
              }}
            />

            {/* Inner Ring */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-2"
              style={{
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 140, 0, 0.6) 30%, transparent 70%)',
                borderColor: '#3B82F6',
                boxShadow: '0 0 40px rgba(59, 130, 246, 0.6)'
              }}
              animate={{
                rotate: [0, direction === 'forward' ? -360 : 360]
              }}
              transition={{
                duration: 0.6,
                ease: "linear",
                repeat: stage === 'warp' ? Infinity : 0
              }}
            />

            {/* Central Portal */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 140, 0, 0.8) 40%, rgba(0, 0, 0, 0.9) 80%, transparent 100%)',
                boxShadow: '0 0 80px rgba(255, 255, 255, 1)'
              }}
              animate={{
                scale: stage === 'warp' ? [1, 1.5, 0] : [0, 1, 1],
                opacity: stage === 'warp' ? [1, 1, 0] : [0, 1, 1]
              }}
              transition={{
                duration: stage === 'warp' ? 0.5 : 0.3
              }}
            />

            {/* Ring Segments */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`segment-${i}`}
                className="absolute w-6 h-6 rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                  backgroundColor: i % 4 === 0 ? '#FF8C00' : 
                                 i % 4 === 1 ? '#3B82F6' : 
                                 i % 4 === 2 ? '#22C55E' : '#FF3E8A',
                  boxShadow: `0 0 20px currentColor`,
                  transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-12rem)`
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.05,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Warp Speed Lines */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={`warp-line-${i}`}
              className="absolute h-0.5"
              style={{
                top: `${Math.random() * 100}%`,
                left: direction === 'forward' ? '-200px' : '100%',
                width: `${200 + Math.random() * 300}px`,
                background: `linear-gradient(90deg, transparent, ${i % 4 === 0 ? '#FF8C00' : i % 4 === 1 ? '#3B82F6' : i % 4 === 2 ? '#22C55E' : '#FF3E8A'}, transparent)`,
                boxShadow: `0 0 4px ${i % 4 === 0 ? '#FF8C00' : i % 4 === 1 ? '#3B82F6' : i % 4 === 2 ? '#22C55E' : '#FF3E8A'}`
              }}
              initial={{ 
                x: direction === 'forward' ? 0 : 0,
                opacity: 0,
                scaleX: 0.1
              }}
              animate={{
                x: direction === 'forward' ? ['0px', '150vw'] : ['0px', '-150vw'],
                opacity: stage === 'warp' ? [0, 1, 1, 0] : 0,
                scaleX: stage === 'warp' ? [0.1, 1, 1, 0.1] : 0.1
              }}
              transition={{
                duration: 0.6,
                delay: i * 0.01,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Warp Particles */}
        <div className="absolute inset-0">
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: i % 4 === 0 ? '#FF8C00' : 
                               i % 4 === 1 ? '#3B82F6' : 
                               i % 4 === 2 ? '#22C55E' : '#FF3E8A',
                boxShadow: '0 0 10px currentColor'
              }}
              initial={{
                scale: 0,
                opacity: 0
              }}
              animate={{
                scale: stage === 'warp' ? [0, 2, 0] : 0,
                opacity: stage === 'warp' ? [0, 1, 0] : 0,
                x: stage === 'warp' ? [(Math.random() - 0.5) * 800] : 0,
                y: stage === 'warp' ? [(Math.random() - 0.5) * 600] : 0
              }}
              transition={{
                duration: 0.8,
                delay: Math.random() * 0.3,
                ease: "easeOut"
              }}
            />
          ))}
        </div>

        {/* Screen Flash Effect */}
        <motion.div
          className="absolute inset-0 bg-white pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{
            opacity: stage === 'warp' ? [0, 0.7, 0] : 0
          }}
          transition={{
            duration: 0.2,
            delay: 0.4
          }}
        />

        {/* Background Overlay */}
        <motion.div
          className="absolute inset-0 bg-black pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{
            opacity: stage === 'opening' ? 0.4 : 
                     stage === 'warp' ? 0.8 : 
                     0
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

// Add PropTypes validation
WarpGateTransition.propTypes = {
  isActive: PropTypes.bool,
  onComplete: PropTypes.func,
  direction: PropTypes.oneOf(['forward', 'backward'])
};

export default WarpGateTransition;