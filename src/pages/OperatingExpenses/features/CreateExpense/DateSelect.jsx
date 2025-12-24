import { useState } from 'react';
import { ConfigProvider, Form, Select } from 'antd';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ru } from 'date-fns/locale';
import styles from './expenseMainModal.module.css';
import DatePickerCustomDropdown from '@/components/sharedComponents/apiServicePagesFiltersComponent/shared/datePickerCustomDropdown/datePickerCustomDropdown';
import { SelectIcon } from '@/components/sharedComponents/apiServicePagesFiltersComponent/shared';

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

export const DateSelect = (
    {
        form,
        label,
        formId,
        minDate,
        maxDate,
        required = true,
        allowClear = false,
    }
) => {
    const [openCalendar, setOpenCalendar] = useState(false);
    const date = Form.useWatch([formId], form);

    const handleDayClick = (day, modifiers) => {
        setOpenCalendar(false);
        form?.setFieldValue([formId], format(day, 'dd.MM.yyyy'));
    }

    return (
        <ConfigProvider
            renderEmpty={() => (<div>Нет данных</div>)}
            theme={{
                token: {
                    colorBgContainer: 'white',
                    colorBorder: '#5329FF1A',
                    borderRadius: 8,
                    fontFamily: 'Manrope',
                    fontSize: 12,
                    fontWeight: 500,
                    controlHeightLG: 40,
                },
                components: {
                    Select: {
                        activeBorderColor: '#5329FF1A',
                        activeOutlineColor: 'transparent',
                        hoverBorderColor: '#5329FF1A',
                        optionActiveBg: 'transparent',
                        optionFontSize: 14,
                        optionSelectedBg: 'transparent',
                        optionSelectedColor: '#5329FF',
                    }
                }
            }}
        >
            <Form.Item
                label={label}
                name={formId}
                rules={[
                    { required: required, message: 'Пожалуйста, выберите дату!' }
                ]}
            >
                <Select
                    name='date'
                    size="large"
                    placeholder="Выберите дату"
                    suffixIcon={<SelectIcon />}
                    open={openCalendar}
                    onOpenChange={() => setOpenCalendar((prev) => !prev)}
                    styles={{popup: { root: {width: 'fit-content', border: '1px solid red'}}}}
                    allowClear={allowClear}
                    popupRender={() => (
                        <div
                            style={{
                                padding: '10px 16px',
                                overflow: 'hidden',
                            }}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                        >
                            <DayPicker
                                minDate={minDate}
                                maxDate={maxDate}
                                fromDate={minDate}
                                toDate={maxDate}
                                disabled={[
                                    { before: minDate },
                                    { after: maxDate },
                                ]}
                                selected={new Date(date)}
                                mode="single"
                                captionLayout="dropdown"
                                className={styles.customDayPicker}
                                locale={customRuLocale}
                                onDayClick={handleDayClick}
                                components={{
                                    Dropdown: DatePickerCustomDropdown
                                }}
                            />
                        </div>
                    )}
                />
            </Form.Item>
        </ConfigProvider>
    )
}