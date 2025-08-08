import React, { useState, useEffect } from 'react'; // Import useEffect
import { NavLink, Link } from 'react-router-dom';
import { FaSearch, FaTimes } from 'react-icons/fa';
import './Navbar.css';
import Button from '../Button/Button'; 
import SearchModal from '../SearchModal/SearchModal';
import bhtLogo from '../../assets/bht.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // --- KEY CHANGE #1: STATE TO TRACK SCROLL ---
  const [isScrolled, setIsScrolled] = useState(false);

  const closeMobileMenu = () => setMenuOpen(false);

  const handleOpenSearch = () => {
    setMenuOpen(false);
    setIsSearchOpen(true);
  };
  
  // --- KEY CHANGE #2: EFFECT TO LISTEN FOR SCROLL EVENTS ---
  useEffect(() => {
    const handleScroll = () => {
      // Set isScrolled to true if user scrolls past 80px, false otherwise
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    // Add event listener when component mounts
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty array ensures this effect runs only once on mount


  return (
    <> 
      {/* --- KEY CHANGE #3: CONDITIONALLY APPLY THE 'scrolled' CLASS --- */}
      <nav className={isScrolled ? 'navbar scrolled' : 'navbar'}>
        <div className="navbar-container container">
          <div className="navbar-left">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              <img src={bhtLogo} alt="BHT Corporation Logo" className="navbar-logo-img" />
            </Link>
          </div>

          <div className="navbar-right">
            <ul className={menuOpen ? 'nav-menu active' : 'nav-menu'}>
              {/* All the list items remain the same */}
              <li className="nav-item">
                <NavLink to="/" className="nav-link" onClick={closeMobileMenu}>Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link" onClick={closeMobileMenu}>About</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/services" className="nav-link" onClick={closeMobileMenu}>Services</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/portfolio" className="nav-link" onClick={closeMobileMenu}>Gallery</NavLink>
              </li>
              
               <li className="nav-item">
                <NavLink to="/careers" className="nav-link">Careers</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/faq" className="nav-link" onClick={closeMobileMenu}>FAQ</NavLink>
              </li>
              
            </ul>

            <button className="nav-action-btn" onClick={handleOpenSearch}>
                <FaSearch />
            </button>

            <div className="nav-login-btn-wrapper">
  <Button to="/login" buttonStyle="btn--primary">
    Login
  </Button>
</div>

            <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes /> : '☰'}
            </div>
          </div>
        </div>
      </nav>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;