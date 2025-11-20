import React, { useState } from 'react';
import styles from './SmallButton.module.css';
import { Popover } from 'antd';
import { formatPrice } from '@/service/utils';
import { RadarRateMark } from '../RadarRateMark/RadarRateMark';

const compareDictionary: Record<string, string> = {
    logistic_to_client_sale: 'К клиенту при продаже',
    logistic_to_client_cancel: 'К клиенту при отмене',
    logistic_reverse_return: 'От клиента при продаже',
    logistic_reverse_cancel: 'От клиента при отмене'
}

interface ISmallButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    popoverData?: Record<string, number | string>;
    onClick?: () => void;
}

export const SmallButton: React.FC<ISmallButtonProps> = ({ title, popoverData, onClick, ...props }) => {
    const handleClick = () => {
        if (popoverData) {
            return
        } else {
            onClick?.();
        }
    };

    return (
        <Popover
            title={<PopoverRender popoverData={popoverData} title={title} />}
            trigger='hover'
            placement='rightBottom'
            color='white'
            arrow={false}
            destroyTooltipOnHide
            style={{ width: '424px' }}
        >
            <button className={styles.smallButton} {...props} onClick={handleClick}>
                {title ?? ''}
            </button>
        </Popover>
    );
};


const PopoverRender = ({ popoverData, title }: { popoverData?: Record<string, number | string>, title: string }) => {
    return (
        <div className={styles.popoverRender}>
            <p className={styles.popoverRender__title}>{title}</p>
            {popoverData && Object.keys(popoverData).length > 0 &&
                <ul className={styles.popoverRender__list}>
                    {Object.keys(popoverData).map((key) => {
                        const title = compareDictionary[key] ?? key;
                        return (
                            <li key={key} className={styles.popoverRender__item}>
                                <span className={styles.popoverRender__text}>{title}</span>
                                <span className={`${styles.popoverRender__text} ${styles.popoverRender__text_bold}`}>{formatPrice(popoverData[key].toString(), '₽')}</span>
                                {/* <RadarRateMark value={popoverData[key].toString()} units='%' /> */}
                            </li>
                        )
                    })}
                </ul>}
        </div>
    )
}