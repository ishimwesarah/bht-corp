import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import './PageHero.css';
import { EffectFade, Autoplay } from 'swiper/modules';


import techImg from '../../assets/this.png';
import designImg from '../../assets/that.png';

const slidesData = [
  { image: techImg, title: "Technology Solutions" },
  { image: designImg, title: "Creative Design Services" }
];

const PageHero = ({ title, tagline, slides = slidesData }) => {
  return (
    <div className="page-hero-container">
      <Swiper
        effect={'fade'}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        modules={[EffectFade, Autoplay]}
        className="pageHeroSwiper"
        allowTouchMove={false}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="page-hero-bg" style={{backgroundImage: `url(${slide.image})`}}></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="page-hero-overlay"></div>
      <div className="page-hero-content container">
        <h1>{title}</h1>
        <p>{tagline}</p>
      </div>
    </div>
  );
};

export default PageHero;