import styles from './calcBanners.module.css';
import { Link } from 'react-router-dom';
import banner1 from '../../../../public/sp_c_banner_01.svg';
import banner2 from '../../../../public/sp_c_banner_02.svg';
import banner3 from '../../../../public/sp_c_banner_03.svg';
import banner4 from '../../../../public/sp_c_banner_04.svg';
import banner5 from '../../../../public/sp_c_banner_05.svg';
import banner6 from '../../../../public/sp_c_banner_06.svg';
const CalcBanners = () => {

    return (
        <div className={styles.banners}>
            <div className={`${styles.banner} ${styles.banner_bgBlue}`}>
                <div className={`${styles.banner__header} ${styles.banner__header_bgBlue}`}>
                    <div className={styles.banner__titleWrapper}>
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle opacity="0.2" cx="12.8" cy="12.8" r="12.8" fill="white" />
                            <rect opacity="0.4" x="4.7998" y="4.7998" width="16" height="16" rx="8" fill="white" />
                            <rect x="5.21466" y="5.21466" width="15.1703" height="15.1703" rx="7.58514" stroke="white" strokeWidth="0.82971" />
                            <circle cx="12.7998" cy="12.5027" r="1.86685" fill="white" stroke="white" strokeWidth="1.24456" />
                        </svg>

                        <p className={styles.banner__title}>Попробуйте наш новый калькулятор</p>
                    </div>
                    <Link
                        to='/calculate'
                        className={styles.banner__mainLink}
                    >
                        Попробовать
                    </Link>
                </div>

                <div className={`${styles.banner__body} ${styles.banner__body_left}`}>
                    <div className={styles.banner__imgWrapper}>
                        <img
                            src={banner1}
                            alt=''
                            className={styles.banner__image}
                            width={300}
                            height={100}
                        />
                    </div>
                    <div className={styles.banner__imgWrapper}>
                        <img
                            src={banner2}
                            alt=''
                            className={styles.banner__image}
                        />
                    </div>
                    <div className={styles.banner__imgWrapper}>
                        <img
                            src={banner3}
                            alt=''
                            className={styles.banner__image}
                        />
                    </div>
                </div>
            </div>


            <div className={`${styles.banner} ${styles.banner_bgGold}`}>
                <div className={`${styles.banner__header} ${styles.banner__header_bgGold}`}>
                    <div className={styles.banner__titleWrapper}>
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle opacity="0.2" cx="12.8" cy="12.8" r="12.8" fill="white" />
                            <rect opacity="0.4" x="4.7998" y="4.7998" width="16" height="16" rx="8" fill="white" />
                            <rect x="5.21466" y="5.21466" width="15.1703" height="15.1703" rx="7.58514" stroke="white" strokeWidth="0.82971" />
                            <circle cx="12.7998" cy="12.5027" r="1.86685" fill="white" stroke="white" strokeWidth="1.24456" />
                        </svg>

                        <p className={styles.banner__title}>Плагин стал еще удобнее</p>
                    </div>
                    <Link
                        to='https://chromewebstore.google.com/detail/radar-%E2%80%93-%D0%B1%D0%B5%D1%81%D0%BF%D0%BB%D0%B0%D1%82%D0%BD%D0%B0%D1%8F-%D0%B0%D0%BD%D0%B0%D0%BB%D0%B8%D1%82/haelmohfdnapjehnhgncjdnjmchdahhb'
                        className={styles.banner__mainLink}
                    >
                        Попробовать
                    </Link>
                </div>

                <div className={`${styles.banner__body} ${styles.banner__body_right}`}>
                    <div className={styles.banner__imgWrapper}>
                        <img
                            src={banner4}
                            alt=''
                            className={styles.banner__image}
                        />
                    </div>
                    <div className={styles.banner__imgWrapper}>
                        <img
                            src={banner5}
                            alt=''
                            className={styles.banner__image}
                        />
                    </div>
                    <div className={styles.banner__imgWrapper}>
                        <img
                            src={banner6}
                            alt=''
                            className={styles.banner__image}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalcBanners;
