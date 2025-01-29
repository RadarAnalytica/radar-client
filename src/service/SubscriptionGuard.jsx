import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../service/AuthContext';

export const SubscriptionGuard = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user?.subscription_status === null) {
    return <Navigate to="/tariffs" replace />;
  }

  return children;
};