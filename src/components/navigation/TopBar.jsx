import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Menu, ChevronDown, LogOut, User, Settings, Copy, Check } from 'lucide-react';
import { useWeb3Auth } from '../../contexts/Web3AuthContext';

// Updated section navigation items with new names
const sectionItems = [
  { id: 'home', name: 'Headquarters', href: '#home' },
  { id: 'ecosystem', name: 'Mission Briefing', href: '#ecosystem' },
  { id: 'metrics', name: 'Battle Status', href: '#metrics' },
  { id: 'join', name: 'Join the Fight', href: '#join' },
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
    return 'Guardian';
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

  // Handle section scrolling with warp gate effect - FIXED SCROLL OFFSET
  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          // Calculate offset accounting for the top bar height (80px) plus some padding
          const topBarHeight = 80;
          const elementPosition = element.offsetTop - topBarHeight;
          
          // Add warp transition class
          element.classList.add('warp-transition');
          
          // Scroll to the calculated position
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });
          
          setTimeout(() => element.classList.remove('warp-transition'), 800);
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        // Calculate offset accounting for the top bar height (80px) plus some padding
        const topBarHeight = 80;
        const elementPosition = element.offsetTop - topBarHeight;
        
        // Add warp transition class
        element.classList.add('warp-transition');
        
        // Scroll to the calculated position
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
        
        setTimeout(() => element.classList.remove('warp-transition'), 800);
      }
    }
  };

  // Track active section based on scroll position - UPDATED FOR CORRECT OFFSET
  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname !== '/') return;
      
      const sections = sectionItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id)
      })).filter(item => item.element);

      // Adjust scroll position calculation to account for top bar height
      const topBarHeight = 80;
      const scrollPosition = window.scrollY + topBarHeight + 50; // Added 50px buffer

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
      className="fixed top-0 right-0 left-0 h-20 z-50 glass-void" // Increased height from h-16 to h-20
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="h-full flex items-center justify-between px-6 md:px-10"> {/* Increased padding */}
        {/* Left Section - Logo moved to right and enlarged */}
        <div className="flex items-center">
          {/* Mobile Menu Button */}
          <motion.button 
            className="text-stellar-white hover:text-phoenix-primary md:hidden mr-4" // Brighter text color and increased margin
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Menu size={28} /> {/* Increased icon size */}
          </motion.button>
          
          {/* Logo - Enlarged and repositioned */}
          <Link to="/" className="flex items-center ml-4"> {/* Added left margin */}
            <motion.img 
              src="/logo.png" 
              alt="Swarm Resistance" 
              className="h-14 w-auto" // Increased from h-10 to h-14
              whileHover={{ 
                scale: 1.05,
                filter: "drop-shadow(0 0 12px rgba(255,140,0,0.6))"
              }}
            />
          </Link>
        </div>
        
        {/* Center Section - Navigation (Desktop) */}
        <nav className="hidden md:flex items-center space-x-10"> {/* Increased spacing from space-x-8 to space-x-10 */}
          {sectionItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative text-xl font-orbitron font-bold transition-all duration-300 ${  // Increased from text-lg to text-xl and added font-bold
                activeSection === item.id && location.pathname === '/' 
                  ? 'text-phoenix-primary text-shadow-phoenix' 
                  : 'text-stellar-white hover:text-phoenix-light' // Changed from text-neutral-light to text-stellar-white for brighter text
              }`}
              whileHover={{ 
                y: -3, // Slightly increased hover lift
                textShadow: "0 0 12px rgba(255,140,0,0.8)" // Enhanced glow
              }}
            >
              {item.name}
              {activeSection === item.id && location.pathname === '/' && (
                <>
                  {/* Enhanced active indicator line */}
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-phoenix-primary shadow-phoenix rounded-full" // Increased height and added rounded
                    layoutId="activeSection"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                  
                  {/* Glowing line effect similar to sidebar */}
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-1 rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, transparent, var(--phoenix-primary), transparent)',
                      boxShadow: '0 0 8px rgba(255, 140, 0, 0.8)'
                    }}
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </>
              )}
              
              {/* Enhanced holographic hover effect */}
              <motion.div
                className="absolute inset-0 bg-phoenix-primary/10 rounded-lg -z-10 -mx-2 -my-1" // Added negative margins for better coverage
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ 
                  opacity: 1, 
                  scale: 1,
                  boxShadow: "0 0 20px rgba(255,140,0,0.3)" // Enhanced glow
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
          ))}
        </nav>
        
        {/* Right Section - Wallet Connection */}
        <div className="flex items-center space-x-4">
          {isConnected ? (
            <div className="relative">
              <motion.button 
                className="flex items-center space-x-2 group"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="w-8 h-8 rounded-full border-2 border-phoenix-primary overflow-hidden"
                  whileHover={{ 
                    borderColor: "var(--phoenix-glow)",
                    boxShadow: "0 0 15px rgba(255,140,0,0.4)"
                  }}
                >
                  <img 
                    src={getUserAvatar()} 
                    alt="Avatar" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                <div className="hidden lg:flex items-center">
                  <span className="text-lg text-stellar-white font-medium mr-2">
                    {getUserDisplayName()}
                  </span>
                  <motion.div
                    animate={{ rotate: dropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={14} className="text-neutral-light" />
                  </motion.div>
                </div>
              </motion.button>
              
              {/* Enhanced Dropdown Menu */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div 
                    className="absolute right-0 mt-3 w-72 glass-void rounded-lg shadow-lg py-3 z-50 border border-phoenix-primary/20" // Increased mt-2 to mt-3 and py-2 to py-3
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-phoenix-primary/20">
                      <p className="text-sm text-neutral-light">Guardian Status</p>
                      <p className="text-sm text-stellar-white font-medium truncate">
                        {user?.email || formatAddress(walletAddress)}
                      </p>
                      
                      {/* Rank with Phoenix styling */}
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-neutral-light">Rank:</span>
                        <span className="text-sm font-orbitron font-bold text-phoenix-primary">
                          {getUserRank()}
                        </span>
                      </div>
                      
                      {/* Balance */}
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-xs text-neutral-light">Balance:</span>
                        <div className="flex items-center gap-1">
                          <Wallet size={12} className="text-resistance-light" />
                          <span className="text-xs text-stellar-white">
                            {parseFloat(balance).toFixed(4)} MATIC
                          </span>
                        </div>
                      </div>
                      
                      {/* Wallet Address */}
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-xs text-neutral-light">Address:</span>
                        <motion.button
                          onClick={copyAddress}
                          className="text-xs text-stellar-white hover:text-phoenix-primary transition-colors flex items-center gap-1"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {formatAddress(walletAddress)}
                          {copied ? (
                            <Check size={10} className="text-success-green" />
                          ) : (
                            <Copy size={10} />
                          )}
                        </motion.button>
                      </div>
                      
                      {/* Phoenix Essence */}
                      {userProfile && (
                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-xs text-neutral-light">Phoenix Essence:</span>
                          <span className="text-xs text-phoenix-primary font-bold">
                            {userProfile.medaGas.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Menu Items */}
                    <Link 
                      to="/profile" 
                      className="flex items-center gap-2 px-4 py-2 text-lg hover:bg-phoenix-primary/10 hover:text-phoenix-primary transition-all"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <User size={16} />
                      Profile
                    </Link>
                    <Link 
                      to="/settings" 
                      className="flex items-center gap-2 px-4 py-2 text-lg hover:bg-resistance-primary/10 hover:text-resistance-light transition-all"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <Settings size={16} />
                      Settings
                    </Link>
                    <motion.button 
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-lg hover:bg-red-500/10 hover:text-red-400 transition-all"
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                      }}
                      whileHover={{ x: 4 }}
                    >
                      <LogOut size={16} />
                      Disconnect
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.button 
              onClick={login}
              disabled={isLoading}
              className="hidden sm:flex items-center space-x-3 btn-phoenix-primary text-lg px-8 py-4 disabled:opacity-50" // Increased spacing, text size, and padding
              whileHover={{ 
                scale: isLoading ? 1 : 1.05,
                boxShadow: isLoading ? undefined : "0 0 30px rgba(255,140,0,0.5)" // Enhanced glow
              }}
              whileTap={{ scale: isLoading ? 1 : 0.95 }}
            >
              <Wallet size={18} /> {/* Increased icon size */}
              <span className="font-bold"> {/* Added font-bold */}
                {isLoading ? 'Initializing...' : 'Connect Wallet'}
              </span>
            </motion.button>
          )}
        </div>
      </div>
      
      {/* Enhanced Mobile Section Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-20 left-0 right-0 glass-void border-b border-phoenix-primary/30 py-3" // Increased from top-16 to top-20 and py-2 to py-3
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {sectionItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-6 py-4 text-xl font-orbitron font-bold transition-all ${  // Increased padding and text size, added font-bold
                  activeSection === item.id && location.pathname === '/' 
                    ? 'text-phoenix-primary bg-phoenix-primary/10 border-l-3 border-phoenix-primary' 
                    : 'text-stellar-white hover:text-phoenix-light hover:bg-phoenix-primary/5' // Changed from text-neutral-light to text-stellar-white
                }`}
                whileHover={{ x: 6 }} // Increased from x: 4 to x: 6
                whileTap={{ scale: 0.98 }}
              >
                {item.name}
                
                {/* Mobile glowing line effect for active items */}
                {activeSection === item.id && location.pathname === '/' && (
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full"
                    style={{
                      background: 'var(--phoenix-primary)',
                      boxShadow: '0 0 8px rgba(255, 140, 0, 0.8)'
                    }}
                    animate={{
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </motion.button>
            ))}
            
            {/* Mobile Wallet Connection */}
            <div className="px-4 py-2 border-t border-phoenix-primary/20 mt-2">
              {isConnected ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wallet size={16} className="text-resistance-light" />
                    <span className="text-sm font-medium">{formatAddress(walletAddress)}</span>
                  </div>
                  <motion.button
                    onClick={logout}
                    className="text-sm text-red-400 hover:text-red-300"
                    whileTap={{ scale: 0.95 }}
                  >
                    Disconnect
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  onClick={login}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 py-3 btn-phoenix-primary disabled:opacity-50"
                  whileTap={{ scale: isLoading ? 1 : 0.95 }}
                >
                  <Wallet size={16} />
                  <span className="font-semibold">
                    {isLoading ? 'Connecting...' : 'Connect Wallet'}
                  </span>
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Golden glowing horizontal line at bottom - matching sidebar style */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-0.5"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(255, 140, 0, 0.5), transparent)'
        }}
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Corner accent lights matching sidebar */}
      <motion.div
        className="absolute bottom-2 left-4 w-2 h-2 rounded-full"
        style={{
          background: '#FF8C00',
          boxShadow: '0 0 8px rgba(255, 140, 0, 0.8)'
        }}
        animate={{
          opacity: [0.4, 1, 0.4],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-2 right-4 w-1.5 h-1.5 rounded-full"
        style={{
          background: '#60A5FA',
          boxShadow: '0 0 6px rgba(96, 165, 250, 0.8)'
        }}
        animate={{
          opacity: [0.4, 1, 0.4],
          scale: [1, 1.3, 1]
        }}
        transition={{
          duration: 2.5,
          delay: 1,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.header>
  );
};

export default TopBar;