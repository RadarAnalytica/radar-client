import styles from "./keywordsSelectionTableCustomCellRender.module.css";
import wb_icon from './wb_icon.png'

export const keywordsSelectionTableCustomCellRender = (value: any, record: any, index: number, dataIndex: string, serpButtonHandler: (buttonRef: HTMLButtonElement, rowKey: string) => void, isExpanded?: boolean, tableType?: 'Кластеры' | 'По запросам') => {

    if (dataIndex === 'query' && record.rowWithSpan) {
        return <div id={record.cellId} style={{ width: '100%', height: '100%'}}></div>
    }
    if (record.rowWithSpan) {
        return null
    }
    if (dataIndex === 'serp' && ((record.isParent && tableType === 'Кластеры') || (!record.isParent && tableType === 'По запросам'))) {
        return (
            <button
                className={styles.serpCell}
                ref={(ref) => {
                    if (ref) {
                        ref.onclick = () => serpButtonHandler(ref, record.rowKey);
                    }
                }}
            >
                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>
                    <path d="M4.99264 6.05328C5.28553 6.34617 5.76041 6.34617 6.0533 6.05328L10.8263 1.28031C11.1192 0.987415 11.1192 0.512542 10.8263 0.219648C10.5334 -0.073245 10.0585 -0.073245 9.76561 0.219648L6.27297 3.71229L5.5 4.48526L4.77297 3.71229L1.28033 0.219648C0.987437 -0.073245 0.512563 -0.073245 0.21967 0.219648C-0.0732234 0.512542 -0.0732234 0.987415 0.21967 1.28031L4.99264 6.05328Z" fill="#5329FF" />
                </svg>

                SERP
            </button>
        )
    }
    if (dataIndex === 'query' && record.isParent) {
        return (
            <div className={styles.nameCell}>
                <p className={styles.nameCell__title} style={{ fontWeight: '700' }} title={value}>{value}</p>
            </div>
        )
    }

    // if (isExpandedSerp) {
    //     return null
    // }
    if (dataIndex === 'query' && !record.isParent) {
        return (
            <div className={styles.nameCell} style={{ paddingLeft: '30px' }}>
                <img src={wb_icon} alt='wb_icon' width={20} height={20} style={{ transform: 'scale(1.2)' }} />
                <p className={styles.nameCell__title} title={value}>{value}</p>
            </div>
        )
    }
}