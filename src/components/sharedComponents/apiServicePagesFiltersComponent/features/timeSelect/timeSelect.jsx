import React, { useState, useEffect, useRef, useCallback } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ru } from 'date-fns/locale';
import { format } from 'date-fns';
import styles from './timeSelect.module.css';
import { SelectIcon } from '../../shared';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { actions as filtersActions } from '../../../../../redux/apiServicePagesFiltersState/apiServicePagesFilterState.slice';
import { Select, ConfigProvider } from 'antd';
import DatePickerCustomDropdown from '../../shared/datePickerCustomDropdown/datePickerCustomDropdown';

const predefinedRanges = [
    {
        value: 7,
        title: '7 дней'
    },
    {
        value: 14,
        title: '14 дней'
    },
    {
        value: 30,
        title: '30 дней'
    },
    {
        value: 90,
        title: '90 дней'
    },
    {
        value: 0,
        title: 'Произвольные даты'
    }
];

/**
 * customSubmit - отдает выбранные значения наруду (если нет то диспатчит в фильтры)
 * customValue - уонтроллед-значение (если нет то берет из selectedRange из фильтров)
 * allowedRanges - массив доступных диапазонов для predefinedRanges (если не передан или пустой то используется predefinedRanges)
 * allowedRanges - массив values из predefinedRanges
 * TODO: переделать компонент на полностью тупой
 */

