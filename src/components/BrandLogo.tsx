import React from 'react';

interface BrandLogoProps {
  className?: string;
  iconOnly?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = 'h-8 sm:h-9 w-auto', iconOnly = false }) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Geometric Architectural "V" Leaf Icon */}
      <div className="relative shrink-0 flex items-center justify-center">
        {/* Subtle Ambient Back-Glow */}
        <div className="absolute inset-0 rounded-xl bg-purple-60/25 blur-sm" />
        
        <svg
          viewBox="0 0 40 40"
          className="w-8 h-8 sm:w-9 sm:h-9 relative z-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="verdantLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E599" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="verdantLeafFacet" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
          </defs>

          {/* Left Wing of 'V' (Architectural faceted leaf) */}
          <path
            d="M 6 8 L 20 34 L 16 34 L 3 14 Z"
            fill="url(#verdantLeafGrad)"
          />
          {/* Right Wing of 'V' (Ascending architectural leaf) */}
          <path
            d="M 34 8 L 20 34 L 24 34 L 37 14 Z"
            fill="url(#verdantLeafFacet)"
          />
          {/* Central Architectural Apex Diamond / Leaf vein */}
          <path
            d="M 20 12 L 26 24 L 20 32 L 14 24 Z"
            fill="#00E599"
            opacity="0.95"
          />
          <path
            d="M 20 12 L 26 24 L 20 32 Z"
            fill="#059669"
            opacity="0.8"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      {!iconOnly && (
        <div className="flex flex-col tracking-tight leading-none">
          <span className="text-lg sm:text-xl font-extrabold text-white tracking-wide">
            Verdant<span className="text-purple-60">.</span>
          </span>
          <span className="text-[9px] font-semibold tracking-[0.28em] text-grey-60 uppercase -mt-0.5">
            Estates
          </span>
        </div>
      )}
    </div>
  );
};
