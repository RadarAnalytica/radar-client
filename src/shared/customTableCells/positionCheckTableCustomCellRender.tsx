import styles from "./positionCheckCustomCellRender.module.css";
import { Link } from "react-router-dom";
import wb_icon from './wb_icon.png'

export const positionCheckTableCustomCellRender = (value: any, record: any, index: number, dataIndex: string, serpButtonHandler: (key: string, cellId: string) => void, isExpandedSerp: boolean) => {

    if (dataIndex === 'query' && record.rowWithSpan) {
        return <div id={record.cellId} style={{ width: '100%', height: '100%', border: '2px solid red' }}></div>
    }
    if (record.rowWithSpan) {
        return null
    }
    if (dataIndex === 'serp' && record.isParent) {
        return (
            <button className={styles.serpCell} onClick={() => {serpButtonHandler(record.rowKey, record.serpCellId); console.log('button clicked', record.rowKey, record.serpCellId)}}>
                SERP
            </button>
        )
    }
    if (dataIndex === 'query' && record.isParent) {
        return (
            <div className={styles.nameCell}>
                <p className={styles.nameCell__title} title={value}>{value}</p>
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