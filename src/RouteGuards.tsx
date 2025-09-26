import React, { useContext, Suspense, ReactNode } from 'react';
import AuthContext from './service/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoaderPage from './pages/LoaderPage';
import { URL } from './service/config';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import UnderDevelopmentPlugPage from './pages/underDevelopmentPlugPage/underDevelopmentPlugPage';
import NoSubscriptionPlugPage from './pages/noSubscriptionPlugPage/noSubscriptionPlugPage';
import NoSubscriptionPage from './pages/NoSubscriptionPage';



/**
 * -----------------------------------------------
 * 
 *  thats how it works:
 * 
 *  we splited our protection rules into 5 layers (from top to down):
 *  1. Auth, 2. Onboarding, 3. Subscription status 4. user role 5. subscription type
 * 
 *  Auth layer is on by default (just wrap route with plain <ProtectedRoute>)
 *  The simpliest way to use this comp is to pass protection layer's flag to it (e.g. <ProtectedRoute onboardProtected>) and thats it!
 * 
 *  Also u can use more options for more granular protection handle:
 *  use layer's guardType to set the behavior of protection (fallback/redirect)
 *  use layer fallback's to pass component for render. Use layer redirect's to set redirection url
 * 
 *  
 *  --- feel free to dm me for any questions -------
 * ----------------------------- Mike Starina ----
 */

type GuardType = 'redirect' | 'fallback';
type SubscriptionType = 'Smart' | string;
type UserRole = 'admin' | string;

interface FallbackProps {
  title?: string;
  pathname?: string;
  [key: string]: any;
}

type FallbackComponent = (props?: any) => ReactNode;

interface ProtectedRouteProps {
  children: ReactNode;
  routeRuName?: string; // required for expire level
  authGuardType?: GuardType;
  expireGuardType?: GuardType;
  onboardGuardType?: GuardType;
  userRoleGuardType?: GuardType;
  subscriptionGuardType?: GuardType;
  testPeriodGuardType?: GuardType;
  underDevGuardType?: GuardType;
  testPeriodProtected?: boolean;
  testPeriodFallback?: FallbackComponent;
  testPeriodRedirect?: string;
  underDevProtected?: boolean;
  underDevFallback?: FallbackComponent;
  underDevRedirect?: string;
  authProtected?: boolean;
  authFallback?: FallbackComponent;
  authRedirect?: string;
  expireProtected?: boolean;
  expireFallback?: FallbackComponent;
  expireRedirect?: string;
  onboardProtected?: boolean;
  onboardFallback?: FallbackComponent;
  onboardRedirect?: string;
  userRoleProtected?: boolean;
  userRoleFallback?: FallbackComponent;
  userRoleRedirect?: string;
  subscriptionProtected?: boolean;
  subscriptionFallback?: FallbackComponent;
  subscriptionRedirect?: string;
  subscription?: SubscriptionType;
  role?: UserRole;
}

