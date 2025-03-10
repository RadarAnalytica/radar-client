import React, { useState, useEffect, useRef } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ru } from 'date-fns/locale';
import { format } from 'date-fns';
import styles from './Period.module.css';

const Period = ({ selectedRange, setSelectedRange }) => {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [month, setMonth] = useState(new Date());
    const [selectedOption, setSelectedOption] = useState(selectedRange?.period || '7');
    const [localSelectedRange, setLocalSelectedRange] = useState({from: null, to: null});

    const today = new Date();
    const minDate = new Date(today);
    const maxDate = new Date(today);

    minDate.setDate(today.getDate() - 90);
    maxDate.setDate(today.getDate() + 90);

    const predefinedRanges = {
        "7": 7,
        "14": 14,
        "30": 30,
        "90": 90,
    };

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
            setSelectedOption(value);
            setSelectedRange({period: predefinedRanges[value]});
            setIsCalendarOpen(false);
        }
        setIsDropdownOpen(false);
    };

    const handleDayClick = (day) => {
        if (!localSelectedRange.from || (localSelectedRange.from && localSelectedRange.to)) {
            setLocalSelectedRange({ from: day, to: null });
        } else if (localSelectedRange.from && !localSelectedRange.to) {
            setLocalSelectedRange((range) => {
                const { from } = range;
                return day < from
                    ? { from: day, to: from }
                    : { from, to: day };
            });
            setSelectedRange(localSelectedRange);
            setIsCalendarOpen(false);
        }
    };

    const formatDateRange = (range) => {
        if (range.from && range.to) {
            return `${format(range.from, 'yyyy-MM-dd')} - ${format(range.to, 'yyyy-MM-dd')}`;
        }
        return "Произвольные даты";
    };

    const periodRef = useRef(null);


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
            <label style={{ fontWeight: 500, marginBottom: '4px', display: 'block' }} htmlFor="period">
                Период:
            </label>
            <div
                className={styles.dropdownWrapper}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                <div className={styles.selectedOption}>
                    {selectedOption ? `${selectedOption} дней` : formatDateRange(localSelectedRange)}
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
            </div>
            {isDropdownOpen && (
                <ul className={styles.dropdownMenu}>
                    <li onClick={() => selectOption("7")}>7 дней</li>
                    <li onClick={() => selectOption("14")}>14 дней</li>
                    <li onClick={() => selectOption("30")}>30 дней</li>
                    <li onClick={() => selectOption("90")}>90 дней</li>
                    <li onClick={() => selectOption("")} className={styles.customDateOption}>
                        Произвольные даты
                    </li>
                </ul>
            )}

            {isCalendarOpen && (
                <div className={styles.calendarPopup}>
                    <DayPicker
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
                    />
                </div>
            )}
        </div>
    );
};

export default Period;
