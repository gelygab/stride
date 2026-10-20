import React, { useState, useEffect } from 'react';
import assets from '../assets/assets';
import styles from './index.module.css';
import ElectricLogo from './ElectricLogo';

const Index = ({ onEnter }) => {
  const [isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    if (assets.walker) {
      const img = new Image();
      img.src = assets.walker;
    }
  }, []);

  const handleClick = () => {
    if (isTriggered) return;
    setIsTriggered(true);

    setTimeout(() => {
      onEnter();
    }, 2200);
  };

  return (
    <div className={styles.landingContainer}>
      <button
        type="button"
        className={`${styles.boltButton} ${isTriggered ? styles.boltActive : ''}`}
        onClick={handleClick}
        aria-label="Enter site"
      >
        <ElectricLogo
          src={assets.bolt}
          style={{ width: '100%', height: '100%' }}
          color={isTriggered ? '#9be8e6' : '#117A73'}
          glowColor={isTriggered ? '#117a73' : '#008E8B'}
          scale={0.65}
          strands={4}
          bend={0.6}
          crackle={1.5}
          arcs={isTriggered ? 3 : 1}
          speed={isTriggered ? 4.5 : 2.5}
          interactive={!isTriggered}
          intensity={isTriggered ? 1.4 : 1}
          glow={isTriggered ? 1.6 : 1}
          thickness={1.5}
          flicker={0.6}
          fill={0}
          cursorIntensity={0.75}
          cursorRadius={100}
        />
      </button>

      {isTriggered && (
        <>
          <div className={`${styles.runnerTrack} ${styles.trailSecond}`}>
            <ElectricLogo
              src={assets.walker}
              style={{ width: '100%', height: '100%' }}
              color="#008E8B"
              glowColor="#117A73"
              scale={0.7}
              strands={3}
              bend={0.9}
              crackle={2.5}
              arcs={2}
              speed={9.0}
              interactive={false}
              intensity={1.2}
              glow={1.8}
              thickness={1.6}
              flicker={0.8}
              fill={0}
            />
          </div>

          <div className={`${styles.runnerTrack} ${styles.trailFirst}`}>
            <ElectricLogo
              src={assets.walker}
              style={{ width: '100%', height: '100%' }}
              color="#11A7A3"
              glowColor="#9be8e6"
              scale={0.7}
              strands={5}
              bend={0.8}
              crackle={2.0}
              arcs={3}
              speed={8.5}
              interactive={false}
              intensity={1.6}
              glow={2.0}
              thickness={2.0}
              flicker={0.7}
              fill={0}
            />
          </div>

          <div className={`${styles.runnerTrack} ${styles.leadRunner}`}>
            <div className={styles.lightningWake} />
            <ElectricLogo
              src={assets.walker}
              style={{ width: '100%', height: '100%' }}
              color="#ffffff"
              glowColor="#9be8e6"
              scale={0.7}
              strands={6}
              bend={0.6}
              crackle={1.8}
              arcs={4}
              speed={8.0}
              interactive={false}
              intensity={2.0}
              glow={2.5}
              thickness={2.4}
              flicker={0.5}
              fill={0}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Index;