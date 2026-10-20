import React, { useState } from 'react'
import assets from '../assets/assets'
import styles from './navbar.module.css'

const Navbar = ({ onNavigate }) => {
    const [activeButton, setActiveButton] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    const handleLinkClick = (name) => {
        setActiveButton(name);
        setIsMenuOpen(false);
        if (onNavigate) {
            onNavigate(name);
        }
    };

    const handleDashboardClick = (e) => {
        e.preventDefault();
        setIsMenuOpen(false);
        setActiveButton('dashboard');
        if(onNavigate) {
            onNavigate('dashboard');
        }
    }

    return (
        <nav className={`${styles.navbar} ${styles.sticky}`}>
            <img src={assets.logo} alt="STRIDE" />
            
            <button 
                type="button"
                className={styles.burger}
                onClick={toggleMenu}
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
            >
                {isMenuOpen ? '✕' : '☰'}
            </button>

            <ul className={`${styles.navlinks} ${isMenuOpen ? styles.navlinksOpen : ''}`}>
                <li>
                    <a 
                        href="#home" 
                        className={activeButton === 'home' ? styles.active : ''} 
                        onClick={() => handleLinkClick('home')}
                    >
                        Home
                    </a>
                </li>
                <li>
                    <a 
                        href="#about" 
                        className={activeButton === 'about' ? styles.active : ''} 
                        onClick={() => handleLinkClick('about')}
                    >
                        About
                    </a>
                </li>
                <li>
                    <a 
                        href="#how-it-works" 
                        className={activeButton === 'how-it-works' ? styles.active : ''} 
                        onClick={() => handleLinkClick('how-it-works')}
                    >
                        How it works
                    </a>
                </li>
                <li>
                    <a 
                        href="#impact" 
                        className={activeButton === 'impact' ? styles.active : ''} 
                        onClick={() => handleLinkClick('impact')}
                    >
                        Impact
                    </a>
                </li>
                <li>
                    <a 
                        href="#team" 
                        className={activeButton === 'team' ? styles.active : ''} 
                        onClick={() => handleLinkClick('team')}
                    >
                        Team
                    </a>
                </li>
                <li className={styles.mobileDashboardItem}>
                    <a 
                        href="#dashboard" 
                        className={activeButton === 'dashboard' ? styles.active : ''} 
                        onClick={handleDashboardClick}
                    >
                        View Live Dashboard
                    </a>
                </li>
            </ul>

            <div className={styles.dashboard}>
                <a href="#dashboard" onClick={handleDashboardClick}>
                    <li>View Live Dashboard</li>
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v15a1 1 0 0 0 1 1h15M8 16l2.5-5.5 3 3L17.273 7 20 9.667"/>
                    </svg>
                </a>
            </div>
        </nav>
    )
}

export default Navbar;