import React, { useState, useEffect, useContext, useMemo, useRef } from 'react';
import styles from './TaxWidget.module.css';
import { useAppSelector } from '@/redux/hooks';
import AuthContext from '@/service/AuthContext';
import { InputNumber, Select, Button, ConfigProvider, Collapse } from 'antd';
import { SelectIcon } from '@/shared';
import { monthNames } from '@/service/utils';
import { ServiceFunctions } from '@/service/serviceFunctions';
import Loader from '@/components/ui/Loader';
import NoData from '@/components/sharedComponents/NoData/NoData';

const { Panel } = Collapse;

interface MonthData {
    month: number;
    tax_rate: number | null;
    vat_rate: number | null;
    disabled: boolean;
}

interface QuarterData {
    quarter: number;
    tax_rate: number | null;
    vat_rate: number | null;
    months: MonthData[];
}

interface TaxRateData {
    effective_from: string;
    tax_type: string;
    tax_rate: number | null;
    vat_rate: number | null;
}

interface TaxYearData {
    year: number;
    rates: TaxRateData[];
}

const taxTypeOptions = [
    { value: 'УСН-доходы', label: 'УСН-доходы' },
    { value: 'УСН Д-Р', label: 'УСН Д-Р' },
    { value: 'Не считать налог', label: 'Не считать налог' },
    { value: 'Считать от РС', label: 'Считать от РС' }
];

const DEFAULT_TAX_TYPE = 'УСН-доходы';

const getQuarterMonths = (quarter: number): number[] => {
    switch (quarter) {
        case 1: return [1, 2, 3]; // Январь, Февраль, Март
        case 2: return [4, 5, 6]; // Апрель, Май, Июнь
        case 3: return [7, 8, 9]; // Июль, Август, Сентябрь
        case 4: return [10, 11, 12]; // Октябрь, Ноябрь, Декабрь
        default: return [];
    }
};

const initializeQuarters = (isDisabled = false): QuarterData[] => {
    return [1, 2, 3, 4].map(quarter => ({
        quarter,
        tax_rate: null,
        vat_rate: null,
        months: getQuarterMonths(quarter).map(month => ({
            month,
            tax_rate: null,
            vat_rate: null,
            disabled: isDisabled
        }))
    }));
};

interface YearFormData {
    year: number;
    tax_type: string;
    quarters: QuarterData[];
}

const buildYearForm = (year: number, rates: TaxRateData[]): YearFormData => {
    const quarters = initializeQuarters(true);

    rates.forEach((rate) => {
        const date = new Date(rate.effective_from);
        const month = date.getMonth() + 1;
        const quarter = Math.ceil(month / 3);
        const quarterIndex = quarter - 1;
        const monthIndex = quarters[quarterIndex].months.findIndex(m => m.month === month);

        if (monthIndex !== -1) {
            const targetMonth = quarters[quarterIndex].months[monthIndex];
            quarters[quarterIndex].months[monthIndex] = {
                ...targetMonth,
                tax_rate: rate.tax_rate,
                vat_rate: rate.vat_rate,
                disabled: false
            };
        }
    });

    quarters.forEach(quarter => {
        const lastMonth = quarter.months[quarter.months.length - 1];
        if (!lastMonth.disabled && lastMonth.tax_rate !== null) {
            quarter.tax_rate = lastMonth.tax_rate;
        }
        if (!lastMonth.disabled && lastMonth.vat_rate !== null) {
            quarter.vat_rate = lastMonth.vat_rate;
        }
    });

    return {
        year,
        tax_type: rates[0]?.tax_type || DEFAULT_TAX_TYPE,
        quarters
    };
};

