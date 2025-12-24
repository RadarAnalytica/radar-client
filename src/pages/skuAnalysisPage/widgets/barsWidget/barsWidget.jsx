import styles from './barsWidget.module.css';
import { Tooltip, ConfigProvider } from 'antd';
import { useAppSelector } from '../../../../redux/hooks';
import { compareDictionary } from '../../shared';
import { formatPrice } from '../../../../service/utils';
import { RadarBar } from '@/shared';


/**
 * {
  "revenue": 14471205,
  "orders": 9153,
  "revenue_potential": 16434852.5,
  "revenue_lost": 0,
  "availability_percent": 100,
  "avg_orders": 305,
  "avg_revenue": 482373.5,
  "supplier_buyout_percent": 94
}
 */

const BarsWidget = () => {

    const { skuIndicatorsData, dataStatus } = useAppSelector(store => store.skuAnalysis);

    if (dataStatus.isLoading) {
        return (
            <div className={styles.loaderWrapper}>
                <span className='loader'></span>
            </div>
        );
    }


    return (
        <>
            <div className={styles.widget}>
                {skuIndicatorsData && Object.keys(skuIndicatorsData).map((i, id) => {
                    return (
                        <RadarBar
                            key={id}
                            title={compareDictionary[i]?.ruName}
                            mainValue={skuIndicatorsData[i]}
                            mainValueUnits={compareDictionary[i]?.units}
                            isLoading={dataStatus?.isLoading}
                            tooltipText={compareDictionary[i]?.tooltipText}
                        />
                    )
                })}
            </div>
        </>
    );
};

export default BarsWidget;
