import { useState } from 'react';
import { ConfigProvider, Form, Select, FormInstance } from 'antd';
import { format, Month } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { NamePath } from 'antd/es/form/interface';
import 'react-day-picker/dist/style.css';
import { ru } from 'date-fns/locale';
import styles from './expenseMainModal.module.css';
import DatePickerCustomDropdown from '@/components/sharedComponents/apiServicePagesFiltersComponent/shared/datePickerCustomDropdown/datePickerCustomDropdown';
import { SelectIcon } from '@/components/sharedComponents/apiServicePagesFiltersComponent/shared';

const customRuLocale = {
    ...ru,
    localize: {
        ...ru.localize,
        month: (n: Month, options?: { width?: 'abbreviated' | 'wide' | 'narrow'; context?: 'standalone' | 'formatting' }) => {
            const monthName = ru.localize.month(n, options);
            return monthName.charAt(0).toUpperCase() + monthName.slice(1);
        },
    },
};

interface DateSelectProps {
    form: FormInstance;
    label: string;
    formId: NamePath;
    minDate?: Date;
    maxDate?: Date;
    required?: boolean;
    allowClear?: boolean;
    onSelect?: (day: Date) => void;
}

export const DateSelect = ({
    form,
    label,
    formId,
    minDate,
    maxDate,
    required = true,
    allowClear = false,
    onSelect = () => {},
}: DateSelectProps) => {
    const [openCalendar, setOpenCalendar] = useState(false);
    const date = Form.useWatch([formId], form);

    const handleDayClick = (day: Date) => {
        form?.setFieldValue([formId], format(day, 'dd.MM.yyyy'));
        onSelect(day);
        setOpenCalendar(false);
    };

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
                                startMonth={minDate}
                                endMonth={maxDate}
                                disabled={{ 
                                    before: minDate,
                                    after: maxDate
                                }}
                                selected={date ? new Date(date) : undefined}
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
    );
};
