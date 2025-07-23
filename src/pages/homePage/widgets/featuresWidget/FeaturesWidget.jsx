import styles from './FeaturesWidget.module.css'
import { Link } from 'react-router-dom'
import card1 from './assets/card1.png'
import card2 from './assets/card2.png'
import card3 from './assets/card3.png'
import card4 from './assets/card4.png'

export const FeaturesWidget = () => {

    return (
        <div className={styles.widget}>
            <div className={styles.card}>
                <div className={styles.card__infoBlock}>
                    <p className={styles.card__title}>
                        Подберите прибыльный товар всего за 5 минут
                    </p>
                    <Link
                        to='/monitoring'
                        className={styles.link}
                    >
                        Попробовать
                    </Link>
                </div>

                <div className={styles.card__cover}>
                    <img src={card1} alt='' width={356} height={200} />
                </div>
            </div>


            <div className={styles.card}>
                <div className={styles.card__infoBlock}>
                    <p className={styles.card__title}>
                        Приносит ли ваш магазин прибыль?
                    </p>
                    <p className={styles.card__text}>
                        Узнайте точно — оцифруйте все показатели в пару кликов
                    </p>
                    <Link
                        to='/dashboard'
                        className={styles.link}
                    >
                        Попробовать
                    </Link>
                </div>

                <div className={styles.card__cover}>
                    <img src={card2} alt='' width={240} height={200} />
                </div>
            </div>



            <div className={styles.card}>
                <div className={styles.card__infoBlock}>
                    <p className={styles.card__title}>
                        Обновлённый плагин
                    </p>
                    <p className={styles.card__text}>
                        Вся аналитика конкурентов — прямо на странице WB
                    </p>
                    <Link
                        to='https://chromewebstore.google.com/detail/radar-%E2%80%93-%D0%B1%D0%B5%D1%81%D0%BF%D0%BB%D0%B0%D1%82%D0%BD%D0%B0%D1%8F-%D0%B0%D0%BD%D0%B0%D0%BB%D0%B8%D1%82/haelmohfdnapjehnhgncjdnjmchdahhb'
                        target='_blank'
                        className={styles.link}
                    >
                        Скачать
                    </Link>
                </div>

                <div className={styles.card__cover}>
                    <img src={card3} alt='' width={330} height={225} />
                </div>
            </div>



            <div className={styles.card}>
                <div className={styles.card__infoBlock}>
                    <p className={styles.card__title}>
                        Устали вручную сводить еженедельные отчёты?
                    </p>
                    <p className={styles.card__text}>
                        Расшифровывайте документы в нашем специальном разделе — без API
                    </p>
                    <Link
                        to='/report-main'
                        className={styles.link}
                    >
                        Попробовать
                    </Link>
                </div>

                <div className={styles.card__cover}>
                    <img src={card4} alt='' width={246} height={225} />
                </div>
            </div>

        </div>
    )
}