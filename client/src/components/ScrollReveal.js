/**
 * ScrollReveal Component
 * Wraps elements to add scroll-triggered animations
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import {
  fadeUpVariants,
  fadeLeftVariants,
  fadeRightVariants,
  scaleVariants,
  blurFocusVariants,
} from '../utils/animationConfig';

export const ScrollReveal = ({
  children,
  variant = 'fadeUp',
  triggerOnce = true,
  threshold = 0.1,
  className = '',
  delay = 0,
}) => {
  const { ref, isVisible } = useScrollAnimation({
    threshold,
    triggerOnce,
  });

  // Map variant names to animation configurations
  const variantMap = {
    fadeUp: fadeUpVariants,
    fadeLeft: fadeLeftVariants,
    fadeRight: fadeRightVariants,
    scale: scaleVariants,
    blurFocus: blurFocusVariants,
  };

  const selectedVariant = variantMap[variant] || fadeUpVariants;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={{
        ...selectedVariant,
        visible: {
          ...selectedVariant.visible,
          transition: {
            ...selectedVariant.visible.transition,
            delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
