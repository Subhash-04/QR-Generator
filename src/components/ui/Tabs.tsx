import React from 'react';
import { Paintbrush, Image, Download } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, setActiveTab }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'brush':
        return <Paintbrush size={18} />;
      case 'image':
        return <Image size={18} />;
      case 'download':
        return <Download size={18} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex border-b border-gray-200 dark:border-gray-700">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`
            flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium -mb-px
            transition-all duration-200 relative
            ${activeTab === tab.id
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 border-b-2 border-transparent'}
          `}
          onClick={() => setActiveTab(tab.id)}
        >
          {getIcon(tab.icon)}
          {tab.label}
        </button>
      ))}
    </div>
  );
};