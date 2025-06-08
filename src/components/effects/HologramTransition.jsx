import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

const HologramTransition = ({ isActive = false, onComplete = () => {}, direction = 'forward' }) => {
  const [stage, setStage] = useState('idle'); // idle, initializing, scanning, channeling, glitching, stabilizing, complete

  useEffect(() => {
    if (isActive) {
      setStage('initializing');
      
      // Initializing phase - boot up sequence
      const initTimer = setTimeout(() => {
        setStage('scanning');
      }, 200);

      // Scanning phase - analyze current channel
      const scanTimer = setTimeout(() => {
        setStage('channeling');
      }, 500);

      // Channeling phase - tuning to new frequency
      const channelTimer = setTimeout(() => {
        setStage('glitching');
      }, 800);

      // Glitching phase - signal interference
      const glitchTimer = setTimeout(() => {
        setStage('stabilizing');
      }, 1100);

      // Stabilizing phase - lock onto new channel
      const stabilizeTimer = setTimeout(() => {
        setStage('complete');
      }, 1300);

      // Complete transition
      const completeTimer = setTimeout(() => {
        setStage('idle');
        onComplete();
      }, 1500);

      return () => {
        clearTimeout(initTimer);
        clearTimeout(scanTimer);
        clearTimeout(channelTimer);
        clearTimeout(glitchTimer);
        clearTimeout(stabilizeTimer);
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
        {/* Retro TV Static Background */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(0, 240, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(255, 140, 0, 0.1) 0%, transparent 50%),
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 1px,
                rgba(0, 240, 255, 0.02) 1px,
                rgba(0, 240, 255, 0.02) 2px
              )
            `
          }}
          animate={{
            opacity: stage === 'initializing' ? [0, 0.8] :
                     stage === 'scanning' ? 0.6 :
                     stage === 'channeling' ? 0.8 :
                     stage === 'glitching' ? [0.8, 0.3, 0.9, 0.1] :
                     stage === 'stabilizing' ? [0.1, 0.4] : 0
          }}
          transition={{
            duration: stage === 'glitching' ? 0.1 : 0.3,
            repeat: stage === 'glitching' ? 5 : 0
          }}
        />

        {/* Channel Number Display */}
        <motion.div
          className="absolute top-8 right-8 font-mono text-4xl font-bold"
          style={{
            color: '#00F0FF',
            textShadow: '0 0 20px rgba(0, 240, 255, 0.8), 0 0 40px rgba(0, 240, 255, 0.4)',
            fontFamily: 'monospace'
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: stage === 'channeling' || stage === 'glitching' || stage === 'stabilizing' ? 1 : 0,
            scale: stage === 'channeling' ? [0.5, 1.2, 1] :
                   stage === 'glitching' ? [1, 0.8, 1.3, 0.9, 1.1] :
                   stage === 'stabilizing' ? [1.1, 1] : 0.5,
            x: stage === 'glitching' ? [0, -3, 3, -2, 0] : 0
          }}
          transition={{
            duration: stage === 'glitching' ? 0.1 : 0.4,
            repeat: stage === 'glitching' ? 3 : 0
          }}
        >
          CH_{direction === 'forward' ? '>>>' : '<<<'}
        </motion.div>

        {/* Signal Strength Indicator */}
        <motion.div
          className="absolute top-8 left-8 flex flex-col space-y-1"
          initial={{ opacity: 0 }}
          animate={{
            opacity: stage === 'scanning' || stage === 'channeling' || stage === 'stabilizing' ? 1 : 0
          }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`signal-${i}`}
              className="w-12 h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
              style={{
                boxShadow: '0 0 4px currentColor'
              }}
              animate={{
                opacity: stage === 'scanning' ? (i < 2 ? 1 : 0.3) :
                        stage === 'channeling' ? (i < 4 ? 1 : 0.3) :
                        stage === 'stabilizing' ? 1 : 0.3,
                scaleX: stage === 'channeling' ? [1, 0.7, 1] : 1
              }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                repeat: stage === 'channeling' ? Infinity : 0
              }}
            />
          ))}
        </motion.div>

        {/* Enhanced Holographic Grid */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(90deg, transparent 98%, rgba(0, 240, 255, 0.4) 100%),
              linear-gradient(0deg, transparent 98%, rgba(255, 140, 0, 0.4) 100%),
              radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.1) 0%, transparent 70%)
            `,
            backgroundSize: '30px 30px, 30px 30px, 200px 200px'
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: stage === 'scanning' ? [0, 0.8, 0.5] : 
                     stage === 'channeling' ? 0.3 :
                     stage === 'glitching' ? [0.3, 0.9, 0.1, 0.7] : 0,
            backgroundPosition: 
              stage === 'scanning' ? ['0px 0px', '30px 30px'] :
              stage === 'channeling' ? ['30px 30px', '60px 60px'] :
              stage === 'glitching' ? ['60px 60px', '0px 0px'] : '0px 0px'
          }}
          transition={{
            opacity: { duration: stage === 'glitching' ? 0.1 : 0.4 },
            backgroundPosition: { 
              duration: stage === 'glitching' ? 0.05 : 1.5, 
              repeat: stage !== 'idle' ? Infinity : 0, 
              ease: "linear" 
            }
          }}
        />

        {/* Retro Scan Lines */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`retro-scan-${i}`}
              className="absolute w-full h-0.5"
              style={{
                top: `${8.33 * i}%`,
                background: `linear-gradient(90deg, 
                  transparent, 
                  ${i % 3 === 0 ? 'rgba(0, 240, 255, 0.8)' : 
                    i % 3 === 1 ? 'rgba(255, 140, 0, 0.8)' : 
                    'rgba(34, 197, 94, 0.8)'}, 
                  transparent)`,
                boxShadow: `0 0 10px ${i % 3 === 0 ? 'rgba(0, 240, 255, 0.6)' : 
                                      i % 3 === 1 ? 'rgba(255, 140, 0, 0.6)' : 
                                      'rgba(34, 197, 94, 0.6)'}`
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: stage === 'scanning' ? [0, 1, 0.8] :
                       stage === 'channeling' ? [0.8, 1, 0.6] : 0,
                opacity: stage === 'scanning' ? [0, 1, 0.7] :
                        stage === 'channeling' ? [0.7, 1, 0.5] : 0,
                x: stage === 'glitching' ? [0, -20, 20, 0] : 0
              }}
              transition={{
                scaleX: { duration: 0.8, delay: i * 0.05, ease: "easeInOut" },
                opacity: { duration: 0.8, delay: i * 0.05, ease: "easeInOut" },
                x: { duration: 0.1, repeat: stage === 'glitching' ? 2 : 0 }
              }}
            />
          ))}
        </div>

        {/* Channel Tuning Frequency Bars */}
        <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 h-24 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`freq-${i}`}
              className="absolute w-1 bg-gradient-to-t from-transparent via-cyan-400 to-transparent"
              style={{
                left: `${5 * i}%`,
                height: `${Math.random() * 60 + 20}px`,
                boxShadow: '0 0 8px rgba(0, 240, 255, 0.6)'
              }}
              animate={{
                height: stage === 'channeling' ? [
                  `${Math.random() * 60 + 20}px`,
                  `${Math.random() * 80 + 40}px`,
                  `${Math.random() * 60 + 20}px`
                ] : `${Math.random() * 60 + 20}px`,
                opacity: stage === 'channeling' ? [0.3, 1, 0.6] : 0
              }}
              transition={{
                duration: 0.2,
                delay: i * 0.02,
                repeat: stage === 'channeling' ? Infinity : 0,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Digital Interference Glitch Bars */}
        {(stage === 'glitching' || stage === 'channeling') && (
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`interference-${i}`}
                className="absolute w-full"
                style={{
                  top: `${Math.random() * 80 + 10}%`,
                  height: `${Math.random() * 12 + 4}px`,
                  background: `linear-gradient(90deg, 
                    ${i % 4 === 0 ? 'rgba(0, 240, 255, 0.8)' : 
                      i % 4 === 1 ? 'rgba(255, 140, 0, 0.8)' : 
                      i % 4 === 2 ? 'rgba(34, 197, 94, 0.8)' : 
                      'rgba(255, 62, 138, 0.8)'}, 
                    transparent, 
                    ${i % 4 === 0 ? 'rgba(0, 240, 255, 0.8)' : 
                      i % 4 === 1 ? 'rgba(255, 140, 0, 0.8)' : 
                      i % 4 === 2 ? 'rgba(34, 197, 94, 0.8)' : 
                      'rgba(255, 62, 138, 0.8)'})`,
                  boxShadow: `0 0 15px ${i % 4 === 0 ? 'rgba(0, 240, 255, 0.8)' : 
                                        i % 4 === 1 ? 'rgba(255, 140, 0, 0.8)' : 
                                        i % 4 === 2 ? 'rgba(34, 197, 94, 0.8)' : 
                                        'rgba(255, 62, 138, 0.8)'}`
                }}
                animate={{
                  x: stage === 'glitching' ? ['-100%', '100%'] : ['0%', '0%'],
                  opacity: stage === 'glitching' ? [0, 1, 0] : 
                          stage === 'channeling' ? [0, 0.3, 0] : 0,
                  scaleY: stage === 'glitching' ? [1, 1.5, 0.5, 1] : 1
                }}
                transition={{
                  x: { duration: 0.12, ease: "easeInOut" },
                  opacity: { duration: 0.15 },
                  scaleY: { duration: 0.1, repeat: stage === 'glitching' ? 2 : 0 },
                  delay: i * 0.02
                }}
              />
            ))}
          </div>
        )}

        {/* Enhanced Central Hologram Hub */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative w-40 h-40"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: stage === 'initializing' ? [0, 0.8] :
                     stage === 'scanning' ? [0.8, 1.2, 1] : 
                     stage === 'channeling' ? [1, 1.1, 1] :
                     stage === 'glitching' ? [1, 0.9, 1.3, 0.8, 1] :
                     stage === 'stabilizing' ? [1, 1.05, 1] : 0,
              opacity: stage === 'idle' ? 0 : 1,
              rotate: stage === 'glitching' ? [0, -5, 5, -3, 0] : 0
            }}
            transition={{
              scale: { duration: stage === 'glitching' ? 0.1 : 0.4 },
              rotate: { duration: 0.1, repeat: stage === 'glitching' ? 3 : 0 }
            }}
          >
            {/* Outer Hologram Ring with retro segments */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, rgba(0, 240, 255, 0.8), rgba(255, 140, 0, 0.8), rgba(34, 197, 94, 0.8), rgba(255, 62, 138, 0.8), rgba(0, 240, 255, 0.8))',
                borderRadius: '50%',
                boxShadow: '0 0 30px rgba(0, 240, 255, 0.6), inset 0 0 30px rgba(0, 240, 255, 0.2)'
              }}
              animate={{
                rotate: [0, direction === 'forward' ? 360 : -360]
              }}
              transition={{
                duration: 2,
                ease: "linear",
                repeat: stage !== 'idle' ? Infinity : 0
              }}
            />

            {/* Middle Ring with data segments */}
            <motion.div
              className="absolute top-4 left-4 right-4 bottom-4 rounded-full border-2"
              style={{
                borderColor: 'rgba(255, 140, 0, 0.8)',
                boxShadow: '0 0 20px rgba(255, 140, 0, 0.6)'
              }}
              animate={{
                rotate: [0, direction === 'forward' ? -270 : 270]
              }}
              transition={{
                duration: 1.5,
                ease: "linear",
                repeat: stage !== 'idle' ? Infinity : 0
              }}
            >
              {/* Data segments */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`segment-${i}`}
                  className="absolute w-2 h-6 bg-orange-400 rounded-sm"
                  style={{
                    top: '50%',
                    left: '50%',
                    transformOrigin: '50% 50%',
                    transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-2.5rem)`,
                    boxShadow: '0 0 8px rgba(255, 140, 0, 0.8)'
                  }}
                  animate={{
                    opacity: stage === 'channeling' ? [0.5, 1, 0.5] : 0.7,
                    scaleY: stage === 'channeling' ? [1, 1.5, 1] : 1
                  }}
                  transition={{
                    duration: 0.3,
                    delay: i * 0.05,
                    repeat: stage === 'channeling' ? Infinity : 0
                  }}
                />
              ))}
            </motion.div>

            {/* Inner Core with pulsing effect */}
            <motion.div
              className="absolute top-8 left-8 right-8 bottom-8 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(0, 240, 255, 0.9) 0%, rgba(255, 140, 0, 0.7) 50%, rgba(0, 240, 255, 0.5) 100%)',
                boxShadow: '0 0 40px rgba(0, 240, 255, 0.8)'
              }}
              animate={{
                scale: stage === 'stabilizing' ? [1, 1.2, 1] :
                       stage === 'glitching' ? [1, 0.8, 1.3, 0.9, 1] : [0.9, 1.1, 0.9],
                opacity: stage === 'glitching' ? [1, 0.5, 1, 0.3, 1] : [0.8, 1, 0.8]
              }}
              transition={{
                duration: stage === 'glitching' ? 0.1 : 1.2,
                repeat: stage === 'glitching' ? 0 : Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Hologram Data Streams with retro style */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`data-stream-${i}`}
                className="absolute w-1 h-12"
                style={{
                  top: '50%',
                  left: '50%',
                  background: `linear-gradient(180deg, 
                    ${i % 3 === 0 ? 'rgba(0, 240, 255, 0.9)' : 
                      i % 3 === 1 ? 'rgba(255, 140, 0, 0.9)' : 
                      'rgba(34, 197, 94, 0.9)'}, transparent)`,
                  transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-4rem)`,
                  boxShadow: `0 0 8px ${i % 3 === 0 ? 'rgba(0, 240, 255, 0.6)' : 
                                       i % 3 === 1 ? 'rgba(255, 140, 0, 0.6)' : 
                                       'rgba(34, 197, 94, 0.6)'}`
                }}
                animate={{
                  opacity: stage === 'scanning' ? [0.4, 1, 0.4] : 
                          stage === 'channeling' ? [0.6, 1, 0.3, 1] : [0.5, 0.9, 0.5],
                  scaleY: stage === 'scanning' ? [0.8, 1.4, 0.8] : 
                         stage === 'channeling' ? [1, 1.6, 0.6, 1.2] : [0.9, 1.2, 0.9]
                }}
                transition={{
                  duration: stage === 'channeling' ? 0.4 : 0.8,
                  delay: i * 0.1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Retro TV Screen Flicker */}
        <motion.div
          className="absolute inset-0 bg-cyan-400 mix-blend-screen pointer-events-none"
          animate={{
            opacity: stage === 'glitching' ? [0, 0.15, 0, 0.08, 0, 0.12, 0] :
                     stage === 'channeling' ? [0, 0.05, 0] : 0
          }}
          transition={{
            duration: stage === 'glitching' ? 0.05 : 0.3,
            repeat: stage === 'glitching' ? 4 : stage === 'channeling' ? 2 : 0
          }}
        />

        {/* Enhanced Hologram Frame with corner details */}
        <div className="absolute inset-6 border border-cyan-400/40 rounded-lg pointer-events-none">
          {/* Enhanced Corner Indicators */}
          {[
            { position: 'top-2 left-2', rotation: 0 },
            { position: 'top-2 right-2', rotation: 90 },
            { position: 'bottom-2 right-2', rotation: 180 },
            { position: 'bottom-2 left-2', rotation: 270 }
          ].map((corner, i) => (
            <motion.div
              key={`corner-${i}`}
              className={`absolute ${corner.position} w-8 h-8`}
              style={{
                transform: `rotate(${corner.rotation}deg)`
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: stage === 'scanning' || stage === 'stabilizing' ? [0, 1, 0.7] : 
                        stage === 'channeling' ? 0.8 : 0,
                scale: stage === 'scanning' ? [0, 1.3, 1] : 
                      stage === 'stabilizing' ? [1, 1.1, 1] : 0
              }}
              transition={{
                duration: 0.5,
                delay: i * 0.1
              }}
            >
              <div 
                className="w-full h-full border-t-2 border-l-2 border-cyan-400 relative"
                style={{
                  boxShadow: '0 0 12px rgba(0, 240, 255, 0.6)'
                }}
              >
                {/* Corner detail lines */}
                <div className="absolute top-2 left-0 w-4 h-0.5 bg-cyan-400" 
                     style={{ boxShadow: '0 0 4px rgba(0, 240, 255, 0.8)' }} />
                <div className="absolute top-0 left-2 w-0.5 h-4 bg-cyan-400" 
                     style={{ boxShadow: '0 0 4px rgba(0, 240, 255, 0.8)' }} />
              </div>
            </motion.div>
          ))}

          {/* Status indicators */}
          <motion.div
            className="absolute bottom-4 left-4 flex space-x-2"
            animate={{
              opacity: stage === 'stabilizing' ? 1 : 0
            }}
          >
            {['SIGNAL', 'LOCKED', 'READY'].map((status, i) => (
              <motion.div
                key={status}
                className="text-xs font-mono text-green-400 bg-black/50 px-2 py-1 rounded"
                style={{
                  textShadow: '0 0 6px rgba(34, 197, 94, 0.8)'
                }}
                animate={{
                  opacity: [0, 1],
                  scale: [0.8, 1]
                }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.3
                }}
              >
                {status}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Background Darkening with retro fade */}
        <motion.div
          className="absolute inset-0 bg-black pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{
            opacity: stage === 'initializing' ? 0.2 :
                     stage === 'scanning' ? 0.4 : 
                     stage === 'channeling' ? 0.5 :
                     stage === 'glitching' ? 0.6 :
                     stage === 'stabilizing' ? 0.3 : 0
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

// Add PropTypes validation
HologramTransition.propTypes = {
  isActive: PropTypes.bool,
  onComplete: PropTypes.func,
  direction: PropTypes.oneOf(['forward', 'backward'])
};

export default HologramTransition;