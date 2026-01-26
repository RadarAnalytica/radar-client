import React, { useState, useEffect } from 'react'
import styles from './Checkout.module.css'
import type { IPaymentItem, IPromocode, ITariffCard } from '../../shared/models/tariffs/tariffs';
import { CalcOptionItem } from './CalcOptionItem';
import { Cart } from './Cart';
import { PlainSelect } from '@/components/sharedComponents/apiServicePagesFiltersComponent/features';


const limitsIcons = {
    "api": (
        <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.34167 0.380004L1.175 2.98417C0.444048 3.44102 0 4.24219 0 5.10417V10.6663C0 11.5282 0.444049 12.3294 1.175 12.7863L5.34167 15.3904C6.15235 15.8971 7.18099 15.8971 7.99166 15.3904L12.1583 12.7863C12.8893 12.3294 13.3333 11.5282 13.3333 10.6663V5.10417C13.3333 4.24219 12.8893 3.44102 12.1583 2.98417L7.99166 0.380004C7.18099 -0.126668 6.15234 -0.126668 5.34167 0.380004ZM7.70833 7.88208C7.70833 7.30678 7.24196 6.84041 6.66667 6.84041C6.09137 6.84041 5.625 7.30678 5.625 7.88208V7.88808C5.625 8.46338 6.09137 8.92975 6.66667 8.92975C7.24196 8.92975 7.70833 8.46338 7.70833 7.88808V7.88208Z" fill="#363538" />
        </svg>
    ),
    "revenue": (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M3.77473 3.98136C3.77445 3.97372 3.77431 3.96604 3.77431 3.95833C3.77431 1.77221 5.54652 0 7.73265 0C9.91877 0 11.691 1.77221 11.691 3.95833C11.691 3.96604 11.6908 3.97372 11.6906 3.98136C13.1462 4.15302 14.3397 5.26725 14.5857 6.74367L15.4191 11.7437C15.7577 13.7754 14.1909 15.625 12.1311 15.625H3.33416C1.27436 15.625 -0.29245 13.7754 0.0461785 11.7437L0.879512 6.74367C1.12558 5.26723 2.31903 4.153 3.77473 3.98136ZM5.02431 3.95833C5.02431 2.46256 6.23688 1.25 7.73265 1.25C9.22842 1.25 10.441 2.46256 10.441 3.95833H5.02431ZM4.39921 8.125C4.85945 8.125 5.23254 7.7519 5.23254 7.29167C5.23254 6.83143 4.85945 6.45833 4.39921 6.45833C3.93897 6.45833 3.56588 6.83143 3.56588 7.29167C3.56588 7.7519 3.93897 8.125 4.39921 8.125ZM11.8992 7.29167C11.8992 7.7519 11.5261 8.125 11.0659 8.125C10.6056 8.125 10.2325 7.7519 10.2325 7.29167C10.2325 6.83143 10.6056 6.45833 11.0659 6.45833C11.5261 6.45833 11.8992 6.83143 11.8992 7.29167Z" fill="#1A1A1A" />
        </svg>
    ),
    "groups": (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.475024 5.45829L2.77899 1.61835C3.3814 0.614329 4.46642 0 5.6373 0H9.3627C10.5336 0 11.6186 0.614329 12.221 1.61835L14.525 5.45829C14.8358 5.97635 15 6.56913 15 7.17328V11.6667C15 13.5076 13.5076 15 11.6667 15H3.33333C1.49238 15 0 13.5076 0 11.6667V7.17328C0 6.56913 0.164193 5.97635 0.475024 5.45829ZM6.16593 5.83333H8.83422C10.105 5.83333 10.9083 4.46815 10.2911 3.35726C9.9972 2.82815 9.4395 2.5 8.83422 2.5H6.16593C5.56065 2.5 5.00295 2.82815 4.709 3.35726C4.09184 4.46815 4.89512 5.83333 6.16593 5.83333Z" fill="#1A1A1A" />
        </svg>
    )
}

const limits = [
    { id: 'api', title: 'API', price: 200, oldPrice: 300, amount: 1, description: 'Количество подключенных магазинов', type: 'limit' },
    { id: 'revenue', title: 'Продажи', price: 200, oldPrice: 300, amount: 0, description: 'Без учета СПП и WB кошелька', type: 'limit' },
    { id: 'groups', title: 'Создание групп товаров', price: 200, oldPrice: 300, amount: 0, description: 'Количество групп товаров', type: 'limit' },
]

const sections = [
    {
        id: 'competitors', title: 'Анализ конкурентов', price: 3000, oldPrice: 3900, pricePerMonth: 1000, isActive: false, type: 'section',
        children: [
            { id: 'calc', title: 'Калькулятор Unit-экономики', price: 3000, oldPrice: 3900, pricePerMonth: 1000, isActive: false, },
            { id: 'skuAnalysis', title: 'Анализ артикула', price: 3000, oldPrice: 3900, pricePerMonth: 1000, isActive: false },
            { id: 'supplierAnalysis', title: 'ААнализ поставщика', price: 3000, oldPrice: 3900, pricePerMonth: 1000, isActive: false },
        ]
    },
    { id: 'niches', title: 'Анализ ниш и трендов', price: 3000, oldPrice: 3900, pricePerMonth: 1000, isActive: false, type: 'section' },
    { id: 'finances', title: 'Мои финансы', price: 3000, oldPrice: 3900, pricePerMonth: 1000, isActive: false, type: 'section' },
    { id: 'advertising', title: 'Моя реклама', price: 3000, oldPrice: 3900, pricePerMonth: 1000, isActive: false, type: 'section' },
    { id: 'seo', title: 'SEO', price: 3000, oldPrice: 3900, pricePerMonth: 1000, isActive: false, type: 'section' },
    { id: 'rnp', title: 'РНП (Рука на пульсе)', price: 3000, oldPrice: 3900, pricePerMonth: 1000, isNew: true, isActive: false, type: 'section' },
];

interface ICheckoutProps {
    activeCartTariff: ITariffCard,
    tabs: Array<{ title: '1 месяц' | '3 месяца' | '6 месяцев' | '12 месяцев', discount: string | null, value: string }>,
    externalActiveTab: '1 месяц' | '3 месяца' | '6 месяцев' | '12 месяцев',
    setExternalActiveTab: (tab: string) => void,
    children?: React.ReactNode,
    payFunction: (item: IPaymentItem, paymentType: 'instant' | 'after_subscription' | 'boost', promocode?: IPromocode) => void
}

