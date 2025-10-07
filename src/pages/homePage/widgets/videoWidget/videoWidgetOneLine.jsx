import { useState, useRef, useEffect } from 'react';
import styles from './videoWidgetOneLine.module.css';
import { VIDEOS } from './config';


export const VideoWidgetOneLine = () => {

    return (
        <div className={styles.widget}>
            {/* cards */}
            {VIDEOS.map((_, id) => {
                return (
                    <VideoComp item={_} key={id} />
                );
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


const VideoComp = ({ item }) => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (isModalVisible && ref && ref.current) {
            ref.current.contentWindow.postMessage({ code: item.video, method: 'action', action: 'play', data: '' }, '*');
        }
        if (!isModalVisible && ref && ref.current) {
            ref.current.contentWindow.postMessage({ code: item.video, method: 'action', action: 'pause', data: '' }, '*');
        }
    }, [isModalVisible]);


    return (
        <>
            <div className={styles.card} onClick={() => {setIsModalVisible(true);}}>
                <img src={item.plug} alt='' />
            </div>

            <div
                className={isModalVisible ? `${styles.modal__backdrop} ${styles.modal__backdrop_active}` : styles.modal__backdrop}
                id='video_backdrop'
                onClick={(e) => {
                    if (e.target.id === 'video_backdrop') {
                        setIsModalVisible(false);
                    }
                }}
            >
                <div className={isModalVisible ? `${styles.modal} ${styles.modal_active}` : styles.modal}>
                    <button className={styles.modal__closeButton} onClick={() => { setIsModalVisible(false); }}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 7.77813L17.7781 0L20 2.22187L12.2219 10L20 17.7781L17.7781 20L10 12.2219L2.22187 20L0 17.7781L7.77813 10L0 2.22187L2.22187 0L10 7.77813Z" fill="#FFFFFF" fillOpacity="0.5" />
                        </svg>
                    </button>
                        <iframe
                            ref={ref}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                            }}
                            className={isModalVisible ? `${styles.frame} ${styles.frame_active}` : styles.frame}
                            src={item.video}
                            allowFullScreen
                            allow="autoplay"
                        ></iframe>

                </div>
            </div>
        </>
    );
};
