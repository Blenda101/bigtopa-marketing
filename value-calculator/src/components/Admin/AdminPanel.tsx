import React, { useState, useEffect } from 'react';
import { useValueCalculator } from '../../context/ValueCalculatorContext';
import AppList from './AppList';
import AppForm from './AppForm';
import PricingConfig from './PricingConfig';
import CategoryManagement from './CategoryManagement';
import LoginForm from '../Auth/LoginForm';
import { Plus, ListPlus } from 'lucide-react';
import { App } from '../../types';
import { supabase } from '../../lib/supabase';

const AdminPanel: React.FC = () => {
  const { apps } = useValueCalculator();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showCategoryManagement, setShowCategoryManagement] = useState(false);
  const [editingApp, setEditingApp] = useState<App | null>(null);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleEditApp = (app: App) => {
    setEditingApp(app);
    setShowAddForm(true);
    setShowCategoryManagement(false);
  };

  const handleCancelEdit = () => {
    setEditingApp(null);
    setShowAddForm(false);
  };

  // If not authenticated, show login form
  if (!session) {
    return <LoginForm />;
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Admin Panel</h2>
        
        {!showAddForm && !showCategoryManagement && (
          <div className="flex gap-2">
            <button 
              onClick={() => setShowCategoryManagement(true)}
              className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md transition-colors"
            >
              <ListPlus size={18} />
              <span>Manage Categories</span>
            </button>
            <button 
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 bg-[#FD5108] hover:bg-[#E84A00] transition-all duration-300 text-white px-4 py-2 rounded-md"
            >
              <Plus size={18} />
              <span>Add App</span>
            </button>
          </div>
        )}
      </div>

      {showAddForm ? (
        <AppForm 
          editApp={editingApp} 
          onCancel={handleCancelEdit} 
        />
      ) : showCategoryManagement ? (
        <CategoryManagement 
          onClose={() => setShowCategoryManagement(false)} 
        />
      ) : (
        <>
          <PricingConfig />
          
          <div className="my-8 border-t border-gray-200" />
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">App Management</h3>
            <p className="text-gray-600">
              Manage app configurations used in the BigTopa value calculator. Add new apps, edit details, or remove existing ones.
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
            <h3 className="text-md font-medium text-gray-700 mb-2">Current apps: {apps.length}</h3>
            <p className="text-sm text-gray-500">
              These apps are displayed in the calculator for users to select the tools they currently use.
            </p>
          </div>
          
          <AppList onEditApp={handleEditApp} />
        </>
      )}
    </div>
  );
};

export default AdminPanel;