import "./App.css";
import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthContext, { AuthProvider } from "./service/AuthContext";
import { useContext } from "react";
import MobileMenu from "./components/MobileMenu";
import "bootstrap/dist/css/bootstrap.min.css";
import Digitization from "./pages/Digitization";
import Contacts from "./components/Contacts";
import StockAnalysisGlitter from "./components/StockAnalysisGlitter";
import LoaderPage from "./pages/LoaderPage";
import Subscriptions from "./pages/Subscriptions";
import RequestMonitoringPage from "./pages/RequestMonitoringPage";
import AiDescriptionGeneratorPage from "./pages/AIDescriptionGeneratorPage";

// import DataCollectionNotification from './components/DataCollectionNotification';
// import { ServiceFunctions } from './service/serviceFunctions';
const AbcAnalysisPage = React.lazy(() => import("./pages/AbcAnalysisPage"));
const SignUpPage = React.lazy(() => import("./pages/SignUpPage"));
const SignInPage = React.lazy(() => import("./pages/SignInPage"));
const Onboarding = React.lazy(() => import("./pages/Onboarding"));
const ConfirmationPage = React.lazy(() => import("./pages/ConfirmationPage"));
const DashboardPage = React.lazy(() => import("./pages/DashboardPage"));
const MockUpPage = React.lazy(() => import("./pages/MockUpPage"));
const ResetPage = React.lazy(() => import("./pages/ResetPage"));
const RequestResetLink = React.lazy(() => import("./pages/RequestResetLink"));
const LinkedShops = React.lazy(() => import("./pages/LinkedShops"));
const Calculate = React.lazy(() => import("./pages/Calculate"));
const OrdersMap = React.lazy(() => import("./pages/OrdersMap"));
const Settings = React.lazy(() => import("./pages/Settings"));
const Spasibo = React.lazy(() => import("./pages/Spasibo"));
const Instructions = React.lazy(() => import("./pages/Instructions"));
const Monitoring = React.lazy(() => import("./pages/Monitoring"));
const SupplyCount = React.lazy(() => import("./pages/SupplyCount"));
const StockAnalysis = React.lazy(() => import("./pages/StockAnalysis"));
const MainWidget = React.lazy(() => import("./pages/MainWidget"));
const Politics = React.lazy(() => import("./pages/Politics"));
const PublicOffer = React.lazy(() => import("./pages/PublicOffer"));
const StubPage = React.lazy(() => import("./pages/StubPage"));
const MainPage = React.lazy(() => import("./pages/MainPage"));
const AfterPayment = React.lazy(() => import("./pages/AfterPayment"));
const TariffsPage = React.lazy(() => import("./pages/TariffsPage"));
const Page404 = React.lazy(() => import("./pages/Page404"));
const AdminPanel = React.lazy(() => import("./pages/AdminPanel"));
const UserInfo = React.lazy(() => import("./pages/UserInfo"));

const NoSubscriptionPage = React.lazy(() =>
  import("./pages/NoSubscriptionPage")
);

function App() {
  const { user } = useContext(AuthContext);
  console.log("user", user);

  const renderElement = (user) => {
    if (user?.subscription_status === 'expired' || user?.subscription_status === null) {
      return <TariffsPage />;
    } else {
      return user?.is_onboarded ? <DashboardPage /> : <Onboarding />;
    }
  };

  if (user) {
    return (
      <div className='App'>
        <AuthProvider>
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
              }
            />
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
              path='/userinfo'
              element={
                <React.Suspense fallback={<LoaderPage />}>
                  <UserInfo />
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
                <Route
                  path='/digitization'
                  element={
                    <React.Suspense fallback={<LoaderPage />}>
                      {" "}
                      <Digitization />
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
              </>
            )}
            {/* <Route path='/development/settings' element={<Settings />} /> */}
            {/* <Route path='*' element={<Navigate to={'/development/dashboard'} replace />} /> */}
          </Routes>
        </AuthProvider>
      </div>
    );
  }

  return (
    <div className='App'>
      <AuthProvider>
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
          {/* <Route path='/' element={<MockUpPage />} />
          <Route path='/development/home' element={<MainPage />} />
          <Route path='/stub' element={<StubPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/signin' element={<SignInPage />} />
          <Route path='/spasibo' element={<Spasibo />} />
          <Route path='/politics' element={<Politics />} />
          <Route path='/instruction' element={<Instructions />} />
          <Route path='/development/onboarding' element={<Onboarding />} />
          <Route path='/development/dashboard' element={<DashboardPage />} />
          <Route path='/development/monitoring' element={<Monitoring />} />
          <Route path='/development/supply' element={<SupplyCount />} />
          <Route path='/app' element={<MainWidget />} />
          <Route path='/development/linked-shops' element={<LinkedShops />} />
          <Route path='/development/stock-analysis' element={<StockAnalysis />} />
          <Route path='/development/calculate' element={<Calculate />} />
          <Route path='/development/orders-map' element={<OrdersMap />} />
          <Route path='/confirmation/:email/:code' element={<ConfirmationPage />} />
          <Route path='/restore/:email/:code' element={<ResetPage />} />
          <Route path='/reset' element={<RequestResetLink />} /> */}
          {/* <Route path='/development/*' element={<Navigate to={'/signin'} replace />} /> */}
          {/* <Route path='/development/settings' element={<Settings />} /> */}
          {/* <Route path='*' element={<Navigate to={'/development/signin'} replace />} /> */}
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
