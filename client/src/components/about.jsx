import React, { useEffect } from 'react'
import styles from './about.module.css'
import LightPillar from './LightPillar'

const About = () => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.visible);
                    }
                });
            },
            { threshold: 0.15 }
        );

        const elements = document.querySelectorAll(`.${styles.fadeElement}`);
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);
    return (
        <div id="about" className={styles.aboutBackground}>
            <div className={styles.pillarWrapper}>
                <LightPillar
                    topColor="#11A7A3"
                    bottomColor="#0e4f4d"
                    intensity={0.6}
                    glowAmount={0.002}
                    bloom={0.3}
                    pillarWidth={3}
                    rotationSpeed={0.2}
                    interactive
                    clickPulse
                    intro
                    quality="high"
                    mixBlendMode="screen"
                />
            </div>
            <div className={styles.content}>
                <h1 className={`${styles.aboutTitle} ${styles.fadeElement}`}>ABOUT THE SYSTEM</h1>
                <div className={styles.cardContainer}>
                    <div className={`${styles.leftSide} ${styles.fadeElement}`}>
                        <svg className="w-10 h-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M2.98755 7.97095c0-.55229.44771-1 1-1H16.9253c.5523 0 1 .44771 1 1v7.95855c0 .5522-.4477 1-1 1H3.98755c-.55229 0-1-.4478-1-1V7.97095ZM20.9129 12.9419v-1.9834c0-.5523-.4478-1-1-1h-.9876c-.5523 0-1 .4477-1 1v1.9834c0 .5523.4477 1 1 1h.9876c.5522 0 1-.4477 1-1Z"/>
                            <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M5.9751 9.9585h8.9627v3.9834H5.9751V9.9585Z"/>
                        </svg>
                        <h1 className={styles.aboutH1}>THE PROBLEM</h1>
                        <h2 className={styles.aboutH2}>Energy conservation is undervalued — and solar only works half the day.</h2>
                        <h5 className={styles.aboutH5}>
                            Rising electricity costs affect every household, and existing renewable sources like solar panels only harvest
                            during daylight, leaving a gap in continuous energy generation.
                        </h5>
                    </div>
                    <div className={`${styles.rightSide} ${styles.fadeElement}`}>
                        <svg className="w-10 h-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M2.98755 7.97095c0-.55229.44771-1 1-1H16.9253c.5523 0 1 .44771 1 1v7.95855c0 .5522-.4477 1-1 1H3.98755c-.55229 0-1-.4478-1-1V7.97095ZM20.9129 12.9419v-1.9834c0-.5523-.4478-1-1-1h-.9876c-.5523 0-1 .4477-1 1v1.9834c0 .5523.4477 1 1 1h.9876c.5522 0 1-.4477 1-1Z"/>
                            <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M5.9751 9.9585h8.9627v3.9834H5.9751V9.9585Z"/>
                        </svg>
                        <h1 className={styles.aboutH1}>THE SOLUTION</h1>
                        <h2 className={styles.aboutH2}>Piezoelectric discs under the sidewalk, harvesting energy from every step.</h2>
                        <h5 className={styles.aboutH5}>
                            A piezoelectric transducer array embedded in a tile converts footstep pressure into an AC signal,
                            rectified and stored — generating power continuously, as long as people walk.
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About