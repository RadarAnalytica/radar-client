import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../service/AuthContext';

export const AuthGuard = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};