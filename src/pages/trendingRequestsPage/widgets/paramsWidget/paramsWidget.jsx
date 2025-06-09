import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Form, ConfigProvider, Select, Input, Button, Tag, message } from 'antd'
import { DatePicker } from '../../features'
import styles from './paramsWidget.module.css'
import moment from 'moment'
import { ApiService } from '../../shared'


const dynamicOptions = [
    { value: 'Рост' },
    { value: 'Падение' },
]

const validateDynamicValues = (type, from, to) => {
    const parsedFrom = parseInt(from)
    const parsedTo = parseInt(to)
    if ((from && !to) || (!to && from)) {
        return true
    }
    if (from && to) {
        switch (type) {
            case 'Рост': return parsedTo > parsedFrom
            case 'Падение': return parsedFrom > parsedTo
        }
    }
   
    return false
}

const getDynamicNormilizedValue = (type, value) => {
    let normilizedValue = 0;
    if (!value) return normilizedValue;
    if (type === 'Рост') {
        normilizedValue = parseInt(value)
    }
    if (type === 'Падение') {
        normilizedValue = parseInt(value) * -1
    }
    return normilizedValue;
}


export const ParamsWidget = React.memo(({ setRequestState, initRequestStatus, setRequestStatus, requestStatus, isParamsVisible, setIsParamsVisible }) => {
    const [selectedDate, setSelectedDate] = useState(moment().subtract(30, 'days').format('DD.MM.YYYY'))
    const [searchState, setSearchState] = useState('')
    const [preferedItemsData, setPreferedItemsData] = useState([])
    const [form] = Form.useForm()

    const getPreferedItemsTest = useCallback(async () => {
        const apiService = new ApiService({
            name: 'trendingQueriesCache',
            defaultTTL: 24 * 60 * 60 * 1000 // 24 часа
        });
        try {
            const data = await apiService.fetch(
                'https://radarmarket.ru/api/web-service/trending-queries/subjects-tree',
                {
                    onCacheHit: (data) => {
                        console.log('Using cached data');
                        setPreferedItemsData(data);
                    },
                    onCacheMiss: () => {
                        console.log('Fetching fresh data');
                    }
                }
            );
            setPreferedItemsData(data)
        } catch (error) {
            console.error('Error fetching preferred items:', error);
        }
    }, [])
    

    

    const dynamic_30_days = Form.useWatch('dynamic_30_days', form)
    const dynamic_60_days = Form.useWatch('dynamic_60_days', form)
    const dynamic_90_days = Form.useWatch('dynamic_90_days', form)
    const dynamic_30_days_from = Form.useWatch('dynamic_30_days_from', form)
    const dynamic_30_days_to = Form.useWatch('dynamic_30_days_to', form)
    const dynamic_60_days_from = Form.useWatch('dynamic_60_days_from', form)
    const dynamic_60_days_to = Form.useWatch('dynamic_60_days_to', form)
    const dynamic_90_days_from = Form.useWatch('dynamic_90_days_from', form)
    const dynamic_90_days_to = Form.useWatch('dynamic_90_days_to', form)
    const prefered_items = Form.useWatch('prefered_items', form)

    const resetFieldsHandler = useCallback(() => {
        form.resetFields()
        setSelectedDate(moment().subtract(30, 'days').format('DD.MM.YYYY'))
    }, [form])

    const submitHandler = useCallback((fields) => {

        setRequestState({
            date_from: moment(selectedDate, 'DD.MM.YYYY').format('YYYY-MM-DD'),
            //date_from: selectedDate,
            g30: {
                start: getDynamicNormilizedValue(fields.dynamic_30_days, fields.dynamic_30_days_from),
                end: getDynamicNormilizedValue(fields.dynamic_30_days, fields.dynamic_30_days_to)
            },
            g60: {
                start: getDynamicNormilizedValue(fields.dynamic_60_days, fields.dynamic_60_days_from),
                end: getDynamicNormilizedValue(fields.dynamic_60_days, fields.dynamic_60_days_to)
            },
            g90: {
                start: getDynamicNormilizedValue(fields.dynamic_90_days, fields.dynamic_90_days_from),
                end: getDynamicNormilizedValue(fields.dynamic_90_days, fields.dynamic_90_days_to)
            },
            frequency: {
                start: parseInt(fields.frequency_30_days_from) || 0,
                end: parseInt(fields.frequency_30_days_to) || 0
            },
            goods_quantity: {
                start: parseInt(fields.sku_quantity_from) || 0,
                end: parseInt(fields.sku_quantity_to) || 0
            },
            freq_per_good: {
                start: parseInt(fields.requests_to_sku_30_days_from) || 0,
                end: parseInt(fields.requests_to_sku_30_days_to) || 0
            },
            subjects: fields.prefered_items, // [0]
            query: fields.request_example,
            page: 1,
            limit: 25
        })
    }, [selectedDate, setRequestState])


    // Прямой запрос, не удалять. Старина М, 06.06.25
    // const getPreferedItems = async () => {
    //     preferedItemsData.length === 0 && setRequestStatus({ ...initRequestStatus, isLoading: true })
    //     try {
    //         let res = await fetch(`https://radarmarket.ru/api/web-service/trending-queries/subjects-tree`, {
    //             headers: {
    //                 'content-type': 'application/json',
    //                 'cache-control': 'public, must-revalidate, max-age=86400'
    //             }
    //         })
    //         if (!res.ok) {
    //             return setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось получить список предметов. Попробуйте перезагрузить страницу.' })
    //         }
    //         res = await res.json()
    //         setPreferedItemsData(res)
    //         setRequestStatus(initRequestStatus)
    //     } catch {
    //         setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось получить список предметов. Попробуйте перезагрузить страницу.' })
    //     }
    // }

    useEffect(() => {
        if (preferedItemsData.length === 0 && !requestStatus.isLoading) {
            getPreferedItemsTest()
            //getPreferedItems()
        }
    }, [preferedItemsData])

    useEffect(() => {
        if (dynamic_30_days || dynamic_60_days || dynamic_90_days) {
            form.validateFields(['dynamic_30_days', 'dynamic_60_days', 'dynamic_90_days'])
        }
    }, [dynamic_30_days, dynamic_60_days, dynamic_90_days])

    useEffect(() => {
        if (
            dynamic_30_days_from ||
            dynamic_30_days_to ||
            dynamic_60_days_from ||
            dynamic_60_days_to ||
            dynamic_90_days_from ||
            dynamic_90_days_to
        ) {
            form.validateFields([
                'dynamic_30_days_from',
                'dynamic_30_days_to',
                'dynamic_60_days_from',
                'dynamic_60_days_to',
                'dynamic_90_days_from',
                'dynamic_90_days_to'
            ])
        }
    }, [
        dynamic_30_days_from,
        dynamic_30_days_to,
        dynamic_60_days_from,
        dynamic_60_days_to,
        dynamic_90_days_from,
        dynamic_90_days_to
    ])

    const tagRender = useCallback(props => {
        const { label, value, closable, onClose } = props;
        return (
            <Tag
                //color={value}
                closable={false}
                onClose={onClose}
                bordered={false}
                style={{ background: 'transparent', color: 'black', fontSize: '16px' }}
            >
                {/* <p className={styles.form__multiLabel} title={label.props.children}>{label}</p> */}
                <p className={styles.form__multiLabel} title={label.props.children.toString().replace(',', '')}>{label}</p>
            </Tag>
        );
    }, [])

    const renderPopup = useCallback((menu) => {
        let action;
        const acc = preferedItemsData?.reduce((total, item) => {
            return total + item.children.length
        }, 0)
        if (prefered_items?.length < acc) {
            action = () => {
                let allDataArr = []
                preferedItemsData.forEach(_ => {
                    const normilized = _.children.map(c => c.id)
                    allDataArr = [...allDataArr, ...normilized]
                })
                form.setFieldValue('prefered_items', [...allDataArr])
            }
        }
        if (prefered_items?.length === acc) {
            action = () => { form.setFieldValue('prefered_items', []) }
        }

        return (
            <div style={{ zIndex: 999999 }}>
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
                        disabled={acc === 0}
                    >
                        {prefered_items?.length < acc && 'Выбрать все'}
                        {prefered_items?.length === acc && 'Снять все'}
                    </Button>}
                </ConfigProvider>
            </div>)
    }, [preferedItemsData, prefered_items, searchState, form])

    const memoizedConfigProviderTheme = useMemo(() => ({
        token: {
            colorPrimary: '#5329FF'
        },
        components: {
            Form: {
                labelFontSize: 15
            },
            Select: {
                activeOutlineColor: 'transparent',
                optionActiveBg: 'transparent',
                optionFontSize: 16,
                optionSelectedBg: 'transparent',
                optionSelectedColor: '#5329FF',
            }
        }
    }), [])

    return (
        <div className={styles.widget}>
            {requestStatus.isLoading && isParamsVisible &&
                <div className={styles.widget__loaderWrapper}>
                    <span className='loader'></span>
                </div>
            }
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
                    theme={memoizedConfigProviderTheme}
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
                                <div className={styles.form__dynamicSelectBlock}>
                                    <label className={styles.form__doubledLabel}>От даты отсчета за 30 дней, %</label>
                                    <div className={styles.form__dynamicSelectWrapper}>
                                        <Form.Item
                                            style={{ margin: 0, width: '100%' }}
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
                                                size='large'
                                                placeholder='Изменение'
                                                options={dynamicOptions}
                                                suffixIcon={
                                                    <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1 1L7 7L13 1" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" />
                                                    </svg>
                                                }
                                            />
                                        </Form.Item>
                                        {dynamic_30_days &&
                                            <>
                                                <Form.Item
                                                    style={{ margin: 0, width: '100%' }}
                                                    name='dynamic_30_days_from'
                                                    //help=""
                                                    rules={[
                                                        ({ getFieldValue }) => ({
                                                            validator(_, value) {
                                                                const regex = /^(|\d+)$/ // только целые числа
                                                                if (!value && getFieldValue('dynamic_30_days') && !getFieldValue('dynamic_30_days_to')) {
                                                                    return Promise.reject(new Error(''))
                                                                }
                                                                if (value && !regex.test(value)) {
                                                                    return Promise.reject(new Error(''))
                                                                }
                                                                return Promise.resolve()
                                                            },
                                                        }),
                                                    ]}
                                                >
                                                    <Input
                                                        size='large'
                                                        placeholder={dynamic_30_days === 'Рост' ? 'от 20' : 'от 100'}
                                                        suffix={<>%</>}
                                                        type="number"
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    style={{ margin: 0, width: '100%' }}
                                                    name='dynamic_30_days_to'
                                                    //help=''
                                                    rules={[
                                                        ({ getFieldValue }) => ({
                                                            validator(_, value) {
                                                                const regex = /^(|\d+)$/ // только целые числа
                                                                if (!value && getFieldValue('dynamic_30_days') && !getFieldValue('dynamic_30_days_from')) {
                                                                    return Promise.reject(new Error(''))
                                                                }
                                                                if (value && !regex.test(value)) {
                                                                    return Promise.reject(new Error(''));
                                                                }
                                                                return Promise.resolve()
                                                            },
                                                        }),
                                                    ]}
                                                >
                                                    <Input  
                                                        size='large'
                                                        placeholder={dynamic_30_days === 'Рост' ? 'до 100' : 'до 20'}
                                                        suffix={<>%</>}
                                                        type="number"
                                                    />
                                                </Form.Item>
                                            </>
                                        }
                                    </div>
                                    {/* Заготовка под кастомное отображение ошибок */}
                                    {/* <div style={{color: 'red'}}>
                                    {form.getFieldError('dynamic_30_days_to').toString()}
                                    {form.getFieldError('dynamic_30_days_from').toString()}
                                    </div> */}
                                </div>
                                <div className={styles.form__dynamicSelectBlock}>
                                    <label className={styles.form__doubledLabel}>От даты отсчета за 60 дней, %</label>
                                    <div className={styles.form__dynamicSelectWrapper}>
                                        <Form.Item
                                            style={{ margin: 0, width: '100%' }}
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
                                                size='large'
                                                placeholder='Изменение'
                                                options={dynamicOptions}
                                                suffixIcon={
                                                    <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1 1L7 7L13 1" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" />
                                                    </svg>
                                                }
                                            />
                                        </Form.Item>
                                        {dynamic_60_days &&
                                            <>
                                                <Form.Item
                                                    style={{ margin: 0, width: '100%' }}
                                                    name='dynamic_60_days_from'
                                                    rules={[
                                                        ({ getFieldValue }) => ({
                                                            validator(_, value) {
                                                                const regex = /^(|\d+)$/ // только целые числа
                                                                if (!value && getFieldValue('dynamic_60_days') && !getFieldValue('dynamic_60_days_to')) {
                                                                    return Promise.reject(new Error(''))
                                                                }
                                                                if (value && !regex.test(value)) {
                                                                    return Promise.reject(new Error(''))
                                                                }
                                                                return Promise.resolve()
                                                                return Promise.reject(new Error(''));
                                                            },
                                                        }),
                                                    ]}
                                                >
                                                    <Input
                                                        size='large'
                                                        placeholder={dynamic_60_days === 'Рост' ? 'от 20' : 'от 100'}
                                                        suffix={<>%</>}
                                                        type="number"
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    style={{ margin: 0, width: '100%' }}
                                                    name='dynamic_60_days_to'
                                                    rules={[
                                                        ({ getFieldValue }) => ({
                                                            validator(_, value) {
                                                                const regex = /^(|\d+)$/ // только целые числа
                                                                if (!value && getFieldValue('dynamic_60_days') && !getFieldValue('dynamic_60_days_from')) {
                                                                    return Promise.reject(new Error(''))
                                                                }
                                                                if (value && !regex.test(value)) {
                                                                    return Promise.reject(new Error(''))
                                                                }
                                                                return Promise.resolve()
                                                            },
                                                        }),
                                                    ]}
                                                >
                                                    <Input
                                                        size='large'
                                                        placeholder={dynamic_60_days === 'Рост' ? 'до 100' : 'до 20'}
                                                        suffix={<>%</>}
                                                        type="number"
                                                    />
                                                </Form.Item>
                                            </>
                                        }
                                    </div>
                                </div>
                                <div className={styles.form__dynamicSelectBlock}>
                                    <label className={styles.form__doubledLabel}>От даты отсчета за 90 дней, %</label>
                                    <div className={styles.form__dynamicSelectWrapper}>
                                        <Form.Item
                                            //label='От даты отсчета за 90 дней, %'
                                            style={{ margin: 0, width: '100%' }}
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
                                                size='large'
                                                placeholder='Изменение'
                                                options={dynamicOptions}
                                                suffixIcon={
                                                    <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1 1L7 7L13 1" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" />
                                                    </svg>
                                                }
                                            />
                                        </Form.Item>
                                        {dynamic_90_days &&
                                            <>
                                                <Form.Item
                                                    style={{ margin: 0, width: '100%' }}
                                                    name='dynamic_90_days_from'
                                                    rules={[
                                                        ({ getFieldValue }) => ({
                                                            validator(_, value) {
                                                                const regex = /^(|\d+)$/ // только целые числа
                                                                if (!value && getFieldValue('dynamic_90_days') && !getFieldValue('dynamic_90_days_to')) {
                                                                    return Promise.reject(new Error(''))
                                                                }
                                                                if (value && !regex.test(value)) {
                                                                    return Promise.reject(new Error(''))
                                                                }
                                                                return Promise.resolve()
                                                            },
                                                        }),
                                                    ]}
                                                >
                                                    <Input
                                                        size='large'
                                                        placeholder={dynamic_90_days === 'Рост' ? 'от 20' : 'от 100'}
                                                        suffix={<>%</>}
                                                        type="number"
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    style={{ margin: 0, width: '100%' }}
                                                    name='dynamic_90_days_to'
                                                    rules={[
                                                        ({ getFieldValue }) => ({
                                                            validator(_, value) {
                                                                const regex = /^(|\d+)$/ // только целые числа
                                                                if (!value && getFieldValue('dynamic_90_days') && !getFieldValue('dynamic_90_days_from')) {
                                                                    return Promise.reject(new Error(''))
                                                                }
                                                                if (value && !regex.test(value)) {
                                                                    return Promise.reject(new Error(''))
                                                                }
                                                                return Promise.resolve()
                                                            },
                                                        }),
                                                    ]}
                                                >
                                                    <Input
                                                        size='large'
                                                        placeholder={dynamic_90_days === 'Рост' ? 'до 100' : 'до 20'}
                                                        suffix={<>%</>}
                                                        type="number"
                                                    />
                                                </Form.Item>
                                            </>
                                        }
                                    </div>
                                </div>
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
                                                        const regex = /^(|\d+)$/ // только целые числа
                                                        if (value && !regex.test(value)) {
                                                            return Promise.reject(new Error(''));
                                                        }
                                                        // if (!value && getFieldValue('frequency_30_days_to')) {
                                                        //     return Promise.reject(new Error(''));
                                                        // }
                                                        return Promise.resolve();
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input
                                                size='large'
                                                placeholder='от'
                                                type="number"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            style={{ margin: 0 }}
                                            name='frequency_30_days_to'
                                            rules={[
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        const regex = /^(|\d+)$/ // только целые числа
                                                        if (value && !regex.test(value)) {
                                                            return Promise.reject(new Error(''));
                                                        }
                                                        // if (!value && getFieldValue('frequency_30_days_from')) {
                                                        //     return Promise.reject(new Error(''));
                                                        // }
                                                        return Promise.resolve();
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input
                                                size='large'
                                                placeholder='до'
                                                type="number"
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
                                                        const regex = /^(|\d+)$/ // только целые числа
                                                        if (value && !regex.test(value)) {
                                                            return Promise.reject(new Error(''));
                                                        }
                                                        // if (!value && getFieldValue('sku_quantity_to')) {
                                                        //     return Promise.reject(new Error(''));
                                                        // }
                                                        return Promise.resolve();
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input
                                                size='large'
                                                placeholder='от'
                                                type="number"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            style={{ margin: 0 }}
                                            name='sku_quantity_to'
                                            rules={[
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        const regex = /^(|\d+)$/ // только целые числа
                                                        if (value && !regex.test(value)) {
                                                            return Promise.reject(new Error(''));
                                                        }
                                                        // if (!value && getFieldValue('sku_quantity_from')) {
                                                        //     return Promise.reject(new Error(''));
                                                        // }
                                                        return Promise.resolve();
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input
                                                size='large'
                                                placeholder='до'
                                                type="number"
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
                                                        const regex = /^(|\d+)$/ // только целые числа
                                                        if (value && !regex.test(value)) {
                                                            return Promise.reject(new Error(''));
                                                        }
                                                        // if (!value && getFieldValue('requests_to_sku_30_days_to')) {
                                                        //     return Promise.reject(new Error(''));
                                                        // }
                                                        return Promise.resolve();
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input
                                                size='large'
                                                placeholder='от'
                                                type="number"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            style={{ margin: 0 }}
                                            name='requests_to_sku_30_days_to'
                                            rules={[
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        const regex = /^(|\d+)$/ // только целые числа
                                                        if (value && !regex.test(value)) {
                                                            return Promise.reject(new Error(''));
                                                        }
                                                        // if (!value && getFieldValue('requests_to_sku_30_days_from')) {
                                                        //     return Promise.reject(new Error(''));
                                                        // }
                                                        return Promise.resolve();
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input
                                                size='large'
                                                placeholder='до'
                                                type="number"
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
                                                fontSize: 14,
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
                                                //maxTagCount='responsive'
                                                //maxTagTextLength={20}
                                                showSearch={false}
                                                mode='multiple'
                                                size='large'
                                                placeholder='Выберите'
                                                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                                tagRender={tagRender}
                                                suffixIcon={
                                                    <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1 1L7 7L13 1" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" />
                                                    </svg>
                                                }
                                                dropdownRender={renderPopup}
                                                options={preferedItemsData.filter(i => i.children.filter(c => c.name.toLowerCase().includes(searchState.toLowerCase())).length > 0).map(_ => {
                                                    return {
                                                        label: <>{_.name}</>,
                                                        title: _.name,
                                                        options: _.children.filter(c => c.name.toLowerCase().includes(searchState.toLowerCase())).map(c => ({ value: c.id, label: c.name }))
                                                    }
                                                })}
                                                maxTagPlaceholder={omittedValues => {
                                                    if (omittedValues.length > 1) {
                                                        return (
                                                            // <p className={styles.form__multiLabel}>Выбрано: {omittedValues.length}</p>
                                                            <>Выбрано: {omittedValues.length}</>
                                                        )
                                                    }
                                                    if (omittedValues.length === 1) {
                                                        let valueName = '';
                                                        preferedItemsData.forEach(_ => {
                                                            const index = _.children.findIndex(c => c.id === omittedValues[0].value);
                                                            if (index !== -1) {
                                                                valueName = _.children[index].name
                                                            }
                                                        })
                                                        return (
                                                            // <p className={styles.form__multiLabel} title={valueName}>{valueName}</p>
                                                            <>{valueName}</>
                                                        )
                                                    }
                                                }}
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
})