import React from 'react';
import styles from './BottomNavigation.module.css';

const BottomNavigation = () => {
  const currentUrl = window.location.href;
  console.log(currentUrl);

  let dahsboardActiveStyle = styles.navItem;
  if (currentUrl.includes('weeklyreport-dashboard')) {
    dahsboardActiveStyle = `${styles.navItem} ${styles.active}`;
  }
  return (
    <div className={styles.bottomNavigation}>
      <div className={dahsboardActiveStyle} style={{ marginLeft: '54px' }}>
        <span href='#'>Дашборд</span>
      </div>
      <div className={styles.navItem}>
        <span href='#'>P&L</span>
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
