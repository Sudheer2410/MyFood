import React from 'react';

const LogoSimple = ({ size = 'default', showText = true, className = '' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    default: 'w-8 h-8',
    large: 'w-14 h-14',
    xl: 'w-16 h-16',
    xxl: 'w-20 h-20'
  };

  const textSizes = {
    small: 'text-sm',
    default: 'text-lg',
    large: 'text-2xl',
    xl: 'text-3xl',
    xxl: 'text-4xl'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Modern Simple Logo Icon */}
      <div className={`${sizeClasses[size]} relative`}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Plate shadow */}
          <ellipse
            cx="20"
            cy="22"
            rx="15"
            ry="4"
            fill="url(#shadowGradient)"
            opacity="0.2"
          />
          
          {/* Main plate */}
          <circle
            cx="20"
            cy="20"
            r="15"
            fill="url(#plateGradient)"
            stroke="url(#borderGradient)"
            strokeWidth="1.5"
          />
          
          {/* Plate inner */}
          <circle
            cx="20"
            cy="20"
            r="11"
            fill="url(#plateInner)"
            opacity="0.7"
          />
          
          {/* Fork */}
          <path
            d="M13 8 L13 32 M11 8 L15 8 M11 11 L15 11 M11 14 L15 14"
            stroke="url(#utensilGradient)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Knife */}
          <path
            d="M27 8 L27 32 M25 8 L29 8 M25 11 L29 11"
            stroke="url(#utensilGradient)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Food representation */}
          <circle cx="20" cy="22" r="3" fill="url(#foodGradient)" />
          
          {/* Steam */}
          <path
            d="M18 6 Q20 4 22 6 M20 4 Q22 2 24 4"
            stroke="url(#steamGradient)"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.5"
          />
          
          {/* Gradients */}
          <defs>
            <linearGradient id="shadowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#000000" />
              <stop offset="100%" stopColor="#374151" />
            </linearGradient>
            
            <linearGradient id="plateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f8fafc" />
            </linearGradient>
            
            <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
            
            <linearGradient id="plateInner" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef2f2" />
              <stop offset="100%" stopColor="#fee2e2" />
            </linearGradient>
            
            <linearGradient id="utensilGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6b7280" />
              <stop offset="100%" stopColor="#374151" />
            </linearGradient>
            
            <linearGradient id="foodGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            
            <linearGradient id="steamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e5e7eb" />
              <stop offset="100%" stopColor="#d1d5db" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Logo Text */}
      {showText && (
        <div className={`font-extrabold ${textSizes[size]} bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-transparent tracking-tight`}>
          MyFood
        </div>
      )}
    </div>
  );
};

export default LogoSimple; 