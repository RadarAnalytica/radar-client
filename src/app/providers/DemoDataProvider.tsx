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
  const [isDemoUser, setIsDemoUser] = useState<boolean>(false);
  const [showDemoBanner, setShowDemoBanner] = useState<boolean>(false);

  // Проверяем статус подписки при изменении пользователя
  useEffect(() => {
    if (user) {
      const isDemo = user?.subscription_status === null;
      setIsDemoMode(isDemo);
      setShowDemoBanner(isDemo);
      setIsDemoUser(user?.email === 'demo@radar.ru');
    } else {
      setIsDemoMode(false);
      setShowDemoBanner(false);
      setIsDemoUser(false);
    }
  }, [user]);

  const getDemoDataForEndpoint = (endpoint: string, params?: any) => {
    if (!isDemoMode) {
      return null;
    }

    const service = DemoDataService.getInstance();
    return service.getDataForEndpoint(endpoint, params);
  };

  const switchToDemo = () => {
    setIsDemoMode(true);
    setShowDemoBanner(true);
  };

  const switchToReal = () => {
    setIsDemoMode(false);
    setShowDemoBanner(false);
  };

  const hideDemoBanner = () => {
    setShowDemoBanner(false);
  };

  const contextValue: DemoModeContextType = {
    isDemoMode,
    isDemoUser,
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
