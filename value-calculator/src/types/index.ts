export interface App {
  id: string;
  name: string;
  logo: string;
  costPerUser: number;
  category: AppCategory;
  created_at?: string;
}

export type AppCategory = 
  | 'Communication'
  | 'Productivity'
  | 'Project Management'
  | 'CRM'
  | 'Marketing'
  | 'Design'
  | 'Analytics'
  | 'Finance'
  | 'HR'
  | 'Storage'
  | 'Database'
  | 'Development'
  | 'Security'
  | 'Customer Support'
  | 'Other';

export interface BigTopaPricing {
  base_price: number;
  price_per_user: number;
}

export interface CalculatorState {
  selectedApps: string[];
  companySize: number;
  isAdminMode: boolean;
  bigTopaPricing: BigTopaPricing;
}