import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';

const AboutUs: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      avatarUrl: '..//../../public/cheerful-indian-businessman-smiling-closeup-portrait-jobs-career-campaign.jpg',
      quote: "Bookworm's Paradise is my favorite place to discover new books and authors. The staff is incredibly knowledgeable and always has great recommendations.",
      name: 'Jane Smith'
    },
    {
      avatarUrl: '..//../../public/handsome-young-man-with-new-stylish-haircut.jpg',
      quote: "I've been coming to Bookworm's Paradise for years, and it's like a second home to me. The selection is unbeatable, and the atmosphere is so inviting.",
      name: 'Michael Johnson'
    },
    {
      avatarUrl: '..//../../public/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction.jpg',
      quote: "As an avid reader, I've been to many bookstores, but Bookworm's Paradise stands out for its warmth and charm. It's a gem in our community.",
      name: 'Emily Brown'
    }
  ];

  const handleNextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  return (
    <div className="about-us">
      <section className="section section--introduction">
        <h1 className="section__title">Welcome to Bookworm's Paradise</h1>
        <p className="section__text">
          Welcome to our cozy little bookstore nestled in the heart of [City Name]. At Bookworm's Paradise, we are passionate about books and
          dedicated to providing our customers with an unparalleled reading experience.
        </p>
      </section>

      <section className="section section--history">
        <h2 className="section__title">Our History</h2>
        <p className="section__text">
          Bookworm's Paradise was founded in [Year] by [Founder's Name], a lifelong bibliophile with a dream of creating a haven for book lovers.
          What started as a small storefront has grown into a beloved destination for readers of all ages and interests.
        </p>
        <p className="section__text">
          Over the years, we've expanded our collection, hosted countless author events, and built a vibrant community of book enthusiasts.
          Our passion for books has only grown stronger, and we remain committed to providing a warm and welcoming space for anyone seeking
          their next literary adventure.
        </p>
      </section>

      <section className="section section--mission">
        <h2 className="section__title">Our Mission and Values</h2>
        <p className="section__text">
          At Bookworm's Paradise, our mission is to foster a love of reading and provide a curated selection of books that inspire, educate, and
          entertain. We believe that books have the power to transport us to new worlds, introduce us to diverse perspectives, and spark
          meaningful conversations.
        </p>
        <p className="section__text">
          Our values are rooted in excellent customer service, a commitment to diversity and inclusion, and a deep respect for the written word.
          We strive to create an environment where everyone feels welcome, and where the joy of reading is celebrated.
        </p>
      </section>

      <section className="section section--team">
        <h2 className="section__title">Our Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member" className="team-member__photo" />
            <h3 className="team-member__name">John Doe</h3>
            <p className="team-member__bio">Owner and Founder</p>
          </div>
          
        </div>
      </section>

      <section className="section section--community">
        <h2 className="section__title">Community Involvement</h2>
        <p className="section__text">
          Bookworm's Paradise is deeply rooted in the local community. We partner with schools, libraries, and nonprofit organizations to
          promote literacy and a love of reading. Our bookstore hosts regular book clubs, author events, and writing workshops open to
          the public.
        </p>
        <p className="section__text">
          We also support local charities through book drives and fundraising initiatives. Our goal is to make books accessible to everyone,
          regardless of their circumstances, and to create a vibrant literary culture within our community.
        </p>
      </section>

      <section className="section section--testimonials">
        <h2 className="section__title">What Our Customers Say</h2>
        <div className="testimonials">
          <div className="testimonial">
            <img src={testimonials[currentIndex].avatarUrl} alt="Customer Avatar" className="testimonial__avatar" />
            <blockquote className="testimonial__quote">
              {testimonials[currentIndex].quote}
            </blockquote>
            <p className="testimonial__name">- {testimonials[currentIndex].name}</p>
          </div>
          <button onClick={handlePrevTestimonial} className="testimonial__nav-btn">Prev</button>
          <button onClick={handleNextTestimonial} className="testimonial__nav-btn">Next</button>
        </div>
      </section>

      <section className="section section--contact">
        <h2 className="section__title">Get in Touch</h2>
        <p className="section__text">Have a question, comment, or just want to chat about books? We'd love to hear from you!</p>
        <Link to="/contact" className="btn">
          Contact Us
        </Link>
      </section>
    </div>
  );
};

export default AboutUs;
