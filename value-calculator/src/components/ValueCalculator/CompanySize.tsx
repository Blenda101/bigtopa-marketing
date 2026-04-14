import React from 'react';
import { useValueCalculator } from '../../context/ValueCalculatorContext';

const CompanySize: React.FC = () => {
  const { state, updateCompanySize } = useValueCalculator();
  const { companySize } = state;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateCompanySize(parseInt(e.target.value, 10));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10);
    
    // Handle empty input
    if (isNaN(value)) {
      value = 25;
    }
    
    // Clamp value between 1 and 500
    value = Math.max(1, Math.min(500, value));
    
    updateCompanySize(value);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg text-gray-800">How many people work at your company?</h3>
        <input
          type="number"
          min="1"
          max="500"
          value={companySize}
          onChange={handleInputChange}
          className="w-24 px-3 py-2 bg-white rounded-lg border border-gray-200 text-right font-semibold text-gray-900"
        />
      </div>
      
      <div>
        <input
          type="range"
          min="1"
          max="500"
          step="1"
          value={companySize}
          onChange={handleSliderChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FD5108]"
        />
        
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>1</span>
          <span>125</span>
          <span>250</span>
          <span>375</span>
          <span>500</span>
        </div>
      </div>
    </div>
  );
};

export default CompanySize;