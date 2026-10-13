import React from 'react';
import assets from '../assets/assets';
import styles from './navbar.module.css';

const Navbar = ({ onNavigate }) => {
    const navItems = [
        { label: 'Home', view: 'home' },
        { label: 'About', view: 'about' },
        { label: 'How it works', view: 'how-it-works' },
        { label: 'Impact', view: 'impact' },
        { label: 'Team', view: 'team' },
    ];

    return (
        <nav className={styles.navbar}>
            <img src={assets.logo} alt='' />
            <button type="button" className={styles.burger} aria-label="Open navigation menu">☰</button>
            <ul className={styles.navlinks}>
                {navItems.map(({ label, view }) => (
                    <li key={label}>
                        <a href={`#${view}`} className={styles.navButton}>
                            {label}
                        </a>
                    </li>
                ))}
            </ul>
            <div className={styles.dashboard}>
                <button type="button" className={styles.dashboardButton}>
                    <span>View Live Dashboard</span>
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v15a1 1 0 0 0 1 1h15M8 16l2.5-5.5 3 3L17.273 7 20 9.667" />
                    </svg>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;