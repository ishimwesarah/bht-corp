import React from 'react';
import InfiniteScroller from '../InfiniteScroller/InfiniteScroller';
import TestimonialCard from '../TestimonialCard/TestimonialCard';
import './TestimonialsScroller.css';

const testimonialData = [
  { quote: "BHT Corporation delivered a website that exceeded our expectations. The process was smooth, professional, and on time.", name: "Alain M.", company: "Musanze Business Hub" },
  { quote: "The custom T-shirts and branding materials they designed for our event were a huge hit. The quality was top-notch.", name: "Sarah K.", company: "Rwanda Tourism Board" },
  { quote: "Their team is incredibly skilled. They helped us with a complex network installation, and the results are fantastic.", name: "John Uwimana", company: "Gorilla Vets Lodge" },
  { quote: "From logo design to printing, their attention to detail is unmatched. I couldn't be happier with our new brand identity.", name: "Marie Claire", company: "Kigali Art Cafe" },
];

const TestimonialsScroller = () => {
  return (
    <section className="testimonials-scroller-section">
      <div className="container">
        <h2 className="scroller-title">What Our Clients Say</h2>
      </div>
      <InfiniteScroller>
        {testimonialData.map((item, index) => (
          <TestimonialCard key={index} {...item} />
        ))}
      </InfiniteScroller>
    </section>
  );
};

export default TestimonialsScroller;