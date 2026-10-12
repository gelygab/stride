import React from 'react'
import styles from './title.module.css'

const Title = () => {
    return (
        <div className={styles.background}>
            <div className={styles.titlecontent}>
                <h1>Every footstep is</h1>
                <h2>a watt waiting to happen</h2>
                <h5>
                    S.T.R.I.D.E. turns the mechanical force of pedestrian footsteps into <br></br>stored electrical energy — a sidewalk tile that harvests power 24/7, rain or shine, day or night.
                </h5>
            </div>
        </div>
    )
}

export default Title