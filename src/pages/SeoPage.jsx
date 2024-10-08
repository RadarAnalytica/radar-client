import { useState } from 'react';
import styles from './SeoPage.module.css';
import AdminSideNav from '../components/AdminSideNav';
import TopNav from '../components/TopNav';
import InfoSeoPlate from '../components/InfoSeoPlate';
import SeoCompaire from '../components/SeoCompaire';

const SeoPage = () => {
  const [compaireData, setCompaireData] = useState({});

  return (
    <div className={styles.pageWrapper}>
      <AdminSideNav />
      <div className={styles.scrollableContent}>
        <TopNav title={'Сравнение SEO'} />
        <div className='container dash-container'>
          {Object.keys(compaireData).length <= 0 && <InfoSeoPlate setCompaireData={setCompaireData} />}
          {Object.keys(compaireData).length > 0 && <SeoCompaire compaireData={compaireData} />}
        </div>
      </div>
    </div>
  );
};

export default SeoPage;
