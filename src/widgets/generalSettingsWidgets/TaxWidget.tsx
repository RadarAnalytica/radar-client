import React, { useState, useEffect, useContext, useMemo } from 'react';
import styles from './TaxWidget.module.css';
import { useAppSelector } from '@/redux/hooks';
import AuthContext from '@/service/AuthContext';
import { InputNumber, Select, Button, ConfigProvider, Collapse } from 'antd';
import { SelectIcon } from '@/shared';
import { monthNames } from '@/service/utils';
import { ServiceFunctions } from '@/service/serviceFunctions';

const { Panel } = Collapse;

interface MonthData {
    month: number;
    tax_rate: number | null;
    vat_rate: number | null;
}

interface QuarterData {
    quarter: number;
    tax_rate: number | null;
    vat_rate: number | null;
    months: MonthData[];
}

interface TaxData {
    shop_id: number;
    year: number;
    tax_type: string;
    quarters: QuarterData[];
}

const taxTypeOptions = [
    { value: 'УСН-доходы', label: 'УСН-доходы' },
    { value: 'УСН Д-Р', label: 'УСН Д-Р' },
    { value: 'Не считать налог', label: 'Не считать налог' },
    { value: 'Считать от РС', label: 'Считать от РС' }
];

const getQuarterMonths = (quarter: number): number[] => {
    switch (quarter) {
        case 1: return [1, 2, 3]; // Январь, Февраль, Март
        case 2: return [4, 5, 6]; // Апрель, Май, Июнь
        case 3: return [7, 8, 9]; // Июль, Август, Сентябрь
        case 4: return [10, 11, 12]; // Октябрь, Ноябрь, Декабрь
        default: return [];
    }
};

const initializeQuarters = (): QuarterData[] => {
    return [1, 2, 3, 4].map(quarter => ({
        quarter,
        tax_rate: null,
        vat_rate: null,
        months: getQuarterMonths(quarter).map(month => ({
            month,
            tax_rate: null,
            vat_rate: null
        }))
    }));
};

