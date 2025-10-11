import styles from './support.module.css';
import { Link } from 'react-router-dom';

const Support = ({ isMenuHidden }) => {

    return (
        <Link to='https://t.me/radar_analytica_support' target="_blank" className={isMenuHidden ? `${styles.support} ${styles.support_hidden}` : styles.support}>
            <div className={isMenuHidden ? `${styles.support__iconWrapper} ${styles.support__iconWrapper_hidden}` : styles.support__iconWrapper}>
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.50065 3.48438C6.58102 3.48438 4.21419 5.8512 4.21419 8.77083V12.4167C4.21419 13.1214 3.64289 13.6927 2.93815 13.6927C2.23341 13.6927 1.66211 13.1214 1.66211 12.4167V10.9583C1.66211 10.0405 2.2788 9.26665 3.12044 9.02861V8.77083C3.12044 5.24714 5.97696 2.39062 9.50065 2.39062C13.0243 2.39062 15.8809 5.24714 15.8809 8.77083V9.02861C16.7225 9.26665 17.3392 10.0405 17.3392 10.9583V12.4167C17.3392 13.1214 16.7679 13.6927 16.0632 13.6927C15.8613 13.6927 15.6705 13.6459 15.5008 13.5624C14.7542 14.5552 13.0483 15.7275 10.0913 15.8665C9.90418 16.201 9.54653 16.4271 9.13607 16.4271C8.53201 16.4271 8.04232 15.9374 8.04232 15.3333C8.04232 14.7293 8.53201 14.2396 9.13607 14.2396C9.5351 14.2396 9.88422 14.4533 10.0752 14.7724C13.1832 14.618 14.5014 13.2274 14.804 12.6245C14.7929 12.5569 14.7871 12.4874 14.7871 12.4167V8.77083C14.7871 5.8512 12.4203 3.48438 9.50065 3.48438ZM15.8809 10.2291V12.4167C15.8809 12.5173 15.9625 12.599 16.0632 12.599C16.1638 12.599 16.2454 12.5173 16.2454 12.4167V10.9583C16.2454 10.6601 16.1022 10.3954 15.8809 10.2291ZM3.12044 12.4167V10.2291C2.89906 10.3954 2.75586 10.6601 2.75586 10.9583V12.4167C2.75586 12.5173 2.83747 12.599 2.93815 12.599C3.03883 12.599 3.12044 12.5173 3.12044 12.4167Z" fill="#5329FF" />
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
