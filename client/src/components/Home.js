import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Bubbles from './Bubbles';
import AchievementSlideshow from './AchievementSlideshow';
import {
  containerVariants,
  textRevealVariants,
} from '../utils/animationConfig';

function Home() {
  const heroRef = useRef(null);
  const posRef = useRef(50);

  useEffect(() => {
    let animId;

    function animateBG() {
      posRef.current += 0.02;
      if (heroRef.current) {
        heroRef.current.style.backgroundPosition = `${posRef.current}% center`;
      }
      animId = requestAnimationFrame(animateBG);
    }

    animId = requestAnimationFrame(animateBG);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <>
      <section className="hero" ref={heroRef}>
        <div className="overlay" />
        <Bubbles />
        
        {/* Animated Hero Content */}
        <motion.div
          className="content"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.p
            className="tag"
            variants={textRevealVariants}
          >
            Your Perfect Place To Thrive.
          </motion.p>
          
          <motion.h1
            variants={textRevealVariants}
            transition={{ duration: 1, delay: 0.1 }}
          >
            Yathirai InfoTech
          </motion.h1>
          
          <motion.p
            className="desc"
            variants={textRevealVariants}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A place where students play with skills, explore ideas,
            build confidence, and begin their journey toward knowledge,
            growth, and success.
          </motion.p>
          
        </motion.div>
      </section>

      {/* Achievement Slideshow - Cinematic Carousel */}
      <AchievementSlideshow />
    </>
  );
}

export default Home;
