import React, { useState, useRef, useEffect } from 'react';
import styles from './tableWidget.module.css';
import { formatPrice } from '../../../../service/utils';
import moment from 'moment';
import { useAppSelector } from '../../../../redux/hooks';
import { TableMiniChart } from '../../features';
import { Link } from 'react-router-dom';
import { sortTableDataFunc } from '../../shared';
import { Table as RadarTable } from 'radar-ui'
import { TableChart } from './tableChart'


//инит стейт сортировки
const initSortState = {
    sortedValue: undefined,
    sortType: undefined,
};

const customCellRender = (value, record, index, dataIndex) => {

    if (dataIndex === 'date') {
        return <>{moment(value).format('DD.MM.YYYY')}</>
    }
    if (dataIndex === 'color_name' || (dataIndex === 'name' && record.photo_url)) {
        return (
            <div className={styles.nameCell}>
                <div className={styles.nameCell__header}>
                    <div className={styles.nameCell__imgWrapper}>
                        <img
                            src={record.photo_url}
                            alt={record.color_name}
                            onError={e => { e.target.style.display = 'none'; }}
                        />
                    </div>
                    <div className={styles.nameCell__titleBlock}>
                        <p className={styles.nameCell__title} title={value}>{value}</p>
                        <div className={styles.table__actionsWrapper}>
                            <Link to={record.url} target='_blank' className={styles.table__actionButton} title='Перейти к товару'>
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '12px', height: '12px' }}>
                                    <path d="M14.4999 0.75C14.0857 0.75 13.7499 1.08579 13.7499 1.5C13.7499 1.91421 14.0857 2.25 14.4999 2.25H18.4999C18.5746 2.25 18.6478 2.25656 18.7189 2.26913L12.0184 8.96967C11.7255 9.26256 11.7255 9.73744 12.0184 10.0303C12.3113 10.3232 12.7861 10.3232 13.079 10.0303L19.7428 3.36653C19.7475 3.41038 19.7499 3.45491 19.7499 3.5V7.5C19.7499 7.91421 20.0857 8.25 20.4999 8.25C20.9141 8.25 21.2499 7.91421 21.2499 7.5V3.5C21.2499 2.7588 20.9567 2.08609 20.4799 1.59155L20.4765 1.58807C19.9765 1.07129 19.2757 0.75 18.4999 0.75H14.4999Z" fill="#363538" />
                                    <path d="M10.5 1.75018L10.4624 1.75018C8.81192 1.75018 7.52215 1.75017 6.49047 1.84368C5.44067 1.93883 4.58471 2.13551 3.825 2.57413C2.89008 3.1139 2.11372 3.89026 1.57394 4.82518C1.13532 5.5849 0.938642 6.44085 0.843495 7.49066C0.749991 8.52233 0.749995 9.81211 0.75 11.4626V11.5378C0.749995 13.1883 0.749991 14.478 0.843495 15.5097C0.938642 16.5595 1.13532 17.4155 1.57394 18.1752C2.11372 19.1101 2.89008 19.8865 3.825 20.4262C4.58471 20.8649 5.44067 21.0615 6.49047 21.1567C7.52214 21.2502 8.81191 21.2502 10.4624 21.2502H10.5376C12.1881 21.2502 13.4779 21.2502 14.5095 21.1567C15.5593 21.0615 16.4153 20.8649 17.175 20.4262C18.1099 19.8865 18.8863 19.1101 19.4261 18.1752C19.8647 17.4155 20.0614 16.5595 20.1565 15.5097C20.25 14.478 20.25 13.1883 20.25 11.5378V11.5002C20.25 11.086 19.9142 10.7502 19.5 10.7502C19.0858 10.7502 18.75 11.086 18.75 11.5002C18.75 13.1963 18.7493 14.4182 18.6626 15.3743C18.5769 16.3201 18.4119 16.9318 18.127 17.4252C17.7189 18.1321 17.1319 18.7191 16.425 19.1272C15.9316 19.412 15.3199 19.5771 14.3741 19.6628C13.418 19.7495 12.1961 19.7502 10.5 19.7502C8.80389 19.7502 7.58195 19.7495 6.62587 19.6628C5.6801 19.5771 5.06836 19.412 4.575 19.1272C3.86811 18.7191 3.28111 18.1321 2.87298 17.4252C2.58814 16.9318 2.42309 16.3201 2.33737 15.3743C2.25072 14.4182 2.25 13.1963 2.25 11.5002C2.25 9.80407 2.25072 8.58213 2.33737 7.62605C2.42309 6.68028 2.58814 6.06855 2.87298 5.57518C3.2811 4.86829 3.86811 4.28129 4.575 3.87316C5.06836 3.58832 5.6801 3.42327 6.62587 3.33755C7.58195 3.2509 8.80389 3.25018 10.5 3.25018C10.9142 3.25018 11.25 2.9144 11.25 2.50018C11.25 2.08597 10.9142 1.75018 10.5 1.75018Z" fill="#363538" />
                                </svg>
                            </Link>
                            <CopyButton url={record.url} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    if (dataIndex === 'revenue_dynamics') {
        return (
            <TableChart data={value} minControlValue={0} maxControlValue={100} />
        )
    }

    if (dataIndex === 'name') {
        return <>{value}</>
    }
    return (
        <></>
    )
}

