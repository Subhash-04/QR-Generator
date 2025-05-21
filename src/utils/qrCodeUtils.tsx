import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { QRCodeOptions, LogoConfig } from '../types';

export const generateQRCodeWithOptions = (
  value: string, 
  options: QRCodeOptions,
  logoConfig: LogoConfig
) => {
  const qrOptions = {
    value,
    size: options.size,
    bgColor: options.bgColor,
    level: options.level,
    includeMargin: options.includeMargin,
    renderAs: 'canvas' as const,
    imageSettings: logoConfig.logo 
      ? {
          src: logoConfig.logo,
          height: logoConfig.logoSize,
          width: logoConfig.logoSize,
          excavate: true,
          x: undefined,
          y: undefined,
        } 
      : undefined
  };

  const gradientId = `qr-gradient-${value.length}`;
  
  return (
    <div className="relative group transition-all duration-500 ease-out transform-gpu
                    hover:rotate-y-12 hover:rotate-x-12"
         style={{ transformStyle: 'preserve-3d' }}>
      {options.gradientType !== 'none' && (
        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient id={gradientId} gradientTransform={`rotate(${getGradientAngle(options.gradientDirection)})`}>
              <stop offset="0%" stopColor={options.gradientFrom} />
              <stop offset="100%" stopColor={options.gradientTo} />
            </linearGradient>
          </defs>
        </svg>
      )}
      
      <div className="relative z-10 transition-transform duration-500 ease-out
                      shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-xl overflow-hidden
                      group-hover:shadow-[0_32px_64px_rgba(0,0,0,0.2)]">
        <QRCodeCanvas 
          {...qrOptions} 
          fgColor={options.gradientType === 'none' ? options.fgColor : `url(#${gradientId})`}
          style={{
            borderRadius: `${options.moduleRadius}px`,
            transition: 'all 0.5s ease',
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/20 
                       dark:to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      {logoConfig.logo && (
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20
                     transition-all duration-500 ease-out"
          style={{
            width: `${logoConfig.logoSize}px`,
            height: `${logoConfig.logoSize}px`,
            opacity: logoConfig.logoOpacity,
            borderRadius: `${logoConfig.logoBorderRadius}%`,
            padding: `${logoConfig.logoMargin}px`,
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            transform: `translate(-50%, -50%) translateZ(20px)`,
          }}
        >
          <img 
            src={logoConfig.logo} 
            alt="Logo"
            className="w-full h-full object-contain rounded-[inherit] transition-transform duration-500
                       group-hover:scale-110"
            style={{ 
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
            }}
          />
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-white/5 
                     rounded-xl -z-10 transform translate-z-[-10px]" 
           style={{ transform: 'translateZ(-10px)' }} />
    </div>
  );
};

const getGradientAngle = (direction: string): number => {
  const angles: Record<string, number> = {
    'to right': 90,
    'to bottom right': 135,
    'to bottom': 180,
    'to bottom left': 225,
    'to left': 270,
    'to top left': 315,
    'to top': 0,
    'to top right': 45,
  };
  return angles[direction] || 0;
};