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
    dataDashBoard?: Record<string, number | string>;
    onClick?: () => void;
    dataType: 'logistic' | 'penalty' | 'comission'
}

export const SmallButton: React.FC<ISmallButtonProps> = ({ title, dataDashBoard, onClick, dataType, ...props }) => {
    const handleClick = () => {
        if (dataDashBoard) {
            return
        } else {
            onClick?.();
        }
    };

    let popoverData;
    if (dataType === 'comission') {
        popoverData = [
            {
                value: dataDashBoard?.commissionWB,
                compare: dataDashBoard?.commissionWBCompare,
                description: 'Номинальная комиссия'
            },
            {
                value: dataDashBoard?.acquiring,
                compare: dataDashBoard?.acquiring_compare,
                description: 'Эквайринг'
            }
        ]
    } else if (dataType === 'penalty') {
        popoverData = dataDashBoard?.penalty_details
    } else if (dataType === 'logistic') {
        popoverData = dataDashBoard?.logistic_details
    }

   

    return (
        <Popover
            title={<PopoverRender popoverData={popoverData} title={title} dataType={dataType} />}
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


const PopoverRender = ({ popoverData, title, dataType }: { popoverData?: Record<string, number | string> | Array<Record<string, number | string>>, title: string, dataType: 'logistic' | 'penalty' | 'comission' }) => {
    return (
        <div className={styles.popoverRender}>
            <p className={styles.popoverRender__title}>{title}</p>
            {popoverData && dataType === 'logistic' && Object.keys(popoverData).length > 0 &&
                <ul className={styles.popoverRender__list}>
                    {Object.keys(popoverData).map((key) => {
                        const title = compareDictionary[key] ?? key;
                        return (
                            <li key={key} className={styles.popoverRender__item}>
                                <span className={styles.popoverRender__text}>{title}</span>
                                <span className={`${styles.popoverRender__text} ${styles.popoverRender__text_bold}`}>{formatPrice(popoverData[key]?.toString(), '₽')}</span>
                                {/* <RadarRateMark value={popoverData[key].toString()} units='%' /> */}
                            </li>
                        )
                    })}
                </ul>
            }
            {popoverData &&  (dataType === 'comission' || dataType === 'penalty') && Array.isArray(popoverData) && popoverData.length > 0 &&
                <ul className={styles.popoverRender__list}>
                    {popoverData.map((_, idx) => {
                        return (
                            <li key={idx} className={styles.popoverRender__item}>
                                <span className={styles.popoverRender__text}>{_.description}</span>
                                <div className={`${styles.popoverRender__text} ${styles.popoverRender__text_bold}`}>{formatPrice(_.value?.toString(), '₽')}</div>
                                {_.compare && <RadarRateMark value={_.compare} units='%' />}
                            </li>
                        )
                    })}
                </ul>
            }
        </div>
    )
}