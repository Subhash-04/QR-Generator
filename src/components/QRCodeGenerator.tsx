import React, { useState } from 'react';
import { InputSection } from './input/InputSection';
import { QRPreview } from './preview/QRPreview';
import { StyleOptions } from './options/StyleOptions';
import { LogoOptions } from './options/LogoOptions';
import { Tabs } from './ui/Tabs';
import { QRCodeOptions, LogoConfig } from '../types';

export const QRCodeGenerator: React.FC = () => {
  const [url, setUrl] = useState<string>('https://example.com');
  const [qrOptions, setQrOptions] = useState<QRCodeOptions>({
    size: 200,
    fgColor: '#3A86FF',
    bgColor: '#FFFFFF',
    level: 'M',
    includeMargin: true,
    eyeRadius: 0,
    moduleRadius: 0,
    eyeColor: '#3A86FF',
    gradientType: 'none',
    gradientFrom: '#3A86FF',
    gradientTo: '#FF006E',
    gradientDirection: 'to bottom right'
  });
  
  const [logoConfig, setLogoConfig] = useState<LogoConfig>({
    logo: null,
    logoSize: 50,
    logoOpacity: 1,
    logoBorderRadius: 0,
    logoMargin: 0
  });

  const tabs = [
    { id: 'style', label: 'Style', icon: 'brush' },
    { id: 'logo', label: 'Logo', icon: 'image' }
  ];
  
  const [activeTab, setActiveTab] = useState('style');

  const updateQrOptions = (newOptions: Partial<QRCodeOptions>) => {
    setQrOptions(prev => ({ ...prev, ...newOptions }));
  };

  const updateLogoConfig = (newConfig: Partial<LogoConfig>) => {
    setLogoConfig(prev => ({ ...prev, ...newConfig }));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-2/5 space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300">
          <InputSection url={url} setUrl={setUrl} />
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300">
          <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className="mt-6">
            {activeTab === 'style' && (
              <StyleOptions options={qrOptions} updateOptions={updateQrOptions} />
            )}
            
            {activeTab === 'logo' && (
              <LogoOptions logoConfig={logoConfig} updateLogoConfig={updateLogoConfig} />
            )}
          </div>
        </div>
      </div>
      
      <div className="w-full lg:w-3/5">
        <QRPreview
          url={url}
          options={qrOptions}
          logoConfig={logoConfig}
        />
      </div>
    </div>
  );
};