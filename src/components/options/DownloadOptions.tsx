import React, { useState } from 'react';
import { ImageIcon, FileCode, Download } from 'lucide-react';

export const DownloadOptions: React.FC = () => {
  const [selectedFormat, setSelectedFormat] = useState('png');
  const [resolution, setResolution] = useState(1024);
  
  const formats = [
    { id: 'png', label: 'PNG', icon: <ImageIcon size={20} />, description: 'Best for most uses with transparency support' },
    { id: 'jpg', label: 'JPG', icon: <ImageIcon size={20} />, description: 'Smaller file size, no transparency' },
    { id: 'svg', label: 'SVG', icon: <FileCode size={20} />, description: 'Vector format, scales to any size' }
  ];
  
  const resolutions = [
    { value: 512, label: 'Small (512×512)' },
    { value: 1024, label: 'Medium (1024×1024)' },
    { value: 2048, label: 'Large (2048×2048)' }
  ];

  const handleDownload = () => {
    // Download functionality will be implemented here
    console.log('Downloading:', selectedFormat, resolution);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">File Format</h3>
        <div className="space-y-3">
          {formats.map((format) => (
            <div
              key={format.id}
              onClick={() => setSelectedFormat(format.id)}
              className={`
                flex items-center p-3 rounded-lg cursor-pointer transition-all
                ${selectedFormat === format.id
                  ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                  : 'bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800'}
              `}
            >
              <div
                className={`
                  flex items-center justify-center w-8 h-8 rounded-full mr-3
                  ${selectedFormat === format.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}
                `}
              >
                {format.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">{format.label}</h4>
                  {selectedFormat === format.id && (
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{format.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Image Size</h3>
        <div className="flex gap-3">
          {resolutions.map((res) => (
            <button
              key={res.value}
              onClick={() => setResolution(res.value)}
              className={`
                flex-1 py-2 px-3 text-sm rounded-lg transition-all border
                ${resolution === res.value 
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300' 
                  : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'}
              `}
            >
              {res.label}
            </button>
          ))}
        </div>
      </div>
      
      <button
        onClick={handleDownload}
        className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg
                   bg-blue-600 hover:bg-blue-700 text-white font-medium
                   transition-transform duration-200 transform hover:scale-105
                   shadow-md hover:shadow-lg"
      >
        <Download size={20} />
        <span>Download {selectedFormat.toUpperCase()}</span>
      </button>
    </div>
  );
};