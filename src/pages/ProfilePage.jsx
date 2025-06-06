import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Zap, Edit2, Save, X, Calendar, Award, Shield, Clock, TrendingUp, Sword, MapPin, RefreshCw } from 'lucide-react';
import { useWeb3Auth } from '../contexts/Web3AuthContext';
import { RANKS } from '../services/userProfile.service';

const ProfilePage = () => {
  const { 
    userProfile, 
    updateUserProfile, 
    isConnected, 
    medaGasBalance, 
    isLoadingBalance, 
    refreshMedaGasBalance,
    nftHoldings,
    isLoadingNFTs,
    refreshNFTHoldings
  } = useWeb3Auth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [editedProfile, setEditedProfile] = useState({
    nickname: '',
    email: '',
  });

  useEffect(() => {
    if (userProfile) {
      setEditedProfile({
        nickname: userProfile.nickname || '',
        email: userProfile.email || '',
      });
    }
  }, [userProfile]);

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

  if (!isConnected) {
    return (
      <div className="full-screen-section relative overflow-hidden bg-void-primary">
        {/* Enhanced background layers */}
        <div className="absolute inset-0 w-full h-full">
          {/* Starfield background */}
          <div 
            className="absolute inset-0 w-full h-full opacity-40"
            style={{ 
              backgroundImage: `radial-gradient(2px 2px at 20px 30px, #FF8C00, transparent),
                               radial-gradient(2px 2px at 40px 70px, #60A5FA, transparent),
                               radial-gradient(1px 1px at 90px 40px, #8B5CF6, transparent),
                               radial-gradient(1px 1px at 130px 80px, #22C55E, transparent),
                               radial-gradient(2px 2px at 160px 30px, #FF8C00, transparent)`,
              backgroundRepeat: 'repeat',
              backgroundSize: '200px 100px'
            }}
          />
          
          {/* Nebula overlay */}
          <div className="absolute inset-0 bg-gradient-radial from-cosmic-purple/30 via-transparent to-void-primary/60" />
          <div className="absolute inset-0 bg-gradient-conic from-phoenix-primary/10 via-resistance-primary/10 to-energy-purple/10 opacity-30" />
        </div>

        {/* Enhanced floating particles */}
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
        </div>
        
        <div className="relative z-10 min-h-screen w-full pt-16 md:pl-64">
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center">
            <motion.div 
              className="text-center glassmorphism p-8 rounded-xl max-w-md mx-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Shield size={64} className="text-meda-gold mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-stellar-white mb-4">Access Restricted</h2>
              <p className="text-gray-400 mb-6">Connect your wallet to access your resistance profile and join the fight against the Swarm.</p>
              <motion.button 
                className="btn-primary-glass"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Connect Wallet
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="full-screen-section relative overflow-hidden bg-void-primary">
        {/* Enhanced background layers */}
        <div className="absolute inset-0 w-full h-full">
          {/* Starfield background */}
          <div 
            className="absolute inset-0 w-full h-full opacity-40"
            style={{ 
              backgroundImage: `radial-gradient(2px 2px at 20px 30px, #FF8C00, transparent),
                               radial-gradient(2px 2px at 40px 70px, #60A5FA, transparent),
                               radial-gradient(1px 1px at 90px 40px, #8B5CF6, transparent),
                               radial-gradient(1px 1px at 130px 80px, #22C55E, transparent),
                               radial-gradient(2px 2px at 160px 30px, #FF8C00, transparent)`,
              backgroundRepeat: 'repeat',
              backgroundSize: '200px 100px'
            }}
          />
          
          {/* Nebula overlay */}
          <div className="absolute inset-0 bg-gradient-radial from-cosmic-purple/30 via-transparent to-void-primary/60" />
          <div className="absolute inset-0 bg-gradient-conic from-phoenix-primary/10 via-resistance-primary/10 to-energy-purple/10 opacity-30" />
        </div>

        {/* Enhanced floating particles */}
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
        </div>

        <div className="relative z-10 min-h-screen w-full pt-16 md:pl-64">
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center">
            <div className="text-center glassmorphism p-8 rounded-xl">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-meda-gold mx-auto mb-4"></div>
              <p className="text-xl text-gray-400">Loading resistance profile...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleSaveProfile = () => {
    updateUserProfile(editedProfile);
    setIsEditing(false);
  };

  // Get real or fallback Meda Gas balance
  const getMedaGasDisplay = () => {
    if (isLoadingBalance) {
      return {
        balance: '...',
        isLoading: true
      };
    }
    
    if (medaGasBalance && !medaGasBalance.error) {
      return {
        balance: medaGasBalance.balanceFormatted,
        isLoading: false,
        isReal: true
      };
    }
    
    // Fallback to localStorage value
    return {
      balance: userProfile.medaGas.toLocaleString(),
      isLoading: false,
      isReal: false
    };
  };

  // Mock data for NFT Heroes with power stats
  const mockHeroes = [
    { 
      id: 1, 
      name: 'Elite Warrior', 
      rarity: 'Revolution', 
      power: 289,
      attributes: { security: 95, anonymity: 98, innovation: 96 },
      image: '/1231.png' // Example image
    },
    { 
      id: 2, 
      name: 'Cyber Assassin', 
      rarity: 'Influencer', 
      power: 234,
      attributes: { security: 78, anonymity: 82, innovation: 74 },
      image: '/2341.png' // Example image
    },
    { 
      id: 3, 
      name: 'Plasma Guardian', 
      rarity: 'Collectible', 
      power: 178,
      attributes: { security: 61, anonymity: 58, innovation: 59 },
      image: '/3451.png' // Example image
    },
  ];

  // Mock data for NFT Weapons with tier stats
  const mockWeapons = [
    { 
      id: 1, 
      name: 'Plasma Gun', 
      tier: 'Tier 3', 
      type: 'Gun',
      power: 195,
      attributes: { attribute1: 68, attribute2: 65, attribute3: 62 },
      video: '/324.mp4' // Example: Tier 3, Gun, Sniper Rifle
    },
    { 
      id: 2, 
      name: 'Plasma Sword', 
      tier: 'Tier 2', 
      type: 'Sword',
      power: 156,
      attributes: { attribute1: 52, attribute2: 48, attribute3: 56 },
      video: '/213.mp4' // Example: Tier 2, Sword, Plasma Sword
    },
    { 
      id: 3, 
      name: 'Shotgun', 
      tier: 'Tier 1', 
      type: 'Gun',
      power: 210,
      attributes: { attribute1: 72, attribute2: 69, attribute3: 69 },
      video: '/122.mp4' // Example: Tier 1, Gun, Shotgun
    },
  ];

  // Mock data for NFT Lands with rarity and plots
  const mockLands = [
    { id: 1, name: 'Common Land', rarity: 'Common', plots: 1, image: '/land1.png' },
    { id: 2, name: 'Rare Land', rarity: 'Rare', plots: 3, image: '/land2.png' },
    { id: 3, name: 'Legendary Land', rarity: 'Legendary', plots: 7, image: '/land3.png' },
  ];

  // Get real or fallback NFT data
  const getNFTData = () => {
    if (isLoadingNFTs) {
      return {
        heroes: [],
        weapons: [],
        lands: [],
        heroesCount: '...',
        weaponsCount: '...',
        landsCount: '...',
        isLoading: true
      };
    }
    
    if (nftHoldings && !nftHoldings.heroes?.error) {
      return {
        heroes: nftHoldings.heroes.nfts || [],
        weapons: nftHoldings.weapons.nfts || [],
        lands: nftHoldings.lands.nfts || [],
        heroesCount: nftHoldings.heroes.count || 0,
        weaponsCount: nftHoldings.weapons.count || 0,
        landsCount: nftHoldings.lands.count || 0,
        isLoading: false,
        isReal: true
      };
    }
    
    // Fallback to mock data
    return {
      heroes: mockHeroes,
      weapons: mockWeapons,
      lands: mockLands,
      heroesCount: mockHeroes.length,
      weaponsCount: mockWeapons.length,
      landsCount: mockLands.length,
      isLoading: false,
      isReal: false
    };
  };

  const nftData = getNFTData();
  const medaGasDisplay = getMedaGasDisplay();
  const currentRankInfo = RANKS.find(r => r.name === userProfile.rank);
  const nextRankInfo = RANKS.find(r => r.minGas > userProfile.medaGas);
  const progressToNextRank = nextRankInfo 
    ? ((userProfile.medaGas - (currentRankInfo?.minGas || 0)) / (nextRankInfo.minGas - (currentRankInfo?.minGas || 0))) * 100
    : 100;

  const recentActivities = [
    { type: 'Daily Login', reward: 150, timestamp: '2 hours ago' },
    { type: 'Meda Shooter', reward: 75, timestamp: '5 hours ago' },
    { type: 'Reflex Game', reward: 45, timestamp: '1 day ago' },
    { type: 'Trivia', reward: 200, timestamp: '2 days ago' },
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Trophy },
    { id: 'heroes', name: 'NFT Heroes', icon: Shield },
    { id: 'weapons', name: 'NFT Weapons', icon: Sword },
    { id: 'lands', name: 'NFT Lands', icon: MapPin },
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'Revolution':
        return 'text-meda-gold border-meda-gold/30 bg-meda-gold/10';
      case 'Influencer':
        return 'text-nebula-pink border-nebula-pink/30 bg-nebula-pink/10';
      case 'Collectible':
        return 'text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10';
      case 'Legendary':
        return 'text-meda-gold border-meda-gold/30 bg-meda-gold/10';
      case 'Epic':
        return 'text-nebula-pink border-nebula-pink/30 bg-nebula-pink/10';
      case 'Rare':
        return 'text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10';
      case 'Common':
        return 'text-gray-400 border-gray-400/30 bg-gray-400/10';
      default:
        return 'text-gray-400 border-gray-400/30 bg-gray-400/10';
    }
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case 'Tier 3':
        return 'text-meda-gold border-meda-gold/30 bg-meda-gold/10';
      case 'Tier 2':
        return 'text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10';
      case 'Tier 1':
        return 'text-gray-400 border-gray-400/30 bg-gray-400/10';
      default:
        return 'text-gray-400 border-gray-400/30 bg-gray-400/10';
    }
  };

  return (
    <div className="full-screen-section relative overflow-hidden bg-void-primary">
      {/* Enhanced background layers */}
      <div className="absolute inset-0 w-full h-full">
        {/* Starfield background */}
        <div 
          className="absolute inset-0 w-full h-full opacity-40"
          style={{ 
            backgroundImage: `radial-gradient(2px 2px at 20px 30px, #FF8C00, transparent),
                             radial-gradient(2px 2px at 40px 70px, #60A5FA, transparent),
                             radial-gradient(1px 1px at 90px 40px, #8B5CF6, transparent),
                             radial-gradient(1px 1px at 130px 80px, #22C55E, transparent),
                             radial-gradient(2px 2px at 160px 30px, #FF8C00, transparent)`,
            backgroundRepeat: 'repeat',
            backgroundSize: '200px 100px'
          }}
        />
        
        {/* Nebula overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-cosmic-purple/30 via-transparent to-void-primary/60" />
        <div className="absolute inset-0 bg-gradient-conic from-phoenix-primary/10 via-resistance-primary/10 to-energy-purple/10 opacity-30" />
      </div>

      {/* Enhanced floating particles */}
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
      </div>

      {/* Main content - properly centered accounting for sidebar */}
      <div className="relative z-10 min-h-screen w-full pt-16 md:pl-64">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Header Section */}
          <motion.div 
            className="glassmorphism rounded-xl p-8 mb-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              
              {/* Avatar and Basic Info */}
              <div className="flex flex-col items-center lg:items-start">
                <motion.div 
                  className="relative mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-32 h-32 rounded-full border-4 border-meda-gold overflow-hidden relative">
                    <img 
                      src={userProfile.avatar} 
                      alt="Avatar" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  <div 
                    className="absolute -bottom-2 -right-2 rounded-full p-3 border-2 border-void-black"
                    style={{ 
                      backgroundColor: currentRankInfo?.color,
                      boxShadow: `0 0 15px ${currentRankInfo?.color}80`
                    }}
                  >
                    <Trophy size={20} className="text-void-black" />
                  </div>
                </motion.div>

                {/* Rank Badge */}
                <motion.div 
                  className="glassmorphism px-4 py-2 rounded-full mb-2"
                  style={{ 
                    border: `2px solid ${currentRankInfo?.color}`,
                    boxShadow: `0 0 10px ${currentRankInfo?.color}40`
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span 
                    className="font-bold text-lg"
                    style={{ color: currentRankInfo?.color }}
                  >
                    {userProfile.rank}
                  </span>
                </motion.div>
              </div>

              {/* Profile Details */}
              <div className="flex-1 text-center lg:text-left">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={editedProfile.nickname}
                        onChange={(e) => setEditedProfile({ ...editedProfile, nickname: e.target.value })}
                        className="bg-space-blue/50 border border-cosmic-purple/30 rounded-lg px-4 py-3 text-stellar-white text-lg"
                        placeholder="Resistance Codename"
                      />
                      <input
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                        className="bg-space-blue/50 border border-cosmic-purple/30 rounded-lg px-4 py-3 text-stellar-white text-lg"
                        placeholder="Secure Communications"
                      />
                    </div>
                    <div className="flex gap-3 justify-center lg:justify-start">
                      <motion.button
                        onClick={handleSaveProfile}
                        className="flex items-center gap-2 px-6 py-3 bg-energy-green/20 hover:bg-energy-green/30 rounded-lg transition-colors font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Save size={18} />
                        Save Changes
                      </motion.button>
                      <motion.button
                        onClick={() => {
                          setIsEditing(false);
                          setEditedProfile({
                            nickname: userProfile.nickname || '',
                            email: userProfile.email || '',
                          });
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-nebula-pink/20 hover:bg-nebula-pink/30 rounded-lg transition-colors font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <X size={18} />
                        Cancel
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-4 mb-4 justify-center lg:justify-start">
                      <h1 className="text-4xl font-bold text-stellar-white">{userProfile.nickname}</h1>
                      <motion.button
                        onClick={() => setIsEditing(true)}
                        className="text-gray-400 hover:text-neon-cyan transition-colors p-2"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Edit2 size={20} />
                      </motion.button>
                    </div>
                    
                    <p className="text-gray-400 mb-6 text-lg">{userProfile.email || 'No secure comm channel set'}</p>
                    
                    {/* Key Stats Row - Updated with new categories */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="glassmorphism p-4 rounded-lg text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Zap size={24} className="text-energy-green" />
                          {medaGasDisplay.isReal && !medaGasDisplay.isLoading && (
                            <motion.button
                              onClick={refreshMedaGasBalance}
                              className="text-gray-400 hover:text-energy-green transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              title="Refresh balance"
                            >
                              <RefreshCw size={16} />
                            </motion.button>
                          )}
                        </div>
                        <div className={`text-2xl font-bold ${medaGasDisplay.isLoading ? 'text-gray-400' : 'text-energy-green'}`}>
                          {medaGasDisplay.balance}
                        </div>
                        <div className="text-sm text-gray-400 flex items-center justify-center gap-1">
                          Meda Gas
                          {medaGasDisplay.isReal && !medaGasDisplay.isLoading && (
                            <div className="w-2 h-2 bg-energy-green rounded-full" title="Live blockchain data" />
                          )}
                          {!medaGasDisplay.isReal && !medaGasDisplay.isLoading && (
                            <div className="w-2 h-2 bg-yellow-500 rounded-full" title="Cached data" />
                          )}
                        </div>
                        {medaGasBalance?.error && (
                          <div className="text-xs text-red-400 mt-1">
                            Connection error
                          </div>
                        )}
                      </div>
                      <div className="glassmorphism p-4 rounded-lg text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Shield size={24} className="text-meda-gold" />
                          {nftData.isReal && !nftData.isLoading && (
                            <motion.button
                              onClick={refreshNFTHoldings}
                              className="text-gray-400 hover:text-meda-gold transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              title="Refresh NFTs"
                            >
                              <RefreshCw size={16} />
                            </motion.button>
                          )}
                        </div>
                        <div className={`text-2xl font-bold ${nftData.isLoading ? 'text-gray-400' : 'text-meda-gold'}`}>
                          {nftData.heroesCount}
                        </div>
                        <div className="text-sm text-gray-400 flex items-center justify-center gap-1">
                          Heroes
                          {nftData.isReal && !nftData.isLoading && (
                            <div className="w-2 h-2 bg-meda-gold rounded-full" title="Live blockchain data" />
                          )}
                          {!nftData.isReal && !nftData.isLoading && (
                            <div className="w-2 h-2 bg-yellow-500 rounded-full" title="Mock data" />
                          )}
                        </div>
                      </div>
                      <div className="glassmorphism p-4 rounded-lg text-center">
                        <Sword size={24} className="text-neon-cyan mx-auto mb-2" />
                        <div className={`text-2xl font-bold ${nftData.isLoading ? 'text-gray-400' : 'text-neon-cyan'}`}>
                          {nftData.weaponsCount}
                        </div>
                        <div className="text-sm text-gray-400 flex items-center justify-center gap-1">
                          Weapons
                          {nftData.isReal && !nftData.isLoading && (
                            <div className="w-2 h-2 bg-neon-cyan rounded-full" title="Live blockchain data" />
                          )}
                          {!nftData.isReal && !nftData.isLoading && (
                            <div className="w-2 h-2 bg-yellow-500 rounded-full" title="Mock data" />
                          )}
                        </div>
                      </div>
                      <div className="glassmorphism p-4 rounded-lg text-center">
                        <MapPin size={24} className="text-nebula-pink mx-auto mb-2" />
                        <div className={`text-2xl font-bold ${nftData.isLoading ? 'text-gray-400' : 'text-nebula-pink'}`}>
                          {nftData.landsCount}
                        </div>
                        <div className="text-sm text-gray-400 flex items-center justify-center gap-1">
                          Lands
                          {nftData.isReal && !nftData.isLoading && (
                            <div className="w-2 h-2 bg-nebula-pink rounded-full" title="Live blockchain data" />
                          )}
                          {!nftData.isReal && !nftData.isLoading && (
                            <div className="w-2 h-2 bg-yellow-500 rounded-full" title="Mock data" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Member Since */}
                    <div className="flex items-center gap-2 text-gray-400 justify-center lg:justify-start">
                      <Calendar size={16} />
                      <span>Resistance Member Since {new Date(userProfile.joinDate).toLocaleDateString()}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Rank Progress Bar */}
            {!isEditing && nextRankInfo && (
              <motion.div 
                className="mt-8 p-6 glassmorphism rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-400 font-medium">Advancement to {nextRankInfo.name}</span>
                  <span className="text-gray-400">
                    {userProfile.medaGas.toLocaleString()} / {nextRankInfo.minGas.toLocaleString()} Meda Gas
                  </span>
                </div>
                <div className="w-full bg-space-blue/50 rounded-full h-4 overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-meda-gold via-neon-cyan to-energy-green relative"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progressToNextRank, 100)}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse" />
                  </motion.div>
                </div>
                <div className="text-right mt-2">
                  <span className="text-sm text-meda-gold font-medium">
                    {Math.round(progressToNextRank)}% Complete
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Tab Navigation */}
          <motion.div 
            className="glassmorphism rounded-xl p-2 mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-meda-gold text-void-black shadow-lg'
                        : 'text-gray-400 hover:text-stellar-white hover:bg-space-blue/30'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={18} />
                    {tab.name}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === 'overview' && (
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Daily Production */}
                <div className="glassmorphism rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <TrendingUp className="text-energy-green" />
                    Daily Production
                  </h3>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-energy-green mb-2">0</div>
                    <div className="text-gray-400 mb-4">Meda Gas per Day</div>
                    <p className="text-sm text-gray-500">Assign NFTs to Meda Wars to start passive production</p>
                  </div>
                </div>

                {/* Recent Activities */}
                <div className="glassmorphism rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Clock className="text-neon-cyan" />
                    Recent Activities
                  </h3>
                  <div className="space-y-3">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-space-blue/30 rounded-lg">
                        <div>
                          <div className="font-medium text-stellar-white">{activity.type}</div>
                          <div className="text-sm text-gray-400">{activity.timestamp}</div>
                        </div>
                        <div className="text-energy-green font-bold">+{activity.reward} MG</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'heroes' && (
              <div className="glassmorphism rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">NFT Heroes</h3>
                  <div className="flex items-center gap-4">
                    <div className="text-gray-400">
                      {nftData.isLoading ? '...' : `${nftData.heroesCount} Heroes`}
                    </div>
                    {nftData.isReal && !nftData.isLoading && (
                      <motion.button
                        onClick={refreshNFTHoldings}
                        className="text-gray-400 hover:text-meda-gold transition-colors p-2"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Refresh Heroes"
                      >
                        <RefreshCw size={20} />
                      </motion.button>
                    )}
                  </div>
                </div>
                
                {nftData.isLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-meda-gold mx-auto mb-4"></div>
                    <p className="text-xl text-gray-400">Loading Heroes from blockchain...</p>
                  </div>
                ) : nftData.heroes.length > 0 ? (
                  <>
                    {!nftData.isReal && (
                      <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                        <p className="text-yellow-400 text-sm">⚠️ Showing mock data - blockchain connection unavailable</p>
                      </div>
                    )}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {nftData.heroes.map((hero) => (
                        <motion.div
                          key={hero.id}
                          className="bg-space-blue/30 rounded-lg p-4 border border-cosmic-purple/30"
                          whileHover={{ scale: 1.02, borderColor: 'rgba(255, 182, 30, 0.5)' }}
                        >
                          <div className="aspect-square bg-gradient-to-br from-cosmic-purple to-space-blue rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                            {hero.image ? (
                              <img 
                                src={hero.image} 
                                alt={hero.name}
                                className="w-full h-full object-cover rounded-lg"
                                onError={(e) => {
                                  // Fallback to icon if image fails to load
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            <div 
                              className="w-full h-full flex items-center justify-center"
                              style={{ display: hero.image ? 'none' : 'flex' }}
                            >
                              <Shield size={48} className="text-meda-gold" />
                            </div>
                          </div>
                          
                          {/* Hero Details */}
                          <div className="space-y-3">
                            <h4 className="font-bold text-stellar-white text-lg">{hero.name}</h4>
                            
                            {nftData.isReal && (
                              <div className="text-xs text-gray-500">
                                Token ID: {hero.tokenId}
                              </div>
                            )}
                            
                            {/* Show attributes if available */}
                            {hero.attributes && (
                              <div className="space-y-2">
                                <div className="grid grid-cols-3 gap-2 text-xs">
                                  <div className="text-center">
                                    <div className="text-blue-400 font-semibold">{hero.attributes.security}</div>
                                    <div className="text-gray-400">Security</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-purple-400 font-semibold">{hero.attributes.anonymity}</div>
                                    <div className="text-gray-400">Anonymity</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-cyan-400 font-semibold">{hero.attributes.innovation}</div>
                                    <div className="text-gray-400">Innovation</div>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            <div className="flex justify-between items-center">
                              <span className={`text-sm px-2 py-1 rounded border ${getRarityColor(hero.rarity)}`}>
                                {hero.rarity}
                              </span>
                              <div className="text-right">
                                <div className="text-sm text-gray-400">
                                  {hero.attributes ? 'Total Power' : 'Power'}
                                </div>
                                <div className="text-lg font-bold text-energy-green">{hero.power}</div>
                                {hero.attributes && (
                                  <div className="text-xs text-gray-500">
                                    ({hero.attributes.security + hero.attributes.anonymity + hero.attributes.innovation})
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <Shield size={64} className="text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400 mb-4">No heroes detected</p>
                    <p className="text-sm text-gray-500">
                      {nftData.isReal ? 
                        'Your wallet does not contain any Hero NFTs from the resistance collection' :
                        'Acquire Hero NFTs to build your resistance team'
                      }
                    </p>
                    {nftHoldings?.heroes?.error && (
                      <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <p className="text-red-400 text-sm">Error loading Heroes: {nftHoldings.heroes.error}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'weapons' && (
              <div className="glassmorphism rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">NFT Weapons</h3>
                  <div className="flex items-center gap-4">
                    <div className="text-gray-400">
                      {nftData.isLoading ? '...' : `${nftData.weaponsCount} Weapons`}
                    </div>
                    {nftData.isReal && !nftData.isLoading && (
                      <motion.button
                        onClick={refreshNFTHoldings}
                        className="text-gray-400 hover:text-neon-cyan transition-colors p-2"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Refresh Weapons"
                      >
                        <RefreshCw size={20} />
                      </motion.button>
                    )}
                  </div>
                </div>
                
                {nftData.isLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-neon-cyan mx-auto mb-4"></div>
                    <p className="text-xl text-gray-400">Loading Weapons from blockchain...</p>
                  </div>
                ) : nftData.weapons.length > 0 ? (
                  <>
                    {!nftData.isReal && (
                      <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                        <p className="text-yellow-400 text-sm">⚠️ Showing mock data - blockchain connection unavailable</p>
                      </div>
                    )}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {nftData.weapons.map((weapon) => (
                        <motion.div
                          key={weapon.id}
                          className="bg-space-blue/30 rounded-lg p-4 border border-cosmic-purple/30"
                          whileHover={{ scale: 1.02, borderColor: 'rgba(255, 182, 30, 0.5)' }}
                        >
                          <div className="aspect-square bg-gradient-to-br from-cosmic-purple to-space-blue rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                            {weapon.video ? (
                              <video 
                                src={weapon.video} 
                                autoPlay
                                loop
                                muted
                                className="w-full h-full object-cover rounded-lg"
                                onError={(e) => {
                                  // Fallback to icon if video fails to load
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            <div 
                              className="w-full h-full flex items-center justify-center"
                              style={{ display: weapon.video ? 'none' : 'flex' }}
                            >
                              <Sword size={48} className="text-neon-cyan" />
                            </div>
                          </div>
                          
                          {/* Weapon Details */}
                          <div className="space-y-3">
                            <h4 className="font-bold text-stellar-white text-lg">{weapon.name}</h4>
                            
                            {nftData.isReal && (
                              <div className="text-xs text-gray-500">
                                Token ID: {weapon.tokenId}
                                {weapon.type && <div>Type: {weapon.type}</div>}
                              </div>
                            )}
                            
                            {/* Show attributes if available */}
                            {weapon.attributes && (
                              <div className="space-y-2">
                                <div className="grid grid-cols-3 gap-2 text-xs">
                                  <div className="text-center">
                                    <div className="text-red-400 font-semibold">{weapon.attributes.attribute1}</div>
                                    <div className="text-gray-400">Attr 1</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-orange-400 font-semibold">{weapon.attributes.attribute2}</div>
                                    <div className="text-gray-400">Attr 2</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-yellow-400 font-semibold">{weapon.attributes.attribute3}</div>
                                    <div className="text-gray-400">Attr 3</div>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            <div className="flex justify-between items-center">
                              <span className={`text-sm px-2 py-1 rounded border ${getTierColor(weapon.tier)}`}>
                                {weapon.tier}
                              </span>
                              <div className="text-right">
                                <div className="text-sm text-gray-400">
                                  {weapon.attributes ? 'Total Power' : 'Power'}
                                </div>
                                <div className="text-lg font-bold text-energy-green">{weapon.power}</div>
                                {weapon.attributes && (
                                  <div className="text-xs text-gray-500">
                                    ({weapon.attributes.attribute1 + weapon.attributes.attribute2 + weapon.attributes.attribute3})
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <Sword size={64} className="text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400 mb-4">No weapons detected</p>
                    <p className="text-sm text-gray-500">
                      {nftData.isReal ? 
                        'Your wallet does not contain any Weapon NFTs from the resistance collection' :
                        'Acquire Weapon NFTs to arm your resistance forces'
                      }
                    </p>
                    {nftHoldings?.weapons?.error && (
                      <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <p className="text-red-400 text-sm">Error loading Weapons: {nftHoldings.weapons.error}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'lands' && (
              <div className="glassmorphism rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">NFT Lands</h3>
                  <div className="flex items-center gap-4">
                    <div className="text-gray-400">
                      {nftData.isLoading ? '...' : `${nftData.landsCount} Territories`}
                    </div>
                    {nftData.isReal && !nftData.isLoading && (
                      <motion.button
                        onClick={refreshNFTHoldings}
                        className="text-gray-400 hover:text-nebula-pink transition-colors p-2"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Refresh Lands"
                      >
                        <RefreshCw size={20} />
                      </motion.button>
                    )}
                  </div>
                </div>
                
                {nftData.isLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-nebula-pink mx-auto mb-4"></div>
                    <p className="text-xl text-gray-400">Loading Lands from blockchain...</p>
                  </div>
                ) : nftData.lands.length > 0 ? (
                  <>
                    {!nftData.isReal && (
                      <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                        <p className="text-yellow-400 text-sm">⚠️ Showing mock data - blockchain connection unavailable</p>
                      </div>
                    )}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {nftData.lands.map((land) => (
                        <motion.div
                          key={land.id}
                          className="bg-space-blue/30 rounded-lg p-4 border border-cosmic-purple/30"
                          whileHover={{ scale: 1.02, borderColor: 'rgba(255, 182, 30, 0.5)' }}
                        >
                          <div className="aspect-square bg-gradient-to-br from-cosmic-purple to-space-blue rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                            {nftData.isReal && land.image ? (
                              <img 
                                src={land.image} 
                                alt={land.name}
                                className="w-full h-full object-cover rounded-lg"
                                onError={(e) => {
                                  // Fallback to icon if image fails to load
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            <MapPin 
                              size={48} 
                              className="text-nebula-pink"
                              style={{ display: (nftData.isReal && land.image) ? 'none' : 'block' }}
                            />
                          </div>
                          
                          {/* Land Details */}
                          <div className="space-y-3">
                            <h4 className="font-bold text-stellar-white text-lg">{land.name}</h4>
                            
                            {nftData.isReal && (
                              <div className="text-xs text-gray-500">
                                Token ID: {land.tokenId}
                                {land.balance > 1 && ` (x${land.balance})`}
                              </div>
                            )}
                            
                            <div className="flex justify-between items-center">
                              <span className={`text-sm px-2 py-1 rounded border ${getRarityColor(land.rarity)}`}>
                                {land.rarity}
                              </span>
                              <div className="text-right">
                                <div className="text-sm text-gray-400">Plots</div>
                                <div className="text-lg font-bold text-energy-green">{land.plots}</div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <MapPin size={64} className="text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400 mb-4">No territories detected</p>
                    <p className="text-sm text-gray-500">
                      {nftData.isReal ? 
                        'Your wallet does not contain any Land NFTs from the resistance collection' :
                        'Acquire Land NFTs to establish resistance bases'
                      }
                    </p>
                    {nftHoldings?.lands?.error && (
                      <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <p className="text-red-400 text-sm">Error loading Lands: {nftHoldings.lands.error}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="glassmorphism rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-6">Achievements</h3>
                {userProfile.achievements.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userProfile.achievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.id}
                        className="bg-space-blue/30 rounded-lg p-6 text-center border border-meda-gold/30"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-4xl mb-3">{achievement.icon}</div>
                        <h4 className="font-bold text-stellar-white mb-2">{achievement.name}</h4>
                        <p className="text-sm text-gray-400">
                          Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Award size={64} className="text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400 mb-4">No achievements unlocked yet</p>
                    <p className="text-sm text-gray-500">Complete battles, games, and challenges to earn achievements and prove your worth to the resistance!</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;