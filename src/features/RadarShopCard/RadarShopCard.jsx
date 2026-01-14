import { useState, useEffect } from 'react';
import styles from './RadarShopCard.module.css';
import WbIcon from '../../assets/WbIcon';
import moment from 'moment';
import { Button, ConfigProvider } from 'antd';
import { Link } from 'react-router-dom';
import { formatPrice } from '@/service/utils';
import { useAppDispatch } from '@/redux/hooks';
import { actions as filterActions } from '@/redux/apiServicePagesFiltersState/apiServicePagesFilterState.slice'


/**
 *
brand_name: "JuliaShine111"
id: 88
is_active: true
is_primary_collect: true
is_self_cost_set: false
is_valid: false
updated_at: "2025-05-15 20:10:33.174770"
 */

const getShopStatus = (isActive, isValid, isPrimaryCollect) => {
    if ((isActive && isValid && isPrimaryCollect)) {
        return {
            status: 'active',
            render: (
                <div
                    className={styles.widget__shopStatusIcon}
                    style={{
                        backgroundColor: '#00B69B1A',
                        color: '#00B69B'
                    }}
                >
                    Активен
                </div>
            )
        }
    }
    if ((isActive && isValid && !isPrimaryCollect)) {
        return {
            status: 'pending',
            render: (
                <div
                    className={styles.widget__shopStatusIcon}
                    style={{
                        backgroundColor: '#8C8C8C1A',
                        color: '#8C8C8C'
                    }}
                >
                    Сбор данных
                </div>
            )
        }
    }
    if ((isActive && !isValid)) {
        return {
            status: 'pending',
            render: (
                <div
                    className={styles.widget__shopStatusIcon}
                    style={{
                        backgroundColor: '#F93C651A',
                        color: '#F93C65'
                    }}
                >
                    Ошибка
                </div>
            )
        }
    }
};
const getShopSelfCostStatus = (is_self_cost_set) => {
    if (is_self_cost_set) {
        return (
            <div className={`${styles.widget__shopStatusIcon} ${styles.widget__shopStatusIcon_active}`}>
                Установлена
            </div>
        );
    }
    if (!is_self_cost_set) {
        return (
            <div className={`${styles.widget__shopStatusIcon} ${styles.widget__shopStatusIcon_error}`}>
                Не установлена
            </div>
        );
    }
};
const getShopParamColor = (param) => {
    if (param) {
        return '#00B69B'
    } else {
        return '#F93C65'
    }
}

