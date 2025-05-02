import { useState } from 'react';
import styles from './sidebar.module.css'
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import smallLogo from '../../../assets/small_logo.png';
import Dropdown from './dropdown/dropdown';
import Support from './supportBlock/support';
import NestedLink from './nestedLink/nestedLink';
import { newMenuConfig as menuConfig } from './shared/config/config';



const Sidebar = () => {

    const [isMenuHidden, setIsMenuHidden] = useState(true)

    return (
        <nav className={isMenuHidden ? `${styles.sidebar} ${styles.sidebar_hidden}` : styles.sidebar}
            onClick={() => setIsMenuHidden(false)}
            onMouseLeave={() => setIsMenuHidden(true)}
        >

            <div className={styles.sidebar__mainWrapper}>
                <div className={`${styles.sidebar__mainLinkWrapper} ${styles.sidebar__mainLinkWrapper_hidden}`} hidden={!isMenuHidden}>
                    <Link to='/main'>
                        <img src={smallLogo} alt='логотип' className={`${styles.sidebar__mainLinklogo} ${styles.sidebar__mainLinklogo_hidden}`} />
                    </Link>
                </div>
                <div className={styles.sidebar__mainLinkWrapper} hidden={isMenuHidden}>
                    <Link to='/main'>
                        <img src={logo} alt='логотип' width={124} height={46} className={styles.sidebar__mainLinklogo} />
                    </Link>
                </div>

                <div className={isMenuHidden ? `${styles.sidebar__scrollContainer} ${styles.sidebar__scrollContainer_hidden}` : styles.sidebar__scrollContainer}>
                    <ul className={styles.sidebar__navList}>
                        {menuConfig.map(i => {

                            const isMenuActive = i.children.some(_ => _.isActive);

                            return isMenuActive && (
                                <li className={styles.sidebar__navListItem} key={i.id}>
                                    <NestedLink title={i.label} icon={i.icon} links={i.children} isMenuHidden={isMenuHidden} />
                                </li>)

                        })}
                        {/* {menuConfig.map(i => {

                        if (!i.children) {
                            return (
                                <li className={styles.sidebar__navListItem} key={i.id}>
                                    <NavLink url={i.url} title={i.label} icon={i.icon} isMenuHidden={isMenuHidden} />
                                </li>)
                        } else {
                            return (
                                <li className={styles.sidebar__navListItem} key={i.id}>
                                    <NestedLink title={i.label} icon={i.icon} links={i.children} isMenuHidden={isMenuHidden} />
                                </li>)
                        }
                    })} */}
                        <li className={styles.sidebar__navListItem}>
                            <div className={styles.sidebar__dropdownWrapper}>
                                <Dropdown isMenuHidden={isMenuHidden} />
                            </div>
                        </li>
                    </ul>

                    <div className={styles.sidebar__supportWrapper}>
                        <Support isMenuHidden={isMenuHidden} />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Sidebar;