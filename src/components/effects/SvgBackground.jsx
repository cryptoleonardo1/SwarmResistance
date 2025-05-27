
const SvgBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-void-black">
      {/* SVG pattern - more efficient than many DOM elements */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Strategic accent circles - just a few key elements */}
        <circle cx="20%" cy="30%" r="5%" fill="rgba(74, 43, 159, 0.05)" />
        <circle cx="80%" cy="60%" r="7%" fill="rgba(255, 182, 30, 0.03)" />
        <circle cx="50%" cy="20%" r="4%" fill="rgba(0, 240, 255, 0.04)" />
      </svg>
    </div>
  );
};

export default SvgBackground;