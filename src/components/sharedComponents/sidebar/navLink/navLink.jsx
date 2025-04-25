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

    let style = pathname !== url ? styles.navLink : icon ? `${styles.navLink} ${styles.navLink_active}` : `${styles.navLink} ${styles.navLink_activeNoIcon}`
    if (title === 'Финансовые отчеты' && pathname !== url) {
        const isInArr = finReportsUrls.some(_ => _ === pathname);
        style = isInArr ? `${styles.navLink} ${styles.navLink_active}` : styles.navLink
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