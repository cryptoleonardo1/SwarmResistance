import { motion } from 'framer-motion';
import { Clock, Rocket, Zap, Award } from 'lucide-react';

const LatestNews = () => {
  // News/campaign data
  const newsItems = [
    {
      icon: <Clock size={24} className="text-neon-cyan" />,
      title: "MEDA TOKEN LAUNCH COUNTDOWN",
      content: "The next evolution of our ecosystem token arrives in 90 days. Prepare your strategies for the fair launch where 100% of tokens go to the community.",
      category: "TOKEN",
      bgImage: "linear-gradient(to right, rgba(28, 19, 58, 0.8), rgba(18, 13, 38, 0.9))",
      accentColor: "border-neon-cyan"
    },
    {
      icon: <Rocket size={24} className="text-nebula-pink" />,
      title: "LAND EXPANSION: CYGNUS SECTOR",
      content: "Rich with Meda Gas, the newly discovered Cygnus sector opens for conquest next week. Scout reports indicate high resource potential but dangerous resistance.",
      category: "EXPANSION",
      bgImage: "linear-gradient(to right, rgba(28, 19, 58, 0.8), rgba(18, 13, 38, 0.9))",
      accentColor: "border-nebula-pink"
    },
    {
      icon: <Award size={24} className="text-meda-gold" />,
      title: "HERO FUSION EVENT RESULTS",
      content: "The community fused over 10,000 heroes in our latest event, creating 650 rare and 120 legendary new combatants. View the gallery of top creations.",
      category: "EVENT",
      bgImage: "linear-gradient(to right, rgba(28, 19, 58, 0.8), rgba(18, 13, 38, 0.9))",
      accentColor: "border-meda-gold"
    },
    {
      icon: <Zap size={24} className="text-energy-green" />,
      title: "MEDA SHOOTER TOURNAMENT",
      content: "The first official Meda Shooter tournament begins in 3 days, with a prize pool of 50,000 Meda Gas and exclusive limited-edition weapon NFTs.",
      category: "TOURNAMENT",
      bgImage: "linear-gradient(to right, rgba(28, 19, 58, 0.8), rgba(18, 13, 38, 0.9))",
      accentColor: "border-energy-green"
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
    <section className="py-16 relative">
      {/* Section title */}
      <div className="container mx-auto px-4 mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold cyber-heading mb-4">
          Universe Updates
        </h2>
        <div className="w-24 h-1 bg-nebula-pink mx-auto mb-8"></div>
        <p className="max-w-2xl mx-auto text-gray-300">
          Stay informed about the latest events, expansions, and opportunities in the Cryptomeda universe
        </p>
      </div>

      {/* News grid */}
      <motion.div 
        className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {newsItems.map((item, index) => (
          <motion.div
            key={index}
            className={`panel hover:border-t-4 ${item.accentColor} transition-all duration-300`}
            variants={itemVariants}
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
              {item.icon}
            </div>
            
            {/* Title */}
            <h3 className="text-xl font-bold mb-3 text-stellar-white">
              {item.title}
            </h3>
            
            {/* Content */}
            <p className="text-gray-300 mb-4 text-sm">
              {item.content}
            </p>
            
            {/* Action button */}
            <button className="text-sm font-semibold flex items-center space-x-2 text-gray-300 hover:text-neon-cyan transition-colors">
              <span>Read More</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        ))}
      </motion.div>

      {/* View all button */}
      <div className="text-center mt-12">
        <button className="btn-secondary mx-auto">
          View All Updates
        </button>
      </div>
    </section>
  );
};

export default LatestNews;