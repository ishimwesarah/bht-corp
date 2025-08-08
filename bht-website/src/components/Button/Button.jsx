import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

// Define styles and sizes as arrays for easy checking
const STYLES = ['btn--primary', 'btn--outline'];
const SIZES = ['btn--medium', 'btn--large'];

const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  to 
}) => {
  
  const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  const className = `btn ${checkButtonStyle} ${checkButtonSize}`;

  
  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  
  return (
    <button
      className={className}
      onClick={onClick}
      type={type || 'button'}
    >
      {children}
    </button>
  );
};

export default Button;