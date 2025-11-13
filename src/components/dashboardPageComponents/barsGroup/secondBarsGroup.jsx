import styles from './secondBarsGroup.module.css';
import SmallBar from '../bars/smallBar';
import { useAppSelector } from '../../../redux/hooks';
import { RadarBar } from '../../../shared/ui/RadarBar/RadarBar';
import TurnoverBlock from '../blocks/turnoverBlock/turnoverBlock';

const SecondBarsGroup = ({ dataDashBoard, loading, selectedRange, activeBrand, authToken, filters }) => {
    return (
        <div className={styles.group}>
            <RadarBar
                title='Заказы'
                midValue={dataDashBoard?.orderCount}
                tooltipText='Общие сумма и количество созданных и оплаченных заказов за выбранный период'
                midValueUnits='шт'
                mainValue={dataDashBoard?.orderAmount}
                mainValueUnits='₽'
                hasColoredBackground
                compareValue={{
                    comparativeValue: dataDashBoard?.orderAmountCompare,
                    absoluteValue: dataDashBoard?.prev_order_amount,
                    absoluteValueUnits: '₽',
                    tooltipText: 'Значение предыдущего периода'
                }}
                isLoading={loading}
            />
            <RadarBar
                title='Возвраты'
                tooltipText='Стоимость и количество товаров, которые покупатели вернули по различным причинам'
                midValue={dataDashBoard?.returnCount}
                midValueUnits='шт'
                mainValue={dataDashBoard?.returnAmount}
                mainValueUnits='₽'
                hasColoredBackground
                compareValue={{
                    comparativeValue: dataDashBoard?.returnAmountCompare,
                    absoluteValue: dataDashBoard?.prev_return_amount,
                    absoluteValueUnits: '₽',
                    tooltipText: 'Значение предыдущего периода'
                }}
                isLoading={loading}
            />
            <RadarBar
                title='Расходы на логистику'
                tooltipText='Суммарные расходы на логистику, определяются расчетным способом от количества заказов'
                mainValue={dataDashBoard?.logistics}
                hasColoredBackground
                compareValue={{
                    comparativeValue: dataDashBoard?.logisticsCompare,
                    absoluteValue: dataDashBoard?.prev_logistics,
                    absoluteValueUnits: '₽',
                    tooltipText: 'Значение предыдущего периода'
                }}
                isLoading={loading}
            />
            <RadarBar
                title='Хранение'
                tooltipText='Расходы на хранение товаров на складах WB'
                mainValue={dataDashBoard?.storageData}
                hasColoredBackground
                compareValue={{
                    comparativeValue: dataDashBoard?.storageDataCompare,
                    absoluteValue: dataDashBoard?.prev_storageData,
                     absoluteValueUnits: '₽',
                     tooltipText: 'Значение предыдущего периода'
                }}
                isLoading={loading}
            />
            <RadarBar
                title='Платная приемка'
                tooltipText='Услуга маркетплейса по проверке и приему вашего товара на склад'
                mainValue={dataDashBoard?.paid_acceptance}
                mainValueUnits='₽'
                isLoading={loading}
                compareValue={{
                    comparativeValue: dataDashBoard?.paid_acceptance_compare,
                    absoluteValue: dataDashBoard?.prev_paid_acceptance,
                    absoluteValueUnits: '₽',
                    tooltipText: 'Значение предыдущего периода'
                }}
            />
            <RadarBar
                title='Комиссия'
                tooltipText='Суммарная комиссия маркетплейса, рассчитывается от суммарного объема продаж по коэффициентам, определенным Wildberries'
                mainValue={dataDashBoard?.commissionWB}
                mainValueUnits='₽'
                hasColoredBackground
                compareValue={{
                    comparativeValue: dataDashBoard?.commissionWBCompare,
                    absoluteValue: dataDashBoard?.prev_commissionWB,
                    absoluteValueUnits: '₽',
                    tooltipText: 'Значение предыдущего периода'
                }}
                isLoading={loading}
            />
            <RadarBar
                title='Налог'
                mainValue={dataDashBoard?.tax_amount}
                mainValueUnits='₽'
                isLoading={loading}
                compareValue={{
                    comparativeValue: dataDashBoard?.taxCompare,
                    absoluteValue: dataDashBoard?.prev_tax,
                    absoluteValueUnits: '₽',
                    tooltipText: 'Значение предыдущего периода'
                }}
            />
            <RadarBar
                title='Реклама (ДРР)'
                mainValue={dataDashBoard?.advertAmount}
                tooltipText='Показатель эффективности маркетинга - сумма рекламных затрат'
                mainValueUnits='₽'
                hasColoredBackground
                compareValue={{
                    comparativeValue: dataDashBoard?.advertAmountCompare,
                    absoluteValue: dataDashBoard?.prev_advertAmount,
                    absoluteValueUnits: '₽',
                    tooltipText: 'Значение предыдущего периода'
                }}
                isLoading={loading}
            />
            <RadarBar
                title='Штрафы и прочие удержания'
                tooltipText={'К прочим удержания отнесены: платежи по договору займа, предоставление услуг по подписке «Джем», страхование заказов, услуги по размещению рекламного материала, списания за отзывы, утилизации товара'}
                mainValue={dataDashBoard?.penalty}
                mainValueUnits='₽'
                isLoading={loading}
                compareValue={{
                    comparativeValue: dataDashBoard?.penalty_compare,
                    absoluteValue: dataDashBoard?.prev_penalty,
                    absoluteValueUnits: '₽',
                    tooltipText: 'Значение предыдущего периода'
                }}
            />
            <RadarBar
                title='Компенсации'
                tooltipText='Выплаты от маркетплейса за брак, потерю или повреждение вашего товара на их складах, а также за нарушение сроков выплат'
                mainValue={dataDashBoard?.compensation}
                mainValueUnits='₽'
                isLoading={loading}
                compareValue={{
                    comparativeValue: dataDashBoard?.compensation_compare,
                    absoluteValue: dataDashBoard?.prev_compensation,
                    absoluteValueUnits: '₽',
                    tooltipText: 'Значение предыдущего периода'
                }}
            />
            <RadarBar
                title='Ср. стоимость логистики на 1 шт'
                tooltipText='Логистика на единицу проданного товара'
                mainValue={dataDashBoard?.logistic_per_one}
                mainValueUnits='₽'
                isLoading={loading}
                compareValue={{
                    comparativeValue: dataDashBoard?.logistic_per_one_compare,
                    absoluteValue: dataDashBoard?.prev_logistic_per_one,
                    absoluteValueUnits: '₽',
                    tooltipText: 'Значение предыдущего периода'
                }}
            />
            <RadarBar
                title='Средняя прибыль на 1 шт'
                tooltipText='Прибыль на единицу проданного товара'
                mainValue={dataDashBoard?.profit_per_one}
                mainValueUnits='₽'
                compareValue={{
                    comparativeValue: dataDashBoard?.profit_per_one_compare,
                    absoluteValue: dataDashBoard?.prev_profit_per_one,
                    absoluteValueUnits: '₽',
                    tooltipText: 'Значение предыдущего периода'
                }}
                isLoading={loading}
            />



            <div className={styles.group__3cols}>
                <RadarBar
                    title='Упущенные продажи'
                    tooltipText='Расчетная величина, определенная как произведение средней скорости продаж на количество дней, в которых товар отсутствовал на полках магазина или на складе'
                    mainValue={dataDashBoard?.lostSalesAmount}
                    mainValueUnits='₽'
                    compareValue={{
                        comparativeValue: dataDashBoard?.lost_sales_amount_compare,
                        absoluteValue: dataDashBoard?.prev_lostSalesAmount,
                        absoluteValueUnits: '₽',
                        tooltipText: 'Значение предыдущего периода'
                    }}
                    isLoading={loading}
                />
                <RadarBar
                    title='Себестоимость проданных товаров'
                    tooltipText='Суммарная себестоимость проданных товаров (основана на данных раздела "Себестоимость"'
                    mainValue={dataDashBoard?.costPriceAmount}
                    mainValueUnits='₽'
                    compareValue={{
                        comparativeValue: dataDashBoard?.costPriceAmountCompare,
                        absoluteValue: dataDashBoard?.prev_costPriceAmount,
                        absoluteValueUnits: '₽',
                        tooltipText: 'Значение предыдущего периода'
                    }}
                    isLoading={loading}
                />
                <TurnoverBlock
                    loading={loading}
                    turnover={dataDashBoard?.turnover}
                    selectedRange={selectedRange}
                    activeBrand={activeBrand}
                    authToken={authToken}
                    filters={filters}
                    turnoverCompare={dataDashBoard?.turnover_compare}
                    prevTurnover={dataDashBoard?.prev_turnover}
                />
            </div>
        </div>
    );
};

export default SecondBarsGroup;