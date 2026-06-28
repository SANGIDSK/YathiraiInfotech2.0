import React, { useEffect, useRef, useState } from 'react';
import './Loader.css';

function Loader({ active, onFinish }) {
  const [exit, setExit] = useState(false);
  const finishRef = useRef(onFinish);

  useEffect(() => {
    finishRef.current = onFinish;
  }, [onFinish]);

  useEffect(() => {
    if (!active) return undefined;

    setExit(false);

    const exitTimer = setTimeout(() => setExit(true), 1800);
    const finishTimer = setTimeout(() => {
      if (finishRef.current) finishRef.current();
    }, 2350);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div id="loader-wrap" className={exit ? 'exit' : ''}>
      <div className="simple-loader">
        <div className="simple-logo-wrap">
          <span className="loader-ring-loader" aria-hidden="true" />
          <img src="/logo.png" alt="Yathirai InfoTech logo" />
        </div>
        <strong>Yathirai InfoTech</strong>
        <div className="loader-line" aria-hidden="true">
          <span />
        </div>
        <p>Loading experience</p>
      </div>
    </div>
  );
}

export default Loader;
