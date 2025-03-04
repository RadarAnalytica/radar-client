import "./App.css";
import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./service/AuthContext";
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
const MainPage = React.lazy(() => import("./pages/MainPage"));
const AfterPayment = React.lazy(() => import("./pages/AfterPayment"));
const TariffsPage = React.lazy(() => import("./pages/TariffsPage"));
const Page404 = React.lazy(() => import("./pages/Page404"));
const AdminPanel = React.lazy(() => import("./pages/AdminPanel"));
const UserInfo = React.lazy(() => import("./pages/UserInfo"));
const WeeklyReportDashboard = React.lazy(() => import("./pages/WeeklyReportDashboard"));
const Schedule = React.lazy(() => import("./pages/Schedule"));
const Period = React.lazy(() => import("./components/Period"));
const HowToConnectAPI = React.lazy(() => import("./pages/HowToConnectAPI"));
const StartPage = React.lazy(() => import("./pages/StartPage"));
import { ProtectedRoute } from "./RouteGuards";


function App() {

  return (
    <AuthProvider>
        <ProductProvider>
          <Routes>
            {/* Protected routes */}
            <Route path='/dashboard' element={<ProtectedRoute expireProtected onboardProtected><DashboardPage /></ProtectedRoute>} />
            <Route path='/abc-data' element={<ProtectedRoute expireProtected onboardProtected><AbcAnalysisPage /></ProtectedRoute>} />
            <Route path='/seo' element={<ProtectedRoute expireProtected onboardProtected><SeoPage /></ProtectedRoute>} />
            <Route path='/monitoring' element={<ProtectedRoute expireProtected onboardProtected><RequestMonitoringPage /></ProtectedRoute>} />
            <Route path='/ai-generator' element={<ProtectedRoute expireProtected onboardProtected><AiDescriptionGeneratorPage /></ProtectedRoute>} />
            <Route path='/development/monitoring' element={<ProtectedRoute expireProtected onboardProtected><Monitoring /></ProtectedRoute>} />
            <Route path='/development/supply' element={<ProtectedRoute expireProtected onboardProtected><SupplyCount /></ProtectedRoute>} />
            <Route path='/stock-analysis' element={<ProtectedRoute expireProtected onboardProtected><StockAnalysis /></ProtectedRoute>} />
            <Route path='/calculate' element={<ProtectedRoute expireProtected onboardProtected><Calculate /></ProtectedRoute>} />
            <Route path='/orders-map' element={<ProtectedRoute expireProtected onboardProtected><OrdersMap /></ProtectedRoute>} />
            <Route path='/linked-shops' element={<ProtectedRoute expireProtected onboardProtected><LinkedShops /></ProtectedRoute>} />
            <Route path='/report-main' element={<ProtectedRoute expireProtected onboardProtected><ReportMain /></ProtectedRoute>} />
            <Route path='/weeklyreport-dashboard' element={<ProtectedRoute expireProtected onboardProtected><WeeklyReportDashboard /></ProtectedRoute>} />
            <Route path='/weeklyreport-pl' element={<ProtectedRoute expireProtected onboardProtected><WeeklyReportPL /></ProtectedRoute>} />
            <Route path='/weeklyreport-month' element={<ProtectedRoute expireProtected onboardProtected><WeeklyReportByMonth /></ProtectedRoute>} />
            <Route path='/weeklyreport-goods' element={<ProtectedRoute expireProtected onboardProtected><WeeklyReportByGoods /></ProtectedRoute>} />
            <Route path='/weeklyreport-penalties' element={<ProtectedRoute expireProtected onboardProtected><WeeklyReportPenaltiesPage /></ProtectedRoute>} />
            <Route path='/prime-cost' element={<ProtectedRoute expireProtected onboardProtected><PrimeCost /></ProtectedRoute>} />
            <Route path='/external-expenses' element={<ProtectedRoute expireProtected onboardProtected><ExternalExpensesPage /></ProtectedRoute>} />
            <Route path='/buy-back' element={<ProtectedRoute expireProtected onboardProtected><ReportBuyBack /></ProtectedRoute>} />
            <Route path='/admin-panel' element={<ProtectedRoute><AdminPanel expireProtected onboardProtected userRoleProtected role='admin'/></ProtectedRoute>} />
            <Route path='/' element={<ProtectedRoute guardType="fallback"><StartPage /></ProtectedRoute>} />
            <Route path='/home' element={<ProtectedRoute guardType="fallback"><StartPage /></ProtectedRoute>} />
            <Route path='/instruction' element={<ProtectedRoute guardType="redirect"><Instructions /></ProtectedRoute>} /> 
            <Route path='/onboarding' element={<ProtectedRoute guardType="redirect"><Onboarding /></ProtectedRoute>} />
            <Route path='/user/:email' element={<ProtectedRoute guardType="redirect"><UserInfo /></ProtectedRoute>} />
            <Route path='/tariffs' element={<ProtectedRoute guardType="redirect"><TariffsPage /></ProtectedRoute>} />
            <Route path='/subscription' element={<ProtectedRoute guardType="redirect"><Subscriptions /></ProtectedRoute>} />
            <Route path='/schedule' element={<ProtectedRoute guardType="redirect"><Schedule /></ProtectedRoute>} />
            <Route path='/period' element={<ProtectedRoute guardType="redirect"><Period /></ProtectedRoute>} />
            <Route path='/product/:id' guardType="redirect" element={<ProtectedRoute><StockAnalysisGlitter /></ProtectedRoute>} />
            <Route path='/product/:id' guardType="redirect" element={<ProtectedRoute><StockAnalysisGlitter /></ProtectedRoute>} />
            <Route path='/report-main' guardType="redirect" element={<ProtectedRoute><ReportMain /></ProtectedRoute>} />
            {/* Public routes */}
            <Route path='/stub' element={<StubPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/signin' element={<SignInPage />} />
            <Route path='/spasibo' element={<Spasibo />} />
            <Route path='/politics' element={<Politics />} />
            <Route path='/user-agreement' element={<UserAgreement />} />
            <Route path='/offer' element={<PublicOffer />} />
            <Route path='/app' element={<MainWidget />} />
            <Route path='/reset' element={<RequestResetLink />} />
            <Route path='/restore/:email/:code' element={<ResetPage />} />
            <Route path='/confirmation/:email/:code' element={<ConfirmationPage />} />
            <Route path='/development/Page404' element={<Page404 />} />
            <Route path='/contacts' element={<Contacts />} />
            <Route path='/after-payment' element={<AfterPayment />} />
            <Route path='/how-to-connect-api' element={<HowToConnectAPI />} />
            {/*  */}
            <Route path='*' element={<Page404 />} />
          </Routes>
        </ProductProvider>
    </AuthProvider>
  )
}

export default App;
