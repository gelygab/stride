import React from 'react'
import assets from '../assets/assets'
import styles from './title.module.css'

const Title = () => {
    return (
        <div className={styles.background}>
            <div className={styles.titlecontent}>
                <h1>Every footstep is a</h1>
                <h2>watt waiting to happen</h2>
                <h5>
                    S.T.R.I.D.E. turns the mechanical force of pedestrian footsteps into <br></br>stored electrical energy — a sidewalk tile that harvests power 24/7, rain or shine, day or night.
                </h5>
            </div>
        </div>
    )
}

export default Title