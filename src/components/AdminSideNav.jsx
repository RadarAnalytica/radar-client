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
    <div className='side-nav'>
      <div className={styles.sidenavWrapper}>
        <img src={logo} alt='Logo' className={styles.sideNavLogo} />
        <div style={{marginTop: '1.5em'}}>
            <div
              className='sidenav-el'
              onClick={() => navigate('/admin-panel')}
              style={
                { fontWeight: location === 'admin-panel' ? 'bold' : 'inherit'}
              }
            >
              <div className='d-flex align-items-center'>

                {location === 'admin-panel' ? (
                  <svg
                  className='side-nav-icon'
                  // style={{ marginRight: '0.5vw' }}
                  width='8'
                    height='8'
                    viewBox='0 0 8 8'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <circle cx='4' cy='4' r='4' fill='#5329FF' />
                  </svg>
                ) : null}
                <span
                  className='sidenav-title'
                  style={
                    location === 'admin-panel'
                      ? { fontWeight: 'bold', color: 'black' }
                      : {}
                    }
                  >

                  Админ Панель
                </span>
              </div>
            </div>
          { true && 
          <>
          <p 
            className='sidenav-el sidenav-title submenu-item'
            style={
              { fontWeight: ['blog-list', 'blog-add'].includes(location) ? 'bold' : 'inherit'}
            }
          >
                Блог список
          </p>
          <div>
            <p
              className='sidenav-title submenu-item'
              onClick={() => navigate('/blog-add')}
              style={
                { fontWeight: 'blog-add' === location ? 'bold' : 'inherit'}
              }
            >
              Добавить
            </p>
            <p
              className='sidenav-title submenu-item'
              onClick={() => navigate('/blog-list')}
              style={
                { fontWeight: 'blog-list' === location ? 'bold' : 'inherit'}
              }
            >
              Список
            </p>
          </div>
          </>
          }
        </div>
      </div>
    </div>
  );
};

export default AdminSideNav;