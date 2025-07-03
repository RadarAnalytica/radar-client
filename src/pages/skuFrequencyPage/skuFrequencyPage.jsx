import { useEffect } from 'react'
import styles from './skuFrequencyPage.module.css'
import Header from '../../components/sharedComponents/header/header'
import Sidebar from '../../components/sharedComponents/sidebar/sidebar'
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug'
import { Filters } from '../../components/sharedComponents/apiServicePagesFiltersComponent'
import { OptionsWidget, TableWidget, TableSettingsWidget } from './widgets'
//import OptionsSettingsWidget from './widgets'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import DownloadButton from '../../components/DownloadButton'
import TableWidget_TEST from './widgets/tableWidget/tableWidget_TEST'
import { actions as reqActions } from '../../redux/requestsMonitoring/requestsMonitoringSlice'
import { actions as filterActions } from '../../redux/apiServicePagesFiltersState/apiServicePagesFilterState.slice'




const SkuFrequencyPage = () => {
    //const { skuFrequencyMode } = useAppSelector(store => store.filters)
    const { requestData } = useAppSelector(store => store.requestsMonitoring)
    const dispatch = useAppDispatch()
    useEffect(() => {
        return () => {
            dispatch(reqActions.resetState())
            dispatch(filterActions.setSkuFrequencyMode('Простой'))
        }
    }, [])

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
                            setLoading={() => {}}
                            shopSelect={false}
                            skuFrequency={true}
                            brandSelect={false}
                            articleSelect={false}
                            groupSelect={false}
                            timeSelect={false}
                        />
                        {/* {skuFrequencyMode === 'Продвинутый' &&
                            <OptionsSettingsWidget />
                        } */}
                    </div>
                    <OptionsWidget />
                    {requestData && <div className={styles.page__tableSettingsBlock}>
                        {/* <DownloadButton /> */}
                        <TableSettingsWidget />
                    </div>}
                </div>
                {/* <TableWidget /> */}
                <TableWidget_TEST />
                <div style={{ height: 30, minHeight: 30}}></div>
            </div>
            {/* ---------------------- */}
        </main>
    )
}

export default SkuFrequencyPage;

