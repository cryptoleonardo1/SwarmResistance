import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Menu, ChevronDown, LogOut, User, Settings, Copy, Check } from 'lucide-react';
import { useWeb3Auth } from '../../contexts/Web3AuthContext';

// Section navigation items (moved outside component to avoid re-creation)
const sectionItems = [
  { id: 'home', name: 'Home', href: '#home' },
  { id: 'ecosystem', name: 'Ecosystem', href: '#ecosystem' },
  { id: 'metrics', name: 'Metrics', href: '#metrics' },
 // { id: 'news', name: 'News', href: '#news' },
  { id: 'join', name: 'Join Us', href: '#join' },
];

const TopBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [copied, setCopied] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Web3Auth hooks
  const { 
    isConnected, 
    user, 
    walletAddress,
    userProfile, 
    login, 
    logout, 
    isLoading,
    getBalance 
  } = useWeb3Auth();
  
  const [balance, setBalance] = useState("0");

  // Fetch balance when wallet is connected
  useEffect(() => {
    const fetchBalance = async () => {
      if (isConnected) {
        const bal = await getBalance();
        setBalance(bal);
      }
    };
    fetchBalance();
  }, [isConnected, getBalance]);

  // Format wallet address for display
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Copy wallet address to clipboard
  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Get user display name
  const getUserDisplayName = () => {
    if (userProfile?.nickname) return userProfile.nickname;
    if (user?.name) return user.name;
    if (user?.email) return user.email.split('@')[0];
    return 'Explorer';
  };

  // Get user avatar
  const getUserAvatar = () => {
    if (userProfile?.avatar && userProfile.avatar !== '/atom.png') return userProfile.avatar;
    if (user?.profileImage) return user.profileImage;
    return '/atom.png'; // Default avatar
  };

  // Get user rank with color
  const getUserRank = () => {
    if (userProfile?.rank) {
      return userProfile.rank;
    }
    return 'Explorer';
  };

  // Handle section scrolling
  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname !== '/') return;
      
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
  }, [location.pathname]);

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
          
          {/* Logo */}
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
        
        {/* Center Section - Navigation (Desktop) - Centered accounting for sidebar */}
        <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2 ml-32">
          {sectionItems.map((item) => (
            <motion.a
              key={item.id}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
              className={`relative text-xl font-medium transition-colors duration-300 ${
                activeSection === item.id && location.pathname === '/' 
                  ? 'text-meda-gold' 
                  : 'text-gray-400 hover:text-neon-cyan'
              }`}
              whileHover={{ y: -2 }}
            >
              {item.name}
              {activeSection === item.id && location.pathname === '/' && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-meda-gold"
                  layoutId="activeSection"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </motion.a>
          ))}
        </nav>
        
        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Wallet Connection - Simplified when connected */}
          {isConnected ? (
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
                    src={getUserAvatar()} 
                    alt="Avatar" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                <div className="hidden lg:flex items-center">
                  <span className="text-lg text-stellar-white mr-2">{getUserDisplayName()}</span>
                  <ChevronDown size={14} className="text-gray-400" />
                </div>
              </motion.button>
              
              {/* Dropdown Menu - Now includes wallet details */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div 
                    className="absolute right-0 mt-2 w-64 bg-void-black/90 backdrop-blur-md border border-cosmic-purple/50 rounded-lg shadow-lg py-2 z-50"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-cosmic-purple/30">
                      <p className="text-sm text-gray-400">Signed in as</p>
                      <p className="text-sm text-stellar-white font-medium truncate">
                        {user?.email || formatAddress(walletAddress)}
                      </p>
                      
                      {/* Rank */}
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-gray-400">Rank:</span>
                        <span className="text-sm font-medium text-meda-gold">{getUserRank()}</span>
                      </div>
                      
                      {/* Balance */}
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-xs text-gray-400">Balance:</span>
                        <div className="flex items-center gap-1">
                          <Wallet size={12} className="text-neon-cyan" />
                          <span className="text-xs text-stellar-white">
                            {parseFloat(balance).toFixed(4)} MATIC
                          </span>
                        </div>
                      </div>
                      
                      {/* Wallet Address */}
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-xs text-gray-400">Address:</span>
                        <button
                          onClick={copyAddress}
                          className="text-xs text-stellar-white hover:text-neon-cyan transition-colors flex items-center gap-1"
                        >
                          {formatAddress(walletAddress)}
                          {copied ? (
                            <Check size={10} className="text-energy-green" />
                          ) : (
                            <Copy size={10} />
                          )}
                        </button>
                      </div>
                      
                      {/* Meda Gas */}
                      {userProfile && (
                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-xs text-gray-400">Meda Gas:</span>
                          <span className="text-xs text-meda-gold font-medium">{userProfile.medaGas.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                    
                    <Link 
                      to="/profile" 
                      className="flex items-center gap-2 px-4 py-2 text-lg hover:bg-space-blue/50 hover:text-neon-cyan transition-all"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <User size={16} />
                      Profile
                    </Link>
                    <Link 
                      to="/settings" 
                      className="flex items-center gap-2 px-4 py-2 text-lg hover:bg-space-blue/50 hover:text-neon-cyan transition-all"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <Settings size={16} />
                      Settings
                    </Link>
                    <button 
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-lg hover:bg-space-blue/50 hover:text-nebula-pink transition-all"
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                      }}
                    >
                      <LogOut size={16} />
                      Disconnect
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.button 
              onClick={login}
              disabled={isLoading}
              className="hidden sm:flex items-center space-x-2 bg-space-blue/40 backdrop-blur-sm rounded-full py-1.5 px-4 border border-cosmic-purple/30 group disabled:opacity-50"
              whileHover={{ 
                scale: isLoading ? 1 : 1.05,
                boxShadow: isLoading ? undefined : "0 0 15px rgba(74,43,159,0.3)"
              }}
              whileTap={{ scale: isLoading ? 1 : 0.95 }}
            >
              <Wallet size={16} className="text-gray-400 group-hover:text-neon-cyan transition-colors" />
              <span className="text-lg group-hover:text-neon-cyan transition-colors">
                {isLoading ? 'Loading...' : 'Connect Wallet'}
              </span>
            </motion.button>
          )}
        </div>
      </div>
      
      {/* Mobile Section Navigation */}
      {mobileMenuOpen && (
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
                activeSection === item.id && location.pathname === '/' 
                  ? 'text-neon-cyan bg-space-blue/30' 
                  : 'text-gray-400'
              }`}
            >
              {item.name}
            </a>
          ))}
          
          {/* Mobile Wallet Connection */}
          <div className="px-4 py-2 border-t border-cosmic-purple/30">
            {isConnected ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wallet size={16} className="text-neon-cyan" />
                  <span className="text-sm">{formatAddress(walletAddress)}</span>
                </div>
                <button
                  onClick={logout}
                  className="text-sm text-nebula-pink"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={login}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-2 bg-space-blue/40 rounded-lg"
              >
                <Wallet size={16} />
                {isLoading ? 'Loading...' : 'Connect Wallet'}
              </button>
            )}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default TopBar;