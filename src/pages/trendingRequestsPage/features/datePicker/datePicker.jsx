import { useState, useEffect, useRef } from 'react';
import styles from './datePicker.module.css'
import { Select, ConfigProvider } from 'antd'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css';
import { ru } from 'date-fns/locale';
import { format } from 'date-fns';
import moment from 'moment';
import DatePickerCustomDropdown from '../../../../components/sharedComponents/apiServicePagesFiltersComponent/shared/datePickerCustomDropdown/datePickerCustomDropdown';

export const DatePicker = ({ selectedDate, setSelectedDate }) => {
    const [ month, setMonth ] = useState(moment().subtract(30, 'days').format('YYYY-MM-DD'));
    const [ isDropdownOpen, setIsDropdownOpen ] = useState(false)
    const selectRef = useRef(null);
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
    const minDate = new Date(today);
    minDate.setDate(today.getDate() - 365 * 3);
    const startMonth = new Date(today);
    startMonth.setDate(today.getDate() - 365 * 3);
    const endMonth = new Date(today);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const dropdown = document.querySelector('#dropdown');
            const isClickInsideDropdown = dropdown?.contains(event.target);

            if (!isClickInsideDropdown && event.target.className !== 'ant-select-selection-item' && event.target.className !== 'ant-select-item-option-content') {
                return setIsDropdownOpen(false);
            }
            if (event.target.className === 'ant-select-selection-item' && event.target.title === selectedDate) {
                return setIsDropdownOpen(!isDropdownOpen);
            }            
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    const handleDayClick = (day) => {
        setSelectedDate(format(day, 'yyyy-MM-dd'))
        setIsDropdownOpen(false)
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#5329FF'
                }
            }}
        >
            <Select
                ref={selectRef}
                size='large'
                open={isDropdownOpen}
                style={{ maxWidth: '240px', width: '240px', fontSize: '20px' }}
                placeholder='Выберите дату'
                placement='bottomLeft'
                popupMatchSelectWidth={false}
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                value={selectedDate}
                // onClick={() => {
                //     if (!isDropdownOpen) {
                //         //setIsDropdownOpen(true)
                //     } else {
                //         //setIsDropdownOpen(false)
                //     }
                   
                // }}
                suffixIcon={
                    <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L7 7L13 1" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                }
                dropdownRender={() => <div ref={dropdownRef} id='dropdown'>
                    <DayPicker
                        minDate={minDate}
                        maxDate={today}
                        mode="single"
                        selected={selectedDate}
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
                        startYear={startMonth}
                        startMonth={startMonth}
                        endMonth={endMonth}
                        components={{
                            Dropdown: DatePickerCustomDropdown
                        }}
                    />
                </div>}
            />
        </ConfigProvider>
    )
}