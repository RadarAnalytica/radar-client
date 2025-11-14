import { useState, useEffect, useContext } from 'react';
import styles from './stockAnalysisBlock.module.css';
import { Link } from 'react-router-dom';
import { stockAnalysisTableConfig } from './stockAnalysisBlockTableConfig';
import { Table as RadarTable } from 'radar-ui';
import { sortTableDataFunc } from '../../../../pages/apiServicePages/stockAnalysisPage/shared/utils/tableUtils';
import { TableWidget } from '@/pages/apiServicePages/stockAnalysisPage/widgets';
import AuthContext from '@/service/AuthContext';
import { useDemoMode } from "@/app/providers";
import { useAppSelector } from '@/redux/hooks';
import { ServiceFunctions } from '@/service/serviceFunctions';
import { useLoadingProgress } from '@/service/hooks/useLoadingProgress';

const StockAnalysisBlock = ({ dashboardLoading }) => {

    const { authToken } = useContext(AuthContext);
    const { isDemoMode } = useDemoMode();
    const { activeBrand, selectedRange } = useAppSelector((state) => state.filters);
    const filters = useAppSelector((state) => state.filters);
    const [stockAnalysisData, setStockAnalysisData] = useState([]); // это базовые данные для таблицы
    const [stockAnalysisFilteredData, setStockAnalysisFilteredData] = useState(); // это данные для таблицы c учетом поиска
    const [hasSelfCostPrice, setHasSelfCostPrice] = useState(false);
    const [loading, setLoading] = useState(true);
    const progress = useLoadingProgress({ loading });

    const fetchAnalysisData = async () => {
        setLoading(true);
        setStockAnalysisData([]);
        setStockAnalysisFilteredData([]);
        progress.start();
        try {
            const data = await ServiceFunctions.getAnalysisData(
                authToken,
                selectedRange,
                activeBrand?.id,
                filters
            );

            progress.complete();
            await setTimeout(() => {
                setStockAnalysisData(data);
                setStockAnalysisFilteredData(data);
                setHasSelfCostPrice(data.every(_ => _.costPriceOne !== null));
                setLoading(false);
                progress.reset();
            }, 500);
        } catch (error) {
            setLoading(false);
            progress.reset();
            console.error(error);
        }
    };

    useEffect(() => {
        if (filters.activeBrand) {
            fetchAnalysisData();
        }
    }, [filters]);

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
                    return { ...col, width: width };
                }

                return col;
            });
        };

        // Обновляем состояние
        setTableConfig(prevConfig => {
            const updatedConfig = updateColumnWidth(prevConfig);
            const normalizedTableConfig = updatedConfig.map(item => ({
                ...item,
                render: undefined,
                children: item.children.map(child => ({
                    ...child,
                    render: undefined
                }))
            }));
            localStorage.setItem('MonitoringTableConfig', JSON.stringify(normalizedTableConfig));
            return updatedConfig;
        });
    };

    if (loading || dashboardLoading) {
        return (
            <div className={styles.block}>
                <div className={styles.bar__loaderWrapper}>
                    <span className='loader'></span>
                </div>
            </div>
        );
    }
    return (
        <div className={styles.block}>
            <div className={styles.block__titleWrapper}>
                <p className={styles.block__title}>
                    Аналитика по товарам
                </p>
                <Link to='/stock-analysis' target='_blank' className={styles.block__mainLink}>
                    Смотреть подробнее
                </Link>
            </div>

            <TableWidget
                stockAnalysisFilteredData={stockAnalysisFilteredData || []}
                loading={loading || dashboardLoading}
                progress={progress.value}
                config={stockAnalysisTableConfig}
                configVersion={'1'}
                initPaginationState={{ current: 1, total: 1, pageSize: 5 }}
                hasShadow={false}
            />
        </div>
    );
};

export default StockAnalysisBlock;
