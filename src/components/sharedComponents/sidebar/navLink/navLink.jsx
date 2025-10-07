import { Link, useLocation } from "react-router-dom";
import aiGenIcon from '../../../../assets/aiGenerator.svg';
import styles from './navLink.module.css';
import { featuresIcons } from "../shared/icons/icons";

const finReportsUrls = [
    '/weeklyreport-dashboard',
    '/weeklyreport-pl',
    '/weeklyreport-month',
    '/weeklyreport-goods',
    '/abc-data-reports',
    '/weeklyreport-penalties',
    '/schedule',
    '/prime-cost',
    '/buy-back',
    '/external-expenses'
];

const NavLink = ({ url, title, icon, isMenuHidden, item }) => {
    const { pathname } = useLocation();

    let style = styles.navLink;
    if (title !== 'Оцифровка еженедельных отчетов' && pathname !== '/abc-data-reports') {
        style = pathname.includes(url) ? `${styles.navLink} ${styles.navLink_activeNoIcon}` : style;
    }
    if (title === 'Оцифровка еженедельных отчетов') {
        if (pathname === url) {
            style = `${styles.navLink} ${styles.navLink_activeNoIcon}`;
        }
        const isInArr = finReportsUrls.some(_ => _ === pathname) || pathname.includes(url);
        if (isInArr) {
            style = `${styles.navLink} ${styles.navLink_activeNoIcon}`;
        }
        if (!isInArr)
            style = styles.navLink;
    }

    return (
        <>
            {item.hasTopBorder &&
                <div className={styles.navLink__lineWrapper}>
                </div>
            }
            <Link to={url} className={style}>
                {isMenuHidden &&
                    <div className={styles.navLink__iconWrapper}>
                        {icon && icon}
                    </div>
                }
                {!isMenuHidden &&
                    <>
                        {item.features?.map(feature => featuresIcons[feature])}
                        {title}
                        {item.isNew && !item.features &&
                            <svg width="39" height="26" viewBox="0 0 39 26" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.navLink__newIcon}>
                                <rect x="1.20312" y="0.542969" width="37.1694" height="23" rx="6" transform="rotate(3 1.20312 0.542969)" fill="#5329FF" />
                                <path d="M5.79887 17.0159L6.24164 8.56753L7.40404 8.62845L11.9731 15.2246L11.6615 15.2083L11.9937 8.86899L13.4318 8.94435L12.989 17.3928L11.8266 17.3318L7.26954 10.7363L7.56913 10.752L7.2369 17.0913L5.79887 17.0159ZM17.6429 17.7568C16.6283 17.7037 15.8481 17.3824 15.3022 16.793C14.7563 16.2036 14.5088 15.4216 14.5599 14.4469C14.593 13.8158 14.7457 13.271 15.0181 12.8127C15.2904 12.3543 15.6532 12.0048 16.1064 11.7642C16.5677 11.524 17.0938 11.4194 17.685 11.4504C18.2682 11.4809 18.7491 11.6303 19.1276 11.8985C19.506 12.1667 19.7834 12.5297 19.9597 12.9875C20.144 13.4458 20.2204 13.9745 20.189 14.5737L20.1683 14.9692L15.7583 14.7381L15.7998 13.9471L19.1432 14.1224L18.9307 14.2795C18.96 13.7202 18.8626 13.2865 18.6384 12.9784C18.4222 12.6706 18.0904 12.505 17.643 12.4816C17.1477 12.4556 16.755 12.6113 16.465 12.9486C16.1829 13.2863 16.0253 13.7707 15.9922 14.4018L15.9841 14.5576C15.9498 15.2127 16.0838 15.7124 16.3862 16.0567C16.697 16.3934 17.148 16.5773 17.7392 16.6083C18.0827 16.6263 18.4046 16.5991 18.7048 16.5267C19.0134 16.4468 19.3089 16.31 19.5914 16.1166L19.9821 17.1464C19.6823 17.363 19.3294 17.5248 18.9232 17.6317C18.5171 17.7385 18.0903 17.7803 17.6429 17.7568ZM22.8745 17.9108L20.8309 11.7354L22.3768 11.8164L23.8316 16.6152L23.5201 16.5988L25.4925 11.9797L26.559 12.0356L28.0259 16.835L27.7502 16.8205L29.6867 12.1995L31.1487 12.2762L28.4708 18.2041L27.1526 18.135L25.5956 13.2228L26.2307 13.2561L24.2047 17.9805L22.8745 17.9108ZM32.123 15.8841L31.9671 9.91575L33.8126 10.0125L33.0337 15.9318L32.123 15.8841ZM31.6083 18.3686L31.6956 16.7028L33.3733 16.7908L33.286 18.4565L31.6083 18.3686Z" fill="white" />
                            </svg>

                        }
                        {url.includes('ai-generator') && <img src={aiGenIcon} />}
                    </>
                }
            </Link>
        </>
    );
};

export default NavLink;
