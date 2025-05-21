import React, { ChangeEvent } from 'react';
import { Link } from 'lucide-react';

interface InputSectionProps {
  url: string;
  setUrl: (url: string) => void;
}

export const InputSection: React.FC<InputSectionProps> = ({ url, setUrl }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white font-manrope mb-4 flex items-center">
        <Link className="mr-2 text-blue-500" size={22} />
        Enter URL or Text
      </h2>
      
      <div className="relative">
        <input
          type="text"
          value={url}
          onChange={handleInputChange}
          placeholder="https://example.com"
          className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg 
                     focus:border-blue-500 dark:focus:border-blue-400 
                     bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                     transition-all duration-200 outline-none font-inter"
          autoFocus
        />
        {url && (
          <button 
            onClick={() => setUrl('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 
                       hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            aria-label="Clear input"
          >
            ×
          </button>
        )}
      </div>
      
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Enter a URL, text, contact information, or any data you want to encode in the QR code.
      </div>
    </div>
  );
};