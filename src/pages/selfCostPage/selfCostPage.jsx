import React, { useState, useEffect, useContext, useRef, useMemo, useCallback } from 'react'
import styles from './selfCostPage.module.css'
import Header from '../../components/sharedComponents/header/header'
import Sidebar from '../../components/sharedComponents/sidebar/sidebar'
import MobilePlug from '../../components/sharedComponents/mobilePlug/mobilePlug'
import { Filters } from '../../components/sharedComponents/apiServicePagesFiltersComponent'
import HowToLink from '../../components/sharedComponents/howToLink/howToLink'
import { SelfCostTableWidget, SearchWidget } from './widgets'
import AuthContext from '../../service/AuthContext'
import ErrorModal from '../../components/sharedComponents/modals/errorModal/errorModal'
import { useAppSelector } from '../../redux/hooks'
import { URL } from '../../service/config'
import DataCollectWarningBlock from '../../components/sharedComponents/dataCollectWarningBlock/dataCollectWarningBlock'
import { ServiceFunctions } from '../../service/serviceFunctions'

const initDataStatus = {
    isError: false,
    isLoading: false,
    message: ''
}

const SelfCostPage = () => {
    const [searchInputValue, setSearchInputValue] = useState('')
    const [isSuccess, setIsSuccess] = useState(false);
    const [dataStatus, setDataStatus] = useState(initDataStatus)
    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState() // данные для рендера таблицы
    const [filteredTableData, setFilteredTableData] = useState() // данные для рендера таблицы
    const { authToken } = useContext(AuthContext)
    const { activeBrand } = useAppSelector(store => store.filters)
    const filters = useAppSelector(store => store.filters)
    //const prevShop = useRef(activeBrand)

    const getTableData = useCallback(async (authToken, shopId, filters) => {
        setDataStatus({ ...initDataStatus, isLoading: true })
        const res = await ServiceFunctions.getSelfCostData(authToken, shopId, filters)
        if (!res.ok) {
            setDataStatus({ ...initDataStatus, isError: true, message: 'Что-то пошло не так :( Попробуйте оновить страницу' })
            return;
        }

        const parsedData = await res.json();
        const { items } = parsedData.data
        setDataStatus({ ...initDataStatus, isLoading: false })
        // sorting the data
        let sortedData = items.sort((a, b) => a.product - b.product);
        sortedData = sortedData.sort((a, b) => {
            if (a.photo && b.photo) {
                if (a.cost && b.cost) return 0;
                if (a.cost) return -1;
                if (b.cost) return 1;
                return 0;
            }
            if (!a.photo && !b.photo) {
                if (a.cost && b.cost) return 0;
                if (a.cost) return -1;
                if (b.cost) return 1;
                return 0;
            }
            if (a.photo) return -1;
            if (b.photo) return 1;
            return 0;
        })
        console.log(sortedData.length)
        setTableData([...sortedData])
        setFilteredTableData([...sortedData])
        //prevShop.current = activeBrand
    }, [])

    const noSearchAction = useCallback(() => {
        getTableData(authToken, activeBrand.id, filters)
    }, [authToken, activeBrand, filters, getTableData])

    const resetSearch = useCallback(() => {
        if (searchInputValue) {
            setSearchInputValue('')
            setFilteredTableData(tableData)
        }
    }, [searchInputValue, tableData])

    //задаем начальную дату
    useEffect(() => {
        if (activeBrand && authToken) {
            getTableData(authToken, activeBrand.id, filters)
        }
    }, [activeBrand, filters, getTableData, authToken])

    useEffect(() => {
        let timeout;
        if (isSuccess) {
            timeout = setTimeout(() => { setIsSuccess(false) }, 1500)
        }
        return () => {
            if (timeout) clearTimeout(timeout)
        }
    }, [isSuccess])

    const memoizedDataStatus = useMemo(() => dataStatus, [dataStatus])
    const memoizedFilteredTableData = useMemo(() => filteredTableData, [filteredTableData])
    const memoizedTableData = useMemo(() => tableData, [tableData])
    const memoizedSearchInputValue = useMemo(() => searchInputValue, [searchInputValue])

    return (
        <main className={styles.page}>
            <MobilePlug />
            {/* ------ SIDE BAR ------ */}
            <section className={styles.page__sideNavWrapper}>
                <Sidebar />
            </section>
            {/* ------ CONTENT ------ */}
            <section className={styles.page__content}>
                {/* header */}
                <div className={styles.page__headerWrapper}>
                    <Header title='Себестоимость' />
                </div>

                <div className={styles.page__filtersWrapper}>
                    <Filters
                        setLoading={setLoading}
                        timeSelect={false}
                        articleSelect={false}
                    />
                    <HowToLink
                        text='Инструкция по загрузке себестоимости'
                        url='https://radar.usedocs.com/article/76556'
                        target='_blank'
                    />
                </div>
                {/* DATA COLLECT WARNING */}
                {activeBrand && !activeBrand.is_primary_collect &&
                    <DataCollectWarningBlock
                        title='Ваши данные еще формируются и обрабатываются.'
                    />
                }
                {/* !DATA COLLECT WARNING */}
                {activeBrand && activeBrand.is_primary_collect &&
                    <>
                        <div className={styles.page__searchWrapper}>
                            <SearchWidget
                                tableData={memoizedTableData}
                                setFilteredTableData={setFilteredTableData}
                                searchInputValue={memoizedSearchInputValue}
                                setSearchInputValue={setSearchInputValue}
                                noSearchAction={noSearchAction}
                            />
                        </div>

                        <SelfCostTableWidget
                            setIsSuccess={setIsSuccess}
                            dataStatus={memoizedDataStatus}
                            setDataStatus={setDataStatus}
                            tableData={memoizedFilteredTableData}
                            authToken={authToken}
                            activeBrand={activeBrand}
                            setTableData={setFilteredTableData}
                            resetSearch={resetSearch}
                        />
                    </>
                }
            </section>
            {/* ---------------------- */}

            {isSuccess && <div className={styles.page__successAlert}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="6.4" fill="#00B69B" fillOpacity="0.1" />
                    <path d="M14.1999 19.1063L23.1548 10.1333L24.5333 11.5135L14.1999 21.8666L8 15.6549L9.37753 14.2748L14.1999 19.1063Z" fill="#00B69B" />
                </svg>
                Себестоимость установлена
            </div>}


            <ErrorModal
                footer={null}
                open={memoizedDataStatus.isError}
                message={memoizedDataStatus.message}
                onOk={() => setDataStatus(initDataStatus)}
                onClose={() => setDataStatus(initDataStatus)}
                onCancel={() => setDataStatus(initDataStatus)}
            />

        </main>
    )
}

export default SelfCostPage;