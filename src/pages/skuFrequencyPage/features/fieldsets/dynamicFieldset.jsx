import { useMemo, useState, useEffect, useRef } from 'react';
import styles from './dynamicFieldset.module.css';
import { Form, ConfigProvider, Input, Select, Button, Tag } from 'antd';
import { Link } from 'react-router-dom';

const dynamicOptions = [
    { value: 'Изменение' },
    { value: 'Рост' },
    { value: 'Падение' },
];

const monthsOptions = [
    { label: 'Январь', value: 1 },
    { label: 'Февраль', value: 2 },
    { label: 'Март', value: 3 },
    { label: 'Апрель', value: 4 },
    { label: 'Май', value: 5 },
    { label: 'Июнь', value: 6 },
    { label: 'Июль', value: 7 },
    { label: 'Август', value: 8 },
    { label: 'Сентябрь', value: 9 },
    { label: 'Октябрь', value: 10 },
    { label: 'Ноябрь', value: 11 },
    { label: 'Декабрь', value: 12 },
];

const DynamicFieldset = ({ form }) => {

    const [isBodyVisisble, setIsBodyVisible] = useState(true);

    const dynamic_30_days = Form.useWatch('dynamic_30_days', form);
    const dynamic_60_days = Form.useWatch('dynamic_60_days', form);
    const dynamic_90_days = Form.useWatch('dynamic_90_days', form);
    const months_grow = Form.useWatch('months_grow', form);
    const months_fall = Form.useWatch('months_fall', form);

    const memoizedConfigProviderTheme = useMemo(() => ({
        token: {
            colorPrimary: '#5329FF'
        },
        components: {
            Form: {
            },
            Select: {
                activeOutlineColor: 'transparent',
                optionActiveBg: 'transparent',
                optionFontSize: 16,
                optionSelectedBg: 'transparent',
                optionSelectedColor: '#5329FF',
                selectorBg: 'white',
                colorBorder: 'transparent'
            },
            Input: {
                colorBorder: 'transparent'
            }
        }
    }), []);

    const tagRender = props => {
        const { label, value, closable, onClose } = props;
        const onPreventMouseDown = event => {
            event.preventDefault();
            event.stopPropagation();
        };
        return (
            <Tag
                color={value}
                //onMouseDown={onPreventMouseDown}
                closable={false}
                onClose={onClose}
                style={{ background: 'transparent', color: 'black', fontSize: '16px', display: 'flex', alignItems: 'center', border: 'none', marginTop: 5 }}
            >
                {label}
            </Tag>
        );
    };

    const renderPopup = (menu, selectId) => {

        const growAction = () => {
            if (months_grow && Array.isArray(months_grow) && months_grow.length === monthsOptions.length) {
                form.setFieldValue('months_grow', []);
            } else {
                form.setFieldValue('months_grow', monthsOptions.map(_ => _.value));
            }
        };
        const fallAction = () => {
            if (months_fall && Array.isArray(months_fall) && months_fall.length === monthsOptions.length) {
                form.setFieldValue('months_fall', []);
            } else {
                form.setFieldValue('months_fall', monthsOptions.map(_ => _.value));
            }
        };

        if (selectId === 'months_grow') {
            return (
                <>
                    <div style={{ width: '100%', padding: '10px 0' }}>
                        {menu}
                    </div>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: '#5329FF'
                            }
                        }}
                    >
                        <Button
                            style={{ width: '100%' }}
                            type='primary'
                            size='large'
                            onClick={growAction}
                        >
                            {months_grow && Array.isArray(months_grow) && months_grow.length === monthsOptions.length ? 'Снять все' : 'Выбрать все'}
                        </Button>
                    </ConfigProvider>
                </>);
        }
        if (selectId === 'months_fall') {
            return (
                <>
                    <div style={{ width: '100%', padding: '10px 0' }}>
                        {menu}
                    </div>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: '#5329FF'
                            }
                        }}
                    >
                        <Button
                            style={{ width: '100%' }}
                            type='primary'
                            size='large'
                            onClick={fallAction}
                        >
                            {months_fall && Array.isArray(months_fall) && months_fall.length === monthsOptions.length ? 'Снять все' : 'Выбрать все'}
                        </Button>
                    </ConfigProvider>
                </>);
        }


    };

    return (
        <fieldset
            className={styles.fieldset}
        >
            <div
                className={styles.fieldset__header}
                id='header'
                onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    // console.log('t', e.target)
                    // console.log('ct', e.currentTarget)
                    // console.log('type', e.type)
                    if (e.currentTarget.id === 'header' && e.type === 'click') {
                        setIsBodyVisible(!isBodyVisisble);
                    }
                    if (window.getSelection) {
                        const selection = window.getSelection();
                        if (selection) selection.removeAllRanges();
                    } else if (document.selection) {
                        document.selection.empty();
                    }
                }}
                onMouseDownCapture={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (window.getSelection) {
                        const selection = window.getSelection();
                        if (selection) selection.removeAllRanges();
                    } else if (document.selection) {
                        document.selection.empty();
                    }
                }}
            >
                <h3 className={styles.fieldset__title}>Динамика популярности и роста запросов</h3>
                <button className={isBodyVisisble ? styles.widget__openButton : `${styles.widget__openButton} ${styles.widget__openButton_closed}`} type='button'>
                    <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 7.5L7 1.5L1 7.5" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>
            </div>

            <div className={styles.fieldset__layout} hidden={!isBodyVisisble}>

                {/*------------------------------------- 30 days -------------------------------------------*/}
                <ConfigProvider
                    theme={memoizedConfigProviderTheme}
                >
                    <div className={styles.form__dynamicSelectBlock}>
                        <label className={styles.form__doubledLabel}>За 30 дней, %</label>
                        <div className={styles.form__dynamicSelectWrapper}>
                            <Form.Item
                                style={{ margin: 0, width: '100%' }}
                                name='dynamic_30_days'
                            >
                                <Select
                                    size='large'
                                    style={{ height: '44px' }}
                                    placeholder='Изменение'
                                    options={dynamicOptions}
                                    suffixIcon={
                                        <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L7 7L13 1" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    }
                                />
                            </Form.Item>
                            {dynamic_30_days !== 'Изменение' &&
                                <>
                                    <Form.Item
                                        style={{ margin: 0, width: '100%' }}
                                        name='dynamic_30_days_from'
                                        normalize={(value) => {
                                            // Удаляем все символы кроме цифр, точки и минуса
                                            return value ? value.replace(/[^0-9.-]/g, '') : value;
                                        }}
                                        //help=""
                                        rules={[
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    const regex = /^(|\d+)$/; // только целые числа
                                                    if (!value && getFieldValue('dynamic_30_days') && !getFieldValue('dynamic_30_days_to')) {
                                                        return Promise.reject(new Error(''));
                                                    }
                                                    if (value && !regex.test(value)) {
                                                        return Promise.reject(new Error(''));
                                                    }
                                                    return Promise.resolve();
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input
                                            size='large'
                                            // placeholder={'от 20'}
                                            prefix={<span style={{ color: '#8C8C8C' }}>от</span>}
                                            suffix={<span style={{ color: '#8C8C8C' }}>%</span>}
                                            style={{ height: '44px' }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        style={{ margin: 0, width: '100%' }}
                                        name='dynamic_30_days_to'
                                        normalize={(value) => {
                                            // Удаляем все символы кроме цифр, точки и минуса
                                            return value ? value.replace(/[^0-9.-]/g, '') : value;
                                        }}
                                        //help=''
                                        rules={[
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    const regex = /^(|\d+)$/; // только целые числа
                                                    if (!value && getFieldValue('dynamic_30_days') && !getFieldValue('dynamic_30_days_from')) {
                                                        return Promise.reject(new Error(''));
                                                    }
                                                    if (value && !regex.test(value)) {
                                                        return Promise.reject(new Error(''));
                                                    }
                                                    return Promise.resolve();
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input
                                            size='large'
                                            // placeholder={'до 100'}
                                            prefix={<span style={{ color: '#8C8C8C' }}>до</span>}
                                            suffix={<span style={{ color: '#8C8C8C' }}>%</span>}
                                            style={{ height: '44px' }}
                                        />
                                    </Form.Item>
                                </>
                            }
                        </div>
                    </div>

                    {/*------------------------------------- 60 days -------------------------------------------*/}

                    <div className={styles.form__dynamicSelectBlock}>
                        <label className={styles.form__doubledLabel}>За 60 дней, %</label>
                        <div className={styles.form__dynamicSelectWrapper}>
                            <Form.Item
                                style={{ margin: 0, width: '100%' }}
                                name='dynamic_60_days'
                            >
                                <Select
                                    size='large'
                                    placeholder='Изменение'
                                    options={dynamicOptions}
                                    style={{ height: '44px' }}
                                    suffixIcon={
                                        <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L7 7L13 1" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    }
                                />
                            </Form.Item>
                            {dynamic_60_days !== 'Изменение' &&
                                <>
                                    <Form.Item
                                        style={{ margin: 0, width: '100%' }}
                                        name='dynamic_60_days_from'
                                        normalize={(value) => {
                                            // Удаляем все символы кроме цифр, точки и минуса
                                            return value ? value.replace(/[^0-9.-]/g, '') : value;
                                        }}
                                        rules={[
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    const regex = /^(|\d+)$/; // только целые числа
                                                    if (!value && getFieldValue('dynamic_60_days') && !getFieldValue('dynamic_60_days_to')) {
                                                        return Promise.reject(new Error(''));
                                                    }
                                                    if (value && !regex.test(value)) {
                                                        return Promise.reject(new Error(''));
                                                    }
                                                    return Promise.resolve();
                                                    //return Promise.reject(new Error(''));
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input
                                            size='large'
                                            style={{ height: '44px' }}
                                            // placeholder={'от 20'}
                                            prefix={<span style={{ color: '#8C8C8C' }}>от</span>}
                                            suffix={<span style={{ color: '#8C8C8C' }}>%</span>}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        style={{ margin: 0, width: '100%' }}
                                        name='dynamic_60_days_to'
                                        normalize={(value) => {
                                            // Удаляем все символы кроме цифр, точки и минуса
                                            return value ? value.replace(/[^0-9.-]/g, '') : value;
                                        }}
                                        rules={[
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    const regex = /^(|\d+)$/; // только целые числа
                                                    if (!value && getFieldValue('dynamic_60_days') && !getFieldValue('dynamic_60_days_from')) {
                                                        return Promise.reject(new Error(''));
                                                    }
                                                    if (value && !regex.test(value)) {
                                                        return Promise.reject(new Error(''));
                                                    }
                                                    return Promise.resolve();
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input
                                            size='large'
                                            style={{ height: '44px' }}
                                            // placeholder={'до 100'}
                                            prefix={<span style={{ color: '#8C8C8C' }}>до</span>}
                                            suffix={<span style={{ color: '#8C8C8C' }}>%</span>}
                                        />
                                    </Form.Item>
                                </>
                            }
                        </div>
                    </div>

                    {/*------------------------------------- 90 days -------------------------------------------*/}

                    <div className={styles.form__dynamicSelectBlock}>
                        <label className={styles.form__doubledLabel}>За 90 дней, %</label>
                        <div className={styles.form__dynamicSelectWrapper}>
                            <Form.Item
                                //label='От даты отсчета за 90 дней, %'
                                style={{ margin: 0, width: '100%' }}
                                name='dynamic_90_days'
                            >
                                <Select
                                    size='large'
                                    placeholder='Изменение'
                                    options={dynamicOptions}
                                    style={{ height: '44px' }}
                                    suffixIcon={
                                        <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L7 7L13 1" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    }
                                />
                            </Form.Item>
                            {dynamic_90_days !== 'Изменение' &&
                                <>
                                    <Form.Item
                                        style={{ margin: 0, width: '100%' }}
                                        name='dynamic_90_days_from'
                                        normalize={(value) => {
                                            // Удаляем все символы кроме цифр, точки и минуса
                                            return value ? value.replace(/[^0-9.-]/g, '') : value;
                                        }}
                                        rules={[
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    const regex = /^(|\d+)$/; // только целые числа
                                                    if (!value && getFieldValue('dynamic_90_days') && !getFieldValue('dynamic_90_days_to')) {
                                                        return Promise.reject(new Error(''));
                                                    }
                                                    if (value && !regex.test(value)) {
                                                        return Promise.reject(new Error(''));
                                                    }
                                                    return Promise.resolve();
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input
                                            size='large'
                                            style={{ height: '44px' }}
                                            // placeholder={'от 20'}
                                            prefix={<span style={{ color: '#8C8C8C' }}>от</span>}
                                            suffix={<span style={{ color: '#8C8C8C' }}>%</span>}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        style={{ margin: 0, width: '100%' }}
                                        name='dynamic_90_days_to'
                                        normalize={(value) => {
                                            // Удаляем все символы кроме цифр, точки и минуса
                                            return value ? value.replace(/[^0-9.-]/g, '') : value;
                                        }}
                                        rules={[
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    const regex = /^(|\d+)$/; // только целые числа
                                                    if (!value && getFieldValue('dynamic_90_days') && !getFieldValue('dynamic_90_days_from')) {
                                                        return Promise.reject(new Error(''));
                                                    }
                                                    if (value && !regex.test(value)) {
                                                        return Promise.reject(new Error(''));
                                                    }
                                                    return Promise.resolve();
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input
                                            size='large'
                                            style={{ height: '44px' }}
                                            // placeholder={'до 100'}
                                            prefix={<span style={{ color: '#8C8C8C' }}>до</span>}
                                            suffix={<span style={{ color: '#8C8C8C' }}>%</span>}
                                        />
                                    </Form.Item>
                                </>
                            }
                        </div>
                    </div>


                    {/* ------------------------------------- month select -------------------------------------------*/}
                    {/* <div className={styles.form__dynamicSelectBlock}>
                        <label className={styles.form__doubledLabel} style={{whiteSpace: 'nowrap'}}>
                            Месяцы роста запросов
                            <svg width="21" height="13" viewBox="0 0 21 13" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '0 0 3px 5px' }}>
                                <path d="M14.2 0.543945L16.49 2.83395L11.61 7.71395L7.60995 3.71395L0.199951 11.1339L1.60995 12.5439L7.60995 6.54395L11.61 10.5439L17.91 4.25395L20.2 6.54395V0.543945H14.2Z" fill="#00B69B" />
                            </svg>
                        </label>
                        <div className={styles.form__dynamicSelectWrapper}>
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorTextPlaceholder: '#000000',
                                    },
                                    components: {
                                        Select: {
                                        }
                                    }
                                }}
                            >
                                <Form.Item
                                    //label='От даты отсчета за 90 дней, %'
                                    style={{ margin: 0, width: '100%' }}
                                    name='months_grow'
                                >
                                    <Select
                                        maxTagCount={0}
                                        maxTagTextLength={5}
                                        mode='multiple'
                                        size='large'
                                        placeholder='Выберите месяцы'
                                        className={styles.monthSelect}
                                        options={monthsOptions}
                                        style={{ height: '44px' }}
                                        tagRender={tagRender}
                                        dropdownRender={(menu) => renderPopup(menu, 'months_grow')}
                                        showSearch={false}
                                        suffixIcon={
                                            <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 1L7 7L13 1" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                        }
                                        maxTagPlaceholder={omittedValues => (
                                            <>
                                                {omittedValues.length > 1 && <p className={styles.plainSelect__multiLabel}>Выбрано: {omittedValues.length}</p>}
                                                {omittedValues.length === 1 &&
                                                    <p className={styles.plainSelect__multiLabel} title={omittedValues[0].value}>{monthsOptions.find(_ => _?.value === omittedValues[0].value)?.label}</p>
                                                }
                                            </>
                                        )}
                                        menuItemSelectedIcon={<span style={{ background: '#5329FF', width: 4, height: 4, borderRadius: '50% 50%' }}></span>}
                                        getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                    />
                                </Form.Item>
                            </ConfigProvider>
                        </div>
                    </div>
                    <div className={styles.form__dynamicSelectBlock}>
                        <label className={styles.form__doubledLabel} style={{whiteSpace: 'nowrap'}}>
                            Месяцы спада запросов
                            <svg width="21" height="13" viewBox="0 0 21 13" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '0 0 3px 5px' }}>
                                <path d="M14.5999 12.5439L16.8899 10.2539L12.0099 5.37395L8.00985 9.37395L0.599854 1.95395L2.00985 0.543945L8.00985 6.54395L12.0099 2.54395L18.3099 8.83395L20.5999 6.54395V12.5439H14.5999Z" fill="#F93C65" />
                            </svg>
                        </label>
                        <div className={styles.form__dynamicSelectWrapper}>
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorTextPlaceholder: '#000000',
                                    },
                                    components: {
                                        Select: {
                                        }
                                    }
                                }}
                            >
                                <Form.Item
                                    //label='От даты отсчета за 90 дней, %'
                                    style={{ margin: 0, width: '100%' }}
                                    name='months_fall'
                                >
                                    <Select
                                        maxTagCount={0}
                                        maxTagTextLength={5}
                                        mode='multiple'
                                        size='large'
                                        placeholder='Выберите месяцы'
                                        className={styles.monthSelect}
                                        options={monthsOptions}
                                        style={{ height: '44px' }}
                                        tagRender={tagRender}
                                        dropdownRender={(menu) => renderPopup(menu, 'months_fall')}
                                        showSearch={false}
                                        suffixIcon={
                                            <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 1L7 7L13 1" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                        }
                                        maxTagPlaceholder={omittedValues => (
                                            <>
                                                {omittedValues.length > 1 && <p className={styles.plainSelect__multiLabel}>Выбрано: {omittedValues.length}</p>}
                                                {omittedValues.length === 1 &&
                                                    <p className={styles.plainSelect__multiLabel} title={omittedValues[0].value}>{monthsOptions.find(_ => _?.value === omittedValues[0].value)?.label}</p>
                                                }
                                            </>
                                        )}
                                        menuItemSelectedIcon={<span style={{ background: '#5329FF', width: 4, height: 4, borderRadius: '50% 50%' }}></span>}
                                        getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                    />
                                </Form.Item>
                            </ConfigProvider>
                        </div>
                    </div> */}
                </ConfigProvider>
            </div>
        </fieldset>
    );
};

export default DynamicFieldset;
