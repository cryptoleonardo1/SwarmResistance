import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { 
  User, 
  ShoppingBag, 
  Gamepad2, 
  Gem,
  ChevronUp,
  Menu, 
  Book,
  Bot
} from 'lucide-react';

const MobileNav = ({ isOpen, toggleMenu }) => {
  // Main navigation items for bottom bar - removed Home
  const mainNavItems = [
    { icon: <User size={20} />, text: 'Profile', path: '/profile' },
    { icon: <Gem size={20} />, text: 'NFT', path: '/nft' },
    { icon: <ShoppingBag size={20} />, text: 'Market', path: '/marketplace' },
    { icon: <Gamepad2 size={20} />, text: 'Join Resistance', path: '/joinresistance' },
    { icon: <Menu size={20} />, text: 'More', path: '#', action: toggleMenu },
  ];

  // Extended navigation items for expanded menu
  const extendedNavItems = [
    { icon: <Book size={20} />, text: 'Story', path: '/story' },
    { icon: <Bot size={20} />, text: 'AI Assistant', path: '/chatbot' },
  ];

  return (
    <>
      {/* Bottom Navigation Bar */}
      <div className="mobile-nav bg-void-black border-t border-cosmic-purple/30">
        {mainNavItems.map((item, index) => (
          item.action ? (
            <button 
              key={index}
              onClick={item.action}
              className="flex flex-col items-center justify-center w-full py-2 text-gray-400 hover:text-neon-cyan"
            >
              {isOpen ? <ChevronUp size={20} /> : item.icon}
              <span className="text-xs mt-1">{item.text}</span>
            </button>
          ) : (
            <NavLink 
              key={index}
              to={item.path}
              className={({ isActive }) => 
                `flex flex-col items-center justify-center w-full py-2 ${isActive ? 'text-neon-cyan' : 'text-gray-400 hover:text-neon-cyan'}`
              }
            >
              {item.icon}
              <span className="text-xs mt-1">{item.text}</span>
            </NavLink>
          )
        ))}
      </div>

      {/* Expanded Menu */}
      {isOpen && (
        <div className="fixed bottom-16 left-0 right-0 bg-void-black border-t border-cosmic-purple/30 p-4 z-40 lg:hidden">
          <div className="grid grid-cols-2 gap-4">
            {extendedNavItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) => 
                  `flex flex-col items-center justify-center p-3 rounded-lg ${
                    isActive 
                      ? 'bg-space-blue/70 text-neon-cyan border border-cosmic-purple/50' 
                      : 'text-gray-400 hover:text-neon-cyan hover:bg-space-blue/30'
                  }`
                }
                onClick={toggleMenu}
              >
                {item.icon}
                <span className="text-xs mt-2">{item.text}</span>
              </NavLink>
            ))}
          </div>
          
          {/* Quick Actions */}
          <div className="mt-4 flex justify-center">
            <button className="btn-primary text-xs py-2 px-4">Connect Wallet</button>
          </div>
        </div>
      )}
    </>
  );
};

// Add prop validation
MobileNav.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired
};

export default MobileNav;