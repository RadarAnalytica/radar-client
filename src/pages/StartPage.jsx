import React, { useContext, useState, useEffect, useRef } from "react";
import AuthContext from "../service/AuthContext";
import styles from './StartPage.module.css';
import { Link } from "react-router-dom";
import PopupBanner from "../components/sharedComponents/popupBanner/PopupBanner";
import TgBanner from "../components/startPageComponents/tgBanner/TgBanner";
import CalcBanners from "../components/startPageComponents/calcBanners/calcBanners";
import MobilePlug from "../components/sharedComponents/mobilePlug/mobilePlug";
import Sidebar from "../components/sharedComponents/sidebar/sidebar";


// Main page for authorized user
const StartPage = () => {
    const ref = useRef(null);
    const { user } = useContext(AuthContext);
    const [playVideo, setPlayVideo] = useState(0);
    const [videoSource, setVideoSource] = useState('https://play.boomstream.com/I4yecQZ8?size=cover&title=0&start=1&color=%23F7F6FE&autostart=0&volume=50');

    useEffect(() => {
        window.addEventListener('message', receiveMessage, false);
        function receiveMessage(event) {
            if (event.origin !== "https://play.boomstream.com") {
                return;
            }

            if (event.data.method === 'play') {
                setPlayVideo(1);
            }

            if (event.data.method === 'pause') {
                setPlayVideo(0);
            }
        }

        return () => { window.removeEventListener('message', receiveMessage); };
    }, []);

    const playClickHandler = () => {
        ref.current.contentWindow.postMessage({ code: `https://play.boomstream.com/I4yecQZ8?size=cover&title=0&start=1&color=%23F7F6FE&autostart=0&volume=50`, method: 'action', action: 'play', data: '' }, '*');
        //
        // setVideoSource('https://play.boomstream.com/QLwHwcta?size=cover&title=0&start=1&color=%23F7F6FE&autostart=1&volume=50')
    };


    return (
        <main
            className={styles.startPage}
        >
            <MobilePlug />
            <Sidebar />
            <section
                className={styles.startPage__content}
            >
                <div className={styles.startPage__galleryWrapper}>
                    {/* Feel free to create a shared component from this gallery below */}
                    <div className={styles.startPage__gallery}>
                        <div className={styles.gallery__item}>
                            <div className={styles.gallery__videoWrapper}>
                                <iframe
                                    ref={ref}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                    }}
                                    src={videoSource}
                                    allowFullScreen
                                    allow="autoplay"
                                ></iframe>
                            </div>
                            {playVideo === 0 &&
                                <div className={styles.gallery__videoPlate}>
                                    <div className={styles.gallery__videPlateTitleBox}>
                                        <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={playClickHandler}>
                                            <path d="M0.39186 1.70239C0.39186 0.666987 1.51272 0.0198584 2.40941 0.537561L12.9094 6.59976C13.8061 7.11746 13.8061 8.41172 12.9094 8.92942L2.40941 14.9916C1.51272 15.5093 0.39186 14.8622 0.39186 13.8268L0.39186 1.70239Z" fill="#5329FF" />
                                        </svg>
                                        <p className={styles.gallery__videoPlateTitle}>
                                            Обзор сервиса. С чего начать?
                                        </p>
                                    </div>
                                    <span
                                        className={styles.gallery__videoPlateDuration}
                                    >
                                        10:04
                                    </span>
                                </div>
                            }
                        </div>

                        <div className={styles.gallery__itemPadding}>
                            <div className={styles.gallery__imgWrapper}></div>
                            <div className={styles.gallery__offerBlock}>
                                <div className={styles.gallery__offerTitleWrapper}>
                                    <p className={styles.gallery__offerTitle}>Оцифруйтесь за 1 минуту</p>
                                    <div className={styles.gallery__subtitleBox}>
                                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle opacity="0.2" cx="8" cy="8.5" r="8" fill="white" />
                                            <rect opacity="0.4" x="3" y="3.5" width="10" height="10" rx="5" fill="white" />
                                            <rect x="3.25928" y="3.75928" width="9.48143" height="9.48143" rx="4.74072" stroke="white" strokeWidth="0.518569" />
                                            <circle cx="7.9268" cy="8.4268" r="1.16678" fill="white" stroke="white" strokeWidth="0.777853" />
                                        </svg>

                                        Новый подход к еженедельным отчетам
                                    </div>
                                </div>
                                <Link
                                    // to={{ pathname: '/report-main' }}
                                    to={{ pathname: user ? '/report-main' : '/signup'}}
                                    className={styles.gallery__offerLink}
                                >
                                    Попробовать
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* -------------------------------------------------------------- */}

                </div>
                <div className={styles.startPage__bannersWrapper}>
                    <CalcBanners />
                </div>
                <div className={styles.startPage__bannersWrapper}>
                    <PopupBanner
                        offerTitle='1 300 ₽'
                        offerSubtitle='Платим вам на счет'
                        mainTitle='За каждого нового пользователя'
                        mainSubtitle='Станьте нашим партнером прямо сейчас'
                        sideBarText='Чтобы получить персональную реферальную ссылку и узнать подробности, напишите нам – ответим в течение 10 минут.'
                    />
                </div>

                <div className={styles.startPage__bannersWrapper}>
                    <TgBanner />
                </div>

            </section>
        </main>
    );
};

export default StartPage;
