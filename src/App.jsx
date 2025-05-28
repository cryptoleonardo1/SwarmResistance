import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

// Import Web3Auth Provider
import { Web3AuthProvider } from './contexts/Web3AuthContext';

// Import Components
import Sidebar from './components/navigation/Sidebar';
import TopBar from './components/navigation/TopBar';
import MobileNav from './components/navigation/MobileNav';
import OptimizedGpuBackground from './components/effects/OptimizedGpuBackground';
import HomePage from './pages/HomePage';
import ChatbotPage from './pages/ChatbotPage';
import StoryPage from './pages/StoryPage';

// Placeholder for future page components
const ProfilePage = () => <div className="p-8">Profile Page (Coming Soon)</div>;
const NFTPage = () => <div className="p-8">NFT Explanations & Concepts (Coming Soon)</div>;
const MarketplacePage = () => <div className="p-8">Marketplace (Coming Soon)</div>;
const GamingPage = () => <div className="p-8">Gaming Hub - Meda Wars, Meda Shooter & More (Coming Soon)</div>;

// Main App Wrapper
function App() {
  return (
    <Web3AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </Web3AuthProvider>
  );
}

// Content component with access to location
function AppContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    // Detect if device might have performance issues
    const isLowPerfDevice = window.navigator.hardwareConcurrency < 4 || 
                            /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isLowPerfDevice) {
      document.documentElement.style.setProperty('--animation-speed', '0.7'); // 70% speed
      document.documentElement.style.setProperty('--animation-complexity', 'reduced');
    } else {
      document.documentElement.style.setProperty('--animation-speed', '1');
      document.documentElement.style.setProperty('--animation-complexity', 'full');
    }
  }, []);

  return (
    <div className="app relative min-h-screen">
      <OptimizedGpuBackground />
      
      {/* Desktop Sidebar - always expanded */}
      <Sidebar />
      
      {/* Top Navigation Bar */}
      <TopBar />
      
      {/* Main Content - no margins for homepage */}
      <main className={`transition-all duration-400 ${location.pathname === '/' ? '' : 'md:ml-64 pt-16 pb-20 px-4 sm:px-6 md:px-8'}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/nft" element={<NFTPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/gaming" element={<GamingPage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
        </Routes>
      </main>
      
      {/* Mobile Navigation */}
      <MobileNav isOpen={mobileMenuOpen} toggleMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
    </div>
  );
}

export default App;