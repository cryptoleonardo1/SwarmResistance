import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sword, Shield, Users, Target, Flame, Crown, Zap, BookOpen, Sparkles } from 'lucide-react';

const StoryPage = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Scroll to top when component mounts (when Lore is clicked)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Enhanced parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const starsY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const particlesY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  
  // Story chapters data - Updated with new lore
  const storyChapters = [
    {
      icon: <Flame size={32} className="text-phoenix-primary" />,
      title: "The Last Days of the Old War",
      subtitle: "Year Zero - The Genesis Catastrophe",
      content: "For three millennia, the crimson banners of the Renegade Coalition and azure standards of the Goliath Empire painted the stars with blood. Their eternal conflict over Cryptomeda's precious Meda energy had become the galaxy's heartbeat—predictable, brutal, and somehow balanced.\n\nMeda energy flowed through reality's fabric like liquid starlight, harvestable by heroes whose souls resonated with its frequency. When crystallized into TECH tokens, it powered everything from starship engines to quantum computers. The mining worlds of Xerion Prime hummed with extractors pulling this mystical force from planetary ley lines.\n\nBut Dr. Chadwick Newtonian's obsession with immortality would shatter this ancient order forever.",
      gradient: "from-phoenix-primary/20 via-phoenix-light/10 to-transparent",
      borderColor: "border-phoenix-primary/30",
      accentColor: "text-phoenix-primary"
    },
    {
      icon: <Target size={32} className="text-resistance-light" />,
      title: "The Breach",
      subtitle: "Reality Tears Open",
      content: "In his hidden laboratory on Thanatos VII, the being once known as Dr. Chadwick Newtonian—now Zombie Chad after his horrific transformation—made his final catastrophic breakthrough. The dimensional stabilizers failed at 3:47 galactic standard time. Reality tore open like fabric.\n\nChad's reckless manipulation of pure Meda energy created a beacon—a screaming wound in the universe that called across dimensions to something ancient and hungry. The first Swarm scout emerged not with fanfare, but with a whisper. A chitinous form pulsing with corrupted Meda energy that hurt to look at directly.\n\nWithin hours, the whisper became a scream as The Swarm revealed its true nature.",
      gradient: "from-resistance-light/20 via-resistance-glow/10 to-transparent",
      borderColor: "border-resistance-light/30",
      accentColor: "text-resistance-light"
    },
    {
      icon: <Shield size={32} className="text-energy-purple" />,
      title: "The Swarm Dominion",
      subtitle: "Ancient Hunger Awakens",
      content: "The Swarm was ancient beyond measure—a collective consciousness that had devoured galaxies when Cryptomeda was still stellar nursery. They possessed a terrifying ability: absorbing and corrupting Meda energy, turning humanity's greatest strength into their weapon.\n\nHeroes who had mastered Meda manipulation found their powers turned against them. The mystical energy that once flowed like liquid starlight became poison. Worse, the Swarm could metabolize TECH tokens directly, converting crystallized Meda into bio-mechanical constructs of unimaginable power.\n\nXerion Prime fell silent first, its mining facility converted into something alien—a pulsing organic structure radiating corrupted energy so powerfully that rescue ships suffered immediate system failures.",
      gradient: "from-energy-purple/20 via-cosmic-purple/10 to-transparent",
      borderColor: "border-energy-purple/30",
      accentColor: "text-energy-purple"
    },
    {
      icon: <Users size={32} className="text-success-green" />,
      title: "The Impossible Alliance",
      subtitle: "Enemies Become Family",
      content: "Captain Avalanche of the Goliath Elite Guard and Crypto Queen of the Renegade Shadow Fleet had spent five years trying to kill each other. Their personal saga of hatred had added verses to the eternal war.\n\nNow they stood back-to-back in Haven Station's ruins, their Meda energy flickering as Swarm bio-warriors closed in. For the first time in three thousand years, ancient enemies fought as allies, their combined tactics creating something neither could achieve alone.\n\n'The old war is over. The real war begins now,' declared Admiral Link and the legendary Commander, broadcasting simultaneously from hidden bases. 'United, our Meda flows in harmony. Together, we become something they cannot consume.'",
      gradient: "from-success-green/20 via-energy-green/10 to-transparent",
      borderColor: "border-success-green/30",
      accentColor: "text-success-green"
    },
    {
      icon: <Sparkles size={32} className="text-meda-gold" />,
      title: "Phoenix Essence Discovery",
      subtitle: "Hope from Corruption",
      content: "In the desperate first months, as the Swarm consumed world after world, the Resistance made a discovery that changed everything. When Swarm bio-constructs were destroyed, the corrupted Meda energy didn't dissipate—it crystallized into something new.\n\nThese formations, called Phoenix Essence, glowed with pure golden light containing not just energy, but hope itself. Unlike TECH tokens that the Swarm could corrupt, Phoenix Essence actively resisted Swarm influence. It could purify corrupted Meda flows, heal damaged technology, and enhance heroes' abilities beyond previous limits.\n\n'The universe itself is fighting back,' reported Master CZ. 'Every victory doesn't just deny them resources—we reclaim something pure from their corruption.'",
      gradient: "from-meda-gold/20 via-phoenix-light/10 to-transparent",
      borderColor: "border-meda-gold/30",
      accentColor: "text-meda-gold"
    },
    {
      icon: <Crown size={32} className="text-cosmic-purple" />,
      title: "The Dark Millennia",
      subtitle: "One Thousand Years of Resistance",
      content: "The great heroes are legend now—Commander, Atom, Captain Avalanche, Floki—their names carved into memorial walls throughout the galaxy. The Swarm evolved into a galactic empire with machine efficiency and living adaptability.\n\nYet humanity endures in hidden sanctuaries carved from asteroid fields and hollow worlds. New Haven houses a million souls in converted mining tunnels. Here, children learn ancient stories while engineers maintain fusion reactors by candlelight. Warriors train with weapons that are equal parts technology and art.\n\nMost precious are the Hero Artifacts—crystallized fragments of legendary warriors' souls containing their tactical knowledge, Meda mastery, and battle memories.",
      gradient: "from-cosmic-purple/20 via-nebula-pink/10 to-transparent",
      borderColor: "border-cosmic-purple/30",
      accentColor: "text-cosmic-purple"
    },
    {
      icon: <Zap size={32} className="text-neon-cyan" />,
      title: "The AI Commander",
      subtitle: "Keeper of All Knowledge",
      content: "In sanctuary depths stands the AI Commander—not merely a computer, but a living repository of everything humanity has learned. Born from desperation, it absorbs memories from Hero Artifacts, combines tactical manuals, scientific discoveries, and battle lessons from the thousand-year war.\n\nWhen young Guardians approach its shimmering holographic interface, they commune with their species' collective wisdom. The AI can teach rookie pilots Elon's maneuvers, guide engineers through Master CZ's weapon designs, offer Admiral Link's strategic insights.\n\nThe AI Commander speaks with voices of heroes past, but dreams of heroes yet to come.",
      gradient: "from-neon-cyan/20 via-resistance-glow/10 to-transparent",
      borderColor: "border-neon-cyan/30",
      accentColor: "text-neon-cyan"
    },
    {
      icon: <BookOpen size={32} className="text-warning-orange" />,
      title: "The Guardian's Creed",
      subtitle: "Unity Forged in Fire",
      content: "Over centuries, survivors developed something unprecedented—a unified culture born from necessity. The Guardian's Creed merges Renegade cunning with Goliath discipline into something greater.\n\nEvery child learns to survive in vacuum and die well if necessary. Every adult knows their life belongs to humanity's future. Ancient heroes are remembered not as Renegade or Goliath, but as First Guardians who showed enemies could become family.\n\n'We are one people, forged from two. Unity is our strength, division our death. From corruption we forge purity. In darkness we are the light. We never kneel, we never yield. The Phoenix rises, as do we.'",
      gradient: "from-warning-orange/20 via-phoenix-primary/10 to-transparent",
      borderColor: "border-warning-orange/30",
      accentColor: "text-warning-orange"
    },
    {
      icon: <Sword size={32} className="text-phoenix-primary" />,
      title: "The New Hope",
      subtitle: "Your Legend Begins",
      content: "As the millennium of darkness draws to a close, a new generation emerges. They carry genetic legacies of ancient heroes, pilot ships blending Renegade innovation with Goliath engineering, fight with Phoenix Essence weapons guided by Hero Artifact wisdom.\n\nLong-range sensors detect impossible signals: Phoenix Essence from dead Cryptomeda core worlds. Ancient defense systems powered by crystallized Meda are awakening. Hidden caches of Hero Artifacts emerge—entire vaults containing civilizations' memories.\n\nThe Swarm believes itself eternal, but has forgotten humans are most dangerous when they have everything to fight for. Every Phoenix Essence crystal holds memory of what was stolen and promise of what can be reclaimed.\n\nWelcome to the Resistance. Your legend begins now.",
      gradient: "from-phoenix-primary/20 via-meda-gold/15 to-phoenix-light/5",
      borderColor: "border-phoenix-primary/40",
      accentColor: "text-phoenix-primary"
    }
  ];

  // Enhanced floating particles
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    delay: i * 0.3,
    duration: 12 + Math.random() * 6,
    size: 1.5 + Math.random() * 2.5,
    left: Math.random() * 100,
    color: i % 4 === 0 ? "#FF8C00" : i % 4 === 1 ? "#60A5FA" : i % 4 === 2 ? "#8B5CF6" : "#22C55E"
  }));

  // Phoenix fire particles
  const fireParticles = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    delay: i * 1.2,
    duration: 6 + Math.random() * 3,
    left: 10 + Math.random() * 80,
  }));

  return (
    <div className="full-screen-section relative overflow-hidden bg-void-primary">
      {/* Enhanced background layers */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ y: backgroundY }}
      >
        {/* Starfield background */}
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

      {/* Enhanced floating particles */}
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
              boxShadow: `0 0 ${particle.size * 6}px ${particle.color}`,
            }}
            animate={{
              y: ['120vh', '-10vh'],
              x: [0, Math.sin(particle.id * 0.5) * 150],
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
        
        {/* Phoenix fire particles */}
        {fireParticles.map(particle => (
          <motion.div
            key={`fire-${particle.id}`}
            className="absolute fire-particle"
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

      {/* Main content */}
      <div className="relative z-10 min-h-screen w-full pt-16 md:pl-64">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
          
          {/* Title and subtitle section */}
          <motion.div 
            className="text-center mb-6 pt-8"
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
              The Epic Chronicles of Cryptomeda
            </motion.h2>
            
            <motion.p 
              className="mt-2 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-phoenix-light/80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              From the fall of ancient empires to the rise of the Resistance—witness the thousand-year saga 
              that transformed sworn enemies into humanity's last hope against extinction.
            </motion.p>
          </motion.div>

          {/* Main content area - centered */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Story chapters */}
            <motion.div 
              className="space-y-12 max-w-6xl mx-auto relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
            {storyChapters.map((chapter, index) => (
              <motion.article
                key={index}
                className={`relative rounded-xl overflow-hidden glass-void border ${chapter.borderColor} group`}
                initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ 
                  y: -8,
                  boxShadow: `0 20px 60px -10px ${chapter.borderColor.replace('border-', '').replace('/30', '')}40`
                }}
              >
                {/* Chapter background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${chapter.gradient} opacity-50 group-hover:opacity-70 transition-opacity duration-500`} />
                
                <div className="relative p-8 md:p-10">
                  {/* Chapter header */}
                  <div className="flex flex-col md:flex-row md:items-center mb-8">
                    <div className="flex items-center mb-4 md:mb-0 md:mr-6">
                      <div className="w-16 h-16 flex items-center justify-center glass-phoenix rounded-xl mr-4 animate-pulse-phoenix">
                        {chapter.icon}
                      </div>
                      <div className="text-xs md:text-sm text-gray-400 font-mono">
                        Chapter {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h2 className={`text-2xl md:text-3xl font-bold ${chapter.accentColor} mb-2 font-orbitron`}>
                        {chapter.title}
                      </h2>
                      <h3 className="text-lg md:text-xl text-gray-300 font-medium mb-4">
                        {chapter.subtitle}
                      </h3>
                      <motion.div 
                        className={`h-1 bg-gradient-to-r from-${chapter.accentColor.replace('text-', '')} to-transparent rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: "150px" }}
                        transition={{ duration: 1.2, delay: 0.3 + index * 0.1 }}
                      />
                    </div>
                  </div>
                  
                  {/* Chapter content */}
                  <div className="space-y-6">
                    {chapter.content.split('\n\n').map((paragraph, pIndex) => (
                      <motion.p
                        key={pIndex}
                        className="text-gray-300 leading-relaxed text-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 + pIndex * 0.1 }}
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>
                </div>

                {/* Hover effect overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(120deg, transparent 30%, ${chapter.borderColor.replace('border-', '').replace('/30', '')}20, transparent 70%)`
                  }}
                />
              </motion.article>
            ))}
          </motion.div>

            {/* Enhanced call to action section */}
            <motion.div
              className="mt-20 text-center relative z-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="glass-phoenix rounded-2xl p-12 md:p-16 relative overflow-hidden">
                {/* Background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-phoenix-primary/10 via-resistance-light/5 to-energy-purple/10" />
                
                <div className="relative">
                  <motion.h2 
                    className="text-4xl md:text-6xl font-bold text-stellar-white mb-6 font-orbitron"
                    animate={{ 
                      textShadow: [
                        "0 0 30px rgba(255, 140, 0, 0.7)",
                        "0 0 60px rgba(255, 140, 0, 0.9)",
                        "0 0 30px rgba(255, 140, 0, 0.7)"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Join the Resistance
                    <motion.div 
                      className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-phoenix-primary to-transparent rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 2 }}
                    />
                  </motion.h2>
                  
                  <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                    The galaxy needs new heroes. Will you answer the call to unite former enemies, 
                    forge Phoenix Essence weapons, and reclaim what the Swarm has stolen?
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <motion.button
                      className="btn-phoenix-primary text-lg font-bold px-10 py-4 relative overflow-hidden group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10">Begin Your Legend</span>
                    </motion.button>
                    
                    <motion.button
                      className="btn-resistance-secondary text-lg font-bold px-10 py-4 relative overflow-hidden group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10">Explore the Chronicles</span>
                    </motion.button>
                  </div>

                  <motion.div 
                    className="mt-12 flex justify-center space-x-8 text-sm text-gray-400"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-success-green animate-pulse" />
                      <span>Guardians Active: 1,000,000+</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-phoenix-primary animate-pulse" />
                      <span>Worlds Liberated: 247</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-resistance-light animate-pulse" />
                      <span>Phoenix Essence: Rising</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

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
    </div>
  );
};

export default StoryPage;