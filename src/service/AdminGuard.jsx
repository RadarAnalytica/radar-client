import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../service/AuthContext';

export const AdminGuard = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};