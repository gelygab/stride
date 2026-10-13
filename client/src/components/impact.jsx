import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './impact.module.css';
import DotField from './DotField';

const iconProps = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
};

const HouseIcon = () => (
    <svg className={styles.icon} {...iconProps}>
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
);

const TreesIcon = () => (
    <svg className={styles.icon} {...iconProps}>
        <path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z" />
        <path d="M7 16v6" />
        <path d="M13 19v3" />
        <path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5" />
    </svg>
);

const LandmarkIcon = () => (
    <svg className={styles.icon} {...iconProps}>
        <line x1="3" x2="21" y1="22" y2="22" />
        <line x1="6" x2="6" y1="18" y2="11" />
        <line x1="10" x2="10" y1="18" y2="11" />
        <line x1="14" x2="14" y1="18" y2="11" />
        <line x1="18" x2="18" y1="18" y2="11" />
        <polygon points="12 2 20 7 4 7" />
    </svg>
);

const impactCards = [
    {
        id: 'residential',
        Icon: HouseIcon,
        title: 'Residential Walkways & Subdivisions',
        description:
            'Supplements micro-power for low-draw devices like smart gate sensors, pathway LEDs, and emergency chargers by harnessing high-density daily foot traffic.',
    },
    {
        id: 'campuses',
        Icon: TreesIcon,
        title: 'Campuses & Public Parks',
        description:
            'Converts heavy pedestrian traffic in school corridors and park trails into off-grid energy for ambient LED pathway lighting and real-time IoT environmental telemetry.',
    },
    {
        id: 'lgu',
        Icon: LandmarkIcon,
        title: 'Local Government Units (LGUs) & Smart Barangays',
        description:
            'Provides distributed energy storage via supercapacitor banks and backup power modules, offering resilient, grid-independent micro-power during community emergencies.',
    },
];

const TOTAL = impactCards.length;
const AUTO_ROTATE_MS = 5000;
const SWIPE_THRESHOLD = 50;

const wrap = (index) => (index + TOTAL) % TOTAL;

const getPosition = (index, active) => {
    const offset = wrap(index - active);
    if (offset === 0) return 'center';
    return offset === 1 ? 'right' : 'left';
};

const getPrefersReducedMotion = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const ArrowIcon = ({ direction }) => (
    <svg className={styles.arrowIcon} viewBox="0 0 24 24" aria-hidden="true">
        <polygon
            points={direction === 'left' ? '16 5 7 12 16 19' : '8 5 17 12 8 19'}
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
        />
    </svg>
);

const Impact = () => {
    const [active, setActive] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [hasEntered, setHasEntered] = useState(false);
    const [reduceMotion] = useState(getPrefersReducedMotion);
    const sectionRef = useRef(null);
    const touchStartX = useRef(null);

    const goNext = useCallback(() => setActive((current) => wrap(current + 1)), []);
    const goPrev = useCallback(() => setActive((current) => wrap(current - 1)), []);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return undefined;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
                if (entry.isIntersecting) setHasEntered(true);
            },
            { threshold: 0.3 }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isPaused || !isInView || reduceMotion) return undefined;

        const timer = setTimeout(goNext, AUTO_ROTATE_MS);
        return () => clearTimeout(timer);
    }, [active, isPaused, isInView, reduceMotion, goNext]);

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowRight') {
            event.preventDefault();
            goNext();
        } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            goPrev();
        }
    };

    const handleTouchStart = (event) => {
        touchStartX.current = event.touches[0].clientX;
    };

    const handleTouchEnd = (event) => {
        if (touchStartX.current === null) return;
        const deltaX = event.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;

        if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;
        if (deltaX < 0) goNext();
        else goPrev();
    };

    return (
        <section
            id="impact"
            ref={sectionRef}
            className={`${styles.impactSection} ${hasEntered ? styles.visible : ''}`}
        >
            <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', minHeight: '100vh', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
                <DotField 
                    dotRadius={1.5} 
                    dotSpacing={14} 
                    gradientFrom="rgba(17, 167, 163, 0.4)"
                    gradientTo="rgba(79, 247, 242, 0.3)"
                    glowColor="#000000"
                />
            </div>
            <div className={styles.glowBackdrop} aria-hidden="true" />

            <div className={styles.content}>
                <h2 className={styles.impactTitle}>IMPACT</h2>

                <div
                    className={styles.stage}
                    role="region"
                    aria-roledescription="carousel"
                    aria-label="S.T.R.I.D.E. impact areas"
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onFocus={() => setIsPaused(true)}
                    onBlur={() => setIsPaused(false)}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {impactCards.map(({ id, Icon, title, description }, index) => {
                        const position = getPosition(index, active);
                        const isActive = position === 'center';

                        return (
                            <article
                                key={id}
                                className={`${styles.card} ${styles[position]}`}
                                aria-roledescription="slide"
                                aria-label={`${index + 1} of ${TOTAL}: ${title}`}
                                onClick={isActive ? undefined : () => setActive(index)}
                            >
                                <div className={styles.cardBody}>
                                    <div className={styles.iconRing}>
                                        <div className={styles.iconCircle}>
                                            <Icon />
                                        </div>
                                    </div>

                                    <div className={styles.textBlock}>
                                        <h3 className={styles.cardTitle}>{title}</h3>
                                        <p className={styles.cardDescription}>{description}</p>
                                    </div>
                                </div>
                            </article>
                        );
                    })}

                    <button
                        type="button"
                        className={`${styles.navButton} ${styles.navPrev}`}
                        aria-label="Previous"
                        onClick={goPrev}
                    >
                        <ArrowIcon direction="left" />
                    </button>
                    <button
                        type="button"
                        className={`${styles.navButton} ${styles.navNext}`}
                        aria-label="Next"
                        onClick={goNext}
                    >
                        <ArrowIcon direction="right" />
                    </button>
                </div>

                <div className={styles.dots}>
                    {impactCards.map(({ id, title }, index) => (
                        <button
                            key={id}
                            type="button"
                            className={`${styles.dot} ${index === active ? styles.dotActive : ''}`}
                            aria-label={`Show ${title}`}
                            aria-current={index === active ? 'true' : undefined}
                            onClick={() => setActive(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Impact;