import React from 'react';
import { formatPrice } from '@/service/utils';
import styles from './RadarRateMark.module.css';

//model
interface IRadarRateMarkProps {
    value: number | string;
    units?: string;
    inverse?: boolean;
}

export const RadarRateMark: React.FC<IRadarRateMarkProps> = ({value, units = ' ', inverse = false}) => {
    const formattedValue = formatPrice(value.toString(), units, true);

    const getColorByValue = (value: number | string) => {
        const intValue = typeof value === 'number' ? value : parseInt(value);
        const greenColor = { backgroundColor: '#00B69B0D', color: '#00B69B' };
        const redColor = { backgroundColor: '#F93C650D', color: '#F93C65' };
        const grayColor = {  backgroundColor: '#1A1A1A0D', color: '#1A1A1A50' };

        if (inverse) {
            return intValue < 0 ? greenColor : intValue > 0 ? redColor : grayColor;
        } else {
            return intValue > 0 ? greenColor : intValue < 0 ? redColor : grayColor;
        }
    };

    return (
        <div className={styles.radarRateMark} style={getColorByValue(value)} title={formattedValue}>
            {formattedValue}
        </div>
    );
};
