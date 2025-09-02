import { useState } from 'react'
import styles from './stockAnalysisBlock.module.css'
import { Link } from 'react-router-dom'
import { stockAnalysisTableConfig } from './stockAnalysisBlockTableConfig'
import { Table as RadarTable } from 'radar-ui';
import 'radar-ui/dist/style.css';
import { sortTableDataFunc } from '../../../../pages/apiServicePages/stockAnalysisPage/shared/utils/tableUtils';

const StockAnalysisBlock = ({ data, loading }) => {

    const [tableConfig, setTableConfig] = useState(stockAnalysisTableConfig)
    const [sortState, setSortState] = useState({sort_field: undefined, sort_order: undefined}) // стейт сортировки (см initSortState)
    const [paginationState, setPaginationState] = useState({ current: 1, total: 50, pageSize: 50 });

    const onResizeGroup = (columnKey, width) => {
        console.log('Column resized:', columnKey, width);

        // Обновляем конфигурацию колонок с группированной структурой
        const updateColumnWidth = (columns) => {
            return columns.map(col => {
                // Если это группа с children
                if (col.children && col.children.length > 0) {
                    const updatedChildren = updateColumnWidth(col.children);

                    // Всегда пересчитываем ширину группы на основе суммы ширин дочерних колонок
                    const totalWidth = updatedChildren.reduce((sum, child) => sum + (child.width || child.minWidth), 0);
                    return { ...col, width: totalWidth, minWidth: totalWidth, children: updatedChildren };
                }

                // Если это листовая колонка
                if (col.key === columnKey) {
                    return { ...col, width: width, minWidth: width };
                }

                return col;
            });
        };

        // Обновляем состояние
        setTableConfig(prevConfig => {
            const updatedConfig = updateColumnWidth(prevConfig)
            const normalizedTableConfig = updatedConfig.map(item => ({
                ...item,
                render: undefined,
                children: item.children.map(child => ({
                    ...child,
                    render: undefined
                }))
            }))
            localStorage.setItem('MonitoringTableConfig', JSON.stringify(normalizedTableConfig))
            return updatedConfig
        });
    };

    if (loading) {
        return (
            <div className={styles.block}>
                <div className={styles.bar__loaderWrapper}>
                    <span className='loader'></span>
                </div>
            </div>
        )
    }
    return (
        <div className={styles.block}>
            <div className={styles.block__titleWrapper}>
                <p className={styles.block__title}>
                    Аналитика по товарам
                </p>
                <Link to='/abc-data' className={styles.block__mainLink}>
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle opacity="0.2" cx="12.5" cy="12" r="12" fill="#9A81FF" />
                        <rect opacity="0.4" x="5" y="4.5" width="15" height="15" rx="7.5" fill="#9A81FF" />
                        <rect x="5.4" y="4.9" width="14.2" height="14.2" rx="7.1" stroke="#9A81FF" strokeWidth="0.8" />
                        <circle cx="12.6002" cy="11.6998" r="1.8" fill="white" stroke="#5030E5" strokeWidth="1.2" />
                    </svg>
                    Смотреть подробнее
                </Link>
            </div>

            <div className={styles.block__table}>
                <RadarTable
                    dataSource={sortTableDataFunc(sortState.sort_order, sortState.sort_field, [])}
                    preset='radar-table-simple'
                    config={tableConfig}
                    resizeable
                    stickyHeader
                    onResize={onResizeGroup}
                    onSort={(sort_field, sort_order) => {
                        console.log('sorting', { sort_field, sort_order }) 
                    }}
                    pagination={{
                        current: paginationState.current,
                        pageSize: paginationState.pageSize,
                        total: paginationState.total,
                        onChange: (page, pageSize) => {
                            console.log('pagination', { page, pageSize }) 
                            setPaginationState({...paginationState, current: page, pageSize: pageSize})
                        },
                        showQuickJumper: true,
                    }}
                    paginationContainerStyle={{
                        bottom: 0
                    }}
                    headerStyle={{
                        backgroundColor: '#F7F6FE',
                        height: 1,
                    }}
                    headerCellClassName={styles.tableHeaderCell}
                    headerGroupCellClassName={styles.tableHeaderGroup}
                    headerCellWrapperClassName={styles.tableHeaderCellWrapper}
                    headerCellWrapperStyle={{
                        backgroundColor: '#F7F6FE',
                    }}
                />
            </div>
        </div>
    )
}

export default StockAnalysisBlock