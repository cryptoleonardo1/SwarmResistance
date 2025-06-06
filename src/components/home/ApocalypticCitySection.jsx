import { motion } from 'framer-motion';

const ApocalypticCitySection = () => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Full-screen background image */}
      <div className="absolute inset-0 w-full h-full">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('/resistance2.png')",
          }}
        />
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Subtle gradient overlay for atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-t from-void-primary/60 via-transparent to-void-primary/30" />
      </div>

      {/* Animated particles for atmosphere */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              backgroundColor: i % 3 === 0 ? '#FF8C00' : i % 3 === 1 ? '#DC2626' : '#FFFFFF',
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
              y: [0, -50, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Section content with proper centering */}
      <div className="relative z-10 min-h-screen w-full pt-16 md:pl-64">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
          
          {/* Title and subtitle section */}
          <motion.div 
            className="text-center mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-orbitron font-bold text-center mb-3 text-phoenix-primary relative inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Join the Fight
            </motion.h2>
            
            <motion.p 
              className="mt-2 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-phoenix-light/80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              The resistance needs you. Step into the post-apocalyptic world and reclaim our future.
            </motion.p>
          </motion.div>

          {/* Main content area - centered */}
          <div className="flex-1 flex flex-col justify-center items-center">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {/* Featured content section */}
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                
                {/* Daily Rewards */}
                <motion.div
                  className="text-center p-6 rounded-lg backdrop-blur-md"
                  style={{
                    background: 'rgba(15, 15, 35, 0.6)',
                    border: '2px solid rgba(255, 140, 0, 0.3)',
                    boxShadow: '0 0 20px rgba(255, 140, 0, 0.2)'
                  }}
                  whileHover={{
                    y: -8,
                    boxShadow: '0 0 30px rgba(255, 140, 0, 0.4)'
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full"
                       style={{
                         background: 'radial-gradient(circle, rgba(255, 140, 0, 0.2) 0%, rgba(255, 140, 0, 0.1) 50%, transparent 100%)',
                         border: '1px solid rgba(255, 140, 0, 0.6)'
                       }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-phoenix-primary">
                      <path d="M12 2L13.09 8.26L19 9L13.09 9.74L12 16L10.91 9.74L5 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-orbitron font-bold text-phoenix-primary mb-2">
                    Daily Rewards
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Earn Phoenix Essence daily through missions and activities
                  </p>
                </motion.div>

                {/* NFT Utility */}
                <motion.div
                  className="text-center p-6 rounded-lg backdrop-blur-md"
                  style={{
                    background: 'rgba(15, 15, 35, 0.6)',
                    border: '2px solid rgba(59, 130, 246, 0.3)',
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)'
                  }}
                  whileHover={{
                    y: -8,
                    boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)'
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full"
                       style={{
                         background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)',
                         border: '1px solid rgba(59, 130, 246, 0.6)'
                       }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-resistance-light">
                      <path d="M21 16V8C21 5.79086 19.2091 4 17 4H7C4.79086 4 3 5.79086 3 8V16C3 18.2091 4.79086 20 7 20H17C19.2091 20 21 18.2091 21 16Z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M7 4V20" stroke="currentColor" strokeWidth="2"/>
                      <path d="M17 4V20" stroke="currentColor" strokeWidth="2"/>
                      <path d="M3 12H21" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-orbitron font-bold text-resistance-light mb-2">
                    NFT Utility
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Deploy your Hero and Weapon NFTs in strategic combat
                  </p>
                </motion.div>

                {/* Token Airdrop */}
                <motion.div
                  className="text-center p-6 rounded-lg backdrop-blur-md"
                  style={{
                    background: 'rgba(15, 15, 35, 0.6)',
                    border: '2px solid rgba(34, 197, 94, 0.3)',
                    boxShadow: '0 0 20px rgba(34, 197, 94, 0.2)'
                  }}
                  whileHover={{
                    y: -8,
                    boxShadow: '0 0 30px rgba(34, 197, 94, 0.4)'
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full"
                       style={{
                         background: 'radial-gradient(circle, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.1) 50%, transparent 100%)',
                         border: '1px solid rgba(34, 197, 94, 0.6)'
                       }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-energy-green">
                      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-orbitron font-bold text-energy-green mb-2">
                    Token Airdrop
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Prepare for future token airdrops through Guardian ranks
                  </p>
                </motion.div>
              </div>

              {/* Call to action */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                viewport={{ once: true }}
              >
                <motion.button 
                  className="btn-phoenix-primary text-xl px-12 py-6 font-orbitron font-bold"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 40px rgba(255, 140, 0, 0.6)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  ENTER THE RESISTANCE
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          {/* Footer section */}
          <motion.div 
            className="text-center py-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-phoenix-primary/60 text-sm font-orbitron">
              ©2024 Swarm Resistance
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ApocalypticCitySection;