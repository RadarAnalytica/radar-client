// Dont forget to renew imports
import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import styles from './tableWidget.module.css'
// Возможно будет удобнее передавать конфиг пропсом
import { tableConfig } from './config'
import { sortTableDataFunc } from './utils'
import { formatPrice } from '../../../../service/utils'
import { ConfigProvider, Pagination } from 'antd'
import DownloadButton from '../../../../components/DownloadButton'
import { fileDownload } from '../../../../service/utils'
import { Link } from 'react-router-dom'


/**
 * Краткое описание:
 * 
 * Общая таблица (супертаблица) рендерится на основе конфига (tableConfig) и состоит из нескольких маленьких таблиц
 * Разделил их по наличию заголовка, кроме самой перой (Товар) - тут искуственно отделен первый столбец для реализации фиксации первого столбца при
 * горизонтальном скроле.
 * 
 * 1. Сначала мапим весь конфиг (сами таблицы)
 * 2. Далее внутри для каждой таблицы мапим массив заголовков
 * 3. Далее под хэдером таблицы еще раз мапим массив заголовков и внутри для каждого заголовка мапим уже данные забирая только нужные для конкретного заголовка и конкретной
 * таблицы
 * 4. В процессе расставляем стили в зависимости от позиции таблицы, элемента и тд
 */


//инит стейт сортировки
const initSortState = {
    sortedValue: undefined,
    sortType: undefined,
}



