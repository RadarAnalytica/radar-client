import React, { useRef, useMemo } from 'react';
import styles from './monthSelect.module.css';
import { ConfigProvider, DatePicker } from 'antd';
import locale from 'antd/locale/ru_RU';
import dayjs from 'dayjs';
import { initialMonths } from '@/service/utils';

const { RangePicker } = DatePicker;

export const MonthSelect = ({
    selectId,
    label,
    value,
    monthHandler,
    isDataLoading,
    minCustomDate,
    actionHandler,
    activeBrand
}) => {
    const monthRef = useRef(null);

    const initialValue = useMemo(() => {
        if (value) {
            return [
                value?.month_from ? dayjs(value.month_from) : null,
                value?.month_to ? dayjs(value.month_to) : null,
            ];
        }
        return [];
    }, [value]);

    const minDate = useMemo(() => {
        if (activeBrand?.created_at) {
            return dayjs(activeBrand.created_at).subtract(4, 'month');
        }
        return dayjs().subtract(4, 'month');
    }, [activeBrand]);

    const onChangeHandler = (data) => {
        // let selectedMonths = initialMonths;
        let selectedMonths;
        if (data) {
            const [start, end] = data;
            selectedMonths = {
                month_from: start ? dayjs(start).format('YYYY-MM') : undefined,
                month_to: end ? dayjs(end).format('YYYY-MM') : undefined,
            };
        }
        actionHandler?.(selectedMonths);
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
                                start: minDate,
                                end: dayjs()
                            }}
                            disabledDate={(current) => {
                                const maxDate = dayjs();
                                return current && (current < minDate || current > maxDate);
                            }}
                            minDate={minDate}
                            maxDate={dayjs()}
                            value={initialValue}
                            id={selectId}
                            getPopupContainer={() => monthRef.current}
                            disabled={isDataLoading}
                            allowEmpty
                            style={{ height: '38px' }}
                        />
                    </div>
                </ConfigProvider>
            </div>

        </div>
    );
};
