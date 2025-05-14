import { useState, useContext } from 'react';
import styles from './mobileHeader.module.css'
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png'
import { Modal } from 'antd';
import { URL } from '../../../service/config';
import AuthContext from '../../../service/AuthContext';
import { useNavigate } from 'react-router-dom';

const MobileHeader = ({ title }) => {
    const { user } = useContext(AuthContext)
    const [isMenuVisible, setIsMenuVisible] = useState(false)
    const navigate = useNavigate()
    return (
        <header className={styles.header}>
            <div className={`${styles.header__block} ${styles.header__mainBlock}`}>
                <Link to='/main' className={styles.header__mainLink}>
                    <img src={logo} alt='логотип' width={100} height={37} />
                </Link>

                <button className={styles.header__menuButton} onClick={() => { setIsMenuVisible(true) }}>
                    <svg width="38" height="26" viewBox="0 0 38 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 1.25H38" stroke="#552CFF" strokeWidth="1.5" />
                        <path d="M0 13.25H38" stroke="#552CFF" strokeWidth="1.5" />
                        <path d="M0 25.25H38" stroke="#552CFF" strokeWidth="1.5" />
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
                    {user &&
                        <button
                            //to={`${URL}/signin`}
                            onClick={() => window.location.href = `${URL}/signin`}
                            className={styles.header__signin}
                            target='_blank'
                        >
                            Вход
                        </button>}
                    {!user &&
                        <>
                            <button
                                //to={`${URL}/signin`}
                                onClick={() => window.location.href = `${URL}/signin`}
                                className={styles.header__signin}
                                target='_blank'
                            >
                                Вход
                            </button>
                            <button
                                //to={`${URL}/signup`}
                                onClick={() => window.location.href = `${URL}/signup`}
                                target='_blank'
                                className={styles.header__signup}
                            >
                                Регистрация
                            </button>
                        </>
                    }
                </div>
            </Modal>
        </header>
    )
}

export default MobileHeader;