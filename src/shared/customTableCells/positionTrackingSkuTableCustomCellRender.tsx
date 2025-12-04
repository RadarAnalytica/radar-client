import styles from "./positionTrackingSkuCustomCellRender.module.css"
import { RadarRateMark } from "../ui/RadarRateMark/RadarRateMark"
import { formatPrice } from '@/service/utils';
import { Popover } from "antd";
import wb_icon from '../../assets/wb_small_main_icon.png';

const getColorByValue = (value: number) => {
    if (value > 0) {
        return {
            backgroundColor: '#00B69B0D',
            color: '#00B69B',
            sign: '+',
        }
    }
    if (value < 0) {
        return {
            backgroundColor: '#F93C650D',
            color: '#F93C65',
            sign: '',
        }
    }

    return {
        color: '#1A1A1A50',
        backgroundColor: '#1A1A1A0D',
        sign: '',
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

    if (dataIndex === 'query' && !record.isParent) {
        return <div className={styles.parentCustomCell} style={{ fontWeight: 500 }}>
            <img src={wb_icon} alt='wb_icon' width={20} height={20} style={{ transform: 'scale(1.2)' }} />
            {value}
        </div>
    }
    if (dataIndex !== 'frequency' && dataIndex !== 'total_goods') {
        const colorParams = getColorByValue(value.shows_compare);

        if (value.place > 0) {
            return (
                <Popover
                    content={<PopoverContent value={value} />}
                    arrow={false}
                    color='white'
                    destroyTooltipOnHide
                >
                    <div className={styles.bar__compareValuesBlock} style={{ backgroundColor: colorParams.backgroundColor }}>
                        <div className={styles.bar__comparativeValue} style={{ color: '#1A1A1A' }}>{value.shows}</div>
                        {value.shows_compare !== 0 && <div className={styles.bar__absoluteValue} style={{ color: colorParams.color }}>{`${colorParams.sign}${value.shows_compare}`}</div>}
                        <div className={styles.bar__middleLine}></div>
                        <div className={styles.bar__absoluteValue} style={{ color: '#1A1A1A' }}>{value.place}</div>
                    </div>
                </Popover>
            )
        } else {
            return (
                <Popover
                    content={<PopoverContent value={value} />}
                    arrow={false}
                    color='white'
                    destroyTooltipOnHide
                >
                    <div className={styles.bar__compareValuesBlock}>
                        —
                    </div>
                </Popover>
            )
        }

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