// Dont forget to renew imports
import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import styles from './tableWidget.module.css';
// Возможно будет удобнее передавать конфиг пропсом
import { tableConfig, newTableConfig } from './config';
import { sortTableDataFunc } from './utils';
import { formatPrice } from '@/service/utils';
import { ConfigProvider, Pagination } from 'antd';
import DownloadButton from '@/components/DownloadButton';
import { fileDownload } from '@/service/utils';
import { Link } from 'react-router-dom';
import { Table as RadarTable } from 'radar-ui';
import wb_icon from './wb_icon.png';
import { useTableColumnResize } from '@/service/hooks';

const customCellRender = (value, record, index, dataIndex) => {
    if (dataIndex === 'query') {
        return (
            <div className={styles.customCell__query}>
                <Link className={styles.customCell__queryTitle} to={`/trend-analysis?query=${value}`} target='_blank' title={value}>{value}</Link>
                <div className={styles.customCell__linksWrapper}>
                    <Link
                        className={styles.customCell__link}
                        target='_blank'
                        to={`https://wildberries.ru/catalog/0/search.aspx?search=${value}`}
                        title='Перейти к товару на ВБ'
                    >
                        <img src={wb_icon} width={20} height={20} alt='wb_icon' />
                    </Link>
                    <CopyButton url={`https://wildberries.ru/catalog/0/search.aspx?search=${value}`} />
                </div>
            </div>
        )
    }
    return <div>{value}</div>;
};

const CopyButton = React.memo(({ url }) => {

    const [isCopied, setIsCopied] = useState(false);

    const copyHandler = useCallback(() => {
        navigator.clipboard.writeText(url).catch(err => console.log('Error'));
        setIsCopied(true);
    }, [url]);

    useEffect(() => {
        let timeout;
        if (isCopied) {
            timeout = setTimeout(() => setIsCopied(false), 3000);
        }

        return () => { timeout && clearTimeout(timeout); };
    }, [isCopied]);

    return (
        <button className={styles.table__actionButton} onClick={copyHandler} title='Скопировать в буфер обмена'>
            {!isCopied &&
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.8617 2.13847C10.804 1.0808 9.08918 1.0808 8.03151 2.13847L6.853 3.31698C6.60893 3.56106 6.2132 3.56106 5.96912 3.31698C5.72504 3.0729 5.72504 2.67717 5.96912 2.43309L7.14763 1.25458C8.69346 -0.291241 11.1997 -0.291241 12.7456 1.25458C14.2914 2.80041 14.2914 5.30669 12.7456 6.85251L11.567 8.03102C11.323 8.2751 10.9272 8.2751 10.6832 8.03102C10.4391 7.78695 10.4391 7.39122 10.6832 7.14714L11.8617 5.96863C12.9193 4.91096 12.9193 3.19614 11.8617 2.13847Z" fill="#8C8C8C" />
                    <path d="M3.31747 5.96863C3.56154 6.21271 3.56154 6.60844 3.31747 6.85251L2.13896 8.03103C1.08129 9.0887 1.08129 10.8035 2.13896 11.8612C3.19663 12.9189 4.91145 12.9189 5.96912 11.8612L7.14763 10.6827C7.39171 10.4386 7.78743 10.4386 8.03151 10.6827C8.27559 10.9268 8.27559 11.3225 8.03151 11.5666L6.853 12.7451C5.30718 14.2909 2.8009 14.2909 1.25507 12.7451C-0.290753 11.1992 -0.290753 8.69297 1.25507 7.14714L2.43358 5.96863C2.67766 5.72455 3.07339 5.72455 3.31747 5.96863Z" fill="#8C8C8C" />
                    <path d="M4.79058 8.32566C4.5465 8.56973 4.5465 8.96546 4.79058 9.20954C5.03466 9.45362 5.43039 9.45362 5.67447 9.20954L9.21 5.67401C9.45408 5.42993 9.45408 5.0342 9.21 4.79012C8.96592 4.54604 8.57019 4.54604 8.32612 4.79012L4.79058 8.32566Z" fill="#8C8C8C" />
                </svg>

            }
            {isCopied && <div>{'Скопировано!'}</div>}
        </button>
    );
});


