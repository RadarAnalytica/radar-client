import React from 'react';
import logo from '../assets/logo.png';
import styles from './AdminSideNav.module.css';

const AdminSideNav = () => {
  return (
    <div className={styles.sideNav}>
      <div className={styles.sidenavWrapper}>
        <img src={logo} alt='Logo' className={styles.sideNavLogo} />
        <div className='mt-4'>
          <div className={styles.adminSideNavEl}>Персональная поддержка</div>
          <div className={styles.adminSideNavEl}>Рефералы</div>
          <div className={styles.adminSideNavEl}>Клиенты</div>
        </div>
      </div>
    </div>
  );
};

export default AdminSideNav;
