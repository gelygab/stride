import React from 'react'
import assets from '../assets/assets'
import styles from './navbar.module.css'

const Navbar = () => {
    return (
        <nav className={styles.navbar}> 
            <img src={assets.logo} alt=''></img>
            <button className={styles.burger}>☰</button>
            <ul className={styles.navlinks}>
                <a href=''><li>Home</li></a>
                <a href=''><li>How it works</li></a>
                <a href=''><li>Impact</li></a>
                <a href=''><li>Team</li></a>
            </ul>
            <div className={styles.dashboard}><a href=''>
                <li>View Live Dashboard</li>
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v15a1 1 0 0 0 1 1h15M8 16l2.5-5.5 3 3L17.273 7 20 9.667"/>
                </svg>
            </a></div>
        </nav>
        
    )
}

export default Navbar