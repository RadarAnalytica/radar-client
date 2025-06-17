import styles from './barsWidget.module.css'
import { Tooltip, ConfigProvider } from 'antd';
import { useAppSelector } from '../../../../redux/hooks';
import { compareDictionary } from '../../shared';
import { formatPrice } from '../../../../service/utils';
import { Bar } from '../../features';



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

const BarsWidget = ({ quantity = 4 }) => {

    //const { skuIndicatorsData, dataStatus } = useAppSelector(store => store.skuAnalysis)
    const { isSidebarHidden } = useAppSelector(store => store.utils)
    let arr = new Array(quantity)
    for (let i = 0; i < quantity; i++) {
        arr[i] = quantity
    }
    arr.forEach(_ => {
        _ = quantity
    })
    // if (!skuIndicatorsData && dataStatus.isLoading) {
    //     return (
    //         <div className={styles.loaderWrapper}>
    //                 <span className='loader'></span>
    //         </div>
    //     )
    // }


    return (
        <div className={isSidebarHidden ? styles.widget : `${styles.widget} ${styles.widget_2cols}`}>
            {arr.map((_, id) => {

                return (
                    <Bar
                        key={id}
                        rating={id === arr.length - 1}
                        titleColor={id === 0 ? '#5329FF' : ''}
                    />
                )
            })}
        </div>
    )
}

export default BarsWidget;