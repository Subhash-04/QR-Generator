import React from 'react';
import { QrCode, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm py-4 px-6 transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <QrCode className="text-blue-600 dark:text-blue-400 h-8 w-8" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white font-manrope">QR Generator</h1>
        </div>
        
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? (
            <Moon className="h-6 w-6 text-gray-700" />
          ) : (
            <Sun className="h-6 w-6 text-yellow-300" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;