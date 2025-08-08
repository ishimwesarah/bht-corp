import React, { useState, useEffect } from 'react'; 
import { NavLink, Link } from 'react-router-dom';
import { FaSearch, FaTimes } from 'react-icons/fa';
import './Navbar.css';
import Button from '../Button/Button'; 
import SearchModal from '../SearchModal/SearchModal';
import bhtLogo from '../../assets/logo.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
 
  const [isScrolled, setIsScrolled] = useState(false);

  const closeMobileMenu = () => setMenuOpen(false);

  const handleOpenSearch = () => {
    setMenuOpen(false);
    setIsSearchOpen(true);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
   
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 


  return (
    <> 
     
      <nav className={isScrolled ? 'navbar scrolled' : 'navbar'}>
        <div className="navbar-container container">
          <div className="navbar-left">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              <img src={bhtLogo} alt="BHT Corporation Logo" className="navbar-logo-img" />
            </Link>
          </div>

          <div className="navbar-right">
            <ul className={menuOpen ? 'nav-menu active' : 'nav-menu'}>
             
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