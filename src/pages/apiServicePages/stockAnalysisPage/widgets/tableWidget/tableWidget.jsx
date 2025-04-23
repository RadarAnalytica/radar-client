import React, { useRef, useState, useEffect } from 'react'
import styles from './tableWidget.module.css'
import { tableConfig, sortTableDataFunc } from '../../shared'
import { formatPrice } from '../../../../../service/utils'


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



const TableWidget = ({ stockAnalysisFilteredData, loading }) => {

    
    const containerRef = useRef(null) // реф скролл-контейнера (используется чтобы седить за позицией скрола)
    const [ tableData, setTableData ] = useState() // данные для рендера таблицы
    const [isXScrolled, setIsXScrolled] = useState(false) // следим за скролом по Х
    const [isEndOfXScroll, setIsEndOfXScroll] = useState(false) // отслеживаем конец скролла по Х
    const [ sortState, setSortState ] = useState(initSortState) // стейт сортировки (см initSortState)
    

    // задаем начальную дату
    useEffect(() => {
        setTableData(stockAnalysisFilteredData)
    }, [stockAnalysisFilteredData])


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
            setTableData(stockAnalysisFilteredData)
            return
        }


        // включаем сортировку и сортируем дату
        setSortState({
            sortedValue: value,
            sortType: id,
        })
        setTableData([...sortTableDataFunc(id, value, stockAnalysisFilteredData)])
    }

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
        <div className={styles.widget} style={{ borderRadius: isEndOfXScroll ? '16px' : '' }} onScroll={scrollHandler} ref={containerRef}>
            {/* Мапим таблицы в супертаблицу */}
            {tableConfig.map((t, id) => {

                // здесь выбираем стили в зависимости от позиции элемента
                const tableStyle = id === 0 ? `${styles.table} ${styles.table_leftMargin}` : id === tableConfig.length - 1 ? `${styles.table} ${styles.table_rightMargin}` : styles.table;
                const headerStyle = id === 0 ? `${styles.table__header} ${styles.table__header_leftRounded}` : id === tableConfig.length - 1 ? `${styles.table__header} ${styles.table__header_rightRounded}` : styles.table__header;

                return (
                    // Добавляем тень накладывающемуся столбцу при скролле вправо
                    <div className={tableStyle} key={id} style={{ boxShadow: t.tableName === 'О товаре' && isXScrolled ? '10px 0 10px -5px rgba(0, 0, 0, 0.1)' : 'none' }}>

                        {/* Заголовок таблицы. Марджин нужен для второй таблицы у которой нет заголовка (разделено для реализации наложения при боковом скроле) */}
                        <p
                            className={id === 0 ? `${styles.table__title} ${styles.table__title_bigMargin}` : styles.table__title}
                            style={{ marginTop: t.tableName ? 0 : 24 }}
                        >
                            {t.tableName}
                        </p>

                        {/* Хэдер */}
                        <div className={headerStyle}>
                            {/* Мапим массив значений заголовков */}
                            {t.values.map((v, id) => {

                                // определяем необходимые стили
                                const headerCellStyle = v.ruName === 'Товар' ? `${styles.table__headerItem} ${styles.table__headerItem_wide}` : styles.table__headerItem
                                return (
                                    <>
                                    {/* Рендерим айтем заголовка таблицы с кнопками сортировки (если они нужны) */}
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
                                    </>
                                )
                            })}
                        </div>

                            {/* Тело таблицы */}
                        <div className={styles.table__body}>
                            {/* Мапим данные о товарах */}
                            {tableData && tableData.length > 0 && tableData.map((product, id) => {
                                return (
                                    <div 
                                        className={styles.table__row} key={id} id={`table_row_${id}`}
                                        onMouseOver={(e) => {
                                            const { id } = e.target
                                            const rows = document.querySelectorAll(`#${id}`);
                                            if (rows) {
                                                rows.forEach(row => {
                                                    row.style.background = '#F2F2F2'
                                                })
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            const { id } = e.target
                                            const rows = document.querySelectorAll(`#${id}`);
                                            if (rows) {
                                                rows.forEach(row => {
                                                    row.style.background = 'none'
                                                })
                                            }
                                        }}
                                    >
                                        {/* Для каждого товара мапим заголовки таблицы еще раз и забираем из товара нужны данные (в первой колонке одновременно фото и название) */}
                                        {t.values.map(((v, id) => {
                                            if (v.ruName === 'Товар') {
                                                return (
                                                    <div className={`${styles.table__rowItem} ${styles.table__rowItem_wide}`} key={id}>
                                                        <div className={styles.table__rowImgWrapper}>
                                                            <img src={product.photo} width={30} height={40} />
                                                        </div>
                                                        <p className={styles.table__rowTitle}>{product[v.engName]}</p>
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <div className={styles.table__rowItem} key={id}>{v.units ? formatPrice(product[v.engName], v.units) : product[v.engName]}</div>
                                                )
                                            }
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
    )
}

export default TableWidget;