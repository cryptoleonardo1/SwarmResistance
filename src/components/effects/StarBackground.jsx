import { useEffect, useState } from 'react';

const StarBackground = () => {
  const [stars, setStars] = useState([]);
  
  useEffect(() => {
    // Generate random stars
    const generateStars = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const numberOfStars = Math.floor((windowWidth * windowHeight) / 10000); // Adjust density as needed
      
      const newStars = [];
      
      for (let i = 0; i < numberOfStars; i++) {
        newStars.push({
          id: i,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          size: `${0.5 + Math.random() * 2}px`,
          animationDuration: `${3 + Math.random() * 7}s`,
          animationDelay: `${Math.random() * 5}s`,
          opacity: 0.1 + Math.random() * 0.7
        });
      }
      
      setStars(newStars);
    };
    
    // Generate stars initially
    generateStars();
    
    // Regenerate on window resize
    const handleResize = () => {
      generateStars();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDuration: star.animationDuration,
            animationDelay: star.animationDelay,
            opacity: star.opacity
          }}
        />
      ))}
    </div>
  );
};

export default StarBackground;