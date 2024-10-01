import React from 'react';
import logo from '../assets/logo.png';
import styles from './AdminSideNav.module.css';

const AdminSideNav = () => {
  return (
    <div className='side-nav'>
      <div className={styles.sidenavWrapper}>
        <img src={logo} alt='Logo' className={styles.sideNavLogo} />
        <div className='mt-4'>
           <div className='sidenav-el'>
             Персональная поддержка
           </div>
           <div className='sidenav-el'>
             Рефералы
           </div>
           <div className='sidenav-el'>
             Клиенты
           </div>
        </div>

      </div>
    </div>
  );
};

export default AdminSideNav;
