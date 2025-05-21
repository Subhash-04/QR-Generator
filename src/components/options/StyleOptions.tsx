import React from 'react';
import { Palette, Droplet } from 'lucide-react';
import { QRCodeOptions } from '../../types';
import { Slider } from '../ui/Slider';
import { Accordion } from '../ui/Accordion';
import ColorPicker from '../ui/ColorPicker';

interface StyleOptionsProps {
  options: QRCodeOptions;
  updateOptions: (newOptions: Partial<QRCodeOptions>) => void;
}

export const StyleOptions: React.FC<StyleOptionsProps> = ({ options, updateOptions }) => {
  const colorItems = [
    { label: 'QR Color', key: 'fgColor', value: options.fgColor, icon: <Palette size={18} /> },
    { label: 'Background', key: 'bgColor', value: options.bgColor, icon: <Droplet size={18} /> }
  ];

  const shapeItems = [
    { label: 'Module Shape', options: [
      { value: 0, label: 'Square' },
      { value: 4, label: 'Rounded' },
      { value: 50, label: 'Circle' }
    ], key: 'moduleRadius' }
  ];

  const accordionItems = [
    {
      title: 'Colors',
      content: (
        <div className="space-y-6 py-2">
          {colorItems.map((item) => (
            <div key={item.key} className="space-y-3">
              <ColorPicker
                label={item.label}
                color={item.value}
                onChange={(color) => updateOptions({ [item.key]: color })}
              />
            </div>
          ))}
          
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">QR Code Size</label>
              <span className="text-sm text-gray-500 dark:text-gray-400">{options.size}px</span>
            </div>
            <Slider
              min={100}
              max={400}
              value={options.size}
              onChange={(value) => updateOptions({ size: value })}
            />
          </div>
        </div>
      )
    },
    {
      title: 'Shapes & Styles',
      content: (
        <div className="space-y-6 py-2">
          {shapeItems.map((item) => (
            <div key={item.key} className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {item.label}
              </label>
              <div className="flex gap-2">
                {item.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateOptions({ [item.key]: option.value })}
                    className={`
                      flex-1 py-2 text-sm rounded-lg transition-all
                      ${options[item.key as keyof QRCodeOptions] === option.value 
                        ? 'bg-blue-500 text-white shadow-md' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}
                    `}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Error Correction
            </label>
            <div className="flex gap-2">
              {['L', 'M', 'Q', 'H'].map((level) => (
                <button
                  key={level}
                  onClick={() => updateOptions({ level: level as 'L' | 'M' | 'Q' | 'H' })}
                  className={`
                    flex-1 py-2 text-sm rounded-lg transition-all
                    ${options.level === level 
                      ? 'bg-blue-500 text-white shadow-md' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}
                  `}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4">
      <Accordion items={accordionItems} />
    </div>
  );
};