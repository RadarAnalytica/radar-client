import { useEffect, useState } from 'react'
import styles from './skuFrequencyPage.module.css'
import Header from '../../components/sharedComponents/header/header'
import Sidebar from '../../components/sharedComponents/sidebar/sidebar'
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug'
import { Filters } from '../../components/sharedComponents/apiServicePagesFiltersComponent'
import { OptionsWidget, TableSettingsWidget, HowtoWidget, TableWidget } from './widgets'
//import OptionsSettingsWidget from './widgets'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import DownloadButton from '../../components/DownloadButton'
import { actions as reqActions } from '../../redux/requestsMonitoring/requestsMonitoringSlice'
import { actions as filterActions } from '../../redux/apiServicePagesFiltersState/apiServicePagesFilterState.slice'
import { newTableConfig } from './shared'
import HowToLink from '../../components/sharedComponents/howToLink/howToLink'
import { ServiceFunctions } from '../../service/serviceFunctions'
import { fileDownload } from '../../service/utils'
import ErrorModal from '../../components/sharedComponents/modals/errorModal/errorModal'




const SkuFrequencyPage = () => {
    //const { skuFrequencyMode } = useAppSelector(store => store.filters)
    const [ tableConfig, setTableConfig ] = useState(newTableConfig)
    const { requestData, formType, requestObject } = useAppSelector(store => store.requestsMonitoring)
    const [ downloadStatus, setDownloadStatus ] = useState({
        isLoading: false,
        isError: false,
        message: ''
    })
    const dispatch = useAppDispatch()


    const downloadHandler = async () => {
        const url = formType === 'complex' ? '/api/web-service/monitoring-oracle/get/download' : '/api/web-service/monitoring-oracle/easy/get/download'
        const filename = formType === 'complex' ? 'Поиск_ниши__продвинутый.xlsx' : 'Поиск_ниши__простой.xlsx'

        let res = await ServiceFunctions.getTrendingRequestExelFile(requestObject, url, setDownloadStatus)
        if (res) {
            fileDownload(res, filename, undefined);
            setDownloadStatus({
                isLoading: false,
                isError: false,
                message: ''
            })
        }
    }   



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
                        <Header 
                            title='Поиск прибыльной ниши' 
                            videoReviewLink='https://play.boomstream.com/4yHYrlLW?color=%23FFFFFF&size=cover&autostart=0&loop=1&title=0'
                        />
                    </div>
                    <HowtoWidget />
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
                        <HowToLink
                            text='Как использовать раздел'
                            url='https://radar.usedocs.com/article/77617'
                            target='_blank'
                        />
                    </div>
                    <OptionsWidget
                        resetTableConfig={() => {
                            //setTableConfig([...newTableConfig])
                        }}
                    />
                    {requestData && <div className={styles.page__tableSettingsBlock}>
                        <DownloadButton
                            handleDownload={downloadHandler}
                            loading={downloadStatus.isLoading}
                        />
                        <TableSettingsWidget />
                    </div>}
                </div>
                <TableWidget
                    tableConfig={tableConfig}
                    setTableConfig={setTableConfig}
                />
                <div style={{ height: 30, minHeight: 30}}></div>
            </div>
            {/* ---------------------- */}
            {/* Exel download error modal */}
            <ErrorModal
                footer={null}
                open={downloadStatus.isError}
                message={downloadStatus.message}
                onOk={() => setDownloadStatus({
                    isLoading: false,
                    isError: false,
                    message: ''
                })}
                onClose={() => setDownloadStatus({
                    isLoading: false,
                    isError: false,
                    message: ''
                })}
                onCancel={() => setDownloadStatus({
                    isLoading: false,
                    isError: false,
                    message: ''
                })}
            />
        </main>
    )
}

export default SkuFrequencyPage;