const TableWidget = ({ data, tableConfig, minRowHeight = '40px' }) => {

    const containerRef = useRef(null); // реф скролл-контейнера (используется чтобы седить за позицией скрола)
    const [tableData, setTableData] = useState(); // данные для рендера таблицы
    const [isXScrolled, setIsXScrolled] = useState(false); // следим за скролом по Х
    const [isEndOfXScroll, setIsEndOfXScroll] = useState(false); // отслеживаем конец скролла по Х
    const [sortState, setSortState] = useState(initSortState); // стейт сортировки (см initSortState)
    const { dataStatus } = useAppSelector(store => store.skuAnalysis);

    //задаем начальную дату и сбрасываем сортировку при изменении данных
    useEffect(() => {
        setTableData(data);
        setSortState(initSortState);
    }, [data]);

    // отслеживаем скролл в контейнере
    const scrollHandler = () => {
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
    };

    // хэндлер сортировки для старой таблицы
    const sortButtonClickHandler = (e, value) => {
        const { id } = e.currentTarget;

        // выключаем сортировку если нажата уже активная клавиша
        if (sortState.sortType === id && sortState.sortedValue === value) {
            setSortState(initSortState);
            setTableData(data);
            return;
        }


        // включаем сортировку и сортируем дату
        setSortState({
            sortedValue: value,
            sortType: id,
        });
        setTableData([...sortTableDataFunc(id, value, data)]);
    };

    // хэндлер сортировки для новой RadarTable
    const handleSort = (sort_field, sort_order) => {
        // Если сортировка снята (undefined), возвращаем исходные данные
        if (!sort_field || !sort_order) {
            setSortState(initSortState);
            setTableData(data);
            return;
        }

        // Обновляем состояние сортировки
        setSortState({
            sortedValue: sort_field,
            sortType: sort_order,
        });

        // Сортируем данные
        const sortedData = sortTableDataFunc(sort_order, sort_field, data);
        setTableData([...sortedData]);
    };

    if (dataStatus.isLoading) {
        return (
            <div className={styles.widget}>
                <div className={styles.widget__loaderWrapper}>
                    <span className='loader'></span>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.widget__tableContainer}>
            <div className={styles.widget} ref={containerRef}>
                <RadarTable
                    key={JSON.stringify(tableData)}
                    dataSource={tableData ?? []}
                    config={tableConfig}
                    preset='radar-table-default'
                    paginationContainerStyle={{ display: 'none' }}
                    customCellRender={{
                        idx: ['date', 'color_name', 'name', 'revenue_dynamics'],
                        renderer: customCellRender
                    }}
                    sorting={{ sort_field: sortState.sortedValue, sort_order: sortState.sortType }}
                    onSort={handleSort}
                    stickyHeader
                    scrollContainerRef={containerRef}
                    bodyCellClassName={styles.bodyCellIndex}
                    headerStyle={{ zIndex: 3}}
                    bodyCellWrapperStyle={{ minHeight: minRowHeight}}
                    headerCellWrapperStyle={{ minHeight: '50px'}}
                />
            </div>
        </div>

    )
};


const CopyButton = ({ url }) => {

    const [isCopied, setIsCopied] = useState(false);

    const copyHandler = () => {
        navigator.clipboard.writeText(url).catch(err => console.log('Error'));
        setIsCopied(true);
    };

    useEffect(() => {
        let timeout;
        if (isCopied) {
            timeout = setTimeout(() => setIsCopied(false), 3000);
        }

        return () => { timeout && clearTimeout(timeout); };
    }, [isCopied]);

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
    );
};




export default TableWidget;

