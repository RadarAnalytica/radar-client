import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ru } from 'date-fns/locale';
import { format } from 'date-fns';
import styles from './monthSelect.module.css';
import { SelectIcon } from '../../shared'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { actions as filtersActions } from '../../../../../redux/apiServicePagesFiltersState/apiServicePagesFilterState.slice';
import { ConfigProvider, DatePicker } from 'antd'
import locale from 'antd/locale/ru_RU';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
dayjs.locale('ru');

const { RangePicker } = DatePicker;

export const MonthSelect = ({monthHandler, value}) => {

    const periodRef = useRef(null);

    const initialValue = useMemo(() => {
        console.log('initialValue', value)
        if (value){
            return [
                dayjs(value?.month_from),
                dayjs(value?.month_to),
            ]
        }
        return []
    }, [value])

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
                    <div className={styles.calendarPopup}>
                        <RangePicker
                            size='large'
                            picker='month'
                            format={'MM.YYYY'}
                            onChange={monthHandler}
                            disabledTime={{start: dayjs('2024-02'), end: dayjs()}}
                            disabledDate={(current) => {
                                const minDate = dayjs('2024-02');
                                const maxDate = dayjs();
                                return current && (current < minDate || current > maxDate);
                            }}
                            defaultValue={initialValue}
                        />
                    </div>
                </ConfigProvider>
            </div>

        </div>
    );
};
