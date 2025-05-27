import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sword, Shield, Users, Target, Flame } from 'lucide-react';
import SectionWrapper from '../components/layout/SectionWrapper';

const StoryPage = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const starsY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  
  // Story chapters data
  const storyChapters = [
    {
      icon: <Flame size={32} className="text-nebula-pink" />,
      title: "The Genesis Catastrophe",
      content: "For millennia, the factions of Renegade and Goliath waged endless wars across the Cryptomeda galaxy, their hatred burning as fiercely as the stars themselves. Both sides coveted the precious Meda energy that flowed through ancient crystalline veins buried deep within contested worlds. These cosmic battles seemed eternal—until everything changed in a single, catastrophic moment.\n\nDr. Chadwick Newtonian's forbidden experiments had unleashed something far worse than his own undead transformation. In his obsessive quest for immortality, the mad scientist had torn holes in the fabric of reality itself. Through these dimensional rifts came The Swarm—an ancient, ravenous insectoid intelligence that had consumed entire galaxies in distant corners of the universe.",
      gradient: "from-nebula-pink/20 to-transparent",
      borderColor: "border-nebula-pink/30"
    },
    {
      icon: <Target size={32} className="text-energy-green" />,
      title: "The Swarm Invasion",
      content: "The first Swarm scouts emerged silently from the void, their chitinous forms pulsing with stolen Meda energy. Unlike the warring factions, the Swarm didn't seek to control territory—they sought to devour it entirely. Every world they touched became a breeding ground, every fallen warrior became biomass for their ever-growing hive mind.\n\nWithin months, the unthinkable happened. The Swarm's adaptive intelligence allowed them to harness both Renegade cunning and Goliath discipline, turning the factions' own strengths against them. Mining facilities fell silent. Communication networks went dark. Entire sectors vanished from star maps, replaced by writhing hive structures that pulsed with corrupted Meda energy.",
      gradient: "from-energy-green/20 to-transparent",
      borderColor: "border-energy-green/30"
    },
    {
      icon: <Shield size={32} className="text-neon-cyan" />,
      title: "The Impossible Alliance",
      content: "Sergeant Gronk of the Renegades and Commander Viper of the Goliath Marines found themselves trapped on the same dying world, their forces decimated by Swarm bio-warriors. For the first time in a thousand years, ancient enemies stood back-to-back, fighting for their very survival.\n\n\"The Swarm doesn't care about our uniforms,\" Viper declared as acidic bio-plasma melted through her squad's defenses. \"They see us all as the same thing—prey.\"\n\nThat moment of shared desperation became the spark of something unprecedented: The Resistance. Word spread through underground channels and encrypted Goliath communications alike. The choice was simple—unite or become extinct.",
      gradient: "from-neon-cyan/20 to-transparent",
      borderColor: "border-neon-cyan/30"
    },
    {
      icon: <Users size={32} className="text-meda-gold" />,
      title: "The Birth of Swarm Resistance",
      content: "Now, scattered cells of Renegade pirates and Goliath marines work together in ways their ancestors never imagined. Former enemies share supplies, tactics, and even trust as they mount desperate missions to reclaim lost worlds. Heroes who once fought each other now combine their unique abilities—Renegade resourcefulness merged with Goliath precision—to strike at the heart of Swarm strongholds.\n\nThe resistance operates from hidden bases carved into asteroid fields and forgotten mining stations. Here, engineers who once built weapons to kill each other now forge new technologies to pierce Swarm bio-armor. Pilots who dogfought across star systems now fly in mixed squadrons, their ships painted with both crimson Renegade stripes and azure Goliath stars.",
      gradient: "from-meda-gold/20 to-transparent",
      borderColor: "border-meda-gold/30"
    },
    {
      icon: <Sword size={32} className="text-cosmic-purple" />,
      title: "The New War Begins",
      content: "Every hero recruited, every land reclaimed, every weapon forged brings hope back to a galaxy on the brink of extinction. The Swarm's hive mind may be vast and alien, but it has made one critical error—it has given humanity something it never had before: a common enemy worth dying for.\n\nThe resistance needs YOU. Will you answer the call to forge an unlikely alliance and take back what the Swarm has stolen? The fate of Cryptomeda—and perhaps the entire universe—hangs in the balance.\n\nIn unity, there is strength. In resistance, there is hope.\n\nWelcome to Swarm Resistance—where former enemies become brothers-in-arms, and heroes are forged in the fires of impossible odds.",
      gradient: "from-cosmic-purple/20 to-transparent",
      borderColor: "border-cosmic-purple/30"
    }
  ];

  // Floating particles animation
  const particles = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    delay: i * 0.5,
    duration: 8 + Math.random() * 4,
    size: 2 + Math.random() * 3,
    left: Math.random() * 100,
    color: i % 3 === 0 ? "#FFB61E" : i % 3 === 1 ? "#00F0FF" : "#FF3E8A"
  }));

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background layers */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ y: backgroundY }}
      >
        {/* Starfield background */}
        <motion.div 
          className="absolute inset-0 w-full h-full opacity-30"
          style={{ 
            backgroundImage: 'url("/space-background.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            y: starsY
          }}
        />
        
        {/* Nebula overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-cosmic-purple/20 via-transparent to-space-blue/40" />
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.left}%`,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 4}px ${particle.color}`,
            }}
            animate={{
              y: ['100vh', '-100px'],
              x: [0, Math.sin(particle.id) * 100],
              opacity: [0, 0.8, 0.8, 0]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Main content with top padding for TopBar */}
      <div className="pt-16">
        <SectionWrapper
          ref={sectionRef}
          title="Swarm Resistance: The Fall and Rise of Cryptomeda"
          subtitle="The epic tale of former enemies united against extinction"
          className="relative z-10"
        >
          <div className="flex-1 flex flex-col justify-center py-12">
            {/* Story chapters */}
            <motion.div 
              className="space-y-8 max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {storyChapters.map((chapter, index) => (
                <motion.div
                  key={index}
                  className={`relative rounded-xl overflow-hidden backdrop-blur-md glassmorphism border ${chapter.borderColor}`}
                  initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ 
                    y: -5,
                    boxShadow: `0 10px 40px -10px ${chapter.borderColor.replace('border-', '').replace('/30', '')}60`
                  }}
                >
                  {/* Chapter background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${chapter.gradient} opacity-50`} />
                  
                  <div className="relative p-8">
                    {/* Chapter header */}
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 flex items-center justify-center bg-space-blue/60 rounded-lg mr-4 backdrop-blur-sm">
                        {chapter.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-stellar-white mb-1">
                          {chapter.title}
                        </h3>
                        <motion.div 
                          className="h-1 bg-meda-gold"
                          initial={{ width: 0 }}
                          whileInView={{ width: "100px" }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        />
                      </div>
                    </div>
                    
                    {/* Chapter content */}
                    <div className="space-y-4">
                      {chapter.content.split('\n\n').map((paragraph, pIndex) => (
                        <motion.p
                          key={pIndex}
                          className="text-gray-300 leading-relaxed text-lg"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.3 + pIndex * 0.1 }}
                        >
                          {paragraph}
                        </motion.p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Call to action section */}
            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative inline-block">
                <motion.h2 
                  className="text-4xl md:text-5xl font-bold text-stellar-white mb-4 relative"
                  animate={{ 
                    textShadow: [
                      "0 0 10px rgba(255, 182, 30, 0.5)",
                      "0 0 20px rgba(255, 182, 30, 0.8)",
                      "0 0 10px rgba(255, 182, 30, 0.5)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Join the Resistance
                  <motion.div 
                    className="absolute -bottom-2 left-0 h-1 bg-meda-gold"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1.5 }}
                  />
                </motion.h2>
              </div>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                The galaxy needs heroes. Will you answer the call to unite former enemies and reclaim what was lost?
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="btn-primary-glass px-8 py-4 text-lg font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Your Journey
                </motion.button>
                
                <motion.button
                  className="btn-secondary-glass px-8 py-4 text-lg font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore the Galaxy
                </motion.button>
              </div>
            </motion.div>
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
};

export default StoryPage;