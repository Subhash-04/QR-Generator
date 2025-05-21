import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openItems, setOpenItems] = useState<number[]>([0]); // Open first item by default
  
  const toggleItem = (index: number) => {
    setOpenItems((prev) => 
      prev.includes(index) 
        ? prev.filter((i) => i !== index) 
        : [...prev, index]
    );
  };
  
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {items.map((item, index) => (
        <div key={index} className="py-2">
          <button
            onClick={() => toggleItem(index)}
            className="flex justify-between items-center w-full py-3 text-left"
          >
            <h3 className="text-base font-medium text-gray-800 dark:text-white">
              {item.title}
            </h3>
            <ChevronDown 
              className={`transform transition-transform duration-200 ${
                openItems.includes(index) ? 'rotate-180' : ''
              }`} 
              size={20}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openItems.includes(index) ? 'max-h-screen' : 'max-h-0'
            }`}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
};