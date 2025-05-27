import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, Info, RefreshCw, Copy, X } from 'lucide-react';

// Main ChatbotPage component that implements the AI assistant interface
// following the Cryptomeda design system and documentation
const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Welcome to Cryptomeda AI Assistant. How can I help you with the ecosystem today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Sample questions
  const sampleQueries = [
    "Which heroes are best for mining Meda Gas?",
    "How do I enhance my weapons for maximum effectiveness?",
    "What's the current floor price for rare Renegade heroes?",
    "Tell me the backstory of the Goliath Nation.",
    "What's the most efficient land development strategy?",
    "When is the next faction war scheduled?"
  ];

  // Handle sending a message
  const handleSendMessage = (content = input) => {
    if (!content.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, {
      role: 'user',
      content,
      timestamp: new Date()
    }]);
    
    setInput('');
    setIsTyping(true);
    
    // Simulate AI response (replace with actual API call in production)
    setTimeout(() => {
      const responses = {
        "Which heroes are best for mining Meda Gas?": 
          "The most efficient heroes for Meda Gas mining are those with the 'Resource Generator' trait. Top performers include:\n\n• ATOM (Legendary) - 150% mining efficiency\n• Engineer (Epic) - 135% mining efficiency\n• Miner (Rare) - 120% mining efficiency\n\nFor optimal results, equip these heroes with Mining Amplifier weapons and deploy them on rare or higher land parcels with natural resource nodes.",
        
        "How do I enhance my weapons for maximum effectiveness?": 
          "To maximize weapon effectiveness:\n\n1. Use the Fusion Chamber in the Marketplace section\n2. Combine two weapons of the same rarity for a chance at a higher tier\n3. Add Meda Gas catalysts to increase success probability (20% per 500 Meda Gas)\n4. Match elemental types for better stat bonuses\n5. Premium members receive a 15% boost to all enhancement chances",
        
        "What's the current floor price for rare Renegade heroes?": 
          "Current marketplace data shows that rare Renegade heroes have a floor price of 0.045 ETH (approximately $157.50). This represents a 12% increase over the past 7 days. The most liquid heroes in this category are Engineer, Scout, and Medic, each with 20+ listings available.",
        
        "Tell me the backstory of the Goliath Nation.": 
          "The Goliath Nation emerged from the corporate mega-structures of the late 24th century. Founded by Director Maximilian Thorpe, they believe in order through technological advancement and rigid hierarchy.\n\nAfter the Quantum Collapse of 2389, they established control over the primary Meda Gas refineries, allowing them to build their technocratic society. Their citizens benefit from enhanced cybernetic implants, but must follow the strict 'Protocols of Efficiency.'\n\nTheir ongoing conflict with the Renegades stems from fundamentally opposing views on resource distribution and individual freedom.",
        
        "What's the most efficient land development strategy?": 
          "The optimal land development strategy follows the '4-2-1' approach:\n\n• 4 resource-focused parcels (with mining heroes)\n• 2 defensive parcels (with sentinel heroes)\n• 1 connector parcel (for transportation bonuses)\n\nPlace these in a hexagonal pattern for adjacency bonuses. Focus initial development on resource nodes, then reinvest Meda Gas into defense upgrades once production is stable. Premium members should prioritize rare lands in the Alpha Quadrant for best ROI.",
        
        "When is the next faction war scheduled?": 
          "The next Faction War is scheduled for May 21-23, 2025. The primary battlefield will be the newly discovered Cygnus Sector, rich with Meda Gas deposits. Participating requires at least one hero of Rare or higher rarity. Rewards include limited-edition weapon schematics, territory control, and bonus Meda Gas production for the winning faction."
      };
      
      // Default response for any other query
      let responseText = "I don't have specific information about that yet. As the Cryptomeda ecosystem develops, I'll learn more about this topic. In the meantime, would you like to know about heroes, weapons, land systems, or the upcoming Meda token launch?";
      
      // Check if we have a predefined answer
      if (responses[content]) {
        responseText = responses[content];
      }
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: responseText,
        timestamp: new Date()
      }]);
      
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Format timestamps
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-9rem)] pb-16">
      {/* Header Section */}
      <motion.div 
        className="panel mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-cosmic-purple/50 flex items-center justify-center mr-4">
            <Bot size={28} className="text-neon-cyan" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-stellar-white">Universal Intelligence</h1>
            <p className="text-gray-400">Your AI companion in the Cryptomeda universe</p>
          </div>
          <button 
            onClick={() => setShowInfo(!showInfo)} 
            className="ml-auto text-gray-400 hover:text-neon-cyan transition-colors"
            title={showInfo ? "Hide information" : "Show information"}
          >
            {showInfo ? <X size={20} /> : <Info size={20} />}
          </button>
        </div>

        {/* Info Panel - Shown when info button is clicked */}
        {showInfo && (
          <motion.div 
            className="bg-void-black/50 rounded-lg p-4 mb-4 border border-cosmic-purple/30"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-neon-cyan font-bold mb-2">AI Assistant Features</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="text-meda-gold mb-1">Comprehensive Knowledge</h4>
                <ul className="text-gray-300 space-y-1">
                  <li>• Complete details on all NFT abilities</li>
                  <li>• In-depth game mechanics explanations</li>
                  <li>• Cryptomeda universe lore and history</li>
                  <li>• Market analytics and trading advice</li>
                </ul>
              </div>
              <div>
                <h4 className="text-meda-gold mb-1">Real-Time Data</h4>
                <ul className="text-gray-300 space-y-1">
                  <li>• Current Meda Gas production rates</li>
                  <li>• Live price feeds for assets</li>
                  <li>• Tournament standings and updates</li>
                  <li>• Network status and gas fees</li>
                </ul>
              </div>
              <div>
                <h4 className="text-meda-gold mb-1">Personalized Assistance</h4>
                <ul className="text-gray-300 space-y-1">
                  <li>• Custom gameplay recommendations</li>
                  <li>• Strategic advice for your assets</li>
                  <li>• Tailored educational content</li>
                  <li>• Enhanced features for Premium members</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Chat Container */}
      <div className="flex flex-col h-[calc(100vh-16rem)]">
        <div className="panel flex-grow overflow-y-auto mb-4 p-0">
          <div className="p-4 md:p-6 h-full overflow-y-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${message.role === 'user' ? 'bg-cosmic-purple/50' : 'bg-void-black/50'} rounded-lg px-4 py-3 ${message.role === 'user' ? 'rounded-tr-none' : 'rounded-tl-none'}`}>
                    {message.role === 'assistant' && (
                      <div className="flex items-center mb-2">
                        <div className="w-6 h-6 rounded-full bg-cosmic-purple/50 flex items-center justify-center mr-2">
                          <Bot size={14} className="text-neon-cyan" />
                        </div>
                        <span className="text-xs text-neon-cyan font-semibold">AI Assistant</span>
                        <span className="text-xs text-gray-500 ml-auto">{formatTime(message.timestamp)}</span>
                      </div>
                    )}
                    <div className={`${message.role === 'assistant' ? 'text-gray-300' : 'text-stellar-white'} whitespace-pre-line`}>
                      {message.content}
                    </div>
                    {message.role === 'user' && (
                      <div className="flex justify-end mt-1">
                        <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  variants={itemVariants}
                  className="flex justify-start"
                >
                  <div className="bg-void-black/50 rounded-lg rounded-tl-none px-4 py-3 flex items-center">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </motion.div>
          </div>
        </div>

        {/* Sample Queries */}
        <motion.div 
          className="mb-4 overflow-x-auto whitespace-nowrap px-2 py-1 hide-scrollbar"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex space-x-2">
            {sampleQueries.map((query, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(query)}
                className="text-sm bg-cosmic-purple/30 hover:bg-cosmic-purple/50 text-gray-300 rounded-full px-4 py-2 whitespace-nowrap transition-colors"
              >
                {query}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Input Container */}
        <div className="panel p-4 relative">
          <div className="flex items-end">
            <div className="relative flex-grow">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about Cryptomeda..."
                className="bg-void-black/50 text-stellar-white w-full rounded-lg py-3 px-4 outline-none border border-cosmic-purple/30 focus:border-neon-cyan transition-colors resize-none min-h-[60px] max-h-[120px] pr-12"
                rows="1"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!input.trim() || isTyping}
                className={`absolute right-3 bottom-3 ${!input.trim() || isTyping ? 'opacity-50 cursor-not-allowed' : 'hover:bg-cosmic-purple/50'} p-2 rounded-full bg-cosmic-purple/20 transition-colors`}
              >
                <Send size={18} className="text-neon-cyan" />
              </button>
            </div>
          </div>
          <div className="flex justify-between mt-3 text-gray-500 text-xs">
            <div className="flex items-center">
              <span className="mr-2">Actions:</span>
              <button 
                title="Copy conversation" 
                className="p-1 hover:text-neon-cyan transition-colors"
                onClick={() => alert('Conversation copied to clipboard')}
              >
                <Copy size={14} />
              </button>
              <button 
                title="Reset conversation" 
                className="p-1 hover:text-neon-cyan transition-colors"
                onClick={() => {
                  setMessages([{
                    role: 'assistant',
                    content: 'Welcome to Cryptomeda AI Assistant. How can I help you with the ecosystem today?',
                    timestamp: new Date()
                  }]);
                }}
              >
                <RefreshCw size={14} />
              </button>
            </div>
            <span>Premium users receive prioritized responses and advanced analyses</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;