import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ru } from 'date-fns/locale';
import styles from './Period.module.css';

const Period = () => {
    const [selectedRange, setSelectedRange] = useState({ from: null, to: null });
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [month, setMonth] = useState(new Date());

    const handleSelect = (range) => {
        setSelectedRange(range);
    };

    const toggleCalendar = (value) => {
        setIsCalendarOpen(value === "");
        if (value !== "") {
            setSelectedRange({ from: null, to: null });
        }
    };

    const handleMonthChange = (selectedMonth) => {
        setMonth(selectedMonth);
    };

    const formatDateRange = (range) => {
        if (range.from && range.to) {
            const fromDate = range.from.toLocaleDateString("ru-RU");
            const toDate = range.to.toLocaleDateString("ru-RU");
            return `${fromDate} - ${toDate}`;
        }
        return "Произвольные даты";
    };

    const customLocale = {
        ...ru,
        localize: {
            ...ru.localize,
            month: (n) => {
                const months = [
                    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
                ];
                return months[n];
            },
            day: (n) => {
                const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
                return days[n];
            },
        },
    };

    return (
        <div className={styles.calendarContainer}>
            <label style={{ fontWeight: 600, marginBottom: '4px', display: 'block' }} htmlFor="period">
                Период:
            </label>
            <div className={styles.selectWrapper}>
                <select
                    style={{
                        width: '100%',
                        padding: '1vh 1.75vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                        borderRadius: '8px',
                        appearance: 'none',
                        cursor: 'pointer',
                    }}
                    id="period"
                    onChange={(e) => toggleCalendar(e.target.value)}
                    value={selectedRange.from && selectedRange.to ? "" : "7"}
                >
                    <option value="7">7 дней</option>
                    <option value="14">14 дней</option>
                    <option value="30">30 дней</option>
                    <option value="90">90 дней</option>
                    <option value="">{formatDateRange(selectedRange)}</option>
                </select>
                <svg
                    width="14"
                    height="9"
                    viewBox="0 0 14 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.selectArrow}
                >
                    <path d="M1 1.5L7 7.5L13 1.5" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </div>

            {isCalendarOpen && (
                <div className={styles.calendarPopup}>
                    <DayPicker
                        mode="range"
                        selected={selectedRange}
                        onSelect={handleSelect}
                        month={month}
                        onMonthChange={handleMonthChange}
                        captionLayout="dropdown"
                        fromYear={2022}
                        toYear={2024}
                        className={styles.customDayPicker}
                        locale={customLocale}
                    />
                </div>
            )}
        </div>
    );
};

export default Period;