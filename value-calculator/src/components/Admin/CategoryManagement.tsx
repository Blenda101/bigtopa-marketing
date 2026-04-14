import React, { useState } from 'react';
import { Plus, X, Edit2, Trash2, Check } from 'lucide-react';
import { AppCategory } from '../../types';
import { APP_CATEGORIES, getCategoryDescription } from '../../data/categories';

interface CategoryManagementProps {
  onClose: () => void;
}

const CategoryManagement: React.FC<CategoryManagementProps> = ({ onClose }) => {
  const [categories, setCategories] = useState<AppCategory[]>(APP_CATEGORIES);
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      setError('Category name cannot be empty');
      return;
    }

    if (categories.includes(newCategory as AppCategory)) {
      setError('Category already exists');
      return;
    }

    setCategories([...categories, newCategory as AppCategory]);
    setNewCategory('');
    setError(null);
  };

  const handleEditCategory = (category: AppCategory) => {
    setEditingCategory(category);
    setEditValue(category);
  };

  const handleSaveEdit = (oldCategory: string) => {
    if (!editValue.trim()) {
      setError('Category name cannot be empty');
      return;
    }

    if (categories.includes(editValue as AppCategory) && editValue !== oldCategory) {
      setError('Category already exists');
      return;
    }

    setCategories(categories.map(cat => cat === oldCategory ? editValue as AppCategory : cat));
    setEditingCategory(null);
    setEditValue('');
    setError(null);
  };

  const handleDeleteCategory = (category: AppCategory) => {
    if (category === 'Other') {
      setError('Cannot delete the "Other" category');
      return;
    }

    setCategories(categories.filter(cat => cat !== category));
    setError(null);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Manage Categories</h3>
        <button 
          onClick={onClose}
          className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500"
        >
          <X size={20} />
        </button>
      </div>

      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleAddCategory}
            className="flex items-center gap-2 bg-[#FD5108] hover:bg-[#E84A00] text-white px-4 py-2 rounded-md"
          >
            <Plus size={18} />
            Add
          </button>
        </div>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>

      <div className="space-y-2">
        {categories.map((category) => (
          <div 
            key={category}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
          >
            {editingCategory === category ? (
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md"
                />
                <button
                  onClick={() => handleSaveEdit(category)}
                  className="p-1.5 text-green-600 hover:bg-green-50 rounded-md"
                >
                  <Check size={18} />
                </button>
                <button
                  onClick={() => setEditingCategory(null)}
                  className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-md"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <>
                <div>
                  <h4 className="font-medium text-gray-800">{category}</h4>
                  <p className="text-sm text-gray-500">{getCategoryDescription(category)}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="p-1.5 text-gray-500 hover:text-[#FD5108] hover:bg-orange-50 rounded-md"
                    disabled={category === 'Other'}
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category)}
                    className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-md"
                    disabled={category === 'Other'}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManagement;