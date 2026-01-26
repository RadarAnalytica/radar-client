import React, { Dispatch, SetStateAction, useState, useMemo } from 'react'
import styles from './Cart.module.css'
import { ConfigProvider, Input, Radio, Button } from 'antd'
import { formatPrice } from '@/service/utils';
import type { ITariffCard, IPaymentItem, IPromocode } from '@/shared/models/tariffs/tariffs';

const initRequestState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

const inputTheme = {
    token: {
        colorBgContainer: 'white',
        colorBorder: '#5329FF1A',
        borderRadius: 8,
        fontFamily: 'Manrope',
        fontSize: 12,
        fontWeight: 500,
        controlHeightLG: 38,
    },
    components: {
        Input: {
            activeBorderColor: '#5329FF1A',
            hoverBorderColor: '#5329FF1A',
            activeOutlineColor: 'transparent',
            hoverBg: 'white',
            activeShadow: 'transparent',
            activeBg: 'white',
        },
        Select: {
            activeBorderColor: '#5329FF1A',
            hoverBorderColor: '#5329FF1A',
            activeOutlineColor: 'transparent',
        }
    }
};


const getCartItemTotal = (item: any, type: 'section' | 'limit', priceType: 'old' | 'new'): number | null => {
    if (type === 'section') {
        if (priceType === 'old' && item.isActive) {
            return item.oldPrice ?? null
        }
        if (priceType === 'old' && !item.isActive) {
            return item.children?.reduce((acc, a) => {
                return a.isActive ? acc + (a.oldPrice ?? a.price) : acc + 0
            }, 0)
        }
        if (priceType === 'new' && item.isActive) {
            return item.price ?? null
        }
        if (priceType === 'new' && !item.isActive) {
            return item.children?.reduce((acc, a) => {
                return a.isActive ? acc + a.price : acc + 0
            }, 0)
        }
    }

    if (type === 'limit') {
        if (priceType === 'old') {
            if (item.id === 'api') {
                return (item.oldPrice ?? 0) * item.amount
            }
            return item.oldPrice ?? null
        }
        if (priceType === 'new') {
            if (item.id === 'api') {
                return item.amount * item.price
            }
            return item.price
        }
    }
}
const cartCalculationsFunc = (
    item: ITariffCard | any[],
    promocode?: { name: string, isValid: boolean, mechanics?: { type: 'discount' | 'time', amount: number } },
    limits?: any[],
): { calculations: Array<{ title: string, amount: number, units: string, color?: string }>, total: number, fullPrice: number } => {

    if (Array.isArray(item)) {

        let oldPricesTotal = item.reduce((acc, a) => {
            if (a.isActive) {
                return acc + (a.oldPrice ?? a.price);
            } else {
                const childrenOldPricesTotal = a.children?.reduce((acc, a) => {
                    if (a.isActive) {
                        return acc + (a.oldPrice ?? a.price);
                    } else {
                        return acc;
                    }
                }, 0)
                return acc + (childrenOldPricesTotal ?? 0)
            }
        }, 0)
        let pricesTotal = item.reduce((acc, a) => {
            if (a.isActive) {
                return acc + a.price;
            } else {
                const childrenPricesTotal = a.children?.reduce((acc, a) => {
                    if (a.isActive) {
                        return acc + (a.price);
                    } else {
                        return acc;
                    }
                }, 0)
                return acc + (childrenPricesTotal ?? 0)
            }
        }, 0)

        if (limits) {
            oldPricesTotal += limits.reduce((acc,a) => a.amount > 0 ? acc + (a.oldPrice ?? a.price) : acc + 0, 0)
            pricesTotal += limits.reduce((acc,a) => a.amount > 0 ? acc + a.price : acc + 0, 0)
        }

        if (promocode && promocode.isValid && promocode.mechanics?.type === 'discount') {
            return {
                calculations: [
                    { title: 'Оплата за разделы', amount: oldPricesTotal, units: '₽' },
                    { title: 'Скидки', amount: oldPricesTotal ? oldPricesTotal - pricesTotal : 0, units: '₽', color: '#00B69B' },
                    { title: 'Промокод', amount: pricesTotal * (promocode.mechanics.amount / 100), units: '₽', color: '#00B69B' },
                ],
                total: pricesTotal - (pricesTotal * (promocode.mechanics.amount / 100)),
                fullPrice: pricesTotal
            }
        }
        return {
            calculations: [
                { title: 'Оплата за разделы', amount: oldPricesTotal, units: '₽' },
                { title: 'Скидки', amount: oldPricesTotal ? oldPricesTotal - pricesTotal : 0, units: '₽', color: '#00B69B' },
            ],
            total: pricesTotal,
            fullPrice: pricesTotal
        }

    } else {
        if (promocode && promocode.isValid && promocode.mechanics?.type === 'discount') {
            return {
                calculations: [
                    { title: 'Оплата за тариф', amount: item.oldPrice ?? item.price, units: '₽' },
                    { title: 'Скидки', amount: item.oldPrice ? item.oldPrice - item.price : 0, units: '₽', color: '#00B69B' },
                    { title: 'Промокод', amount: item.price * (promocode.mechanics.amount / 100), units: '₽', color: '#00B69B' },
                ],
                total: item.price - (item.price * (promocode.mechanics.amount / 100)),
                fullPrice: item.price
            }
        }
        return {
            calculations: [
                { title: 'Оплата за тариф', amount: item.oldPrice ?? item.price, units: '₽' },
                { title: 'Скидки', amount: item.oldPrice ? item.oldPrice - item.price : 0, units: '₽', color: '#00B69B' },
            ],
            total: item.price,
            fullPrice: item.price
        }
    }
}

interface ICartProps {
    activeCartTariff: ITariffCard,
    selectedSections: any[],
    removeSection: (sectionId: string) => void,
    activeTab: string,
    paymentMethod: 'instant' | 'after_subscription' | 'boost',
    setPaymentMethod: Dispatch<SetStateAction<"instant" | "after_subscription" | "boost">>
    payFunction: (item: IPaymentItem, paymentType: 'instant' | 'after_subscription' | 'boost', promocode?: IPromocode) => void
    tabs: Array<{ title: '1 месяц' | '3 месяца' | '6 месяцев' | '12 месяцев', discount: string | null, value: string }>,
    selectedLimits: any[]
}

export const Cart: React.FC<ICartProps> = ({
    selectedSections,
    activeCartTariff,
    removeSection,
    activeTab,
    paymentMethod,
    payFunction,
    setPaymentMethod,
    selectedLimits,
    tabs
}) => {
    const [promocodeRequestStatus, setPromocodeRequestStatus] = useState(initRequestState)
    const [promocode, setPromocode] = useState<{ name: string, isValid: boolean, mechanics?: IPromocode }>({ name: '', isValid: true, mechanics: { type: 'discount', amount: 20 } })

    const isAnyCalcItemsActive = useMemo(() => {
        if (!selectedSections) return false;
        const isAnyParentActive = selectedSections.some(_ => _.isActive)
        if (isAnyParentActive) return isAnyParentActive;
        const isAnyChildActive = selectedSections.some(_ => _.children?.some(_ => _.isActive))
        if (isAnyChildActive) return isAnyChildActive;
        return false
    }, [selectedSections])

    const isAnyLimitActive = useMemo(() => {
        if (!selectedLimits) return false;
        return selectedLimits.some(_ => _.amount > 0)
    }, [selectedLimits])

    return (
        <div className={styles.tariffCalc__cart}>
            <p className={styles.tariffCalc__subtitle}>Корзина</p>
            {/* ------------ Empty cart ------------ */}
            {!isAnyCalcItemsActive && !isAnyLimitActive && !activeCartTariff ? (
                <div className={styles.tariffCalc__emptyCart}>
                    <p className={styles.tariffCalc__emptyCartText}>
                        В вашей корзине пока ничего нет
                    </p>
                    <p className={styles.tariffCalc__emptyCartSubtext}>
                        Добавьте хотя бы один раздел
                    </p>
                </div>
            ) : (
                <div className={styles.tariffCalc__cartContent}>
                    {/* ------------ Cart Items (Calculator) ------------ */}
                    <div className={styles.tariffCalc__selectedSections}>
                        {selectedLimits?.map(limit => {
                            return limit.amount > 0 && (
                                <CartItem
                                    item={limit}
                                    promocode={promocode}
                                    removeItem={removeSection}
                                    activeTab={activeTab}
                                    key={limit.id}
                                />
                            )
                        })}
                        {selectedSections?.map(section => {

                            const { isActive, children } = section;
                            const isAnyChildActive = children?.some(_ => _.isActive)

                            return (isActive || isAnyChildActive) && (
                                <CartItem
                                    item={section}
                                    promocode={promocode}
                                    removeItem={removeSection}
                                    activeTab={activeTab}
                                    hasRemoveButton
                                    key={section.id}
                                />
                            )
                        })}
                        {/* ------------ Cart Items (Regular Tariffs) ------------ */}
                        {activeCartTariff &&
                            <CartItem
                                item={activeCartTariff}
                                promocode={promocode}
                                activeTab={activeTab}
                                removeItem={removeSection}
                            />
                        }
                    </div>

                    {(isAnyCalcItemsActive || activeCartTariff) &&
                        <>
                            {/* ------------ Promocode ------------ */}
                            <div className={styles.tariffCalc__promocode}>
                                <p className={styles.tariffCalc__promocodeLabel}>Промокод</p>
                                <ConfigProvider
                                    theme={inputTheme}
                                >
                                    <Input
                                        placeholder="Если есть"
                                        value={promocode.name ?? ''}
                                        onChange={(e) => {
                                            setPromocodeRequestStatus(initRequestState)
                                            setPromocode((prev) => ({ ...prev, name: e.target.value }));
                                        }}
                                        disabled={promocodeRequestStatus.isLoading}
                                        style={{
                                            height: '38px',
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            border: promocodeRequestStatus.isError ? '1px solid #F93C65' : '1px solid #E8E8E8'
                                        }}
                                        suffix={
                                            promocodeRequestStatus.isLoading ? (
                                                <div className={styles.loader} />
                                            ) : promocodeRequestStatus.isSuccess ? (
                                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M5 10C7.76142 10 10 7.76142 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5C0 7.76142 2.23858 10 5 10ZM7.39016 3.89017C7.53661 3.74372 7.53661 3.50628 7.39016 3.35983C7.24372 3.21339 7.00628 3.21339 6.85983 3.35983L4.375 5.84467L3.14017 4.60984C2.99372 4.46339 2.75628 4.46339 2.60983 4.60984C2.46339 4.75628 2.46339 4.99372 2.60983 5.14017L4.10983 6.64017C4.25628 6.78661 4.49372 6.78661 4.64017 6.64017L7.39016 3.89017Z" fill="#00B69B" />
                                                </svg>
                                            ) : promocodeRequestStatus.isError ? (
                                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M5 10C7.76142 10 10 7.76142 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5C0 7.76142 2.23858 10 5 10ZM3.85095 3.32062C3.7045 3.17417 3.46706 3.17417 3.32062 3.32062C3.17417 3.46707 3.17417 3.7045 3.32062 3.85095L4.46967 5L3.32062 6.14905C3.17417 6.2955 3.17417 6.53293 3.32062 6.67938C3.46706 6.82583 3.7045 6.82583 3.85095 6.67938L5 5.53033L6.14905 6.67938C6.29549 6.82583 6.53293 6.82583 6.67938 6.67938C6.82582 6.53293 6.82582 6.2955 6.67938 6.14905L5.53033 5L6.67938 3.85095C6.82582 3.7045 6.82582 3.46707 6.67938 3.32062C6.53293 3.17417 6.29549 3.17418 6.14905 3.32062L5 4.46967L3.85095 3.32062Z" fill="#F93C65" />
                                                </svg>
                                            ) : null
                                        }
                                    />
                                    {promocodeRequestStatus.isError && promocodeRequestStatus.message &&
                                        <span style={{ color: '#F93C65', fontSize: 10 }}>{promocodeRequestStatus.message}</span>
                                    }
                                </ConfigProvider>
                            </div>
                            {/* ------------ Calculations ------------ */}
                            <div className={styles.tariffCalc__calculations}>
                                <p className={styles.tariffCalc__calculationsLabel}>Расчеты</p>
                                {isAnyCalcItemsActive && !activeCartTariff &&
                                    <>
                                        {cartCalculationsFunc(selectedSections, promocode).calculations.map((_) => {
                                            return (
                                                <div className={styles.tariffCalc__calculationRow} key={_.title} style={{ color: _.color }}>
                                                    <span>{_.title}</span>
                                                    <span>{formatPrice(_.amount?.toString(), _.units)}</span>
                                                </div>
                                            )
                                        })}
                                    </>
                                }
                                {activeCartTariff &&
                                    <>
                                        {cartCalculationsFunc(activeCartTariff, promocode).calculations.map((_) => {
                                            return (
                                                <div className={styles.tariffCalc__calculationRow} key={_.title} style={{ color: _.color }}>
                                                    <span>{_.title}</span>
                                                    <span>{formatPrice(_.amount?.toString(), _.units)}</span>
                                                </div>
                                            )
                                        })}
                                    </>
                                }


                            </div>
                            {/* ----------- Apply type -------------- */}
                            <div className={styles.tariffCalc__paymentMethod}>
                                <p className={styles.tariffCalc__paymentMethodLabel}>Способ получения</p>
                                <ConfigProvider
                                    theme={{
                                        token: {
                                            colorPrimary: '#5329FF',
                                        }
                                    }}
                                >
                                    <Radio.Group
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        style={{ width: '100%' }}
                                    >
                                        <Radio value="instant" style={{ width: '100%', marginBottom: '12px' }}>
                                            <div>
                                                <div style={{ fontWeight: 500, fontSize: '14px', color: '#1A1A1A' }}>
                                                    Моментально
                                                </div>
                                                <div style={{ fontSize: '12px', color: '#8C8C8C' }}>
                                                    Применить подписку сразу после оплаты
                                                </div>
                                            </div>
                                        </Radio>
                                        <Radio value="after_subscription">
                                            <div>
                                                <div style={{ fontWeight: 500, fontSize: '14px', color: '#1A1A1A' }}>
                                                    После текущей подписки
                                                </div>
                                                <div style={{ fontSize: '12px', color: '#8C8C8C' }}>
                                                    Применить подписку после окончания текущей
                                                </div>
                                            </div>
                                        </Radio>
                                    </Radio.Group>
                                </ConfigProvider>
                            </div>
                        </>
                    }
                    {/* ---------------- Total ------------------ */}
                    <div className={styles.tariffCalc__total}>
                        <div className={styles.tariffCalc__totalRow}>
                            <span style={{ fontSize: '14px', fontWeight: 500 }}>Итого</span>
                            {selectedSections?.length > 0 &&
                                <span style={{ fontSize: '18px', fontWeight: 700 }}>
                                    {formatPrice(cartCalculationsFunc(selectedSections, promocode, selectedLimits)?.total?.toString(), '₽')}
                                </span>
                            }
                            {activeCartTariff &&
                                <span style={{ fontSize: '18px', fontWeight: 700 }}>
                                    {formatPrice(cartCalculationsFunc(activeCartTariff, promocode)?.total?.toString(), '₽')}
                                </span>
                            }
                        </div>
                    </div>
                    {/* ---------------- Submit button ------------------ */}
                    {(selectedSections?.length > 0 || activeCartTariff) &&
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: '#5329FF',
                                    fontSize: 12,
                                    controlHeightLG: 38,
                                },
                            }}
                        >
                            <Button
                                type="primary"
                                size="large"
                                block
                                loading={promocodeRequestStatus.isLoading}
                                disabled={selectedSections?.length === 0 && !activeCartTariff}
                                style={{
                                    marginTop: '16px',
                                    borderRadius: '8px',
                                    fontWeight: 600
                                }}
                                onClick={() => {
                                    const totalData = activeCartTariff ? cartCalculationsFunc(activeCartTariff, promocode) : cartCalculationsFunc(selectedSections, promocode, selectedLimits)
                                    const item: IPaymentItem = {
                                        title: activeCartTariff?.title ?? 'calculator',
                                        price: totalData.total,
                                        period: tabs.find(_ => _.title === activeTab).value as '1month' | '3month' | '6month' | '12month' ?? '1month',
                                        fullPrice: totalData.fullPrice
                                    }
                                    payFunction(item, paymentMethod, promocode.mechanics)
                                }}
                            >
                                К оплате
                            </Button>
                        </ConfigProvider>
                    }
                </div>
            )}
        </div>
    )
}


const CartItem = ({
    item,
    promocode,
    removeItem,
    activeTab,
    hasRemoveButton = false
}) => {

    return (
        <div className={styles.tariffCalc__cartItem}>
            {(item.type === 'section' || !item.type) &&
                <>
                    <span className={styles.tariffCalc__cartItemName}>{item.title}</span>
                    {item.children && item.children?.map(_ => _.isActive && (
                        <div className={styles.tariffCalc__options} key={_.id}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M5 10C7.76142 10 10 7.76142 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5C0 7.76142 2.23858 10 5 10ZM7.39016 3.89017C7.53661 3.74372 7.53661 3.50628 7.39016 3.35983C7.24372 3.21339 7.00628 3.21339 6.85983 3.35983L4.375 5.84467L3.14017 4.60984C2.99372 4.46339 2.75628 4.46339 2.60983 4.60984C2.46339 4.75628 2.46339 4.99372 2.60983 5.14017L4.10983 6.64017C4.25628 6.78661 4.49372 6.78661 4.64017 6.64017L7.39016 3.89017Z" fill="#00B69B" />
                                </svg>
                                {_.title}
                            </div>
                        </div>
                    ))}
                </>
            }
            {item.type === 'limit' &&
                <>
                    <span className={styles.tariffCalc__cartItemName}>{item.title}</span>
                    <div className={styles.tariffCalc__options}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M5 10C7.76142 10 10 7.76142 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5C0 7.76142 2.23858 10 5 10ZM7.39016 3.89017C7.53661 3.74372 7.53661 3.50628 7.39016 3.35983C7.24372 3.21339 7.00628 3.21339 6.85983 3.35983L4.375 5.84467L3.14017 4.60984C2.99372 4.46339 2.75628 4.46339 2.60983 4.60984C2.46339 4.75628 2.46339 4.99372 2.60983 5.14017L4.10983 6.64017C4.25628 6.78661 4.49372 6.78661 4.64017 6.64017L7.39016 3.89017Z" fill="#00B69B" />
                            </svg>
                            {item.id === 'api' && 'Подключенных магазинов:'}
                            {item.id === 'revenue' && 'Выручка:'}
                            {item.id === 'groups' && 'Групп товаров:'}
                        </div>
                        {(item.id === 'api' || item.id === 'groups') && item.amount}
                        {item.id === 'revenue' && item.amount <= 10000000 && `до ${item.amount / 1000000} млн.`}
                        {item.id === 'revenue' && item.amount > 10000000 && `более 10 млн.`}
                    </div>
                </>
            }
            <div className={styles.tariffCalc__cartItemLeft}>
                <div className={styles.tariffCalc__cartItemPeriod}>
                    {activeTab}
                    {promocode && promocode.isValid && promocode.mechanics?.type === 'time' &&
                        <div className={styles.tariffCalc__promocodeTimeBonus}>
                            <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M2.9448 0.122969L4.30647 1.09441C4.32142 1.10506 4.33655 1.11526 4.35185 1.125H5.39815C5.41345 1.11526 5.42858 1.10507 5.44352 1.09441L6.80519 0.122969C7.06424 -0.0618355 7.40484 -0.0362332 7.63802 0.185572C7.91157 0.445783 7.93244 0.837002 7.78157 1.125H8.875C9.35825 1.125 9.75 1.51675 9.75 2V3C9.75 3.48325 9.35825 3.875 8.875 3.875H8.625V7C8.625 7.82843 7.95343 8.5 7.125 8.5H2.625C1.79657 8.5 1.125 7.82843 1.125 7V3.875H0.875C0.391751 3.875 0 3.48325 0 3V2C0 1.51675 0.391751 1.125 0.875 1.125H1.96843C1.81756 0.837002 1.83843 0.445783 2.11198 0.185572C2.34516 -0.0362332 2.68576 -0.061836 2.9448 0.122969ZM2.81897 5.10036V3.875H3.56897V5.10036C3.56897 5.18766 3.66281 5.25231 3.74916 5.21257C4.37943 4.92244 5.11195 4.92244 5.74223 5.21257C5.82857 5.25231 5.92242 5.18766 5.92242 5.10036V3.875H6.67242V5.10036C6.67242 5.74242 6.00481 6.15908 5.42862 5.89385C4.99738 5.69534 4.49401 5.69534 4.06277 5.89385C3.48658 6.15908 2.81897 5.74242 2.81897 5.10036Z" fill="#5329FF" />
                            </svg>
                            +{promocode.mechanics.amount} месяц в подарок
                        </div>
                    }
                </div>
                {item.type &&
                    <div className={styles.tariffCalc__cartItemPrices}>
                        <span className={styles.tariffCalc__cartItemPrice}>
                            {formatPrice(getCartItemTotal(item, item.type, 'new'), '₽')}
                        </span>
                        {item?.oldPrice &&
                            <span className={styles.tariffCalc__cartItemOldPrice}>
                                {formatPrice(getCartItemTotal(item, item.type, 'old'), '₽')}
                            </span>
                        }
                    </div>
                }
                {!item.type &&
                    <div className={styles.tariffCalc__cartItemPrices}>
                        <span className={styles.tariffCalc__cartItemPrice}>
                            {formatPrice(item.price, '₽')}
                        </span>
                        {item?.oldPrice &&
                            <span className={styles.tariffCalc__cartItemOldPrice}>
                                {formatPrice(item.oldPrice, '₽')}
                            </span>
                        }
                    </div>
                }
            </div>
            {hasRemoveButton &&
                <button
                    className={styles.tariffCalc__removeButton}
                    onClick={() => removeItem(item?.id)}
                >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.0459 0.219727C8.3388 -0.0731134 8.81357 -0.0731489 9.10645 0.219727C9.39923 0.512609 9.39926 0.987406 9.10645 1.28027L5.72363 4.66309L9.10645 8.0459C9.3992 8.3388 9.39929 8.8136 9.10645 9.10645C8.8136 9.39929 8.3388 9.3992 8.0459 9.10645L4.66309 5.72363L1.28027 9.10645C0.987424 9.39924 0.512614 9.39918 0.219727 9.10645C-0.0730958 8.81357 -0.0730958 8.33878 0.219727 8.0459L3.60254 4.66309L0.219727 1.28027C-0.0731667 0.98738 -0.0731667 0.51262 0.219727 0.219727C0.51262 -0.0731666 0.98738 -0.0731666 1.28027 0.219727L4.66309 3.60254L8.0459 0.219727Z" fill="#8C8C8C" />
                    </svg>
                </button>
            }
        </div>
    )
}