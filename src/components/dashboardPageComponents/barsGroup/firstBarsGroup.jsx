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
                    absoluteValueUnits: '₽'
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
                    absoluteValueUnits: '₽'
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
                }}
                isLoading={loading}
            />
            </div>
            <div className={styles.group__xsBarWrapper}>
                <RadarBar
                    title='Процент выкупа'
                    //tooltipText='text'
                    mainValue={dataDashBoard?.buyoutPercent}
                    mainValueUnits='%'
                    hasColoredBackground
                    compareValue={{
                        comparativeValue: dataDashBoard?.buyoutPercentCompare,
                    }}
                    isLoading={loading}
                />
            </div>
            <div className={styles.group__xsBarWrapper}>
                <RadarBar
                    title='ROI'
                    //tooltipText='text'
                    mainValue={dataDashBoard?.roi}
                    mainValueUnits='%'
                    hasColoredBackground
                    compareValue={{
                        comparativeValue: dataDashBoard?.roi_compare,
                    }}
                    isLoading={loading}
                />
            </div>
        </div>
    );
};

export default FirstBarsGroup;

    {/* <Bar
                title='Заказы'
                amount={dataDashBoard?.orderAmount}
                amountPerDay={dataDashBoard?.orderAmount / daysRange}
                amountInPercent={dataDashBoard?.orderAmountCompare}
                quantity={dataDashBoard?.orderCount}
                quantityPerDay={dataDashBoard?.orderCount / daysRange}
                quantityInPercent={dataDashBoard?.orderCountCompare}
                loading={loading}
            /> */}

               {/* <Bar
                title='Продажи'
                amount={dataDashBoard?.saleAmount}
                amountPerDay={dataDashBoard?.saleAmount / daysRange}
                amountInPercent={dataDashBoard?.saleAmountCompare}
                quantity={dataDashBoard?.saleCount}
                quantityPerDay={dataDashBoard?.saleCount / daysRange}
                quantityInPercent={dataDashBoard?.saleCountCompare}
                loading={loading}
                hasTooltip
                tooltipText='Количество проданных товаров (без возвратов)'
            /> */}

              {/* <Bar
                title='Возвраты'
                amount={dataDashBoard?.returnAmount}
                amountPerDay={dataDashBoard?.returnAmount / daysRange}
                amountInPercent={dataDashBoard?.returnAmountCompare}
                quantity={dataDashBoard?.returnCount}
                quantityPerDay={dataDashBoard?.returnCount / daysRange}
                quantityInPercent={dataDashBoard?.returnCountCompare}
                loading={loading}
            /> */}

              {/* <Bar
                    fixed={false}
                    title='WB Реализовал'
                    averageBill={dataDashBoard?.taxInfo?.wbRealization}
                    loading={loading}
                    hasTooltip
                    tooltipText='Сумма реализации товара с учетом согласованной скидки продавца и СПП'
                /> */}

                  {/* <Bar
                    fixed={false}
                    title='Процент выкупа'
                    buyOut={dataDashBoard?.buyoutPercent}
                    butOutInPercent={dataDashBoard?.buyoutPercentCompare}
                    loading={loading}
                /> */}