import { useState, useRef, useEffect } from 'react';
import { Form, Input, Checkbox, ConfigProvider, Tooltip, AutoComplete, Modal, Select } from 'antd';
import { normilizeUnitsInputValue } from './UnitCalcUtils';
import { getCalculatorSubjects } from '@/service/api/api';
import styles from './BasicDataFormBlockDesktop.module.css';
import useDebouncedFunction from '@/service/hooks/useDebounce';
import { useAppSelector } from '@/redux/hooks';
import { sortByRelevance } from '@/service/utils';

const BasicDataFormBlockDesktop = ({ form, setMpMainFee, isProductFromToken, setIsProductFromToken }) => {
    const [autocompleteOptions, setAutocompleteOptions] = useState();
    const [loadingOptions, setLoadingOptions] = useState(true);
    const [error, setError] = useState(false);
    const { isSidebarHidden } = useAppSelector(store => store.utils);

    const getSubjectsDataWSetter = async (value) => {
        setLoadingOptions(true);
        const res = await getCalculatorSubjects({ search_string: value.trim() });

        if (res.rows) {
            const sortedRows = sortByRelevance(res.rows, value.trim(), 'name');
            setAutocompleteOptions(sortedRows);
        } else {
            setError(true);
        }
        setLoadingOptions(false);
    };

    const debouncedDataFetch = useDebouncedFunction(getSubjectsDataWSetter, 500);

    useEffect(() => {
        getSubjectsDataWSetter('');
    }, []);

    const isSPP = Form.useWatch('isSPP', form);
    const product = Form.useWatch('product', form);
    const product_cost = Form.useWatch('product_cost', form);
    const isHeavy = Form.useWatch('isHeavy', form);
    const product_price = Form.useWatch('product_price', form);
    const SPP = Form.useWatch('SPP', form);
    const package_length = Form.useWatch('package_length', form);
    const package_width = Form.useWatch('package_width', form);
    const package_height = Form.useWatch('package_height', form);

    const package_width_int = parseInt(package_width);
    const package_length_int = parseInt(package_length);
    const package_height_int = parseInt(package_height);

    const sidesSum = package_width_int + package_length_int + package_height_int;
    const volume = (((package_height_int / 100) * (package_length_int / 100) * (package_width_int / 100)) * 1000).toFixed(2);

    const autocompleteValidation = (_, value) => { //custom validation for autocomplete
        if (!value) {
            return Promise.reject('Пожалуйста, заполните это поле');
            // } else if (!isOptionClicked && !isProductFromToken) {
        } else if (isProductFromToken !== null && isProductFromToken === false) {
            return Promise.reject('Пожалуйста, выберите опцию');
        } else {
            return Promise.resolve();
        }
    };

    const handleSearch = (value) => { // обработка ввода пользователя вручную
        setLoadingOptions(true);
        setIsProductFromToken(false);
        // setIsOptionClicked(false)
        // setInputValue(value)
        // if (value === '') {
        // setAutocompleteOptions([])
        // }
        value && debouncedDataFetch(value);
    };

    const handleSelect = (value) => { // обработка клика на опцию
        setLoadingOptions(false);
        // setIsOptionClicked(true)
        setIsProductFromToken(null);
        // setInputValue(value);
        const currentOption = autocompleteOptions.find(_ => _.name === value)
        if (currentOption) {
            setMpMainFee(currentOption.fbo)
        }
    };

    return (
        <fieldset className={styles.fieldset}>
            <Modal
                open={error}
                title='Что-то пошло не так'
                onClose={() => { setError(false); }}
                onOk={() => { setError(false); }}
                onCancel={() => { setError(false); }}
                footer={null}
            />
            <div className={styles.fieldset__header}>
                <h2 className={styles.fieldset__title}>Базовые данные</h2>
                <p className={styles.fieldset__subtitle}>Укажите значения для расчета одной единицы товара (SKU)</p>
            </div>

            <ConfigProvider
                theme={{
                    token: {
                        colorBgContainer: 'white',
                        colorBorder: '#5329FF1A',
                        borderRadius: 8,
                        fontFamily: 'Mulish',
                        fontSize: 12,
                        fontWeight: 500,
                        controlHeightLG: 38
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
                        },
                    }
                }}
            >
                <Form.Item
                    name='product'
                    label='Товар'
                    className={styles.formItem}
                    normalize={(value) => {
                        const regex = /[<>:"/\\|?*]/;
                        return regex.test(value) ? value.replace(regex, '') : value;
                    }}
                >
                    <Select
                        showSearch
                        size='large'
                        placeholder='Введите название товара'
                        className={styles.formItem__input}
                        //style={{ background: product ? '#F2F2F2' : '' }}
                        id='autocomp'
                        loading={loadingOptions}
                        notFoundContent={<div style={{ color: 'black' }}>
                            {!loadingOptions && autocompleteOptions && autocompleteOptions.length === 0 && 'Ничего не найдено'}
                            {loadingOptions && 'Идет загрузка...'
                            }
                        </div>}
                        suffixIcon={
                            <svg
                                style={{
                                    // transform: 'translateY(-50%)',
                                    width: '14px',
                                    height: '9px',
                                    pointerEvents: 'none',
                                }}
                                viewBox='0 0 28 17'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M2 2L14 14L26 2'
                                    stroke='rgba(140, 140, 140, 1)'
                                    strokeWidth='4'
                                    strokeLinecap='round'
                                />
                            </svg>
                        }
                        allowClear={{
                            clearIcon: (
                                <div style={{ marginLeft: -20, background: 'transparent' }}>
                                    <svg width="10" height="10" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M14.7074 2.60356C15.0979 2.21304 15.0979 1.57987 14.7074 1.18935C14.3168 0.798823 13.6837 0.798823 13.2931 1.18935L7.58602 6.89646L2.08601 1.39645C1.69549 1.00593 1.06232 1.00593 0.671799 1.39645C0.281275 1.78698 0.281275 2.42014 0.671799 2.81067L5.96469 8.10356L0.671799 13.3965C0.281275 13.787 0.281275 14.4201 0.671799 14.8107C1.06232 15.2012 1.69549 15.2012 2.08601 14.8107L7.79313 9.10355L13.2931 14.6036C13.6837 14.9941 14.3168 14.9941 14.7074 14.6036C15.0979 14.213 15.0979 13.5799 14.7074 13.1893L9.41446 7.89645L14.7074 2.60356Z" fill="currentColor" />
                                    </svg>
                                </div>
                            )
                        }}
                        onSearch={handleSearch}
                        onSelect={handleSelect}
                        options={autocompleteOptions && autocompleteOptions.length > 0 ? autocompleteOptions.map(_ => ({ value: _.name })) : undefined}
                    />
                </Form.Item>
            </ConfigProvider>

            <div className={`${styles.fieldset__wrapper} ${styles.fieldset__wrapper_2cols}`}>
                <Form.Item
                    name='product_price'
                    label='Цена товара'
                    className={isSPP ? styles.formItem : `${styles.formItem} ${styles.formItem_wide}`}
                    getValueProps={(value) => {
                        const transformedValue = { value: value ? value + ' ₽' : value };
                        return transformedValue;
                    }}
                    normalize={(value, prevValue) => {
                        const normalizedValue = normilizeUnitsInputValue(value, prevValue, ' ₽');
                        const regex = /^-?\d*\.?\d*$/; // только целые и дробные числа
                        if (regex.test(normalizedValue)) { return normalizedValue; };
                        return prevValue || '';
                    }}
                    rules={
                        [
                            { required: true, message: 'Пожалуйста, заполните это поле!' },
                        ]
                    }
                >
                    <Input
                        //style={{ background: product_price ? '#F2F2F2' : '' }}
                        size='large'
                        placeholder='Укажите цену товара'
                        className={styles.formItem__input}
                    />
                </Form.Item>
                {isSPP && <Form.Item
                    label='СПП'
                    className={styles.formItem}
                    name='SPP'
                    getValueProps={(value) => {
                        const transformedValue = { value: value ? value + ' %' : value };
                        return transformedValue;
                    }}
                    normalize={(value, prevValue) => {
                        const normalizedValue = normilizeUnitsInputValue(value, prevValue, ' %');
                        const regex = /^(100(\.0*)?|0*(\d{1,2}(\.\d*)?|\.\d+))$|^$/; // только целые и дробные от 0 до 100
                        if (regex.test(normalizedValue)) { return normalizedValue; };
                        return prevValue || '';
                    }}
                    rules={
                        [
                            { required: true, message: 'Пожалуйста, заполните это поле!' },
                        ]
                    }
                >
                    <Input
                        //style={{ background: SPP ? '#F2F2F2' : '' }}
                        size='large'
                        placeholder='Укажите СПП, %'
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
                            {(product_price * ((100 - SPP) / 100)).toFixed(2)} ₽
                        </p>
                    </div>
                }
            </div>

            <Form.Item
                name='product_cost'
                label='Закупочная цена'
                className={styles.formItem}
                getValueProps={(value) => {
                    const transformedValue = { value: value ? value + ' ₽' : value };
                    return transformedValue;
                }}
                normalize={(value, prevValue) => {
                    const normalizedValue = normilizeUnitsInputValue(value, prevValue, ' ₽');
                    const regex = /^-?\d*\.?\d*$/; // только целые и дробные числа
                    if (regex.test(normalizedValue)) { return normalizedValue; };
                    return prevValue || '';
                }}
                rules={
                    [
                        { required: true, message: 'Пожалуйста, заполните это поле!' },
                    ]
                }
            >
                <Input
                    //style={{ background: product_cost ? '#F2F2F2' : '' }}
                    size='large'
                    placeholder='Укажите цену товара'
                    className={styles.formItem__input}
                />
            </Form.Item>

            <div className={isSidebarHidden ? `${styles.fieldset__wrapper} ${styles.fieldset__wrapper_3cols}` : `${styles.fieldset__wrapper}  ${styles.fieldset__wrapper_sidebar}`}>
                <Form.Item
                    label='Длина упаковки'
                    name='package_length'
                    className={styles.formItem}
                    getValueProps={(value) => {
                        const transformedValue = { value: value ? value + ' см' : value };
                        return transformedValue;
                    }}
                    normalize={(value, prevValue) => {
                        const normalizedValue = normilizeUnitsInputValue(value, prevValue, ' см');
                        const regex = /^(|\d+)$/; // только целые числа
                        if (regex.test(normalizedValue)) { return normalizedValue; };
                        return prevValue || '';
                    }}
                    rules={
                        [
                            { required: true, message: 'Пожалуйста, заполните это поле!' },
                        ]
                    }
                >
                    <Input
                        style={{ alignSelf: 'end' }}
                        size='large'
                        placeholder='Укажите длину упаковки'
                        className={styles.formItem__input}
                    />
                </Form.Item>
                <Form.Item
                    label='Ширина упаковки'
                    name='package_width'
                    className={styles.formItem}
                    getValueProps={(value) => {
                        const transformedValue = { value: value ? value + ' см' : value };
                        return transformedValue;
                    }}
                    normalize={(value, prevValue) => {
                        const normalizedValue = normilizeUnitsInputValue(value, prevValue, ' см');
                        const regex = /^(|\d+)$/; // только целые числа
                        if (regex.test(normalizedValue)) { return normalizedValue; };
                        return prevValue || '';
                    }}
                    rules={
                        [
                            { required: true, message: 'Пожалуйста, заполните это поле!' },
                        ]
                    }
                >
                    <Input
                        //style={{ background: package_width ? '#F2F2F2' : '' }}
                        size='large'
                        placeholder='Укажите ширину упаковки'
                        className={styles.formItem__input}
                    />
                </Form.Item>
                <Form.Item
                    label='Высота упаковки'
                    className={styles.formItem}
                    name='package_height'
                    getValueProps={(value) => {
                        const transformedValue = { value: value ? value + ' см' : value };
                        return transformedValue;
                    }}
                    normalize={(value, prevValue) => {
                        const normalizedValue = normilizeUnitsInputValue(value, prevValue, ' см');
                        const regex = /^(|\d+)$/; // только целые числа
                        if (regex.test(normalizedValue)) { return normalizedValue; };
                        return prevValue || '';
                    }}
                    rules={
                        [
                            { required: true, message: 'Пожалуйста, заполните это поле!' },
                        ]
                    }
                >
                    <Input
                       // style={{ background: package_height ? '#F2F2F2' : '' }}
                        size='large'
                        placeholder='Укажите высоту упаковки'
                        className={styles.formItem__input}
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

                <div className={isSidebarHidden ? styles.fieldset__footer_span : styles.fieldset__footer_plain}>
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
    );
};

export default BasicDataFormBlockDesktop;
