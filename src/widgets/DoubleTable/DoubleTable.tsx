import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import styles from './DoubleTable.module.css';
import { Table as RadarTable } from 'radar-ui';
import { innerTableConfig, positionCheckTableConfig, positionCheckTableCustomCellRender } from '@/shared';
import DownloadButton from '@/components/DownloadButton';
import { Link } from 'react-router-dom';
import wb_icon from '../../assets/wb_small_main_icon.png';

const mockTableData = [
    {
        query: 'test query',
        frequency: 100,
        total_goods: 100,
        complexity: 'Низкая',
        isParent: true,
        rowKey: 'r1',
        serpCellId: 'cellr1',
        children: [
            {
                query: 'test query 1.1',
                frequency: 200,
                total_goods: 200,
                complexity: 'Средняя',
                rowKey: 'r1.1',
            },
            {
                query: 'test query 1.2',
                frequency: 300,
                total_goods: 300,
                complexity: 'Высокая',
                rowKey: 'r1.2',
            },
            {
                query: 'test query 1.3',
                frequency: 400,
                total_goods: 400,
                complexity: 'Низкая',
                rowKey: 'r1.3',
            },
        ]
    },
    {
        query: 'test query 2',
        frequency: 200,
        total_goods: 200,
        complexity: 'Средняя',
        isParent: true,
        rowKey: 'r2',
        children: [
            {
                query: 'test query 2.1',
                frequency: 200,
                total_goods: 200,
                complexity: 'Средняя',
                rowKey: 'r2.1',
            },
            {
                query: 'test query 2.2',
                frequency: 300,
                total_goods: 300,
                complexity: 'Высокая',
                rowKey: 'r2.2',
            },
            {
                query: 'test query 2.3',
                frequency: 400,
                total_goods: 400,
                complexity: 'Низкая',
                rowKey: 'r2.3',
            },
        ]
    },
    {
        query: 'test query 3',
        frequency: 300,
        total_goods: 300,
        complexity: 'Высокая',
        rowKey: 'r3',
    },
];

export const DoubleTable = () => {

    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [tableData, setTableData] = useState(mockTableData);
    const [isExpandedSerp, setIsExpandedSerp] = useState(false);
    const addedRowsRef = useRef<Record<string, { customRow: HTMLTableRowElement, hiddenRows: HTMLTableRowElement[] }>>({});
    const tableContainerRef = useRef<HTMLDivElement>(null);


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
        setTimeout(() => {
            const hiddenRows: HTMLTableRowElement[] = [];

            // Скрываем следующие 3 строки
            let nextTr = currentTr.nextElementSibling;
            for (let i = 0; i < 3 && nextTr; i++) {
                (nextTr as HTMLElement).style.display = 'none';
                hiddenRows.push(nextTr as HTMLTableRowElement);
                nextTr = nextTr.nextElementSibling;
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

            // Вставляем новую строку после текущей
            currentTr.after(newRow);

            // Рендерим React компонент в контейнер
            const root = ReactDOM.createRoot(container);
            root.render(
                <InnerTable />
            );

            // Сохраняем ссылки для последующего удаления
            addedRowsRef.current[rowKey] = {
                customRow: newRow,
                hiddenRows: hiddenRows
            };
        }, 0);
    };
    return (
        <div className={styles.page__tableWrapper} ref={tableContainerRef}>
            <RadarTable
                rowKey={(record) => record.rowKey}
                config={positionCheckTableConfig}
                dataSource={mockTableData}
                preset='radar-table-default'
                stickyHeader={-1}
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: pagination.total,
                    //onChange: paginationHandler,
                    showQuickJumper: true,
                    hideOnSinglePage: true
                }}
                treeMode
                indentSize={45}
                expandedRowKeys={expandedRowKeys}
                onExpandedRowsChange={handleExpandedRowsChange}
                bodyCellWrapperStyle={{ borderBottom: 'none', padding: '10.5px 12px' }}
                customCellRender={{
                    idx: ['query', 'serp'],
                    renderer: (value, record, index, dataIndex) => positionCheckTableCustomCellRender(
                        value,
                        record,
                        index,
                        dataIndex,
                        serpButtonHandler,
                        isExpandedSerp,
                        expandedRowKeys.includes(record.rowKey)
                    ),
                }}
            />
        </div>
    )
}

export const innerTableMockData = [
    {
        product_name: 'Женское платье, модель 7027',
        views_per_month: 12840,
        reviews: 356,
        rating: 4.7,
        price: 1799,
        position: 1,
    },
    {
        product_name: 'Костюм спортивный, арт. A123',
        views_per_month: 9340,
        reviews: 128,
        rating: 4.4,
        price: 2490,
        position: 5,
    },
    {
        product_name: 'Футболка базовая, цвет белый',
        views_per_month: 15230,
        reviews: 812,
        rating: 4.8,
        price: 799,
        position: 12,
    },
];

export const innerTableCustomCellRender = (value: any, record: any, index: number, dataIndex: string) => {
    if (dataIndex === 'product_name') {
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


const InnerTable = () => {
    return (
        <div className={styles.innerTable}>
            <div className={styles.innerTable__header}>
                <p className={styles.innerTable__headerTitle}>Поисковая выдача по ключу</p>
                {/* <DownloadButton handleDownload={() => { }} loading={false} /> */}
            </div>
            <div className={styles.innerTable__tableWrapper}>
                <RadarTable
                    config={innerTableConfig}
                    dataSource={innerTableMockData}
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
                        idx: ['product_name'],
                        renderer: (value, record, index, dataIndex) => innerTableCustomCellRender(value, record, index, dataIndex),
                    }}
                    paginationContainerStyle={{ display: 'none' }}
                />
            </div>
        </div>
    )
}