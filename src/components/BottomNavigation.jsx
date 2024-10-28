import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BottomNavigation.module.css';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const currentUrl = window.location.href;
  const lastUrlPart = currentUrl.split('/').pop();

  let dahsboardActiveStyle = styles.navItem;
  let dahsboardActiveStyle2 = styles.navItem;
  if (lastUrlPart === 'weeklyreport-dashboard') {
    dahsboardActiveStyle = `${styles.navItem} ${styles.active}`;
  }
  if (lastUrlPart === 'weeklyreport-pl') {
    dahsboardActiveStyle2 = `${styles.navItem} ${styles.active}`;
  }

  return (
    <div className={styles.bottomNavigation}>
      <div className={dahsboardActiveStyle} style={{ marginLeft: '54px' }}>
        <span onClick={() => navigate('/weeklyreport-dashboard')}>Дашборд</span>
      </div>
      <div className={dahsboardActiveStyle2}>
        <span onClick={() => navigate('/weeklyreport-pl')}>P&L</span>
      </div>
      <div className={styles.navItem}>
        <span href='#'>По месяцам</span>
      </div>
      <div className={styles.navItem}>
        <span href='#'>По товарам</span>
      </div>
      <div className={styles.navItem}>
        <span href='#'>ABC-анализ</span>
      </div>
      <div className={styles.navItem}>
        <span href='#'>Штрафы</span>
      </div>
      <div className={styles.navItem}>
        <span href='#'>Графики</span>
      </div>
      <div className={styles.navItem}>
        <span href='#'>Внешние расходы</span>
      </div>
      {/* Add more nav items as needed */}
    </div>
  );
};

export default BottomNavigation;
