import React, { useState, useRef, useEffect } from 'react'
import styles from './TableWidget_TEST.module.css'
import { formatPrice } from '../../../../service/utils';
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
import { Link } from 'react-router-dom';
import { formatRateValue, sortTableDataFunc } from '../../shared';
import { fetchRequestsMonitoringData, fetchRequestsMonitoringDataEasy } from '../../../../redux/requestsMonitoring/requestsMonitoringActions';
import { actions as reqsMonitoringActions } from '../../../../redux/requestsMonitoring/requestsMonitoringSlice';
import ErrorModal from '../../../../components/sharedComponents/modals/errorModal/errorModal';
import { ConfigProvider, Pagination } from 'antd'
import { useNavigate } from 'react-router-dom';

//инит стейт сортировки
const initSortState = {
    sortedValue: undefined,
    sortType: undefined,
}

const paginationTheme = {
    token: {
        colorText: '#5329FF',
        lineWidth: 0,
        colorPrimary: '#5329FF'
    },
    components: {
        Pagination: {
            itemActiveBg: '#EEEAFF',
            itemBg: '#F7F7F7',
            itemColor: '#8C8C8C',
        }
    }
}



const TableWidget_TEST = ({ tinyRows = false }) => {

    const dispatch = useAppDispatch()
    const containerRef = useRef(null) // реф скролл-контейнера (используется чтобы седить за позицией скрола)
    const [isXScrolled, setIsXScrolled] = useState(false) // следим за скролом по Х
    const [isEndOfXScroll, setIsEndOfXScroll] = useState(false) // отслеживаем конец скролла по Х
    const [sortState, setSortState] = useState(initSortState) // стейт сортировки (см initSortState)
    const { requestData, requestStatus, requestObject, tableConfig, formType } = useAppSelector(store => store.requestsMonitoring)
    const [paginationState, setPaginationState] = useState({ limit: 25, page: 1, total_pages: requestData?.length || 1 })
    const navigate = useNavigate()

    //задаем начальную дату
    useEffect(() => {
        if (requestObject && formType === 'complex') {
            dispatch(fetchRequestsMonitoringData(requestObject))
        }
        if (requestObject && formType === 'easy') {
            dispatch(fetchRequestsMonitoringDataEasy(requestObject))
        }
    }, [requestObject])

    useEffect(() => {
        if (requestData) {
            const jumper = document.querySelector('.ant-pagination-options-quick-jumper')
            const input = jumper?.querySelector('input')
            if (jumper && input) {
               
                input.style.backgroundColor = '#EEEAFF'
                input.style.padding = '5px'
                input.style.width = '32px'
                jumper.textContent = 'Перейти на'
                jumper.appendChild(input)
                const suffix = document.createElement('span');
                suffix.textContent = 'стр'
                jumper.appendChild(suffix)
                 jumper.style.color = 'black'
            }
        }
    }, [requestData])




    // отслеживаем скролл в контейнере
    const scrollHandler = () => {
        if (containerRef && containerRef.current) {

            // если скроллим вправо
            if (containerRef.current.scrollLeft > 1) {
                setIsXScrolled(true)
            } else {
                setIsXScrolled(false)
            }

            // вычисляем достиг ли скролл конца справа
            const delta = containerRef.current.scrollWidth - (containerRef.current.scrollLeft + containerRef.current.clientWidth);
            if (delta < 16) {
                setIsEndOfXScroll(true)
            } else {
                setIsEndOfXScroll(false)
            }
        }
    }

    // хэндлер сортировки
    const sortButtonClickHandler = (e, value) => {
        const { id } = e.currentTarget;

        // выключаем сортировку если нажата уже активная клавиша
        if (sortState.sortType === id && sortState.sortedValue === value) {
            setSortState(initSortState)
            dispatch(reqsMonitoringActions.updateRequestObject({ sorting: { sort_field: 'rating', sort_order: 'DESC' }, page: 1}))
            return
        }


        // включаем сортировку и сортируем дату
        setSortState({
            sortedValue: value,
            sortType: id,
        })
        dispatch(reqsMonitoringActions.updateRequestObject({ sorting: { sort_field: value, sort_order: id }, page: 1}))
    }

    const paginationHandler = (page) => {
       dispatch(reqsMonitoringActions.updateRequestObject({ page: page}))
    }

    if (requestStatus.isLoading) {
        return (
            <div className={styles.widget}>
                <div className={styles.widget__loaderWrapper}>
                    <span className='loader'></span>
                </div>
            </div>
        )
    }

    if (requestStatus.isError) {
        return (
            <ErrorModal
                footer={null}
                open={requestStatus.isError}
                onOk={() => { dispatch(reqsMonitoringActions.setRequestStatus({ isLoading: false, isError: false, isSuccess: false, message: '' })) }}
                onClose={() => { dispatch(reqsMonitoringActions.setRequestStatus({ isLoading: false, isError: false, isSuccess: false, message: '' })) }}
                onCancel={() => { dispatch(reqsMonitoringActions.setRequestStatus({ isLoading: false, isError: false, isSuccess: false, message: '' })) }}
                message={requestStatus.message}
            />
        )
    }

    return requestData && (
        <div className={styles.widget__wrapper} style={{ borderRadius: isEndOfXScroll ? '16px' : '' }}>
            <div className={styles.widget} onScroll={scrollHandler} ref={containerRef}>
            
            </div>
            <ConfigProvider theme={paginationTheme}>
                <Pagination
                    defaultCurrent={1}
                    current={paginationState.page}
                    onChange={paginationHandler}
                    total={paginationState.total_pages}
                    pageSize={paginationState.limit}
                    showSizeChanger={false}
                    showQuickJumper
                    hideOnSinglePage={true}
                    //showTotal={(total) => `Всего ${total} товаров`}
                />
            </ConfigProvider>
        </div>
    )
}

export default TableWidget_TEST;



