import styles from './smallBar.module.css'
import { Tooltip, ConfigProvider } from 'antd';
import { formatPrice } from '../../../service/utils';
import { getRateIcon, getRateStyle } from '../shared/barUtils';

const SmallBar = ({
    title, //string
    hasTooltip, //boolean
    tooltipText, //string
    loading, //boolean
    mainData, // number | undef
    hasSecondaryData, // boolean
    secondaryDataType, // 'absolute' | 'relative'
    secondaryDataUnits, // string (eg "шт", "%" or whatever)
    secondaryData // number | undef
}) => {

    if (loading) {
        return (
            <div className={styles.bar}>
                <div className={styles.bar__loaderWrapper}>
                    <span className='loader'></span>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.bar}>
            <div className={styles.bar__titleWrapper}>
                <p className={styles.bar__title}>{title}</p>
                {hasTooltip && tooltipText &&
                    <ConfigProvider
                        theme={{
                            token: {
                                colorTextLightSolid: '#1A1A1A'
                            }
                        }}
                    >
                        <Tooltip
                            arrow={false}
                            color='white'
                            title={tooltipText}
                        >

                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.bar__tooltipIcon}>
                                <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="9.25" stroke="black" strokeOpacity="0.1" strokeWidth="1.5" />
                                <path d="M9.064 15V7.958H10.338V15H9.064ZM8.952 6.418V5.046H10.464V6.418H8.952Z" fill="#1A1A1A" fillOpacity="0.5" />
                            </svg>

                        </Tooltip>
                    </ConfigProvider>
                }
            </div>
            <div className={styles.bar__dataWrapper}>
                <p className={styles.bar__mainData}>{formatPrice(mainData, '₽')}</p>

                {hasSecondaryData && secondaryDataType === 'absolute' && !!secondaryData &&
                    <p className={styles.bar__absoluteData}>{formatPrice(secondaryData, secondaryDataUnits)}</p>
                }
                {hasSecondaryData && secondaryDataType === 'relative' && !!secondaryData &&
                    <div className={styles.bar__secDataWrapper}>
                        {getRateIcon(secondaryData)}
                        <p className={getRateStyle(parseInt(secondaryData), styles)}>{formatPrice(secondaryData, secondaryDataUnits)}</p>
                    </div>
                }
            </div>

        </div>
    )
}

export default SmallBar;