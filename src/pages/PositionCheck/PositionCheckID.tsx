import React, { useRef } from 'react';
import ReactDOM from 'react-dom/client';
import styles from "./PositionCheckID.module.css";
import Header from '@/components/sharedComponents/header/header';
import MobilePlug from '@/components/sharedComponents/mobilePlug/mobilePlug';
import Sidebar from '@/components/sharedComponents/sidebar/sidebar';
import Breadcrumbs from '@/components/sharedComponents/header/headerBreadcrumbs/breadcrumbs';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useDemoMode } from '@/app/providers';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { actions as skuAnalysisActions } from '@/redux/skuAnalysis/skuAnalysisSlice';
import { ConfigProvider, Segmented } from 'antd';
import ErrorModal from '@/components/sharedComponents/modals/errorModal/errorModal';
import NoSubscriptionWarningBlock from '@/components/sharedComponents/noSubscriptionWarningBlock/noSubscriptionWarningBlock';
import { RadarBar, RadarProductBar, positionCheckTableConfig, positionCheckTableCustomCellRender } from '@/shared';
import { formatPrice } from '@/service/utils';
import { PositionCheckFilters } from '@/widgets';
import DownloadButton from '@/components/DownloadButton';
import { Table as RadarTable } from 'radar-ui';
import { DoubleTable } from '@/widgets';

// antd segmented theme
const segmentedTheme = {
    token: {
        fontSize: 12,
        fontWeight: 500,
    },
    components: {
        Segmented: {
            itemActiveBg: '#5329FF1A',
            itemSelectedBg: '#5329FF1A',
            trackBg: 'transparent',
            trackPadding: 0,
            itemHoverBg: '#5329FF10',
            itemColor: '#1A1A1A80',
            itemSelectedColor: '#1A1A1A',
            itemHoverColor: '#1A1A1A',
        }
    }
}

const mockMainData = {
    "wb_id": 361059312,
    "wb_id_url": "https://www.wildberries.ru/catalog/361059312/detail.aspx",
    "wb_id_name": "Женский эротический костюм (сетка, цвет 7027, один размер)",
    "photo_urls": [
        "https://basket-21.wbbasket.ru/vol3610/part361059/361059312/images/c246x328/1.webp",
        "https://basket-21.wbbasket.ru/vol3610/part361059/361059312/images/c246x328/2.webp",
        "https://basket-21.wbbasket.ru/vol3610/part361059/361059312/images/c246x328/3.webp"
    ],
    "subject_name": "Платья эротик",
    "price": 1076.19,
    "brand_name": "",
    "brand_url": "https://www.wildberries.ru/brands/uknown",
    "supplier_name": "环球智慧供应链（深圳）有限公司",
    "supplier_url": "https://www.wildberries.ru/seller/4205242",
    "created_date": "2025-03-17",
    "color_amount": 1,
    "color_revenue_percent": 100,
    "color_balance_percent": 100,
    "evaluation": 4.5
}

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

