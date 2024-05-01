import React from 'react';

const HeroSection = ({ imageUrl }) => {
  return (
    <div className="hero-section">
      <img src={imageUrl} style={{ width: '100%', height: 'auto' }} alt="Banner" />
    </div>
  );
};

export default HeroSection;