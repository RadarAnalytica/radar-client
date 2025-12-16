import { useContext, useRef } from 'react';
import styles from './sidebar.module.css';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import smallLogo from '../../../assets/small_logo.png';
import Dropdown from './dropdown/dropdown';
import Support from './supportBlock/support';
import NestedLink from './nestedLink/nestedLink';
import { menuConfig, adminConfig } from './shared/config/config';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { actions as utilsActions } from '../../../redux/utils/utilsSlice';
import AuthContext from '../../../service/AuthContext';


const Sidebar = () => {
    const dispatch = useAppDispatch();
    const { user } = useContext(AuthContext);
    const { isSidebarHidden } = useAppSelector(store => store.utils);
    const sidebarRef = useRef(null);

    const handleMouseLeave = (e) => {
        const relatedTarget = e.relatedTarget;
        if (!relatedTarget || !(relatedTarget instanceof Node) || (sidebarRef.current && !sidebarRef.current.contains(relatedTarget))) {
            dispatch(utilsActions.setIsSidebarHidden(true));
        }
    };

    return (
        <nav 
            ref={sidebarRef}
            className={isSidebarHidden ? `${styles.sidebar} ${styles.sidebar_hidden}` : styles.sidebar}
            onMouseEnter={() => dispatch(utilsActions.setIsSidebarHidden(false))}
            onMouseLeave={handleMouseLeave}
        >

            <div className={styles.sidebar__mainWrapper}>
                <div className={isSidebarHidden ? `${styles.sidebar__mainLinkWrapper} ${styles.sidebar__mainLinkWrapper_hidden}` : styles.sidebar__mainLinkWrapper}>
                    <Link to='/main' className={isSidebarHidden ? `${styles.sidebar__mainLink} ${styles.sidebar__mainLink_bigHidden}` : `${styles.sidebar__mainLink} ${styles.sidebar__mainLink_bigVisible}`}>
                        <img src={logo} alt='логотип' className={styles.sidebar__mainLinklogo} />
                    </Link>
                    <Link to='/main' className={isSidebarHidden ? `${styles.sidebar__mainLink} ${styles.sidebar__mainLink_smallVisible}` : `${styles.sidebar__mainLink} ${styles.sidebar__mainLink_smallHidden}`}>
                        <img src={smallLogo} alt='логотип' className={styles.sidebar__mainLinkSmallLogo} />
                    </Link>
                </div>

                <div className={isSidebarHidden ? `${styles.sidebar__scrollContainer} ${styles.sidebar__scrollContainer_hidden}` : styles.sidebar__scrollContainer}>
                    <ul className={styles.sidebar__navList}>
                        {menuConfig.map(i => {

                            const isMenuActive = i.children.some(_ => _.isActive);

                            return isMenuActive && (
                                <li className={styles.sidebar__navListItem} key={i.id}>
                                    <NestedLink title={i.label} icon={i.icon} links={i.children} isMenuHidden={isSidebarHidden} />
                                </li>);

                        })}
                        {user?.role === 'admin' &&
                            <li className={styles.sidebar__navListItem}>
                                <NestedLink title={adminConfig.label} icon={adminConfig.icon} links={adminConfig.children} isMenuHidden={isSidebarHidden} />
                            </li>
                        }
                        <li className={styles.sidebar__navListItem}>
                            <div className={styles.sidebar__dropdownWrapper}>
                                <Dropdown isMenuHidden={isSidebarHidden} />
                            </div>
                        </li>
                    </ul>

                    <div className={styles.sidebar__supportWrapper}>
                        <Support isMenuHidden={isSidebarHidden} />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
