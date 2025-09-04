import styles from './supplierAnalysisPage.module.css'
import Header from '../../components/sharedComponents/header/header'
import Sidebar from '../../components/sharedComponents/sidebar/sidebar'
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug'
import { SearchBlock } from './widgets'


const SupplierAnalysisPage = () => {

    return (
        <main className={styles.page}>
            <MobilePlug />
            {/* ------ SIDE BAR ------ */}
            <section className={styles.page__sideNavWrapper}>
                <Sidebar />
            </section>
            {/* ------ CONTENT ------ */}
            <section className={styles.page__content}>
                <div className={styles.page__additionalWrapper}>
                    {/* header */}
                    <div className={styles.page__headerWrapper}>
                        <Header title='Анализ поставщика' />
                    </div>
                    {/* !header */}
                    <SearchBlock />
                </div>
            </section>
            {/* ---------------------- */}
        </main>
    )
}

export default SupplierAnalysisPage;