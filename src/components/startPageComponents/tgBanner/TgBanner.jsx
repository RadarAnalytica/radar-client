import React from "react";
import { Link } from "react-router-dom";
import tgLogo from '../../../assets/tbBanner_tglogo.png'
import styles from './TgBanner.module.css'



const TgBanner = () => {

    return (
        <div className={styles.banner}>
            <div className={styles.banner__titleBlock}>
                <p className={styles.banner__title}>Подписывайтесь на наш телеграм-канал</p>
                <p className={styles.banner__subTitle}>Мы не хотим потерять вас ❤️</p>
            </div>

            <Link
                to='/' 
                className={styles.banner__tgLink}
            >
                <img
                    src={tgLogo}
                    width={54}
                    height={54}
                    decoding="async"
                    fetchpriority="low"
                    loading="lazy"
                />
                @WB-Radar
            </Link>
        </div>
    )
}

export default TgBanner;