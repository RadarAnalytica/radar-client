import styles from './Footer.module.css'
import { Link } from 'react-router-dom'


export const ExternalFooter: React.FC = () => {

    return (
        <footer className={styles.footer} id='footer'>
            <div className={styles.footer__mainWrapper}>
                <aside
                    className={styles.footer__bottomBlock}
                >
                    &copy; Radar-Analytica 2025. Все права защищены

                    <nav>
                        <ul className={styles.footer__bottomList}>
                            <li>
                                <Link
                                    target='_blank'
                                    to='/user-agreement'
                                >
                                    Пользовательское соглашение
                                </Link>
                            </li>
                            <li>
                                <Link
                                    target='_blank'
                                    to='/politics'
                                >
                                    Политика конфиденциальности
                                </Link>
                            </li>
                            <li>
                                <Link
                                    target='_blank'
                                    to='/offer'
                                >
                                    Публичная оферта
                                </Link>
                            </li>
                            <li>
                                <Link
                                    target='_blank'
                                    to='/how-to-connect-api'
                                >
                                    Подключение к API сервиса
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </aside>
            </div>
        </footer>
    )
}