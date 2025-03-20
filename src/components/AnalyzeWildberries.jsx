
import styles from "../components/AnalyzeWildberries.module.css"
import { useNavigate } from 'react-router-dom';

import webLogo from "../assets/firstLogoMain.svg"
import browserLogo from "../assets/secondLogoMain.svg"
import telegramLogo from "../assets/thirdLogoMain.svg"

import webLogo1 from "../assets/iconLogoFirst.png"
import browserLogo1 from "../assets/IconLogoSecond.png"
import telegramLogo1 from "../assets/IconLogoThird.png"


const AnalyzeWildberries = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.analyzeContainer}>
            <h3 className={styles.headerText}>Начните <span style={{ color: "#5329FF" }}>анализировать Wildberries </span> уже сегодня</h3>
            <h3 className={styles.headerTextMoblie}>Начните <span style={{ color: "#5329FF" }}>анализировать Wildberries </span>уже сегодня</h3>
            <div className={styles.containerWildberries}>

                <div className={styles.wrapper}>
                    <div className={styles.cardHeader}>
                        <div className={styles.wrapperHeader}>
                            <div className={styles.logoContainer}><img src={webLogo1} alt="WebLogo" /> </div>
                            <div className={styles.headerTitle}>Веб-сервис</div>
                        </div>
                        <div className={styles.wrapperMain}>Для полноценной работы со всем функционалом</div>
                    </div>
                    <div className={styles.wrapperFooter}>
                        <div className={styles.buttonTry} onClick={() => navigate('/signup')}>Попробовать</div>
                    </div>
                </div>

                <div className={styles.wrapperSecond}>
                    <div className={styles.cardHeader}>
                        <div className={styles.wrapperHeader}>
                            <div className={styles.logoContainer}><img src={browserLogo1} alt="WebLogo" /> </div>
                            <div className={styles.headerTitle}>Браузерное расширение</div>
                        </div>
                        <div className={styles.wrapperMain}>Для удобной аналитики прямо на сайте WB</div>
                    </div>
                    <div className={styles.wrapperFooter}>
                        <div className={styles.buttonTrySecond}
                            onClick={() => window.open(
                                "https://chromewebstore.google.com/detail/radar-%E2%80%93-%D0%B1%D0%B5%D1%81%D0%BF%D0%BB%D0%B0%D1%82%D0%BD%D0%B0%D1%8F-%D0%B0%D0%BD%D0%B0%D0%BB%D0%B8%D1%82/haelmohfdnapjehnhgncjdnjmchdahhb?pli=1",
                                "_blank",
                                "noopener,noreferrer"
                            )}
                        >Попробовать</div>
                    </div>
                </div>
                <div className={styles.wrapperThird}>
                    <div className={styles.cardHeader}>
                        <div className={styles.wrapperHeader}>
                            <div className={styles.logoContainer}><img src={telegramLogo1} alt="WebLogo" /> </div>
                            <div className={styles.headerTitleThird}>Телеграм-бот</div>
                        </div>
                        <div className={styles.wrapperMainThird}>Для экспресс-аналитики прямо у вас в телефоне</div>
                    </div>
                    <div className={styles.wrapperFooter}>
                        <div className={styles.buttonTryThird} onClick={() => navigate('/signup')}>Попробовать</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyzeWildberries;