const PositionCheckID = () => {
    const params = useParams();
    const dispatch = useAppDispatch();
    const { isDemoMode } = useDemoMode();
    const { selectedRange, isFiltersLoaded } = useAppSelector(store => store.filters);
    //const { dataStatus, skuMainTableData, skuByColorTableData, skuByWarehouseTableData, skuBySizeTableData } = useAppSelector(store => store.skuAnalysis);
    const [loading, setLoading] = useState(false);
    const [requestObject, setRequestObject] = useState<Record<string, any>>({});
    const [tableType, setTableType] = useState<'Кластеры' | 'По запросам'>('Кластеры');
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [tableData, setTableData] = useState(mockTableData);
    const [ isExpandedSerp, setIsExpandedSerp] = useState(false);
    const addedRowsRef = useRef<Record<string, { customRow: HTMLTableRowElement, hiddenRows: HTMLTableRowElement[] }>>({});
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    
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

        console.log('currentTr', currentTr);

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
            newCell.colSpan = 5;
            newCell.style.padding = '20px';
            newCell.style.backgroundColor = '#f5f5f5';
            
            // Создаем контейнер для React компонента
            const container = document.createElement('div');
            newCell.appendChild(container);
            newRow.appendChild(newCell);

            // Вставляем новую строку после текущей
            currentTr.after(newRow);
            
            // Рендерим React компонент в контейнер
            const root = ReactDOM.createRoot(container);
            root.render(
                <div style={{ minHeight: '200px', border: '2px solid red', padding: '20px' }}>
                    <h3>Кастомный React компонент</h3>
                    <p>Row Key: {rowKey}</p>
                    {/* Здесь можете вставить любой свой компонент */}
                </div>
            );
            
            // Сохраняем ссылки для последующего удаления
            addedRowsRef.current[rowKey] = {
                customRow: newRow,
                hiddenRows: hiddenRows
            };
        }, 100);
    };

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
                    <Header
                        /* @ts-ignore */
                        title={
                            /* @ts-ignore */
                            <Breadcrumbs
                                config={[
                                    { slug: '/position-check', name: 'Проверка позиций' },
                                    { name: `Товар ${params?.id}` },
                                ]}
                            />
                        }
                        titlePrefix={null}
                        children={null}
                        videoReviewLink={null}
                        howToLink={null}
                        howToLinkText={null}
                        hasShadow={false}
                    />
                </div>
                {/* !header */}

                {isDemoMode && <NoSubscriptionWarningBlock />}

                <div className={styles.page__productBarWrapper}>
                    {/* Photo block */}
                    <RadarProductBar data={mockMainData} isLoading={loading} />
                    {/* Additional data */}
                    <div className={styles.info}>
                        <div className={styles.info__column}>
                            <p className={styles.info__row}>
                                Артикул <span className={styles.info__color_black}>{mockMainData.wb_id}</span>
                            </p>
                            <p className={styles.info__row}>
                                Предмет <span className={styles.info__color_purple}>{mockMainData.subject_name}</span>
                            </p>
                            <p className={styles.info__row}>
                                Оценка <span className={styles.info__color_black}>{mockMainData.evaluation}</span>
                            </p>
                        </div>

                        <div className={styles.info__column}>
                            <p className={styles.info__row}>
                                Отзывы <span className={styles.info__color_black}>{formatPrice(mockMainData.color_balance_percent, '%')}</span>
                            </p>
                            <Link className={styles.info__link} to={mockMainData.supplier_url} target='_blank'>
                                Продавец <span className={styles.info__color_purple}>{mockMainData.supplier_name}</span>
                            </Link>
                            <Link to={mockMainData.wb_id_url} target='_blank' className={styles.info__mainLink}>Посмотреть на WB</Link>
                        </div>
                    </div>
                </div>
                {/* Bars */}
                <div className={styles.page__barsWrapper}>
                    <RadarBar title='Видимость' isLoading={loading} mainValue={42.91} mainValueUnits='%' />
                    <RadarBar title='Средняя позиция' isLoading={loading} mainValue={98} mainValueUnits='' />
                    <RadarBar title='Просмотры в месяц, шт' isLoading={loading} mainValue={10283} mainValueUnits='' />
                </div>
                {/* Filters */}
                <div className={styles.page__filtersWrapper}>
                    <PositionCheckFilters submitHandler={(formData) => { setRequestObject(formData); }} />
                    <DownloadButton handleDownload={() => { }} loading={false} />
                </div>
                {/* Table */}
                <div className={styles.page__tableWrapper}>
                    <ConfigProvider theme={segmentedTheme}>
                        <Segmented options={['Кластеры', 'По запросам']} size='large' value={tableType} onChange={(value) => setTableType(value as 'Кластеры' | 'По запросам')} />
                    </ConfigProvider>
                    <div className={styles.page__summary}>
                        <p className={styles.page__summaryItem}>Найдено ключей: <span>65</span></p>
                        <p className={styles.page__summaryItem}>Кластеров: <span>15</span></p>
                    </div>

                    <DoubleTable />

                    {/* <div className={styles.page__tableWrapper} ref={tableContainerRef}>
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
                    </div> */}
                </div>
            </section>
            {/* ---------------------- */}
            {/* <ErrorModal
                open={false}
                footer={null}
                onOk={() => {
                    dispatch(skuAnalysisActions.setDataStatus({ isLoading: false, isError: false, message: '' }));
                    navigate('/sku-analysis');
                }}
                onClose={() => {
                    dispatch(skuAnalysisActions.setDataStatus({ isLoading: false, isError: false, message: '' }));
                    navigate('/sku-analysis');
                }}
                onCancel={() => {
                    dispatch(skuAnalysisActions.setDataStatus({ isLoading: false, isError: false, message: '' }));
                    navigate('/sku-analysis');
                }}
                message={dataStatus.message}
            /> */}
        </main>
    );
};

export default PositionCheckID;