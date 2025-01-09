import { useState } from "react";
import styles from "../components/FinancialStatements.module.css";
import finLogo from "../assets/FinancialStatementsLogo3.svg";
import finLogoMain from "../assets/FinancialStatementsLogo3.svg";
import finLogoMobile from "../assets/FinancialStatementsMobile.svg";
import finLogoPNG from "../assets/finState.png";
import finLogoMainPNG from "../assets/finState.png";
import finLogoMobilePNG from "../assets/FinStateMob.png";

import finLogoPNGLow from "../assets/finStateMainLow.png";
import finLogoMainPNGLow from "../assets/finStateMainLow.png";
import finLogoMobilePNGLow from "../assets/finStateMobileLow.png";

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const FinancialStatements = () => {
    const [highResLoaded, setHighResLoaded] = useState(false);

    const handleImageLoad = () => {
        setHighResLoaded(true);
    };

    return (
        <div className={styles.FinStateContainer}>
            <div className={styles.finStatesHeaderTitle}>Расшифровка финансовых отчетов</div>
            <div className={styles.finStateParagraph}>
                Анализируйте финансы в наглядном формате графиков и таблиц
            </div>
            <div className={styles.finLogoMain}>
                <img
                    src={isSafari ? (highResLoaded ? finLogoMainPNG : finLogoMainPNGLow) : finLogoMain}
                    alt="Main Logo"
                    onLoad={handleImageLoad}
                />
            </div>
            <div className={styles.finLogo}>
                <img
                    src={isSafari ? (highResLoaded ? finLogoPNG : finLogoPNGLow) : finLogo}
                    alt="Logo"
                    onLoad={handleImageLoad}
                />
            </div>
            <div className={styles.finLogoMobile}>
                <img
                    src={isSafari ? (highResLoaded ? finLogoMobilePNG : finLogoMobilePNGLow) : finLogoMobile}
                    alt="Mobile Logo"
                    onLoad={handleImageLoad}
                />
            </div>
        </div>
    );
};

export default FinancialStatements;
