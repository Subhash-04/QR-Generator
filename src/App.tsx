import React from 'react';
import { QRCodeGenerator } from './components/QRCodeGenerator';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/layout/Header';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col transition-colors duration-300">
        <Header />
        <main className="flex-1 container mx-auto p-4 sm:p-6 md:p-8">
          <QRCodeGenerator />
        </main>
        <footer className="text-center py-6 text-gray-500 dark:text-gray-400 text-sm">
          <p>© 2025 QR Code Generator • Created by Subhash Mandalapu</p>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;