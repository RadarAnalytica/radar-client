import React, { useContext, useEffect, useState, useRef } from 'react';
import AuthContext from '../service/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MdOutlineSettings } from 'react-icons/md';
import { fetchMessages } from '../redux/messages/messagesSlice';
import { useAppDispatch } from '../redux/hooks';
import { useSelector } from 'react-redux';
import { MessagesDropdown } from './MessagesDropdown';
import '../App.css';

const TopNav = ({ title }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const componentRef = useRef(null);
  const { user, logout, authToken } = useContext(AuthContext);

  const [menuShown, setMenuShown] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const messages = useSelector((state) => state.messagesSlice.messages);

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
  useEffect(() => {
    // Initial fetch
    dispatch(fetchMessages(authToken));
  
    // Set up interval to fetch messages every minute
    const intervalId = setInterval(() => {
      dispatch(fetchMessages(authToken));
    }, 60000); // 60000 milliseconds = 1 minute
  
    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [dispatch, authToken]);


  const handleErrorClick = (event) => {
    event.stopPropagation();
    setShowErrorPopup(!showErrorPopup);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (componentRef.current && !componentRef.current.contains(event.target)) {
        setShowErrorPopup(false);
      }
    };

    // Attach the event listener
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


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
        <span className='col-2 d-flex justify-content-around top-menu top-wrapper'>
          <span className='error-notification' ref={componentRef}>
            <span onClick={(event) => handleErrorClick(event)}>
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
              {messages?.length <= 0 ? '' : <span className='error-number'>{messages?.length}</span>}
            </span>
            {showErrorPopup && (
              <span className='error-popup'>
                <MessagesDropdown messages={messages} />
              </span>
            )}
          </span>
          <MdOutlineSettings
            id='settings-icon'
            onClick={() => setMenuShown(true)}
            style={{ maxWidth: '3vw', cursor: 'pointer', fontSize: '28px' }}
          />
          </span>

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
              <div>
                {/* <p className='mt-3 mb-2'>Сотрудники</p> */}
                {/* <p className='mb-1 mt-2' onClick={() => navigate('/development/settings')}>Настройки аккаунта</p> */}
                <p
                  className='mb-1 mt-2'
                  onClick={() => navigate('/linked-shops')}
                >
                  Подключенные магазины
                </p>
                <p className='m-0 mb-1'onClick={() => navigate('/subscription')}>
                  Моя подписка
                </p>
                <p
                className='m-0'
                onClick={() => window.open('/tariffs', '_blank')}
                >
                  Тарифы
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
                  marginTop: '0',
                }}
              />
              <a
                href='/'
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
