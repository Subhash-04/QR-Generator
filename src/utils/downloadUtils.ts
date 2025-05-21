import { toPng, toJpeg } from 'html-to-image';

export const downloadQRCode = async (
  node: HTMLElement,
  fileName: string = 'qrcode.png',
  format: 'png' | 'jpeg' = 'png'
) => {
  try {
    let dataUrl: string;
    
    switch (format) {
      case 'jpeg':
        dataUrl = await toJpeg(node, { quality: 0.95 });
        fileName = fileName.replace(/\.(png)$/i, '.jpg');
        break;
      default:
        dataUrl = await toPng(node, { quality: 0.95 });
        fileName = fileName.replace(/\.(jpg|jpeg)$/i, '.png');
    }
    
    // Create download link
    const link = document.createElement('a');
    link.download = fileName;
    link.href = dataUrl;
    link.click();
    
    return true;
  } catch (error) {
    console.error('Error downloading QR code:', error);
    return false;
  }
};