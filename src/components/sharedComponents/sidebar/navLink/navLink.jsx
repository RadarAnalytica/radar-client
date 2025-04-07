import { Link, useLocation } from "react-router-dom";
import aiGenIcon from '../../../../assets/aiGenerator.svg'
import styles from './navLink.module.css'

const NavLink = ({ url, title, icon, isMenuHidden }) => {
    const { pathname } = useLocation()
    const style = pathname !== url ? styles.navLink : icon ? `${styles.navLink} ${styles.navLink_active}` : `${styles.navLink} ${styles.navLink_activeNoIcon}`
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