// Protection config
const config: Partial<ProtectedRouteProps> = {
    authGuardType: 'redirect',
    expireGuardType: 'fallback',
    onboardGuardType: 'redirect',
    userRoleGuardType: 'redirect',
    subscriptionGuardType: 'redirect',
    testPeriodGuardType: 'fallback',
    underDevGuardType: 'fallback',
    underDevProtected: false,
    underDevRedirect: '/main',
    underDevFallback: () => (<UnderDevelopmentPlugPage />),
    authProtected: true,
    authFallback: () => (<MainPage />),
    authRedirect: `/signin`,
    testPeriodProtected: false,
    testPeriodFallback: (props: any) => (<NoSubscriptionPlugPage {...props} />),
    testPeriodRedirect: '/tariffs',
    expireProtected: false,
    expireFallback: (props: any) => (<NoSubscriptionPage {...props} />),
    expireRedirect: '/tariffs',
    onboardProtected: false,
    onboardFallback: () => (<MainPage />),
    onboardRedirect: '/onboarding',
    userRoleProtected: false,
    userRoleFallback: () => (<MainPage />),
    userRoleRedirect: '/main',
    subscriptionProtected: false,
    subscriptionFallback: () => (<MainPage />),
    subscriptionRedirect: '/tariffs',
    subscription: 'Smart',
    role: 'admin',
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  routeRuName,
  authGuardType = config.authGuardType!,
  expireGuardType = config.expireGuardType!,
  onboardGuardType = config.onboardGuardType!,
  userRoleGuardType = config.userRoleGuardType!,
  subscriptionGuardType = config.subscriptionGuardType!,
  testPeriodGuardType = config.testPeriodGuardType!,
  testPeriodProtected = config.testPeriodProtected!,
  testPeriodFallback = config.testPeriodFallback!,
  testPeriodRedirect = config.testPeriodRedirect!,
  underDevGuardType = config.underDevGuardType!,
  underDevProtected = config.underDevProtected!,
  underDevFallback = config.underDevFallback!,
  underDevRedirect = config.underDevRedirect!,
  authProtected = config.authProtected!,
  authFallback = config.authFallback!,
  authRedirect = config.authRedirect!,
  expireProtected = config.expireProtected!,
  expireFallback = config.expireFallback!,
  expireRedirect = config.expireRedirect!,
  onboardProtected = config.onboardProtected!,
  onboardFallback = config.onboardFallback!,
  onboardRedirect = config.onboardRedirect!,
  userRoleProtected = config.userRoleProtected!,
  userRoleFallback = config.userRoleFallback!,
  userRoleRedirect = config.userRoleRedirect!,
  subscriptionProtected = config.subscriptionProtected!,
  subscriptionFallback = config.subscriptionFallback!,
  subscriptionRedirect = config.subscriptionRedirect!,
  subscription = config.subscription!,
  role = config.role!,
}) => {
  const { user } = useContext(AuthContext);
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isCalculateEntryUrl = sessionStorage.getItem('isCalculateEntryUrl');

  // -------this is test user object for dev purposes ------//

//   let user = {
//     email: "modinsv@yandex.ru",
//     id: 2,
//     is_confirmed: true,
//     is_onboarded: false,
//     is_report_downloaded: true,
//     is_test_used: true,
//     role: "admin",
//     subscription_status: null
//   }

 //const user = undefined

/**
1. null
2. expired
3& smart + !onboardig
 */

  //------- 0. Under development protection ----------//
  if (underDevProtected && process.env.NODE_ENV === 'production') {
    switch(underDevGuardType) {
      case 'redirect': {
        navigate(underDevRedirect)
        return null;
      }
      case 'fallback': {
        return (
          <Suspense fallback={<LoaderPage />}>
            {underDevFallback()}
          </Suspense>
        )
      }
    }
    return (underDevFallback())
  }

  //------- 1. Auth protection (checking is user exists) ----------//
  if (authProtected && !user) {
    switch(authGuardType) {
      case 'redirect': {
        if (isCalculateEntryUrl === '1') {
          sessionStorage.removeItem('isCalculateEntryUrl')
          window.location.replace(`${URL}/signup`)
          return null;
        } else {
          window.location.replace(`${URL}${authRedirect}`)
          return null;
        }
      }
      case 'fallback': {
        return (
          <Suspense fallback={<LoaderPage />}>
            {authFallback()}
          </Suspense>
        )
      }
    }
    window.location.replace(`${URL}${authRedirect}`)
    return null;
  }

  // ---------2. Test period protection ------//
  if (testPeriodProtected && user && user.subscription_status === null) {
     switch(testPeriodGuardType) {
       case 'redirect': {
         return (<Navigate to={testPeriodRedirect} />)
        }
        case 'fallback': {
          return (
            <Suspense fallback={<LoaderPage />}>
            {testPeriodFallback({title: routeRuName, pathname: pathname.substring(1)})}
          </Suspense>
        )
      }
    }

    return (<Navigate to={testPeriodRedirect} replace />)
  }
  
  // ---------3. Subscription expiration protection (checking subscription) -------//
  if (expireProtected && user && user.subscription_status && user.subscription_status.toLowerCase() === 'expired') {
    switch(expireGuardType) {
      case 'redirect': {
        return (<Navigate to={expireRedirect} />)
      }
      case 'fallback': {
        return (
          <Suspense fallback={<LoaderPage />}>
            {expireFallback({title: routeRuName, pathname: pathname.substring(1)})}
          </Suspense>
        )
      }
    }
    return (<Navigate to={expireRedirect} replace />)
}

    // ---------4. Onboarding protection (user should be onboarded) ------//
    if (onboardProtected && user && user.subscription_status && user.subscription_status.toLowerCase() === 'smart' && !user.is_onboarded) {
    switch(onboardGuardType) {
        case 'redirect': {
          return (<Navigate to={onboardRedirect} />)
        }
        case 'fallback': {
        return (
          <Suspense fallback={<LoaderPage />}>
            {onboardFallback()}
          </Suspense>
        )
        }
      }
      
      return (<Navigate to={onboardRedirect} replace />)
  }

  // ----------5. User role protection ------------//
  if (userRoleProtected && user && role && user.role !== role) {
    switch(userRoleGuardType) {
        case 'redirect': {
          return (<Navigate to={userRoleRedirect} />)
        }
        case 'fallback': {
        return (
          <Suspense fallback={<LoaderPage />}>
            {userRoleFallback()}
          </Suspense>
        )
        }
      }

      return (<Navigate to={userRoleRedirect} replace />)
  }

  // ---------- 6. Subscription protection (for different types of subscription) ------------//
  if (subscriptionProtected && user && user.subscription_status !== subscription) {
    switch(subscriptionGuardType) {
      case 'redirect': {
        return (<Navigate to={subscriptionRedirect} />)
      }
      case 'fallback': {
        return (
          <Suspense fallback={<LoaderPage />}>
            {subscriptionFallback()}
          </Suspense>
        )
      }
    }

    return (<Navigate to={subscriptionRedirect} replace />)
  }

  // ----default ----------//
  return ( 
    <Suspense fallback={<LoaderPage />}>
      <Helmet>
        <title>Radar Analityca</title>
        <meta name="description" content={routeRuName} />
      </Helmet>
      { children }
    </Suspense>
  )
}
