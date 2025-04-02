import { useState } from 'react';
import styles from './sidebar.module.css'
import { Link } from 'react-router-dom';
import NavLink from './navLink/navLink';
import logo from '../../../assets/logo.png';
import Dropdown from './dropdown/dropdown';
import Support from './supportBlock/support';
import NestedLink from './nestedLink/nestedLink';
import { menuConfig } from './shared/config/config';



const Sidebar = () => {

    const [isMenuHidden, seIsMenuHidden] = useState(false)

    return (
        <nav className={isMenuHidden ? `${styles.sidebar} ${styles.sidebar_hidden}` : styles.sidebar}>
            <div className={styles.sidebar__mainWrapper}>
                <div className={isMenuHidden ? `${styles.sidebar__mainLinkWrapper} ${styles.sidebar__mainLinkWrapper_hidden}` : styles.sidebar__mainLinkWrapper}>
                    <Link to='/main'>
                        <img src={logo} alt='логотип' className={isMenuHidden ? `${styles.sidebar__mainLinklogo} ${styles.sidebar__mainLinklogo_hidden}` : styles.sidebar__mainLinklogo} />
                    </Link>
                    <button className={isMenuHidden ? `${styles.sidebar__hideButton} ${styles.sidebar__hideButton_hidden}` : styles.sidebar__hideButton} onClick={() => seIsMenuHidden(!isMenuHidden)}>&larr;</button>
                </div>
                <ul className={styles.sidebar__navList} hidden={isMenuHidden}>
                    {menuConfig.map(i => {
                        if (!i.children) {
                            return (
                                <li className={styles.sidebar__navListItem} key={i.id}>
                                    <NavLink url={i.url} title={i.label} icon={i.icon} />
                                </li>)
                        } else {
                            return (
                                <li className={styles.sidebar__navListItem} key={i.id}>
                                    <NestedLink title={i.label} icon={i.icon} links={i.children} />
                                </li>)
                        }
                    })}
                </ul>
                <div hidden={isMenuHidden}>
                    <Dropdown />
                </div>
            </div>
            <Support isMenuHidden={isMenuHidden} />
        </nav>
    )
}

export default Sidebar;