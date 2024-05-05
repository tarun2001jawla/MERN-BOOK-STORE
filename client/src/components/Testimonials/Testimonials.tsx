import React from 'react';
import './Testimonials.css'

const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    quote: 'This bookstore has an amazing selection of books! I always find something new and exciting to read.',
    avatarUrl: '../../../public/handsome-young-man-with-new-stylish-haircut.jpg',
  },
  {
    id: 2,
    name: 'Jane Smith',
    quote: 'I love the cozy atmosphere and friendly staff. They always have great recommendations for me.',
    avatarUrl: '../../../public/cheerful-indian-businessman-smiling-closeup-portrait-jobs-career-campaign.jpg',
  },
  {
    id: 3,
    name: 'Michael Johnson',
    quote: "Bookworm's Paradise is my go-to place for finding rare and hard-to-find books. Their collection is truly impressive.",
    avatarUrl: '../../../public/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction.jpg',
  },
  
];

const Testimonials :React.FC = () => {
  return (
    <div className="testimonials">
      <h2 className="testimonials__title">What Our Customers Say</h2>
      <div className="testimonials__list">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonials__item">
            <img src={testimonial.avatarUrl} alt={testimonial.name} className="testimonials__avatar" />
            <blockquote className="testimonials__quote">{testimonial.quote}</blockquote>
            <p className="testimonials__name">{testimonial.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
