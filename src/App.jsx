import "./App.css";
import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./service/AuthContext";
import { Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { HelmetProvider } from 'react-helmet-async';
import { ProductProvider } from "./service/ProductContext";

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
// const AbcAnalysisPage = React.lazy(() => import("./pages/AbcAnalysisPage"));
const AbcAnalysisPage = React.lazy(() => import("./pages/AbcAnalysisPage/AbcAnalysisPage"));
const Onboarding = React.lazy(() => import("./pages/Onboarding"));
const ConfirmationPage = React.lazy(() => import("./pages/ConfirmationPage"));
// const DashboardPage = React.lazy(() => import("./pages/DashboardPage"));
const ResetPage = React.lazy(() => import("./pages/ResetPage"));
const RequestResetLink = React.lazy(() => import("./pages/RequestResetLink"));
//const LinkedShops = React.lazy(() => import("./pages/LinkedShops"));
const OrdersMap = React.lazy(() => import("./pages/OrdersMap"));
const Spasibo = React.lazy(() => import("./pages/Spasibo"));
const Instructions = React.lazy(() => import("./pages/Instructions"));
//const StockAnalysis = React.lazy(() => import("./pages/StockAnalysis"));
const MainWidget = React.lazy(() => import("./pages/MainWidget"));
const StubPage = React.lazy(() => import("./pages/StubPage"));
const AfterPayment = React.lazy(() => import("./pages/AfterPayment"));
const TariffsPage = React.lazy(() => import("./pages/TariffsPage"));
const Page404 = React.lazy(() => import("./pages/Page404"));
//const AdminPanel = React.lazy(() => import("./pages/AdminPanel"));
const UserInfo = React.lazy(() => import("./pages/UserInfo"));
const WeeklyReportDashboard = React.lazy(() => import("./pages/WeeklyReportDashboard"));
const Schedule = React.lazy(() => import("./pages/Schedule"));
const UnitCalculatorPage = React.lazy(() => import("./pages/UnitCalculatorPage"));
const UnitCalculatorPageDesktop = React.lazy(() => import("./pages/UnitCalculatorPageDesktop"));
const DashboardPage = React.lazy(() => import("./pages/apiServicePages/dashboardPage/page/dashboardPage"));
const BlogPage = React.lazy(() => import("./pages/AdminPage/BlogPage"));
const SkuAnalysisPage = React.lazy(() => import("./pages/skuAnalysisPage/skuAnalysisPage"));
const StockAnalysisPage = React.lazy(() => import("./pages/apiServicePages/stockAnalysisPage/stockAnalysisPage"));
const ProductGroupsPage = React.lazy(() => import("./pages/productsGroupsPages/pages/mainGroupsPage/productsGroupsPage"));
const SingleGroupPage = React.lazy(() => import("./pages/productsGroupsPages/pages/singleGroupPage/singleGroupPage"));
const SkuIdPage = React.lazy(() => import("./pages/skuAnalysisPage/skuIdPage"));
const SelfCostPage = React.lazy(() => import("./pages/selfCostPage/selfCostPage"));
const ReportWeek = React.lazy(() => import("./pages/ReportWeek"));
const SkuFrequencyPage = React.lazy(() => import("./pages/skuFrequencyPage/skuFrequencyPage"));
const SkuFrequencyRequestPage = React.lazy(() => import("./pages/skuFrequencyPage/skuFrequencyRequestPage"));
const TrendingRequestsPage = React.lazy(() => import("./pages/trendingRequestsPage/trendingRequestsPage"));
const TrendAnalysisQuery = React.lazy(() => import("./pages/TrendAnalysisQuery"));
const ReportProfitLoss = React.lazy(() => import("./pages/ReportProfitLoss/ReportProfitLoss"));
const LinkedShopsPage = React.lazy(() => import("./pages/linkedShops/linkedShops"));
const AdminDashboardPage = React.lazy(() => import("./pages/AdminPage/AdminDashboardPage"));
const AdminReferalPage = React.lazy(() => import("./pages/AdminPage/AdminReferalPage"));
const OperationsCosts = React.lazy(() => import("./pages/OperationsCosts/OperationsCosts"));
const MainPage = React.lazy(() => import('./pages/homePage'))
const ReferalPage = React.lazy(() => import("./pages/Referal"));
const SupplierAnalysisPage = React.lazy(() => import("./pages/supplierAnalysisPage/supplierAnalysisPage"));
const SupplierIdPage = React.lazy(() => import("./pages/supplierAnalysisPage/supplierIdPage"));
const RestoreError = React.lazy(() => import("./pages/RestoreError"));
const Rnp = React.lazy(() => import('./pages/Rnp'))
import LoaderPage from "./pages/LoaderPage";
import { ProtectedRoute } from "./RouteGuards";

/**
 * --------------------------------------
 * 1. To connect a protected route - just wrap it with ProtectedRoute component (mind the props! - instruction is inside)
 * 2. To connect a public one - wrap it with Suspense with LoaderPage as fallback - this is highly important!
 * --------------------------------------
 */

function App() {

  // нужно для определения какую страницу калькулятора показывать
  const { userAgent } = navigator;
  const deviceRegexp = /android|iphone|kindle|ipad/i

  return (
    <AuthProvider>
      <ProductProvider>
        <HelmetProvider>

          <Routes>
            {/* dev */}
            <Route path='/dev/after-payment' element={<ProtectedRoute userRoleProtected><AfterPayment devMode /></ProtectedRoute>} />
            {/* Admin */}
            <Route path='/blog' element={<ProtectedRoute userRoleProtected routeRuName='Админ панель / Блог'><BlogPage /></ProtectedRoute>} />
            <Route path='/admin-dashboard' element={<ProtectedRoute userRoleProtected routeRuName='Админ панель / Дашборд'><AdminDashboardPage /></ProtectedRoute>} />
            <Route path='/admin-referal' element={<ProtectedRoute userRoleProtected routeRuName='Админ панель / Реферальная программа'><AdminReferalPage /></ProtectedRoute>} />
            {/* Protected routes */}
            <Route path='/supplier-analysis' element={<ProtectedRoute testPeriodProtected expireProtected routeRuName='Анализ поставщика'><SupplierAnalysisPage /></ProtectedRoute>} />
            <Route path='/supplier-analysis/:id' element={<ProtectedRoute testPeriodProtected testPeriodGuardType='redirect' testPeriodRedirect='/supplier-analysis' expireProtected routeRuName='Анализ поставщика'><SupplierIdPage /></ProtectedRoute>} />
            <Route path='/sku-frequency' element={<ProtectedRoute underDevProtected testPeriodProtected expireProtected routeRuName='Частотность артикула'><RequestMonitoringPage /></ProtectedRoute>} />
            <Route path='/monitoring' element={<ProtectedRoute testPeriodProtected expireProtected routeRuName='Поиск прибыльной ниши'><SkuFrequencyPage /></ProtectedRoute>} />
            <Route path='/monitoring/request' element={<ProtectedRoute testPeriodProtected expireProtected routeRuName='Поиск прибыльной ниши'><SkuFrequencyRequestPage /></ProtectedRoute>} />
            <Route path='/trend-analysis' element={<ProtectedRoute testPeriodProtected expireProtected routeRuName='Анализ трендовой динамики запросов'><TrendAnalysisQuery /></ProtectedRoute>} />
            <Route path='/trending-requests' element={<ProtectedRoute testPeriodProtected expireProtected routeRuName='Поиск трендовых запросов'><TrendingRequestsPage /></ProtectedRoute>} />
            <Route path='/groups' element={<ProtectedRoute testPeriodProtected expireProtected routeRuName='Группы товаров'><ProductGroupsPage /></ProtectedRoute>} />
            <Route path='/groups/:group_id' element={<ProtectedRoute testPeriodProtected expireProtected routeRuName='Группа товаров'><SingleGroupPage /></ProtectedRoute>} />
            <Route path='/selfcost' element={<ProtectedRoute testPeriodProtected expireProtected routeRuName='Себестоимость товаров'><SelfCostPage /></ProtectedRoute>} />
            <Route path='/sku-analysis' element={<ProtectedRoute testPeriodProtected expireProtected routeRuName='Анализ артикула'><SkuAnalysisPage /></ProtectedRoute>} />
            <Route path='/sku-analysis/:id' element={<ProtectedRoute testPeriodProtected testPeriodGuardType='redirect' testPeriodRedirect='/sku-analysis' expireProtected routeRuName='Анализ артикула'><SkuIdPage /></ProtectedRoute>} />
            <Route path='/dashboard' element={<ProtectedRoute testPeriodProtected expireProtected onboardProtected routeRuName='Сводка продаж'><DashboardPage /></ProtectedRoute>} />
            <Route path='/abc-data' element={<ProtectedRoute testPeriodProtected expireProtected onboardProtected routeRuName='ABC-анализ'><AbcAnalysisPage /></ProtectedRoute>} />
            <Route path='/rank-analysis' element={<ProtectedRoute testPeriodProtected expireProtected routeRuName='Сравнение SEO'><SeoPage /></ProtectedRoute>} />
            <Route path='/ai-generator' element={<ProtectedRoute testPeriodProtected expireProtected routeRuName='Генерация описания AI'><AiDescriptionGeneratorPage /></ProtectedRoute>} />
            <Route path='/stock-analysis' element={<ProtectedRoute testPeriodProtected expireProtected onboardProtected routeRuName='Аналитика по товарам'><StockAnalysisPage /></ProtectedRoute>} />
            <Route path='/orders-map' element={<ProtectedRoute testPeriodProtected expireProtected onboardProtected routeRuName='География заказов и продаж'><OrdersMap /></ProtectedRoute>} />
            <Route path='/linked-shops' element={<ProtectedRoute testPeriodProtected expireProtected onboardProtected routeRuName='Подключенные магазины'><LinkedShopsPage /></ProtectedRoute>} />
            <Route path='/report-main' element={<ProtectedRoute testPeriodProtected expireProtected routeRuName='Отчёт / Главная'><ReportMain /></ProtectedRoute>} />
            <Route path='/weeklyreport-dashboard' element={<ProtectedRoute expireProtected routeRuName='Отчёт / Дашборд'><WeeklyReportDashboard /></ProtectedRoute>} />
            <Route path='/weeklyreport-pl' element={<ProtectedRoute expireProtected routeRuName='Отчёт / P&L'><WeeklyReportPL /></ProtectedRoute>} />
            <Route path='/weeklyreport-month' element={<ProtectedRoute expireProtected routeRuName='Отчёт / По месяцам'><WeeklyReportByMonth /></ProtectedRoute>} />
            <Route path='/weeklyreport-goods' element={<ProtectedRoute expireProtected routeRuName='Отчёт / По товарам'><WeeklyReportByGoods /></ProtectedRoute>} />
            <Route path='/weeklyreport-penalties' element={<ProtectedRoute expireProtected routeRuName='Отчёт / Штрафы'><WeeklyReportPenaltiesPage /></ProtectedRoute>} />
            <Route path='/abc-data-reports' element={<ProtectedRoute expireProtected routeRuName='ABC анализ'><ReportAbcAnalysis /></ProtectedRoute>} />
            <Route path='/prime-cost' element={<ProtectedRoute expireProtected routeRuName='Отчёт / Себестоимость'><PrimeCost /></ProtectedRoute>} />
            <Route path='/external-expenses' element={<ProtectedRoute expireProtected routeRuName='Отчёт / Внешние расходы'><ExternalExpensesPage /></ProtectedRoute>} />
            <Route path='/buy-back' element={<ProtectedRoute expireProtected routeRuName='Отчёт / Самовыкуп'><ReportBuyBack /></ProtectedRoute>} />
            <Route path='/main' element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
            <Route path='/home' element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
            <Route path='/instruction' element={<ProtectedRoute authGuardType="redirect"><Instructions /></ProtectedRoute>} />
            <Route path='/onboarding' element={<ProtectedRoute authGuardType="redirect" testPeriodProtected testPeriodGuardType="redirect" testPeriodRedirect="/linked-shops" expireProtected><Onboarding /></ProtectedRoute>} />
            <Route path='/user/:email' element={<ProtectedRoute authGuardType="redirect"><UserInfo /></ProtectedRoute>} />
            <Route path='/tariffs' element={<ProtectedRoute authGuardType="redirect"><TariffsPage /></ProtectedRoute>} />
            <Route path='/subscription' element={<ProtectedRoute testPeriodProtected authGuardType="redirect"><Subscriptions /></ProtectedRoute>} />
            <Route path='/schedule' element={<ProtectedRoute expireProtected authGuardType="redirect"><Schedule /></ProtectedRoute>} />
            <Route path='/product/:id' element={<ProtectedRoute><StockAnalysisGlitter /></ProtectedRoute>} />

            <Route path='/report-profit-loss' element={<ProtectedRoute testPeriodProtected onboardProtected expireProtected routeRuName='Отчет о прибыли и убытках'><ReportProfitLoss /></ProtectedRoute>} />
            <Route path='/report-week' element={<ProtectedRoute testPeriodProtected expireProtected onboardProtected routeRuName='По неделям'><ReportWeek /></ProtectedRoute>} />
            <Route path='/operations-costs' element={<ProtectedRoute testPeriodProtected expireProtected onboardProtected routeRuName='!!!Операционные расходы!!!'><OperationsCosts /></ProtectedRoute>} />
            <Route path='/referal' element={<ProtectedRoute testPeriodProtected expireProtected onboardProtected routeRuName='Реферальная программа'><ReferalPage /></ProtectedRoute>} />
            <Route path='/rnp' element={<ProtectedRoute testPeriodProtected expireProtected onboardProtected routeRuName='Рука на пульсе'><Rnp /></ProtectedRoute>} />
            {/* Public routes */}
            <Route path='/calculate' element={<Suspense fallback={<LoaderPage />}>{deviceRegexp.test(userAgent) ? <UnitCalculatorPage /> : <UnitCalculatorPageDesktop />}</Suspense>} />
            <Route path='/stub' element={<Suspense fallback={<LoaderPage />}>{' '}<StubPage /></Suspense>} />
            <Route path='/spasibo' element={<Suspense fallback={<LoaderPage />}>{' '}<Spasibo /></Suspense>} />
            <Route path='/app' element={<Suspense fallback={<LoaderPage />}>{' '}<MainWidget /></Suspense>} />
            <Route path='/reset' element={<Suspense fallback={<LoaderPage />}>{' '}<RequestResetLink /></Suspense>} />
            <Route path='/restore/:email/:code' element={<Suspense fallback={<LoaderPage />}>{' '}<ResetPage /></Suspense>} />
            <Route path='/restore-error' element={<Suspense fallback={<LoaderPage />}>{' '}<RestoreError /></Suspense>} />
            <Route path='/confirmation/:email/:code' element={<Suspense fallback={<LoaderPage />}>{' '}<ConfirmationPage /></Suspense>} />
            <Route path='/contacts' element={<Suspense fallback={<LoaderPage />}>{' '}<Contacts /></Suspense>} />
            <Route path='/after-payment' element={<Suspense fallback={<LoaderPage />}>{' '}<AfterPayment /></Suspense>} />
            {/* 404 */}
            <Route path='*' element={<Page404 />} status={404} />
          </Routes>
        </HelmetProvider>
      </ProductProvider>
    </AuthProvider>
  )
}

export default App;
