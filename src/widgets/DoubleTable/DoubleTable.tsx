import { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import styles from './DoubleTable.module.css';
import { Table as RadarTable } from 'radar-ui';
import { innerTableConfig, positionCheckTableCustomCellRender, RadarLoader, keywordsSelectionTableCustomCellRender } from '@/shared';
import { ServiceFunctions } from '@/service/serviceFunctions';
import wb_icon from '../../assets/wb_small_main_icon.png';



interface IDoubleTableProps {
    tableData: any[];
    dest: number;
    authToken?: string;
    tableType: 'Кластеры' | 'По запросам';
    tableConfig: any[];
    page: 'position' | 'keywords';
}

export const DoubleTable: React.FC<IDoubleTableProps> = ({ tableData, dest, authToken, tableType, tableConfig, page }) => {

    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: Math.ceil(tableData.length / 20) });
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const addedRowsRef = useRef<Record<string, { customRow: HTMLTableRowElement, hiddenRows: HTMLTableRowElement[] }>>({});
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false);


    const getSerpData = async (query: string) => {
        const res = await ServiceFunctions.getSERPDataForPositionCheck(authToken ?? '', { dest, query });
        if (!res.ok) {
            setIsLoading(false);
            return undefined;

        }
        setIsLoading(false);
        return await res.json();
    }


    //pagination handler
    const paginationHandler = (page: number) => {
        expandedRowKeys.forEach(key => {
            const serpRow = document.getElementById('serp-row-' + key);
            if (serpRow) {
                serpRow.remove();
            }
        });
        setExpandedRowKeys([]);
        setPagination({
            ...pagination,
            current: page,
        });
        tableContainerRef.current?.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const handleExpandedRowsChange = (keys: string[]) => {
        // Находим строки, которые были свернуты
        const collapsedKeys = expandedRowKeys.filter(key => !keys.includes(key));

        // Удаляем добавленные строки для свернутых родителей
        collapsedKeys.forEach(key => {
            const addedRowData = addedRowsRef.current[key];
            if (addedRowData) {
                // Удаляем кастомную строку
                addedRowData.customRow.remove();

                // Показываем скрытые строки
                addedRowData.hiddenRows.forEach(row => {
                    row.style.display = '';
                });

                // Удаляем из ref
                delete addedRowsRef.current[key];
            }
        });

        setExpandedRowKeys(keys);
    };

    const serpButtonHandler = (buttonRef: HTMLButtonElement, rowKey: string) => {
        const currentRow = tableData.find((row: any) => row.rowKey === rowKey);
        if (!currentRow) return;

        // Тоггл: если уже раскрыто — закрываем и очищаем кастомные элементы
        if (expandedRowKeys.includes(rowKey)) {
            setExpandedRowKeys(prev => prev.filter(key => key !== rowKey));
            const addedRowData = addedRowsRef.current[rowKey];
            if (addedRowData) {
                addedRowData.customRow.remove();
                addedRowData.hiddenRows.forEach(row => {
                    row.style.display = '';
                });
                delete addedRowsRef.current[rowKey];
            }
            return;
        }

        // Раскрываем строку
        setExpandedRowKeys(prev => [...prev, currentRow.rowKey]);

        // Находим tr в которой лежит кнопка
        const currentTr = buttonRef.closest('tr');
        if (!currentTr) return;

        // Ждем рендеринг раскрытых строк
        setTimeout(async () => {
            setIsLoading(true);
            const hiddenRows: HTMLTableRowElement[] = [];
            // Скрываем следующие 3 строки
            let nextTr = currentTr.nextElementSibling;
            if (currentRow.children?.length) {
                for (let i = 0; i < currentRow.children.length && nextTr; i++) {
                    (nextTr as HTMLElement).style.display = 'none';
                    hiddenRows.push(nextTr as HTMLTableRowElement);
                    nextTr = nextTr.nextElementSibling;
                }

            }



            const serpData = await getSerpData(currentRow.query);
            if (!serpData) {
                return;
            }

            // Создаем новую строку с кастомным рендером
            const newRow = document.createElement('tr');
            const newCell = document.createElement('td');
            // Устанавливаем colSpan равным количеству ячеек в текущей строке,
            // чтобы не ломать раскладку таблицы
            const cellsCount = currentTr.querySelectorAll('td, th').length || 1;
            newCell.colSpan = 6;

            // Создаем контейнер для React компонента
            const container = document.createElement('div');
            newCell.appendChild(container);
            newRow.appendChild(newCell);
            newRow.setAttribute('id', 'serp-row-' + currentRow.rowKey);

            // Вставляем новую строку после текущей
            currentTr.after(newRow);

            // Рендерим React компонент в контейнер
            const root = ReactDOM.createRoot(container);
            root.render(
                <InnerTable tableData={serpData} />
            );

            // Сохраняем ссылки для последующего удаления
            addedRowsRef.current[rowKey] = {
                customRow: newRow,
                hiddenRows: hiddenRows
            };
        }, 0);
    };



    // Получаем данные для текущей страницы
    const startIndex = (pagination.current - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    const paginatedData = tableData.slice(startIndex, endIndex);

    useEffect(() => {
        setPagination({
            ...pagination,
            total: Math.ceil(tableData.length / 10)
        });
    }, [tableData]);


    useEffect(() => {
        expandedRowKeys.forEach(key => {
            const serpRow = document.getElementById('serp-row-' + key);
            if (serpRow) {
                serpRow.remove();
            }
        });
        setExpandedRowKeys([]);
    }, [tableType]);

    return (
        <div className={styles.page__tableWrapper} ref={tableContainerRef}>
            <RadarTable
                rowKey={(record) => record.rowKey}
                config={tableConfig}
                dataSource={paginatedData}
                preset='radar-table-default'
                stickyHeader={-1}
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: pagination.total,
                    onChange: paginationHandler,
                    showQuickJumper: true,
                    hideOnSinglePage: true
                }}
                treeMode
                indentSize={45}
                expandedRowKeys={expandedRowKeys}
                onExpandedRowsChange={handleExpandedRowsChange}
                bodyCellWrapperStyle={{ borderBottom: tableType === 'Кластеры' ? 'none' : '1px solid #E8E8E8', padding: '10.5px 12px' }}
                customCellRender={{
                    idx: ['query', 'serp'],
                    renderer: (value, record, index, dataIndex) => {
                        if (page === 'position') {
                            return positionCheckTableCustomCellRender(
                                value,
                                record,
                                index,
                                dataIndex,
                                serpButtonHandler,
                                expandedRowKeys.includes(record.rowKey),
                                tableType as 'Кластеры' | 'По запросам'
                            )
                        }

                        if (page === 'keywords') {
                            return keywordsSelectionTableCustomCellRender(
                                value,
                                record,
                                index,
                                dataIndex,
                                serpButtonHandler,
                                expandedRowKeys.includes(record.rowKey),
                                tableType as 'Кластеры' | 'По запросам'
                            )
                        }
                    }
                }}
            />
            <div className={styles.page__loaderWrapper} style={{ display: isLoading ? 'flex' : 'none' }}>
                <RadarLoader loaderStyle={{ height: '100%' }} />
            </div>
        </div>
    )
}



