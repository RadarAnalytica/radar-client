import styles from './profitBlock.module.css';
import { getProfitData } from '../blockUtils';
import { formatPrice } from '../../../../service/utils';
import { Tooltip, ConfigProvider } from 'antd';


const tooltipData = {
    "ROI": 'Расчитана как отношение чистой прибыли к суммарным расходам (себестоимость продаж + расходы на рекламу, логистику, хранение, штрафы, комиссию)',
    "Рентабельность ВП": 'Отношение валовой прибыли к суммарной выручке',
    "Рентабельность ОП": 'Отношение операционной прибыли к суммарной выручке',
};

const ProfitBlock = ({ dataDashBoard, loading }) => {

    const profitData = getProfitData(dataDashBoard);
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
            <p className={styles.block__title}>Прибыльность</p>

            <div className={styles.block__table}>
                {profitData && profitData.map((i, id) => {
                    const tooltip = tooltipData[i.name];
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
                                <p className={styles.block__mainData}>{formatPrice(i.value, '%')}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProfitBlock;
