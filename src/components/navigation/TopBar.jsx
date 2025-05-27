import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Menu, ChevronDown } from 'lucide-react';

const TopBar = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  // Sample user data
  const userData = {
    rank: 'Explorer',
    avatar: '/atom.png',
  };

  // Section navigation items
  const sectionItems = [
    { id: 'home', name: 'Home', href: '#home' },
    { id: 'ecosystem', name: 'Ecosystem', href: '#ecosystem' },
    { id: 'metrics', name: 'Metrics', href: '#metrics' },
    { id: 'news', name: 'News', href: '#news' },
    { id: 'join', name: 'Join Us', href: '#join' },
  ];

  // Handle section scrolling
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = sectionItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id)
      })).filter(item => item.element);

      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const connectWallet = () => {
    setWalletConnected(true);
  };

  // Only show section navigation on homepage
  const isHomePage = location.pathname === '/';

  return (
    <motion.header 
      className="fixed top-0 right-0 left-0 h-16 z-50 bg-void-black/80 backdrop-blur-md border-b border-cosmic-purple/30"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="h-full flex items-center justify-between px-4 md:px-8">
        {/* Left Section - Logo */}
        <div className="flex items-center">
          {/* Mobile Menu Button */}
          <motion.button 
            className="text-gray-400 hover:text-neon-cyan md:hidden mr-3"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Menu size={24} />
          </motion.button>
          
          {/* Logo - Always visible */}
          <Link to="/" className="flex items-center">
            <motion.img 
              src="/logo.png" 
              alt="Cryptomeda" 
              className="h-10 w-auto"
              whileHover={{ 
                scale: 1.05,
                filter: "drop-shadow(0 0 8px rgba(255,182,30,0.5))"
              }}
            />
          </Link>
        </div>
        
        {/* Center Section - Navigation (Desktop) */}
        {isHomePage && (
          <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {sectionItems.map((item) => (
              <motion.a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className={`relative text-xl font-medium transition-colors duration-300 ${
                  activeSection === item.id ? 'text-meda-gold' : 'text-gray-400 hover:text-neon-cyan'
                }`}
                whileHover={{ y: -2 }}
              >
                {item.name}
                {activeSection === item.id && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-meda-gold"
                    layoutId="activeSection"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}
          </nav>
        )}
        
        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Wallet Connection */}
          {walletConnected ? (
            <motion.div 
              className="hidden sm:flex items-center space-x-2 bg-space-blue/40 backdrop-blur-sm rounded-full py-1.5 px-4 border border-cosmic-purple/30"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 15px rgba(0,240,255,0.3)",
                borderColor: "rgba(0,240,255,0.5)"
              }}
            >
              <Wallet size={16} className="text-neon-cyan" />
              <span className="text-lg text-stellar-white">Connected</span>
            </motion.div>
          ) : (
            <motion.button 
              onClick={connectWallet}
              className="hidden sm:flex items-center space-x-2 bg-space-blue/40 backdrop-blur-sm rounded-full py-1.5 px-4 border border-cosmic-purple/30 group"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 15px rgba(74,43,159,0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Wallet size={16} className="text-gray-400 group-hover:text-neon-cyan transition-colors" />
              <span className="text-lg group-hover:text-neon-cyan transition-colors">Connect Wallet</span>
            </motion.button>
          )}
          
          {/* User Profile */}
          <div className="relative">
            <motion.button 
              className="flex items-center space-x-2 group"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="w-8 h-8 rounded-full border-2 border-cosmic-purple overflow-hidden"
                whileHover={{ 
                  borderColor: "rgba(0,240,255,0.7)",
                  boxShadow: "0 0 15px rgba(0,240,255,0.4)"
                }}
              >
                <img 
                  src={userData.avatar} 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              <div className="hidden lg:flex items-center">
                <span className="text-lg text-gray-400 mr-1">RANK:</span>
                <span className="text-lg text-stellar-white mr-2">{userData.rank}</span>
                <ChevronDown size={14} className="text-gray-400" />
              </div>
            </motion.button>
            
            {/* Dropdown Menu */}
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div 
                  className="absolute right-0 mt-2 w-48 bg-void-black/90 backdrop-blur-md border border-cosmic-purple/50 rounded-lg shadow-lg py-1 z-50"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-lg hover:bg-space-blue/50 hover:text-neon-cyan transition-all"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link 
                    to="/settings" 
                    className="block px-4 py-2 text-lg hover:bg-space-blue/50 hover:text-neon-cyan transition-all"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Settings
                  </Link>
                  <button 
                    className="block w-full text-left px-4 py-2 text-lg hover:bg-space-blue/50 hover:text-nebula-pink transition-all"
                    onClick={() => {
                      setWalletConnected(false);
                      setDropdownOpen(false);
                    }}
                  >
                    Disconnect
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* Mobile Section Navigation */}
      {isHomePage && mobileMenuOpen && (
        <motion.div
          className="md:hidden absolute top-16 left-0 right-0 bg-void-black/90 backdrop-blur-md border-b border-cosmic-purple/30 py-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {sectionItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
                setMobileMenuOpen(false);
              }}
              className={`block px-4 py-2 text-xl ${
                activeSection === item.id ? 'text-neon-cyan bg-space-blue/30' : 'text-gray-400'
              }`}
            >
              {item.name}
            </a>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
};

export default TopBar;