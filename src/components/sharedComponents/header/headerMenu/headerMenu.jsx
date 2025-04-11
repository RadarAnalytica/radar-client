import styles from './headerMenu.module.css'
import { Link } from 'react-router-dom'
import CloseIcon from '../../../../assets/CloseIcon.svg';

const HeaderMenu = ({ popoverCloseHandler, logout }) => {
    return (
        <div
            className={styles.menu}
        >
            <div className={styles.menu__closeButtonWrapper}>
                <button className={styles.menu__closeButton} onClick={popoverCloseHandler}>
                    <img src={CloseIcon} alt='' />
                </button>
            </div>
            <ul className={styles.menu__linkList}>
                <li className={styles.menu__listItem}>
                    <Link className={styles.menu__link} to='/linked-shops'>Подключенные магазины</Link>
                </li>
                <li className={styles.menu__listItem}>
                    <Link className={styles.menu__link} to='/subscription'>Моя подписка</Link>
                </li>
                <li className={styles.menu__listItem}>
                    <Link className={styles.menu__link} to='/tariffs' target="_blank">Тарифы</Link>
                </li>
            </ul>
            <div className={styles.menu__logoutWrapper}>
                <button
                    className={styles.menu__logoutLink}
                    onClick={() => { logout(); popoverCloseHandler() }}
                >
                    Выход
                </button>
            </div>
        </div>
    )
}
export default HeaderMenu;