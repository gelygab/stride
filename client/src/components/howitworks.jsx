import React from 'react';
import assets from '../assets/assets';
import styles from './howitworks.module.css';


const steps = [
    {
        title: "Piezo Array",
        description: "35mm brass PZT discs convert footstep force into an AC voltage spike.",
        image: assets.piezo
    },
    {
        title: "Bridge Rectifier",
        description: "1N4148 diode bridge converts the AC pulses into usable DC current.",
        image: assets.bridgerec
    },
    {
        title: "Supercapacitor",
        description: "A 5.5V supercapacitor bank buffers energy directly, step by step.",
        image: assets.supercap
    },
    {
        title: "Voltage Regulator",
        description: "A voltage regulator integrated circuit (IC) that outputs a fixed +5V DC supply.",
        image: assets.lm7805
    },
    {
        title: "INA219 and ESP32",
        description: "Voltage/current is measured and logged, then sent over Wi-Fi.",
        image: assets.esp32
    },
    {
        title: "LCD Display",
        description: "Live telemetry on the web dashboard, mirrored on a 16×2 LCD at the tile.",
        image: assets.lcd
    }
];

const HowItWorks = () => {
    return (
        <section id="how-it-works" className={styles.howItWorksSection}>
            <div className={styles.lampGlow}></div>
            <div className={styles.spotlightBeam}></div>

            <div className={styles.headerContainer}>
                <h1 className={styles.Title}>
                    How It 
                </h1>
                <h2 className={styles.workTitle}>
                    Works
                </h2>
                <p className={styles.subtitle}>
                    From footstep to stored power — the full signal path
                </p>
            </div>

            <div className={styles.cardsFanContainer}>
                {steps.map((step, index) => (
                    <div 
                        key={index} 
                        className={`${styles.glassCard} ${styles[`card${index + 1}`]}`}
                    >
                        <div className={styles.cardFeaturedInner}>
                            <div className={styles.imageWrapper}>
                                <img src={step.image} alt={step.title} className={styles.cardImage} />
                            </div>
                            <h3 className={styles.cardTitle}>{step.title}</h3>
                            <p className={styles.cardDesc}>{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>   
        </section>
    );
};

export default HowItWorks;