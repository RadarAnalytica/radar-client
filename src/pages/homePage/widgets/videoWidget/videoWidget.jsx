import styles from './videoWidget.module.css'
import c1 from './assets/c1.png'
import c2 from './assets/c2.png'
import c3 from './assets/c3.png'

export const VideoWidget = () => {

    return (
        <div className={styles.widget}>
            {/* cards */}
            <div className={styles.card}>
                <img src={c1} alt='' />
            </div>
            <div className={styles.card}>
                <img src={c2} alt='' />
            </div>
            <div className={styles.card}>
                <img src={c3} alt='' />
            </div>


            <div className={styles.description}>
                <div className={styles.description__bullet}>
                    Анализ ниши и трендов
                </div>
                Находите прибыльные ниши, товары и растущие тренды — в два клика.
            </div>
            <div className={styles.description}>
                <div className={styles.description__bullet}>
                    Аналитика ваших финансов
                </div>
                Аналитика личных продаж по API-ключу, расшифровка еженедельных отчётов, ОПиУ-отчёты, ABC-анализ и юнит-экономика.
            </div>
            <div className={styles.description}>
                <div className={styles.description__bullet}>
                    Анализ конкурентов
                </div>
                Следите за показателями ваших конкурентов и анализируйте потенциал их ниш.
            </div>
        </div>
    )
}