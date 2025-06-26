import { useMemo, useState } from 'react'
import styles from './dynamicFieldset.module.css'
import { Form, ConfigProvider, Input, Select } from 'antd'

const dynamicOptions = [
    { value: 'Рост' },
    { value: 'Падение' },
]

const DynamicFieldset = ({ form }) => {

    const [isBodyVisisble, setIsBodyVisible] = useState(false)

    const dynamic_30_days = Form.useWatch('dynamic_30_days', form)
    const dynamic_60_days = Form.useWatch('dynamic_60_days', form)
    const dynamic_90_days = Form.useWatch('dynamic_90_days', form)

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
    }), [])

    return (
        <fieldset
            className={styles.fieldset}
        >
            <div
                className={styles.fieldset__header}
                id='header'
                onClick={e => {
                    if (e.target.id !== 'header') {
                        return;
                    }
                    setIsBodyVisible(!isBodyVisisble);
                }}
            >
                <h3 className={styles.fieldset__title}>Динамика популярности и роста запросов</h3>
                <button className={isBodyVisisble ? styles.widget__openButton : `${styles.widget__openButton} ${styles.widget__openButton_closed}`}>
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
                        <label className={styles.form__doubledLabel}>От даты отсчета за 30 дней, %</label>
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
                                            placeholder={'от 20'}
                                            suffix={<>%</>}
                                            type="number"
                                            style={{ height: '44px' }}
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
                                            placeholder={'до 100'}
                                            suffix={<>%</>}
                                            type="number"
                                            style={{ height: '44px' }}
                                        />
                                    </Form.Item>
                                </>
                            }
                        </div>
                    </div>

                    {/*------------------------------------- 60 days -------------------------------------------*/}

                    <div className={styles.form__dynamicSelectBlock}>
                        <label className={styles.form__doubledLabel}>От даты отсчета за 60 дней, %</label>
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
                                                    //return Promise.reject(new Error(''));
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input
                                            size='large'
                                            className={isExampleDataSet ? styles.form__exampleDataInput : ''}
                                            style={{ height: '44px' }}
                                            placeholder={'от 20'}
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
                                            style={{ height: '44px' }}
                                            placeholder={'до 100'}
                                            suffix={<>%</>}
                                            type="number"
                                        />
                                    </Form.Item>
                                </>
                            }
                        </div>
                    </div>

                    {/*------------------------------------- 90 days -------------------------------------------*/}

                    <div className={styles.form__dynamicSelectBlock}>
                        <label className={styles.form__doubledLabel}>От даты отсчета за 90 дней, %</label>
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
                                            style={{ height: '44px' }}
                                            placeholder={'от 20'}
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
                                            style={{ height: '44px' }}
                                            placeholder={'до 100'}
                                            suffix={<>%</>}
                                            type="number"
                                        />
                                    </Form.Item>
                                </>
                            }
                        </div>
                    </div>
                </ConfigProvider>
            </div>
        </fieldset>
    )
}

export default DynamicFieldset;