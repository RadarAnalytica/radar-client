import styles from './howtoWidget.module.css'

export const HowtoWidget = () => {


    return (
        <div className={styles.widget}>
            <div className={styles.widget__header}>
                <p className={styles.widget__title}>Раздел «Трендовые запросы» — это уникальный инструмент, основанный на наших данных Big Data.</p>
                <p className={styles.widget__text}>Он позволяет выявлять поисковые запросы, а значит и товары, пользующиеся спросом и демонстрирующие восходящий тренд.</p>
            </div>
        </div>
    )
}