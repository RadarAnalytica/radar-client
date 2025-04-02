import { Link, useLocation } from "react-router-dom";
import styles from './navLink.module.css'

const NavLink = ({ url, title, icon }) => {
    const { pathname } = useLocation()
    const style = pathname !== url ? styles.navLink : icon ? `${styles.navLink} ${styles.navLink_active}` : `${styles.navLink} ${styles.navLink_activeNoIcon}`
    return (
        <Link to={url} className={style}>
            {icon && icon}
            {title}
        </Link>
    )
}

export default NavLink;