export const Checkout: React.FC<ICheckoutProps> = ({ activeCartTariff, externalActiveTab, setExternalActiveTab, tabs, children, payFunction }) => {

    const [activeTab, setActiveTab] = useState<'1 месяц' | '3 месяца' | '6 месяцев' | '12 месяцев' | null>(null)
    const [selectedSections, setSelectedSections] = useState<any[]>(null);
    const [selectedLimits, setSelectedLimits] = useState<any[]>(null);
    const [paymentMethod, setPaymentMethod] = useState<'instant' | 'after_subscription' | 'boost'>('instant')

    const toggleSection = (sectionId: string, childId?: string) => {
        if (!childId) {
            setSelectedSections((prev) => {
                return prev.map(_ => {
                    if (_.id === sectionId) {
                        const { isActive } = _;
                        return {
                            ..._,
                            isActive: !isActive,
                            children: _.children ? _.children.map(_ => ({ ..._, isActive: !isActive })) : undefined
                        }
                    } else {
                        return _;
                    }
                })
            })
        }

        if (childId) {
            setSelectedSections((prev) => {
                return prev.map(_ => {
                    if (_.id === sectionId) {
                        let { isActive, children } = _;
                        children = children?.map(_ => {
                            if (_.id === childId) {
                                return {
                                    ..._,
                                    isActive: !_.isActive
                                }
                            } else {
                                return _;
                            }
                        })

                        const isEveryChildIsActive = children?.every(_ => _.isActive);
                        const isAnyChildIsInactive = children?.some(_ => !_.isActive);

                        let parentStatus = isActive;
                        if (parentStatus && isAnyChildIsInactive) { parentStatus = false };
                        if (!parentStatus && isEveryChildIsActive) { parentStatus = true };
                        return {
                            ..._,
                            isActive: parentStatus,
                            children: [...children]
                        }
                    } else {
                        return _;
                    }
                })
            })
        }
    }

    const removeSection = (sectionId: string) => {
        setSelectedSections((prev) => {
            return prev.map(_ => {
                if (_.id === sectionId) {
                    return {
                        ..._,
                        isActive: false,
                        children: _.children ? _.children.map(_ => ({ ..._, isActive: false })) : undefined
                    }
                } else {
                    return _;
                }
            })
        })
    }

    const changeLimit = (limitId: string, value: string | number) => {
        setSelectedLimits((prev) => prev.map(_ => {
            if (_.id === limitId) {
                return {
                    ..._,
                    amount: value
                }
            } else {
                return _;
            }
            }))
    }


    // external tabs sync
    useEffect(() => {
        if (!activeTab) {
            setActiveTab(externalActiveTab)
        } else {
            setExternalActiveTab(activeTab)
        }
    }, [externalActiveTab, activeTab])

    //init cart and clean up
    useEffect(() => {
        if (!activeCartTariff) {
            setSelectedSections(sections)
            setSelectedLimits(limits)
        }

        return () => { setSelectedSections(null); setSelectedLimits(null) }
    }, [activeCartTariff])

    return (
        <div className={styles.tariffCalc}>
            <p className={styles.tariffCalc__title}>
                {activeCartTariff && `Тариф ${activeCartTariff.title}`}
                {!activeCartTariff && `Калькулятор тарифа`}
            </p>

            <div className={styles.widget__tabs}>
                {tabs.map(_ => {
                    return (
                        <button
                            className={_.title === activeTab ? `${styles.widget__tab} ${styles.widget__tab_active}` : styles.widget__tab}
                            onClick={() => setActiveTab(_.title)}
                            key={_.title}
                        >
                            {_.title}
                            {_.discount &&
                                <div className={_.title === activeTab ? styles.widget__tabDiscount_active : styles.widget__tabDiscount}>{_.discount}</div>
                            }
                        </button>
                    )
                })}
            </div>

            <div className={styles.tariffCalc__body}>
                {/* если кликнули на регулярный тариф (предустановленный) то просто показываем его описание */}
                {activeCartTariff && children &&
                    <div className={styles.tariffCalc__bodyLeft}>
                        <div className={styles.tariffCalc__params}>
                            {children}
                        </div>
                    </div>
                }
                {/* Если это калькулятор, то показываем опции для выбора */}
                {!activeCartTariff &&
                    <div className={styles.tariffCalc__bodyLeft}>
                        <div className={styles.tariffCalc__params}>
                            <div className={styles.tariffCalc__sectionWrapper}>
                                {selectedLimits?.map(_ => {
                                    return (
                                        <div className={styles.tariffCalc__section} key={_.id}>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                                <div className={styles.tariffCard__featuresList}>
                                                    {limitsIcons[_.id]}
                                                    {_.title}
                                                </div>
                                                <span style={{ fontSize: '10px', color: '#8c8c8c' }}>{_.description}</span>
                                            </div>
                                            {_.id === 'api' &&
                                                <div className={styles.tariffCalc__counter}>
                                                    <button
                                                        className={styles.tariffCalc__counterButton}
                                                        onClick={() => {
                                                            let newValue = _.amount > 0 ? _.amount - 1 : 0
                                                            changeLimit(_.id, newValue)
                                                        }}
                                                    >-</button>
                                                    <div className={styles.tariffCalc__counterValue}>
                                                        {_.amount}
                                                    </div>
                                                    <button
                                                        className={styles.tariffCalc__counterButton}
                                                        onClick={() => {
                                                            let newValue = _.amount < 30 ? _.amount + 1 : 30
                                                            changeLimit(_.id, newValue)
                                                        }}
                                                    >+</button>
                                                </div>
                                            }
                                            {_.id === 'revenue' &&
                                                <div>
                                                    <PlainSelect
                                                        optionsData={[
                                                            { value: 0, label: 'Не выбрано' },
                                                            { value: 1000000, label: 'до 1 000 000 рублей' },
                                                            { value: 3000000, label: 'до 3 000 000 рублей' },
                                                            { value: 5000000, label: 'до 5 000 000 рублей' },
                                                            { value: 10000000, label: 'до 10 000 000 рублей' },
                                                            { value: 11000000, label: 'более 10 000 000 рублей' },
                                                        ]}
                                                        value={_.amount}
                                                        // label=' Лимит выручки'
                                                        label=''
                                                        selectId='shopLimit'
                                                        handler={(value) => changeLimit(_.id, value)}
                                                        disabled={false}
                                                        allowClear={false}
                                                        style={{ maxWidth: 'unset' }}
                                                        mode=''
                                                    />
                                                </div>
                                            }
                                            {_.id === 'groups' &&
                                                <div>
                                                    <PlainSelect
                                                        optionsData={[
                                                            { value: 0, label: 'Не выбрано' },
                                                            { value: 5, label: 'до 5 групп' },
                                                            { value: 10, label: 'до 10 групп' },
                                                            { value: 15, label: 'до 15 групп' },
                                                            { value: 20, label: 'до 20 групп' },
                                                        ]}
                                                        value={_.amount}
                                                        // label=' Лимит выручки'
                                                        label=''
                                                        selectId='shopLimit'
                                                        handler={(value) => changeLimit(_.id, value)}
                                                        disabled={false}
                                                        allowClear={false}
                                                        style={{ maxWidth: 'unset' }}
                                                        mode=''
                                                    />
                                                </div>
                                            }
                                        </div>
                                    )
                                })}

                            </div>

                            <p className={styles.tariffCalc__subtitle}>Разделы</p>

                            <div className={styles.tariffCalc__sections}>
                                {selectedSections?.map(section => {
                                    return (
                                        <CalcOptionItem
                                            key={section.id}
                                            section={section}
                                            onChange={toggleSection}
                                            isSelected={section.isActive}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                }
                <Cart
                    selectedSections={selectedSections}
                    activeCartTariff={activeCartTariff}
                    removeSection={removeSection}
                    activeTab={activeTab}
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                    payFunction={payFunction}
                    selectedLimits={selectedLimits}
                    tabs={tabs}
                />
            </div>
        </div>
    )
}