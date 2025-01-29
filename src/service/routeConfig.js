import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../service/AuthContext';
const MainPage = lazy(() => import( '../pages/MainPage'));

const RootComponent = () => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <MainPage />;
    }
    
    if (user?.role === 'admin') {
      return <Navigate to="/admin-panel" replace />;
    } else if (user?.subscription_status === 'expired' || user?.subscription_status === null) {
      return <Navigate to="/tariffs" replace />;
    } else {
      return user?.is_onboarded ? <Navigate to="/dashboard" replace/> : <Navigate to="/onboarding" replace/>;
    }
  };

export const publicRoutes = [
  {
    path: '/',
    component: RootComponent,
  },
  {
    path: '/home',
    component: lazy(() => import('../pages/MainPage'))
  },
  {
    path: '/signin',
    component: lazy(() => import('../pages/SignInPage'))
  },
  {
    path: '/signup',
    component: lazy(() => import('../pages/SignUpPage'))
  },
  {
    path: '/reset',
    component: lazy(() => import('../pages/RequestResetLink'))
  },
  {
    path: '/politics',
    component: lazy(() => import('../pages/Politics'))
  },
  {
    path: '/offer',
    component: lazy(() => import('../pages/PublicOffer'))
  },
  {
    path: '/spasibo',
    component: lazy(() => import('../pages/Spasibo'))
  },
  {
    path: '/contacts',
    component: lazy(() => import('../components/Contacts'))
  },
  {
    path: '/blog',
    component: lazy(() => import('../pages/Blog'))
  },
  {
    path: '/blog/:articleId',
    component: lazy(() => import('../pages/BlogArticle'))
  },
  {
    path: '/how-to-connect-api',
    component: lazy(() => import('../pages/HowToConnectAPI'))
  },
  {
    path: '/confirmation/:email/:code',
    component: lazy(() => import('../pages/ConfirmationPage'))
  },
  {
    path: '/restore/:email/:code',
    component: lazy(() => import('../pages/ResetPage'))
  },
  {
    path: '/stub',
    component: lazy(() => import('../pages/StubPage'))
  },
  {
    path: '/app',
    component: lazy(() => import('../pages/MainWidget'))
  },
];

export const protectedRoutes = [
  {
    path: '/dashboard',
    component: lazy(() => import('../pages/DashboardPage')),
    guards: ['auth', 'subscription', 'onboarding']
  },
  {
    path: '/onboarding',
    component: lazy(() => import('../pages/Onboarding')),
    guards: ['auth', 'subscription']
  },
  {
    path: '/abc-data',
    component: lazy(() => import('../pages/AbcAnalysisPage')),
    guards: ['auth', 'subscription', 'onboarding']
  },
  {
    path: '/abc-data-reports',
    component: lazy(() => import('../pages/ReportAbcAnalysis')),
    guards: ['auth', 'subscription', 'onboarding']
  },
  {
    path: '/seo',
    component: lazy(() => import('../pages/SeoPage')),
    guards: ['auth', 'subscription', 'onboarding']
  },
  {
    path: '/monitoring',
    component: lazy(() => import('../pages/RequestMonitoringPage')),
    guards: ['auth', 'subscription', 'onboarding']
  },
  {
    path: '/ai-generator',
    component: lazy(() => import('../pages/AIDescriptionGeneratorPage')),
    guards: ['auth', 'subscription', 'onboarding']
  },
  {
    path: '/stock-analysis',
    component: lazy(() => import('../pages/StockAnalysis')),
    guards: ['auth', 'subscription', 'onboarding']
  },
  {
    path: '/orders-map',
    component: lazy(() => import('../pages/OrdersMap')),
    guards: ['auth', 'subscription', 'onboarding']
  },
  {
    path: '/linked-shops',
    component: lazy(() => import('../pages/LinkedShops')),
    guards: ['auth', 'onboarding']
  },
  {
    path: '/digitization',
    component: lazy(() => import('../pages/Digitization')),
    guards: ['auth', 'subscription', 'onboarding']
  },
  {
    path: '/product/:id',
    component: lazy(() => import('../components/StockAnalysisGlitter')),
    guards: ['auth', 'subscription', 'onboarding']
  },
  {
    path: '/calculate',
    component: lazy(() => import('../pages/Calculate')),
    guards: ['auth', 'subscription', 'onboarding']
  },
  {
    path: '/instruction',
    component: lazy(() => import('../pages/Instructions')),
    guards: ['auth']
  },
  {
    path: '/report-main',
    component: lazy(() => import('../pages/ReportMain')),
    guards: ['auth', 'subscription', 'onboarding']
  },
  {
    path: '/weeklyreport-dashboard',
    component: lazy(() => import('../pages/WeeklyReportDashboard')),
    guards: ['auth', 'subscription', 'onboarding']
  },
  {
    path: '/weeklyreport-pl',
    component: lazy(() => import('../pages/WeeklyReportPL')),
    guards: ['auth', 'subscription', 'onboarding']
  },
  {
    path: '/weeklyreport-month',
    component: lazy(() => import('../pages/WeeklyReportByMonth')),
    guards: ['auth', 'subscription', 'onboarding']
  },
  {
    path: '/weeklyreport-goods',
    component: lazy(() => import('../pages/WeeklyReportByGoods')),
    guards: ['auth', 'subscription', 'onboarding']
  },
  {
    path: '/weeklyreport-penalties',
    component: lazy(() => import('../pages/WeeklyReportPenaltiesPage')),
    guards: ['auth', 'subscription', 'onboarding']
  },
  {
    path: '/prime-cost',
    component: lazy(() => import('../pages/PrimeCost')),
    guards: ['auth', 'subscription', 'onboarding']
  },
  {
    path: '/schedule',
    component: lazy(() => import('../pages/Schedule')),
    guards: ['auth', 'subscription', 'onboarding']
  },
  {
    path: '/external-expenses',
    component: lazy(() => import('../pages/ExternalExpensesPage')),
    guards: ['auth', 'subscription', 'onboarding']
  },
  {
    path: '/buy-back',
    component: lazy(() => import('../pages/ReportBuyBack')),
    guards: ['auth', 'subscription', 'onboarding']
  },
  {
    path: '/after-payment',
    component: lazy(() => import('../pages/ReportBuyBack')),
    guards: ['auth']
  }
];

export const adminRoutes = [
  {
    path: '/admin-panel',
    component: lazy(() => import('../pages/AdminPanel')),
    guards: ['auth', 'admin']
  },
  {
    path: '/user/:email',
    component: lazy(() => import('../pages/UserInfo')),
    guards: ['auth', 'admin']
  }
];

export const subscriptionRoutes = [
  {
    path: '/tariffs',
    component: lazy(() => import('../pages/TariffsPage')),
    guards: ['auth']
  },
  {
    path: '/test-period-tariff',
    component: lazy(() => import('../pages/TestPeriodTariffPage')),
    guards: ['auth']
  },
  {
    path: '/subscription',
    component: lazy(() => import('../pages/Subscriptions')),
    guards: ['auth', 'subscription']
  }
];

export const errorRoutes = [
  {
    path: '/development/Page404',
    component: lazy(() => import('../pages/Page404'))
  },
  {
    path: '*',
    component: lazy(() => import('../pages/Page404'))
  }
];