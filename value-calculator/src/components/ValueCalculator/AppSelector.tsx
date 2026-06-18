import React, { useState } from 'react';
import { useValueCalculator } from '../../context/ValueCalculatorContext';
import { Check } from 'lucide-react';
import { getCategoryDescription } from '../../data/categories';

const AppSelector: React.FC = () => {
  const { state, toggleAppSelection, apps } = useValueCalculator();
  const { selectedApps } = state;
  const [hoveredAppId, setHoveredAppId] = useState<string | null>(null);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
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
                    src={app.logo}
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