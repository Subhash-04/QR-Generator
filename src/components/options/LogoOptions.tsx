import React, { useCallback } from 'react';
import { Upload, Trash2 } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { LogoConfig } from '../../types';
import { Slider } from '../ui/Slider';

interface LogoOptionsProps {
  logoConfig: LogoConfig;
  updateLogoConfig: (newConfig: Partial<LogoConfig>) => void;
}

export const LogoOptions: React.FC<LogoOptionsProps> = ({ 
  logoConfig, 
  updateLogoConfig 
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        
        reader.onload = (e) => {
          if (e.target?.result) {
            updateLogoConfig({ logo: e.target.result as string });
          }
        };
        
        reader.readAsDataURL(file);
      }
    },
    [updateLogoConfig]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.svg']
    },
    maxFiles: 1
  });

  const removeLogo = () => {
    updateLogoConfig({ logo: null });
  };

  return (
    <div className="space-y-6">
      <div 
        {...getRootProps()} 
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all
          ${isDragActive 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-400'}
        `}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-2" />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {isDragActive
            ? "Drop your logo here..."
            : "Drag & drop your logo image, or click to select"}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
          Recommended: PNG with transparent background
        </p>
      </div>

      {logoConfig.logo && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Logo Preview</h3>
            <button
              onClick={removeLogo}
              className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 
                       flex items-center gap-1 text-sm transition-colors"
            >
              <Trash2 size={16} />
              <span>Remove</span>
            </button>
          </div>
          
          <div className="flex justify-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div 
              className="relative"
              style={{
                width: `${logoConfig.logoSize}px`,
                height: `${logoConfig.logoSize}px`,
                opacity: logoConfig.logoOpacity,
                borderRadius: `${logoConfig.logoBorderRadius}%`,
                margin: `${logoConfig.logoMargin}px`,
                overflow: 'hidden'
              }}
            >
              <img 
                src={logoConfig.logo} 
                alt="Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Logo Size</label>
                <span className="text-sm text-gray-500 dark:text-gray-400">{logoConfig.logoSize}px</span>
              </div>
              <Slider
                min={20}
                max={40}
                value={logoConfig.logoSize}
                onChange={(value) => updateLogoConfig({ logoSize: value })}
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Opacity</label>
                <span className="text-sm text-gray-500 dark:text-gray-400">{Math.round(logoConfig.logoOpacity * 100)}%</span>
              </div>
              <Slider
                min={0.1}
                max={1}
                step={0.05}
                value={logoConfig.logoOpacity}
                onChange={(value) => updateLogoConfig({ logoOpacity: value })}
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Border Radius</label>
                <span className="text-sm text-gray-500 dark:text-gray-400">{logoConfig.logoBorderRadius}%</span>
              </div>
              <Slider
                min={0}
                max={50}
                value={logoConfig.logoBorderRadius}
                onChange={(value) => updateLogoConfig({ logoBorderRadius: value })}
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Logo Margin</label>
                <span className="text-sm text-gray-500 dark:text-gray-400">{logoConfig.logoMargin}px</span>
              </div>
              <Slider
                min={0}
                max={20}
                value={logoConfig.logoMargin}
                onChange={(value) => updateLogoConfig({ logoMargin: value })}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};