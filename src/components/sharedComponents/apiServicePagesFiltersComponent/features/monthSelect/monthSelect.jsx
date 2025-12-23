import React, { useRef, useMemo } from 'react';
import styles from './monthSelect.module.css';
import { ConfigProvider, DatePicker } from 'antd';
import locale from 'antd/locale/ru_RU';
import dayjs from 'dayjs';
import { initialMonths } from '@/service/utils';

const { RangePicker } = DatePicker;

export const MonthSelect = ({
    dispatch,
    filterActions,
    selectId,
    label,
    value,
    monthHandler,
    isDataLoading,
    minCustomDate
}) => {
    const monthRef = useRef(null);

    const initialValue = useMemo(() => {
        if (value) {
            return [
                dayjs(value?.month_from),
                dayjs(value?.month_to),
            ];
        }
        return [];
    }, [value]);

    const onChangeHandler = (data) => {
        let selectedMonths = initialMonths;
        if (data) {
            const [start, end] = data;
            selectedMonths = {
                month_from: dayjs(start).format('YYYY-MM'),
                month_to: dayjs(end).format('YYYY-MM')
            };
        }
        dispatch(filterActions.setActiveFilters({ stateKey: 'activeMonths', data: selectedMonths }));
    };

    return (
        <div className={styles.calendarContainer} ref={monthRef}>
            <label className={styles.label} htmlFor={selectId}>
                {label}
            </label>
            <div className={styles.mainSelectWrapper}>
                <ConfigProvider
                    locale={locale}
                    theme={{
                        token: {
                            //colorBgBase: '#EAEAF1',
                            colorBgContainer: 'white',
                            colorBorder: '#5329FF1A',
                            borderRadius: 8,
                            fontFamily: 'Manrope',
                            fontSize: 14,
                            activeBorderColor: '#5329FF',
                            colorTextDisabled: '#000'
                        },
                        components: {
                            DatePicker: {
                                activeBg: 'rgba(0,0,0,0.04)',
                                colorPrimary: '#5329FF',
                                cellActiveWithRangeBg: '#5329FF0D',
                                activeBorderColor: '#5329FF1A',
                                hoverBorderColor: '#5329FF1A',
                                paddingBlockLG: 5,
                                inputFontSizeLG: 16,
                                activeOutlineColor: 'transparent',
                                fontSize: 16,
                            }
                        }
                    }}
                >
                    <div className={styles.calendarPopup}>
                        <RangePicker
                            name='month'
                            className={styles.calendar}
                            size='large'
                            picker='month'
                            format={'MM.YYYY'}
                            onChange={onChangeHandler}
                            disabledTime={{
                                // Начальная дата
                                start: minCustomDate ? dayjs(minCustomDate) : dayjs('2024-02'),
                                end: dayjs()
                            }}
                            disabledDate={(current) => {
                                const minDate = minCustomDate ? dayjs(minCustomDate) : dayjs('2024-02');
                                const maxDate = dayjs();
                                return current && (current < minDate || current > maxDate);
                            }}
                            minDate={minCustomDate ? dayjs(minCustomDate) : dayjs('2024-02')}
                            maxDate={dayjs()}
                            value={initialValue}
                            id={selectId}
                            getPopupContainer={() => monthRef.current}
                            disabled={isDataLoading}
                            allowEmpty
                        />
                    </div>
                </ConfigProvider>
            </div>

        </div>
    );
};