export const TimeSelect = ({ 
    isDataLoading, 
    maxCustomDate, 
    minCustomDate, 
    customSubmit, 
    customValue, 
    allowedRanges,
    hasLabel = true,
    disabled = false,
}) => {

    const getAllowedRanges = useCallback((allowedRanges) => {
        let ranges = predefinedRanges;
        if (!allowedRanges || allowedRanges.length === 0) {
            return ranges;
        } else {
            ranges = predefinedRanges.filter(range => allowedRanges.includes(range.value));
            return ranges;
        }
    }, [allowedRanges]);



    const dispatch = useAppDispatch();
    const { selectedRange } = useAppSelector(store => store.filters);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [month, setMonth] = useState(new Date());
    const [localSelectedRange, setLocalSelectedRange] = useState({ from: null, to: null });
    const [selectOptions, setSelectOptions] = useState(getAllowedRanges(allowedRanges));
    const [selectValue, setSelectValue] = useState();
    const maxDate = maxCustomDate ? maxCustomDate : new Date();
    const today = new Date();
    let minDate = minCustomDate ? new Date(minCustomDate) : new Date(today);

    if (!minCustomDate) {
        minDate.setDate(today.getDate() - 90);
    }

   

    const startMonth = new Date(today);
    startMonth.setDate(today.getDate() - 90);
    const endMonth = new Date(today);

    const icon = <SelectIcon />;


    const customRuLocale = {
        ...ru,
        localize: {
            ...ru.localize,
            month: (n, options) => {
                const monthName = ru.localize.month(n, options);
                return monthName.charAt(0).toUpperCase() + monthName.slice(1);
            },
        },
    };

    const handleDayClick = (day) => {
        if (!localSelectedRange.from || (localSelectedRange.from && localSelectedRange.to)) {
            setLocalSelectedRange({ from: day, to: null });
        } else if (localSelectedRange.from && !localSelectedRange.to) {
            const { from } = localSelectedRange;
            const newRange = day < from
                ? { from: format(day, 'yyyy-MM-dd'), to: format(from, 'yyyy-MM-dd') }
                : { from: format(from, 'yyyy-MM-dd'), to: format(day, 'yyyy-MM-dd') };
            setLocalSelectedRange(newRange);
            setSelectValue(0);
            if (customSubmit) {
                customSubmit(newRange);
            } else {
                dispatch(filtersActions.setPeriod(newRange));
                localStorage.setItem('selectedRange', JSON.stringify(newRange));
            }
            setIsCalendarOpen(false);
        }
    };

    const periodRef = useRef(null);


    const timeSelectChangeHandler = (value) => {
        if (value !== 0) {
            setSelectValue(value);
            setSelectOptions(getAllowedRanges(allowedRanges));
            setLocalSelectedRange({ from: null, to: null });
            if (customSubmit) {
                customSubmit({ period: value });
            } else {
                dispatch(filtersActions.setPeriod({ period: value }));
                localStorage.setItem('selectedRange', JSON.stringify({ period: value }));
            }
        } else {
            setLocalSelectedRange({ from: null, to: null });
            setIsCalendarOpen(true);
        }
    };

    useEffect(() => {
        if (customValue) {
            if (customValue.period && customValue.period !== selectValue) {
                setSelectValue(customValue.period);
            }
            if (!selectedRange.period && selectValue !== 0) {
                setSelectValue(0);
            }
        } else {
            if (selectedRange && selectedRange.period && selectedRange.period !== selectValue) {
                setSelectValue(selectedRange.period);
            }
            if (selectedRange && !selectedRange.period && selectValue !== 0) {
                setSelectValue(0);
            }
        }
    }, [selectedRange, customValue]);

    useEffect(() => {
        if (selectValue === undefined) {
            if (selectedRange.period) {
                setSelectValue(selectedRange.period);
            }

            if (selectedRange.from && selectedRange.to) {
                setSelectValue(0);
                const newOptions = [...selectOptions].map(_ => {
                    if (_.value === 0) {
                        _.title = `${format(selectedRange.from, 'dd.MM.yyyy')} - ${format(selectedRange.to, 'dd.MM.yyyy')}`;
                    }

                    return _;
                });
                setSelectOptions(newOptions);
            }
        }
    }, [selectValue]);

    useEffect(() => {
        let newOptions = selectOptions;
        if (customValue) {
            if (selectValue === 0 && !customValue.period) {
                newOptions = [...newOptions].map(_ => {
                    if (_.value === 0) {
                        _.title = `${format(customValue.from, 'dd.MM.yyyy')} - ${format(customValue.to, 'dd.MM.yyyy')}`;
                    }
    
                    return _;
                });
            } else {
                newOptions = [...newOptions].map(_ => {
                    if (_.value === 0) {
                        _.title = `Произвольные даты`;
                    }
    
                    return _;
                });
            }
        } else {
            if (selectValue === 0 && !selectedRange.period) {
                newOptions = [...newOptions].map(_ => {
                    if (_.value === 0) {
                        _.title = `${format(selectedRange.from, 'dd.MM.yyyy')} - ${format(selectedRange.to, 'dd.MM.yyyy')}`;
                    }
    
                    return _;
                });
            } else {
                newOptions = [...newOptions].map(_ => {
                    if (_.value === 0) {
                        _.title = `Произвольные даты`;
                    }
    
                    return _;
                });
            }
        }
        
        setSelectOptions(newOptions);
    }, [selectedRange, selectValue, customValue]);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (periodRef.current && !periodRef.current.contains(event.target) && !event.target.classList.value.includes('ant')) {
                setIsCalendarOpen(false);
                setLocalSelectedRange({ from: null, to: null });
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.calendarContainer} ref={periodRef}>
            {hasLabel && <label className={styles.label} htmlFor="period">
                Период:
            </label>}
            <div className={styles.mainSelectWrapper}>
                <ConfigProvider
                    theme={{
                        token: {
                            //colorBgBase: '#EAEAF1',
                            colorBgContainer: 'white',
                            colorBorder: '#5329FF1A',
                            borderRadius: 8,
                            fontFamily: 'Manrope',
                            fontSize: 12
                        },
                        components: {
                            Select: {
                                activeBorderColor: '#5329FF1A',
                                activeOutlineColor: 'transparent',
                                hoverBorderColor: '#5329FF1A',
                                optionActiveBg: 'transparent',
                                optionFontSize: 14,
                                optionSelectedBg: 'transparent',
                                optionSelectedColor: '#5329FF',
                            }
                        }
                    }}
                >
                    <Select
                        size='large'
                        getPopupContainer={(triggerNode) => triggerNode.parentNode}
                        suffixIcon={icon}
                        className={styles.select}
                        options={[...selectOptions].map(i => {
                            return ({ value: i.value, label: i.title });
                        })}
                        onOpenChange={(visible) => {
                            let newOptions = selectOptions;
                            if (!visible && !selectedRange.period) {
                                newOptions = [...newOptions].map(_ => {
                                    if (_.value === 0) {
                                        _.title = `${format(selectedRange.from, 'dd.MM.yyyy')} - ${format(selectedRange.to, 'dd.MM.yyyy')}`;
                                    }

                                    return _;
                                });
                            } else if (visible) {
                                newOptions = [...newOptions].map(_ => {
                                    if (_.value === 0) {
                                        _.title = `Произвольные даты`;
                                    }

                                    return _;
                                });
                            }
                            setSelectOptions(newOptions);
                        }}
                        value={selectValue}
                        onSelect={timeSelectChangeHandler}
                        disabled={isCalendarOpen || isDataLoading || disabled}
                        placeholder={'опция'}
                    />
                </ConfigProvider>
            </div>
            <div className={`${styles.calendarPopup} ${isCalendarOpen ? styles.visible : ''}`}>
                {isCalendarOpen &&
                    <DayPicker
                        minDate={minDate}
                        maxDate={maxDate}
                        mode="range"
                        selected={localSelectedRange}
                        month={month}
                        onMonthChange={setMonth}
                        captionLayout="dropdown"
                        className={styles.customDayPicker}
                        locale={customRuLocale}
                        onDayClick={handleDayClick}
                        disabled={[
                            { before: minDate },
                            { after: maxDate },
                        ]}
                        startMonth={startMonth}
                        endMonth={endMonth}
                        components={{
                            Dropdown: DatePickerCustomDropdown
                        }}
                    />}
            </div>

        </div>
    );
};
