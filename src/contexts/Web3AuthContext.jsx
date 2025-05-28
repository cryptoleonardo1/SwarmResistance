import { createContext, useContext, useState, useEffect } from 'react';
import { Web3Auth } from "@web3auth/modal";
import { web3AuthConfig } from '../config/web3auth.config';
import { userProfileService } from '../services/userProfile.service';
import PropTypes from 'prop-types';

const Web3AuthContext = createContext(null);

export const useWeb3Auth = () => {
  const context = useContext(Web3AuthContext);
  if (!context) {
    throw new Error("useWeb3Auth must be used within Web3AuthProvider");
  }
  return context;
};

export const Web3AuthProvider = ({ children }) => {
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [walletAddress, setWalletAddress] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId: web3AuthConfig.clientId,
          web3AuthNetwork: web3AuthConfig.web3AuthNetwork,
          chainConfig: web3AuthConfig.chainConfig,
          uiConfig: web3AuthConfig.uiConfig,
          privateKeyProvider: web3AuthConfig.privateKeyProvider,
        });

        await web3auth.initModal();

        setWeb3auth(web3auth);

        // Check if user is already logged in
        if (web3auth.connected) {
          const web3authProvider = web3auth.provider;
          setProvider(web3authProvider);
          
          const user = await web3auth.getUserInfo();
          setUser(user);
          
          // Get wallet address
          if (web3authProvider) {
            const address = await getAccounts(web3authProvider);
            setWalletAddress(address);
            
            // Load user profile
            const profile = userProfileService.getProfile(address);
            setUserProfile(profile);
            
            // Update profile with Web3Auth user info if available
            if (user && profile) {
              userProfileService.updateProfile(address, {
                email: user.email || profile.email,
                nickname: user.name || profile.nickname,
                avatar: user.profileImage || profile.avatar,
              });
              setUserProfile(userProfileService.getProfile(address));
            }
          }
        }
      } catch (error) {
        console.error("Error initializing Web3Auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  const getAccounts = async (provider) => {
    try {
      const { ethers } = await import("ethers");
      const ethersProvider = new ethers.BrowserProvider(provider);
      const signer = await ethersProvider.getSigner();
      const address = await signer.getAddress();
      return address;
    } catch (error) {
      console.error("Error getting accounts:", error);
      return null;
    }
  };

  const login = async () => {
    if (!web3auth) {
      console.error("Web3Auth not initialized");
      return;
    }

    try {
      const web3authProvider = await web3auth.connect();
      setProvider(web3authProvider);
      
      const user = await web3auth.getUserInfo();
      setUser(user);
      
      // Get wallet address
      if (web3authProvider) {
        const address = await getAccounts(web3authProvider);
        setWalletAddress(address);
        
        // Load/create user profile
        const profile = userProfileService.getProfile(address);
        
        // Update profile with Web3Auth user info
        if (user) {
          userProfileService.updateProfile(address, {
            email: user.email || profile.email,
            nickname: user.name || profile.nickname,
            avatar: user.profileImage || profile.avatar,
          });
        }
        
        setUserProfile(userProfileService.getProfile(address));
      }
      
      console.log("Logged in successfully!");
      return { user, provider: web3authProvider };
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  const logout = async () => {
    if (!web3auth) {
      console.error("Web3Auth not initialized");
      return;
    }

    try {
      await web3auth.logout();
      setProvider(null);
      setUser(null);
      setWalletAddress(null);
      setUserProfile(null);
      console.log("Logged out successfully!");
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  };

  const getUserInfo = async () => {
    if (!web3auth || !web3auth.connected) {
      return null;
    }

    try {
      const user = await web3auth.getUserInfo();
      return user;
    } catch (error) {
      console.error("Error getting user info:", error);
      return null;
    }
  };

  const getBalance = async () => {
    if (!provider || !walletAddress) return "0";
    
    try {
      const { ethers } = await import("ethers");
      const ethersProvider = new ethers.BrowserProvider(provider);
      const balance = await ethersProvider.getBalance(walletAddress);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error("Error getting balance:", error);
      return "0";
    }
  };

  const updateUserProfile = (updates) => {
    if (walletAddress) {
      const updated = userProfileService.updateProfile(walletAddress, updates);
      setUserProfile(updated);
      return updated;
    }
    return null;
  };

  const addMedaGas = (amount) => {
    if (walletAddress) {
      const updated = userProfileService.addMedaGas(walletAddress, amount);
      setUserProfile(updated);
      return updated;
    }
    return null;
  };

  const value = {
    web3auth,
    provider,
    user,
    walletAddress,
    userProfile,
    isLoading,
    login,
    logout,
    getUserInfo,
    getBalance,
    updateUserProfile,
    addMedaGas,
    isConnected: !!walletAddress,
  };

  return (
    <Web3AuthContext.Provider value={value}>
      {children}
    </Web3AuthContext.Provider>
  );
};

Web3AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};