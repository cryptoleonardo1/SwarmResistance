import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Zap, Edit2, Save, X } from 'lucide-react';
import { useWeb3Auth } from '../contexts/Web3AuthContext';
import { RANKS } from '../services/userProfile.service';

const ProfilePage = () => {
  const { userProfile, updateUserProfile, isConnected } = useWeb3Auth();
  const [isEditing, setIsEditing] = useState(false);
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
      <div className="flex items-center justify-center min-h-[calc(100vh-16rem)]">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl text-gray-400 mb-4">Please connect your wallet to view your profile</h2>
        </motion.div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-16rem)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-meda-gold mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  const handleSaveProfile = () => {
    updateUserProfile(editedProfile);
    setIsEditing(false);
  };

  const currentRankInfo = RANKS.find(r => r.name === userProfile.rank);
  const nextRankInfo = RANKS.find(r => r.minGas > userProfile.medaGas);
  const progressToNextRank = nextRankInfo 
    ? ((userProfile.medaGas - (currentRankInfo?.minGas || 0)) / (nextRankInfo.minGas - (currentRankInfo?.minGas || 0))) * 100
    : 100;

  return (
    <motion.div 
      className="max-w-6xl mx-auto py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Profile Header */}
      <motion.div 
        className="glassmorphism rounded-lg p-6 mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar */}
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-32 h-32 rounded-full border-4 border-meda-gold overflow-hidden">
              <img 
                src={userProfile.avatar} 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <div 
              className="absolute -bottom-2 -right-2 bg-meda-gold rounded-full p-2 text-void-black"
              style={{ backgroundColor: currentRankInfo?.color }}
            >
              <Trophy size={20} />
            </div>
          </motion.div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editedProfile.nickname}
                  onChange={(e) => setEditedProfile({ ...editedProfile, nickname: e.target.value })}
                  className="bg-space-blue/50 border border-cosmic-purple/30 rounded-lg px-4 py-2 text-stellar-white"
                  placeholder="Nickname"
                />
                <input
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                  className="bg-space-blue/50 border border-cosmic-purple/30 rounded-lg px-4 py-2 text-stellar-white ml-2"
                  placeholder="Email"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center gap-2 px-4 py-2 bg-energy-green/20 hover:bg-energy-green/30 rounded-lg transition-colors"
                  >
                    <Save size={16} />
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditedProfile({
                        nickname: userProfile.nickname || '',
                        email: userProfile.email || '',
                      });
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-nebula-pink/20 hover:bg-nebula-pink/30 rounded-lg transition-colors"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-4 mb-2">
                  <h1 className="text-3xl font-bold">{userProfile.nickname}</h1>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-gray-400 hover:text-neon-cyan transition-colors"
                  >
                    <Edit2 size={20} />
                  </button>
                </div>
                <p className="text-gray-400 mb-4">{userProfile.email || 'No email set'}</p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Trophy size={20} className="text-meda-gold" />
                    <span className="text-xl font-medium" style={{ color: currentRankInfo?.color }}>
                      {userProfile.rank}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap size={20} className="text-energy-green" />
                    <span className="text-xl">{userProfile.medaGas.toLocaleString()} Meda Gas</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Rank Progress */}
        {!isEditing && nextRankInfo && (
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Progress to {nextRankInfo.name}</span>
              <span className="text-gray-400">
                {userProfile.medaGas.toLocaleString()} / {nextRankInfo.minGas.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-space-blue/50 rounded-full h-3 overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-meda-gold to-neon-cyan"
                initial={{ width: 0 }}
                animate={{ width: `${progressToNextRank}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        )}
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div 
          className="glassmorphism rounded-lg p-6 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-lg text-gray-400 mb-2">Games Played</h3>
          <p className="text-3xl font-bold text-neon-cyan">{userProfile.stats.gamesPlayed}</p>
        </motion.div>

        <motion.div 
          className="glassmorphism rounded-lg p-6 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-lg text-gray-400 mb-2">Total Wins</h3>
          <p className="text-3xl font-bold text-energy-green">{userProfile.stats.totalWins}</p>
        </motion.div>

        <motion.div 
          className="glassmorphism rounded-lg p-6 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-lg text-gray-400 mb-2">NFTs Owned</h3>
          <p className="text-3xl font-bold text-nebula-pink">{userProfile.stats.nftsOwned}</p>
        </motion.div>
      </div>

      {/* Achievements Section */}
      <motion.div 
        className="glassmorphism rounded-lg p-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4">Achievements</h2>
        {userProfile.achievements.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {userProfile.achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                className="bg-space-blue/50 rounded-lg p-4 text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <h3 className="text-sm font-medium">{achievement.name}</h3>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-8">No achievements yet. Start playing to earn achievements!</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProfilePage;