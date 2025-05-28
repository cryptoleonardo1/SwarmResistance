// User Profile Service
// This manages user data like Meda Gas, Rank, Avatar, Nickname
// For now, we'll use localStorage, but you can replace this with a backend API later

const USER_PROFILE_KEY = 'cryptomeda_user_profiles';

// Default user profile structure
const defaultProfile = {
  walletAddress: '',
  nickname: '',
  avatar: '/atom.png',
  rank: 'Explorer',
  medaGas: 0,
  email: '',
  joinDate: new Date().toISOString(),
  achievements: [],
  stats: {
    gamesPlayed: 0,
    totalWins: 0,
    nftsOwned: 0,
  }
};

// Rank thresholds based on Meda Gas
const RANKS = [
  { name: 'Explorer', minGas: 0, color: '#9CA3AF' },
  { name: 'Pioneer', minGas: 100, color: '#60A5FA' },
  { name: 'Voyager', minGas: 500, color: '#A78BFA' },
  { name: 'Navigator', minGas: 1000, color: '#F59E0B' },
  { name: 'Captain', minGas: 5000, color: '#EF4444' },
  { name: 'Admiral', minGas: 10000, color: '#EC4899' },
  { name: 'Commander', minGas: 50000, color: '#8B5CF6' },
  { name: 'Legend', minGas: 100000, color: '#FFB61E' },
];

class UserProfileService {
  constructor() {
    this.profiles = this.loadProfiles();
  }

  // Load profiles from localStorage
  loadProfiles() {
    try {
      const stored = localStorage.getItem(USER_PROFILE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error loading profiles:', error);
      return {};
    }
  }

  // Save profiles to localStorage
  saveProfiles() {
    try {
      localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(this.profiles));
    } catch (error) {
      console.error('Error saving profiles:', error);
    }
  }

  // Get or create user profile
  getProfile(walletAddress) {
    if (!walletAddress) return null;
    
    const address = walletAddress.toLowerCase();
    
    if (!this.profiles[address]) {
      this.profiles[address] = {
        ...defaultProfile,
        walletAddress: address,
        nickname: `User${address.slice(-4)}`, // Default nickname
      };
      this.saveProfiles();
    }
    
    // Update rank based on current Meda Gas
    const profile = this.profiles[address];
    profile.rank = this.calculateRank(profile.medaGas);
    
    return profile;
  }

  // Update user profile
  updateProfile(walletAddress, updates) {
    if (!walletAddress) return null;
    
    const address = walletAddress.toLowerCase();
    const profile = this.getProfile(address);
    
    if (profile) {
      // Merge updates
      this.profiles[address] = {
        ...profile,
        ...updates,
        walletAddress: address, // Ensure address doesn't change
      };
      
      // Recalculate rank if Meda Gas changed
      if (updates.medaGas !== undefined) {
        this.profiles[address].rank = this.calculateRank(this.profiles[address].medaGas);
      }
      
      this.saveProfiles();
      return this.profiles[address];
    }
    
    return null;
  }

  // Add Meda Gas to user
  addMedaGas(walletAddress, amount) {
    const profile = this.getProfile(walletAddress);
    if (profile) {
      return this.updateProfile(walletAddress, {
        medaGas: profile.medaGas + amount
      });
    }
    return null;
  }

  // Calculate rank based on Meda Gas
  calculateRank(medaGas) {
    for (let i = RANKS.length - 1; i >= 0; i--) {
      if (medaGas >= RANKS[i].minGas) {
        return RANKS[i].name;
      }
    }
    return RANKS[0].name;
  }

  // Get rank info
  getRankInfo(rankName) {
    return RANKS.find(r => r.name === rankName) || RANKS[0];
  }

  // Get next rank info
  getNextRank(currentRank) {
    const currentIndex = RANKS.findIndex(r => r.name === currentRank);
    if (currentIndex < RANKS.length - 1) {
      return RANKS[currentIndex + 1];
    }
    return null;
  }

  // Update game stats
  updateGameStats(walletAddress, stats) {
    const profile = this.getProfile(walletAddress);
    if (profile) {
      return this.updateProfile(walletAddress, {
        stats: {
          ...profile.stats,
          ...stats
        }
      });
    }
    return null;
  }

  // Add achievement
  addAchievement(walletAddress, achievement) {
    const profile = this.getProfile(walletAddress);
    if (profile && !profile.achievements.find(a => a.id === achievement.id)) {
      return this.updateProfile(walletAddress, {
        achievements: [...profile.achievements, {
          ...achievement,
          unlockedAt: new Date().toISOString()
        }]
      });
    }
    return null;
  }

  // Get leaderboard
  getLeaderboard(limit = 10) {
    const profiles = Object.values(this.profiles);
    return profiles
      .sort((a, b) => b.medaGas - a.medaGas)
      .slice(0, limit)
      .map((profile, index) => ({
        ...profile,
        position: index + 1
      }));
  }

  // Clear all profiles (for testing)
  clearAllProfiles() {
    this.profiles = {};
    this.saveProfiles();
  }
}

// Export singleton instance
export const userProfileService = new UserProfileService();

// Export additional utilities
export { RANKS, defaultProfile };