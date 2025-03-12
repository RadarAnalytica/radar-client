import { useState, useRef } from 'react';
import { Form, Input, Checkbox, ConfigProvider, Tooltip, AutoComplete } from 'antd';
import styles from './BasicDataFormBlock.module.css'

const BasicDataFormBlock = ({ form }) => {

    const [visibleOptions, setVisibleOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const dropdownRef = useRef(null);
    const visibleCount = 10;

    const isSPP = Form.useWatch('isSPP', form);
    const product = Form.useWatch('product', form);
    const product_cost = Form.useWatch('product_cost', form);
    const isHeavy = Form.useWatch('isHeavy', form);
    const product_price = Form.useWatch('product_price', form);
    const SPP = Form.useWatch('SPP', form);
    const package_length = Form.useWatch('package_length', form);
    const package_width = Form.useWatch('package_width', form);
    const package_height = Form.useWatch('package_height', form);

    const package_width_int = parseInt(package_width)
    const package_length_int = parseInt(package_length)
    const package_height_int = parseInt(package_height)

    const sidesSum = package_width_int + package_length_int + package_height_int
    const volume = (((package_height_int / 100) * (package_length_int / 100) * (package_width_int / 100)) * 1000).toFixed(2)


    const handleSearch = (value) => {
        setInputValue(value);
        if (value) {
            const filteredOptions = options.filter(option => option.value.includes(value));
            setVisibleOptions(filteredOptions.slice(0, visibleCount)); // Ограничиваем количество отображаемых опций
        } else {
            setVisibleOptions([]);
        }
    };

    const handleSelect = (value) => {
        setInputValue(value);
        setVisibleOptions([]);
    };

    return (
        <fieldset className={styles.fieldset}>
            <div className={styles.fieldset__header}>
                <h2 className={styles.fieldset__title}>Базовые данные</h2>
                <p className={styles.fieldset__subtitle}>Укажите значения для расчета одной единицы товара (SKU)</p>
            </div>

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
                <Form.Item
                    name='product'
                    label='Товар'
                    className={styles.formItem}

                >
                    <AutoComplete 
                        size='large'
                        placeholder='Введите название товара'
                        style={{background: product ? '#F2F2F2' : ''}}
                        id='autocomp'
                        options={[{value: '1'},{value: '2'},{value: '3'}]}
                        allowClear={{
                            clearIcon: (
                                <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M14.7074 2.60356C15.0979 2.21304 15.0979 1.57987 14.7074 1.18935C14.3168 0.798823 13.6837 0.798823 13.2931 1.18935L7.58602 6.89646L2.08601 1.39645C1.69549 1.00593 1.06232 1.00593 0.671799 1.39645C0.281275 1.78698 0.281275 2.42014 0.671799 2.81067L5.96469 8.10356L0.671799 13.3965C0.281275 13.787 0.281275 14.4201 0.671799 14.8107C1.06232 15.2012 1.69549 15.2012 2.08601 14.8107L7.79313 9.10355L13.2931 14.6036C13.6837 14.9941 14.3168 14.9941 14.7074 14.6036C15.0979 14.213 15.0979 13.5799 14.7074 13.1893L9.41446 7.89645L14.7074 2.60356Z" fill="#8C8C8C"/>
                                </svg>
                            )
                        }}
                        value={inputValue}
                        onSearch={handleSearch}
                        onSelect={handleSelect}
                        // options={visibleOptions}
                        dropdownRender={menu => (
                            <div ref={dropdownRef} style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                {menu}
                            </div>
                        )}
                    />
                    {/* <Input
                        size='large'
                        placeholder='Введите название товара'
                        style={{background: product ? '#F2F2F2' : ''}}
                    /> */}
                </Form.Item>
            </ConfigProvider>

            <div className={`${styles.fieldset__wrapper} ${styles.fieldset__wrapper_2cols}`}>
                <Form.Item
                    name='product_price'
                    label='Цена товара'
                    className={isSPP ? styles.formItem : `${styles.formItem} ${styles.formItem_wide}`}
                    normalize={(value, prevValue) => {
                        const regex = /^-?\d*\.?\d*$/ // только целые и дробные числа
                        if (regex.test(value)) { return value };
                        return prevValue || '';
                    }}
                    rules={
                        [
                            { required: true, message: ''},
                        ]
                    }
                >
                    <Input
                        style={{background: product_price ? '#F2F2F2' : ''}}
                        size='large'
                        placeholder='Укажите цену товара'
                    />
                </Form.Item>
                {isSPP && <Form.Item
                    label='СПП'
                    className={styles.formItem}
                    name='SPP'
                    normalize={(value, prevValue) => {
                        const regex = /^(100(\.0*)?|0*(\d{1,2}(\.\d*)?|\.\d+))$|^$/ // только целые и дробные от 0 до 100
                        if (regex.test(value)) { return value };
                        return prevValue || '';
                    }}
                    rules={
                        [
                            { required: true, message: '' },
                        ]
                    }
                >
                    <Input
                        style={{background: SPP ? '#F2F2F2' : ''}}
                        size='large'
                        placeholder='Укажите СПП, %'
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
                        name='isSPP'
                        valuePropName="checked"
                    >
                        <Checkbox>Указывать СПП</Checkbox>
                    </Form.Item>
                </ConfigProvider>
                {isSPP && product_price && SPP &&
                    <div className={styles.fieldset__footer} style={{ justifyContent: 'space-between' }}>
                        <p className={styles.fieldset__footerText}>цена с СПП</p>
                        <p className={styles.fieldset__footerText_price}>
                            {product_price * ((100 - SPP) / 100)} ₽
                        </p>
                    </div>
                }
            </div>

            <Form.Item
                name='product_cost'
                label='Закупочная цена'
                className={styles.formItem}
                normalize={(value, prevValue) => {
                    const regex = /^(|-?\d*\.?\d*)$/; // только целые и дробные числа
                    if (regex.test(value)) { return value };
                    return prevValue || '';
                }}
                rules={
                    [
                        { required: true, message: '' },
                    ]
                }
            >
                <Input
                    style={{background: product_cost ? '#F2F2F2' : ''}}
                    size='large'
                    placeholder='Укажите цену товара'
                />
            </Form.Item>

            <div className={`${styles.fieldset__wrapper} ${styles.fieldset__wrapper_3cols}`}>
                <Form.Item
                    label='Длина упаковки'
                    name='package_length'
                    className={styles.formItem}
                    normalize={(value, prevValue) => {
                        const regex = /^(|\d+)$/ // только целые числа
                        if (regex.test(value)) { return value };
                        return prevValue || '';
                    }}
                    rules={
                        [
                            { required: true, message: '' },
                        ]
                    }
                >
                    <Input
                        style={{background: package_length ? '#F2F2F2' : ''}}
                        size='large'
                        placeholder='Укажите длину упаковки'
                    />
                </Form.Item>
                <Form.Item
                    label='Ширина упаковки'
                    name='package_width'
                    className={styles.formItem}
                    normalize={(value, prevValue) => {
                        const regex = /^(|\d+)$/ // только целые числа
                        if (regex.test(value)) { return value };
                        return prevValue || '';
                    }}
                    rules={
                        [
                            { required: true, message: '' },
                        ]
                    }
                >
                    <Input
                        style={{background: package_width ? '#F2F2F2' : ''}}
                        size='large'
                        placeholder='Укажите ширину упаковки'
                    />
                </Form.Item>
                <Form.Item
                    label='Высота упаковки'
                    className={styles.formItem}
                    name='package_height'
                    normalize={(value, prevValue) => {
                        const regex = /^(|\d+)$/ // только целые числа
                        if (regex.test(value)) { return value };
                        return prevValue || '';
                    }}
                    rules={
                        [
                            { required: true, message: '' },
                        ]
                    }
                >
                    <Input
                        style={{background: package_height ? '#F2F2F2' : ''}}
                        size='large'
                        placeholder='Укажите высоту упаковки'
                    />
                </Form.Item>
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
                        name='isHeavy'
                        valuePropName="checked"
                    >

                        <Checkbox
                        >Тяжелее 25 кг</Checkbox>
                    </Form.Item>
                </ConfigProvider>

                <div className={styles.fieldset__footer_span}>
                    {Number.isNaN(sidesSum) ? '' : <p className={styles.fieldset__footerText}>Сумма трех сторон: {sidesSum} см</p>}
                    {volume === 'NaN' ? '' : <p className={styles.fieldset__footerText}>Расчетный объем: {volume} л</p>}
                    {isHeavy && <ConfigProvider
                        theme={{
                            token: {
                                colorTextLightSolid: '#000'
                            }
                        }}
                    >
                        <Tooltip
                            arrow={false}
                            title={
                                <div>
                                    <p>Сверхгабаритный товар:</p>
                                    <ul style={{ margin: 0, padding: '0 0 0 10px' }}>
                                        <li>По одной стороне упаковки от 120 до 400 см</li>
                                        <li>Сумма трех сторон упаковки от 200 до 1200 см</li>
                                        <li>От 25 до 100 кг — вес одной коробки</li>
                                        <li>От 25 до 200 кг — общий вес нескольких коробок в стяжке</li>
                                    </ul>
                                </div>
                            }
                            style={{ cursor: 'pointer' }}
                            color={'white'}
                        >
                            <div className={`${styles.tooltip} ${styles.tooltip_red}`}>!</div>
                        </Tooltip>
                    </ConfigProvider>}
                </div>
            </div>
        </fieldset>
    )
}

export default BasicDataFormBlock;