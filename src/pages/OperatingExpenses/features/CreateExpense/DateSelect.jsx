import { ConfigProvider, Form, Select } from 'antd';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ru } from 'date-fns/locale';
import styles from './expenseMainModal.module.css';
import DatePickerCustomDropdown from '@/components/sharedComponents/apiServicePagesFiltersComponent/shared/datePickerCustomDropdown/datePickerCustomDropdown';


export const DateSelect = () => {
    return (
        <ConfigProvider
            renderEmpty={() => (<div>Нет данных</div>)}
            theme={{
                token: {
                    colorBgContainer: 'white !important',
                    colorBorder: '#5329FF1A',
                    borderRadius: 8,
                    fontFamily: 'Mulish',
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
                label="Дата"
                name='date'
                initialValue={format(new Date(date), 'dd.MM.yyyy')}
                rules={[
                    { required: true, message: 'Пожалуйста, выберите дату!' }
                ]}
            >
                <Select
                    name='date'
                    size="large"
                    placeholder="Выберите дату"
                    suffixIcon={icon}
                    value={format(new Date(date), 'dd.MM.yyyy')}
                    open={openCalendar}
                    onDropdownVisibleChange={handleDropdownVisibleChange}
                    // popupMatchSelectWidth={false}
                    dropdownStyle={{ width: 'fit-content' }}
                    dropdownRender={() => (
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
                                maxDate={new Date()}
                                fromDate={minDate}
                                toDate={new Date()}
                                disabled={[
                                    { before: minDate },
                                    { after: new Date() },
                                ]}
                                mode="single"
                                selected={new Date(date)}
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