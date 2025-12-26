import { useState, useEffect, useContext, memo } from 'react';
import styles from './stockAnalysisBlock.module.css';
import { Link } from 'react-router-dom';
import { stockAnalysisTableConfig, CONFIG_VER } from './stockAnalysisBlockTableConfig';
import { Table as RadarTable } from 'radar-ui';
import { sortTableDataFunc } from '../../../../pages/apiServicePages/stockAnalysisPage/shared/utils/tableUtils';
import { TableWidget } from '@/pages/apiServicePages/stockAnalysisPage/widgets';
import AuthContext from '@/service/AuthContext';
import { useDemoMode } from "@/app/providers";
import { useAppSelector } from '@/redux/hooks';
import { ServiceFunctions } from '@/service/serviceFunctions';
import { useLoadingProgress } from '@/service/hooks/useLoadingProgress';
import { CURR_STOCK_ANALYSIS_TABLE_CONFIG_VER } from '@/pages/apiServicePages/stockAnalysisPage/shared';

const StockAnalysisBlock = memo(({ dashboardLoading, dragHandle, data}) => {

    const { authToken } = useContext(AuthContext);
    const { isDemoMode } = useDemoMode();
    const { activeBrand, selectedRange } = useAppSelector((state) => state.filters);
    const filters = useAppSelector((state) => state.filters);
    const [stockAnalysisData, setStockAnalysisData] = useState(null); // это базовые данные для таблицы
    const [stockAnalysisFilteredData, setStockAnalysisFilteredData] = useState(null); // это данные для таблицы c учетом поиска
    const [hasSelfCostPrice, setHasSelfCostPrice] = useState(false);
    const [loading, setLoading] = useState(false);
    const progress = useLoadingProgress({ loading });
   

    // const fetchAnalysisData = async () => {
    //     setLoading(true);
    //     setStockAnalysisData([]);
    //     setStockAnalysisFilteredData([]);
    //     progress.start();
    //     try {
    //         const data = await ServiceFunctions.getAnalysisData(
    //             authToken,
    //             selectedRange,
    //             activeBrand?.id,
    //             filters
    //         );

    //         progress.complete();
    //         await setTimeout(() => {
    //             setStockAnalysisData(data);
    //             setStockAnalysisFilteredData(data);
    //             setHasSelfCostPrice(data.every(_ => _.costPriceOne !== null));
    //             setLoading(false);
    //             progress.reset();
    //         }, 500);
    //     } catch (error) {
    //         setLoading(false);
    //         progress.reset();
    //         console.error(error);
    //     }
    // };

    // useEffect(() => {
    //     if (filters.activeBrand) {
    //         fetchAnalysisData();
    //     }
    // }, [filters]);

    // раскоментить когда введем днд (данные буду фетчится в основной странице дашборда)
    useEffect(() => {
        if (data) {
            setStockAnalysisData(data);
            setStockAnalysisFilteredData(data);
            setHasSelfCostPrice(data.every(_ => _.costPriceOne !== null));
        }
    }, [data]);



    if (dashboardLoading) {
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
                <div className={styles.block__headerRight}>
                    <Link to='/stock-analysis' target='_blank' className={styles.block__mainLink}>
                        Смотреть подробнее
                    </Link>
                    {dragHandle && dragHandle()}
                </div>
            </div>
            <TableWidget
                stockAnalysisFilteredData={stockAnalysisFilteredData || []}
                loading={dashboardLoading}
                progress={progress.value}
                //config={stockAnalysisTableConfig}
                configVersion={CURR_STOCK_ANALYSIS_TABLE_CONFIG_VER}
                configKey='STOCK_ANALYSIS_TABLE_CONFIG'
                initPaginationState={{ current: 1, total: 1, pageSize: 10 }}
                hasShadow={false}
                maxHeight={720}
            />
        </div>
    );
})

export default StockAnalysisBlock;
