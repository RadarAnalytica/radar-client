import styles from './support.module.css';
import { Link } from 'react-router-dom';

const Support = ({ isMenuHidden }) => {

    return (
        <Link to='https://t.me/radar_analytica_support' target="_blank" className={isMenuHidden ? `${styles.support} ${styles.support_hidden}` : styles.support}>
            <div className={isMenuHidden ? `${styles.support__iconWrapper} ${styles.support__iconWrapper_hidden}` : styles.support__iconWrapper}>
                <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11 1.75C6.99594 1.75 3.75 4.99594 3.75 9V14C3.75 14.9665 2.9665 15.75 2 15.75C1.0335 15.75 0.25 14.9665 0.25 14V12C0.25 10.7412 1.09575 9.67998 2.25 9.35352V9C2.25 4.16751 6.16751 0.25 11 0.25C15.8325 0.25 19.75 4.16751 19.75 9V9.35352C20.9043 9.67998 21.75 10.7412 21.75 12V14C21.75 14.9665 20.9665 15.75 20 15.75C19.7232 15.75 19.4615 15.6858 19.2288 15.5714C18.2049 16.9328 15.8654 18.5406 11.81 18.7312C11.5534 19.1899 11.0629 19.5 10.5 19.5C9.67157 19.5 9 18.8284 9 18C9 17.1716 9.67157 16.5 10.5 16.5C11.0472 16.5 11.526 16.7931 11.788 17.2308C16.0504 17.019 17.8581 15.1118 18.2731 14.285C18.2579 14.1923 18.25 14.0971 18.25 14V9C18.25 4.99594 15.0041 1.75 11 1.75ZM19.75 10.9999V14C19.75 14.1381 19.8619 14.25 20 14.25C20.1381 14.25 20.25 14.1381 20.25 14V12C20.25 11.591 20.0536 11.228 19.75 10.9999ZM2.25 14V10.9999C1.94639 11.228 1.75 11.591 1.75 12V14C1.75 14.1381 1.86193 14.25 2 14.25C2.13807 14.25 2.25 14.1381 2.25 14Z" fill="#5329FF" />
                </svg>

            </div>
            <div className={styles.support__header} hidden={isMenuHidden}>
                <p className={styles.support__title}>Поддержка</p>
                <p className={styles.support__text}>Напишите нам</p>
            </div>
        </Link>
    );
};

export default Support;
