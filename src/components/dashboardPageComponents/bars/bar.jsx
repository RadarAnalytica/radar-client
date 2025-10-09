import styles from './bar.module.css';
import { getIcon, getRateIcon, getRateStyle } from '../shared/barUtils';
import { formatPrice } from '../../../service/utils';
import { ConfigProvider, Tooltip } from 'antd';

const Bar = ({ fixed = true, title, amount, amountInPercent, amountPerDay, quantity, quantityInPercent, quantityPerDay, buyOut, butOutInPercent, averageBill, averageBillInPercent, loading, hasTooltip, tooltipText }) => {

    if (loading) {
        return (
            <div className={fixed ? styles.bar : styles.bar_float}>
                <div className={fixed ? styles.bar__loaderWrapper : `${styles.bar__loaderWrapper} ${styles.bar__loaderWrapper_ar}`}>
                    <span className='loader'></span>
                </div>
            </div>
        );
    }

    return (
        <div className={fixed ? styles.bar : styles.bar_float}>
            <div className={styles.bar__iconWrapper}>{getIcon(title)}</div>
            {!hasTooltip && <p className={styles.bar__title}>{title}</p>}
            {hasTooltip &&
                <div className={styles.bar__titleWrapper}>
                    <p className={styles.bar__title}>{title}</p>
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
                </div>
            }
            <div className={styles.bar__mainDataWrapper}>
                {fixed &&
                    <div className={styles.bar__dataWrapper}>
                        <p className={styles.bar__mainData}>{formatPrice(amount, '₽')}</p>
                        <div className={styles.bar__contentWrapper}>
                            <p className={getRateStyle(parseInt(amountInPercent), styles)}>{formatPrice(amountInPercent, '%')}</p>
                            {getRateIcon(amountInPercent)}
                            <p className={`${styles.bar__mainSubData} ${styles.bar__mainSubData_gray}`}>В день ~ {formatPrice(amountPerDay, '₽')}</p>
                        </div>
                    </div>
                }
                {fixed &&
                    <div className={styles.bar__dataWrapper}>
                        <p className={styles.bar__mainData}>{formatPrice(quantity, 'шт')}</p>
                        <div className={styles.bar__contentWrapper}>
                            <p className={getRateStyle(parseInt(quantityInPercent), styles)}>{formatPrice(quantityInPercent, '%')}</p>
                            {getRateIcon(quantityInPercent)}
                            <p className={`${styles.bar__mainSubData} ${styles.bar__mainSubData_gray}`}>В день ~ {formatPrice(quantityPerDay, 'шт')}</p>
                        </div>
                    </div>
                }

                {!fixed && butOutInPercent !== undefined && buyOut !== undefined &&
                    <div className={styles.bar__floatData}>
                        <p className={styles.bar__mainData}>{formatPrice(buyOut, '%')}</p>
                        <div className={styles.bar__contentWrapper}>
                            <p className={getRateStyle(parseInt(butOutInPercent), styles)}>{formatPrice(butOutInPercent, '%')}</p>
                            {getRateIcon(butOutInPercent)}
                        </div>
                    </div>
                }

                {!fixed && averageBill !== undefined &&
                    <div className={styles.bar__floatData}>
                        <p className={styles.bar__mainData}>{formatPrice(averageBill, '₽')}</p>
                    </div>
                }
            </div>
        </div>
    );
};

export default Bar;
