import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, ShoppingBag, Sword, Book, Bot, Gem } from 'lucide-react';

const Sidebar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Navigation items with routes - updated Gaming to Join Resistance
  const navItems = [
    { icon: <User size={24} />, text: 'Profile', path: '/profile' },
    { icon: <Sword size={24} />, text: 'Join Resistance', path: '/join-resistance' },
    { icon: <ShoppingBag size={24} />, text: 'Marketplace', path: '/marketplace' },
    { icon: <Gem size={24} />, text: 'Lore', path: '/story' },
    { icon: <Book size={24} />, text: 'Blog', path: '/blog' },
    { icon: <Bot size={24} />, text: 'AI Commander', path: '/chatbot' },
   
  ];

  // Social icons
  const socialIcons = [
    { 
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-.38.24-1.09.76-.98.7-1.96 1.99-2.07 2.04-.17.08-.49.05-.49.05s-.69-.23-.69-.23s-.43-.27-.43-.27s-.63-.39-.63-.39c.91-.59 2.66-1.7 2.66-1.7s.18-.14.35-.21c.16-.06.43-.12.43-.12s.18-.04.33-.04.30.04.30.04.12 0 .23.06c.11.05.24.15.24.15l3.5 2.4s.64.43.64 1.03z"/>
        </svg>
      ), 
      link: '#', 
      label: 'Telegram' 
    },
    { 
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.736-8.84L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ), 
      link: '#', 
      label: 'X (Twitter)' 
    },
  ];

  const handleNavClick = (path) => {
    navigate(path);
  };

  return (
    <motion.aside 
      className="sidebar fixed hidden md:flex md:flex-col bg-void-black/90 backdrop-blur-md border-r border-cosmic-purple/30 w-64 h-full z-40"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo with animation */}
      <motion.div 
        className="flex justify-center items-center h-16 border-b border-cosmic-purple/30"
        whileHover={{ 
          boxShadow: "0 5px 15px -5px rgba(0,240,255,0.3)",
          borderColor: "rgba(0,240,255,0.3)"
        }}
      >
        <motion.img 
          src="/logo.png" 
          alt="Swarm Resistance Logo" 
          className="w-36" 
          whileHover={{ 
            scale: 1.05,
            filter: "drop-shadow(0 0 8px rgba(255,182,30,0.5))"
          }}
        />
      </motion.div>
      
      {/* Navigation Links with hover effects */}
      <nav className="mt-5 px-2 flex-grow">
        {navItems.map((item, index) => (
          <div
            key={index} 
            className={`sidebar-link relative overflow-hidden group cursor-pointer rounded-lg hover:bg-meda-gold/10 transition-colors ${
              location.pathname === item.path ? 'bg-meda-gold/20 border-l-2 border-meda-gold' : ''
            }`}
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => handleNavClick(item.path)}
          >
            {hoveredItem === index && (
              <motion.div 
                className="absolute inset-0 bg-cosmic-purple/10 -z-10 rounded-lg"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
            <motion.div 
              className="relative flex items-center p-3"
              whileHover={{ 
                scale: 1.02
              }}
              transition={{ 
                duration: 0.2
              }}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.3,
                  rotate: [0, -3, 3, -3, 0]
                }}
                transition={{ 
                  duration: 0.5,
                  rotate: { duration: 0.5, ease: "easeInOut" }
                }}
              >
                {item.icon}
                <motion.div 
                  className={`absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-meda-gold`}
                  initial={{ scale: 0 }}
                  animate={{ scale: hoveredItem === index ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
              <span className={`ml-4 text-xl font-medium group-hover:text-meda-gold transition-colors ${
                location.pathname === item.path ? 'text-meda-gold' : 'text-gray-400'
              }`}>
                {item.text}
              </span>
            </motion.div>
          </div>
        ))}
      </nav>
      
      {/* Social Media Icons with hover animations */}
      <div className="border-t border-cosmic-purple/30 pt-6 mt-auto mb-8 px-4">
        <div className="flex justify-center space-x-8">
          {socialIcons.map((item, index) => (
            <motion.a 
              key={index} 
              href={item.link} 
              className="text-gray-400 hover:text-meda-gold transition-colors p-3 rounded-lg hover:bg-meda-gold/10"
              title={item.label}
              whileHover={{ 
                scale: 1.3, 
                rotate: [0, -5, 5, -5, 0],
                color: '#FFB61E'
              }}
              transition={{ 
                duration: 0.5,
                rotate: { duration: 0.5, ease: "easeInOut" }
              }}
            >
              {item.icon}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;