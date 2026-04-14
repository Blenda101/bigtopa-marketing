import React, { useState } from 'react';
import { useValueCalculator } from '../../context/ValueCalculatorContext';

const PricingConfig: React.FC = () => {
  const { state, updateBigTopaPricing } = useValueCalculator();
  const { bigTopaPricing } = state;
  
  const [annualPricePerUser, setAnnualPricePerUser] = useState(bigTopaPricing.base_price);
  const [monthlyPricePerUser, setMonthlyPricePerUser] = useState(bigTopaPricing.price_per_user);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setError(null);
    
    try {
      // Validate inputs
      if (annualPricePerUser < 0 || monthlyPricePerUser < 0) {
        throw new Error('Prices cannot be negative');
      }

      await updateBigTopaPricing({
        base_price: annualPricePerUser,
        price_per_user: monthlyPricePerUser
      });
    } catch (error) {
      console.error('Failed to update pricing:', error);
      setError(error instanceof Error ? error.message : 'Failed to update pricing');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">BigTopa Pricing Configuration</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="annualPricePerUser" className="block text-sm font-medium text-gray-700 mb-1">
              Price Per User ($/annually)
            </label>
            <input
              id="annualPricePerUser"
              type="number"
              min="0"
              step="0.01"
              value={annualPricePerUser}
              onChange={(e) => setAnnualPricePerUser(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g. 100"
            />
          </div>
          
          <div>
            <label htmlFor="monthlyPricePerUser" className="block text-sm font-medium text-gray-700 mb-1">
              Price Per User ($/monthly)
            </label>
            <input
              id="monthlyPricePerUser"
              type="number"
              min="0"
              step="0.01"
              value={monthlyPricePerUser}
              onChange={(e) => setMonthlyPricePerUser(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g. 10"
            />
          </div>
        </div>
        
        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isUpdating}
            className={`px-4 py-2 bg-[#FD5108] hover:bg-[#E84A00] text-white rounded-md transition-colors ${
              isUpdating ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isUpdating ? 'Updating...' : 'Update Pricing'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PricingConfig;