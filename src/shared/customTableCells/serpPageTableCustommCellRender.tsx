import styles from "./serpPageTableCustomCellRender.module.css"
import { Link } from "react-router-dom";
import wb_icon from './wb_icon.png'

export const serpPageCustomTableCellRender = (value: any, record: any, index: number, dataIndex: string) => {
    if (dataIndex === 'name') {
        return (
            <div className={styles.nameCell}>
                <div className={styles.nameCell__header}>
                    <div className={styles.nameCell__imgWrapper}>
                        <img
                            src={record.wb_id_image_link}
                            alt={record.name}
                            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                    </div>
                    <div className={styles.nameCell__titleBlock}>
                        <p className={styles.nameCell__title}>{value}</p>
                        <Link to={`https://www.wildberries.ru/catalog/${record.wb_id}/detail.aspx`} target='_blank' className={styles.nameCell__skuBlock}>
                            <img src={wb_icon} alt='wb_icon' width={20} height={20} style={{ transform: 'scale(1.2)' }} />
                            {record.wb_id}
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
    if (dataIndex === 'ad') {
        return (
            <div
                className={styles.adCell}
                style={{ backgroundColor: value ? '#4AD99133' : '#F0AD0033' }}
            >
                {value ? 'Реклама' : 'Органика'}
            </div>
        )
    }
    if (dataIndex === 'rating') {
        return (
           <>
           {value ? value.toFixed(1) : '–'}
           </>
        )
    }
}