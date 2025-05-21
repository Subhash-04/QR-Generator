export interface QRCodeOptions {
  size: number;
  fgColor: string;
  bgColor: string;
  level: 'L' | 'M' | 'Q' | 'H';
  includeMargin: boolean;
  moduleRadius: number;
  eyeRadius: number;
  eyeColor: string;
  gradientType: 'none' | 'linear' | 'radial';
  gradientFrom: string;
  gradientTo: string;
  gradientDirection: string;
}

export interface LogoConfig {
  logo: string | null;
  logoSize: number;
  logoOpacity: number;
  logoBorderRadius: number;
  logoMargin: number;
}