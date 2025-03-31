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

export const TimeSelect = () => {

    const dispatch = useAppDispatch()
    const { selectedRange } = useAppSelector(store => store.filters)
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [month, setMonth] = useState(new Date());
    const [selectedOption, setSelectedOption] = useState(selectedRange);
    const [localSelectedRange, setLocalSelectedRange] = useState(selectedRange);

    const today = new Date();
    const minDate = new Date(today);
    // const maxDate = new Date(today);

    minDate.setDate(today.getDate() - 90);
    // maxDate.setDate(today.getDate() + 90);

    const icon = <SelectIcon />

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

    const toggleCalendar = () => {
        setIsCalendarOpen(!isCalendarOpen);
        setIsDropdownOpen(false);
    };

    const selectOption = (value) => {
        if (value === "") {
            setSelectedOption("");
            toggleCalendar();
        } else {
            setSelectedOption({ period: value });
            dispatch(filtersActions.setPeriod({ period: value }))
            //setSelectedRange({period: value});
            setIsCalendarOpen(false);
        }
        setIsDropdownOpen(false);
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
            dispatch(filtersActions.setPeriod(newRange))
            //setSelectedRange(newRange);
            setIsCalendarOpen(false);
        }
    };

    const formatDateRange = (range) => {
        console.log('formatDateRange', range);
        if (range.from && range.to) {
            return `${format(range.from, 'dd.MM.yyyy')} - ${format(range.to, 'dd.MM.yyyy')}`;
        }
        return "Произвольные даты";
    };

    const periodRef = useRef(null);


    const timeSelectChangeHandler = (value) => {
        if (value !== 0) {
            dispatch(filtersActions.setPeriod({ period: value }))
        } else {
            setIsCalendarOpen(true)
        }
    }


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (periodRef.current && !periodRef.current.contains(event.target)) {
                setIsCalendarOpen(false);
                setIsDropdownOpen(false);
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
                                optionActiveBg: '#EAEAF1',
                                optionFontSize: 16,
                                optionSelectedBg: '#5329FF',
                                optionSelectedColor: 'white'
                            }
                        }
                    }}
                >
                    <Select
                        suffixIcon={icon}
                        className={styles.select}
                        options={predefinedRanges.map(i => ({ value: i.value, label: i.title }))}
                        value={selectedRange.period}
                        onChange={timeSelectChangeHandler}
                        disabled={isCalendarOpen}
                    />
                </ConfigProvider>
            </div>
            {/* <div
                className={styles.dropdownWrapper}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                <div className={styles.selectedOption}>
                    {selectedOption.period ? `${selectedOption.period} дней` : formatDateRange(localSelectedRange)}
                </div>
                <svg
                    width="14"
                    height="9"
                    viewBox="0 0 14 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.arrowIcon}
                >
                    <path d="M1 1.5L7 7.5L13 1.5" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </div> */}
            {/* {isDropdownOpen && (
                <ul className={styles.dropdownMenu}>
                    {
                        predefinedRanges.map((el) => <li key={el.value} onClick={() => selectOption(el.value)}>{el.title}</li>)
                    }
                    <li onClick={() => selectOption("")} className={styles.customDateOption}>
                        Произвольные даты
                    </li>
                </ul>
            )} */}

            {isCalendarOpen && (
                <div className={styles.calendarPopup}>
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
                    />
                </div>
            )}
        </div>
    );
};
