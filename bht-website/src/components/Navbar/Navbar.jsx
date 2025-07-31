import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';
import Button from '../Button/Button'; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMobileMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        {/* We wrap the logo in a new div */}
        <div className="navbar-left">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            BHT Corporation
          </Link>
        </div>

        {/* This part remains the same */}
        <div className="navbar-right">
          <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? '✕' : '☰'}
          </div>
          <ul className={menuOpen ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
              <NavLink to="/" className="nav-link" onClick={closeMobileMenu}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/services" className="nav-link" onClick={closeMobileMenu}>Services</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/portfolio" className="nav-link" onClick={closeMobileMenu}>Portfolio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link" onClick={closeMobileMenu}>About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/faq" className="nav-link" onClick={closeMobileMenu}>FAQ</NavLink>
            </li>
            <li className="nav-btn">
              {/* For this style, an outline button looks best */}
              <Button to="/contact" buttonStyle="btn--outline-light" onClick={closeMobileMenu}>
                Get a Quote
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;