import React, { useCallback, useEffect, useRef, useState } from 'react';
import WebThreads from './reactbits/WebThreads';
import Folder from './reactbits/Folder';
import ElectricBorder from './reactbits/ElectricBorder';
import TechText from './reactbits/TechText';
import { teamMembers } from './teamData';
import styles from './team.module.css';

const getFolderSize = () => {
  if (typeof window === 'undefined') return 1;
  if (window.innerWidth < 480) return 0.55;
  if (window.innerWidth < 900) return 0.8;
  return 1;
};

const Team = () => {
  const [size, setSize] = useState(getFolderSize);
  const [activeMember, setActiveMember] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const scaledSize = Math.min(1.3, (size || 1) * 1.18);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onResize = () => setSize(getFolderSize());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!activeMember) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeMember]);

  useEffect(() => {
    if (!activeMember) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setActiveMember(null);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeMember]);

  const handleItemClick = useCallback((_item, index) => {
    setActiveMember(teamMembers[index] ?? null);
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      className={`${styles.teamPage} ${isVisible ? styles.visible : ''}`}
    >
      <div className={styles.threadsBg} aria-hidden="true">
        <WebThreads
          color1="#008E8B"
          color2="#00514F"
          color3="#ffffff"
          spread={0.17}
          speed={0.2}
          threadCount={6}
        />
      </div>

      <header className={styles.header}>
        <div className={styles.headingText}>
          <span className={`${styles.headingPart} ${styles.meetPart}`}>
            <TechText
              text="MEET THE"
              fontFamily="'inter one mono', monospace"
              color="#ffffff"
              accentColor="#008E8B"
              fontSize={150}
              speed={0.8}
            />
          </span>
          <span className={`${styles.headingPart} ${styles.stridePart}`}>
            <TechText
              text="S.T.R.I.D.E."
              fontFamily="'inter one mono', monospace"
              color="#ffffff"
              accentColor="#008E8B"
              fontSize={150}
              speed={0.8}
            />
          </span>
          <span className={`${styles.headingPart} ${styles.teamPart}`}>
            <TechText
              text="TEAM"
              fontFamily="'inter one mono', monospace"
              color="#ffffff"
              accentColor="#008E8B"
              fontSize={150}
              speed={0.8}
            />
          </span>
        </div>
      </header>

      <div className={styles.folderWrap} style={{ '--team-scale': scaledSize }}>
        <Folder
          variant="glass"
          color="#008E8B"
          frost={0.4}
          label="STRIDE TEAM"
          size={scaledSize}
          layout="spread"
          theme="dark"
          zoomOnClick={false}
          draggable={false}
          onItemClick={handleItemClick}
        >
          {teamMembers.map((member) => (
            <ElectricBorder
              key={member.id}
              color={member.accent}
              speed={0.9}
              chaos={0.1}
              borderRadius={12}
              className={styles.fileCard}
            >
              <div className={styles.fileInner}>
                <span className={styles.fileInitial}>{member.initial}</span>
                <span className={styles.fileName}>{member.fileLabel}</span>
              </div>
            </ElectricBorder>
          ))}
        </Folder>
      </div>


      {activeMember && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setActiveMember(null)}
        >
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="team-member-name"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className={styles.modalClose}
              type="button"
              onClick={() => setActiveMember(null)}
              aria-label="Close team member details"
            >
              ×
            </button>

            {activeMember.image ? (
              <img
                className={styles.modalImg}
                src={activeMember.image}
                alt={activeMember.name}
              />
            ) : (
              <div className={styles.modalAvatar} aria-hidden="true">
                {activeMember.initial}
              </div>
            )}

            <h2 className={styles.modalName} id="team-member-name">
              {activeMember.name}
            </h2>
            <p className={styles.modalRole}>{activeMember.role}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Team;