export interface App {
  id: string;
  name: string;
  logo: string;
  costPerUser: number;
  pricingType?: PricingType;
  category: AppCategory;
  sites?: string[];
  created_at?: string;
}

// per_user = cost × people, flat = one cost for the whole org
export type PricingType = 'per_user' | 'flat';

export type SiteTheme = 'light' | 'dark' | 'white';

export interface Site {
  id: string;
  label: string;
  // BigTopa price for this collection: (flat_monthly + per_user_monthly × people) × 12
  flat_monthly?: number;
  per_user_monthly?: number;
  theme?: SiteTheme | null;
  accent?: string | null;
  layout?: 'compact' | 'split';
  show_price?: boolean;
  cta_label?: string | null;
  cta_url?: string | null;
}

// Fallback when the `sites` table can't be read
export const KNOWN_SITES: Site[] = [
  { id: 'bigtopa',    label: 'BigTopa' },
  { id: 'greekhouse', label: 'GreekHouse' },
  { id: 'gatheragain', label: 'GatherAgain' },
];

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