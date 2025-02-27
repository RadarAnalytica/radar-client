import "./App.css";
import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthContext, { AuthProvider } from "./service/AuthContext";
import { useContext } from "react";
// import MobileMenu from "./components/MobileMenu";
import "bootstrap/dist/css/bootstrap.min.css";
// import Digitization from "./pages/Digitization";
import { ProductProvider } from "./service/ProductContext";
import LoaderPage from "./pages/LoaderPage";
import MessageWindow from "./components/MessageWindow";
// import TestPeriodTariffPage from "./pages/TestPeriodTariffPage";
// import { OnboardingProtectedRoute, SubscriptionProtectedRoute } from "./RouteGuards";
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

// const NoSubscriptionPage = React.lazy(() =>
//   import("./pages/NoSubscriptionPage")
// );

function App() {
  const { user } = useContext(AuthContext);

// this is test user object for dev purposes

// let user = {
//   email: "modinsv@yandex.ru",
//   id: 2,
//   is_confirmed: true,
//   is_onboarded: true,
//   is_report_downloaded: true,
//   is_test_used: true,
//   role: "employee",
//   subscription_status: "Smart"
// }
  console.log('-------------app.jsx user below----------')
  console.log(user)
  console.log('-----------------------------------------')

  const renderElement = (user) => {
    if (user?.role === 'admin') {
      console.log('user is admin')
      return <Navigate to="/admin-panel" replace />;
    } else if (user?.subscription_status === 'expired' || user?.subscription_status === null) {
      console.log('users subscription is expired')
      return <TariffsPage />;
    } else if (user?.subscription_status && user?.subscription_status === 'Smart') { 
      console.log('users subscription = Smart')
      return <StartPage />
    } else {
      console.log('users redirected to onboarding')
      return user?.is_onboarded ? <DashboardPage /> : <Onboarding />;
    }

    // Do we need a default (mean clear) condition here?
  };
  // return (
  //   <AuthProvider>
  //     <MobileMenu />
  //     <Routes>
  //       <Route 
  //         path="/"
  //         element={
  //           <OnboardingProtectedRoute user={user} >
  //             <React.Suspense fallback={<LoaderPage />}>
  //               <MainPage />
  //             </React.Suspense>
  //           </OnboardingProtectedRoute>
  //         }
  //       />

  //       <Route 
  //         path='/calculate'
  //         element={
  //           <SubscriptionProtectedRoute user={user} >
  //             <React.Suspense fallback={<LoaderPage />}>
  //               <Calculate />
  //             </React.Suspense>
  //           </SubscriptionProtectedRoute>
  //         }
  //       />

  //       <Route 
  //         path='/onboarding'
  //         element={
  //           <SubscriptionProtectedRoute user={user} >
  //             <React.Suspense fallback={<LoaderPage />}>
  //               <Onboarding />
  //             </React.Suspense>
  //           </SubscriptionProtectedRoute>
  //         }
  //       />
  //       <Route 
  //         path='/linked-shops'
  //         element={
  //           <OnboardingProtectedRoute user={user} >
  //             <React.Suspense fallback={<LoaderPage />}>
  //               <LinkedShops />
  //             </React.Suspense>
  //           </OnboardingProtectedRoute>
  //         }
  //       />

  //       <Route
  //         path='/signup'
  //         element={
  //           <React.Suspense fallback={<LoaderPage />}>
  //             {" "}
  //             <SignUpPage />
  //           </React.Suspense>
  //         }
  //       />

  //       <Route
  //         path='/signin'
  //         element={
  //           <React.Suspense fallback={<LoaderPage />}>
  //             {" "}
  //             <SignInPage />
  //           </React.Suspense>
  //         }
  //       />

  //       <Route
  //         path='*'
  //         element={
  //           <React.Suspense fallback={<LoaderPage />}>
  //             {" "}
  //             <Page404 />
  //           </React.Suspense>
  //         }
  //       />
        
  //     </Routes>
  //   </AuthProvider>
  // )

  if (user) {
    return (
      <div className='App'>
        <AuthProvider>
          <ProductProvider>
            <MobileMenu />
            <Routes>
              <Route
                path='/'
                element={
                  <React.Suspense fallback={<LoaderPage />}>
                    {renderElement(user)}
                  </React.Suspense>
                }
              />
              <Route
                path='/home'
                element={
                  <React.Suspense fallback={<LoaderPage />}>
                    <MainPage />
                  </React.Suspense>
                }
              />
              <Route
                path='/stub'
                element={
                  <React.Suspense fallback={<LoaderPage />}>
                    {" "}
                    <StubPage />
                  </React.Suspense>
                }
              />
              <Route
                path='/signup'
                element={
                  <React.Suspense fallback={<LoaderPage />}>
                    {" "}
                    <SignUpPage />
                  </React.Suspense>
                }
              />
              <Route
                path='/signin'
                element={
                  <React.Suspense fallback={<LoaderPage />}>
                    {" "}
                    <SignInPage />
                  </React.Suspense>
                }
              />
              <Route
                path='/spasibo'
                element={
                  <React.Suspense fallback={<LoaderPage />}>
                    {" "}
                    <Spasibo />
                  </React.Suspense>
                }
              />
              <Route
                path='/politics'
                element={
                  <React.Suspense fallback={<LoaderPage />}>
                    {" "}
                    <Politics />
                  </React.Suspense>
                }
              />
              <Route
                path='/user-agreement'
                element={
                  <React.Suspense fallback={<LoaderPage />}>
                    {" "}
                    <UserAgreement />
                  </React.Suspense>
                }
              />
              <Route
                path='/offer'
                element={
                  <React.Suspense fallback={<LoaderPage />}>
                    {" "}
                    <PublicOffer />
                  </React.Suspense>
                }
              />
              ;
              <Route
                path='/instruction'
                element={
                  <React.Suspense fallback={<LoaderPage />}>
                    {" "}
                    <Instructions />
                  </React.Suspense>
                }
              />
              <Route
                path='/calculate'
                element={
                  <React.Suspense fallback={<LoaderPage />}>
                    {user?.subscription_status === null ? (
                      <TariffsPage />
                    ) : (
                      <Calculate />
                    )}
                  </React.Suspense>
                }
              />
              <Route
                path='/onboarding'
                element={
                  <React.Suspense fallback={<LoaderPage />}>
                    {user?.subscription_status === null ? (
                      <TariffsPage />
                    ) : (
                      <Onboarding />
                    )}
                  </React.Suspense>
                }
              />
              <Route
                path='/app'
                element={
                  <React.Suspense fallback={<LoaderPage />}>
                    {" "}
                    <MainWidget />
                  </React.Suspense>
                }
              />
              <Route
                path='/reset'
                element={
                  <React.Suspense fallback={<LoaderPage />}>
                    {" "}
                    <RequestResetLink />
                  </React.Suspense>
                }
              />
              <Route
                path='/confirmation/:email/:code'
                element={
                  <React.Suspense fallback={<LoaderPage />}>
                    {" "}
                    <ConfirmationPage />
                  </React.Suspense>
                }
              />
              <Route
                path='/restore/:email/:code'
                element={
                  <React.Suspense fallback={<LoaderPage />}>
                    {" "}
                    <ResetPage />
                  </React.Suspense>
                }
              />
              <Route
                path='/development/Page404'
                element={
                  <React.Suspense fallback={<LoaderPage />}>
                    {" "}
                    <Page404 />
                  </React.Suspense>
                }
              />
              <Route
                path='*'
                element={
                  <React.Suspense fallback={<LoaderPage />}>
                    {" "}
                    <Page404 />
                  </React.Suspense>
                }
              />
              <Route
                path='/contacts'
                element={
                  <React.Suspense fallback={<LoaderPage />}>
                    {" "}
                    <Contacts />
                  </React.Suspense>
                }
              />
              <Route
                path='/after-payment'
                element={
                  <React.Suspense fallback={<LoaderPage />}>
                    {" "}
                    <AfterPayment />
                  </React.Suspense>
                }
              />
              <Route
                path='/tariffs'
                element={
                  <React.Suspense fallback={<LoaderPage />}>
                    {" "}
                    <TariffsPage />
                  </React.Suspense>

                  // <React.Suspense fallback={<LoaderPage />}>
                  //   {!user.is_test_used ? (
                  //     <Navigate to="/test-period-tariff" replace />
                  //   ) : (
                  //     <TariffsPage />
                  //   )}
                  // </React.Suspense>
                }
              />
              {/* <Route
                path='/test-period-tariff'
                element={
                  <React.Suspense fallback={<LoaderPage />}>
                    {user.is_test_used ? (
                      <Navigate to="/tariffs" replace />
                    ) : (
                      <TestPeriodTariffPage />
                    )}
                  </React.Suspense>
                }
              /> */}

              <Route
                path='/subscription'
                element={
                  <React.Suspense fallback={<LoaderPage />}>
                    <Subscriptions />
                  </React.Suspense>
                }
              />
              <Route
                path='/admin-panel'
                element={
                  <React.Suspense fallback={<LoaderPage />}>
                    <AdminPanel />
                  </React.Suspense>
                }
              />
              <Route
                path='/schedule'
                element={
                  <React.Suspense fallback={<LoaderPage />}>
                    <Schedule />
                  </React.Suspense>
                }
              />
              <Route
                path='/period'
                element={
                  <React.Suspense fallback={<LoaderPage />}>
                    <Period />
                  </React.Suspense>
                }
              />
              <Route
                path='/abc-data-reports'
                element={
                  <React.Suspense fallback={<LoaderPage />}>
                    <ReportAbcAnalysis />
                  </React.Suspense>
                }
              />
              <Route
                path='/user/:email'
                element={
                  <React.Suspense fallback={<LoaderPage />}>
                    <UserInfo />
                  </React.Suspense>
                }
              />
              <Route
                path='/how-to-connect-api'
                element={
                  <React.Suspense fallback={<LoaderPage />}>
                    <HowToConnectAPI />
                  </React.Suspense>
                }
              />
              
              {user.is_onboarded ? (
                <>
                  <Route
                    path='/dashboard'
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        {user?.subscription_status === null ? (
                          <TariffsPage />
                        ) : (
                          <DashboardPage />
                        )}
                      </React.Suspense>
                    }
                  />

                  <Route
                    path='/abc-data'
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        <AbcAnalysisPage />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path='/seo'
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        <SeoPage />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path='/monitoring'
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        <RequestMonitoringPage />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path='/ai-generator'
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        <AiDescriptionGeneratorPage />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path='/report-main'
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        <ReportMain />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/weeklyreport-dashboard"
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        <WeeklyReportDashboard />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/weeklyreport-pl"
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        <WeeklyReportPL />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/weeklyreport-month"
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        <WeeklyReportByMonth />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/weeklyreport-goods"
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        <WeeklyReportByGoods />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/weeklyreport-penalties"
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        <WeeklyReportPenaltiesPage />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/prime-cost"
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        <PrimeCost />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/external-expenses"
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        <ExternalExpensesPage />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/buy-back"
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        <ReportBuyBack />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path='/development/monitoring'
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        {" "}
                        <Monitoring />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path='/development/supply'
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        {" "}
                        <SupplyCount />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path='/stock-analysis'
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        {" "}
                        <StockAnalysis />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path='/calculate'
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        <Calculate />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path='/orders-map'
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        {user?.subscription_status === null ? (
                          <TariffsPage />
                        ) : (
                          <OrdersMap />
                        )}
                      </React.Suspense>
                    }
                  />
                  <Route
                    path='/linked-shops'
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        {user?.subscription_status === null ? (
                          <TariffsPage />
                        ) : (
                          <LinkedShops />
                        )}
                      </React.Suspense>
                    }
                  />
                  {/* <Route
                    path='/digitization'
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        {" "}
                        <Digitization />
                      </React.Suspense>
                    }
                  /> */}
                  <Route
                    path='/contacts'
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        {" "}
                        <Contacts />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path='/product/:id'
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        {" "}
                        <StockAnalysisGlitter />
                      </React.Suspense>
                    }
                  />
                </>
              ) : (
                <>
                  <Route
                    path='/dashboard'
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        {user?.subscription_status === null ? <TariffsPage /> : <Onboarding />}
                      </React.Suspense>
                    }
                  />

                  <Route
                    path='/abc-data'
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        {user?.subscription_status === null ? <TariffsPage /> : <Onboarding />}
                      </React.Suspense>
                    }
                  />
                  <Route
                    path='/seo'
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        <SeoPage />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path='/monitoring'
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        <RequestMonitoringPage />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path='/ai-generator'
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        <AiDescriptionGeneratorPage />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path='/development/monitoring'
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        {" "}
                        <Onboarding />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path='/development/supply'
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        {" "}
                        <Onboarding />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path='/stock-analysis'
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        {user?.subscription_status === null ? <TariffsPage /> : <Onboarding />}
                      </React.Suspense>
                    }
                  />
                  <Route
                    path='/calculate'
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        {user?.subscription_status === null ? <TariffsPage /> : <Onboarding />}
                      </React.Suspense>
                    }
                  />
                  <Route
                    path='/orders-map'
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        {user?.subscription_status === null ? <TariffsPage /> : <Onboarding />}
                      </React.Suspense>
                    }
                  />
                  <Route
                    path='/linked-shops'
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        {user?.subscription_status === null ? <TariffsPage /> : <Onboarding />}
                      </React.Suspense>
                    }
                  />
                  <Route
                    path='/report-main'
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        <ReportMain />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/weeklyreport-dashboard"
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        <WeeklyReportDashboard />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/weeklyreport-pl"
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        <WeeklyReportPL />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/weeklyreport-month"
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        <WeeklyReportByMonth />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/weeklyreport-goods"
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        <WeeklyReportByGoods />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/weeklyreport-penalties"
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        <WeeklyReportPenaltiesPage />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/prime-cost"
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        <PrimeCost />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/external-expenses"
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        <ExternalExpensesPage />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/buy-back"
                    element={
                      <React.Suspense fallback={<LoaderPage />}>
                        <ReportBuyBack />
                      </React.Suspense>
                    }
                  />
                </>
                
              )}
              {/* <Route path='/development/settings' element={<Settings />} /> */}
              {/* <Route path='*' element={<Navigate to={'/development/dashboard'} replace />} /> */}
            </Routes>
            <MessageWindow />
          </ProductProvider>
        </AuthProvider>
      </div>
    );
  }

  return (
    <div className='App'>
      <AuthProvider>
        <ProductProvider>
          <Routes>
            <Route
              path='/'
              element={
                <React.Suspense fallback={<LoaderPage />}>
                  {" "}
                  <MainPage />
                </React.Suspense>
              }
            />
            <Route
              path='/home'
              element={
                <React.Suspense fallback={<LoaderPage />}>
                  {" "}
                  <MainPage />
                </React.Suspense>
              }
            />
            <Route
              path='/stub'
              element={
                <React.Suspense fallback={<LoaderPage />}>
                  {" "}
                  <StubPage />
                </React.Suspense>
              }
            />
            <Route
              path='/signup'
              element={
                <React.Suspense fallback={<LoaderPage />}>
                  {" "}
                  <SignUpPage />
                </React.Suspense>
              }
            />
            <Route
              path='/signin'
              element={
                <React.Suspense fallback={<LoaderPage />}>
                  {" "}
                  <SignInPage />
                </React.Suspense>
              }
            />
            <Route
              path='/spasibo'
              element={
                <React.Suspense fallback={<LoaderPage />}>
                  {" "}
                  <Spasibo />
                </React.Suspense>
              }
            />
            <Route
              path='/politics'
              element={
                <React.Suspense fallback={<LoaderPage />}>
                  {" "}
                  <Politics />
                </React.Suspense>
              }
            />
            <Route
              path='/user-agreement'
              element={
                <React.Suspense fallback={<LoaderPage />}>
                  {" "}
                  <UserAgreement />
                </React.Suspense>
              }
            />
            <Route
              path='/offer'
              element={
                <React.Suspense fallback={<LoaderPage />}>
                  {" "}
                  <PublicOffer />
                </React.Suspense>
              }
            />
            ;
            <Route
              path='/instruction'
              element={
                <React.Suspense fallback={<LoaderPage />}>
                  {" "}
                  <SignInPage />
                </React.Suspense>
              }
            />
            <Route
              path='/onboarding'
              element={
                <React.Suspense fallback={<LoaderPage />}>
                  {" "}
                  <SignInPage />
                </React.Suspense>
              }
            />
            <Route
              path='/dashboard'
              element={
                <React.Suspense fallback={<LoaderPage />}>
                  {" "}
                  <SignInPage />
                </React.Suspense>
              }
            />
            <Route
              path='/tariffs'
              element={
                <React.Suspense fallback={<LoaderPage />}>
                  {" "}
                  <SignInPage />
                </React.Suspense>
              }
            />
            <Route
              path='/development/monitoring'
              element={
                <React.Suspense fallback={<LoaderPage />}>
                  {" "}
                  <SignInPage />
                </React.Suspense>
              }
            />
            <Route
              path='/development/supply'
              element={
                <React.Suspense fallback={<LoaderPage />}>
                  {" "}
                  <SignInPage />
                </React.Suspense>
              }
            />
            <Route
              path='/app'
              element={
                <React.Suspense fallback={<LoaderPage />}>
                  {" "}
                  <MainWidget />
                </React.Suspense>
              }
            />
            <Route
              path='/stock-analysis'
              element={
                <React.Suspense fallback={<LoaderPage />}>
                  {" "}
                  <SignInPage />
                </React.Suspense>
              }
            />
            <Route
              path='/calculate'
              element={
                <React.Suspense fallback={<LoaderPage />}>
                  {" "}
                  <SignInPage />
                </React.Suspense>
              }
            />
            <Route
              path='/orders-map'
              element={
                <React.Suspense fallback={<LoaderPage />}>
                  {" "}
                  <SignInPage />
                </React.Suspense>
              }
            />
            <Route
              path='/linked-shops'
              element={
                <React.Suspense fallback={<LoaderPage />}>
                  {" "}
                  <SignInPage />
                </React.Suspense>
              }
            />
            <Route
              path='/reset'
              element={
                <React.Suspense fallback={<LoaderPage />}>
                  {" "}
                  <RequestResetLink />
                </React.Suspense>
              }
            />
            <Route
              path='/confirmation/:email/:code'
              element={
                <React.Suspense fallback={<LoaderPage />}>
                  {" "}
                  <ConfirmationPage />
                </React.Suspense>
              }
            />
            <Route
              path='/restore/:email/:code'
              element={
                <React.Suspense fallback={<LoaderPage />}>
                  {" "}
                  <ResetPage />
                </React.Suspense>
              }
            />
            <Route
              path='/development/Page404'
              element={
                <React.Suspense fallback={<LoaderPage />}>
                  {" "}
                  <Page404 />
                </React.Suspense>
              }
            />
            <Route
              path='*'
              element={
                <React.Suspense fallback={<LoaderPage />}>
                  {" "}
                  <SignInPage />
                </React.Suspense>
              }
            />
            <Route
              path='/contacts'
              element={
                <React.Suspense fallback={<LoaderPage />}>
                  {" "}
                  <Contacts />
                </React.Suspense>
              }
            />
            <Route
              path='/how-to-connect-api'
              element={
                <React.Suspense fallback={<LoaderPage />}>
                  <HowToConnectAPI />
                </React.Suspense>
              }
            />
            
          </Routes>
        </ProductProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
