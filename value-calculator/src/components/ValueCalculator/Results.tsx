import React, { useMemo } from 'react';
import { useValueCalculator } from '../../context/ValueCalculatorContext';

interface ResultsProps {
  isYearly: boolean;
}

const Results: React.FC<ResultsProps> = ({ isYearly }) => {
  const { state, apps } = useValueCalculator();
  const { selectedApps, companySize, bigTopaPricing } = state;

  const calculationResults = useMemo(() => {
    // Only consider selected apps
    const selectedAppData = apps.filter(app => selectedApps.includes(app.id));
    
    // Calculate total monthly cost based on selected apps and company size
    const totalMonthlyCost = selectedAppData.reduce(
      (sum, app) => sum + app.costPerUser * companySize,
      0
    );
    
    // Calculate yearly costs for apps
    const totalYearlyCost = totalMonthlyCost * 12;
    
    // Calculate BigTopa yearly costs based on pricing configuration
    const bigTopaYearlyCost = isYearly 
      ? bigTopaPricing.base_price * companySize // Annual price per user
      : bigTopaPricing.price_per_user * 12 * companySize; // Monthly price converted to yearly
    
    // Calculate yearly savings
    const yearlySavings = totalYearlyCost - bigTopaYearlyCost;
    
    // Calculate how many apps can be replaced
    const replacedAppsCount = Math.min(
      Math.ceil(selectedAppData.length * 0.8),
      selectedAppData.length
    );
    
    return {
      totalYearlyCost,
      bigTopaYearlyCost,
      yearlySavings,
      replacedAppsCount,
      selectedAppCount: selectedAppData.length
    };
  }, [selectedApps, companySize, apps, bigTopaPricing, isYearly]);

  // Format currency numbers
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  if (selectedApps.length === 0) {
    return (
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col items-center justify-center min-h-[300px]">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Select apps to see your savings</h3>
          <p className="text-gray-500">Choose the apps your company currently uses to calculate potential savings with BigTopa.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
      <div className="flex flex-col gap-6">
        <div className="bg-white p-5 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-[#FD5108] mb-2">
            Replace {calculationResults.replacedAppsCount} apps
          </h3>
          <p className="text-gray-700">
            BigTopa can replace at least {calculationResults.replacedAppsCount} of your {calculationResults.selectedAppCount} selected business apps.
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg border border-gray-200">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Current Cost:</span>
              <span className="text-lg font-semibold text-gray-900">{formatCurrency(calculationResults.totalYearlyCost)}/year</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">BigTopa Cost:</span>
              <span className="text-lg font-semibold text-[#FD5108]">{formatCurrency(calculationResults.bigTopaYearlyCost)}/year</span>
            </div>
            <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
              <span className="text-gray-600">Your Savings:</span>
              <span className="text-lg font-semibold text-green-600">{formatCurrency(calculationResults.yearlySavings)}/year</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;