export const TaxWidget = () => {
    const { authToken } = useContext(AuthContext);
    const shops = useAppSelector((state) => state.shopsSlice.shops);
    const [selectedShopId, setSelectedShopId] = useState<number | null>(null);
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [yearForms, setYearForms] = useState<Record<number, YearFormData>>({});
    const [yearOptions, setYearOptions] = useState<{ value: number; label: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [expandedQuarters, setExpandedQuarters] = useState<string[]>(['1', '2', '3', '4']);
    const [isDirty, setIsDirty] = useState(false);
    const initialYearFormsRef = useRef<Record<number, YearFormData>>({});

    const shopOptions = useMemo(() => {
        if (!shops || shops.length === 0) return [];
        return shops.map(shop => ({
            value: shop.id,
            label: shop.brand_name
        }));
    }, [shops]);

    const activeYearForm = yearForms[selectedYear];

    // Загрузка данных при изменении магазина
    useEffect(() => {
        if (!selectedShopId || !authToken) return;

        const loadTaxData = async () => {
            setLoading(true);
            try {
                const data = await ServiceFunctions.getShopTax(authToken, selectedShopId);
                const yearData = Array.isArray(data?.data) ? data.data : [];
                const newYearForms: Record<number, YearFormData> = {};
                const newYearOptions = yearData
                    .map((yearItem: TaxYearData) => {
                        newYearForms[yearItem.year] = buildYearForm(yearItem.year, yearItem.rates || []);
                        return { value: yearItem.year, label: yearItem.year.toString() };
                    })
                    .sort((a, b) => a.value - b.value);

                setYearForms(newYearForms);
                setYearOptions(newYearOptions);
                initialYearFormsRef.current = newYearForms;
                setIsDirty(false);

                if (newYearOptions.length > 0) {
                    setSelectedYear(prevYear => {
                        const isSelectedAvailable = newYearOptions.some(option => option.value === prevYear);
                        return isSelectedAvailable ? prevYear : newYearOptions[0].value;
                    });
                }
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
                setYearForms({});
                setYearOptions([]);
            } finally {
                setLoading(false);
            }
        };

        loadTaxData();
    }, [selectedShopId, authToken]);

    useEffect(() => {
        if (loading) return;
        const current = JSON.stringify(yearForms);
        const initial = JSON.stringify(initialYearFormsRef.current);
        setIsDirty(current !== initial);
    }, [yearForms, loading]);

    // Установка первого магазина по умолчанию
    useEffect(() => {
        if (shops?.length > 0 && !selectedShopId) {
            setSelectedShopId(shops[0].id);
        }
    }, [shops, selectedShopId]);

    const handleQuarterChange = (quarterIndex: number, field: 'tax_rate' | 'vat_rate', value: number | null) => {
        setYearForms(prev => {
            const currentYearForm = prev[selectedYear];
            if (!currentYearForm) return prev;

            const newQuarters = [...currentYearForm.quarters];
            newQuarters[quarterIndex] = {
                ...newQuarters[quarterIndex],
                [field]: value,
                months: newQuarters[quarterIndex].months.map(month => (
                    month.disabled ? month : { ...month, [field]: value }
                ))
            };

            return {
                ...prev,
                [selectedYear]: {
                    ...currentYearForm,
                    quarters: newQuarters
                }
            };
        });
    };

    const handleMonthChange = (quarterIndex: number, monthIndex: number, field: 'tax_rate' | 'vat_rate', value: number | null) => {
        setYearForms(prev => {
            const currentYearForm = prev[selectedYear];
            if (!currentYearForm) return prev;

            const newQuarters = [...currentYearForm.quarters];
            const quarter = newQuarters[quarterIndex];
            const month = quarter.months[monthIndex];
            
            if (month.disabled) {
                return prev;
            }

            quarter.months[monthIndex] = {
                ...month,
                [field]: value
            };

            if (monthIndex === quarter.months.length - 1) {
                quarter[field] = value;
            }

            return {
                ...prev,
                [selectedYear]: {
                    ...currentYearForm,
                    quarters: newQuarters
                }
            };
        });
    };

    const handleSave = async () => {
        if (!selectedShopId || !authToken) return;

        setSaving(true);
        try {
            const taxRates = Object.values(yearForms).flatMap(yearForm =>
                yearForm.quarters.flatMap(quarter =>
                    quarter.months
                        .filter(month => !month.disabled)
                        .map(month => ({
                            effective_from: `${yearForm.year}-${String(month.month).padStart(2, '0')}-01`,
                            tax_type: yearForm.tax_type,
                            tax_rate: month.tax_rate ?? 0,
                            vat_rate: month.vat_rate ?? 0
                        }))
                )
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
            initialYearFormsRef.current = yearForms;
            setIsDirty(false);
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

    const isQuarterDisabled = (quarter: QuarterData): boolean => {
        return quarter.months.every(month => month.disabled);
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
                                    value={activeYearForm?.tax_type || DEFAULT_TAX_TYPE}
                                    onChange={(value) => {
                                        if (!activeYearForm) return;
                                        setYearForms(prev => ({
                                            ...prev,
                                            [selectedYear]: {
                                                ...activeYearForm,
                                                tax_type: value
                                            }
                                        }));
                                    }}
                                    options={taxTypeOptions}
                                    className={styles.filter__select}
                                    suffixIcon={<SelectIcon />}
                                    getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                    disabled={!activeYearForm}
                                />
                            </div>
                    </div>
                    
                    <Button
                        type="primary"
                        onClick={handleSave}
                        loading={saving}
                        disabled={!activeYearForm || !isDirty || saving}
                        className={styles.widget__saveButton}
                        title={!isDirty ? 'Начните заполнять форму' : 'Сохранить данные по налогам'}
                    >
                        Сохранить
                    </Button>
                </div>

            {loading && <Loader loading={loading} progress={null} />}
            {!loading && yearOptions.length > 0 ? yearOptions.map((yearOption) => {
                const yearForm = yearForms[yearOption.value];
                if (!yearForm) return null;

                return (
                    <div
                        key={yearOption.value}
                        className={`${styles.year__container} ${selectedYear !== yearOption.value ? styles.year__containerHidden : ''}`}
                    >
                        <div className={styles.widget__quarters}>
                            {yearForm.quarters.map((quarter, quarterIndex) => {
                                const quarterIsDisabled = isQuarterDisabled(quarter);
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
                                                    disabled={quarterIsDisabled}
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
                                                    disabled={quarterIsDisabled}
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
                                                                    disabled={month.disabled}
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
                                                                    disabled={month.disabled}
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
                );
            }) : <NoData message="Нет данных по налогам у выбранного магазина" />}
        </div>
        </ConfigProvider>
    );
};
