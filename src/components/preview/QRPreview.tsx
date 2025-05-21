import React, { useRef, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Share2, Copy, Check } from 'lucide-react';
import { QRCodeOptions, LogoConfig } from '../../types';
import { generateQRCodeWithOptions } from '../../utils/qrCodeUtils';
import { downloadQRCode } from '../../utils/downloadUtils';

interface QRPreviewProps {
  url: string;
  options: QRCodeOptions;
  logoConfig: LogoConfig;
}

export const QRPreview: React.FC<QRPreviewProps> = ({ url, options, logoConfig }) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.classList.add('scale-100', 'opacity-100');
    }
  }, [url, options, logoConfig]);

  const handleDownload = async () => {
    if (qrRef.current) {
      downloadQRCode(qrRef.current, 'qrcode.png');
    }
  };

  const copyToClipboard = async () => {
    if (!qrRef.current) return;

    try {
      const canvas = qrRef.current.querySelector('canvas');
      if (canvas) {
        const blob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((blob) => {
            if (blob) resolve(blob);
          });
        });
        
        await navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob
          })
        ]);
        
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      // Fallback to copying the URL if image copy fails
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (!qrRef.current) return;

    try {
      // Check if Web Share API Level 2 (with file sharing) is available
      if (navigator.share && navigator.canShare) {
        const canvas = qrRef.current.querySelector('canvas');
        if (canvas) {
          const blob = await new Promise<Blob>((resolve) => {
            canvas.toBlob((blob) => {
              if (blob) resolve(blob);
            });
          });
          
          const file = new File([blob], 'qrcode.png', { type: 'image/png' });
          const shareData = {
            title: 'My QR Code',
            text: 'Check out my custom QR code!',
            files: [file]
          };

          // Check if we can share files
          if (navigator.canShare(shareData)) {
            await navigator.share(shareData);
            return;
          }
        }
      }
      
      // Fallback to clipboard if sharing fails or is not available
      await copyToClipboard();
    } catch (error) {
      console.error('Error sharing QR code:', error);
      // Fallback to clipboard if sharing fails
      await copyToClipboard();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800/95 rounded-3xl shadow-2xl p-8 flex flex-col items-center 
                    backdrop-blur-xl backdrop-saturate-150 transition-all duration-500 
                    hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]
                    dark:hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white font-manrope mb-8 
                     relative after:content-[''] after:absolute after:-bottom-2 after:left-1/2 
                     after:-translate-x-1/2 after:w-12 after:h-1 after:bg-blue-500 
                     after:rounded-full">
        QR Code Preview
      </h2>
      
      <div 
        ref={qrRef}
        className="relative bg-gradient-to-r from-gray-50/80 to-gray-100/80 
                   dark:from-gray-700/50 dark:to-gray-800/50
                   p-12 rounded-2xl mb-8 overflow-hidden group
                   backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.1)]
                   dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]
                   transition-all duration-500 ease-out
                   hover:shadow-[0_20px_80px_rgba(0,0,0,0.2)]
                   dark:hover:shadow-[0_20px_80px_rgba(0,0,0,0.4)]"
      >
        <div 
          ref={previewRef}
          className="relative transform scale-95 opacity-0 transition-all duration-500 
                     ease-out group-hover:scale-105"
          style={{
            transformStyle: 'preserve-3d',
            perspective: '1000px'
          }}
        >
          {generateQRCodeWithOptions(url, options, logoConfig)}
          
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/20 
                         dark:from-black/0 dark:to-white/10 rounded-xl opacity-0 
                         group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
      
      <div className="flex gap-4 w-full justify-center">
        <button
          onClick={handleDownload}
          className="flex-1 max-w-[200px] flex items-center justify-center gap-2 px-6 py-3.5 
                     rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium
                     transition-all duration-300 transform hover:scale-105 hover:shadow-xl
                     hover:shadow-blue-500/25 active:scale-95"
        >
          <Download className="w-5 h-5" />
          <span>Download</span>
        </button>
        
        <button
          onClick={handleShare}
          className="flex-1 max-w-[200px] flex items-center justify-center gap-2 px-6 py-3.5 
                     rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 
                     dark:from-gray-700 dark:to-gray-600
                     text-gray-700 dark:text-white font-medium
                     transition-all duration-300 transform hover:scale-105 
                     hover:shadow-xl hover:shadow-gray-500/25 active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-5 h-5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};