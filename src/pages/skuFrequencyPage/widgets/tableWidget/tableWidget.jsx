import React, { useState, useRef, useEffect } from 'react'
import styles from './tableWidget.module.css'
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



const TableWidget = ({ tinyRows = false }) => {

    const dispatch = useAppDispatch()
    const containerRef = useRef(null) // реф скролл-контейнера (используется чтобы седить за позицией скрола)
    const [isXScrolled, setIsXScrolled] = useState(false) // следим за скролом по Х
    const [isEndOfXScroll, setIsEndOfXScroll] = useState(false) // отслеживаем конец скролла по Х
    const [sortState, setSortState] = useState(initSortState) // стейт сортировки (см initSortState)
    const { requestData, requestStatus, requestObject, tableConfig, formType, pagination } = useAppSelector(store => store.requestsMonitoring)
    //const [paginationState, setPaginationState] = useState({ limit: 25, page: 1, total_pages: requestData?.length || 1 })
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
                {/* Мапим таблицы в супертаблицу */}
                {tableConfig.map((t, id) => {

                    // здесь выбираем стили в зависимости от позиции элемента
                    const tableStyle = id === 0 ? `${styles.table} ${styles.table_fixed}` : styles.table;
                    const headerStyle = id === 0 ? `${styles.table__header} ${styles.table__header_leftPadding}` : id === tableConfig.length - 1 ? `${styles.table__header} ${styles.table__header_rightPadding}` : styles.table__header;
                    const headerContainerStyle = id === 0 ? `${styles.table__headerContainer} ${styles.table__headerContainer_leftRounded}` : id === tableConfig.length - 1 ? `${styles.table__headerContainer} ${styles.table__headerContainer_rightRounded}` : styles.table__headerContainer;
                    const tableBodyStyle = id === 0 ? `${styles.table__body} ${styles.table__body_leftPadding}` : id === tableConfig.length - 1 ? `${styles.table__body} ${styles.table__body_rightPadding}` : styles.table__body;



                    return (
                        // Добавляем тень накладывающемуся столбцу при скролле вправо
                        <div className={tableStyle} key={`table_${id}`} style={{ boxShadow: t.isMain && isXScrolled ? '10px 0 10px -5px rgba(0, 0, 0, 0.1)' : 'none' }}>

                            {/* Заголовок таблицы. Марджин нужен для второй таблицы у которой нет заголовка (разделено для реализации наложения при боковом скроле) */}
                            {t.tableName &&
                                <p
                                    className={id === 0 ? `${styles.table__title} ${styles.table__title_bigMargin}` : styles.table__title}
                                    style={{ marginTop: t.tableName ? 0 : 24 }}
                                >
                                    {t.tableName}
                                </p>
                            }

                            {/* Хэдер */}
                            <div className={headerStyle}>
                                <div className={headerContainerStyle}>
                                    {/* Мапим массив значений заголовков */}
                                    {t.values.map((v, id) => {

                                        // определяем необходимые стили
                                        const headerCellStyle = v.ruName === 'Поисковые запросы' || v.ruName === 'Склад' ? `${styles.table__headerItem} ${styles.table__headerItem_wide}` : styles.table__headerItem
                                        /* Рендерим айтем заголовка таблицы с кнопками сортировки (если они нужны) */
                                        return v.isActive && (

                                            <div className={headerCellStyle} key={`header_cell_${id}`}>
                                                <p className={styles.table__headerItemTitle}>{v.ruName}</p>
                                                {v.isSortable &&
                                                    <div className={styles.sortControls}>
                                                        <button
                                                            className={sortState.sortType === 'ASC' && sortState.sortedValue === v.engName ? `${styles.sortControls__button} ${styles.sortControls__button_active}` : styles.sortControls__button}
                                                            id='ASC'
                                                            onClick={(e) => sortButtonClickHandler(e, v.engName)}
                                                        >
                                                            <svg width="12" height="15" viewBox="0 0 12 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M4.99264 0.46967C5.28553 0.176777 5.76041 0.176777 6.0533 0.46967L10.8263 5.24264C11.1192 5.53553 11.1192 6.01041 10.8263 6.3033C10.5334 6.59619 10.0585 6.59619 9.76561 6.3033L6.27297 2.81066V14.5H4.77297V2.81066L1.28033 6.3033C0.987437 6.59619 0.512563 6.59619 0.21967 6.3033C-0.0732234 6.01041 -0.0732234 5.53553 0.21967 5.24264L4.99264 0.46967Z" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            className={sortState.sortType === 'DESC' && sortState.sortedValue === v.engName ? `${styles.sortControls__button} ${styles.sortControls__button_active}` : styles.sortControls__button}
                                                            id='DESC'
                                                            onClick={(e) => sortButtonClickHandler(e, v.engName)}
                                                        >
                                                            <svg width="12" height="15" viewBox="0 0 12 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M4.77297 12.1893V0.5H6.27297V12.1893L9.76561 8.6967C10.0585 8.40381 10.5334 8.40381 10.8263 8.6967C11.1192 8.98959 11.1192 9.46447 10.8263 9.75736L6.0533 14.5303C5.76041 14.8232 5.28553 14.8232 4.99264 14.5303L0.21967 9.75736C-0.0732234 9.46447 -0.0732234 8.98959 0.21967 8.6967C0.512563 8.40381 0.987437 8.40381 1.28033 8.6967L4.77297 12.1893Z" />
                                                            </svg>

                                                        </button>
                                                    </div>
                                                }
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Тело таблицы */}
                            <div className={tableBodyStyle}>
                                {/* Мапим данные о товарах */}
                                {requestData && requestData.length > 0 && requestData.map((product, id) => {
                                    return (
                                        <div
                                            className={tinyRows ? `${styles.table__row} ${styles.table__row_tiny}` : styles.table__row} key={id} id={`table_row_${id}`}
                                        >
                                            {/* Для каждого товара мапим заголовки таблицы еще раз и забираем из товара нужны данные (в первой колонке одновременно фото и название) */}
                                            {t.values.map(((v, id) => {
                                                if (v.ruName === 'Поисковые запросы') {
                                                    const url = `/monitoring/request?query=${encodeURIComponent(product[v.engName])}`
                                                    return (
                                                        <div className={`${styles.table__rowItem} ${styles.table__rowItem_wide}`} key={`table_cell_${id}`} style={{ paddingLeft: '17px' }}>
                                                            <div className={styles.table__mainTitleWrapper}>
                                                                <p className={styles.table__rowTitle}>{product[v.engName]}</p>
                                                                <div className={styles.table__actionsWrapper}>
                                                                    <Link 
                                                                        to={url} 
                                                                        className={styles.table__actionButton}
                                                                        title='Смотреть подробнее'
                                                                        target='_blank'
                                                                    >
                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '24px', height: '24px' }}>
                                                                            <path d="M14.4999 0.75C14.0857 0.75 13.7499 1.08579 13.7499 1.5C13.7499 1.91421 14.0857 2.25 14.4999 2.25H18.4999C18.5746 2.25 18.6478 2.25656 18.7189 2.26913L12.0184 8.96967C11.7255 9.26256 11.7255 9.73744 12.0184 10.0303C12.3113 10.3232 12.7861 10.3232 13.079 10.0303L19.7428 3.36653C19.7475 3.41038 19.7499 3.45491 19.7499 3.5V7.5C19.7499 7.91421 20.0857 8.25 20.4999 8.25C20.9141 8.25 21.2499 7.91421 21.2499 7.5V3.5C21.2499 2.7588 20.9567 2.08609 20.4799 1.59155L20.4765 1.58807C19.9765 1.07129 19.2757 0.75 18.4999 0.75H14.4999Z" fill="#363538" />
                                                                            <path d="M10.5 1.75018L10.4624 1.75018C8.81192 1.75018 7.52215 1.75017 6.49047 1.84368C5.44067 1.93883 4.58471 2.13551 3.825 2.57413C2.89008 3.1139 2.11372 3.89026 1.57394 4.82518C1.13532 5.5849 0.938642 6.44085 0.843495 7.49066C0.749991 8.52233 0.749995 9.81211 0.75 11.4626V11.5378C0.749995 13.1883 0.749991 14.478 0.843495 15.5097C0.938642 16.5595 1.13532 17.4155 1.57394 18.1752C2.11372 19.1101 2.89008 19.8865 3.825 20.4262C4.58471 20.8649 5.44067 21.0615 6.49047 21.1567C7.52214 21.2502 8.81191 21.2502 10.4624 21.2502H10.5376C12.1881 21.2502 13.4779 21.2502 14.5095 21.1567C15.5593 21.0615 16.4153 20.8649 17.175 20.4262C18.1099 19.8865 18.8863 19.1101 19.4261 18.1752C19.8647 17.4155 20.0614 16.5595 20.1565 15.5097C20.25 14.478 20.25 13.1883 20.25 11.5378V11.5002C20.25 11.086 19.9142 10.7502 19.5 10.7502C19.0858 10.7502 18.75 11.086 18.75 11.5002C18.75 13.1963 18.7493 14.4182 18.6626 15.3743C18.5769 16.3201 18.4119 16.9318 18.127 17.4252C17.7189 18.1321 17.1319 18.7191 16.425 19.1272C15.9316 19.412 15.3199 19.5771 14.3741 19.6628C13.418 19.7495 12.1961 19.7502 10.5 19.7502C8.80389 19.7502 7.58195 19.7495 6.62587 19.6628C5.6801 19.5771 5.06836 19.412 4.575 19.1272C3.86811 18.7191 3.28111 18.1321 2.87298 17.4252C2.58814 16.9318 2.42309 16.3201 2.33737 15.3743C2.25072 14.4182 2.25 13.1963 2.25 11.5002C2.25 9.80407 2.25072 8.58213 2.33737 7.62605C2.42309 6.68028 2.58814 6.06855 2.87298 5.57518C3.2811 4.86829 3.86811 4.28129 4.575 3.87316C5.06836 3.58832 5.6801 3.42327 6.62587 3.33755C7.58195 3.2509 8.80389 3.25018 10.5 3.25018C10.9142 3.25018 11.25 2.9144 11.25 2.50018C11.25 2.08597 10.9142 1.75018 10.5 1.75018Z" fill="#363538" />
                                                                        </svg>
                                                                    </Link>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    )
                                                }

                                                if (v.hasRate) {
                                                    const rateObject = formatRateValue(product[`${v.engName}Rate`]);
                                                    return (
                                                        <div className={styles.table__rowItem} key={`table_cell_${id}`}>
                                                            <div className={styles.table__itemRateWrapper}>
                                                                <p className={styles.table__rateTitle}>{formatPrice(product[v.engName], v.units)}</p>
                                                                <div className={styles.table__rateContainer}>
                                                                    <span className={styles.table__rateValue} style={{ color: rateObject.color }}>{rateObject.value}</span>
                                                                    {rateObject.icon}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }

                                                return v.isActive && (
                                                    <div className={styles.table__rowItem} key={`table_cell_${id}`}>{v.units ? formatPrice(product[v.engName], v.units) : product[v.engName]}</div>
                                                )
                                            }))}
                                        </div>
                                    )
                                })}
                                {requestData && requestData.length === 0 && id === 0 &&
                                    <div className={styles.table__row}>
                                        <div className={`${styles.table__rowItem} ${styles.table__rowItem_wide}`}>
                                            Ничего не найдено
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    )
                })}
            </div>
            <ConfigProvider theme={paginationTheme}>
                <Pagination
                    defaultCurrent={1}
                    current={pagination.page}
                    onChange={paginationHandler}
                    total={pagination.total_pages}
                    pageSize={pagination.limit}
                    showSizeChanger={false}
                    showQuickJumper
                    hideOnSinglePage={true}
                    //showTotal={(total) => `Всего ${total} товаров`}
                />
            </ConfigProvider>
        </div>
    )
}

export default TableWidget;



