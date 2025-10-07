import React from 'react';
import styles from './statusBanner.module.css';

type TStatusBannerProps = {
    title?: string | React.ReactNode,
    icon?: React.ReactNode,
    bgColor?: 'blu' | 'lgBlu'
}

export const StatusBanner: React.FC<TStatusBannerProps> = ({
    title,
    icon,
    bgColor = 'lgBlu'
}) => {
    return (
        <div className={`${styles.banner} ${styles[`banner_${bgColor}`]}`}
        >
            {icon && icon}
            {title && typeof title === 'string' ? <p className={styles.banner__title}>{title}</p> : title}
        </div>
    );
};
