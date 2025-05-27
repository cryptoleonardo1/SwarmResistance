import { useEffect, useRef } from 'react';

const StarfieldBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let stars = [];
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Regenerate stars when canvas is resized
      initStars();
    };
    
    // Initialize stars
    const initStars = () => {
      const starCount = Math.min(window.innerWidth, window.innerHeight) * 0.2; // Responsive star count
      stars = [];
      
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          opacity: Math.random() * 0.8 + 0.1,
          speed: Math.random() * 0.05,
          color: Math.random() > 0.3 ? 
            `rgba(255, 255, 255, ${Math.random() * 0.7 + 0.3})` : 
            `rgba(${Math.random() > 0.5 ? '0, 240, 255' : '255, 182, 30'}, ${Math.random() * 0.5 + 0.1})`
        });
      }
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw stars
      stars.forEach(star => {
        // Update position
        star.y += star.speed;
        
        // Reset if star goes beyond canvas
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        
        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Initialize and start animation
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-5"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default StarfieldBackground;