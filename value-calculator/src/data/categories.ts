import { AppCategory } from '../types';

export const APP_CATEGORIES: AppCategory[] = [
  'Communication',
  'Productivity',
  'Project Management',
  'CRM',
  'Marketing',
  'Design',
  'Analytics',
  'Finance',
  'HR',
  'Storage',
  'Database',
  'Development',
  'Security',
  'Customer Support',
  'Other'
];

export const getCategoryIcon = (category: AppCategory) => {
  // You can add category-specific icons here if needed
  return null;
};

export const getCategoryDescription = (category: AppCategory): string => {
  const descriptions: Record<AppCategory, string> = {
    'Communication': 'Team chat and video conferencing tools',
    'Productivity': 'Personal and team productivity tools',
    'Project Management': 'Project tracking and team collaboration',
    'CRM': 'Customer relationship management',
    'Marketing': 'Marketing automation and analytics',
    'Design': 'Design and creative tools',
    'Analytics': 'Data analysis and visualization',
    'Finance': 'Accounting and financial management',
    'HR': 'Human resources and people management',
    'Storage': 'File storage and sharing',
    'Database': 'Database and data management',
    'Development': 'Development tools and services',
    'Security': 'Security and compliance tools',
    'Customer Support': 'Help desk and customer service',
    'Other': 'Other business applications'
  };
  
  return descriptions[category];
};