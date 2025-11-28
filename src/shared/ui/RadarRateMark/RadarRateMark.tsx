import React from 'react';
import { formatPrice } from '@/service/utils';
import styles from './RadarRateMark.module.css';


//model
interface IRadarRateMarkProps {
    value: number | string;
    units?: string;
}


//service
// getColorByValue
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


export const RadarRateMark: React.FC<IRadarRateMarkProps> = ({value, units = ' '}) => {
    const formattedValue = formatPrice(value.toString(), units, true);
    return (
        <div className={styles.radarRateMark} style={getColorByValue(value)} title={formattedValue}>
            {formattedValue}
        </div>
    );
};
