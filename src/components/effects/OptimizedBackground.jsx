

const OptimizedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-void-black via-space-blue to-void-black opacity-95"></div>
      
      {/* Subtle noise texture for depth (pre-rendered png with very low opacity) */}
      <div className="absolute inset-0 opacity-5 bg-repeat" style={{ backgroundImage: "url('/noise-texture.png')", backgroundSize: '200px 200px' }}></div>
      
      {/* Optional: Strategically placed accent glows with very low opacity */}
      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full blur-[120px] bg-cosmic-purple/10"></div>
      <div className="absolute bottom-0 right-1/4 w-1/2 h-1/3 rounded-full blur-[100px] bg-meda-gold/5"></div>
    </div>
  );
};

export default OptimizedBackground;