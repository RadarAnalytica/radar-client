import styles from "./positionTrackingTableCustomCellRender.module.css"
import { Link } from "react-router-dom";
import wb_icon from './wb_icon.png'

export const positionTrackingTableCustomCellRender = (value: any, record: any, index: number, dataIndex: string) => {
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
                        <Link to={`/position-tracking/${record.wb_id}`} className={styles.nameCell__title} style={{ textDecoration: 'none', color: '#1A1A1A' }} title={value}>{value}</Link>
                        <Link to={`https://www.wildberries.ru/catalog/${record.wb_id}/detail.aspx`} target='_blank' className={styles.nameCell__skuBlock}>
                            <img src={wb_icon} alt='wb_icon' width={20} height={20} style={{ transform: 'scale(1.2)' }} />
                            {record.wb_id}
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

}