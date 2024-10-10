import { useState } from 'react';
import styles from './SeoPage.module.css';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import InfoSeoPlate from '../components/InfoSeoPlate';
import SeoCompaire from '../components/SeoCompaire';

const SeoPage = () => {
  const [compaireData, setCompaireData] = useState({});

  return (
    <div className={styles.pageWrapper}>
      <SideNav />
      <div className={styles.scrollableContent}>
        <TopNav title={'Сравнение SEO'} >
           {Object.keys(compaireData).length > 0 && (
            <div className={styles.newTopNavButton} onClick={() => setCompaireData({})}>
               <span>Новый запрос</span>
            </div>
           )}
        </TopNav>
        <div className='container dash-container'>
          {Object.keys(compaireData).length <= 0 && <InfoSeoPlate setCompaireData={setCompaireData} />}
          {Object.keys(compaireData).length > 0 && <SeoCompaire compaireData={compaireData} />}
        </div>
      </div>
    </div>
  );
};

export default SeoPage;
