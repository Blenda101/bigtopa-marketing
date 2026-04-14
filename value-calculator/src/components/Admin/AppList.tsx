import React from 'react';
import { useValueCalculator } from '../../context/ValueCalculatorContext';
import { Edit, Trash2 } from 'lucide-react';
import { App } from '../../types';

interface AppListProps {
  onEditApp: (app: App) => void;
}

const AppList: React.FC<AppListProps> = ({ onEditApp }) => {
  const { apps, deleteApp } = useValueCalculator();

  if (apps.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">No apps have been added yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="text-left p-4 border-b border-gray-200 font-medium text-gray-700">App</th>
            <th className="text-left p-4 border-b border-gray-200 font-medium text-gray-700">Category</th>
            <th className="text-left p-4 border-b border-gray-200 font-medium text-gray-700">Cost per User</th>
            <th className="text-right p-4 border-b border-gray-200 font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {apps.map((app) => (
            <tr key={app.id} className="hover:bg-gray-50 transition-colors">
              <td className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100">
                    <img 
                      src={app.logo} 
                      alt={app.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.pexels.com/photos/4964420/pexels-photo-4964420.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
                      }}
                    />
                  </div>
                  <span className="font-medium text-gray-800">{app.name}</span>
                </div>
              </td>
              <td className="p-4 border-b border-gray-200 text-gray-700">{app.category}</td>
              <td className="p-4 border-b border-gray-200 text-gray-700">${app.costPerUser}/mo</td>
              <td className="p-4 border-b border-gray-200">
                <div className="flex justify-end gap-2">
                  <button 
                    onClick={() => onEditApp(app)}
                    className="p-1.5 text-gray-500 hover:text-[#FD5108] hover:bg-orange-50 rounded-md transition-colors"
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => deleteApp(app.id)}
                    className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppList;