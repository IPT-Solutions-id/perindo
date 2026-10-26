import React from 'react';

interface WingLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textClassName?: string;
  variant?: 'symbol' | 'full';
}

export const WingLogo: React.FC<WingLogoProps> = ({
  className = '',
  size = 36,
  showText = true,
  textClassName = 'text-slate-900',
  variant = 'symbol',
}) => {
  if (variant === 'full') {
    return (
      <div className={`flex items-center ${className}`}>
        <img
          src="/assets/logo.png"
          alt="Partai Perindo - Persatuan Indonesia"
          className="object-contain"
          style={{ height: size * 1.25 }}
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 shrink-0 ${className}`}>
      {/* Official Soaring Eagle Wings Logo Symbol */}
      <div
        className="flex items-center justify-center shrink-0 drop-shadow-xs"
        style={{ height: size }}
      >
        <img
          src="/assets/logo_symbol.png"
          alt="Logo Garuda Sayap Perindo"
          className="h-full w-auto object-contain"
          onError={(e) => {
            // Fallback to full logo if symbol not found
            e.currentTarget.src = '/assets/logo.png';
          }}
        />
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className={`font-black tracking-tight text-base sm:text-lg ${textClassName}`}>
              PERINDO<span className="text-[#D7283F] ml-1 font-bold">ONE</span>
            </span>
          </div>
          <span className="text-[10px] tracking-wider uppercase text-slate-500 font-semibold mt-0.5">
            Manajemen Organisasi
          </span>
        </div>
      )}
    </div>
  );
};
