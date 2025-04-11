import { useState, useEffect } from 'react'
import styles from './dropdown.module.css'
import { Link } from 'react-router-dom'

const Dropdown = ({ isMenuHidden }) => {

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (isMenuHidden) {
            setOpen(false)
        }
    }, [isMenuHidden])

    return (
        <div className={styles.dropdown} onClick={() => { setOpen(!open) }}>
            {isMenuHidden &&
                <div className={styles.dropdown__smallMenu}>
                    <svg width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 13L8 1V9H13L6 21V13H1Z" stroke="#F0AD00" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                </div>
            }
            {!isMenuHidden &&
                <div className={styles.dropdown__header}>
                    <div className={styles.dropdown__iconWrapper}>
                        <svg width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 13L8 1V9H13L6 21V13H1Z" stroke="#F0AD00" strokeWidth="2" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span>
                        Дополнительные инструменты
                    </span>
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg" className={open ? `${styles.dropdown__marker} ${styles.dropdown__marker_open}` : styles.dropdown__marker}>
                        <path fillRule="evenodd" clipRule="evenodd" d="M13.7071 8.91421C13.3166 9.30474 12.6834 9.30474 12.2929 8.91421L7 3.62132L1.70711 8.91421C1.31658 9.30474 0.683417 9.30474 0.292893 8.91421C-0.0976315 8.52369 -0.0976315 7.89052 0.292893 7.5L7 0.792893L13.7071 7.5C14.0976 7.89052 14.0976 8.52369 13.7071 8.91421Z" fill="#F0AD00" />
                    </svg>
                </div>}

            <div className={open ? `${styles.dropdown__body} ${styles.dropdown__body_open}` : styles.dropdown__body}>
                <Link
                    to='https://chromewebstore.google.com/detail/radar-%E2%80%93-%D0%B1%D0%B5%D1%81%D0%BF%D0%BB%D0%B0%D1%82%D0%BD%D0%B0%D1%8F-%D0%B0%D0%BD%D0%B0%D0%BB%D0%B8%D1%82/haelmohfdnapjehnhgncjdnjmchdahhb'
                    target='_blank'
                    className={styles.dropdown__link}
                >
                    Radar - плагин для браузера
                </Link>
            </div>

        </div>
    )
}

export default Dropdown