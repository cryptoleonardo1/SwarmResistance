

const OptimizedGpuBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-void-black">
      {/* Base grid pattern - static, no animation */}
      <div className="absolute inset-0 bg-cyber-grid bg-[length:50px_50px] opacity-10"></div>
      
      {/* Just 3-4 strategic accent elements with GPU-accelerated transforms */}
      <div className="absolute left-1/4 top-1/4 w-1/3 h-1/3 rounded-full bg-cosmic-purple/5 blur-[60px] animate-float-very-slow opacity-40" 
           style={{ animationDelay: '-3s', transform: 'translateZ(0)' }}></div>
      
      <div className="absolute right-1/4 bottom-1/4 w-1/4 h-1/4 rounded-full bg-meda-gold/5 blur-[50px] animate-float-very-slow opacity-30"
           style={{ animationDelay: '-5s', transform: 'translateZ(0)' }}></div>
      
      <div className="absolute left-1/2 top-1/2 w-1/5 h-1/5 rounded-full bg-neon-cyan/5 blur-[40px] animate-float-very-slow opacity-20"
           style={{ animationDelay: '-8s', transform: 'translateZ(0)' }}></div>
    </div>
  );
};

export default OptimizedGpuBackground;