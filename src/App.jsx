import "./App.css";
import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./service/AuthContext";
import { Suspense } from "react";
import { URL } from "./service/config";
// import MobileMenu from "./components/MobileMenu";
import "bootstrap/dist/css/bootstrap.min.css";
// import Digitization from "./pages/Digitization";
import { ProductProvider } from "./service/ProductContext";
// import TestPeriodTariffPage from "./pages/TestPeriodTariffPage";
// import DataCollectionNotification from './components/DataCollectionNotification';
// import { ServiceFunctions } from './service/serviceFunctions';




const Contacts = React.lazy(() => import("./components/Contacts"));
const StockAnalysisGlitter = React.lazy(() => import("./components/StockAnalysisGlitter"));
const Subscriptions = React.lazy(() => import("./pages/Subscriptions"));
const RequestMonitoringPage = React.lazy(() => import("./pages/RequestMonitoringPage"));
const AiDescriptionGeneratorPage = React.lazy(() => import("./pages/AIDescriptionGeneratorPage"));
const SeoPage = React.lazy(() => import("./pages/SeoPage"));
const WeeklyReportPL = React.lazy(() => import("./pages/WeeklyReportPL"));
const WeeklyReportByMonth = React.lazy(() => import("./pages/WeeklyReportByMonth"));
const ReportAbcAnalysis = React.lazy(() => import("./pages/ReportAbcAnalysis"));
const WeeklyReportByGoods = React.lazy(() => import("./pages/WeeklyReportByGoods"));
const WeeklyReportPenaltiesPage = React.lazy(() => import("./pages/WeeklyReportPenaltiesPage"));
const ReportMain = React.lazy(() => import("./pages/ReportMain"));
const PrimeCost = React.lazy(() => import("./pages/PrimeCost"));
const ExternalExpensesPage = React.lazy(() => import("./pages/ExternalExpensesPage"));
const ReportBuyBack = React.lazy(() => import("./pages/ReportBuyBack"));
const MobileMenu = React.lazy(() => import("./components/MobileMenu"));
const AbcAnalysisPage = React.lazy(() => import("./pages/AbcAnalysisPage"));
const SignUpPage = React.lazy(() => import("./pages/SignUpPage"));
const SignInPage = React.lazy(() => import("./pages/SignInPage"));
const Onboarding = React.lazy(() => import("./pages/Onboarding"));
const ConfirmationPage = React.lazy(() => import("./pages/ConfirmationPage"));
const DashboardPage = React.lazy(() => import("./pages/DashboardPage"));
// const MockUpPage = React.lazy(() => import("./pages/MockUpPage"));
const ResetPage = React.lazy(() => import("./pages/ResetPage"));
const RequestResetLink = React.lazy(() => import("./pages/RequestResetLink"));
const LinkedShops = React.lazy(() => import("./pages/LinkedShops"));
const Calculate = React.lazy(() => import("./pages/Calculate"));
const OrdersMap = React.lazy(() => import("./pages/OrdersMap"));
// const Settings = React.lazy(() => import("./pages/Settings"));
const Spasibo = React.lazy(() => import("./pages/Spasibo"));
const Instructions = React.lazy(() => import("./pages/Instructions"));
const Monitoring = React.lazy(() => import("./pages/Monitoring"));
const SupplyCount = React.lazy(() => import("./pages/SupplyCount"));
const StockAnalysis = React.lazy(() => import("./pages/StockAnalysis"));
const MainWidget = React.lazy(() => import("./pages/MainWidget"));
const Politics = React.lazy(() => import("./pages/Politics"));
const UserAgreement = React.lazy(() => import("./pages/UserAgreement"));
const PublicOffer = React.lazy(() => import("./pages/PublicOffer"));
const StubPage = React.lazy(() => import("./pages/StubPage"));
const AfterPayment = React.lazy(() => import("./pages/AfterPayment"));
const TariffsPage = React.lazy(() => import("./pages/TariffsPage"));
const Page404 = React.lazy(() => import("./pages/Page404"));
const AdminPanel = React.lazy(() => import("./pages/AdminPanel"));
const UserInfo = React.lazy(() => import("./pages/UserInfo"));
const WeeklyReportDashboard = React.lazy(() => import("./pages/WeeklyReportDashboard"));
const Schedule = React.lazy(() => import("./pages/Schedule"));
// const Period = React.lazy(() => import("./components/period/Period"));
const HowToConnectAPI = React.lazy(() => import("./pages/HowToConnectAPI"));
const StartPage = React.lazy(() => import("./pages/StartPage"));
const UnitCalculatorPage = React.lazy(() => import("./pages/UnitCalculatorPage"));
import LoaderPage from "./pages/LoaderPage";
import { ProtectedRoute } from "./RouteGuards";
import { BlogAdd, BlogList } from "./pages/blog";
import MainPage from "./pages/MainPage";

