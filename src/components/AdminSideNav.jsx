import React from 'react';
import logo from '../assets/logo.png';
import styles from './AdminSideNav.module.css';
import { useNavigate } from 'react-router-dom';

const AdminSideNav = () => {
  const navigate = useNavigate();
  const url = document.location.href;
  const chunkArray = url ? url.split('/').reverse() : null;
  const location = chunkArray ? chunkArray[0] : null;
  return (
    <div className={styles.sideNav}>
      <div className={styles.sidenavWrapper}>
        <img src={logo} alt='Logo' className={styles.sideNavLogo} />
        <div className='mt-4'>
          <p
            className='sidenav-title submenu-item'
            onClick={() => navigate('/admin-panel')}
            style={
              location === 'admin-panel'
                ? { fontWeight: 'bold', fontSize: '14px' }
                : {}
            }
          >
            {location === 'admin-panel' ? (
              <svg
                style={{ marginRight: '0.5vw' }}
                width='8'
                height='8'
                viewBox='0 0 8 8'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <circle cx='4' cy='4' r='4' fill='#5329FF' />
              </svg>
            ) : null}
            Админ Панель
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSideNav;