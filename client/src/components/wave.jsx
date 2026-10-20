import React, { useEffect, useRef, useState } from 'react';
import './wave.module.css';

const wavesConfig = [
  {
    // Back layer
    color: "rgba(20, 184, 166, 0.3)", 
    stroke: "rgba(20, 184, 166, 0.6)",
    gradient: "linear-gradient(to right, rgba(20, 184, 166, 0.3), rgba(20, 184, 166, 0.6))",
    baseAmplitude: 125, // Taller waves
    frequency: 0.03,
    speed: 0.020,
    direction: 1, 
    offset: 0
  },
  {
    // Middle layer
    color: "rgba(45, 212, 191, 0.3)", 
    stroke: "rgba(45, 212, 191, 0.6)",
    gradient: "linear-gradient(to right, rgba(45, 212, 191, 0.3), rgba(45, 212, 190, 0.22))",
    baseAmplitude: 100, 
    frequency: 0.02,
    speed: 0.010,
    direction: -1,
    offset: 50
  },
  {
    // Front layer
    color: "rgba(94, 234, 212, 0.3)", 
    stroke: "rgba(255, 255, 255, 0.4)",
    gradient: "linear-gradient(to right, rgba(94, 234, 212, 0.3), rgba(94, 234, 212, 0.6))",
    baseAmplitude: 150,
    frequency: 0.04,
    speed: 0.015,
    direction: 1,
    offset: 100
  }
];

export default function Wave() {
  const containerRef = useRef(null);
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    let animationFrameId;
    let tick = 0;

    const animate = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.clientWidth || 1000;
      const height = containerRef.current.clientHeight || 800;
      
      // --- THE KEY FIX IS HERE ---
      // Instead of starting at the bottom (height), we start 75% down the screen.
      // Lower number (e.g., 0.5) = Higher Water Level
      // Higher number (e.g., 0.9) = Lower Water Level
      const midY = height * 0.6; 

      tick++;

      const newPaths = wavesConfig.map((wave) => {
        const dynamicAmplitude = wave.baseAmplitude + Math.sin(tick * 0.05) * 20;
        const phase = tick * wave.speed * wave.direction + wave.offset;

        let points = `M 0 ${height}`; // Start drawing from bottom-left corner

        for (let x = 0; x <= width; x += 10) {
          // We calculate Y relative to our new 'midY' (Water Level)
          const y = midY - (Math.sin(x * wave.frequency + phase) * dynamicAmplitude); 
          points += ` L ${x} ${y}`;
        }

        // Close the shape at the bottom
        points += ` L ${width} ${height} L 0 ${height} Z`;
        return points;
      });

      setPaths(newPaths);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="wave-container"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',  // Changed to 100% so it covers the whole background
        zIndex: 0, 
        pointerEvents: 'none',
        overflow: 'hidden',  // Ensures waves don't overflow
        lineHeight: 0,
        fontSize: 0,
      }}
    >
      <svg 
        style={{ 
          width: '100%', 
          height: '100%', 
          filter: 'blur(10px)' // Soft glow
        }}
      >
        {paths.map((pathData, index) => (
          <path
            key={index}
            d={pathData}
            fill={wavesConfig[index].color}
            stroke={wavesConfig[index].stroke}
            strokeWidth="2"
            strokeLinejoin="round"
          />
        ))}
      </svg>
    </div>
  );
}