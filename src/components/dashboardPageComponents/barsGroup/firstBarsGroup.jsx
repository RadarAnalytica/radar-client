import styles from './barsGroup.module.css'
import Bar from '../bars/bar';
import { differenceInDays } from 'date-fns';

const FirstBarsGroup = ({ dataDashBoard, selectedRange, loading }) => {

    const daysRange = selectedRange.from && selectedRange.to ? differenceInDays(selectedRange.to, selectedRange.from, { unit: 'days' }) : selectedRange.period

    return (
        <div className={styles.group}>
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
                    title='Процент выкупа'
                    buyOut={200000}
                    butOutInPercent={20}
                    loading={loading}
                />
                <Bar
                    fixed={false}
                    title='Средний чек'
                    averageBill={dataDashBoard?.averageBill}
                    averageBillInPercent={dataDashBoard?.averageBillCompare}
                    loading={loading}
                />
            </div>
        </div>
    )
}

export default FirstBarsGroup;