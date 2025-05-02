import { useState } from 'react';
import styles from './LogisticsDataFormBlockDesktop.module.css'
import { Form, Input, Checkbox, Radio, ConfigProvider, Tooltip, AutoComplete } from 'antd';
import { tempWhouseData } from './tempWarehouseData';
import { normilizeUnitsInputValue } from './UnitCalcUtils';
const LogisticsDataFormBlockDesktop = ({ form, current_storage_logistic_price, buyout_log_price, storagePrice }) => {

    const warehouse = Form.useWatch('warehouse', form);
    const cargo_acceptance_price = Form.useWatch('cargo_acceptance_price', form);
    const isHeavy = Form.useWatch('isHeavy', form);
    const isPaidCargoAcceptance = Form.useWatch('is_paid_cargo_acceptance', form);
    const buyout_percentage = Form.useWatch('buyout_percentage', form);
    const delivery_speed = Form.useWatch('delivery_speed', form);

    const [whouseData, setWhouseData] = useState(tempWhouseData.fbo)

    const handleSearch = (value) => {
        const newData = tempWhouseData.fbo.filter(_ => _.name.toLowerCase().includes(value.toLowerCase()));
        setWhouseData(newData)
    };

    const handleSelect = (value) => {
        form.setFieldValue('warehouse', value)
    };


    return (
        <fieldset className={styles.fieldset}>
            <div className={styles.fieldset__header}>
                <h2 className={styles.fieldset__title}>Логистика</h2>
            </div>

            <ConfigProvider
                theme={{
                    token: {
                        colorBorder: '#00000033',
                        colorPrimary: '#5329FF'
                    }

                }}
            >
                <Form.Item
                    label='Тип упаковки'
                    className={styles.formItem}
                    name='PackageType'
                >

                    <Radio.Group
                        style={{ width: '100%' }}
                    >
                        <div className={`${styles.fieldset__wrapper} ${styles.fieldset__wrapper_2cols}`}>

                            <Radio value="Короб" disabled={isHeavy}> <div className={styles.label}>
                                {'Короб'}
                                <ConfigProvider
                                    theme={{
                                        token: {
                                            colorTextLightSolid: '#000'
                                        }
                                    }}
                                >
                                    {isHeavy && <Tooltip
                                        title='Логистика для крупногабаритных товаров считается по коэффициенту “Монопаллеты”'
                                        arrow={false}
                                        style={{ cursor: 'pointer' }}
                                        color={'white'}
                                    >
                                        <div className={`${styles.tooltip} ${styles.tooltip_red}`}>!</div>
                                    </Tooltip>}
                                </ConfigProvider>
                            </div></Radio>
                            <Radio value="Монопаллета">Монопаллета</Radio>

                        </div>
                    </Radio.Group>

                </Form.Item>
            </ConfigProvider>


            <div className={`${styles.fieldset__wrapper} ${styles.fieldset__wrapper_2cols}`}>


                <ConfigProvider
                    theme={{
                        token: {
                            fontFamily: 'Mulish',
                            colorBgContainer: 'white',
                            //colorBorder: 'white',
                            // colorTextLightSolid: '#000'
                        },
                        components: {
                            Select: {
                                activeBorderColor: '#5329FF',
                                hoverBorderColor: '#5329FF',
                                activeOutlineColor: 'transparent',
                                activeBg: 'red'
                            },
                            Input: {
                                activeBorderColor: '#5329FF',
                                hoverBorderColor: '#5329FF',
                                activeBg: '#F2F2F2',
                            },
                        }
                    }}
                >
                    <ConfigProvider
                        theme={{
                            token: {
                                fontFamily: 'Mulish',
                                colorBgContainer: 'white',
                                colorPrimary: 'black',
                                colorPrimaryActive: 'black'
                                //colorBorder: 'white',
                                // colorTextLightSolid: '#000'
                            },
                            components: {
                                Select: {
                                    activeBorderColor: 'rgba(232, 232, 232, 1)',
                                    colorBorder: 'rgba(232, 232, 232, 1)',
                                    hoverBorderColor: 'rgba(232, 232, 232, 1)',
                                    activeOutlineColor: 'rgba(0,0,0,0)',
                                    selectorBg: warehouse ? '#F2F2F2' : '',
                                    clearBg: 'black'
                                },
                                Input: {
                                    activeBorderColor: '#5329FF',
                                    hoverBorderColor: '#5329FF',
                                    activeBg: '#F2F2F2',
                                },
                            }
                        }}
                    >
                        <Form.Item
                            label={
                                <div className={styles.label}>
                                    {'Склад отгрузки'}
                                    <ConfigProvider
                                        theme={{
                                            token: {
                                                colorTextLightSolid: '#000'
                                            }
                                        }}
                                    >
                                        <Tooltip
                                            title='Внимание! Если склад недоступен для выбора, то на данный склад нельзя поставлять товар с выбранным типом упаковки'
                                            style={{ cursor: 'pointer' }}
                                            color={'white'}
                                            arrow={false}
                                        >
                                            <div className={styles.tooltip}>!</div>
                                        </Tooltip>
                                    </ConfigProvider>
                                </div>
                            }
                            rules={
                                [
                                    //{ required: true, message: '' },
                                ]
                            }
                            name='warehouse'
                            className={isPaidCargoAcceptance ? styles.formItem : `${styles.formItem} ${styles.formItem_wide}`}
                        >
                            <AutoComplete
                                
                                size='large'
                                placeholder='Выберите склад'
                                style={{ background: warehouse ? '#F2F2F2' : '' }}
                                id='autocomp'
                                options={whouseData?.map(_ => ({ value: _.name })) || null}
                                onSearch={handleSearch}
                                onSelect={handleSelect}
                                allowClear={{
                                    clearIcon: (
                                        <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M14.7074 2.60356C15.0979 2.21304 15.0979 1.57987 14.7074 1.18935C14.3168 0.798823 13.6837 0.798823 13.2931 1.18935L7.58602 6.89646L2.08601 1.39645C1.69549 1.00593 1.06232 1.00593 0.671799 1.39645C0.281275 1.78698 0.281275 2.42014 0.671799 2.81067L5.96469 8.10356L0.671799 13.3965C0.281275 13.787 0.281275 14.4201 0.671799 14.8107C1.06232 15.2012 1.69549 15.2012 2.08601 14.8107L7.79313 9.10355L13.2931 14.6036C13.6837 14.9941 14.3168 14.9941 14.7074 14.6036C15.0979 14.213 15.0979 13.5799 14.7074 13.1893L9.41446 7.89645L14.7074 2.60356Z" fill="#8C8C8C" />
                                        </svg>
                                    )
                                }}
                            //value={inputValue}
                            //onSearch={handleSearch}
                            //onSelect={handleSelect}
                            // options={visibleOptions}
                            // dropdownRender={menu => (
                            //     <div ref={dropdownRef} style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            //         {menu}
                            //     </div>
                            // )}
                            />
                        </Form.Item>
                    </ConfigProvider>
                </ConfigProvider>
                {isPaidCargoAcceptance && <Form.Item
                    label='Стоимость платной приемки, ₽'
                    className={styles.formItem}
                    getValueProps={(value) => {
                        const transformedValue = { value: value ? value + ' ₽' : value }
                        return transformedValue
                    }}
                    normalize={(value, prevValue) => {
                        const normalizedValue = normilizeUnitsInputValue(value, prevValue, ' ₽')
                        const regex = /^-?\d*\.?\d*$/ // только целые и дробные числа
                        if (regex.test(normalizedValue)) { return normalizedValue };
                        return prevValue || '';
                    }}
                    rules={
                        [
                            { required: true, message: 'Пожалуйста, заполните это поле!' },
                        ]
                    }
                    name='cargo_acceptance_price'
                >
                    <Input
                        size='large'
                        placeholder='Укажите стоимость'
                        style={{ background: cargo_acceptance_price ? '#F2F2F2' : '' }}
                        className={styles.formItem__input}
                    />
                </Form.Item>}

                <ConfigProvider
                    theme={{
                        token: {
                            colorBorder: '#00000033',
                            colorPrimary: '#5329FF'
                        }

                    }}
                >
                    <Form.Item
                        className={styles.formItem}
                        name='is_paid_cargo_acceptance'
                        valuePropName="checked"
                    >
                        <Checkbox checked><div className={styles.label}>
                            {'Платная приемка'}
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorTextLightSolid: '#000'
                                    }
                                }}
                            >
                                <Tooltip
                                    title='Поставка может быть недоступна на выбранный склад, в данный момент.  Условия по доступности и по стоимости приемки изменяются 1 раз в 2 недели.  Есть возможность изменить стоимость платной приемки.'
                                    style={{ cursor: 'pointer' }}
                                    color={'white'}
                                    arrow={false}
                                >
                                    <div className={styles.tooltip}>!</div>
                                </Tooltip>
                            </ConfigProvider>
                        </div>
                        </Checkbox>

                    </Form.Item>
                </ConfigProvider>
            </div>



            <div className={`${styles.fieldset__wrapper} ${styles.fieldset__wrapper_2cols}`}>
                <Form.Item
                    label={
                        <div className={styles.label}>
                            {'Скорость доставки (FBS)'}
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorTextLightSolid: '#000'
                                    }
                                }}
                            >
                                <Tooltip
                                    title='Базовая комиссия FBS применяется, если вы доставите груз ровно через 30 часов. Отклонение от этого срока в большую или меньшую сторону влияет на комиссию: 0,1% бонуса/штрафа за каждый час.'
                                    style={{ cursor: 'pointer' }}
                                    color={'white'}
                                    arrow={false}
                                >
                                    <div className={styles.tooltip}>!</div>
                                </Tooltip>
                            </ConfigProvider>
                        </div>
                    }
                    getValueProps={(value) => {
                        const transformedValue = { value: value ? value + ' ч' : value }
                        return transformedValue
                    }}
                    normalize={(value, prevValue) => {
                        const normalizedValue = normilizeUnitsInputValue(value, prevValue, ' ч')
                        const regex = /^(|\d+)$/ // только целые числа
                        if (regex.test(normalizedValue)) { return normalizedValue };
                        return prevValue || '';
                    }}
                    name='delivery_speed'
                    className={styles.formItem}
                >
                    <Input
                        style={{ background: delivery_speed ? '#F2F2F2' : '' }}
                        size='large'
                        placeholder='Укажите скорость доставки'
                        className={styles.formItem__input}
                    />
                </Form.Item>
                <Form.Item
                    label={
                        <div className={styles.label}>
                            {'Логистика с учетом процента выкупа'}
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorTextLightSolid: '#000'
                                    }
                                }}
                            >
                                <Tooltip
                                    title='У разных категорий товаров процент выкупа отличается. Товары с размерностью имеют меньший показатель, чем товары повседневного спроса.  

                                Пример категорий и средних значений для них: 
                                Продукты – 94-97%
                                Косметика – 90-95%
                                Товары для дома – 85-95% 
                                Товары для детей (не одежда) – 85-95%
                                Спорт-товары – 85-95%
                                Электроника – 85-95%
                                Зоотовары – 85-90%
                                Аксессуары – 65-85%
                                Одежда и обувь – 30-40%'
                                    style={{ cursor: 'pointer' }}
                                    color={'white'}
                                    arrow={false}
                                >
                                    <div className={styles.tooltip}>!</div>
                                </Tooltip>
                            </ConfigProvider>
                        </div>
                    }
                    getValueProps={(value) => {
                        const transformedValue = { value: value ? value + ' %' : value }
                        return transformedValue
                    }}
                    normalize={(value, prevValue) => {
                        const normalizedValue = normilizeUnitsInputValue(value, prevValue, ' %')
                        const regex = /^(100(\.0*)?|0*(\d{1,2}(\.\d*)?|\.\d+))$|^$/ // только целые и дробные от 0 до 100
                        if (regex.test(normalizedValue)) { return normalizedValue };
                        return prevValue || '';
                    }}
                    name='buyout_percentage'
                    className={styles.formItem}
                >
                    <Input
                        style={{ background: buyout_percentage ? '#F2F2F2' : '' }}
                        size='large'
                        placeholder='Укажите процент выкупа'
                        className={styles.formItem__input}
                    />
                </Form.Item>

                <div className={styles.fieldset__footer}>
                    <p className={styles.fieldset__footerText_price}>{Math.round(current_storage_logistic_price + buyout_log_price)} ₽</p>
                </div>
            </div>

            <div className={styles.fieldset__logWrapper}>
                <p className={styles.fieldset__footerText_price}>{storagePrice ? Math.round(storagePrice) : '-'} ₽</p>
                <p className={styles.fieldset__footerText}>Хранение 1 шт. в месяц</p>
            </div>
            {/* <Form.Item
                className={styles.formItem}
                name='storage_price'
            >

                <Radio.Group
                    style={{ width: '100%' }}
                >
                    <ConfigProvider
                        theme={{
                            token: {
                                colorBorder: '#00000033',
                                colorPrimary: '#5329FF'
                            }

                        }}
                    >
                        <div className={`${styles.fieldset__wrapper} ${styles.fieldset__wrapper_2cols}`}>
                            <Radio value="daily">
                                <lablel className={styles.radioLabel}>
                                    <p className={styles.fieldset__footerText_price}>0 ₽</p>
                                    <p className={styles.fieldset__footerText}>Хранение 1 шт. в месяц</p>
                                </lablel>
                            </Radio>
                            <Radio value="monthly">
                                <lablel className={styles.radioLabel}>
                                    <p className={styles.fieldset__footerText_price}>0 ₽</p>
                                    <p className={styles.fieldset__footerText}>Хранение 1 шт. в день</p>
                                </lablel>
                            </Radio>
                        </div>
                    </ConfigProvider>
                </Radio.Group>

            </Form.Item> */}
        </fieldset>
    )
}

export default LogisticsDataFormBlockDesktop;