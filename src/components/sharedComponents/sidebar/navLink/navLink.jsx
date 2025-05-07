import { Link, useLocation } from "react-router-dom";
import aiGenIcon from '../../../../assets/aiGenerator.svg'
import styles from './navLink.module.css'

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
]

const NavLink = ({ url, title, icon, isMenuHidden }) => {
    const { pathname } = useLocation()

    let style = styles.navLink
    console.log(url)
    if (title !== 'Оцифровка еженедельных отчетов' && pathname !== '/abc-data-reports') {
        style = pathname.includes(url) ? `${styles.navLink} ${styles.navLink_activeNoIcon}` : style
    }
    if (title === 'Оцифровка еженедельных отчетов') {
        if (pathname === url) {
            style = `${styles.navLink} ${styles.navLink_activeNoIcon}`
        }
        const isInArr = finReportsUrls.some(_ => _ === pathname) || pathname.includes(url);
        if (isInArr) {
            style = `${styles.navLink} ${styles.navLink_activeNoIcon}`
        }
        if (!isInArr)
            style = styles.navLink
    }

    return (
        <Link to={url} className={style}>
            {isMenuHidden &&
                <div className={styles.navLink__iconWrapper}>
                    {icon && icon}
                </div>
            }
            {!isMenuHidden &&
                <>
                    {icon && icon}
                    {title}
                    {url.includes('ai-generator') && <img src={aiGenIcon} />}
                </>
            }
        </Link>
    )
}

export default NavLink;