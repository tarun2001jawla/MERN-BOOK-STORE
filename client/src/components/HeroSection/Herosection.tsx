import React from 'react';
import './HeroSection.css'

interface HeroSectionProps {
  imageUrl: string;
  title: string;
  subtitle: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ imageUrl, title, subtitle }) => {
  return (
    <div className="hero-section">
      <img src={imageUrl} alt="Hero" className="hero-section__image" />
      <div className="hero-section__content">
        <h1 className="hero-section__title">{title}</h1>
        <p className="hero-section__subtitle">{subtitle}</p>
      </div>
    </div>
  );
};

export default HeroSection;