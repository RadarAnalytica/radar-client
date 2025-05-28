// dont forget to renew imports
import styles from './skuFrequencyPage.module.css'
import Header from '../../components/sharedComponents/header/header'
import Sidebar from '../../components/sharedComponents/sidebar/sidebar'
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug'
import { Filters } from '../../components/sharedComponents/apiServicePagesFiltersComponent'
import { OptionsWidget, TableWidget } from './widgets'



// dont forget to rename the component and its export
const SkuFrequencyPage = () => {

    return (
        <main className={styles.page}>
            <MobilePlug />
            {/* ------ SIDE BAR ------ */}
            <section className={styles.page__sideNavWrapper}>
                <Sidebar />
            </section>
            {/* ------ CONTENT ------ */}
            <div className={styles.page__content}>
                {/* header */}
                <div className={styles.page__mainWrapper}>
                    <div className={styles.page__headerWrapper}>
                        <Header title='Частотность артикула' />
                    </div>
                    <div className={styles.page__filtersWrapper}>
                        <Filters
                            setLoading={() => { }}
                            shopSelect={false}
                            skuFrequency={true}
                            brandSelect={false}
                            articleSelect={false}
                            groupSelect={false}
                        />
                    </div>
                    <OptionsWidget />
                </div>
                <TableWidget />
                {/* !header */}
            </div>
            {/* ---------------------- */}
        </main>
    )
}

export default SkuFrequencyPage;

