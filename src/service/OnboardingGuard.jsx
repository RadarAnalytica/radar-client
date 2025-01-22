import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../service/AuthContext';

export const OnboardingGuard = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user?.is_onboarded) {
    return <Navigate to="/onboarding" replace />;
  }
  
  return children;
};
