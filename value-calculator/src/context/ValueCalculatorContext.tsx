import React, { createContext, useContext, useState, useEffect } from 'react';
import { App, CalculatorState, BigTopaPricing, Site, KNOWN_SITES } from '../types';
import { supabase } from '../lib/supabase';

interface ValueCalculatorContextType {
  apps: App[];
  sites: Site[];
  activeSiteId: string;
  setActiveSiteId: (id: string) => void;
  updateSitePricing: (id: string, base_price: number | null, price_per_user: number | null) => Promise<void>;
  addSite: (site: Site) => Promise<void>;
  renameSite: (id: string, label: string) => Promise<void>;
  deleteSite: (id: string) => Promise<void>;
  setAppSites: (appId: string, sites: string[]) => Promise<void>;
  state: CalculatorState;
  toggleAppSelection: (appId: string) => void;
  updateCompanySize: (size: number) => void;
  toggleAdminMode: () => void;
  addApp: (appData: Omit<App, 'id'>) => void;
  updateApp: (app: App) => void;
  deleteApp: (appId: string) => void;
  updateBigTopaPricing: (pricing: BigTopaPricing) => void;
}

const ValueCalculatorContext = createContext<ValueCalculatorContextType | undefined>(undefined);

const STORAGE_KEY = 'bigTopa_calculator_data';
const ACTIVE_SITE_KEY = 'bigTopa_active_site';

const DEFAULT_PRICING = {
  base_price: 499,
  price_per_user: 10
};

