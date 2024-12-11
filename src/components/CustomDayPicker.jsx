import React, { useState, useEffect, useRef } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ru } from 'date-fns/locale';
import styles from './DayPicker.module.css';

const CustomDayPicker = ({ selectedRange, setSelectedRange }) => {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [month, setMonth] = useState(new Date());

    const today = new Date();
    const minDate = new Date(today);
    const maxDate = new Date(today);

    minDate.setDate(today.getDate() - 90);
    maxDate.setDate(today.getDate() + 90);
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
    };

    const handleDayClick = (day) => {
        if (day < minDate || day > maxDate) return;

        if (!selectedRange.from || (selectedRange.from && selectedRange.to)) {
            setSelectedRange({ from: day, to: null });
        } else if (selectedRange.from && !selectedRange.to) {
            const { from } = selectedRange;
            const rangeLength = Math.abs((day - from) / (1000 * 60 * 60 * 24)) + 1;

            if (rangeLength > 90) return;

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
        return "Выбрать дату:";
    };

    const periodRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (periodRef.current && !periodRef.current.contains(event.target)) {
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
            <div
                className={styles.dropdownWrapper}
                onClick={toggleCalendar}
            >
                <div className={styles.selectedOption}>
                    {formatDateRange(selectedRange)}
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

            {isCalendarOpen && (
                <div className={styles.calendarPopup}>
                    <DayPicker
                        mode="range"
                        selected={selectedRange}
                        month={month}
                        onMonthChange={setMonth}
                        captionLayout="dropdown"
                        fromYear={2024}
                        toYear={2025}
                        className={styles.customDayPicker}
                        locale={customRuLocale}
                        onDayClick={handleDayClick}
                        fromDate={minDate}
                        toDate={maxDate}
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

export default CustomDayPicker;
