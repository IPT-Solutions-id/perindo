import React from 'react';

interface WingLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textClassName?: string;
}

export const WingLogo: React.FC<WingLogoProps> = ({
  className = '',
  size = 32,
  showText = true,
  textClassName = 'text-slate-900',
}) => {
  return (
    <div className={`flex items-center gap-2.5 shrink-0 ${className}`}>
      {/* Neutral Geometric Wing Emblem Placeholder */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-xs"
        aria-label="Logo Sayap Organisasi (Placeholder Netral)"
      >
        <rect width="40" height="40" rx="10" fill="#102C63" />
        {/* Left wing feather feather primary */}
        <path
          d="M9 25.5C12.5 25.5 17 21 19 16C19 19.5 15.5 27 9 27.5V25.5Z"
          fill="#FFFFFF"
        />
        {/* Left wing feather upper */}
        <path
          d="M11 20.5C15 20.5 19.5 16.5 20 12C18.5 15 15 22 11 22.5V20.5Z"
          fill="#1667C7"
        />
        {/* Right wing feather primary - Red accent */}
        <path
          d="M31 25.5C27.5 25.5 23 21 21 16C21 19.5 24.5 27 31 27.5V25.5Z"
          fill="#D7283F"
        />
        {/* Right wing feather upper */}
        <path
          d="M29 20.5C25 20.5 20.5 16.5 20 12C21.5 15 25 22 29 22.5V20.5Z"
          fill="#FFFFFF"
        />
        {/* Central emblem star / shield nucleus */}
        <circle cx="20" cy="22" r="2.2" fill="#FFFFFF" />
      </svg>

      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className={`font-bold tracking-tight text-base ${textClassName}`}>
              PERINDO ONE
            </span>
          </div>
          <span className="text-[10px] tracking-wider uppercase text-slate-500 font-medium mt-0.5">
            Manajemen Organisasi
          </span>
        </div>
      )}
    </div>
  );
};
