import { useContext, Suspense } from 'react';
import AuthContext from './service/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoaderPage from './pages/LoaderPage';
import { URL } from './service/config';
import { Helmet } from 'react-helmet-async';
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


// Protection config
const config = {
    subscriptionTypeProtected: {
      Smart: [], // subscription type whitelist: string[], eg ['/yourroute', ...]
      /** ... */
    },
    authGuardType: 'redirect', // 'redirect' | 'fallback'
    expireGuardType: 'fallback', // 'redirect' | 'fallback'
    onboardGuardType: 'redirect', // 'redirect' | 'fallback'
    userRoleGuardType: 'redirect', // 'redirect' | 'fallback'
    subscriptionGuardType: 'redirect', // 'redirect' | 'fallback'
    testPeriodGuardType: 'fallback', // 'redirect' | 'fallback'
    authProtected: true, // default protection level is auth
    authFallback: (props) => (<MainPage {...props} />), // (props: any) => ReactNode
    authRedirect: `/signin`, // any url
    testPeriodProtected: false,
    testPeriodFallback: (props) => (<NoSubscriptionPlugPage {...props} />),
    testPeriodRedirect: '/tariffs',
    expireProtected: false, // boolean
    expireFallback: (props) => (<NoSubscriptionPage {...props} />),
    expireRedirect: '/tariffs',
    onboardProtected: false,
    onboardFallback: (props) => (<MainPage {...props} />),
    onboardRedirect: '/onboarding',
    userRoleProtected: false,
    userRoleFallback: (props) => (<MainPage {...props} />),
    userRoleRedirect: '/main',
    subscriptionProtected: false,
    subscriptionFallback: (props) => (<MainPage {...props} />),
    subscriptionRedirect: '/tariffs',
    subscription: 'Smart', // subscription type
    role: 'admin', // role type

}

export const ProtectedRoute = ({
  children,
  routeRuName, // use it as props for <NoSubscriptionPage /> --- required for expire level
  authGuardType = config.authGuardType,
  expireGuardType = config.expireGuardType,
  onboardGuardType = config.onboardGuardType,
  userRoleGuardType = config.userRoleGuardType,
  subscriptionGuardType = config.subscriptionGuardType,
  testPeriodGuardType = config.testPeriodGuardType,
  testPeriodProtected = config.testPeriodProtected,
  testPeriodFallback = config.testPeriodFallback,
  testPeriodRedirect = config.testPeriodRedirect,
  authProtected = config.authProtected,
  authFallback = config.authFallback,
  authRedirect = config.authRedirect,
  expireProtected = config.expireProtected,
  expireFallback = config.expireFallback,
  expireRedirect = config.expireRedirect,
  onboardProtected = config.onboardProtected,
  onboardFallback = config.onboardFallback,
  onboardRedirect = config.onboardRedirect,
  userRoleProtected = config.userRoleProtected,
  userRoleFallback = config.userRoleFallback,
  userRoleRedirect = config.userRoleRedirect,
  subscriptionProtected = config.subscriptionProtected,
  subscriptionFallback = config.subscriptionFallback,
  subscriptionRedirect = config.subscriptionRedirect,
  subscription = config.subscription,
  role = config.role,
}) => {
  const { user } = useContext(AuthContext);
  const { pathname } = useLocation()
  const isCalculateEntryUrl = sessionStorage.getItem('isCalculateEntryUrl'); // это устанавливается в калькуляторе. Необходимо для коррекного редиректа не авторизованного юзера

  // -------this is test user object for dev purposes ------//

  // let user = {
  //   email: "modinsv@yandex.ru",
  //   id: 2,
  //   is_confirmed: true,
  //   is_onboarded: false,
  //   is_report_downloaded: true,
  //   is_test_used: true,
  //   role: "admin",
  //   subscription_status: null
  // }

//  const user = undefined

/**
1. null
2. expired
3& smart + !onboardig
 */

  // ----------------------------------------------------------//


  //------- 1. Auth protection (checking is user exists) ----------//
  if (authProtected && !user) {
    switch(authGuardType) {
      case 'redirect': {
        if (isCalculateEntryUrl === '1') {
          sessionStorage.removeItem('isCalculateEntryUrl')
          return (window.location.replace(`${URL}/signup`))
        } else {
          return (window.location.replace(`${URL}${authRedirect}`))
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
    return (window.location.replace(`${URL}${authRedirect}`))
  }

  // ---------2. Test period protection ------//
  if (testPeriodProtected && user && user.subscription_status === null) {
    
    // ---------2.1 Mock data protection ------//
    const mockPages = ['Сводка продаж', 'ABC-анализ', 'География заказов и продаж', 'Аналитика по товарам']
    if (user && user.subscription_status === null && mockPages.includes(routeRuName)) {
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
    /***
     * 
     * 
     * 
     *  here will be logic (checking the whitelist of routes from config) when different subscriptions type will be activated
     * 
     * 
     * 
     */
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
