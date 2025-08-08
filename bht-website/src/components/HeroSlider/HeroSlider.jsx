import React from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './HeroSlider.css';


import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
import Button from '../Button/Button';


import slide1Img from '../../assets/home.jpg';
import slide2Img from '../../assets/that.png';
import slide3Img from '../../assets/too.png';
import slide4Img from '../../assets/sky.jpg';

const sliderData = [
  {
    image: slide1Img,
    pretitle: 'Welcome to BHT Corporation',
    title: 'Innovative Technology & Creative Design',
    buttonText: 'Explore Our Services',
    buttonLink: '/services'
  },
  {
    image: slide2Img,
    pretitle: 'Featured Project',
    title: 'E-commerce for Local Artisans',
    buttonText: 'View Our Portfolio',
    buttonLink: '/portfolio'
  },
  {
    image: slide3Img,
    pretitle: 'Our Mission',
    title: 'Building a Better Future Through Service',
    buttonText: 'Learn About Us',
    buttonLink: '/about'
  },
    {
    image: slide4Img,
    pretitle: 'EMPOWERING OUR COMMUNITY',
    title: 'Helping You Reach For The Sky',
    buttonText: 'Discover Our Mission',
    buttonLink: '/about'
  }
];

const HeroSlider = () => {
  return (
    <div className="hero-slider-container">
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="mySwiper"
      >
        {sliderData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div 
              className="slide-background"
              style={{ backgroundImage: `url(${slide.image})` }}
            ></div>
            <div className="slide-overlay"></div>
            <div className="slide-content container">
                <p className="slide-pretitle">{slide.pretitle}</p>
                <h1 className="slide-title">{slide.title}</h1>
                <Button to={slide.buttonLink} buttonStyle="btn--primary" buttonSize="btn--large">
                    {slide.buttonText}
                </Button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;