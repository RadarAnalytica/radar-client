import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../service/AuthContext';
import noticon from '../assets/notification.png';
import question from '../assets/question.png';
import settings from '../assets/settings.png';
import { useNavigate } from 'react-router-dom';
import { MdOutlineSettings } from 'react-icons/md';
import { RxHamburgerMenu } from 'react-icons/rx';

const TopNav = ({ title }) => {
  const navigate = useNavigate();
  const { user, logout, setShowMobile } = useContext(AuthContext);

  const [menuShown, setMenuShown] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setMenuShown(true);
  };

  const handleMouseLeave = () => {
    const newTimeoutId = setTimeout(() => {
      setMenuShown(false);
    }, 1500);
    setTimeoutId(newTimeoutId);
  };

  // useEffect(() => {
  //     // Получаем элемент иконки по ID
  //     const icon = document.getElementById('settings-icon');

  //     // Функция, которая будет вызываться при клике вне блока
  //     const handleOutsideClick = (e) => {
  //         // Проверяем, кликнули ли мы вне блока
  //         if (icon && !icon.contains(e.target)) {
  //             // Скрываем блок
  //             setMenuShown(false)
  //         }
  //     };

  //     // Добавляем слушатель события на наведение на иконку
  //     // icon.addEventListener('mouseenter', setMenuShown(true));

  //     // Добавляем слушатель события на клик на странице
  //     document.addEventListener('click', handleOutsideClick);

  //     // Очистка при размонтировании компонента
  //     return () => {
  //         // icon.removeEventListener('mouseenter', setMenuShown(true));
  //         document.removeEventListener('click', handleOutsideClick);
  //     };
  // }, []);

  return (
    <div className='top-nav'>
      <div className='container dash-container d-flex align-items-center justify-content-between'>
        <div className='d-flex col me-2 top-wrapper'>
          {!title ? (
            <>
              <span className='me-3'>{`${user?.firstName} ${user?.lastName}`}</span>
              <span>{user?.email}</span>
            </>
          ) : (
            <p
              style={{ fontSize: '2.75vh', fontWeight: 700 }}
              className='m-0 p-0 fw-bold'
            >
              {title}
            </p>
          )}
        </div>
        <div className='col-2 d-flex justify-content-around top-menu top-wrapper'>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g clipPath='url(#clip0_592_1517)'>
              <path
                d='M22 19.8372H2V17.7442H3V10.451C3 5.23105 7.03 1 12 1C16.97 1 21 5.23105 21 10.451V17.7442H22V19.8372ZM5 17.7442H19V10.451C19 6.38744 15.866 3.09302 12 3.09302C8.134 3.09302 5 6.38744 5 10.451V17.7442ZM9.5 20.8837H14.5C14.5 21.5776 14.2366 22.2431 13.7678 22.7337C13.2989 23.2244 12.663 23.5 12 23.5C11.337 23.5 10.7011 23.2244 10.2322 22.7337C9.76339 22.2431 9.5 21.5776 9.5 20.8837Z'
                fill='#09121F'
              />
            </g>
            <defs>
              <clipPath id='clip0_592_1517'>
                <rect width='24' height='24' fill='white' />
              </clipPath>
            </defs>
          </svg>
          <MdOutlineSettings
            id='settings-icon'
            onClick={() => setMenuShown(true)}
            style={{ maxWidth: '3vw', cursor: 'pointer', fontSize: '28px' }}
          />
          {menuShown ? (
            <div
              onMouseEnter={() => handleMouseEnter()}
              onMouseLeave={() => handleMouseLeave()}
              className='settings-modal'
              id='settings-modal'
            >
              {/* <a href="#" className='link'
                                    style={{
                                        borderBottom: '1px  solid silver',
                                        paddingBottom: '8px',
                                    }}
                                >
                                    Получить полный доступ
                                </a> */}
              <div className='pt-2'>
                {/* <p className='mt-3 mb-2'>Сотрудники</p> */}
                {/* <p className='mb-1 mt-2' onClick={() => navigate('/development/settings')}>Настройки аккаунта</p> */}
                <p
                  className='mb-1 mt-2'
                  onClick={() => navigate('/linked-shops')}
                >
                  Подключенные магазины
                </p>
                <p
                className='mt-2'
                onClick={() => navigate('/subscription')}
                >
                  Моя подписка
                </p>
                {/* <p className='mb-2'>Экспорт отчетов</p>
                                    <p className='mb-2'>Тарифы</p> */}
              </div>
              <hr
                style={{
                  minWidth: '220px',
                  height: '1px',
                  border: '1px solid silver',
                  marginBottom: '4px',
                }}
              />
              <a
                href='/signin'
                className='link'
                style={{
                  paddingTop: '4px',
                  paddingLeft: '20px',
                  width: '240px',
                }}
                onClick={() => {
                  logout();
                }}
              >
                Выход
              </a>
            </div>
          ) : null}
        </div>
        {/* <div className="hamburger col-2 d-flex justify-content-around">
                    <RxHamburgerMenu
                        style={{ maxWidth: '2vw', cursor: 'pointer', fontSize: '28px', color: 'black' }}
                        onClick={() => setShowMobile(true)}
                    />
                </div> */}
      </div>
    </div>
  );
};

export default TopNav;
