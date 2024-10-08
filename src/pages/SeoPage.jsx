import styles from './SeoPage.module.css';
import AdminSideNav from '../components/AdminSideNav';
import TopNav from '../components/TopNav';
import InfoSeoPlate from '../components/InfoSeoPlate';
import SeoCompaire from '../components/SeoCompaire';

const SeoPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <AdminSideNav />
      <div className={styles.scrollableContent}>
        <TopNav title={'Сравнение SEO'} />
        <div className='container dash-container'>
          <InfoSeoPlate />
          <SeoCompaire />
        </div>
      </div>
    </div>
  );
};

export default SeoPage;
