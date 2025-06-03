import { useState, useEffect } from 'react'
import { Form, ConfigProvider, Select, Input, Button, Tag } from 'antd'
import { DatePicker } from '../../features'
import styles from './paramsWidget.module.css'
import moment from 'moment'


const mockPreferedItems = [1, 2, 3]

export const ParamsWidget = () => {
    const [isParamsVisible, setIsParamsVisible] = useState(true)
    const [selectedDate, setSelectedDate] = useState(moment().subtract(30, 'days').format('YYYY-MM-DD'))
    const [searchState, setSearchState] = useState('')
    const [form] = Form.useForm()

    const dynamic_30_days = Form.useWatch('dynamic_30_days', form)
    const dynamic_60_days = Form.useWatch('dynamic_60_days', form)
    const dynamic_90_days = Form.useWatch('dynamic_90_days', form)
    const prefered_items = Form.useWatch('prefered_items', form)

    const resetFieldsHandler = () => {
        form.resetFields()
        setSelectedDate(moment().subtract(30, 'days').format('YYYY-MM-DD'))
    }

    const submitHandler = (fields) => {
        console.log(fields)
    }

    useEffect(() => {
        if (dynamic_30_days || dynamic_60_days || dynamic_90_days) {
            form.validateFields(['dynamic_30_days', 'dynamic_60_days', 'dynamic_90_days'])
        }
    }, [dynamic_30_days, dynamic_60_days, dynamic_90_days])

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
                style={{ background: 'transparent', color: 'black', fontSize: '18px', display: 'flex', alignItems: 'center', border: 'none' }}
            >
                {label}
            </Tag>
        );
    };

    const renderPopup = (menu) => {
        let action
        if (prefered_items?.length < mockPreferedItems.length && !searchState) {
            action = () => { form.setFieldValue('prefered_items', mockPreferedItems) }
        }
        if (prefered_items?.length === mockPreferedItems.length) {
            action = () => { form.setFieldValue('prefered_items', []) }
        }

        return (
            <>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#5329FF'
                        }
                    }}
                >
                    <Input
                        allowClear
                        size='large'
                        placeholder="Поиск"
                        value={searchState}
                        onChange={(e) => setSearchState(e.target.value)}
                        onKeyDown={e => e.stopPropagation()}
                    />
                </ConfigProvider>
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
                    {!searchState && <Button
                        style={{ width: '100%' }}
                        type='primary'
                        size='large'
                        onClick={action}
                        disabled={mockPreferedItems.length === 0}
                    >
                        {prefered_items?.length < mockPreferedItems.length && 'Выбрать все'}
                        {prefered_items?.length === mockPreferedItems.length && 'Снять все'}
                    </Button>}
                </ConfigProvider>
            </>)
    }

    return (
        <div className={styles.widget}>
            {/* header */}
            <div className={styles.widget__header} onClick={() => setIsParamsVisible(!isParamsVisible)}>
                <p className={styles.widget__title}>Параметры</p>
                <button className={isParamsVisible ? `${styles.widget__openButton} ${styles.widget__openButton_opened}` : `${styles.widget__openButton} ${styles.widget__openButton_closed}`}>
                    <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L9 9L17 1" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>
            </div>
            {/* body */}
            <div className={isParamsVisible ? `${styles.widget__body} ${styles.widget__body_visible}` : styles.widget__body}>
                <div className={styles.widget__datapicker}>
                    <label className={styles.form__doubledLabel}>Дата отсчета</label>
                    <DatePicker
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                    />
                </div>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#5329FF'
                        },
                        components: {
                            Form: {
                                labelFontSize: 15
                            },
                        }
                    }}
                >
                    <Form
                        layout='vertical'
                        form={form}
                        className={styles.form}
                        scrollToFirstError
                        onFinish={submitHandler}
                        initialValues={{
                            prefered_items: [],
                        }}
                    >
                        <fieldset
                            className={styles.form__fieldset}
                        >
                            <div className={styles.form__fieldsetHeader}>
                                <p className={styles.form__fieldsetTitle}>Динамика популярности запросов</p>
                                <p className={styles.form__fieldsetText}>Выберите хотя бы 1 значение</p>
                            </div>
                            <div className={`${styles.form__fieldsetLayout} ${styles.form__fieldsetLayout_3cols}`}>
                                <Form.Item
                                    label='От даты отсчета за 30 дней, %'
                                    style={{ margin: 0 }}
                                    name='dynamic_30_days'
                                    rules={[
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (value || getFieldValue('dynamic_60_days') || getFieldValue('dynamic_90_days')) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Пожалуйста, заполните хотя бы одно поле!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Select
                                        allowClear
                                        size='large'
                                        placeholder='Изменение'
                                        options={[{ value: 20 }, { value: 30 }]}
                                        suffixIcon={
                                            <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 1L7 7L13 1" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                        }
                                    />
                                </Form.Item>
                                <Form.Item
                                    label='От даты отсчета за 60 дней, %'
                                    style={{ margin: 0 }}
                                    name='dynamic_60_days'
                                    rules={[
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (value || getFieldValue('dynamic_30_days') || getFieldValue('dynamic_90_days')) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Пожалуйста, заполните хотя бы одно поле!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Select
                                        allowClear
                                        size='large'
                                        placeholder='Изменение'
                                        options={[{ value: 20 }, { value: 30 }]}
                                        suffixIcon={
                                            <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 1L7 7L13 1" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                        }
                                    />
                                </Form.Item>
                                <Form.Item
                                    label='От даты отсчета за 90 дней, %'
                                    style={{ margin: 0 }}
                                    name='dynamic_90_days'
                                    rules={[
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (value || getFieldValue('dynamic_60_days') || getFieldValue('dynamic_30_days')) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Пожалуйста, заполните хотя бы одно поле!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Select
                                        allowClear
                                        size='large'
                                        placeholder='Изменение'
                                        options={[{ value: 20 }, { value: 30 }]}
                                        suffixIcon={
                                            <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 1L7 7L13 1" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                        }
                                    />
                                </Form.Item>
                            </div>
                        </fieldset>
                        <fieldset
                            className={styles.form__fieldset}
                        >
                            <div className={styles.form__fieldsetHeader}>
                                <p className={styles.form__fieldsetTitle}>Дополнительные параметры</p>
                                <p className={styles.form__fieldsetText}>Необязательные поля</p>
                            </div>
                            <div className={`${styles.form__fieldsetLayout} ${styles.form__fieldsetLayout_5cols}`}>
                                <div className={styles.form__doudleWrapper}>
                                    <label className={styles.form__doubledLabel}>Частотность запроса за 30 дней до выбранной даты отсчета, шт</label>
                                    <div className={styles.form__twoInputsWrapper}>
                                        <Form.Item
                                            style={{ margin: 0 }}
                                            name='frequency_30_days_from'
                                            rules={[
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (!value && getFieldValue('frequency_30_days_to')) {
                                                            return Promise.reject(new Error(''));
                                                        }
                                                        return Promise.resolve();
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input
                                                size='large'
                                                placeholder='от'
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            style={{ margin: 0 }}
                                            name='frequency_30_days_to'
                                            rules={[
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (!value && getFieldValue('frequency_30_days_from')) {
                                                            return Promise.reject(new Error(''));
                                                        }
                                                        return Promise.resolve();
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input
                                                size='large'
                                                placeholder='до'
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className={styles.form__doudleWrapper}>
                                    <label className={styles.form__doubledLabel}>Количество артикулов по запросу, шт</label>
                                    <div className={styles.form__twoInputsWrapper}>
                                        <Form.Item
                                            style={{ margin: 0 }}
                                            name='sku_quantity_from'
                                            rules={[
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (!value && getFieldValue('sku_quantity_to')) {
                                                            return Promise.reject(new Error(''));
                                                        }
                                                        return Promise.resolve();
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input
                                                size='large'
                                                placeholder='от'
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            style={{ margin: 0 }}
                                            name='sku_quantity_to'
                                            rules={[
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (!value && getFieldValue('sku_quantity_from')) {
                                                            return Promise.reject(new Error(''));
                                                        }
                                                        return Promise.resolve();
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input
                                                size='large'
                                                placeholder='до'
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className={styles.form__doudleWrapper}>
                                    <label className={styles.form__doubledLabel}>Количество за 30 дней на 1 артикул, шт</label>
                                    <div className={styles.form__twoInputsWrapper}>
                                        <Form.Item
                                            style={{ margin: 0 }}
                                            name='requests_to_sku_30_days_from'
                                            rules={[
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (!value && getFieldValue('requests_to_sku_30_days_to')) {
                                                            return Promise.reject(new Error(''));
                                                        }
                                                        return Promise.resolve();
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input
                                                size='large'
                                                placeholder='от'
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            style={{ margin: 0 }}
                                            name='requests_to_sku_30_days_to'
                                            rules={[
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (!value && getFieldValue('requests_to_sku_30_days_from')) {
                                                            return Promise.reject(new Error(''));
                                                        }
                                                        return Promise.resolve();
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input
                                                size='large'
                                                placeholder='до'
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className={styles.form__doudleWrapper}>
                                    <label className={styles.form__doubledLabel}>Приоритетные предметы</label>
                                    <ConfigProvider
                                        renderEmpty={() => (<div style={{ cursor: 'default' }}>Нет данных</div>)}
                                        theme={{
                                            token: {
                                                colorBgContainer: 'white',
                                                //colorBorder: 'transparent',
                                                //borderRadius: 8,
                                                fontFamily: 'Mulish',
                                                fontSize: 16,
                                            },
                                            components: {
                                                Select: {
                                                    //activeBorderColor: 'transparent',
                                                    activeOutlineColor: 'transparent',
                                                    //hoverBorderColor: 'transparent',
                                                    optionActiveBg: 'transparent',
                                                    optionFontSize: 16,
                                                    optionSelectedBg: 'transparent',
                                                    optionSelectedColor: '#5329FF',
                                                }
                                            }
                                        }}
                                    >
                                        <Form.Item
                                            style={{ margin: 0, width: '100%' }}
                                            name='prefered_items'
                                        >
                                            <Select
                                                maxTagCount={0}
                                                maxTagTextLength={5}
                                                showSearch={false}
                                                mode='multiple'
                                                size='large'
                                                placeholder='Изменение'
                                                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                                tagRender={tagRender}
                                                suffixIcon={
                                                    <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1 1L7 7L13 1" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" />
                                                    </svg>
                                                }
                                                dropdownRender={renderPopup}
                                                options={mockPreferedItems.map(_ => ({ value: _ }))}
                                                maxTagPlaceholder={omittedValues => (
                                                    <>
                                                        {omittedValues.length > 1 && <p className={styles.form__multiLabel}>Выбрано: {omittedValues.length}</p>}
                                                        {omittedValues.length === 1 &&
                                                            <p className={styles.form__multiLabel} title={omittedValues[0].value}>{omittedValues[0].value}</p>
                                                        }
                                                    </>
                                                )}
                                                menuItemSelectedIcon={<span style={{ background: '#5329FF', width: 4, height: 4, borderRadius: '50% 50%' }}></span>}
                                            />
                                        </Form.Item>
                                    </ConfigProvider>
                                </div>
                                <div className={styles.form__doudleWrapper}>
                                    <label className={styles.form__doubledLabel}>Показать запросы, содержащие слово/фразу</label>
                                    <Form.Item
                                        style={{ margin: 0, width: '100%' }}
                                        name='request_example'
                                    >
                                        <Input
                                            size='large'
                                            placeholder='Введите слово/фразу'
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                        </fieldset>

                        <div className={styles.form__controlButtonsWrapper}>
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorPrimary: '#5329FF',
                                        colorText: '#5329FF'
                                    },
                                    components: {
                                        Button: {
                                            textHoverBg: 'transparent'
                                        }
                                    }
                                }}
                            >
                                <Button
                                    type='text'
                                    size='large'
                                    onClick={resetFieldsHandler}
                                >
                                    Очистить
                                </Button>
                            </ConfigProvider>
                            <Button
                                htmlType='submit'
                                type='primary'
                                size='large'
                            >
                                Сформировать список
                            </Button>
                        </div>
                    </Form>
                </ConfigProvider>
            </div>
        </div >
    )
}