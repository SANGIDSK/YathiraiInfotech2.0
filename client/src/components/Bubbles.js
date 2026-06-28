import React, { useEffect, useRef } from 'react';

function Bubbles() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const colors = [
      'rgba(95, 111, 255, 0.7)',
      'rgba(157, 78, 221, 0.7)',
      'rgba(255, 122, 24, 0.7)',
      'rgba(255, 255, 255, 0.8)',
    ];

    for (let i = 0; i < 30; i++) {
      const bubble = document.createElement('span');
      const size = Math.random() * 8 + 4;

      bubble.style.width = size + 'px';
      bubble.style.height = size + 'px';
      bubble.style.left = Math.random() * 100 + 'vw';
      bubble.style.animationDuration = 6 + Math.random() * 6 + 's';
      bubble.style.opacity = Math.random();

      const color = colors[Math.floor(Math.random() * colors.length)];
      bubble.style.background = `radial-gradient(circle, ${color}, transparent)`;
      bubble.style.boxShadow = `0 0 15px ${color}`;

      container.appendChild(bubble);
    }

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return <div className="bubbles" ref={containerRef} />;
}

export default Bubbles;
