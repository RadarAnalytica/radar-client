import styles from './barsGroup.module.css'
import Bar from '../bars/bar';
import { differenceInDays } from 'date-fns';
import { useAppSelector } from '../../../redux/hooks';

const FirstBarsGroup = ({ dataDashBoard, selectedRange, loading }) => {
    const { isSidebarHidden } = useAppSelector(store => store.utils)

    const daysRange = selectedRange.from && selectedRange.to ? differenceInDays(selectedRange.to, selectedRange.from, { unit: 'days' }) : selectedRange.period
    return (
        <div className={isSidebarHidden ? styles.group : styles.group_openSidebar}>
            <Bar
                title='Заказы'
                amount={dataDashBoard?.orderAmount}
                amountPerDay={dataDashBoard?.orderAmount / daysRange}
                amountInPercent={dataDashBoard?.orderAmountCompare}
                quantity={dataDashBoard?.orderCount}
                quantityPerDay={dataDashBoard?.orderCount / daysRange}
                quantityInPercent={dataDashBoard?.orderCountCompare}
                loading={loading}
            />
            <Bar
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
            />
            <Bar
                title='Возвраты'
                amount={dataDashBoard?.returnAmount}
                amountPerDay={dataDashBoard?.returnAmount / daysRange}
                amountInPercent={dataDashBoard?.returnAmountCompare}
                quantity={dataDashBoard?.returnCount}
                quantityPerDay={dataDashBoard?.returnCount / daysRange}
                quantityInPercent={dataDashBoard?.returnCountCompare}
                loading={loading}
            />
            <div className={styles.group__wrapper}>
                <Bar
                    fixed={false}
                    title='WB Реализовал'
                    averageBill={dataDashBoard?.taxInfo?.wbRealization}
                    loading={loading}
                    hasTooltip
                    tooltipText='Сумма реализации товара с учетом согласованной скидки продавца и СПП'
                />
                {/* <Bar
                    fixed={false}
                    title='Средний чек'
                    averageBill={dataDashBoard?.averageBill}
                    averageBillInPercent={dataDashBoard?.averageBillCompare}
                    loading={loading}
                /> */}
                <Bar
                    fixed={false}
                    title='Процент выкупа'
                    buyOut={dataDashBoard?.buyoutPercent}
                    butOutInPercent={dataDashBoard?.buyoutPercentCompare}
                    loading={loading}
                />
            </div>
        </div>
    )
}

export default FirstBarsGroup;