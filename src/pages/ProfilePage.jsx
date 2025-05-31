import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Zap, Edit2, Save, X, Calendar, Award, Shield, GamepadIcon, Clock, TrendingUp, Sword, MapPin, RefreshCw } from 'lucide-react';
import { useWeb3Auth } from '../contexts/Web3AuthContext';
import { RANKS } from '../services/userProfile.service';

const ProfilePage = () => {
  const { userProfile, updateUserProfile, isConnected, medaGasBalance, isLoadingBalance, refreshMedaGasBalance } = useWeb3Auth();
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

  if (!isConnected) {
    return (
      <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center">
        {/* Background with space theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-space-blue via-cosmic-purple/80 to-void-black">
          {/* Animated stars */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
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
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-space-blue via-cosmic-purple/80 to-void-black" />
        <div className="text-center glassmorphism p-8 rounded-xl">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-meda-gold mx-auto mb-4"></div>
          <p className="text-xl text-gray-400">Loading resistance profile...</p>
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

  const medaGasDisplay = getMedaGasDisplay();
  const currentRankInfo = RANKS.find(r => r.name === userProfile.rank);
  const nextRankInfo = RANKS.find(r => r.minGas > userProfile.medaGas);
  const progressToNextRank = nextRankInfo 
    ? ((userProfile.medaGas - (currentRankInfo?.minGas || 0)) / (nextRankInfo.minGas - (currentRankInfo?.minGas || 0))) * 100
    : 100;

  // Mock data for NFT Heroes with power stats
  const mockHeroes = [
    { id: 1, name: 'Elite Warrior', rarity: 'Revolution', power: 289 },
    { id: 2, name: 'Cyber Assassin', rarity: 'Influencer', power: 234 },
    { id: 3, name: 'Plasma Guardian', rarity: 'Collectible', power: 178 },
    { id: 4, name: 'Nova Striker', rarity: 'Influencer', power: 256 },
    { id: 5, name: 'Quantum Sentinel', rarity: 'Revolution', power: 312 },
    { id: 6, name: 'Storm Ranger', rarity: 'Collectible', power: 165 },
  ];

  // Mock data for NFT Weapons with tier stats
  const mockWeapons = [
    { id: 1, name: 'Plasma Rifle', tier: 'Tier 3', power: 195 },
    { id: 2, name: 'Quantum Blade', tier: 'Tier 2', power: 156 },
    { id: 3, name: 'Energy Cannon', tier: 'Tier 3', power: 210 },
    { id: 4, name: 'Neural Disruptor', tier: 'Tier 1', power: 98 },
    { id: 5, name: 'Void Hammer', tier: 'Tier 2', power: 167 },
    { id: 6, name: 'Photon Sniper', tier: 'Tier 3', power: 225 },
    { id: 7, name: 'Arc Launcher', tier: 'Tier 1', power: 87 },
    { id: 8, name: 'Nano Sword', tier: 'Tier 2', power: 143 },
    { id: 9, name: 'Fusion Pistol', tier: 'Tier 1', power: 76 },
    { id: 10, name: 'Gravity Gun', tier: 'Tier 3', power: 198 },
    { id: 11, name: 'Storm Bow', tier: 'Tier 2', power: 134 },
    { id: 12, name: 'Phase Rifle', tier: 'Tier 1', power: 89 },
  ];

  // Mock data for NFT Lands with rarity and plots
  const mockLands = [
    { id: 1, name: 'Crystal Outpost', rarity: 'Legendary', plots: 7 },
    { id: 2, name: 'Mining Station Alpha', rarity: 'Rare', plots: 3 },
    { id: 3, name: 'Desert Checkpoint', rarity: 'Common', plots: 1 },
  ];

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
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Full background */}
      <div className="absolute inset-0 bg-gradient-to-b from-space-blue via-cosmic-purple/60 to-void-black">
        {/* Animated background elements */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`bg-particle-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              backgroundColor: i % 3 === 0 ? '#FFB61E' : i % 3 === 1 ? '#00F0FF' : '#FF3E8A',
              opacity: 0.4
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Main content - properly centered accounting for sidebar */}
      <div className="relative z-10 min-h-screen py-8">
        <div className="section-content">
          <div className="content-wrapper">
          
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
                        <Shield size={24} className="text-meda-gold mx-auto mb-2" />
                        <div className="text-2xl font-bold text-meda-gold">{mockHeroes.length}</div>
                        <div className="text-sm text-gray-400">Heroes</div>
                      </div>
                      <div className="glassmorphism p-4 rounded-lg text-center">
                        <Sword size={24} className="text-neon-cyan mx-auto mb-2" />
                        <div className="text-2xl font-bold text-neon-cyan">{mockWeapons.length}</div>
                        <div className="text-sm text-gray-400">Weapons</div>
                      </div>
                      <div className="glassmorphism p-4 rounded-lg text-center">
                        <MapPin size={24} className="text-nebula-pink mx-auto mb-2" />
                        <div className="text-2xl font-bold text-nebula-pink">{mockLands.length}</div>
                        <div className="text-sm text-gray-400">Lands</div>
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
                  <div className="text-gray-400">
                    {mockHeroes.length} Heroes
                  </div>
                </div>
                
                {mockHeroes.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockHeroes.map((hero) => (
                      <motion.div
                        key={hero.id}
                        className="bg-space-blue/30 rounded-lg p-4 border border-cosmic-purple/30"
                        whileHover={{ scale: 1.02, borderColor: 'rgba(255, 182, 30, 0.5)' }}
                      >
                        <div className="aspect-square bg-gradient-to-br from-cosmic-purple to-space-blue rounded-lg mb-4 flex items-center justify-center">
                          <Shield size={48} className="text-meda-gold" />
                        </div>
                        
                        {/* Hero Details */}
                        <div className="space-y-3">
                          <h4 className="font-bold text-stellar-white text-lg">{hero.name}</h4>
                          
                          <div className="flex justify-between items-center">
                            <span className={`text-sm px-2 py-1 rounded border ${getRarityColor(hero.rarity)}`}>
                              {hero.rarity}
                            </span>
                            <div className="text-right">
                              <div className="text-sm text-gray-400">Power</div>
                              <div className="text-lg font-bold text-energy-green">{hero.power}</div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Shield size={64} className="text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400 mb-4">No heroes detected</p>
                    <p className="text-sm text-gray-500">Acquire Hero NFTs to build your resistance team</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'weapons' && (
              <div className="glassmorphism rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">NFT Weapons</h3>
                  <div className="text-gray-400">
                    {mockWeapons.length} Weapons
                  </div>
                </div>
                
                {mockWeapons.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockWeapons.map((weapon) => (
                      <motion.div
                        key={weapon.id}
                        className="bg-space-blue/30 rounded-lg p-4 border border-cosmic-purple/30"
                        whileHover={{ scale: 1.02, borderColor: 'rgba(255, 182, 30, 0.5)' }}
                      >
                        <div className="aspect-square bg-gradient-to-br from-cosmic-purple to-space-blue rounded-lg mb-4 flex items-center justify-center">
                          <Sword size={48} className="text-neon-cyan" />
                        </div>
                        
                        {/* Weapon Details */}
                        <div className="space-y-3">
                          <h4 className="font-bold text-stellar-white text-lg">{weapon.name}</h4>
                          
                          <div className="flex justify-between items-center">
                            <span className={`text-sm px-2 py-1 rounded border ${getTierColor(weapon.tier)}`}>
                              {weapon.tier}
                            </span>
                            <div className="text-right">
                              <div className="text-sm text-gray-400">Power</div>
                              <div className="text-lg font-bold text-energy-green">{weapon.power}</div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Sword size={64} className="text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400 mb-4">No weapons detected</p>
                    <p className="text-sm text-gray-500">Acquire Weapon NFTs to arm your resistance forces</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'lands' && (
              <div className="glassmorphism rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">NFT Lands</h3>
                  <div className="text-gray-400">
                    {mockLands.length} Territories
                  </div>
                </div>
                
                {mockLands.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockLands.map((land) => (
                      <motion.div
                        key={land.id}
                        className="bg-space-blue/30 rounded-lg p-4 border border-cosmic-purple/30"
                        whileHover={{ scale: 1.02, borderColor: 'rgba(255, 182, 30, 0.5)' }}
                      >
                        <div className="aspect-square bg-gradient-to-br from-cosmic-purple to-space-blue rounded-lg mb-4 flex items-center justify-center">
                          <MapPin size={48} className="text-nebula-pink" />
                        </div>
                        
                        {/* Land Details */}
                        <div className="space-y-3">
                          <h4 className="font-bold text-stellar-white text-lg">{land.name}</h4>
                          
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
                ) : (
                  <div className="text-center py-12">
                    <MapPin size={64} className="text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400 mb-4">No territories detected</p>
                    <p className="text-sm text-gray-500">Acquire Land NFTs to establish resistance bases</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'activities' && (
              <div className="glassmorphism rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-6">Battle Log</h3>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-4 bg-space-blue/30 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-meda-gold/20 flex items-center justify-center">
                          <GamepadIcon size={20} className="text-meda-gold" />
                        </div>
                        <div>
                          <div className="font-medium text-stellar-white">{activity.type}</div>
                          <div className="text-sm text-gray-400">{activity.timestamp}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-energy-green font-bold">+{activity.reward} MG</div>
                        <div className="text-xs text-gray-400">Meda Gas</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
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
    </div>
  );
};

export default ProfilePage;