/**
 * --------------------------------------
 * 1. To connect a protected route - just wrap it with ProtectedRoute component (mind the props! - instruction is inside)
 * 2. To connect a public one - wrap it with Suspense with LoaderPage as fallback - this is highly important!
 * --------------------------------------
 */

function App() {

  return (
    <AuthProvider>
        <ProductProvider>
          <Routes>
            {/* Protected routes */}
            <Route path='/dashboard' element={<ProtectedRoute expireProtected onboardProtected routeRuName='Сводка продаж'><DashboardPage /></ProtectedRoute>} />
            <Route path='/abc-data' element={<ProtectedRoute expireProtected onboardProtected routeRuName='ABC-анализ'><AbcAnalysisPage /></ProtectedRoute>} />
            <Route path='/seo' element={<ProtectedRoute expireProtected routeRuName='Сравнение SEO'><SeoPage /></ProtectedRoute>} />
            <Route path='/monitoring' element={<ProtectedRoute expireProtected routeRuName='Мониторинг запросов'><RequestMonitoringPage /></ProtectedRoute>} />
            <Route path='/ai-generator' element={<ProtectedRoute expireProtected routeRuName='Генерация описания AI'><AiDescriptionGeneratorPage /></ProtectedRoute>} />
            <Route path='/development/monitoring' element={<ProtectedRoute expireProtected onboardProtected userRoleProtected role='admin' routeRuName='Мониторинг запросов'><Monitoring /></ProtectedRoute>} />
            <Route path='/development/supply' element={<ProtectedRoute expireProtected onboardProtected userRoleProtected role='admin' routeRuName='Расчет поставок'><SupplyCount /></ProtectedRoute>} />
            <Route path='/stock-analysis' element={<ProtectedRoute expireProtected onboardProtected routeRuName='Товарная аналитика'><StockAnalysis /></ProtectedRoute>} />
            <Route path='/orders-map' element={<ProtectedRoute expireProtected onboardProtected routeRuName='География заказов и продаж'><OrdersMap /></ProtectedRoute>} />
            <Route path='/linked-shops' element={<ProtectedRoute expireProtected onboardProtected routeRuName='Подключенные магазины'><LinkedShops /></ProtectedRoute>} />
            <Route path='/report-main' element={<ProtectedRoute expireProtected routeRuName='Отчёт / Главная'><ReportMain /></ProtectedRoute>} />
            <Route path='/weeklyreport-dashboard' element={<ProtectedRoute expireProtected routeRuName='Отчёт / Дашборд'><WeeklyReportDashboard /></ProtectedRoute>} />
            <Route path='/weeklyreport-pl' element={<ProtectedRoute expireProtected routeRuName='Отчёт / P&L'><WeeklyReportPL /></ProtectedRoute>} />
            <Route path='/weeklyreport-month' element={<ProtectedRoute expireProtected routeRuName='Отчёт / По месяцам'><WeeklyReportByMonth /></ProtectedRoute>} />
            <Route path='/weeklyreport-goods' element={<ProtectedRoute expireProtected routeRuName='Отчёт / По товарам'><WeeklyReportByGoods /></ProtectedRoute>} />
            <Route path='/weeklyreport-penalties' element={<ProtectedRoute expireProtected routeRuName='Отчёт / Штрафы'><WeeklyReportPenaltiesPage /></ProtectedRoute>} />
            <Route path='/weeklyreport-goods' element={<ProtectedRoute expireProtected routeRuName='Отчёт / По товарам'><WeeklyReportByGoods /></ProtectedRoute>} />
            <Route path='/abc-data-reports' element={<ProtectedRoute expireProtected routeRuName='ABC анализ'><ReportAbcAnalysis /></ProtectedRoute>} />
            <Route path='/prime-cost' element={<ProtectedRoute expireProtected routeRuName='Отчёт / Себестоимость'><PrimeCost /></ProtectedRoute>} />
            <Route path='/external-expenses' element={<ProtectedRoute expireProtected routeRuName='Отчёт / Внешние расходы'><ExternalExpensesPage /></ProtectedRoute>} />
            <Route path='/buy-back' element={<ProtectedRoute expireProtected routeRuName='Отчёт / Самовыкуп'><ReportBuyBack /></ProtectedRoute>} />
            <Route path='/admin-panel' element={<ProtectedRoute userRoleProtected role='admin' routeRuName='Админ панель'><AdminPanel /></ProtectedRoute>} />
            <Route path='/main' element={<ProtectedRoute><StartPage /></ProtectedRoute>} />
            <Route path='/home' element={<ProtectedRoute><StartPage /></ProtectedRoute>} />
            <Route path='/instruction' element={<ProtectedRoute authGuardType="redirect"><Instructions /></ProtectedRoute>} /> 
            <Route path='/onboarding' element={<ProtectedRoute authGuardType="redirect"><Onboarding /></ProtectedRoute>} />
            <Route path='/user/:email' element={<ProtectedRoute authGuardType="redirect"><UserInfo /></ProtectedRoute>} />
            <Route path='/tariffs' element={<ProtectedRoute authGuardType="redirect"><TariffsPage /></ProtectedRoute>} />
            <Route path='/subscription' element={<ProtectedRoute authGuardType="redirect"><Subscriptions /></ProtectedRoute>} />
            <Route path='/schedule' element={<ProtectedRoute expireProtected authGuardType="redirect"><Schedule /></ProtectedRoute>} />
            {/* <Route path='/period' element={<ProtectedRoute authGuardType="redirect"><Period /></ProtectedRoute>} /> */}
            <Route path='/product/:id' element={<ProtectedRoute><StockAnalysisGlitter /></ProtectedRoute>} />
            <Route path='/product/:id' element={<ProtectedRoute><StockAnalysisGlitter /></ProtectedRoute>} />
            {/* <Route path='/report-main' element={<ProtectedRoute><ReportMain /></ProtectedRoute>} /> */}
            {/* Public routes */}
            <Route path='/' element={<Suspense fallback={<LoaderPage />}>{' '}<MainPage /></Suspense>} />
            <Route path='/calculate' element={<Suspense fallback={<LoaderPage />}>{' '}<UnitCalculatorPage /></Suspense>} />
            <Route path='/stub' element={<Suspense fallback={<LoaderPage />}>{' '}<StubPage /></Suspense>} />
            <Route path='/signup' element={<Suspense fallback={<LoaderPage />}>{' '}<SignUpPage /></Suspense>} />
            <Route path='/signin' element={<Suspense fallback={<LoaderPage />}>{' '}<SignInPage /></Suspense>} />
            <Route path='/spasibo' element={<Suspense fallback={<LoaderPage />}>{' '}<Spasibo /></Suspense>} />
            <Route path='/politics' element={<Suspense fallback={<LoaderPage />}>{' '}<Politics /></Suspense>} />
            <Route path='/user-agreement' element={<Suspense fallback={<LoaderPage />}>{' '}<UserAgreement /></Suspense>} />
            <Route path='/offer' element={<Suspense fallback={<LoaderPage />}>{' '}<PublicOffer /></Suspense>} />
            <Route path='/app' element={<Suspense fallback={<LoaderPage />}>{' '}<MainWidget /></Suspense>} />
            <Route path='/reset' element={<Suspense fallback={<LoaderPage />}>{' '}<RequestResetLink /></Suspense>} />
            <Route path='/restore/:email/:code' element={<Suspense fallback={<LoaderPage />}>{' '}<ResetPage /></Suspense>} />
            <Route path='/confirmation/:email/:code' element={<Suspense fallback={<LoaderPage />}>{' '}<ConfirmationPage /></Suspense>} />
            <Route path='/development/Page404' element={<Suspense fallback={<LoaderPage />}>{' '}<Page404 /></Suspense>} />
            <Route path='/contacts' element={<Suspense fallback={<LoaderPage />}>{' '}<Contacts /></Suspense>} />
            <Route path='/after-payment' element={<Suspense fallback={<LoaderPage />}>{' '}<AfterPayment /></Suspense>} />
            <Route path='/how-to-connect-api' element={<Suspense fallback={<LoaderPage />}>{' '}<HowToConnectAPI /></Suspense>} />
            {/* 404 */}
            <Route path='*' element={<Navigate to={`${URL}/not-found`} replace />} status={404} />
          </Routes>
        </ProductProvider>
    </AuthProvider>
  )
}

export default App;
