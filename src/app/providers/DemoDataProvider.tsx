import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AuthContext from '../../service/AuthContext';
import { DemoDataService } from '../../service/DemoDataService';
import type { DemoModeContextType, DemoData } from '../../types/demo';

const DemoModeContext = createContext<DemoModeContextType | undefined>(undefined);

interface DemoDataProviderProps {
  children: ReactNode;
}

export const DemoDataProvider: React.FC<DemoDataProviderProps> = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [demoData, setDemoData] = useState<DemoData | null>(null);
  const [showDemoBanner, setShowDemoBanner] = useState<boolean>(false);

  // Проверяем статус подписки при изменении пользователя
  useEffect(() => {
    if (user) {
      const isDemo = user?.subscription_status === null;
      setIsDemoMode(isDemo);
      setShowDemoBanner(isDemo);
      
      if (isDemo) {
        loadDemoData(); // Загружаем демо-данные при входе в демо-режим
      } else {
        setDemoData(null); // Очищаем демо-данные при выходе из демо-режима
      }
    } else {
      setIsDemoMode(false);
      setDemoData(null);
      setShowDemoBanner(false);
    }
  }, [user]);

  const loadDemoData = async () => {
    try {
      const service = DemoDataService.getInstance();
      const data = await service.getAllDemoData();
      setDemoData(data);
    } catch (error) {
      console.error('Error loading demo data:', error);
    }
  };

  const getDemoDataForEndpoint = (endpoint: string, params?: any) => {
    if (!isDemoMode || !demoData) {
      return null;
    }

    const service = DemoDataService.getInstance();
    return service.getDataForEndpoint(endpoint, params, demoData);
  };

  const switchToDemo = () => {
    setIsDemoMode(true);
    setShowDemoBanner(true);
    loadDemoData();
  };

  const switchToReal = () => {
    setIsDemoMode(false);
    setShowDemoBanner(false);
    setDemoData(null);
  };

  const hideDemoBanner = () => {
    setShowDemoBanner(false);
  };

  const contextValue: DemoModeContextType = {
    isDemoMode,
    demoData,
    showDemoBanner,
    getDemoDataForEndpoint,
    switchToDemo,
    switchToReal,
    hideDemoBanner,
  };

  return (
    <DemoModeContext.Provider value={contextValue}>
      {children}
    </DemoModeContext.Provider>
  );
};

export const useDemoMode = (): DemoModeContextType => {
  const context = useContext(DemoModeContext);
  if (context === undefined) {
    console.error('useDemoMode: Context is undefined, throwing error');
    throw new Error('useDemoMode must be used within a DemoDataProvider');
  }
  return context;
};

export default DemoDataProvider;
