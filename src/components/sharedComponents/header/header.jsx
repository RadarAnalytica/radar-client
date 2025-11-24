import { useState, useContext, useEffect } from 'react';
import styles from './header.module.css';
import Icon from './headerIcon/icon';
import { Popover } from 'antd';
import HeaderMenu from './headerMenu/headerMenu';
import HeaderAlerts from './headerAlerts/headerAlerts';
import AuthContext from '../../../service/AuthContext';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { fetchMessages } from '../../../redux/messages/messagesSlice';
import { VideoReview } from './videoReviewButton/videoReview';
import { StatusBanner } from '../../../shared';
import { getDayDeclension } from '../../../service/utils';
import HowToLink from '../howToLink/howToLink';
import { useLocation, Link } from 'react-router-dom';


const popoverOptions = {
  arrow: false,
  trigger: 'click',
  placement: 'bottomLeft'
};

const Header = ({
  title = 'Radar Analytica',
  titlePrefix,
  children,
  videoReviewLink,
  howToLink,
  howToLinkText,
  hasShadow = true,
}) => {
  const dispatch = useAppDispatch();
  const {
    user,
    logout,
    authToken } = useContext(AuthContext);
  // стейт видимости поповера меню
  const [isMenuPopoverVisible, setIsMenuPopoverVisible] = useState(false);
  // сообщения
  const { messages } = useAppSelector((state) => state.messagesSlice);
  // получение и обновление сообщений
  useEffect(() => {
    let intervalId;
    if (!messages) {
      dispatch(fetchMessages(authToken));
    } else {
      intervalId = setInterval(() => {
        dispatch(fetchMessages(authToken));
      }, 60000);
    }
    return () => { intervalId && clearInterval(intervalId); };
  }, [authToken, messages]);

  // пропс для кнопки внутри меню
  const menuPopoverCloseHandler = () => {
    setIsMenuPopoverVisible(false);
  };
  // хэндлер видимости поповера меню
  const menuPopoverOpenHandler = (open) => {
    setIsMenuPopoverVisible(open);
  };

  return (
    <div className={styles.headerWrapper}>
      {user && user.test_days_left !== undefined && user.test_days_left !== null && user.test_days_left >= 0 &&
        <StatusBanner
          icon={
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="0.5" width="16" height="16" rx="8" fill="#5329FF" />
              <path d="M5 8.1073L7.53846 10.5L11 6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          }
          title={
            <p className={styles.header__statusBannerTitle}>
              <span>Ваш тестовый период активен.</span>
              {user.test_days_left > 0 && ` До окончания осталось: ${getDayDeclension(user.test_days_left.toString())}`}
              {user.test_days_left === 0 && ` До окончания осталось: менее 1 дня`}
            </p>
          }
        />
      }
      <header className={styles.header}>
        <div className={styles.header__titleBlock} style={{ boxShadow: hasShadow ? '0px 0px 20px 0px #00000014' : 'none' }}>
          {typeof title === 'string' ?
            <h1 className={styles.header__title}>
              {titlePrefix &&
                <span className={styles.header__titlePrefix}>{titlePrefix}{' / '}</span>
              }
              {title}
            </h1>
            :
            <>{title}</>
          }
          {videoReviewLink &&
            <VideoReview
              link={videoReviewLink}
            />
          }
          {howToLink &&
            <HowToLink
              text={howToLinkText || 'Как использовать?'}
              target='_blank'
              url={howToLink}
            />}
        </div>
        {children && children}
        {user &&
          <div className={styles.header__menu} style={{ filter: hasShadow ? 'drop-shadow(0px 0px 20px #00000014)' : 'none' }}>
            <Popover
              {...popoverOptions}
              className={styles.header__popover}
              content={<HeaderAlerts messages={messages} />}
            >
              <>
                <Icon type='alert' counter={messages?.length} />
              </>
            </Popover>

            <Popover
              {...popoverOptions}
              content={<HeaderMenu popoverCloseHandler={menuPopoverCloseHandler} logout={logout} />}
              open={isMenuPopoverVisible}
              onOpenChange={menuPopoverOpenHandler}
              className={styles.header__popover}
            >
              <>
                <Icon type='menu' />
              </>
            </Popover>
          </div>
        }
      </header>
    </div>
  );

};


export default Header;
