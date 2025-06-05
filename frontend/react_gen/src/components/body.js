// src/components/Body.js

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min'; // You can change to birds.min or fog.min

export default function Body() {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE: THREE,
          color: 0xff9900,
          backgroundColor: 0x0d0d0d,
          points: 10,
          maxDistance: 20,
          spacing: 15,
        })
      );
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      style={{
        width: '100%',
        minHeight: '100vh',
        padding: '2rem',
        color: '#fff',
        boxSizing: 'border-box',
      }}
    >
    </div>
  );
}
