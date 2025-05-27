import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, ShoppingBag, Gamepad2, Book, Bot, MessageSquare, Twitter, Gem } from 'lucide-react';

const Sidebar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  
  const navItems = [
    { icon: <User size={24} />, text: 'Profile', path: '/profile' },
    { icon: <Gem size={24} />, text: 'NFT', path: '/nft' },
    { icon: <ShoppingBag size={24} />, text: 'Marketplace', path: '/marketplace' },
    { icon: <Gamepad2 size={24} />, text: 'Gaming', path: '/gaming' },
    { icon: <Book size={24} />, text: 'Story', path: '/story' },
    { icon: <Bot size={24} />, text: 'AI Assistant', path: '/chatbot' },
  ];

  const socialIcons = [
    { icon: <MessageSquare size={22} className="rotate-180" />, link: '#', label: 'Telegram' },
    { icon: <Twitter size={22} />, link: '#', label: 'X (Twitter)' },
    { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor" />
        <path d="M12 9C10.9 9 10 9.9 10 11V15C10 16.1 10.9 17 12 17C13.1 17 14 16.1 14 15V11C14 9.9 13.1 9 12 9Z" fill="currentColor" />
        <path d="M12 7C12.55 7 13 6.55 13 6C13 5.45 12.55 5 12 5C11.45 5 11 5.45 11 6C11 6.55 11.45 7 12 7Z" fill="currentColor" />
      </svg>, link: '#', label: 'Coingecko' },
  ];

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
          alt="Cryptomeda Logo" 
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
          <NavLink 
            key={index} 
            to={item.path}
            className={({ isActive }) => 
              `sidebar-link relative overflow-hidden group ${isActive ? 'active' : ''}`
            }
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {hoveredItem === index && (
              <motion.div 
                className="absolute inset-0 bg-cosmic-purple/10 -z-10"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {item.icon}
              <motion.div 
                className={`absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-meda-gold`}
                initial={{ scale: 0 }}
                animate={{ scale: hoveredItem === index ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
            <span className="ml-4 text-xl font-medium group-hover:text-meda-gold transition-colors">
              {item.text}
            </span>
          </NavLink>
        ))}
      </nav>
      
      {/* Social Media Icons with hover animations */}
      <div className="border-t border-cosmic-purple/30 pt-5 mt-auto mb-8 px-4">
        <div className="flex justify-around">
          {socialIcons.map((item, index) => (
            <motion.a 
              key={index} 
              href={item.link} 
              className="text-gray-400 hover:text-neon-cyan transition-colors p-2"
              title={item.label}
              whileHover={{ 
                scale: 1.2, 
                rotate: [0, -5, 5, -5, 0],
                color: '#00F0FF'
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