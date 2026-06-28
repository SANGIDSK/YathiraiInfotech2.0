/**
 * AchievementSlideshow Component
 * Modern animated carousel with cinematic effects
 * Features: Auto-play, swipe support, navigation, pagination, parallax, zoom animations
 */

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import '../styles/AchievementSlideshow.css';

// Default achievements data - can be fetched from API
const DEFAULT_ACHIEVEMENTS = [
  {
    id: 1,
    title: 'Project-Based Web Development',
    description: 'Students build responsive websites and full-stack features through guided, hands-on practice.',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop',
    date: 'Career Skills',
    category: 'Web Development',
  },
  {
    id: 2,
    title: 'Career-Focused Mentorship',
    description: 'Structured learning paths help students move from fundamentals to confident portfolio work.',
    image:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=600&fit=crop',
    date: 'Guided Learning',
    category: 'Mentorship',
  },
  {
    id: 3,
    title: 'Technology Training for Students',
    description: 'School and college learners explore programming, analytics, and modern digital tools.',
    image:
      'https://images.unsplash.com/photo-1516534775068-bb57314e776d?w=1200&h=600&fit=crop',
    date: 'Student Growth',
    category: 'Training',
  },
  {
    id: 4,
    title: 'Python and Problem Solving',
    description: 'Practical workshops turn coding concepts into small products, automations, and exercises.',
    image:
      'https://images.unsplash.com/photo-1517694712178-26efb90288f8?w=1200&h=600&fit=crop',
    date: 'Workshops',
    category: 'Python',
  },
  {
    id: 5,
    title: 'Confidence Through Real Work',
    description: 'Every learner is encouraged to create, present, iterate, and grow with feedback.',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop',
    date: 'Portfolio Ready',
    category: 'Projects',
  },
];

const AchievementSlideshow = ({ achievements = DEFAULT_ACHIEVEMENTS }) => {
  const swiperRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Handle slide change
  const handleSlideChange = (swiper) => {
    setCurrentSlide(swiper.activeIndex);
  };

  // Pause autoplay on hover
  const handleMouseEnter = () => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.autoplay?.pause();
    }
  };

  // Resume autoplay on mouse leave
  const handleMouseLeave = () => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.autoplay?.resume();
    }
  };

  return (
    <section className="achievement-slideshow" id="achievements">
      <div className="slideshow-container">
        {/* Section Title */}
        <div className="slideshow-header">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="slideshow-title"
          >
            Learning Highlights
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="slideshow-subtitle"
          >
            Hands-on training, guided projects, and confidence-building outcomes
          </motion.p>
        </div>

        {/* Swiper Carousel */}
        <motion.div
          className="swiper-wrapper-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay, EffectFade]}
            effect="fade"
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            pagination={{
              el: '.swiper-pagination-custom',
              clickable: true,
              dynamicBullets: true,
              renderBullet: (index, className) => `
                <span class="${className}" style="
                  background-color: ${index === currentSlide ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.5)'};
                  width: ${index === currentSlide ? '32px' : '12px'};
                  height: 12px;
                  border-radius: 6px;
                  transition: all 0.3s ease;
                  cursor: pointer;
                "></span>
              `,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            speed={1000}
            onSlideChange={handleSlideChange}
            className="swiper-fade"
          >
            {/* Render slides */}
            {achievements.map((achievement, index) => (
              <SwiperSlide key={achievement.id}>
                {({ isActive }) => (
                  <div className="slide-content">
                    {/* Background Image with Parallax */}
                    <motion.div
                      className="slide-background"
                      initial={{ scale: 1.1 }}
                      animate={isActive ? { scale: 1 } : { scale: 1.1 }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                    >
                      <div
                        className="slide-image"
                        style={{
                          backgroundImage: `url(${achievement.image})`,
                        }}
                      />
                      {/* Gradient Overlay */}
                      <div className="slide-overlay" />
                    </motion.div>

                    {/* Content */}
                    <motion.div
                      className="slide-content-text"
                      initial={{ opacity: 0, y: 30 }}
                      animate={isActive ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <motion.span
                        className="slide-date"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isActive ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        {achievement.date}
                      </motion.span>

                      <motion.h3
                        className="slide-title"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isActive ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      >
                        {achievement.title}
                      </motion.h3>

                      <motion.p
                        className="slide-description"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isActive ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.5 }}
                      >
                        {achievement.description}
                      </motion.p>

                      <motion.span
                        className="slide-category"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isActive ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.6 }}
                      >
                        {achievement.category}
                      </motion.span>
                    </motion.div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
          <motion.div
            className="swiper-button-prev-custom"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </motion.div>

          <motion.div
            className="swiper-button-next-custom"
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>

          {/* Pagination Dots */}
          <div className="swiper-pagination-custom" />

          {/* Slide Counter */}
          <motion.div
            className="slide-counter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="current-slide">{String(currentSlide + 1).padStart(2, '0')}</span>
            <span className="separator">/</span>
            <span className="total-slides">{String(achievements.length).padStart(2, '0')}</span>
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="slideshow-decorations">
          <div className="decoration decoration-1" />
          <div className="decoration decoration-2" />
          <div className="decoration decoration-3" />
        </div>
      </div>
    </section>
  );
};

export default AchievementSlideshow;
