import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BottomNavigation.module.css';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const currentUrl = window.location.href;
  const lastUrlPart = currentUrl.split('/').pop();

  let dahsboardActiveStyle = styles.navItem;
  let dahsboardActiveStyle2 = styles.navItem;
  let dahsboardActiveStyle3 = styles.navItem;
  let dahsboardActiveStyle4 = styles.navItem;
  let dahsboardActiveStyle5 = styles.navItem;
  let dahsboardActiveStyle6 = styles.navItem;
  let dahsboardActiveStyle7 = styles.navItem;
  let dahsboardActiveStyle8 = styles.navItem;
  if (lastUrlPart === 'weeklyreport-dashboard') {
    dahsboardActiveStyle = `${styles.navItem} ${styles.active}`;
  }
  if (lastUrlPart === 'weeklyreport-pl') {
    dahsboardActiveStyle2 = `${styles.navItem} ${styles.active}`;
  }
  if (lastUrlPart === 'weeklyreport-month') {
    dahsboardActiveStyle3 = `${styles.navItem} ${styles.active}`;
  }
  if (lastUrlPart === 'schedule') {
    dahsboardActiveStyle4 = `${styles.navItem} ${styles.active}`;
  }
  if (lastUrlPart === 'abc-data-reports') {
    dahsboardActiveStyle5 = `${styles.navItem} ${styles.active}`;
  }
  if (lastUrlPart === 'weeklyreport-goods') {
    dahsboardActiveStyle6 = `${styles.navItem} ${styles.active}`;
  }
  if (lastUrlPart === 'weeklyreport-penalties') {
    dahsboardActiveStyle7 = `${styles.navItem} ${styles.active}`;
  }
  if (lastUrlPart === 'report-main') {
    dahsboardActiveStyle8 = `${styles.navItem} ${styles.active}`;
  }

  return (
    <div className={styles.bottomNavigation}>
      <div className={dahsboardActiveStyle8} style={{ marginLeft: '54px' }}>
        <span onClick={() => navigate('/report-main')}>Главная</span>
      </div>
      <div className={dahsboardActiveStyle}>
        <span onClick={() => navigate('/weeklyreport-dashboard')}>Дашборд</span>
      </div>
      <div className={dahsboardActiveStyle2}>
        <span onClick={() => navigate('/weeklyreport-pl')}>P&L</span>
      </div>
      <div className={dahsboardActiveStyle3}>
        <span onClick={() => navigate('/weeklyreport-month')}>По месяцам</span>
      </div>
      <div className={dahsboardActiveStyle6}>
        <span onClick={() => navigate('/weeklyreport-goods')}>По товарам</span>
      </div>
      <div className={dahsboardActiveStyle5}>
        <span onClick={() => navigate('/abc-data-reports')}>ABC-анализ</span>
      </div>
      <div className={dahsboardActiveStyle7}>
        <span onClick={() => navigate('/weeklyreport-penalties')}>Штрафы</span>
      </div>
      <div className={dahsboardActiveStyle4}>
        <span onClick={() => navigate('/schedule')}>Графики</span>
      </div>
      <div className={styles.navItem}>
        <span href='#'>Внешние расходы</span>
      </div>
    </div>
  );
};

export default BottomNavigation;
