import styles from './barsWidget.module.css'
import Bar from '../../features/bar/bar';

const BarsWidget = () => {

    return (
        <section className={styles.widget}>
            <Bar.Medium title='test' data={1000} units='₽' />
            <Bar.Medium title='test' data={1000} />
            <Bar.Medium title='test' data={1000} rate={-2} />
            <Bar.Medium title='test' data={1000} rate={20} />
            <div className={styles.widget__largeBarWrapper}>
                <Bar.Large />
            </div>
            <div className={styles.widget__largeBarWrapper}>
                <Bar.Large />
            </div>
            <div className={styles.widget__smallBarsWrapper}>
                <Bar.Small title='test' data={1000} />
                <Bar.Small title='test' data={1000} />
                <Bar.Small title='test' data={1000} />
            </div>
            
        </section>
    )
}

export default BarsWidget;