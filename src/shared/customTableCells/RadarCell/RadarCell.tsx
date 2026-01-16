import React, { useState, useEffect } from 'react';
import { formatPrice } from '@/service/utils';
import styles from './RadarCell.module.css';

interface IRadarCellProps {
    value: number | string | null | undefined;
    units?: string;
    copyable?: boolean;
    className?: string;
}

export const RadarCell: React.FC<IRadarCellProps> = ({ 
    value, 
    units = '', 
    copyable = false, 
    className = '',
}) => {
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        if (isCopied) {
            timeout = setTimeout(() => setIsCopied(false), 1500);
        }
        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        };
    }, [isCopied]);

    // Если value null или undefined, показываем прочерк
    if (value == null) {
        return (
            <div className={`${styles.radarCell} ${className}`}>-</div>
        );
    }

    const handleClick = () => {
        if (copyable) {
            navigator.clipboard.writeText(value.toString()).catch(_err => console.log('Error copying to clipboard'));
            setIsCopied(true);
        }
    };

    return (
        <div 
            className={`${styles.radarCell} ${className}`}
            onClick={handleClick}
            style={{ cursor: copyable ? 'pointer' : 'default' }}
            title={copyable ? 'Кликните, чтобы скопировать' : undefined}
        >
            {formatPrice(value.toString(), units)}
            {isCopied && (
                <div style={{ position: 'relative' }}>
                    <span className={styles.copyNotification}>
                        Скопировано!
                    </span>
                </div>
            )}
        </div>
    );
};

