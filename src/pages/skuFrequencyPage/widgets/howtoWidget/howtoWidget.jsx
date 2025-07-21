import styles from './howtoWidget.module.css'




export const HowtoWidget = () => {


    return (
        <div className={styles.widget}>
            <div className={styles.widget__header}>
                <p className={styles.widget__title}>«Поиск прибыльной ниши» – инструмент для анализа спроса и конкуренции</p>
                <p className={styles.widget__text}>Уникальный инструмент с детализированными фильтрами, который помогает находить наиболее прибыльные и низкоконкурентные запросы — а значит, и подходящие товары и ниши.</p>
            </div>
        </div>
    )
}