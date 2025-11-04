import { useState, useEffect, useRef } from 'react';
import styles from './datePicker.module.css';
import { Select, ConfigProvider } from 'antd';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ru } from 'date-fns/locale';
import { format, parse } from 'date-fns';
import moment from 'moment';
import DatePickerCustomDropdown from '../../../../components/sharedComponents/apiServicePagesFiltersComponent/shared/datePickerCustomDropdown/datePickerCustomDropdown';

export const DatePicker = ({ selectedDate, setSelectedDate, isExampleDataSet }) => {
    const [month, setMonth] = useState(moment().subtract(30, 'days').format('YYYY-MM-DD'));
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const datePickerRef = useRef(null);
    const dropdownRef = useRef(null);
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
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() - 5);

    const minDate = new Date(today);
    minDate.setFullYear(2023, 4, 1);
    const startMonth = new Date(today);
    startMonth.setFullYear(2023, 4, 1);
    const endMonth = new Date(today);

    // Parse selectedDate string to Date object
    const parsedSelectedDate = selectedDate ? parse(selectedDate, 'dd.MM.yyyy', new Date()) : undefined;

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Проверяем все возможные селекты и их выпадающие списки
            const isSelectElement =
                event.target.closest('.ant-select') !== null ||
                event.target.closest('.ant-select-dropdown') !== null ||
                event.target.closest('.ant-select-item') !== null ||
                event.target.closest('.rdp-dropdown') !== null ||
                event.target.closest('.rdp-caption_dropdowns') !== null;

            if (
                datePickerRef.current &&
                !datePickerRef.current.contains(event.target) &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                !isSelectElement
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isDropdownOpen]);

    const selectClickHandler = (e) => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleDayClick = (day) => {
        setSelectedDate(format(day, 'dd.MM.yyyy'));
        setIsDropdownOpen(false);
    };

    return (
        <>
            <div className={styles.datePicker} ref={datePickerRef}>
                <div className={isExampleDataSet ? `${styles.datePicker__select} ${styles.datePicker_bg}` : styles.datePicker__select} onClick={selectClickHandler}>
                    {selectedDate}
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${styles.arrowIcon} ${isDropdownOpen ? styles.arrowIcon_open : ''}`}>
                        <path d="M0.800781 1.5L5.80078 6.5L10.8008 1.5" stroke="#8C8C8C" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </div>

                {isDropdownOpen &&
                    <div ref={dropdownRef} className={styles.datePicker__dropdown}>
                        <DayPicker
                            minDate={minDate}
                            maxDate={today}
                            mode="single"
                            selected={parsedSelectedDate}
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
                            startYear={startMonth}
                            startMonth={startMonth}
                            endMonth={endMonth}
                            components={{
                                Dropdown: DatePickerCustomDropdown
                            }}
                        />
                    </div>
                }
            </div>
        </>
    );
};
