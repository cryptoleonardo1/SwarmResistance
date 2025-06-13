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

// Import Ready Pages
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ChatbotPage from './pages/ChatbotPage';
import StoryPage from './pages/StoryPage';
import SettingsPage from './pages/SettingsPage';
import JoinResistancePage from './pages/JoinResistancePage';

// Import Coming Soon Pages
import MarketplacePage from './pages/MarketplacePage';
import AICommanderPage from './pages/AICommanderPage';
import BlogPage from './pages/BlogPage';
//import JoinResistanceComingSoonPage from './pages/JoinResistanceComingSoonPage';

// Import existing Join Resistance page (if you want to keep it as backup)
// import JoinResistancePage from './pages/JoinResistancePage';

// Placeholder for future page components
const NFTPage = () => <div className="p-8">NFT Explanations & Concepts (Coming Soon)</div>;

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

  // Check if current route should have full-screen layout (no margins/padding)
  const isFullScreenRoute = [
    '/', 
    '/join-resistance', 
    '/story', 
    '/marketplace',
    '/ai-commander',
    '/blog'
  ].includes(location.pathname);

  return (
    <div className="app relative min-h-screen">
      <OptimizedGpuBackground />
      
      {/* Desktop Sidebar - always expanded */}
      <Sidebar />
      
      {/* Top Navigation Bar */}
      <TopBar />
      
      {/* Main Content - conditional margins based on route */}
      <main className={`transition-all duration-400 ${
        isFullScreenRoute
          ? '' 
          : 'md:ml-64 pt-16 pb-20 px-4 sm:px-6 md:px-8'
      }`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/nft" element={<NFTPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/join-resistance" element={<JoinResistancePage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/ai-commander" element={<AICommanderPage />} />
        </Routes>
      </main>
      
      {/* Mobile Navigation */}
      <MobileNav isOpen={mobileMenuOpen} toggleMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
    </div>
  );
}

export default App;