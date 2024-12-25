
import styles from "../components/FinancialStatements.module.css"
import finLogo from "../assets/FinancialStatementsLogo.svg"
import finLogoMain from "../assets/FinancialStatementsLogo2.svg"
import finLogoMobile from "../assets/FinancialStatementsMobile.svg"


const FinancialStatements = () => {
    return (
        <div className={styles.FinStateContainer}>
            <div className={styles.finStatesHeaderTitle}>Расшифровка финансовых отчетов</div>
            <div className={styles.finStateParagraph}>Анализируйте финансы в наглядном формате графиков и таблиц </div>
            <div className={styles.finLogoMain}><img src={finLogoMain} /></div>
            <div className={styles.finLogo}><img src={finLogo} /></div>
            <div className={styles.finLogoMobile}><img src={finLogoMobile} /></div>
        </div>
    );
};

export default FinancialStatements;
