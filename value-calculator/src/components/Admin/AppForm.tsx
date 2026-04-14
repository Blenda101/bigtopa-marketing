import React, { useState, useEffect, useCallback } from 'react';
import { useValueCalculator } from '../../context/ValueCalculatorContext';
import { X, Upload } from 'lucide-react';
import { App, AppCategory } from '../../types';
import { APP_CATEGORIES, getCategoryDescription } from '../../data/categories';
import { useDropzone } from 'react-dropzone';

interface AppFormProps {
  editApp: App | null;
  onCancel: () => void;
}

const AppForm: React.FC<AppFormProps> = ({ editApp, onCancel }) => {
  const { addApp, updateApp } = useValueCalculator();
  const [formData, setFormData] = useState<Omit<App, 'id'>>({
    name: '',
    logo: '',
    costPerUser: 0,
    category: 'Other',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editApp) {
      setFormData({
        name: editApp.name,
        logo: editApp.logo,
        costPerUser: editApp.costPerUser,
        category: editApp.category,
      });
    }
  }, [editApp]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'costPerUser' ? parseFloat(value) : value,
    }));
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setFormData(prev => ({
          ...prev,
          logo: base64String
        }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxSize: 5242880, // 5MB
    multiple: false
  });

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'App name is required';
    }
    
    if (!formData.logo) {
      newErrors.logo = 'Logo is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (formData.costPerUser <= 0) {
      newErrors.costPerUser = 'Cost must be greater than 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (editApp) {
      updateApp({
        id: editApp.id,
        ...formData,
      });
    } else {
      addApp(formData);
    }
    
    onCancel();
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          {editApp ? 'Edit App' : 'Add New App'}
        </h3>
        <button 
          onClick={onCancel}
          className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500"
        >
          <X size={20} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* App Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              App Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g. Slack"
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>
          
          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md bg-white ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a category</option>
              {APP_CATEGORIES.map((category) => (
                <option key={category} value={category} title={getCategoryDescription(category)}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
            {formData.category && (
              <p className="mt-1 text-sm text-gray-500">{getCategoryDescription(formData.category as AppCategory)}</p>
            )}
          </div>
          
          {/* Cost Per User */}
          <div>
            <label htmlFor="costPerUser" className="block text-sm font-medium text-gray-700 mb-1">
              Cost Per User ($/month)
            </label>
            <input
              id="costPerUser"
              name="costPerUser"
              type="number"
              min="0"
              step="0.01"
              value={formData.costPerUser}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.costPerUser ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g. 10"
            />
            {errors.costPerUser && <p className="mt-1 text-sm text-red-500">{errors.costPerUser}</p>}
          </div>
          
          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Logo
            </label>
            <div 
              {...getRootProps()} 
              className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                isDragActive ? 'border-[#FD5108] bg-orange-50' : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto text-gray-400 mb-2" size={24} />
              <p className="text-sm text-gray-600">
                {isDragActive ? 'Drop the file here' : 'Drag & drop an image, or click to select'}
              </p>
              <p className="text-xs text-gray-500 mt-1">Max size: 5MB</p>
            </div>
            {errors.logo && <p className="mt-1 text-sm text-red-500">{errors.logo}</p>}
            
            {/* Logo Preview */}
            {formData.logo && (
              <div className="mt-2">
                <p className="text-xs text-gray-500 mb-1">Preview:</p>
                <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100">
                  <img
                    src={formData.logo}
                    alt="Logo preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#FD5108] hover:bg-[#E84A00] text-white rounded-md transition-colors"
          >
            {editApp ? 'Update App' : 'Add App'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppForm;