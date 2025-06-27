import React, { useRef, useMemo } from 'react';
import styles from './monthSelect.module.css';
import { ConfigProvider, DatePicker } from 'antd'
import locale from 'antd/locale/ru_RU';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
dayjs.locale('ru');

const { RangePicker } = DatePicker;

export const MonthSelect = ({monthHandler, value}) => {

    const monthRef = useRef(null);

    const initialValue = useMemo(() => {
        if (value){
            return [
                dayjs(value?.month_from),
                dayjs(value?.month_to),
            ]
        }
        return []
    }, [value])

    return (
        <div className={styles.calendarContainer} ref={monthRef}>
            <label className={styles.label} htmlFor="month">
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
                            name='month'
                            className={styles.calendar}
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
                            value={initialValue}
                            getPopupContainer={() => monthRef.current}
                        />
                    </div>
                </ConfigProvider>
            </div>

        </div>
    );
};