export const innerTableCustomCellRender = (value: any, record: any, index: number, dataIndex: string) => {
    if (dataIndex === 'name') {
        return (
            <div className={styles.nameCell}>
                <div className={styles.nameCell__header}>
                    <div className={styles.nameCell__imgWrapper}>
                        <img
                            src={record.wb_id_image_link}
                            alt={record.name}
                            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                    </div>
                    <div className={styles.nameCell__titleBlock}>
                        <p className={styles.nameCell__title} title={value}>{value}</p>
                        <a href={`https://www.wildberries.ru/catalog/${record.wb_id}/detail.aspx`} target='_blank' className={styles.nameCell__skuBlock}>
                            <img src={wb_icon} alt='wb_icon' width={20} height={20} style={{ transform: 'scale(1.2)' }} />
                            {record.wb_id}
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

const interTableDataToTableDataDto = (tableData: any[]) => {
    return tableData.map((row, idx) => ({
        ...row,
        rowKey: 'inner' + row.query + '_' + idx,
    }));
}


const InnerTable = ({ tableData }: { tableData: any[] }) => {
    return (
        <div className={styles.innerTable}>
            <div className={styles.innerTable__header}>
                <p className={styles.innerTable__headerTitle}>Поисковая выдача по ключу</p>
                {/* <DownloadButton handleDownload={() => { }} loading={false} /> */}
            </div>
            <div className={styles.innerTable__tableWrapper}>
                <RadarTable
                    config={innerTableConfig}
                    dataSource={interTableDataToTableDataDto(tableData || [])}
                    headerCellWrapperStyle={{
                        borderTop: '1px solid #E8E8E8',
                        borderBottom: '1px solid #E8E8E8',
                        fontSize: '14px',
                        color: '#8C8C8C',
                        fontWeight: 500,
                        padding: '12px 16px',

                    }}
                    bodyCellWrapperStyle={{
                        borderBottom: '1px solid #E8E8E8',
                        backgroundColor: 'transparent',
                        padding: '8px 12px',
                        fontSize: '14px',
                        fontWeight: 500,
                        height: '76px'
                    }}
                    customCellRender={{
                        idx: ['name'],
                        renderer: (value, record, index, dataIndex) => innerTableCustomCellRender(value, record, index, dataIndex),
                    }}
                    paginationContainerStyle={{ display: 'none' }}
                />
            </div>
        </div>
    )
}