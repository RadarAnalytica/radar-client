import styles from "./positionTrackingSkuCustomCellRender.module.css"
import { RadarRateMark } from "../ui/RadarRateMark/RadarRateMark"

const getColorByValue = (value: number | string) => {
    const intValue = typeof value === 'number' ? value : parseInt(value);
    if (intValue > 0) {
        return {
            backgroundColor: '#00B69B0D',
            color: '#00B69B',
        }
    }
    if (intValue < 0) {
        return {
            backgroundColor: '#F93C650D',
            color: '#F93C65',
        }
    }

    return {
        color: '#1A1A1A50',
        backgroundColor: '#1A1A1A0D',
    }
}

export const positionTrackingSkuTableCustomCellRender = (value: any, record: any, index: number, dataIndex: string) => {
    if (dataIndex !== 'name' && dataIndex !== 'frequency' && dataIndex !== 'goodsCount') {
        return (
            <div className={styles.bar__compareValuesBlock} style={getColorByValue(100)}>
                    <div className={styles.bar__comparativeValue} style={{ color: '#1A1A1A' }}>{100}</div>
                    <div className={styles.bar__absoluteValue} style={{ color: '#00B69B' }}>{`+1`}</div>
                    <div className={styles.bar__middleLine}></div>
                    <div className={styles.bar__absoluteValue} style={{ color: '#1A1A1A' }}>{300}</div>
            </div>
        )
    }

    return <>{value}</>

}