export const TaxWidget = () => {
    const { authToken } = useContext(AuthContext);
    const shops = useAppSelector((state) => state.shopsSlice.shops);
    const [selectedShopId, setSelectedShopId] = useState<number | null>(null);
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [selectedTaxType, setSelectedTaxType] = useState<string>('УСН-доходы');
    const [quarters, setQuarters] = useState<QuarterData[]>(initializeQuarters());
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [expandedQuarters, setExpandedQuarters] = useState<string[]>(['1', '2', '3', '4']);

    const shopOptions = useMemo(() => {
        if (!shops || shops.length === 0) return [];
        return shops.map(shop => ({
            value: shop.id,
            label: shop.brand_name
        }));
    }, [shops]);

    const yearOptions = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let i = currentYear - 5; i <= currentYear + 5; i++) {
            years.push({ value: i, label: i.toString() });
        }
        return years;
    }, []);

    // Загрузка данных при изменении фильтров (магазин и год)
    useEffect(() => {
        if (selectedShopId && selectedYear) {
            loadTaxData();
        }
    }, [selectedShopId, selectedYear]);

    // При изменении режима налогообложения обновляем тип во всех данных
    useEffect(() => {
        // Режим налогообложения используется при сохранении, не требует перезагрузки данных
    }, [selectedTaxType]);

    // Установка первого магазина по умолчанию
    useEffect(() => {
        if (shops && shops.length > 0 && !selectedShopId) {
            setSelectedShopId(shops[0].id);
        }
    }, [shops]);

    const loadTaxData = async () => {
        if (!selectedShopId || !authToken) return;
        
        setLoading(true);
        try {
            const data = await ServiceFunctions.getTaxRates(authToken, selectedShopId, selectedYear);
            
            // Обработка полученных данных
            if (data && data.data && data.data.length > 0) {
                const yearData = data.data.find(d => d.year === selectedYear);
                if (yearData && yearData.rates) {
                    const newQuarters = initializeQuarters();
                    
                    yearData.rates.forEach((rate: any) => {
                        const date = new Date(rate.effective_from);
                        const month = date.getMonth() + 1; // getMonth() возвращает 0-11
                        const quarter = Math.ceil(month / 3);
                        
                        const quarterIndex = quarter - 1;
                        const monthIndex = newQuarters[quarterIndex].months.findIndex(m => m.month === month);
                        
                        if (monthIndex !== -1) {
                            newQuarters[quarterIndex].months[monthIndex].tax_rate = rate.tax_rate;
                            newQuarters[quarterIndex].months[monthIndex].vat_rate = rate.vat_rate;
                        }
                    });

                    // Обновляем значения кварталов на основе последнего месяца каждого квартала
                    newQuarters.forEach(quarter => {
                        const lastMonth = quarter.months[quarter.months.length - 1];
                        if (lastMonth.tax_rate !== null) {
                            quarter.tax_rate = lastMonth.tax_rate;
                        }
                        if (lastMonth.vat_rate !== null) {
                            quarter.vat_rate = lastMonth.vat_rate;
                        }
                    });

                    setQuarters(newQuarters);
                    if (yearData.rates.length > 0) {
                        setSelectedTaxType(yearData.rates[0]?.tax_type || selectedTaxType);
                    }
                } else {
                    // Если данных нет, инициализируем пустые кварталы
                    setQuarters(initializeQuarters());
                }
            } else {
                // Если данных нет, инициализируем пустые кварталы
                setQuarters(initializeQuarters());
            }
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
            // В случае ошибки инициализируем пустые кварталы
            setQuarters(initializeQuarters());
        } finally {
            setLoading(false);
        }
    };

    const handleQuarterChange = (quarterIndex: number, field: 'tax_rate' | 'vat_rate', value: number | null) => {
        setQuarters(prev => {
            const newQuarters = [...prev];
            newQuarters[quarterIndex] = {
                ...newQuarters[quarterIndex],
                [field]: value,
                months: newQuarters[quarterIndex].months.map(month => ({
                    ...month,
                    [field]: value
                }))
            };
            return newQuarters;
        });
    };

    const handleMonthChange = (quarterIndex: number, monthIndex: number, field: 'tax_rate' | 'vat_rate', value: number | null) => {
        setQuarters(prev => {
            const newQuarters = [...prev];
            const quarter = newQuarters[quarterIndex];
            const month = quarter.months[monthIndex];
            
            // Обновляем месяц
            quarter.months[monthIndex] = {
                ...month,
                [field]: value
            };

            // Если это последний месяц квартала, обновляем соответствующее поле квартала
            if (monthIndex === quarter.months.length - 1) {
                quarter[field] = value;
            }

            return newQuarters;
        });
    };

    const handleSave = async () => {
        if (!selectedShopId || !authToken) return;

        setSaving(true);
        try {
            const taxRates = quarters.flatMap(quarter => 
                quarter.months.map(month => ({
                    effective_from: `${selectedYear}-${String(month.month).padStart(2, '0')}-01`,
                    tax_type: selectedTaxType,
                    tax_rate: month.tax_rate || 0,
                    vat_rate: month.vat_rate || 0
                }))
            );

            const dataToSave = {
                shop_id: selectedShopId,
                tax_rates: taxRates
            };

            const response = await ServiceFunctions.setShopTax(authToken, dataToSave);
            
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Ошибка при сохранении:', errorData);
                alert('Не удалось сохранить данные');
                return;
            }

            alert('Данные успешно сохранены');
        } catch (error) {
            console.error('Ошибка при сохранении:', error);
            alert('Произошла ошибка при сохранении данных');
        } finally {
            setSaving(false);
        }
    };

    const handleCollapseChange = (keys: string | string[]) => {
        setExpandedQuarters(Array.isArray(keys) ? keys : [keys]);
    };

    // Проверка, является ли месяц будущим
    const isMonthDisabled = (month: number, year: number): boolean => {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1; // getMonth() возвращает 0-11
        
        // Если год в будущем, все месяцы доступны
        if (year > currentYear) {
            return false;
        }
        
        // Если год в прошлом, все месяцы доступны
        if (year < currentYear) {
            return false;
        }
        
        // Если год текущий, проверяем месяц
        return month > currentMonth;
    };

    // Проверка, является ли квартал полностью в будущем
    const isQuarterDisabled = (quarter: QuarterData, year: number): boolean => {
        // Если хотя бы один месяц квартала не disabled, квартал доступен
        return quarter.months.every(month => isMonthDisabled(month.month, year));
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#5329FF',
                    borderRadius: 8,
                    fontFamily: 'Manrope',
                },
                components: {
                    Select: {
                        controlHeight: 38,
                    },
                    InputNumber: {
                        controlHeight: 38,
                    },
                    Button: {
                        controlHeight: 38,
                    }
                }
            }}
        >
            <div className={styles.widget}>
                <div className={styles.widget__header}>
                    <div className={styles.widget__filters}>
                        <div className={styles.filter__item}>
                            <label className={styles.filter__label}>Магазин:</label>
                            <Select
                                value={selectedShopId}
                                onChange={setSelectedShopId}
                                options={shopOptions}
                                className={styles.filter__select}
                                suffixIcon={<SelectIcon />}
                                placeholder="Выберите магазин"
                                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                            />
                        </div>
                        
                        <div className={styles.filter__divider}></div>
                        
                        <div className={styles.filter__item}>
                            <label className={styles.filter__label}>Год:</label>
                            <Select
                                value={selectedYear}
                                onChange={setSelectedYear}
                                options={yearOptions}
                                className={styles.filter__select}
                                suffixIcon={<SelectIcon />}
                                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                            />
                        </div>
                        
                        <div className={styles.filter__item}>
                            <label className={styles.filter__label}>Режим налогообложения:</label>
                            <Select
                                value={selectedTaxType}
                                onChange={setSelectedTaxType}
                                options={taxTypeOptions}
                                className={styles.filter__select}
                                suffixIcon={<SelectIcon />}
                                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                            />
                        </div>
                    </div>
                    
                    <Button
                        type="primary"
                        onClick={handleSave}
                        loading={saving}
                        className={styles.widget__saveButton}
                    >
                        Сохранить
                    </Button>
                </div>

            <div className={styles.widget__quarters}>
                {quarters.map((quarter, quarterIndex) => {
                    const quarterIsDisabled = isQuarterDisabled(quarter, selectedYear);
                    return (
                    <div 
                        key={quarter.quarter} 
                        className={`${styles.quarter__block} ${quarterIsDisabled ? styles.quarter__blockDisabled : ''}`}
                    >
                        <div className={styles.quarter__header}>
                            <h3 className={styles.quarter__title}>{quarter.quarter} квартал</h3>
                            <div className={styles.quarter__inputs}>
                                <div className={styles.quarter__inputGroup}>
                                    <label className={styles.quarter__inputLabel}>Ставка, %</label>
                                    <InputNumber
                                        value={quarter.tax_rate}
                                        onChange={(value) => handleQuarterChange(quarterIndex, 'tax_rate', value)}
                                        min={0}
                                        max={100}
                                        precision={2}
                                        className={styles.quarter__input}
                                        placeholder="0"
                                        disabled={isQuarterDisabled(quarter, selectedYear)}
                                    />
                                </div>
                                <div className={styles.quarter__inputGroup}>
                                    <label className={styles.quarter__inputLabel}>НДС, %</label>
                                    <InputNumber
                                        value={quarter.vat_rate}
                                        onChange={(value) => handleQuarterChange(quarterIndex, 'vat_rate', value)}
                                        min={0}
                                        max={100}
                                        precision={2}
                                        className={styles.quarter__input}
                                        placeholder="0"
                                        disabled={isQuarterDisabled(quarter, selectedYear)}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles.quarter__divider}></div>
                        
                        <Collapse
                            activeKey={expandedQuarters}
                            onChange={handleCollapseChange}
                            className={styles.quarter__collapse}
                            expandIcon={({ isActive }) => (
                                <span className={`${styles.quarter__collapseIcon} ${!isActive ? styles.quarter__collapseIconHidden : ''}`}>
                                    <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.75 0.75L5.75 5.75L10.75 0.75" stroke="#8C8C8C" strokeWidth="1.5" strokeLinecap="round"/>
                                    </svg>
                                </span>
                            )}
                        >
                            <Panel 
                                header="По месяцам" 
                                key={quarter.quarter.toString()}
                                className={styles.quarter__panel}
                            >
                                <div className={styles.quarter__months}>
                                    {quarter.months.map((month, monthIndex) => (
                                        <div key={month.month} className={styles.month__row}>
                                            <span className={styles.month__name}>
                                                {monthNames[month.month as keyof typeof monthNames]}
                                            </span>
                                            <div className={styles.month__inputs}>
                                                <div className={styles.month__inputGroup}>
                                                    <label className={styles.month__inputLabel}>Ставка, %</label>
                                                    <InputNumber
                                                        value={month.tax_rate}
                                                        onChange={(value) => handleMonthChange(quarterIndex, monthIndex, 'tax_rate', value)}
                                                        min={0}
                                                        max={100}
                                                        precision={2}
                                                        className={styles.month__input}
                                                        placeholder="0"
                                                        disabled={isMonthDisabled(month.month, selectedYear)}
                                                    />
                                                </div>
                                                <div className={styles.month__inputGroup}>
                                                    <label className={styles.month__inputLabel}>НДС, %</label>
                                                    <InputNumber
                                                        value={month.vat_rate}
                                                        onChange={(value) => handleMonthChange(quarterIndex, monthIndex, 'vat_rate', value)}
                                                        min={0}
                                                        max={100}
                                                        precision={2}
                                                        className={styles.month__input}
                                                        placeholder="0"
                                                        disabled={isMonthDisabled(month.month, selectedYear)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Panel>
                        </Collapse>
                    </div>
                    );
                })}
            </div>
        </div>
        </ConfigProvider>
    );
};
