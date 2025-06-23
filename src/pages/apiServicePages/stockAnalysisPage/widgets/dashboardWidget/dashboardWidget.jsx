import styles from './dashboardWidget.module.css'
import { Bars } from '../../features'

const DashboardWidget = () => {
    return (
        <div className={styles.widget}>

            <div className={`${styles.widget__layout} ${styles.widget__layout_4cols}`}>
                <Bars.MainBar
                    title='Продажи'
                />
                <Bars.MainBar
                    title='Себестоимость проданных товаров'
                />
                <Bars.MainBar
                    title='Возвраты'
                />
                <div className={`${styles.widget__layout} ${styles.widget__layout_3rows}`}>
                    <Bars.SimpleBar title='Штрафы WB' amount={0} units='₽' />
                    <Bars.SimpleBar title='Доплаты WB' amount={0} units='₽' />
                    <Bars.SimpleBar title='Комиссия WB' amount={4675} units='₽' />
                </div>
            </div>

            <div className={`${styles.widget__layout} ${styles.widget__layout_3cols}`}>
                <Bars.RateBar />
                <Bars.RateBar />
                <Bars.RateBar />
            </div>

            <div className={`${styles.widget__layout} ${styles.widget__layout_2cols}`}>
                <Bars.TableBar />
                <Bars.TableBar />
            </div>

            <div className={`${styles.widget__layout} ${styles.widget__layout_3cols}`}>
                <Bars.ChartBar />
                <Bars.ChartBar />
                <Bars.ChartBar />
            </div>
        </div>
    )
}

export default DashboardWidget