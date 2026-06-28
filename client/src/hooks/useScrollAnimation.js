/**
 * useScrollAnimation Hook
 * Detects when an element enters the viewport and triggers animations
 */

import { useRef, useState, useEffect } from 'react';

export const useScrollAnimation = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const {
    threshold = 0.1,
    triggerOnce = true, // Only animate once
    rootMargin = '0px',
  } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          // If triggerOnce is true, unobserve after animation triggers
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!triggerOnce) {
          // Allow re-triggering animations
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, triggerOnce, rootMargin]);

  return { ref, isVisible };
};

/**
 * useParallax Hook
 * Creates smooth parallax effect on scroll
 */
export const useParallax = (speed = 0.5) => {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const elementTop = ref.current.getBoundingClientRect().top;
        const elementHeight = ref.current.offsetHeight;
        const windowHeight = window.innerHeight;

        // Calculate parallax offset based on scroll position
        const newOffset =
          (windowHeight - (elementTop + elementHeight)) * speed;

        setOffset(newOffset);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref, offset };
};

/**
 * useSmoothScroll Hook
 * Smooth scroll to element on click
 */
export const useSmoothScroll = () => {
  const scrollToSection = (elementId) => {
    const element = document.getElementById(elementId);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return { scrollToSection };
};

/**
 * useMouseParallax Hook
 * Creates parallax effect based on mouse position
 */
export const useMouseParallax = (intensity = 20) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / intensity;
      const y = (e.clientY - rect.top - rect.height / 2) / intensity;

      setPosition({ x, y });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    const element = ref.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [intensity]);

  return { ref, position };
};

export default useScrollAnimation;
