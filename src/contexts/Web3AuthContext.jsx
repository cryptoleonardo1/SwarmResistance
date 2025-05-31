// Refresh Meda Gas balance
  const refreshMedaGasBalance = async () => {
    if (walletAddress) {
      await loadMedaGasBalance(walletAddress);
    }
  };import { createContext, useContext, useState, useEffect } from 'react';
import { Web3Auth } from "@web3auth/modal";
import { web3AuthConfig } from '../config/web3auth.config.js';
import { userProfileService } from '../services/userProfile.service.js';
import { tokenService } from '../services/tokenService.js';
import { nftService } from '../services/nftService.js';
import PropTypes from 'prop-types';
import { WalletConnectV2Adapter } from "@web3auth/wallet-connect-v2-adapter";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";

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
  const [medaGasBalance, setMedaGasBalance] = useState(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [nftHoldings, setNftHoldings] = useState(null);
  const [isLoadingNFTs, setIsLoadingNFTs] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId: web3AuthConfig.clientId,
          web3AuthNetwork: web3AuthConfig.web3AuthNetwork,
          chainConfig: web3AuthConfig.chainConfig,
          privateKeyProvider: web3AuthConfig.privateKeyProvider,
        });

        // Configure MetaMask Adapter
        const metamaskAdapter = new MetamaskAdapter({
          clientId: web3AuthConfig.clientId,
          sessionTime: 3600, // 1 hour in seconds
          web3AuthNetwork: web3AuthConfig.web3AuthNetwork,
          chainConfig: web3AuthConfig.chainConfig,
        });

        // Configure WalletConnect V2 Adapter
        const walletConnectV2Adapter = new WalletConnectV2Adapter({
          adapterSettings: {
            qrcodeModal: "walletconnect",
            chains: ["0x89"], // Polygon
            methods: ["eth_sendTransaction", "personal_sign"],
          },
          loginSettings: {
            projectId: "2c7fa3defb38afe9156f6e4a08cf4f0f", // Get your own from https://cloud.walletconnect.com
          },
          clientId: web3AuthConfig.clientId,
          web3AuthNetwork: web3AuthConfig.web3AuthNetwork,
          chainConfig: web3AuthConfig.chainConfig,
        });

        // Configure adapters - order matters for display
        web3auth.configureAdapter(metamaskAdapter);
        web3auth.configureAdapter(walletConnectV2Adapter);

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
            
            // Initialize token service
            await tokenService.initialize(web3authProvider);
            
            // Initialize NFT service
            await nftService.initialize(web3authProvider);
            
            // Load user profile
            const profile = userProfileService.getProfile(address);
            setUserProfile(profile);
            
            // Load Meda Gas balance
            await loadMedaGasBalance(address);
            
            // Load NFT holdings
            await loadNFTHoldings(address);
            
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

  // Load Meda Gas balance from blockchain
  const loadMedaGasBalance = async (address) => {
    if (!address) {
      return;
    }

    try {
      setIsLoadingBalance(true);
      
      // Initialize token service if not already done
      if (!tokenService.isInitialized() && provider) {
        await tokenService.initialize(provider);
      }
      
      if (tokenService.isInitialized()) {
        const balanceData = await tokenService.getMedaGasBalance(address);
        setMedaGasBalance(balanceData);
        
        // Update user profile with real balance
        if (balanceData && !balanceData.error) {
          userProfileService.updateProfile(address, {
            medaGas: balanceData.balance
          });
          setUserProfile(userProfileService.getProfile(address));
        }
      }
      
    } catch (error) {
      console.error("Error loading Meda Gas balance:", error);
      setMedaGasBalance({
        balance: 0,
        balanceFormatted: '0',
        balanceWei: '0',
        error: error.message
      });
    } finally {
      setIsLoadingBalance(false);
    }
  };

  // Load NFT holdings from blockchain
  const loadNFTHoldings = async (address) => {
    if (!address) {
      return;
    }

    try {
      setIsLoadingNFTs(true);
      
      // Initialize NFT service if not already done
      if (!nftService.isInitialized() && provider) {
        await nftService.initialize(provider);
      }
      
      if (nftService.isInitialized()) {
        const nftData = await nftService.getAllNFTs(address);
        setNftHoldings(nftData);
        console.log('Loaded NFT holdings:', nftData);
      }
      
    } catch (error) {
      console.error("Error loading NFT holdings:", error);
      setNftHoldings({
        heroes: { nfts: [], count: 0, error: error.message },
        weapons: { nfts: [], count: 0, error: error.message },
        lands: { nfts: [], count: 0, error: error.message },
        totalCount: 0
      });
    } finally {
      setIsLoadingNFTs(false);
    }
  };

  // Refresh NFT holdings
  const refreshNFTHoldings = async () => {
    if (walletAddress) {
      await loadNFTHoldings(walletAddress);
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
        
        // Initialize token service
        await tokenService.initialize(web3authProvider);
        
        // Initialize NFT service
        await nftService.initialize(web3authProvider);
        
        // Load/create user profile
        const profile = userProfileService.getProfile(address);
        
        // Load Meda Gas balance
        await loadMedaGasBalance(address);
        
        // Load NFT holdings
        await loadNFTHoldings(address);
        
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
      setMedaGasBalance(null);
      setIsLoadingBalance(false);
      setNftHoldings(null);
      setIsLoadingNFTs(false);
      
      // Reset token service
      tokenService.reset();
      
      // Reset NFT service
      nftService.reset();
      
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
    medaGasBalance,
    nftHoldings,
    isLoading,
    isLoadingBalance,
    isLoadingNFTs,
    login,
    logout,
    getUserInfo,
    getBalance,
    updateUserProfile,
    addMedaGas,
    refreshMedaGasBalance,
    refreshNFTHoldings,
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