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

    const toggleCalendar = () => {
        setIsCalendarOpen(!isCalendarOpen);
    };

    const handleMonthChange = (selectedMonth) => {
        setMonth(selectedMonth);
    };

    return (
        <div className={styles.calendarContainer}>
            <label style={{ fontWeight: 600, marginBottom: '4px', display: 'block' }} htmlFor="period">
                Период:
            </label>
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
                onChange={(e) => e.target.value === '' && toggleCalendar()}
            >
                <option value="7">7 дней</option>
                <option value="14">14 дней</option>
                <option value="30">30 дней</option>
                <option value="90">90 дней</option>
                <option value="">Произвольные даты</option>
            </select>

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
                        locale={ru}
                    />
                </div>
            )}
        </div>
    );
};

export default Period;
