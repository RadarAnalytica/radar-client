import styles from './barsWidget.module.css';
import { Tooltip, ConfigProvider } from 'antd';
import { useAppSelector } from '../../../../redux/hooks';
import { compareDictionary } from '../../shared';
import { formatPrice } from '../../../../service/utils';


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
    const { isSidebarHidden } = useAppSelector(store => store.utils);

    if (dataStatus.isLoading) {
        return (
            <div className={styles.loaderWrapper}>
                    <span className='loader'></span>
            </div>
        );
    }


    return (
        <div className={isSidebarHidden ? styles.widget : `${styles.widget} ${styles.widget_2cols}`}>
            {skuIndicatorsData && Object.keys(skuIndicatorsData).map((i, id) => {

                return (
                    <div className={styles.bar} key={id}>
                        <p className={styles.bar__text}>{compareDictionary[i].ruName}</p>
                        <p className={styles.bar__title}>{formatPrice(skuIndicatorsData[i], compareDictionary[i].units)}</p>

                        {compareDictionary[i].hasTooltip &&
                            <div className={styles.bar__tooltip}>
                                <ConfigProvider
                                    theme={{
                                        token: {
                                            colorText: '#1A1A1A',
                                            colorTextLightSolid: '#1A1A1A',
                                        }
                                    }}
                                >
                                    <Tooltip
                                        title={compareDictionary[i].tooltipText}
                                        arrow={false}
                                        color='white'
                                    >
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="9.25" stroke="black" strokeOpacity="0.1" strokeWidth="1.5" />
                                            <path d="M9.064 15V7.958H10.338V15H9.064ZM8.952 6.418V5.046H10.464V6.418H8.952Z" fill="#1A1A1A" fillOpacity="0.5" />
                                        </svg>
                                    </Tooltip>
                                </ConfigProvider>
                            </div>
                        }
                    </div>
                );
            })}
        </div>
    );
};

export default BarsWidget;
