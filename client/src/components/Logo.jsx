import React from 'react';
import logoImg from '../assets/logo.png';

const Logo = ({ size = 'large', className = '' }) => {
  // You can adjust these sizes as needed
  const sizeClasses = {
    small: 'w-12 h-12',
    default: 'w-16 h-16',
    large: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  const textSizes = {
    small: 'text-sm',
    default: 'text-lg',
    large: 'text-3xl',
    xl: 'text-3xl'
  };

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <img
        src={logoImg}
        alt="My Food Logo"
        className="w-14 h-14 object-contain"
        style={{ display: 'block' }}
      />
      <span className={`font-extrabold ${textSizes[size]} text-orange-600 tracking-tight`}>
        MY FOOD
      </span>
    </div>
  );
};

export default Logo; 