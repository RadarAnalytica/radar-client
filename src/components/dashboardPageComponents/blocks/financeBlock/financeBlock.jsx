import styles from './financeBlock.module.css';
import { getFinanceData } from '../blockUtils';
import { formatPrice } from '../../../../service/utils';
import { getRateIcon } from '../../shared/barUtils';
import { Tooltip, ConfigProvider } from 'antd';

const getRateStyle = (amount, styles) => {
    let style = '';
    if (amount > 0) {
        style = `${styles.block__mainSubData} ${styles.block__mainSubData_green}`;
    }
    if (amount < 0) {
        style = `${styles.block__mainSubData} ${styles.block__mainSubData_red}`;
    }
    if (amount === 0) {
        style = `${styles.block__mainSubData} ${styles.block__mainSubData_gray}`;
    }
    return style;
};

const tooltipData = {
    "Выручка": 'Сумма, заработанная при продаже товаров',
    "Валовая прибыль": 'Разность между выручкой и себестоимостью продаж',
    "Чистая прибыль": 'Прибыль, остающаяся после уплаты налогов, сборов, отчислений',
    "EBITDA": "EBITDA — это показатель прибыли до вычета процентов, налогов, амортизации и износа, показывающий операционную рентабельность",
    "Маржа EBITDA": "Маржа EBITDA — это процент от выручки, который остаётся после вычета операционных расходов, но до налогов, процентов и износа"
};

const FinanceBlock = ({ dataDashBoard, loading }) => {
    const financeData = getFinanceData(dataDashBoard);

    if (loading) {
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
            <p className={styles.block__title}>Финансы</p>

            <div className={styles.block__table}>
                {financeData && financeData.map((i, id) => {
                    const tooltip = tooltipData[i.name];
                    const units = i.name === 'Маржа EBITDA' ? '%' : '₽';
                    return (
                    <div className={styles.block__tableRow} key={id}>
                        <div className={styles.block__tableRowTitle}>
                            {i.name}
                            {tooltip &&
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
                                    title={tooltip}
                                >

                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.bar__tooltipIcon}>
                                        <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="9.25" stroke="black" strokeOpacity="0.1" strokeWidth="1.5" />
                                        <path d="M9.064 15V7.958H10.338V15H9.064ZM8.952 6.418V5.046H10.464V6.418H8.952Z" fill="#1A1A1A" fillOpacity="0.5" />
                                    </svg>

                                </Tooltip>
                            </ConfigProvider>}
                        </div>
                        <div className={styles.block__tableRowContent}>
                            <p className={i.amount > 1000000000 ? `${styles.block__mainData} ${styles.block__mainData_small}` : styles.block__mainData}>{formatPrice(i.amount, units)}</p>
                            <div className={styles.block__secDataWrapper}>
                                {getRateIcon(i.rate)}
                                <p className={getRateStyle(parseInt(i.rate), styles)}>{formatPrice(i.rate, '%')}</p>
                            </div>
                        </div>
                    </div>
                );})}
            </div>
        </div >
    );
};

export default FinanceBlock;
