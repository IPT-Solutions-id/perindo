import React from 'react';

interface PerindoSilhouetteProps {
  className?: string;
  size?: number | string;
  opacity?: number;
  color?: string; // default to brand navy or currentColor
  variant?: 'wings' | 'emblem' | 'full';
}

/**
 * High-definition vector silhouette of the Perindo soaring eagle wings motif.
 * Precision geometry ensures zero blur and crisp rendering across all screen densities.
 */
export const PerindoSilhouette: React.FC<PerindoSilhouetteProps> = ({
  className = '',
  size = 120,
  opacity = 1,
  color = 'currentColor',
  variant = 'wings',
}) => {
  return (
    <svg
      viewBox="0 0 200 160"
      width={size}
      height={typeof size === 'number' ? (size * 160) / 200 : undefined}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      <g fill={color}>
        {/* Left Wing Upper Feathers */}
        <path d="M96 75C82 50 56 22 18 10C34 26 50 48 64 74C46 54 26 38 4 30C16 46 32 68 46 94C34 80 18 68 0 62C12 76 26 98 38 122C54 116 76 102 96 75Z" />
        
        {/* Left Wing Middle Feathers */}
        <path d="M92 88C78 104 56 122 22 136C40 130 64 120 84 104C70 118 50 134 28 144C44 140 68 128 88 114L92 88Z" />

        {/* Right Wing Upper Feathers */}
        <path d="M104 75C118 50 144 22 182 10C166 26 150 48 136 74C154 54 174 38 196 30C184 46 168 68 154 94C166 80 182 68 200 62C188 76 174 98 162 122C146 116 124 102 104 75Z" />
        
        {/* Right Wing Middle Feathers */}
        <path d="M108 88C122 104 144 122 178 136C160 130 136 120 116 104C130 118 150 134 172 144C156 140 132 128 112 114L108 88Z" />

        {/* Central Rising Chevron / Shield Spine */}
        <path d="M100 24L110 52L100 78L90 52L100 24Z" />
        <path d="M100 84L108 106L100 128L92 106L100 84Z" />

        {/* Upward Energy Core Arrow */}
        <path d="M100 134L106 148L100 158L94 148L100 134Z" />
      </g>
    </svg>
  );
};

/**
 * Repeating seamless pattern background using the Perindo wings silhouette motif.
 */
export const PerindoPatternBackground: React.FC<{
  className?: string;
  patternOpacity?: number;
  scale?: number;
  inverted?: boolean;
}> = ({ className = '', patternOpacity = 0.04, scale = 70, inverted = false }) => {
  const patternId = React.useId();
  const fillColor = inverted ? '#FFFFFF' : '#102C63';

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" style={{ opacity: patternOpacity }}>
        <defs>
          <pattern
            id={patternId}
            width={scale * 2}
            height={scale * 1.6}
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(12)"
          >
            {/* Staggered Perindo Wings Silhouette Unit 1 */}
            <g transform={`translate(${scale * 0.1}, ${scale * 0.1}) scale(${scale / 220})`} fill={fillColor}>
              <path d="M96 75C82 50 56 22 18 10C34 26 50 48 64 74C46 54 26 38 4 30C16 46 32 68 46 94C34 80 18 68 0 62C12 76 26 98 38 122C54 116 76 102 96 75Z" />
              <path d="M104 75C118 50 144 22 182 10C166 26 150 48 136 74C154 54 174 38 196 30C184 46 168 68 154 94C166 80 182 68 200 62C188 76 174 98 162 122C146 116 124 102 104 75Z" />
              <path d="M100 30L108 55L100 78L92 55L100 30Z" />
            </g>

            {/* Staggered Perindo Wings Silhouette Unit 2 */}
            <g transform={`translate(${scale * 1.1}, ${scale * 0.9}) scale(${scale / 240})`} fill={fillColor}>
              <path d="M96 75C82 50 56 22 18 10C34 26 50 48 64 74C46 54 26 38 4 30C16 46 32 68 46 94C34 80 18 68 0 62C12 76 26 98 38 122C54 116 76 102 96 75Z" />
              <path d="M104 75C118 50 144 22 182 10C166 26 150 48 136 74C154 54 174 38 196 30C184 46 168 68 154 94C166 80 182 68 200 62C188 76 174 98 162 122C146 116 124 102 104 75Z" />
              <path d="M100 30L108 55L100 78L92 55L100 30Z" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
};

/**
 * Subtle watermark badge for cards (KTA, stat cards, feature cards).
 * Sits elegantly in the corner or background of a card.
 */
export const PerindoCardWatermark: React.FC<{
  className?: string;
  size?: number;
  opacity?: number;
  variant?: 'silhouette' | 'symbol-image';
  color?: string;
}> = ({
  className = '-right-5 -bottom-5',
  size = 110,
  opacity = 0.07,
  variant = 'silhouette',
  color = '#102C63',
}) => {
  if (variant === 'symbol-image') {
    return (
      <div
        className={`absolute pointer-events-none select-none z-0 transition-opacity duration-300 ${className}`}
        style={{ width: size, height: size, opacity }}
      >
        <img
          src="/assets/logo_symbol.png"
          alt=""
          className="w-full h-full object-contain filter grayscale contrast-200"
        />
      </div>
    );
  }

  return (
    <div
      className={`absolute pointer-events-none select-none z-0 transition-opacity duration-300 ${className}`}
      style={{ width: size, height: (size * 160) / 200, opacity }}
    >
      <PerindoSilhouette size="100%" color={color} />
    </div>
  );
};
