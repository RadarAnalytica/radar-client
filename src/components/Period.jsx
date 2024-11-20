import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ru } from 'date-fns/locale';
import styles from './Period.module.css';


const Period = ({ selectedRange, setSelectedRange }) => {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [month, setMonth] = useState(new Date());
    const [selectedOption, setSelectedOption] = useState("7");

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
            setSelectedRange({ from: null, to: null });
            toggleCalendar();
        } else {
            setSelectedOption(value);
            setSelectedRange(predefinedRanges[value]);
            setIsCalendarOpen(false);
        }
        setIsDropdownOpen(false);
    };

    const handleDayClick = (day) => {
        if (!selectedRange.from || (selectedRange.from && selectedRange.to)) {

            setSelectedRange({ from: day, to: null });
            setIsCalendarOpen(true);
        } else if (selectedRange.from && !selectedRange.to) {

            const { from } = selectedRange;
            const newRange =
                day < from
                    ? { from: day, to: from }
                    : { from, to: day };

            setSelectedRange(newRange);
            setIsCalendarOpen(false);
        }
    };
    const formatDateRange = (range) => {
        if (range.from && range.to) {
            const fromDate = range.from.toLocaleDateString("ru-RU");
            const toDate = range.to.toLocaleDateString("ru-RU");
            return `${fromDate} - ${toDate}`;
        }
        return "Произвольные даты";
    };

    return (
        <div className={styles.calendarContainer}>
            <label style={{ fontWeight: 500, marginBottom: '4px', display: 'block' }} htmlFor="period">
                Период:
            </label>
            <div
                className={styles.dropdownWrapper}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                <div className={styles.selectedOption}>
                    {selectedOption ? `${selectedOption} дней` : formatDateRange(selectedRange)}
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
                        selected={selectedRange}
                        month={month}
                        onMonthChange={setMonth}
                        captionLayout="dropdown"
                        fromYear={2022}
                        toYear={2024}
                        className={styles.customDayPicker}
                        locale={customRuLocale}
                        onDayClick={handleDayClick}
                    />
                </div>
            )}
        </div>
    );
};

export default Period;
