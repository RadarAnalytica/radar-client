import React from 'react';
import background from '../pages/images/background-nosubscription.png';
import face from '../pages/images/face.png';
import Sidebar from '../components/sharedComponents/sidebar/sidebar';
import Header from '../components/sharedComponents/header/header';
import MobilePlug from '../components/sharedComponents/mobilePlug/mobilePlug';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './NoSubscriptionPage.module.css'

const NoSubscriptionPage = ({ title }) => {
  const navigate = useNavigate();
  return (
    // <div className="sub-page">
    //   <SideNav />
    //   <div className="background-cover">
    //     <TopNav title={title} />
    //     <div className="image-background">
    //       <img src={background} alt="background" />
    //       <div className="overlay">
    //         <div className="informer_nosubscription">
    //           <img src={face} alt="face" />
    //           <p>Ваша подписка закончилась ;(</p>
    //           <span className="informer_text">
    //             Чтобы продолжить пользоваться сервисом <br />
    //             выберите один из тарифов и произведите оплату
    //           </span>
    //           <button onClick={() => navigate('/tariffs')}>
    //             Посмотреть тарифы
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <main className={styles.page}>
      <MobilePlug />
      {/* ------ SIDE BAR ------ */}
      <section className={styles.page__sideNavWrapper}>
        <Sidebar />
      </section>
      {/* ------ CONTENT ------ */}
      <section className={styles.page__content}>
        {/* header */}
        <div className={styles.page__headerWrapper}>
          <Header title={title} />
        </div>

        <div className={styles.page__mainBlock}>
          <img src={background} alt="background" className={styles.page__background} />
          <div className={styles.page__wrapper}>
            <div className={styles.page__infoCard}>
              <img src={face} alt="face" width={70} height={84} />
              <p className={styles.page__infoTitle}>Ваша подписка закончилась ;(</p>
              <p className={styles.page__infoText}>
                Чтобы продолжить пользоваться сервисом выберите один из тарифов и произведите оплату
              </p>
              <Link to='/tariffs' className={styles.page__mainLink}>Посмотреть тарифы</Link>
            </div>
          </div>
        </div>
        {/* !header */}
      </section>
      {/* ---------------------- */}
    </main>
  );
};

export default NoSubscriptionPage;