export const RadarShopCard = ({
    shop,
    editButtonAction,
    deleteButtonAction,
    setTaxAction,
    isDemoMode
}) => {
    const dispatch = useAppDispatch()




    return (
        <div className={styles.widget}>
            {/* header */}
            <div
                className={styles.widget__header}
                style={{ opacity: shop?.is_active && shop?.is_valid && !shop?.is_primary_collect ? '50%' : '100%' }}
            >
                <div className={styles.widget__iconWrapper}>
                    <WbIcon />
                </div>
                <div className={styles.widget__titleWrapper}>
                    <p className={styles.widget__title} title={shop.brand_name}>{shop.brand_name}</p>
                    <p className={styles.widget__subtitle}>Последнее обновление: {moment(shop.updated_at).format('DD.MM.YYYY')}</p>
                </div>
            </div>

            {/* controls */}
            <div className={styles.widget__controls}>
                {editButtonAction &&
                    <button className={`${styles.widget__controlButton} ${styles.widget__controlButton_edit}`} onClick={() => editButtonAction()}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0.195262 7.49509L7 0.690357C7.92047 -0.230118 9.41286 -0.230119 10.3333 0.690356C11.2538 1.61083 11.2538 3.10322 10.3333 4.02369L3.5286 10.8284C3.40357 10.9535 3.234 11.0237 3.05719 11.0237H0.666667C0.298477 11.0237 0 10.7252 0 10.357V7.9665C0 7.78969 0.070238 7.62012 0.195262 7.49509ZM1 10.0237V8.10457L7.70711 1.39746C8.23706 0.867512 9.09628 0.867512 9.62623 1.39746C10.1562 1.92741 10.1562 2.78663 9.62623 3.31658L2.91912 10.0237H1Z" fill="#5329FF" />
                            <path d="M6 9.85702C5.72386 9.85702 5.5 10.0809 5.5 10.357C5.5 10.6332 5.72386 10.857 6 10.857H10.6667C10.9428 10.857 11.1667 10.6332 11.1667 10.357C11.1667 10.0809 10.9428 9.85702 10.6667 9.85702H6Z" fill="#5329FF" />
                        </svg>

                        Редактировать
                    </button>
                }
                {deleteButtonAction && !isDemoMode &&
                    <button className={`${styles.widget__controlButton} ${styles.widget__controlButton_delete}`} onClick={() => deleteButtonAction()}>
                        <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M2.4346 2.13763C2.39056 2.14345 2.34862 2.15483 2.30939 2.17098C1.78507 2.21194 1.32501 2.25266 0.993736 2.28339C0.824276 2.2991 0.688412 2.31221 0.594763 2.3214L0.486999 2.3321L0.44969 2.33587L0.44897 2.33595C0.174272 2.36415 -0.0255509 2.6097 0.0026539 2.8844C0.0308587 3.1591 0.27641 3.35892 0.551108 3.33072L0.550618 3.32593C0.55111 3.33072 0.551108 3.33072 0.551108 3.33072L0.587017 3.32708L0.692461 3.31662C0.784505 3.30758 0.918575 3.29465 1.08608 3.27911C1.42117 3.24804 1.88965 3.2066 2.42287 3.16516C3.49296 3.08202 4.81029 3 5.83337 3C6.85646 3 8.17379 3.08202 9.24388 3.16516C9.7771 3.2066 10.2456 3.24804 10.5807 3.27911C10.7482 3.29465 10.8822 3.30758 10.9743 3.31662L11.0797 3.32708L11.1152 3.33067C11.3899 3.35888 11.6359 3.1591 11.6641 2.8844C11.6923 2.6097 11.4925 2.36415 11.2178 2.33595L11.1797 2.3321L11.072 2.3214C10.9783 2.31221 10.8425 2.2991 10.673 2.28339C10.3417 2.25266 9.88165 2.21193 9.35732 2.17097C9.32291 2.15682 9.28638 2.14632 9.2481 2.14C8.91828 2.08558 8.64063 1.86327 8.5154 1.55333L8.45511 1.4041C8.11225 0.555528 7.28864 0 6.37342 0H5.47529C4.57219 0 3.75949 0.548168 3.42117 1.3855C3.25714 1.79149 2.8874 2.07786 2.4533 2.13517L2.4346 2.13763ZM5.47529 1C4.97983 1 4.53396 1.30074 4.34835 1.76012C4.30806 1.85984 4.26096 1.95561 4.20768 2.04693C4.77386 2.01858 5.33496 2 5.83337 2C6.3865 2 7.01684 2.02289 7.64565 2.0566C7.62507 2.01461 7.6059 1.9717 7.58822 1.92794L7.52793 1.77872C7.33778 1.3081 6.881 1 6.37342 1H5.47529Z" fill="#F95377" />
                            <path d="M10.3315 4.54331C10.3554 4.26821 10.1518 4.0258 9.87669 4.00188C9.60158 3.97796 9.35917 4.18158 9.33525 4.45669L8.79845 10.6299C8.73104 11.4051 8.08215 12 7.30409 12H4.09613C3.29304 12 2.63243 11.3675 2.59755 10.5652L2.3329 4.47828C2.32091 4.2024 2.08754 3.98848 1.81165 4.00047C1.53577 4.01247 1.32185 4.24584 1.33384 4.52172L1.59849 10.6086C1.65663 11.9458 2.75765 13 4.09613 13H7.30409C8.60085 13 9.68235 12.0085 9.79469 10.7166L10.3315 4.54331Z" fill="#F95377" />
                            <path d="M3.83337 10C3.55723 10 3.33337 10.2239 3.33337 10.5C3.33337 10.7761 3.55723 11 3.83337 11H7.83337C8.10951 11 8.33337 10.7761 8.33337 10.5C8.33337 10.2239 8.10951 10 7.83337 10H3.83337Z" fill="#F95377" />
                        </svg>

                        Удалить
                    </button>
                }
            </div>

            {/* footer */}
            <div className={styles.widget__footer}>
                <div className={styles.widget__paramsBlock}>
                    {getShopStatus(shop.is_active, shop.is_valid, shop.is_primary_collect)?.status === 'active' &&
                        <div className={styles.widget__shopParam}>
                            <span>Себестоимость</span>
                            <div className={styles.widget__shopParamItem} style={{ color: getShopParamColor(shop?.is_self_cost_set) }}>
                                {shop?.is_self_cost_set ? 'Установлена' : 'Не установлена'}
                            </div>
                            <Link to='/selfcost' onClick={(e) => { dispatch(filterActions.setActiveShop(shop)) }}>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M0.195262 7.49509L7 0.690357C7.92047 -0.230118 9.41286 -0.230119 10.3333 0.690356C11.2538 1.61083 11.2538 3.10322 10.3333 4.02369L3.5286 10.8284C3.40357 10.9535 3.234 11.0237 3.05719 11.0237H0.666667C0.298477 11.0237 0 10.7252 0 10.357V7.9665C0 7.78969 0.070238 7.62012 0.195262 7.49509ZM1 10.0237V8.10457L7.70711 1.39746C8.23706 0.867512 9.09628 0.867512 9.62623 1.39746C10.1562 1.92741 10.1562 2.78663 9.62623 3.31658L2.91912 10.0237H1Z" fill="#5329FF" />
                                    <path d="M6 9.85702C5.72386 9.85702 5.5 10.0809 5.5 10.357C5.5 10.6332 5.72386 10.857 6 10.857H10.6667C10.9428 10.857 11.1667 10.6332 11.1667 10.357C11.1667 10.0809 10.9428 9.85702 10.6667 9.85702H6Z" fill="#5329FF" />
                                </svg>
                            </Link>
                        </div>
                    }

                    <div className={styles.widget__shopParam}>
                        <span>Налог</span>
                        <div className={styles.widget__shopParamItem} style={{ color: getShopParamColor((shop?.tax !== undefined && shop?.tax !== null)) }}>
                            {(shop?.tax !== undefined && shop?.tax !== null) ? 'Установлен' : 'Не установлен'}
                        </div>
                        {shop?.tax !== undefined && shop?.tax !== null && <span>{formatPrice(shop?.tax, '%')}</span>}
                        <button style={{ border: 'none', backgroundColor: 'transparent' }} onClick={setTaxAction}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.195262 7.49509L7 0.690357C7.92047 -0.230118 9.41286 -0.230119 10.3333 0.690356C11.2538 1.61083 11.2538 3.10322 10.3333 4.02369L3.5286 10.8284C3.40357 10.9535 3.234 11.0237 3.05719 11.0237H0.666667C0.298477 11.0237 0 10.7252 0 10.357V7.9665C0 7.78969 0.070238 7.62012 0.195262 7.49509ZM1 10.0237V8.10457L7.70711 1.39746C8.23706 0.867512 9.09628 0.867512 9.62623 1.39746C10.1562 1.92741 10.1562 2.78663 9.62623 3.31658L2.91912 10.0237H1Z" fill="#5329FF" />
                                <path d="M6 9.85702C5.72386 9.85702 5.5 10.0809 5.5 10.357C5.5 10.6332 5.72386 10.857 6 10.857H10.6667C10.9428 10.857 11.1667 10.6332 11.1667 10.357C11.1667 10.0809 10.9428 9.85702 10.6667 9.85702H6Z" fill="#5329FF" />
                            </svg>
                        </button>
                    </div>
                </div>
                {getShopStatus(shop.is_active, shop.is_valid, shop.is_primary_collect)?.render}
            </div>
        </div>
    );
};
