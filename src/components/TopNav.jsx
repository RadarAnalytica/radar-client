import React, { useContext, useEffect, useState, useRef } from "react";
import AuthContext from "../service/AuthContext";
import { MdOutlineSettings } from "react-icons/md";
import { fetchMessages } from "../redux/messages/messagesSlice";
import { useAppDispatch } from "../redux/hooks";
import { useSelector } from "react-redux";
import { MessagesDropdown } from "./MessagesDropdown";
import { Link } from "react-router-dom";
import styles from './TopNav.module.css';
import { URL } from "../service/config";
import "../App.css";

const TopNav = ({ title, children, subTitle, mikeStarinaStaticProp }) => {
  const dispatch = useAppDispatch();
  const componentRef = useRef(null);
  const { user, logout, authToken } = useContext(AuthContext);

  const [menuShown, setMenuShown] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const messages = useSelector((state) => state.messagesSlice.messages);

  useEffect(() => {
    dispatch(fetchMessages(authToken));
  }, []);

  useEffect(() => {
    // Initial fetch
    // dispatch(fetchMessages(authToken));
    // Set up interval to fetch messages every minute
    const intervalId = setInterval(() => {
      dispatch(fetchMessages(authToken));
    }, 60000); // 60000 milliseconds = 1 minute

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [authToken]);

  const handleErrorClick = (event) => {
    event.stopPropagation();
    setShowErrorPopup(!showErrorPopup);
  };


  const containerStyles = mikeStarinaStaticProp ?
    `container d-flex align-items-center justify-content-between topNavWidth` :
    `container dash-container d-flex align-items-center justify-content-between`;

  const topNavStyles = mikeStarinaStaticProp ?
    `top-nav topNavStatic container dash-container` :
    `top-nav container dash-container`;

  return (
    <div className={topNavStyles}
    >
      <div className={containerStyles}
        style={{ margin: 0, width: '100% !important', maxWidth: '100% !important' }}
      >
        <div className='d-flex col me-2 top-wrapper'>
          {!title ? (
            <>
              <span className='me-3'>{`${user?.firstName} ${user?.lastName}`}</span>
              <span>{user?.email}</span>
            </>
          ) : (<>
            {subTitle && <p
              className='p-0'
              style={{
                fontSize: "24px",
                lineHeight: "30px",
                color: 'rgba(26, 26, 26, 0.3)',
                fontWeight: 700,
                marginRight: '12px',
                marginBottom: '0'
              }}
            >
              {subTitle}
            </p>}
            <p
              style={{ fontSize: "2.75vh", fontWeight: 700 }}
              className='m-0 p-0 fw-bold'
            >
              {title}
            </p>
          </>
          )}
        </div>
        {children}
        <span className='col-2 d-flex justify-content-around top-menu top-wrapper'>
          <span className='error-notification' ref={componentRef}>
            <span onClick={(event) => handleErrorClick(event)} className={styles.icon}>
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
              {messages?.length <= 0 || messages === undefined ? (
                ""
              ) : (
                <span className='error-number'>{messages?.length}</span>
              )}
            </span>
            {showErrorPopup && (
              <div
                className={styles.messagesBackdrop}
                onClick={(e)=> {e.target.id === 'messages-backdrop' && setShowErrorPopup(false);}}
                id='messages-backdrop'
              >
                  <div className={styles.messagesModal}>
                    <MessagesDropdown messages={messages} />
                  </div>
              </div>
            )}
          </span>
          <MdOutlineSettings
            id='settings-icon'
            onClick={() => setMenuShown(true)}
            style={{ maxWidth: "3vw", cursor: "pointer", fontSize: "28px", userSelect: 'none' }}
          />
        </span>

        {menuShown && (
          <div
            className={styles.menuModal__bg}
            onClick={(e) => {e.target.id === 'menu-backdrop' && setMenuShown(false);}}
            id='menu-backdrop'
          >
            <div style={{ display: 'none' }}></div> {/*это костыль */}
            <div
              className={styles.menuModal}
              //id='settings-modal'
            >
              <div style={{ display: 'none' }}></div> {/*это костыль */}
              <div className={styles.menuModal__closeButtonWrapper}>
                <button className={styles.menuModal__closeButton} onClick={(e) => {setMenuShown(false);}}>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M14.3282 1.70711C14.7187 1.31658 14.7187 0.683417 14.3282 0.292893C13.9377 -0.0976311 13.3045 -0.0976311 12.914 0.292893L7.207 5.99988L1.70711 0.499986C1.31658 0.109461 0.683417 0.109461 0.292893 0.499986C-0.0976311 0.89051 -0.0976311 1.52368 0.292893 1.9142L5.58579 7.20709L0.292893 12.5C-0.0976311 12.8905 -0.0976311 13.5237 0.292893 13.9142C0.683417 14.3047 1.31658 14.3047 1.70711 13.9142L7.41409 8.20721L12.914 13.7071C13.3045 14.0976 13.9377 14.0976 14.3282 13.7071C14.7187 13.3166 14.7187 12.6834 14.3282 12.2929L9.03531 7L14.3282 1.70711Z" fill="#ECECEC" />
                  </svg>
                </button>
              </div>
              <ul className={styles.menuModal__linkList}>
                <li className={styles.menuModal__listItem}>
                  <Link className={styles.menuModal__link} to='/linked-shops'>Подключенные магазины</Link>
                </li>
                <li className={styles.menuModal__listItem}>
                  <Link className={styles.menuModal__link} to='/subscription'>Моя подписка</Link>
                </li>
                <li className={styles.menuModal__listItem}>
                  <Link className={styles.menuModal__link} to='/tariffs' target="_blank">Тарифы</Link>
                </li>
              </ul>
              <div className={styles.menuModal__logoutWrapper}>
                <button
                  className={styles.menuModal__logoutLink}
                  onClick={() => { logout(); setMenuShown(false); }}
                >
                  Выход
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNav;
