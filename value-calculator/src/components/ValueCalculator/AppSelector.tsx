import React, { useState } from 'react';
import { useValueCalculator } from '../../context/ValueCalculatorContext';
import { Check } from 'lucide-react';
import { getCategoryDescription } from '../../data/categories';

const AppSelector: React.FC = () => {
  const { state, toggleAppSelection, apps } = useValueCalculator();
  const { selectedApps } = state;
  const [hoveredAppId, setHoveredAppId] = useState<string | null>(null);

  const appLogos: Record<string, string> = {
    'Slack': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127 127"%3E%3Cpath d="M27.2,80c0,7.5-6.1,13.6-13.6,13.6C6.1,93.6,0,87.5,0,80c0-7.5,6.1-13.6,13.6-13.6h13.6V80z" fill="%23E01E5A"/%3E%3Cpath d="M27.2,27.2c0-7.5,6.1-13.6,13.6-13.6c7.5,0,13.6,6.1,13.6,13.6v40.8c0,7.5-6.1,13.6-13.6,13.6c-7.5,0-13.6-6.1-13.6-13.6V27.2z" fill="%23E01E5A"/%3E%3Cpath d="M47,13.6c-7.5,0-13.6-6.1-13.6-13.6C33.4,0,39.5,0,47,0c7.5,0,13.6,6.1,13.6,13.6v13.6H47V13.6z" fill="%2336C5F0"/%3E%3Cpath d="M99.8,27.2c7.5,0,13.6,6.1,13.6,13.6c0,7.5-6.1,13.6-13.6,13.6H59c-7.5,0-13.6-6.1-13.6-13.6c0-7.5,6.1-13.6,13.6-13.6H99.8z" fill="%2336C5F0"/%3E%3Cpath d="M113.4,47c7.5,0,13.6,6.1,13.6,13.6c0,7.5-6.1,13.6-13.6,13.6c-7.5,0-13.6-6.1-13.6-13.6V47H113.4z" fill="%232EB67D"/%3E%3Cpath d="M59,99.8c7.5,0,13.6,6.1,13.6,13.6c0,7.5-6.1,13.6-13.6,13.6c-7.5,0-13.6-6.1-13.6-13.6V99.8H59z" fill="%232EB67D"/%3E%3C/svg%3E',
    'Microsoft Teams': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"%3E%3Crect width="48" height="48" fill="%235B5FC7" rx="4"/%3E%3Cg fill="white"%3E%3Ccircle cx="12" cy="15" r="4"/%3E%3Crect x="18" y="11" width="16" height="8" rx="2"/%3E%3Ccircle cx="12" cy="24" r="4"/%3E%3Crect x="18" y="20" width="16" height="8" rx="2"/%3E%3Ccircle cx="36" cy="19" r="4"/%3E%3C/g%3E%3C/svg%3E',
    'Google Drive': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"%3E%3Cpath fill="%234285F4" d="M16 6L6 26l10 18h32V6z"/%3E%3Cpath fill="%2334A853" d="M26 24L16 6l16 0z"/%3E%3Cpath fill="%23FBBC04" d="M16 26l10 18L26 24z"/%3E%3C/svg%3E',
    'Salesforce': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"%3E%3Ccircle cx="24" cy="24" r="22" fill="%2300A1E0"/%3E%3Ctext x="24" y="32" font-size="24" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial"%3ESF%3C/text%3E%3C/svg%3E',
    'Hubspot': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"%3E%3Crect width="48" height="48" fill="%23FF7A59" rx="4"/%3E%3Cg fill="white" stroke="white" stroke-width="2"%3E%3Ccircle cx="24" cy="14" r="3"/%3E%3Ccircle cx="34" cy="24" r="3"/%3E%3Ccircle cx="24" cy="34" r="3"/%3E%3Ccircle cx="14" cy="24" r="3"/%3E%3Cpath d="M24 17v10" stroke-linecap="round"/%3E%3Cpath d="M27 27l7 7" stroke-linecap="round"/%3E%3Cpath d="M21 27l-7 7" stroke-linecap="round"/%3E%3C/g%3E%3C/svg%3E',
    'Asana': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"%3E%3Crect width="48" height="48" fill="%23F06A4D" rx="4"/%3E%3Ccircle cx="12" cy="16" r="4" fill="white"/%3E%3Ccircle cx="36" cy="16" r="4" fill="white"/%3E%3Crect x="8" y="28" width="32" height="4" rx="2" fill="white"/%3E%3C/svg%3E',
    'Notion': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"%3E%3Crect width="48" height="48" fill="black" rx="4"/%3E%3Ctext x="50%25" y="50%25" font-size="28" font-weight="bold" text-anchor="middle" dominant-baseline="middle" fill="white" font-family="Georgia"%3E%E2%9C%93%3C/text%3E%3C/svg%3E',
    'Monday.com': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"%3E%3Crect width="48" height="48" fill="%23623CEA" rx="4"/%3E%3Cg fill="white"%3E%3Crect x="6" y="12" width="10" height="10" rx="2"/%3E%3Crect x="19" y="12" width="10" height="10" rx="2"/%3E%3Crect x="32" y="12" width="10" height="10" rx="2"/%3E%3Crect x="6" y="26" width="10" height="10" rx="2"/%3E%3Crect x="19" y="26" width="10" height="10" rx="2"/%3E%3Crect x="32" y="26" width="10" height="10" rx="2"/%3E%3C/g%3E%3C/svg%3E',
    'Trello': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"%3E%3Crect width="48" height="48" fill="%230079BF" rx="4"/%3E%3Crect x="8" y="8" width="12" height="26" rx="2" fill="white" opacity="0.8"/%3E%3Crect x="26" y="12" width="12" height="22" rx="2" fill="white" opacity="0.8"/%3E%3C/svg%3E',
    'Jira': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"%3E%3Crect width="48" height="48" fill="%230052CC" rx="4"/%3E%3Cpath d="M24 8L38 24L24 40L10 24Z" fill="white"/%3E%3C/svg%3E'
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const getAppLogo = (appName: string, fallbackUrl: string): string => {
    return appLogos[appName] || fallbackUrl;
  };

  return (
    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
      <h3 className="mb-4 font-semibold text-lg text-gray-800">Which apps do you use?</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {apps.map((app) => {
          const isSelected = selectedApps.includes(app.id);
          const isHovered = hoveredAppId === app.id;
          
          return (
            <div
              key={app.id}
              className="relative"
              onMouseEnter={() => setHoveredAppId(app.id)}
              onMouseLeave={() => setHoveredAppId(null)}
            >
              <button
                onClick={() => toggleAppSelection(app.id)}
                className={`relative w-full aspect-square flex flex-col items-center p-3 border rounded-xl transition-all duration-300 ${
                  isSelected
                    ? 'border-[#FD5108] bg-[#FFF8F5] shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#FD5108] flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                )}
                <div className="w-16 h-16 mb-2 rounded-lg bg-white flex items-center justify-center">
                  <img
                    src={getAppLogo(app.name, app.logo)}
                    alt={app.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xs text-center font-medium text-gray-700 line-clamp-2">
                  {app.name}
                </span>
              </button>

              {/* Tooltip */}
              {isHovered && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10 pointer-events-none">
                  <div className="p-3">
                    <div className="font-medium mb-1">{app.category}</div>
                    <div className="text-gray-300 text-xs mb-2">{getCategoryDescription(app.category)}</div>
                    <div className="text-[#FD5108] font-medium">{formatCurrency(app.costPerUser)} per user</div>
                  </div>
                  {/* Arrow */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AppSelector;