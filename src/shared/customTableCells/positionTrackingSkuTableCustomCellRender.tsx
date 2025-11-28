import styles from "./positionTrackingSkuCustomCellRender.module.css"
import { RadarRateMark } from "../ui/RadarRateMark/RadarRateMark"
import { formatPrice } from '@/service/utils';
import { Popover } from "antd";
import wb_icon from '../../assets/wb_small_main_icon.png';

const getColorByValue = (trend: boolean) => {
    if (trend === true) {
        return {
            backgroundColor: '#00B69B0D',
            color: '#00B69B',
        }
    }
    if (trend === false) {
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
    if (dataIndex === 'query' && record.isParent) {
        return <div className={styles.parentCustomCell}>
            {value}
        </div>
    }
    if (dataIndex === 'query' && record.isChild) {
        return <div className={styles.childCustomCell}>
            <img src={wb_icon} alt='wb_icon' width={20} height={20} style={{ transform: 'scale(1.2)' }} />
            {value}
        </div>
    }

    if (dataIndex === 'query') {
        return <div className={styles.parentCustomCell} style={{ fontWeight: 500}}>
            {value}
        </div>
    }
    if (dataIndex !== 'frequency' && dataIndex !== 'total_goods') {
        return (
            <Popover
                content={<PopoverContent value={value} />}
                arrow={false}
                color='white'
                destroyTooltipOnHide
            >
                <div className={styles.bar__compareValuesBlock} style={getColorByValue(value.trend)}>
                    <div className={styles.bar__comparativeValue} style={{ color: '#1A1A1A' }}>{value.shows}</div>
                    {/* <div className={styles.bar__absoluteValue} style={{ color: '#00B69B' }}>{`+1`}</div> */}
                    <div className={styles.bar__middleLine}></div>
                    <div className={styles.bar__absoluteValue} style={{ color: '#1A1A1A' }}>{value.place}</div>
                </div>
            </Popover>
        )
    } else {
        return <>{formatPrice(value, ' ')}</>
    }

    return <>{value}</>

}

const PopoverContent = ({ value }: { value: any }) => {
    return <div className={styles.popoverContent}>
        <p className={styles.popoverContent__title}>Просмотров <span>{value?.shows}</span></p>
        <p className={styles.popoverContent__title}>Позиция по ключу <span>{value?.place}</span></p>
    </div>
}