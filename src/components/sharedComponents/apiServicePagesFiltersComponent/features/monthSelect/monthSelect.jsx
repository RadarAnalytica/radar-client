import React, { useState, useEffect, useRef } from 'react';
import { ru } from 'date-fns/locale';
import { format } from 'date-fns';
import styles from './monthSelect.module.css';
import { SelectIcon } from '../../shared'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { actions as filtersActions } from '../../../../../redux/apiServicePagesFiltersState/apiServicePagesFilterState.slice';
import { Select, ConfigProvider, DatePicker } from 'antd'
import DatePickerCustomDropdown from '../../shared/datePickerCustomDropdown/datePickerCustomDropdown';
import locale from 'antd/locale/ru_RU';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
dayjs.locale('ru');

const { RangePicker } = DatePicker;

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

export const MonthSelect = ({monthHandler}) => {

    const dispatch = useAppDispatch()
    const { selectedRange } = useAppSelector(store => store.filters)
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [month, setMonth] = useState(new Date());
    const [localSelectedRange, setLocalSelectedRange] = useState({ from: null, to: null });
    const [selectOptions, setSelectOptions] = useState([...predefinedRanges])
    const [selectValue, setSelectValue] = useState()
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() - 90);


    const startMonth = new Date(today);
    startMonth.setDate(today.getDate() - 90);
    const endMonth = new Date(today);

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
            setLocalSelectedRange({ from: null, to: null })
            dispatch(filtersActions.setPeriod({ period: value }))
        } else {
            setLocalSelectedRange({ from: null, to: null })
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
                setLocalSelectedRange({ from: null, to: null })
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    function cellRender(current, info) {
        console.log(current, info)
        return 0
    }

    return (
        <div className={styles.calendarContainer} ref={periodRef}>
            <label className={styles.label} htmlFor="period">
                Период:
            </label>
            <div className={styles.mainSelectWrapper}>
                <ConfigProvider
                    locale={locale}
                    theme={{
                        token: {
                            //colorBgBase: '#EAEAF1',
                            colorBgContainer: '#EAEAF1',
                            colorBorder: 'transparent',
                            borderRadius: 8,
                            fontFamily: 'Mulish',
                            fontSize: 16,
                            activeBorderColor: '#5329FF',
                        },
                        components: {
                            DatePicker: {
                                activeBg: 'rgba(0,0,0,0.04)',
                                colorPrimary: '#5329FF',
                                hoverBorderColor: '#5329FF',
                                cellActiveWithRangeBg: '#5329FF0D',
                                activeBorderColor: 'transparent',
                                hoverBorderColor: 'transparent',
                                paddingBlockLG: 5,
                                inputFontSizeLG: 16,
                                activeOutlineColor: 'transparent',
                                fontSize: 16,
                            }
                        }
                    }}
                >
                    <RangePicker
                        size='large'
                        picker='month'
                        format={'MM.YYYY'}
                        onChange={monthHandler}
                        disabledTime={{start: dayjs('2024-02'), end: dayjs()}}
                        disabledDate={(current) => {
                            // const minDate = moment('2023-01-01');
                            const minDate = dayjs('2024-02');
                            // const maxDate = moment('2023-12-31');
                            const maxDate = dayjs();
                            return current && (current < minDate || current > maxDate);
                        }}
                        // disabledDate={[
                        //     { before: dayjs('2024-02') },
                        //     { after: dayjs() },
                        // ]}
                    />
                </ConfigProvider>
            </div>

        </div>
    );
};
