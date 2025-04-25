import styles from './sidebar.module.css'
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import smallLogo from '../../../assets/small_logo.png';
import Dropdown from './dropdown/dropdown';
import Support from './supportBlock/support';
import NestedLink from './nestedLink/nestedLink';
import { menuConfig } from './shared/config/config';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { actions as utilsActions } from '../../../redux/utils/utilsSlice'




const Sidebar = () => {
    const dispatch = useAppDispatch()
    const { isSidebarHidden } = useAppSelector(store => store.utils)

    return (
        <nav className={isSidebarHidden ? `${styles.sidebar} ${styles.sidebar_hidden}` : styles.sidebar}
            onMouseEnter={() => dispatch(utilsActions.setIsSidebarHidden(false))}
            onMouseLeave={() => dispatch(utilsActions.setIsSidebarHidden(true))}
        >

            <div className={styles.sidebar__mainWrapper}>
                <div className={isSidebarHidden ? `${styles.sidebar__mainLinkWrapper} ${styles.sidebar__mainLinkWrapper_hidden}` : styles.sidebar__mainLinkWrapper}>
                    <Link to='/main' className={isSidebarHidden ? `${styles.sidebar__mainLink} ${styles.sidebar__mainLink_bigHidden}` : `${styles.sidebar__mainLink} ${styles.sidebar__mainLink_bigVisible}`}>
                        <img src={logo} alt='логотип' className={styles.sidebar__mainLinklogo} />
                    </Link>
                    <Link to='/main' className={isSidebarHidden ? `${styles.sidebar__mainLink} ${styles.sidebar__mainLink_smallVisible}` : `${styles.sidebar__mainLink} ${styles.sidebar__mainLink_smallHidden}`}>
                        <img src={smallLogo} alt='логотип' className={styles.sidebar__mainLinkSmallLogo}/>
                    </Link>
                </div>

                <div className={isSidebarHidden ? `${styles.sidebar__scrollContainer} ${styles.sidebar__scrollContainer_hidden}` : styles.sidebar__scrollContainer}>
                    <ul className={styles.sidebar__navList}>
                        {menuConfig.map(i => {

                            const isMenuActive = i.children.some(_ => _.isActive);

                            return isMenuActive && (
                                <li className={styles.sidebar__navListItem} key={i.id}>
                                    <NestedLink title={i.label} icon={i.icon} links={i.children} isMenuHidden={isSidebarHidden} />
                                </li>)

                        })}
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
    )
}

export default Sidebar;