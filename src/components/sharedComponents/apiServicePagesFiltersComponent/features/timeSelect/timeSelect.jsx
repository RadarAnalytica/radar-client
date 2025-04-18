import React, { useState, useEffect, useRef } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ru } from 'date-fns/locale';
import { format } from 'date-fns';
import styles from './timeSelect.module.css';
import { SelectIcon } from '../../shared'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { actions as filtersActions } from '../../../../../redux/apiServicePagesFiltersState/apiServicePagesFilterState.slice';
import { Select, ConfigProvider } from 'antd'
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

export const TimeSelect = () => {

    const dispatch = useAppDispatch()
    const { selectedRange } = useAppSelector(store => store.filters)
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [month, setMonth] = useState(new Date());
    const [localSelectedRange, setLocalSelectedRange] = useState(selectedRange);
    const [selectOptions, setSelectOptions] = useState([...predefinedRanges])
    const [selectValue, setSelectValue] = useState()
    const today = new Date();
    const minDate = new Date(today);

    minDate.setDate(today.getDate() - 90);

    const icon = <SelectIcon />



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
            setSelectValue(0)
            dispatch(filtersActions.setPeriod(newRange))
            setIsCalendarOpen(false);
        }
    };

    const periodRef = useRef(null);


    const timeSelectChangeHandler = (value) => {
        if (value !== 0) {
            setSelectValue(value)
            setSelectOptions(predefinedRanges)
            dispatch(filtersActions.setPeriod({ period: value }))
        } else {
            setIsCalendarOpen(true)
        }
    }

    useEffect(() => {
        if (selectedRange && selectedRange.period && selectedRange.period !== selectValue) {
            setSelectValue(selectedRange.period)
        }
        if (selectedRange && !selectedRange.period && selectValue !== 0) {
            setSelectValue(0)
        }
    }, [selectedRange])

    useEffect(() => {
        if (selectValue === undefined) {
            if (selectedRange.period) {
                setSelectValue(selectedRange.period)
            }

            if (selectedRange.from && selectedRange.to) {
                setSelectValue(0)
                const newOptions = [...selectOptions].map(_ => {
                    if (_.value === 0) {
                        _.title = `${format(selectedRange.from, 'dd.MM.yyyy')} - ${format(selectedRange.to, 'dd.MM.yyyy')}`
                    }

                    return _
                })
                setSelectOptions(newOptions)
            }
        }
    }, [selectValue])

    useEffect(() => {
        let newOptions = selectOptions;
        if (selectValue === 0 && !selectedRange.period) {
            newOptions = [...newOptions].map(_ => {
                if (_.value === 0) {
                    _.title = `${format(selectedRange.from, 'dd.MM.yyyy')} - ${format(selectedRange.to, 'dd.MM.yyyy')}`
                }

                return _
            })
        } else {
            newOptions = [...newOptions].map(_ => {
                if (_.value === 0) {
                    _.title = `Произвольные даты`
                }

                return _
            })
        }
        setSelectOptions(newOptions)
    }, [selectedRange, selectValue])


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (periodRef.current && !periodRef.current.contains(event.target) && !event.target.classList.value.includes('ant')) {
                setIsCalendarOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.calendarContainer} ref={periodRef}>
            <label className={styles.label} htmlFor="period">
                Период:
            </label>
            <div className={styles.mainSelectWrapper}>
                <ConfigProvider
                    theme={{
                        token: {
                            //colorBgBase: '#EAEAF1',
                            colorBgContainer: '#EAEAF1',
                            colorBorder: 'transparent',
                            borderRadius: 8,
                            fontFamily: 'Mulish',
                            fontSize: 16
                        },
                        components: {
                            Select: {
                                activeBorderColor: 'transparent',
                                activeOutlineColor: 'transparent',
                                hoverBorderColor: 'transparent',
                                optionActiveBg: 'transparent',
                                optionFontSize: 16,
                                optionSelectedBg: 'transparent',
                                optionSelectedColor: '#5329FF',
                            }
                        }
                    }}
                >
                    <Select
                        suffixIcon={icon}
                        className={styles.select}
                        options={[...selectOptions].map(i => ({ value: i.value, label: i.title }))}
                        value={selectValue}
                        onSelect={timeSelectChangeHandler}
                        disabled={isCalendarOpen}
                    />
                </ConfigProvider>
            </div>
            <div className={`${styles.calendarPopup} ${isCalendarOpen ? styles.visible : ''}`}>
                <DayPicker
                    minDate={minDate}
                    maxDate={today}
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
                        { after: today },
                    ]}
                    components={{
                        Dropdown: DatePickerCustomDropdown
                    }}
                />
            </div>

        </div>
    );
};
