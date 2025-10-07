import styles from './videoWidget.module.css';
import { VIDEOS } from './config';


export const VideoWidget = () => {

    return (
        <div className={styles.widget}>
            {/* cards */}
            {VIDEOS.map((_, id) => {

                if (_.video) {
                    return (
                        <div className={styles.card} key={id}>
                            <iframe
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                }}
                                src={_.video}
                                allowFullScreen
                            //allow="autoplay"
                            ></iframe>
                        </div>
                    );
                } else {
                    return (
                        <div className={styles.card} key={id}>
                            <img src={_.plug} alt='' />
                        </div>
                    );
                }
            })}


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
    );
};
