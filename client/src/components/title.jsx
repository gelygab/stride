import React from 'react'
import assets from '../assets/assets'
import styles from './title.module.css'
import Wave from './wave'
import Typewriter from "typewriter-effect";

const Title = () => {
    return (
        <div className={styles.titlebackground}>
            <div className={styles.titlecontent}>
                <div className={styles.introTitle}>
                <h1>Every footstep is a</h1>
                <h2>watt waiting to happen</h2>
                <h5>
                    <Typewriter options={{
                        strings: ["S.T.R.I.D.E. turns the mechanical force of pedestrian footsteps into stored electrical energy — a sidewalk tile that harvests power 24/7, rain or shine, day or night."], 
                        autoStart: true,
                        delay: 38,
                        deleteSpeed: 20,
                        loop: true
                    }}
                    />
                </h5>
                </div>
                <Wave/>
            </div>
        </div>
    )
}

export default Title