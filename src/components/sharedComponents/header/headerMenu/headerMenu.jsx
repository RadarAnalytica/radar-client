import styles from './headerMenu.module.css';
import { Link } from 'react-router-dom';
import CloseIcon from '../../../../assets/CloseIcon.svg';

const menuConfig = [
    {
        title: 'Настройки',
        linkState: { tab: 'profile'},
        url: '/settings',
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5 10C13.5 11.933 11.933 13.5 10 13.5C8.067 13.5 6.5 11.933 6.5 10C6.5 8.067 8.067 6.5 10 6.5C11.933 6.5 13.5 8.067 13.5 10Z" fill="currentColor" />
                <path fillRule="evenodd" clipRule="evenodd" d="M7 2C7 0.895431 7.89543 0 9 0H11C12.1046 0 13 0.895431 13 2V2.75735L13.5355 2.22182C14.3166 1.44077 15.5829 1.44077 16.364 2.22182L17.7782 3.63603C18.5592 4.41708 18.5592 5.68341 17.7782 6.46446L17.2426 7H18C19.1046 7 20 7.89543 20 9V11C20 12.1046 19.1046 13 18 13H17.2427L17.7782 13.5355C18.5592 14.3166 18.5592 15.5829 17.7782 16.364L16.364 17.7782C15.5829 18.5592 14.3166 18.5592 13.5355 17.7782L13 17.2426V18C13 19.1046 12.1046 20 11 20H9C7.89543 20 7 19.1046 7 18V17.2426L6.46447 17.7782C5.68342 18.5592 4.41709 18.5592 3.63604 17.7782L2.22183 16.364C1.44078 15.5829 1.44078 14.3166 2.22183 13.5355L2.75735 13H2C0.895431 13 0 12.1046 0 11V9C0 7.89543 0.895431 7 2 7H2.75737L2.22183 6.46446C1.44078 5.68341 1.44078 4.41708 2.22183 3.63603L3.63604 2.22182C4.41709 1.44077 5.68342 1.44077 6.46447 2.22182L7 2.75735V2ZM15 10C15 12.7614 12.7614 15 10 15C7.23858 15 5 12.7614 5 10C5 7.23858 7.23858 5 10 5C12.7614 5 15 7.23858 15 10Z" fill="currentColor" />
            </svg>
        )
    },
    {
        title: 'Тарифы',
        linkState: { tab: 'tariffs'},
        url: '/settings',
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z" fill="currentColor" />
                <path fillRule="evenodd" clipRule="evenodd" d="M9.5981 0H4.3599C1.952 0 0 1.95283 0 4.36177V9.16637C0 10.2824 0.427607 11.356 1.19482 12.1662L7.32343 18.638C8.98108 20.3885 11.744 20.4613 13.4914 18.8005L18.643 13.9044C20.387 12.2469 20.4596 9.48942 18.8052 7.74236L12.7632 1.36198C11.9398 0.492505 10.7953 0 9.5981 0ZM7.5 11C9.433 11 11 9.433 11 7.5C11 5.567 9.433 4 7.5 4C5.567 4 4 5.567 4 7.5C4 9.433 5.567 11 7.5 11ZM11.5303 15.5303L15.5303 11.5303C15.8232 11.2374 15.8232 10.7626 15.5303 10.4697C15.2374 10.1768 14.7626 10.1768 14.4697 10.4697L10.4697 14.4697C10.1768 14.7626 10.1768 15.2374 10.4697 15.5303C10.7626 15.8232 11.2374 15.8232 11.5303 15.5303Z" fill="currentColor" />
            </svg>
        )
    },
    {
        title: 'Выйти',
        icon: (
            <svg width="20" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 0H4C1.79086 0 0 1.79086 0 4V14C0 16.2091 1.79086 18 4 18H6C7.33258 18 8.46224 17.1312 8.85337 15.929C9.04551 15.3385 8.85542 14.7108 8.57771 14.1554L6.89443 10.7889C6.33137 9.66274 6.33137 8.33726 6.89443 7.21115L8.57771 3.84458C8.85542 3.28916 9.04551 2.66146 8.85337 2.07095C8.46224 0.868846 7.33258 0 6 0Z" fill="currentColor" />
                <path d="M15.4697 6.46967C15.1768 6.76256 15.1768 7.23744 15.4697 7.53033L16.1893 8.25L9 8.25C8.58579 8.25 8.25 8.58579 8.25 9C8.25 9.41421 8.58579 9.75 9 9.75L16.1893 9.75L15.4697 10.4697C15.1768 10.7626 15.1768 11.2374 15.4697 11.5303C15.7626 11.8232 16.2374 11.8232 16.5303 11.5303L18.5303 9.53033C18.6022 9.45842 18.6565 9.37555 18.6931 9.28709C18.7298 9.19866 18.75 9.10169 18.75 9C18.75 8.80806 18.6768 8.61612 18.5303 8.46967L16.5303 6.46967C16.2374 6.17678 15.7626 6.17678 15.4697 6.46967Z" fill="currentColor" />
            </svg>

        )
    },
]

