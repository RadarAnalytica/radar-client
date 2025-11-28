import React from 'react';
import styles from './RadarBar.module.css';
import { Tooltip as RadarTooltip } from 'radar-ui';
import { formatPrice } from '../../../service/utils';
import { Link } from 'react-router-dom';
import { ConfigProvider, Tooltip } from 'antd';
import { RadarLoader } from '../RadarLoader/RadarLoader';



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


// above or below zero
const isValueBelowZero = (value: number | string) => {
    const intValue = typeof value === 'number' ? value : parseInt(value);
    if (intValue > 0) {
        return false;
    }
    if (intValue < 0) {
        return true;
    }
}


//props model
interface RadarBarProps {
    title: string; // title of the bar
    tooltipText?: string; // tooltip text of the bar + triggers visibility of the tooltip
    midValue?: number | string | React.ReactNode; // mid value of the bar
    midValueUnits?: string; // units of the mid value (eg "шт", "%" or whatever)
    mainValue?: number | string; // main value of the bar
    mainValueUnits?: string; // units of the main value (eg "шт", "%" or whatever)
    mainValuePrefix?: string; // prefix of the main value (eg ">" or "<")
    hasColoredBackground?: boolean; // if true, the background of the bar will be red if compareValue is negative
    linkParams?: {
        url: string;
        text: string;
    }
    actionButtonParams?: {
        text: string;
        action: () => void;
        style?: React.CSSProperties;
    }
    compareValue?: {
        comparativeValue?: number | string; // %
        absoluteValue?: number | string; // pcs / rubles / etc
        absoluteValueUnits?: string; // units of the absolute value (eg "шт", "%" or whatever)
        tooltipText?: string; // tooltip text of the comparative value
    }
    isLoading: boolean
    dragHandle?: () => React.ReactNode;
}

//component
export const RadarBar: React.FC<RadarBarProps> = ({
    title,
    tooltipText,
    midValue,
    midValueUnits,
    mainValue,
    mainValueUnits,
    mainValuePrefix,
    //hasColoredBackground = false,
    linkParams,
    actionButtonParams,
    compareValue,
    isLoading,
    dragHandle
}) => {


    if (isLoading) {
        return (
            <div className={styles.bar}>
                <RadarLoader loaderStyle={{ height: '114px' }} />
            </div>
        )
    }
    return (
        // Расскоментируй когда будет нужно вернуть красный фон у карточки при отрицательном сравнительном значении
        // <div className={`${styles.bar} ${hasColoredBackground && compareValue?.comparativeValue && isValueBelowZero(compareValue?.comparativeValue) ? styles.bar_negative : ''}`}>
        // а этот дивв удали
        <div className={`${styles.bar}`}>
            {/* header */}
            <div className={styles.bar__header}>
                <div className={`${styles.bar__side} ${styles.bar__side_left}`} style={{ alignItems: 'flex-start', flexWrap: 'nowrap' }}>
                    <span className={styles.bar__title}>{title}</span>
                    {tooltipText &&
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorTextLightSolid: '#1A1A1A',
                                    fontSize: 12,
                                }
                            }}
                        >
                            <Tooltip
                                arrow={false}
                                color='white'
                                title={tooltipText}
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.bar__tooltipIcon}>
                                    <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="9.25" stroke="black" strokeOpacity="0.1" strokeWidth="1.5" />
                                    <path d="M9.064 15V7.958H10.338V15H9.064ZM8.952 6.418V5.046H10.464V6.418H8.952Z" fill="#1A1A1A" fillOpacity="0.5" />
                                </svg>
                            </Tooltip>
                        </ConfigProvider>
                    }
                </div>
                {dragHandle &&
                    <div className={`${styles.bar__side} ${styles.bar__side_right}`} style={{ alignItems: 'flex-start', flexWrap: 'nowrap' }}>
                        {dragHandle()}
                    </div>
                }
            </div>

            {/* mid */}
            {midValue !== undefined && (typeof midValue === 'string' || typeof midValue === 'number') &&
                <div className={styles.bar__mid}>
                    <div className={`${styles.bar__side} ${styles.bar__side_left}`}>
                        <span className={styles.bar__midValue}>{formatPrice(midValue.toString(), midValueUnits)}</span>
                    </div>
                </div>
            }
            {midValue !== undefined && (typeof midValue !== 'string' || typeof midValue !== 'number') && React.isValidElement(midValue) &&
                <div className={styles.bar__mid}>
                    <div className={`${styles.bar__side} ${styles.bar__side_left}`}>
                        {midValue}
                    </div>
                </div>
            }

            {/* bottom */}
            <div className={styles.bar__bottom}>
                <div className={`${styles.bar__side} ${styles.bar__side_left}`} style={{ gap: 4 }}>
                    {mainValuePrefix &&
                        <div className={styles.bar__mainValuePrefix}>{mainValuePrefix}</div>
                    }
                    {mainValue !== undefined &&
                        <div className={styles.bar__mainValue}>{mainValue === null ? '-' : formatPrice(mainValue?.toString(), mainValueUnits)}</div>
                    }
                    {compareValue && (compareValue.comparativeValue !== undefined || compareValue.absoluteValue !== undefined) &&

                        <div className={styles.bar__compareValuesBlock} style={{ ...getColorByValue(compareValue.comparativeValue) }}>
                            {compareValue.comparativeValue !== undefined &&
                                <div className={styles.bar__comparativeValue}>{formatPrice(compareValue.comparativeValue.toString(), '%', true)}</div>
                            }
                            {compareValue.absoluteValue !== undefined &&
                                <div className={styles.bar__middleLine}></div>
                            }
                            {compareValue.absoluteValue !== undefined &&
                                <ConfigProvider
                                    theme={{
                                        token: {
                                            colorTextLightSolid: '#1A1A1A',
                                            fontSize: 12,
                                        }
                                    }}
                                >
                                    <Tooltip
                                        arrow={false}
                                        color='white'
                                        title={compareValue.tooltipText}

                                    >
                                        <div className={styles.bar__absoluteValue} style={{ cursor: compareValue.tooltipText ? 'pointer' : 'default' }}>{formatPrice(compareValue.absoluteValue.toString(), compareValue.absoluteValueUnits || ' ')}</div>
                                    </Tooltip>
                                </ConfigProvider>
                            }
                        </div>

                    }
                </div>
                {(linkParams || actionButtonParams) &&
                    <div className={`${styles.bar__side} ${styles.bar__side_right}`}>
                        {linkParams &&
                            <Link to={linkParams.url || '/'} className={styles.bar__link}>{linkParams.text || 'Подробнее'}</Link>
                        }
                        {actionButtonParams &&
                            <button className={styles.bar__link} style={actionButtonParams.style || {}} onClick={actionButtonParams.action}>{actionButtonParams.text || 'Подробнее'}</button>
                        }
                    </div>
                }
            </div>

        </div>
    )
}