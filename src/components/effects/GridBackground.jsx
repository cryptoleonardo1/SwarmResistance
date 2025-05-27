
const GridBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base color */}
      <div className="absolute inset-0 bg-void-black"></div>
      
      {/* Grid overlay - using CSS background for better performance */}
      <div className="absolute inset-0 bg-cyber-grid bg-[length:50px_50px] opacity-10"></div>
      
      {/* Vignette effect around edges */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-void-black opacity-70"></div>
    </div>
  );
};

export default GridBackground;