const HeaderMenu = ({ popoverCloseHandler, logout, user }) => {
    return (
        <div
            className={styles.menu}
        >
            {/* <div className={styles.menu__closeButtonWrapper}>
                <button className={styles.menu__closeButton} onClick={popoverCloseHandler}>
                    <img src={CloseIcon} alt='' />
                </button>
            </div> */}
            <div className={styles.menu__subscription}>
                <div className={styles.menu__subscriptionTitleWrapper}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z" fill="#5329FF" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.5981 0H4.3599C1.952 0 0 1.95283 0 4.36177V9.16637C0 10.2824 0.427607 11.356 1.19482 12.1662L7.32343 18.638C8.98108 20.3885 11.744 20.4613 13.4914 18.8005L18.643 13.9044C20.387 12.2469 20.4596 9.48942 18.8052 7.74236L12.7632 1.36198C11.9398 0.492505 10.7953 0 9.5981 0ZM7.5 11C9.433 11 11 9.433 11 7.5C11 5.567 9.433 4 7.5 4C5.567 4 4 5.567 4 7.5C4 9.433 5.567 11 7.5 11ZM11.5303 15.5303L15.5303 11.5303C15.8232 11.2374 15.8232 10.7626 15.5303 10.4697C15.2374 10.1768 14.7626 10.1768 14.4697 10.4697L10.4697 14.4697C10.1768 14.7626 10.1768 15.2374 10.4697 15.5303C10.7626 15.8232 11.2374 15.8232 11.5303 15.5303Z" fill="#5329FF" />
                    </svg>
                    {user?.subscription_status?.toString() ?? 'Нет подписки'}
                </div>
                <span className={styles.menu__subscriptionLeft}>
                    Осталось 14 дней
                </span>
            </div>

            <div className={styles.menu__userInfo}>
                <span className={styles.menu__userName}>{user?.name ?? 'Железный Человек'}</span>
                <span className={styles.menu__userEmail}>{user?.email ?? 'no email'}</span>
            </div>

            <ul className={styles.menu__linkList}>
                {menuConfig.map((item, idx) => {

                    if (item?.title === 'Выйти') {
                        return (
                            <li className={styles.menu__listItem} key={idx}>
                                <button
                                    className={styles.menu__link}
                                    onClick={() => { logout(); popoverCloseHandler(); }}
                                >
                                    {item?.icon}
                                    {item?.title}
                                </button>
                            </li>
                        )
                    }

                    return (
                        <li className={styles.menu__listItem} key={idx}>
                            <Link 
                                className={styles.menu__link} 
                                to={item?.url}
                                state={item?.linkState}
                                onClick={popoverCloseHandler}
                            >
                                {item?.icon}
                                {item?.title}
                            </Link>
                        </li>
                    )
                })}
            </ul>
            {/* <div className={styles.menu__logoutWrapper}>
                <button
                    className={styles.menu__logoutLink}
                    onClick={() => { logout(); popoverCloseHandler(); }}
                >
                    Выход
                </button>
            </div> */}
        </div>
    );
};
export default HeaderMenu;
