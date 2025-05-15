import { useState, useEffect } from 'react'
import styles from './dropdown.module.css'
import { Link } from 'react-router-dom'

const Dropdown = ({ isMenuHidden }) => {

    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        let timeout;
        if (isMenuHidden) {
            setIsOpen(false)
        } else {
            timeout = setTimeout(() => setIsOpen(true), 100)
        }
        return () => {timeout && clearTimeout(timeout)}
    }, [isMenuHidden])

    return (
        <div className={isMenuHidden ? `${styles.dropdown} ${styles.dropdown_hidden}` : styles.dropdown}>
            {isMenuHidden &&
                <div
                    className={isOpen ? `${styles.dropdown__iconWrapper} ${styles.dropdown__iconWrapper_active}` : styles.dropdown__iconWrapper}
                >
                     <svg width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 13L8 1V9H13L6 21V13H1Z" stroke="#F0AD00" strokeWidth="2" strokeLinejoin="round" />
                        </svg>
                </div>
            }
            {!isMenuHidden &&
                <div className={isOpen ? `${styles.dropdown__header} ${styles.dropdown__header_active}` : styles.dropdown__header} onClick={() => { setIsOpen(!isOpen) }}>

                    <div className={styles.dropdown__titleWrapper}>
                    <svg width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 13L8 1V9H13L6 21V13H1Z" stroke="#F0AD00" strokeWidth="2" strokeLinejoin="round" />
                        </svg>
                        Дополнительные инструменты
                    </div>
                    <svg width="10" height="10" viewBox="0 0 15 10" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={isOpen ? `${styles.dropdown__marker} ${styles.dropdown__marker_open}` : styles.dropdown__marker}>
                        <path fillRule="evenodd" clipRule="evenodd" d="M13.879 8.9142C13.4885 9.30472 12.8553 9.30472 12.4648 8.9142L7.17188 3.62131L1.87898 8.9142C1.48846 9.30472 0.855292 9.30472 0.464768 8.9142C0.0742435 8.52367 0.0742435 7.89051 0.464768 7.49999L7.17188 0.792878L13.879 7.49999C14.2695 7.89051 14.2695 8.52367 13.879 8.9142Z" />
                    </svg>
                </div>}

            <div className={isOpen ? `${styles.dropdown__body} ${styles.dropdown__body_open}` : styles.dropdown__body}>
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