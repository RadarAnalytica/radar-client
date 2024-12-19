import React, { useState, useEffect, useRef } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ru } from 'date-fns/locale';
import styles from './CustomDayPicker.module.css';

const CustomDayPicker = ({ selectedDate, setSelectedDate }) => {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [month, setMonth] = useState(new Date());

    const today = new Date();
    const maxDate = today;


    const minDate = new Date(2021, 1, 1);

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
        if (day > maxDate) return;

        setSelectedDate({ from: day });
        setIsCalendarOpen(false);
    };

    const formatDateRange = (range) => {
        if (range.from) {
            return range.from.toLocaleDateString("ru-RU");
        }

        return today.toLocaleDateString("ru-RU");
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
                    {formatDateRange(selectedDate)}
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
                        mode="single"
                        selected={selectedDate.from}
                        month={month}
                        onMonthChange={setMonth}
                        captionLayout="dropdown"
                        fromYear={2021}
                        toYear={2025}
                        className={styles.customDayPicker}
                        locale={customRuLocale}
                        onDayClick={handleDayClick}
                        fromDate={minDate}
                        toDate={maxDate}
                        disabled={[
                            { after: maxDate },
                        ]}
                    />
                </div>
            )}
        </div>
    );
};

export default CustomDayPicker;