export const TableWidget = React.memo(({ rawData, loading, tablePaginationState, setRequestState, requestState, initRequestStatus, setRequestStatus, setSortState, sortState, initSortState }) => {

    const containerRef = useRef(null); // реф скролл-контейнера (используется чтобы седить за позицией скрола)
    const [tableData, setTableData] = useState(); // данные для рендера таблицы
    const [isXScrolled, setIsXScrolled] = useState(false); // следим за скролом по Х
    const [isEndOfXScroll, setIsEndOfXScroll] = useState(false); // отслеживаем конец скролла по Х
    const [isExelLoading, setIsExelLoading] = useState(false);
    
    // Используем хук для управления изменением размеров колонок
    const { config: currentTableConfig, onResize: onResizeGroup } = useTableColumnResize(newTableConfig);

    // задаем начальную дату
    useEffect(() => {
        setTableData(rawData);
    }, [rawData]);

    useEffect(() => {
        const paginationNextButton = document.querySelector('.ant-pagination-jump-next');
        const paginationPrevButton = document.querySelector('.ant-pagination-jump-prev');
        const paginationSingleNextButton = document.querySelector('.ant-pagination-next');
        const paginationSinglePrevButton = document.querySelector('.ant-pagination-prev');
        if (paginationNextButton) {
            paginationNextButton.setAttribute('title', 'Следующие 5 страниц');
        }
        if (paginationSingleNextButton) {
            paginationSingleNextButton.setAttribute('title', 'Следующая страница');
        }
        if (paginationSinglePrevButton) {
            paginationSinglePrevButton.setAttribute('title', 'Предыдущая страница');
        }
        if (paginationPrevButton) {
            paginationPrevButton.setAttribute('title', 'Предыдущие 5 страниц');
        }
    }, [tablePaginationState]);

    const paginationHandler = useCallback((page) => {
        setRequestState({ ...requestState, page });
    }, [requestState, setRequestState]);

    // отслеживаем скролл в контейнере
    const scrollHandler = useCallback(() => {
        if (containerRef && containerRef.current) {

            // если скроллим вправо
            if (containerRef.current.scrollLeft > 1) {
                setIsXScrolled(true);
            } else {
                setIsXScrolled(false);
            }

            // вычисляем достиг ли скролл конца справа
            const delta = containerRef.current.scrollWidth - (containerRef.current.scrollLeft + containerRef.current.clientWidth);
            if (delta < 16) {
                setIsEndOfXScroll(true);
            } else {
                setIsEndOfXScroll(false);
            }
        }
    }, []);

    // хэндлер сортировки
    const sortButtonClickHandler = useCallback((sort_field, sort_order) => {

        // выключаем сортировку если нажата уже активная клавиша
        if (sortState.sortType === sort_order && sortState.sortedValue === sort_field) {
            setSortState(initSortState);
            setRequestState({ ...requestState, sorting: { sort_field: 'frequency', sort_order: 'DESC' }, page: 1, limit: 25 });
            return;
        }

        setSortState({
            sortedValue: sort_field,
            sortType: sort_order,
        });
        setRequestState({ ...requestState, sorting: { sort_field, sort_order }, page: 1, limit: 25 });
    }, [sortState, rawData]);

    const downloadButtonHandler = useCallback(async () => {
        setIsExelLoading(true);
        try {
            let res = await fetch(`https://radarmarket.ru/api/web-service/trending-queries/download`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify(requestState)
            });

            if (!res.ok) {
                setIsExelLoading(false);
                return setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось скачать таблицу.' });
            }

            const blob = await res.blob();
            fileDownload(blob, "Поиск_трендовых_запросов.xlsx", setIsExelLoading);

        } catch {
            setIsExelLoading(false);
            setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось скачать таблицу.' });
        }
    }, [requestState, initRequestStatus, setRequestStatus]);

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
    }), []);

    if (loading) {
        return (
            <div className={styles.widget}>
                <div className={styles.widget__loaderWrapper}>
                    <span className='loader'></span>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className={styles.widget__dlButtonWrapper}>
                <p className={styles.widget__dlButtonWrapperTitle}>Трендовые запросы</p>
                <DownloadButton
                    loading={isExelLoading}
                    handleDownload={downloadButtonHandler}
                />
            </div>
            <div className={styles.widget__wrapper} style={{ display: 'none' }}>
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
                                            const headerCellStyle = v.ruName === 'Товар' ? `${styles.table__headerItem} ${styles.table__headerItem_wide}` : styles.table__headerItem;
                                            return (
                                                <div className={headerCellStyle} key={id}>
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
                                            );
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
                                                                    {/* <p className={styles.table__rowTitle}>{product[v.engName]}</p> */}
                                                                    <Link
                                                                        className={styles.table__rowTitle}
                                                                        style={{ textDecoration: 'none' }}
                                                                        to={`/trend-analysis?query=${product[v.engName]}`}
                                                                        target='_blank'
                                                                    >
                                                                        {product[v.engName]}
                                                                    </Link>
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
                                                        );
                                                    }
                                                    if (v.ruName === 'Приоритетный предмет') {
                                                        return (
                                                            <div className={styles.table__rowItem} key={id}>{product[v.engName]}</div>
                                                        );
                                                    }

                                                    if (v.units === '%' && product[v.engName] < 0) {
                                                        return (
                                                            <div className={styles.table__rowItem} key={id}>{formatPrice(product[v.engName], v.units)}</div>
                                                        );
                                                    }

                                                    if (v.units === '%' && product[v.engName] >= 0) {
                                                        return (
                                                            <div className={styles.table__rowItem} key={id}>
                                                                <span style={{ marginLeft: 8 }}>{formatPrice(product[v.engName], v.units)}</span>
                                                            </div>
                                                        );
                                                    }


                                                    return (
                                                        <div className={styles.table__rowItem} key={id}>{formatPrice(product[v.engName], v.units)}</div>
                                                    );
                                                }))}
                                            </div>
                                        );
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
                        );
                    })}

                </div>
            </div>

            <div className={styles.widget__wrapper}>
                {tableData && currentTableConfig &&
                    <div className={styles.widget} ref={containerRef}>
                        <RadarTable
                            preset='radar-table-default'
                            config={currentTableConfig}
                            dataSource={tableData}
                            resizeable
                            onResize={onResizeGroup}
                            sorting={{ sort_field: sortState?.sortedValue, sort_order: sortState?.sortType }}
                            onSort={sortButtonClickHandler}
                            pagination={{
                                current: tablePaginationState.page,
                                pageSize: tablePaginationState.limit,
                                total: tablePaginationState.total_pages,
                                onChange: (page, pageSize) => {
                                    paginationHandler(page);
                                },
                                showQuickJumper: true,
                                hideOnSinglePage: true,
                            }}
                            onSortChange={sortButtonClickHandler}
                            scrollContainerRef={containerRef}
                            customCellRender={{
                                idx: ['query'],
                                renderer: customCellRender
                            }}
                            bodyRowClassName={styles.bodyRowSpecial}
                        />
                    </div>
                }
            </div>
        </>
    );
});
