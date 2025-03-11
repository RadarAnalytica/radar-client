import { useState } from "react";
import styles from "../components/FinancialStatements.module.css";

import finLogo from "../assets/FinancialStatementsLogo.svg";
import finLogoMain from "../assets/FinancialStatementsLogo.svg";
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
                    srcSet={`
                        ${finLogoMainPNG} 1x, 
                        ${finLogoMainPNGLow} 0.5x, 
                        ${finLogoMain} 2x
                    `}
                    alt="Main Logo"
                />
            </div>
            <div className={styles.finLogo}>
                <img
                    srcSet={`
                        ${finLogoMain} 1x, 
                        ${finLogoMainPNGLow} 0.5x, 
                        ${finLogoMainPNG} 2x
                    `}
                    alt="Main Logo"
                />
            </div>
            <div className={styles.finLogoMobile}>
                 <img
                    srcSet={`
                        ${finLogoMobile} 1x, 
                        ${finLogoMobilePNGLow} 0.5x, 
                        ${finLogoMobilePNG} 2x
                    `}
                    alt="Main Logo"
                />
            </div>
        </div>
    );
};

export default FinancialStatements;
