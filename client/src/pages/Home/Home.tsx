import React from 'react';

import HeroSection from '../../components/HeroSection/Herosection';
import FeaturedBooks from '../../components/Featuredbooks/FeaturedBooks';
//import Testimonials from '../../components/Testimonials/Testimonials';
import BookGenres from '../../components/BookGenre/BookGenre';
import Footer from '../../components/Footer/Footer';
import './Home.css';

const HomePage :React.FC = () => {
  return (
    <div className="homepage">
      
      <HeroSection imageUrl={'/public/7945313.jpg'} title={'Shop Now'} subtitle={''} />
      <FeaturedBooks />
      <BookGenres/>
      <Footer />
    </div>
  );
};

export default HomePage;

