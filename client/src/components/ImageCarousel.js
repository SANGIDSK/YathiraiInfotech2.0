import React, { useState, useEffect, useRef } from 'react';
import './ImageCarousel.css'; // We'll create this CSS file

/**
 * Responsive Image Gallery Carousel Component
 *
 * Features:
 * - Horizontal sliding animation with CSS transforms
 * - One image fully visible at a time
 * - Smooth transitions with ease-in-out timing
 * - Navigation buttons (previous/next)
 * - Pagination dots
 * - Autoplay with pause on hover
 * - Responsive design for mobile and desktop
 * - Touch/swipe support (optional enhancement)
 * - Loop back to first image after last
 */

function ImageCarousel({ images = [], autoPlayInterval = 3000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);

  // Default images if none provided
  const defaultImages = [
    {
      id: 1,
      title: 'Web Development Project - E-commerce Site',
      url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop'
    },
    {
      id: 2,
      title: 'Mobile App Development - Task Manager',
      url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=400&fit=crop'
    },
    {
      id: 3,
      title: 'Data Science Project - Sales Analytics',
      url: 'https://images.unsplash.com/photo-1516534775068-bb57314e776d?w=400&h=400&fit=crop'
    },
    {
      id: 4,
      title: 'Coding Workshop - Python Programming',
      url: 'https://images.unsplash.com/photo-1517694712178-26efb90288f8?w=400&h=400&fit=crop'
    },
    {
      id: 5,
      title: 'Team Collaboration - Group Project',
      url: 'https://images.unsplash.com/photo-1552664730-d307ca884979?w=400&h=400&fit=crop'
    }
  ];

  const displayImages = images.length > 0 ? images : defaultImages;

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && displayImages.length > 1) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % displayImages.length);
      }, autoPlayInterval);
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, displayImages.length, autoPlayInterval]);

  // Navigation functions
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % displayImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + displayImages.length) % displayImages.length
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Pause on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  // Touch/swipe support (optional enhancement)
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div className="image-carousel">
      <div
        className="carousel-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={carouselRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Carousel Track - Horizontal flex layout */}
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: 'transform 0.6s ease-in-out'
          }}
        >
          {displayImages.map((image, index) => (
            <div key={image.id || index} className="carousel-slide">
              <img
                src={image.url || image.src || image.imageUrl}
                alt={image.title || image.alt || `Slide ${index + 1}`}
                className="carousel-image"
                loading="lazy"
              />
              {/* Optional overlay with title */}
              {(image.title || image.caption) && (
                <div className="carousel-overlay">
                  <h3 className="carousel-title">{image.title || image.caption}</h3>
                  <div className="carousel-counter">
                    {index + 1} / {displayImages.length}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        {displayImages.length > 1 && (
          <>
            <button
              className="carousel-nav carousel-nav-prev"
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              ‹
            </button>
            <button
              className="carousel-nav carousel-nav-next"
              onClick={nextSlide}
              aria-label="Next slide"
            >
              ›
            </button>
          </>
        )}

        {/* Pagination Dots */}
        {displayImages.length > 1 && (
          <div className="carousel-dots">
            {displayImages.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Auto-play Indicator */}
        {displayImages.length > 1 && (
          <div className="autoplay-indicator">
            <button
              className="autoplay-btn"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              aria-label={isAutoPlaying ? 'Pause autoplay' : 'Start autoplay'}
            >
              {isAutoPlaying ? '⏸' : '▶'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageCarousel;