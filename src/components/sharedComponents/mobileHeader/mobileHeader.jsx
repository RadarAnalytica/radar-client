import { useState } from 'react';
import styles from './mobileHeader.module.css'
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png'
import { Modal } from 'antd';
import { URL } from '../../../service/config';

const MobileHeader = ({ title }) => {

    const [isMenuVisible, setIsMenuVisible] = useState(false)

    return (
        <header className={styles.header}>
            <div className={`${styles.header__block} ${styles.header__mainBlock}`}>
                <Link to='/main' className={styles.header__mainLink}>
                    <img src={logo} alt='логотип' width={100} height={37} />
                </Link>

                <button className={styles.header__menuButton} onClick={() => { setIsMenuVisible(true) }}>
                    <svg width="38" height="26" viewBox="0 0 38 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 1.25H38" stroke="#552CFF" stroke-width="1.5" />
                        <path d="M0 13.25H38" stroke="#552CFF" stroke-width="1.5" />
                        <path d="M0 25.25H38" stroke="#552CFF" stroke-width="1.5" />
                    </svg>
                </button>
            </div>

            <div className={`${styles.header__block} ${styles.header__titleBlock}`}>
                {title}
            </div>

            <Modal
                open={isMenuVisible}
                footer={null}
                onClose={() => setIsMenuVisible(false)}
                onOk={() => setIsMenuVisible(false)}
                onCancel={() => setIsMenuVisible(false)}
            >
                <div className={styles.mobileMenu}>
                    <Link
                        to={`${URL}/signin`}
                        className={styles.header__signin}
                    >
                        Вход
                    </Link>
                    <Link
                        to={`${URL}/signup`}
                        className={styles.header__signup}
                    >
                        Регистрация
                    </Link>
                </div>
            </Modal>
        </header>
    )
}

export default MobileHeader;