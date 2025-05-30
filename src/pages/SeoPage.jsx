import { useState, useContext } from 'react';
import styles from './SeoPage.module.css';
import SideNav from '../components/SideNav';
import InfoSeoPlate from '../components/InfoSeoPlate';
import SeoCompaire from '../components/SeoCompaire';
import NoSubscriptionPage from './NoSubscriptionPage';
import AuthContext from '../service/AuthContext';
import { Helmet } from 'react-helmet-async';
import Sidebar from '../components/sharedComponents/sidebar/sidebar';
import MobilePlug from '../components/sharedComponents/mobilePlug/mobilePlug';
import Header from '../components/sharedComponents/header/header';

const SeoPage = () => {
  const [compaireData, setCompaireData] = useState({});
  const [linksToSend, setLinksToSend] = useState({});
  const { user } = useContext(AuthContext);

  if (user?.subscription_status === 'expired') {
    return <NoSubscriptionPage title={'Сравнение SEO'} />;
  }

  return (
    <div className={styles.pageWrapper}>
      <Helmet>
        <link rel="canonical" href="https://radar-analytica.ru/signup" />
      </Helmet>
      <MobilePlug />
      <div style={{ height: '100vh' }}>
        <Sidebar />
      </div>
      {/* <SideNav /> */}
      <div className={styles.scrollableContent} style={{ padding: '0 32px' }}>
        <div style={{ width: '100%', padding: '0', margin: '20px 0' }}>
          <Header title={'Сравнение SEO'}>
            {Object.keys(compaireData).length > 0 && (
              <div
                className={styles.newTopNavButton}
                onClick={() => setCompaireData({})}
              >
                <span>Новый запрос</span>
              </div>
            )}
          </Header>
        </div>
        <div className='container dash-container'>
          {Object.keys(compaireData).length <= 0 && (
            <InfoSeoPlate
              setCompaireData={setCompaireData}
              setLinksToSend={setLinksToSend}
            />
          )}
          {Object.keys(compaireData).length > 0 && (
            <SeoCompaire
              compaireData={compaireData}
              linksToSend={linksToSend}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SeoPage;
