import { Navigate } from 'react-router-dom';



export const AuthProtectedRoute = ({
    user,
    redirectPath = '/signin',
    children,
  }) => {
    if (!user) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return children;
  };

export const SubscriptionProtectedRoute = ({
    user,
    redirectPath = '/signin',
    children,
  }) => {
    if (!user) {
      return <Navigate to={redirectPath} replace />;
    }
    if (user.subscription === 'expired') {
        return <Navigate to='/tariffs' replace />;
    }
  
    return children;
  };

export const OnboardingProtectedRoute = ({
    user,
    children,
  }) => {
    if (!user || !user.is_confirmed) {
      return <Navigate to='/signin' replace />;
    }
    if (user.subscription === 'expired') {
        return <Navigate to='/tariffs' replace />;
    }

    if (!user.is_onboarded) {
        return <Navigate to='/onboarding' replace />;
    }
  
    return children;
  };

export const AdminProtectedRoute = ({
    user,
    children,
  }) => {
    if (user.role === 'admin') {
      return children;
    }
  
    return <Navigate to='/404' replace />;
  };