export const TableWidget = React.memo(({ rawData, loading, tablePaginationState, setRequestState, requestState, initRequestStatus, setRequestStatus }) => {


    const containerRef = useRef(null) // реф скролл-контейнера (используется чтобы седить за позицией скрола)
    const [tableData, setTableData] = useState() // данные для рендера таблицы
    const [isXScrolled, setIsXScrolled] = useState(false) // следим за скролом по Х
    const [isEndOfXScroll, setIsEndOfXScroll] = useState(false) // отслеживаем конец скролла по Х
    const [sortState, setSortState] = useState(initSortState) // стейт сортировки (см initSortState)
    const [isExelLoading, setIsExelLoading] = useState(false)


    // задаем начальную дату
    useEffect(() => {
        setTableData(rawData)
    }, [rawData])

    useEffect(() => {
       const paginationNextButton = document.querySelector('.ant-pagination-jump-next')
       const paginationPrevButton = document.querySelector('.ant-pagination-jump-prev')
       const paginationSingleNextButton = document.querySelector('.ant-pagination-next')
       const paginationSinglePrevButton = document.querySelector('.ant-pagination-prev')
       if (paginationNextButton) {
        paginationNextButton.setAttribute('title', 'Следующие 5 страниц')
       }
       if (paginationSingleNextButton) {
        paginationSingleNextButton.setAttribute('title', 'Следующая страница')
       }
       if (paginationSinglePrevButton) {
        paginationSinglePrevButton.setAttribute('title', 'Предыдущая страница')
       }
       if (paginationPrevButton) {
        paginationPrevButton.setAttribute('title', 'Предыдущие 5 страниц')
       }
    }, [tablePaginationState])

    const paginationHandler = useCallback((page) => {
        setRequestState({ ...requestState, page })
    }, [requestState, setRequestState])


    // отслеживаем скролл в контейнере
    const scrollHandler = useCallback(() => {
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
    }, [])

    // хэндлер сортировки
    const sortButtonClickHandler = useCallback((e, value) => {
        const { id } = e.currentTarget;

        // выключаем сортировку если нажата уже активная клавиша
        if (sortState.sortType === id && sortState.sortedValue === value) {
            setSortState(initSortState)
            setTableData(rawData)
            return
        }


        // включаем сортировку и сортируем дату
        setSortState({
            sortedValue: value,
            sortType: id,
        })
        setTableData([...sortTableDataFunc(id, value, rawData)])
    }, [sortState, rawData])

    const downloadButtonHandler = useCallback(async () => {
        setIsExelLoading(true)
        try {
            let res = await fetch(`https://radarmarket.ru/api/web-service/trending-queries/download`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify(requestState)
            })

            if (!res.ok) {
                setIsExelLoading(false)
                return setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось скачать таблицу.' })
            }

            const blob = await res.blob()
            fileDownload(blob, "Поиск_трендовых_запросов.xlsx", setIsExelLoading);

        } catch {
            setIsExelLoading(false)
            setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось скачать таблицу.' })
        }
    }, [requestState, initRequestStatus, setRequestStatus])

    const memoizedPaginationTheme = useMemo(() => ({
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
    }), [])

    if (loading) {
        return (
            <div className={styles.widget}>
                <div className={styles.widget__loaderWrapper}>
                    <span className='loader'></span>
                </div>
            </div>
        )
    }



    return (
        <>
            <div className={styles.widget__dlButtonWrapper}>
                <DownloadButton
                    loading={isExelLoading}
                    handleDownload={downloadButtonHandler}
                />
            </div>
            <div className={styles.widget__wrapper}>
                <div className={styles.widget} style={{ borderRadius: isEndOfXScroll ? '16px' : '' }} onScroll={scrollHandler} ref={containerRef}>
                    {/* Мапим таблицы в супертаблицу */}
                    {tableConfig.map((t, id) => {

                        // здесь выбираем стили в зависимости от позиции элемента
                        const tableStyle = id === 0 ? `${styles.table} ${styles.table_leftMargin}` : id === tableConfig.length - 1 ? `${styles.table} ${styles.table_rightMargin}` : styles.table;
                        const headerStyle = id === 0 ? `${styles.table__header} ${styles.table__header_leftRounded}` : id === tableConfig.length - 1 ? `${styles.table__header} ${styles.table__header_rightRounded}` : styles.table__header;

                        return (
                            // Добавляем тень накладывающемуся столбцу при скролле вправо
                            <div className={tableStyle} key={id} style={{ boxShadow: id === 0 && isXScrolled ? '10px 0 10px -5px rgba(0, 0, 0, 0.1)' : 'none' }}>

                                {/* Заголовок таблицы. Марджин нужен для второй таблицы у которой нет заголовка (разделено для реализации наложения при боковом скроле) */}
                                {/* <p
                            className={id === 0 ? `${styles.table__title} ${styles.table__title_bigMargin}` : styles.table__title}
                            style={{ marginTop: t.tableName ? 0 : 24 }}
                        >
                            {t.tableName}
                        </p> */}

                                {/* Хэдер */}
                                <div className={styles.table__headerWrapper}>
                                    <div className={headerStyle}>
                                        {/* Мапим массив значений заголовков */}
                                        {t.values.map((v, id) => {

                                            // определяем необходимые стили
                                            const headerCellStyle = v.ruName === 'Товар' ? `${styles.table__headerItem} ${styles.table__headerItem_wide}` : styles.table__headerItem
                                            return (
                                                <div className={headerCellStyle} key={id}>
                                                    <p className={styles.table__headerItemTitle}>{v.ruName}</p>
                                                    {v.isSortable &&
                                                        <div className={styles.sortControls}>
                                                            <button
                                                                className={sortState.sortType === 'DESC' && sortState.sortedValue === v.engName ? `${styles.sortControls__button} ${styles.sortControls__button_active}` : styles.sortControls__button}
                                                                id='DESC'
                                                                onClick={(e) => sortButtonClickHandler(e, v.engName)}
                                                            >
                                                                <svg width="12" height="15" viewBox="0 0 12 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.99264 0.46967C5.28553 0.176777 5.76041 0.176777 6.0533 0.46967L10.8263 5.24264C11.1192 5.53553 11.1192 6.01041 10.8263 6.3033C10.5334 6.59619 10.0585 6.59619 9.76561 6.3033L6.27297 2.81066V14.5H4.77297V2.81066L1.28033 6.3033C0.987437 6.59619 0.512563 6.59619 0.21967 6.3033C-0.0732234 6.01041 -0.0732234 5.53553 0.21967 5.24264L4.99264 0.46967Z" />
                                                                </svg>
                                                            </button>
                                                            <button
                                                                className={sortState.sortType === 'ASC' && sortState.sortedValue === v.engName ? `${styles.sortControls__button} ${styles.sortControls__button_active}` : styles.sortControls__button}
                                                                id='ASC'
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
                                <div className={styles.table__body}>
                                    {/* Мапим данные о товарах */}
                                    {tableData && tableData.length > 0 && tableData.map((product, id) => {
                                        return (
                                            <div
                                                className={styles.table__row} key={id} id={`table_row_${id}`}
                                            >
                                                {/* Для каждого товара мапим заголовки таблицы еще раз и забираем из товара нужны данные (в первой колонке одновременно фото и название) */}
                                                {t.values.map(((v, id) => {
                                                    if (v.ruName === 'Запрос') {
                                                        return (
                                                            <div className={`${styles.table__rowItem} ${styles.table__rowItem_wide}`} key={id}>
                                                                <div className={styles.table__mainTitleWrapper}>
                                                                    <p className={styles.table__rowTitle}>{product[v.engName]}</p>
                                                                    <div className={styles.table__actionsWrapper}>
                                                                        <Link to={`https://wildberries.ru/catalog/0/search.aspx?search=${product[v.engName]}`} target='_blank' className={styles.table__actionButton} title='Перейти к товару'>
                                                                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '12px', height: '12px' }}>
                                                                                <path d="M14.4999 0.75C14.0857 0.75 13.7499 1.08579 13.7499 1.5C13.7499 1.91421 14.0857 2.25 14.4999 2.25H18.4999C18.5746 2.25 18.6478 2.25656 18.7189 2.26913L12.0184 8.96967C11.7255 9.26256 11.7255 9.73744 12.0184 10.0303C12.3113 10.3232 12.7861 10.3232 13.079 10.0303L19.7428 3.36653C19.7475 3.41038 19.7499 3.45491 19.7499 3.5V7.5C19.7499 7.91421 20.0857 8.25 20.4999 8.25C20.9141 8.25 21.2499 7.91421 21.2499 7.5V3.5C21.2499 2.7588 20.9567 2.08609 20.4799 1.59155L20.4765 1.58807C19.9765 1.07129 19.2757 0.75 18.4999 0.75H14.4999Z" fill="#363538" />
                                                                                <path d="M10.5 1.75018L10.4624 1.75018C8.81192 1.75018 7.52215 1.75017 6.49047 1.84368C5.44067 1.93883 4.58471 2.13551 3.825 2.57413C2.89008 3.1139 2.11372 3.89026 1.57394 4.82518C1.13532 5.5849 0.938642 6.44085 0.843495 7.49066C0.749991 8.52233 0.749995 9.81211 0.75 11.4626V11.5378C0.749995 13.1883 0.749991 14.478 0.843495 15.5097C0.938642 16.5595 1.13532 17.4155 1.57394 18.1752C2.11372 19.1101 2.89008 19.8865 3.825 20.4262C4.58471 20.8649 5.44067 21.0615 6.49047 21.1567C7.52214 21.2502 8.81191 21.2502 10.4624 21.2502H10.5376C12.1881 21.2502 13.4779 21.2502 14.5095 21.1567C15.5593 21.0615 16.4153 20.8649 17.175 20.4262C18.1099 19.8865 18.8863 19.1101 19.4261 18.1752C19.8647 17.4155 20.0614 16.5595 20.1565 15.5097C20.25 14.478 20.25 13.1883 20.25 11.5378V11.5002C20.25 11.086 19.9142 10.7502 19.5 10.7502C19.0858 10.7502 18.75 11.086 18.75 11.5002C18.75 13.1963 18.7493 14.4182 18.6626 15.3743C18.5769 16.3201 18.4119 16.9318 18.127 17.4252C17.7189 18.1321 17.1319 18.7191 16.425 19.1272C15.9316 19.412 15.3199 19.5771 14.3741 19.6628C13.418 19.7495 12.1961 19.7502 10.5 19.7502C8.80389 19.7502 7.58195 19.7495 6.62587 19.6628C5.6801 19.5771 5.06836 19.412 4.575 19.1272C3.86811 18.7191 3.28111 18.1321 2.87298 17.4252C2.58814 16.9318 2.42309 16.3201 2.33737 15.3743C2.25072 14.4182 2.25 13.1963 2.25 11.5002C2.25 9.80407 2.25072 8.58213 2.33737 7.62605C2.42309 6.68028 2.58814 6.06855 2.87298 5.57518C3.2811 4.86829 3.86811 4.28129 4.575 3.87316C5.06836 3.58832 5.6801 3.42327 6.62587 3.33755C7.58195 3.2509 8.80389 3.25018 10.5 3.25018C10.9142 3.25018 11.25 2.9144 11.25 2.50018C11.25 2.08597 10.9142 1.75018 10.5 1.75018Z" fill="#363538" />
                                                                            </svg>
                                                                        </Link>
                                                                        <CopyButton url={`https://wildberries.ru/catalog/0/search.aspx?search=${product[v.engName]}`} />
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        )
                                                    } 
                                                    if (v.ruName === 'Приоритетный предмет') {
                                                        return (
                                                            <div className={styles.table__rowItem} key={id}>{product[v.engName]}</div>
                                                        )
                                                    }
                                                    return (
                                                        <div className={styles.table__rowItem} key={id}>{formatPrice(product[v.engName], v.units)}</div>
                                                    )
                                                }))}
                                            </div>
                                        )
                                    })}
                                    {tableData && tableData.length === 0 && id === 0 &&
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
                <ConfigProvider theme={memoizedPaginationTheme}>
                    <Pagination
                        defaultCurrent={1}
                        current={tablePaginationState.page}
                        onChange={paginationHandler}
                        total={tablePaginationState.total_pages}
                        pageSize={tablePaginationState.limit}
                        showSizeChanger={false}
                        hideOnSinglePage={true}
                    //showTotal={(total) => `Всего ${total} товаров`}
                    />
                </ConfigProvider>
            </div>
        </>
    )
})

const CopyButton = React.memo(({ url }) => {

    const [isCopied, setIsCopied] = useState(false)

    const copyHandler = useCallback(() => {
        navigator.clipboard.writeText(url).catch(err => console.log('Error'))
        setIsCopied(true)
    }, [url])

    useEffect(() => {
        let timeout;
        if (isCopied) {
            timeout = setTimeout(() => setIsCopied(false), 3000)
        }

        return () => { timeout && clearTimeout(timeout) }
    }, [isCopied])

    return (
        <button className={styles.table__actionButton} onClick={copyHandler} title='Скопировать'>
            {!isCopied &&
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '12px', height: '12px' }}>
                    <path d="M14.8301 3.16626C13.5609 1.89705 11.5031 1.89705 10.2339 3.16626L8.8197 4.58047C8.5268 4.87337 8.05193 4.87337 7.75904 4.58047C7.46614 4.28758 7.46614 3.81271 7.75904 3.51981L9.17325 2.1056C11.0282 0.250608 14.0358 0.250608 15.8908 2.1056C17.7458 3.96059 17.7458 6.96812 15.8908 8.82311L14.4766 10.2373C14.1837 10.5302 13.7088 10.5302 13.4159 10.2373C13.123 9.94443 13.123 9.46956 13.4159 9.17667L14.8301 7.76245C16.0993 6.49325 16.0993 4.43546 14.8301 3.16626Z" fill="#363538" />
                    <path d="M4.57705 7.76246C4.86995 8.05535 4.86995 8.53022 4.57705 8.82312L3.16284 10.2373C1.89364 11.5065 1.89364 13.5643 3.16284 14.8335C4.43204 16.1027 6.48983 16.1027 7.75903 14.8335L9.17325 13.4193C9.46614 13.1264 9.94102 13.1264 10.2339 13.4193C10.5268 13.7122 10.5268 14.1871 10.2339 14.48L8.81969 15.8942C6.9647 17.7492 3.95717 17.7492 2.10218 15.8942C0.24719 14.0392 0.24719 11.0317 2.10218 9.17667L3.51639 7.76246C3.80929 7.46956 4.28416 7.46956 4.57705 7.76246Z" fill="#363538" />
                    <path d="M6.34479 10.5909C6.0519 10.8838 6.0519 11.3587 6.34479 11.6515C6.63769 11.9444 7.11256 11.9444 7.40545 11.6515L11.6481 7.40891C11.941 7.11601 11.941 6.64114 11.6481 6.34825C11.3552 6.05535 10.8803 6.05535 10.5874 6.34825L6.34479 10.5909Z" fill="#363538" />
                </svg>
            }
            {isCopied &&
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.87189 1.1936L3.19356 6.87193L1.30078 4.97916" stroke="#363538" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

            }
        </button>
    )
})
