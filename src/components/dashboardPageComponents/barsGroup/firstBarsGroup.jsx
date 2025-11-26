import styles from './firstBarsGroup.module.css';
import Bar from '../bars/bar';
import { differenceInDays } from 'date-fns';
import { useAppSelector } from '../../../redux/hooks';
import { RadarBar } from '../../../shared/ui/RadarBar/RadarBar';

const FirstBarsGroup = ({ dataDashBoard, selectedRange, loading }) => {

    const daysRange = selectedRange.from && selectedRange.to ? differenceInDays(selectedRange.to, selectedRange.from, { unit: 'days' }) : selectedRange.period;
    return (
        <div className={styles.group}>
            <div className={styles.group__lgBarWrapper}>
            <RadarBar
                title='Чистая прибыль'
                tooltipText='Прибыль, остающаяся после уплаты налогов, сборов, отчислений'
                mainValue={dataDashBoard?.netProfit}
                mainValueUnits='₽'
                hasColoredBackground
                compareValue={{
                    comparativeValue: dataDashBoard?.netProfitCompare,
                    absoluteValue: dataDashBoard?.prev_net_profit,
                    absoluteValueUnits: '₽',
                    tooltipText: 'Значение предыдущего периода'
                }}
                isLoading={loading}
            />
            </div>
            <div className={styles.group__lgBarWrapper}>
            <RadarBar
                title='Продажи'
                tooltipText='Количество проданных товаров (без возвратов)'
                midValue={dataDashBoard?.saleCount}
                midValueUnits='шт'
                mainValue={dataDashBoard?.saleAmount}
                mainValueUnits='₽'
                hasColoredBackground
                compareValue={{
                    comparativeValue: dataDashBoard?.saleAmountCompare,
                    absoluteValue: dataDashBoard?.prev_sale_amount,
                    absoluteValueUnits: '₽',
                    tooltipText: 'Значение предыдущего периода'
                }}
                isLoading={loading}
            />
            </div>
            <div className={styles.group__sBarWrapper}>
            <RadarBar
                title='WB Реализовал'
                tooltipText='Сумма реализации товара с учетом согласованной скидки продавца и СПП'
                midValueUnits='₽'
                mainValue={dataDashBoard?.taxInfo?.wbRealization}
                mainValueUnits='₽'
                hasColoredBackground
                compareValue={{
                    comparativeValue: dataDashBoard?.wb_realization_compare,
                    absoluteValue: dataDashBoard?.prev_wb_realization,
                    absoluteValueUnits: '₽',
                    tooltipText: 'Значение предыдущего периода'
                }}
                isLoading={loading}
            />
            </div>
            <div className={styles.group__xsBarWrapper}>
                <RadarBar
                    title='Процент выкупа'
                    tooltipText='Доля заказов, которые были оплачены и получены покупателями, от общего числа созданных заказов.'
                    mainValue={dataDashBoard?.buyoutPercent}
                    mainValueUnits='%'
                    hasColoredBackground
                    compareValue={{
                        comparativeValue: dataDashBoard?.buyoutPercentCompare,
                        absoluteValue: dataDashBoard?.prev_buyoutPercent,
                        absoluteValueUnits: '%',
                        tooltipText: 'Значение предыдущего периода'
                    }}
                    isLoading={loading}
                />
            </div>
            <div className={styles.group__xsBarWrapper}>
                <RadarBar
                    title='ROI'
                    tooltipText='Показывает общую рентабельность ваших вложений. Насколько прибыльны или убыточны ваши продажи с учетом всех затрат'
                    mainValue={dataDashBoard?.roi}
                    mainValueUnits='%'
                    hasColoredBackground
                    compareValue={{
                        comparativeValue: dataDashBoard?.roi_compare,
                        absoluteValue: dataDashBoard?.prev_roi,
                        absoluteValueUnits: '%',
                        tooltipText: 'Значение предыдущего периода'
                    }}
                    isLoading={loading}
                />
            </div>
        </div>
    );
};

export default FirstBarsGroup;