export const ValueCalculatorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [apps, setApps] = useState<App[]>([]);
  const [sites, setSites] = useState<Site[]>(KNOWN_SITES);
  const [activeSiteId, setActiveSiteIdState] = useState<string>(
    () => localStorage.getItem(ACTIVE_SITE_KEY) || KNOWN_SITES[0].id
  );

  const setActiveSiteId = (id: string) => {
    setActiveSiteIdState(id);
    localStorage.setItem(ACTIVE_SITE_KEY, id);
  };

  // Fall back to the first site if the remembered one was deleted
  useEffect(() => {
    if (sites.length && !sites.some((s) => s.id === activeSiteId)) {
      setActiveSiteId(sites[0].id);
    }
  }, [sites, activeSiteId]);
  const [state, setState] = useState<CalculatorState>({
    selectedApps: [],
    companySize: 25,
    isAdminMode: false,
    bigTopaPricing: DEFAULT_PRICING
  });

  useEffect(() => {
    const initializeData = async () => {
      try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          if (parsedData.state) {
            setState(prev => ({
              ...prev,
              selectedApps: parsedData.state.selectedApps || [],
              companySize: parsedData.state.companySize || 100
            }));
          }
        }

        await Promise.all([loadApps(), loadPricing(), loadSites()]);
      } catch (error) {
        console.error('Error initializing data:', error);
      }
    };

    initializeData();

    const appsSubscription = supabase
      .channel('apps_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'apps' 
        }, 
        handleAppsChange
      )
      .subscribe();

    const pricingSubscription = supabase
      .channel('pricing_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'pricing' 
        }, 
        handlePricingChange
      )
      .subscribe();

    return () => {
      appsSubscription.unsubscribe();
      pricingSubscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        state: {
          selectedApps: state.selectedApps,
          companySize: state.companySize
        }
      })
    );
  }, [state.selectedApps, state.companySize]);

  const handleAppsChange = async (payload: any) => {
    console.log('Apps table changed:', payload);
    await loadApps();
  };

  const handlePricingChange = async (payload: any) => {
    console.log('Pricing table changed:', payload);
    await loadPricing();
  };

  const loadPricing = async () => {
    try {
      console.log('Loading pricing data...');
      
      const { data: allPricing, error: countError } = await supabase
        .from('pricing')
        .select('*');

      if (countError) {
        console.error('Error checking pricing records:', countError);
        setState(prev => ({ ...prev, bigTopaPricing: DEFAULT_PRICING }));
        return;
      }

      if (allPricing && allPricing.length > 1) {
        console.log('Multiple pricing records found, cleaning up...');
        await supabase
          .from('pricing')
          .delete()
          .neq('id', 1);
      }

      const { data: existingPricing, error: checkError } = await supabase
        .from('pricing')
        .select('*')
        .eq('id', 1)
        .maybeSingle();

      if (checkError) {
        console.error('Error loading pricing:', checkError);
        setState(prev => ({ ...prev, bigTopaPricing: DEFAULT_PRICING }));
        return;
      }

      if (!existingPricing) {
        const { data: newData, error: insertError } = await supabase
          .from('pricing')
          .upsert([{
            id: 1,
            base_price: DEFAULT_PRICING.base_price,
            price_per_user: DEFAULT_PRICING.price_per_user
          }])
          .select()
          .single();

        if (insertError) {
          console.error('Error creating default pricing:', insertError);
          setState(prev => ({ ...prev, bigTopaPricing: DEFAULT_PRICING }));
          return;
        }

        console.log('Created default pricing:', newData);
        setState(prev => ({
          ...prev,
          bigTopaPricing: {
            base_price: newData.base_price,
            price_per_user: newData.price_per_user
          }
        }));
      } else {
        console.log('Loaded existing pricing:', existingPricing);
        setState(prev => ({
          ...prev,
          bigTopaPricing: {
            base_price: existingPricing.base_price,
            price_per_user: existingPricing.price_per_user
          }
        }));
      }
    } catch (error) {
      console.error('Error in loadPricing:', error);
      setState(prev => ({ ...prev, bigTopaPricing: DEFAULT_PRICING }));
    }
  };

  const loadApps = async () => {
    try {
      console.log('Loading apps...');
      
      const { data: existingApps, error } = await supabase
        .from('apps')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        console.error('Error loading apps:', error);
        throw error;
      }

      if (existingApps) {
        const formattedApps = existingApps.map(app => ({
          id: app.id,
          name: app.name,
          logo: app.logo,
          costPerUser: parseFloat(app.cost_per_user),
          category: app.category,
          sites: app.sites || [],
          created_at: app.created_at
        }));
        console.log('Apps loaded successfully:', formattedApps);
        setApps(formattedApps);
      }
    } catch (error) {
      console.error('Error loading apps:', error);
    }
  };

  const loadSites = async () => {
    const { data, error } = await supabase
      .from('sites')
      .select('id, label, base_price, price_per_user')
      .order('label', { ascending: true });

    if (error) {
      console.error('Error loading sites (using fallback list):', error);
      return;
    }
    setSites(data as Site[]);
  };

  const addSite = async (site: Site) => {
    const { error } = await supabase.from('sites').insert(site);
    if (error) throw error;
    setSites((prev) =>
      [...prev, site].sort((a, b) => a.label.localeCompare(b.label))
    );
  };

  const renameSite = async (id: string, label: string) => {
    const { error } = await supabase.from('sites').update({ label }).eq('id', id);
    if (error) throw error;
    setSites((prev) => prev.map((s) => (s.id === id ? { ...s, label } : s)));
  };

  const updateSitePricing = async (
    id: string,
    base_price: number | null,
    price_per_user: number | null
  ) => {
    const { error } = await supabase
      .from('sites')
      .update({ base_price, price_per_user })
      .eq('id', id);
    if (error) throw error;
    setSites((prev) =>
      prev.map((s) => (s.id === id ? { ...s, base_price, price_per_user } : s))
    );
  };

  // Removes the site and strips it from every app's membership list
  const deleteSite = async (id: string) => {
    const members = apps.filter((app) => app.sites?.includes(id));
    for (const app of members) {
      await setAppSites(app.id, (app.sites || []).filter((s) => s !== id));
    }
    const { error } = await supabase.from('sites').delete().eq('id', id);
    if (error) throw error;
    setSites((prev) => prev.filter((s) => s.id !== id));
  };

  const setAppSites = async (appId: string, appSites: string[]) => {
    const { error } = await supabase
      .from('apps')
      .update({ sites: appSites })
      .eq('id', appId);
    if (error) throw error;
    setApps((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, sites: appSites } : app))
    );
  };

  const toggleAppSelection = (appId: string) => {
    setState((prev) => {
      const isSelected = prev.selectedApps.includes(appId);
      return {
        ...prev,
        selectedApps: isSelected
          ? prev.selectedApps.filter((id) => id !== appId)
          : [...prev.selectedApps, appId],
      };
    });
  };

  const updateCompanySize = (size: number) => {
    setState((prev) => ({
      ...prev,
      companySize: size,
    }));
  };

  const toggleAdminMode = () => {
    setState((prev) => ({
      ...prev,
      isAdminMode: !prev.isAdminMode,
    }));
  };

  const updateBigTopaPricing = async (pricing: BigTopaPricing) => {
    try {
      console.log('Updating pricing:', pricing);
      
      const { data, error } = await supabase
        .from('pricing')
        .upsert({
          id: 1,
          base_price: pricing.base_price,
          price_per_user: pricing.price_per_user,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();
      
      if (error) {
        console.error('Error updating pricing:', error);
        throw error;
      }

      if (!data) {
        throw new Error('Update succeeded but no data returned');
      }

      console.log('Pricing updated successfully:', data);
      
      setState(prev => ({
        ...prev,
        bigTopaPricing: {
          base_price: data.base_price,
          price_per_user: data.price_per_user
        }
      }));
    } catch (error) {
      console.error('Error updating pricing:', error);
      throw error;
    }
  };

  const addApp = async (appData: Omit<App, 'id'>) => {
    try {
      console.log('Adding app:', appData);
      const dbAppData = {
        name: appData.name,
        logo: appData.logo,
        cost_per_user: parseFloat(appData.costPerUser.toString()),
        category: appData.category,
        sites: appData.sites || []
      };

      const { data, error } = await supabase
        .from('apps')
        .insert([dbAppData])
        .select()
        .single();
      
      if (error) {
        console.error('Supabase insert error:', error);
        throw error;
      }
      
      if (data) {
        const newApp: App = {
          id: data.id,
          name: data.name,
          logo: data.logo,
          costPerUser: parseFloat(data.cost_per_user),
          category: data.category,
          created_at: data.created_at
        };
        console.log('New app created:', newApp);
        setApps((prev) => [...prev, newApp].sort((a, b) => a.name.localeCompare(b.name)));
      }
    } catch (error) {
      console.error('Error adding app:', error);
      throw error;
    }
  };

  const updateApp = async (updatedApp: App) => {
    try {
      console.log('Updating app:', updatedApp);
      
      const { data: existingApp, error: checkError } = await supabase
        .from('apps')
        .select('*')
        .eq('id', updatedApp.id)
        .maybeSingle();

      if (checkError) {
        console.error('Error checking app existence:', checkError);
        throw new Error('Failed to verify app existence');
      }

      if (!existingApp) {
        throw new Error(`App with ID ${updatedApp.id} not found`);
      }

      const dbAppData = {
        name: updatedApp.name,
        logo: updatedApp.logo,
        cost_per_user: parseFloat(updatedApp.costPerUser.toString()),
        category: updatedApp.category,
        sites: updatedApp.sites || []
      };

      console.log('Sending update to database:', {
        id: updatedApp.id,
        data: dbAppData
      });

      const { data: updatedData, error: updateError } = await supabase
        .from('apps')
        .update(dbAppData)
        .eq('id', updatedApp.id)
        .select()
        .maybeSingle();
      
      if (updateError) {
        console.error('Supabase update error:', updateError);
        throw updateError;
      }

      if (!updatedData) {
        throw new Error(`App with ID ${updatedApp.id} no longer exists`);
      }

      console.log('Database update successful:', updatedData);
      
      const updatedAppData: App = {
        id: updatedData.id,
        name: updatedData.name,
        logo: updatedData.logo,
        costPerUser: parseFloat(updatedData.cost_per_user),
        category: updatedData.category,
        sites: updatedData.sites || [],
        created_at: updatedData.created_at
      };

      setApps((prev) =>
        prev.map((app) => (app.id === updatedApp.id ? updatedAppData : app))
          .sort((a, b) => a.name.localeCompare(b.name))
      );

      console.log('Local state updated successfully');
    } catch (error) {
      console.error('Error updating app:', error);
      throw error;
    }
  };

  const deleteApp = async (appId: string) => {
    try {
      console.log('Deleting app:', appId);
      const { error } = await supabase
        .from('apps')
        .delete()
        .eq('id', appId);
      
      if (error) {
        console.error('Supabase delete error:', error);
        throw error;
      }
      
      setApps((prev) => prev.filter((app) => app.id !== appId));
      setState((prev) => ({
        ...prev,
        selectedApps: prev.selectedApps.filter((id) => id !== appId),
      }));

      console.log('App deleted successfully');
    } catch (error) {
      console.error('Error deleting app:', error);
      throw error;
    }
  };

  return (
    <ValueCalculatorContext.Provider
      value={{
        apps,
        sites,
        activeSiteId,
        setActiveSiteId,
        updateSitePricing,
        addSite,
        renameSite,
        deleteSite,
        setAppSites,
        state,
        toggleAppSelection,
        updateCompanySize,
        toggleAdminMode,
        addApp,
        updateApp,
        deleteApp,
        updateBigTopaPricing
      }}
    >
      {children}
    </ValueCalculatorContext.Provider>
  );
};

export const useValueCalculator = (): ValueCalculatorContextType => {
  const context = useContext(ValueCalculatorContext);
  if (context === undefined) {
    throw new Error('useValueCalculator must be used within a ValueCalculatorProvider');
  }
  return context;
};