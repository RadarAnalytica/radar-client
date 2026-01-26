import React, { useState, useEffect } from 'react';
import styles from './CalcOptionItem.module.css';
import { ConfigProvider, Switch } from 'antd';
import { formatPrice } from '@/service/utils';

export const CalcOptionItem = ({
    section,
    isSelected,
    onChange,
}) => {

    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)

    useEffect(() => {
        const isAnyChildActive = section?.children?.some(_ => _.isActive)
        if (section?.isActive || isAnyChildActive) {
            setIsDescriptionOpen(true)
        } else {
             setIsDescriptionOpen(false)
        }
    }, [section])

    return (
        <div className={styles.tariffCalc__sectionWrapper}>
            <div className={styles.tariffCalc__section}>
                <div className={styles.tariffCalc__sectionLeft}>
                    <button className={isDescriptionOpen ? `${styles.tariffCalc__accButton} ${styles.tariffCalc__accButton_active}` : styles.tariffCalc__accButton} onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}>
                        <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0.223128 0.223128C0.520632 -0.074376 1.00298 -0.074376 1.30048 0.223128L5.33264 4.25529L9.3648 0.223128C9.6623 -0.074376 10.1447 -0.074376 10.4422 0.223128C10.7397 0.520632 10.7397 1.00298 10.4422 1.30048L5.33264 6.41L0.223128 1.30048C-0.074376 1.00298 -0.074376 0.520632 0.223128 0.223128Z" fill="#8C8C8C" />
                        </svg>
                    </button>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: '#5329FF',
                            },
                            components: {
                                Switch: {
                                    trackMinWidth: 32
                                }
                            }
                        }}
                    >
                        <Switch
                            checked={isSelected}
                            onChange={() => onChange(section.id)}
                        />
                    </ConfigProvider>
                    <div className={styles.tariffCalc__sectionInfo}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span className={styles.tariffCalc__sectionName} style={{ fontWeight: section.isActive ? 700 : 500}}>{section.title}</span>
                            {section.isNew && (
                                <span className={styles.tariffCalc__newBadge}>New!</span>
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles.tariffCalc__sectionPrices}>
                    <span className={styles.tariffCalc__oldPrice}>{formatPrice(section.oldPrice.toString(), '₽')}</span>
                    <div className={styles.tariffCalc__priceWrapper}>
                        <span 
                        className={styles.tariffCalc__newPrice}
                        // style={{ color: !isSelected ? '#1A1A1A' : '' }}
                        style={{ color: '#1A1A1A' }}
                        >{formatPrice(section.price.toString(), '₽')}</span>
                        <span className={styles.tariffCalc__pricePerMonth}>
                            {formatPrice(section.pricePerMonth.toString(), '₽/мес')}
                        </span>
                    </div>
                </div>
            </div>
            {isDescriptionOpen && section.children &&
                <div className={styles.tariffCalc__sectionDescriptionWrapper}>
                    {section?.children?.map(_ => (
                        <div className={styles.tariffCalc__sectionDescription} key={_.id}>
                            <div className={styles.tariffCalc__switch}>
                                <ConfigProvider
                                    theme={{
                                        token: {
                                            colorPrimary: '#5329FF',
                                        },
                                    }}
                                >
                                    <Switch
                                        size='small'
                                        checked={_.isActive}
                                        onChange={() => onChange(section.id, _.id)}
                                    />
                                </ConfigProvider>
                                <div className={styles.tariffCalc__sectionInfo}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span className={styles.tariffCalc__sectionName}>{_.title}</span>
                                        {_.isNew && (
                                            <span className={styles.tariffCalc__newBadge}>New!</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.tariffCalc__sectionPrices}>
                                <span className={styles.tariffCalc__oldPrice}>{formatPrice(_.oldPrice.toString(), '₽')}</span>
                                <div className={styles.tariffCalc__priceWrapper}>
                                    <span 
                                    className={styles.tariffCalc__newPrice} 
                                    // style={{ color: !isSelected ? '#1A1A1A' : '' }}
                                    style={{ color: '#1A1A1A' }}
                                    >{formatPrice(section.price.toString(), '₽')}</span>
                                    <span className={styles.tariffCalc__pricePerMonth}>
                                        {formatPrice(_.pricePerMonth.toString(), '₽/мес')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}