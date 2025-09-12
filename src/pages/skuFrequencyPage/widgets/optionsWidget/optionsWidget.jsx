import { useState, useEffect } from 'react'
import styles from './optionsWidget.module.css'
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks'
import { Form, ConfigProvider, Input, Select, Button, Tooltip } from 'antd'
import { complexRequestObjectGenerator } from '../../shared'
import { actions as requestsMonitoringActions } from '../../../../redux/requestsMonitoring/requestsMonitoringSlice'
import { MainFieldset, SubjectFieldset, QualityFieldset, SideParamsFieldset, DynamicFieldset } from '../../features'


const competitionLevelValues = [
    { value: 4, label: 'Легко' },
    { value: 3, label: 'Средне' },
    { value: 2, label: 'Сложно' },
    { value: 1, label: 'Очень сложно' },
]

const priceValues = [
    { value: JSON.stringify({ start: 1, end: 500 }), label: '1 - 500 ₽' },
    { value: JSON.stringify({ start: 500, end: 1500 }), label: '500 - 1500 ₽' },
    { value: JSON.stringify({ start: 1500, end: 3000 }), label: '1500 - 3000 ₽' },
    { value: JSON.stringify({ start: 3000, end: 3500 }), label: '3000 - 3500 ₽' },
    { value: JSON.stringify({ start: 3500, end: 5500 }), label: '3500 - 5500 ₽' },
    { value: JSON.stringify({ start: 5500, end: 8500 }), label: '5500 - 8500 ₽' },
    { value: JSON.stringify({ start: 8500, end: 0 }), label: '8500 ₽ +' },
]


const OptionsWidget = () => {
    const dispatch = useAppDispatch()
    const [simpleForm] = Form.useForm();
    const [complexForm] = Form.useForm();
    const { skuFrequencyMode } = useAppSelector(store => store.filters) // 'Простой' | 'Продвинутый'
    const { optionsConfig, requestObject, isLoadingForButton } = useAppSelector(store => store.requestsMonitoring)
    const { isSidebarHidden } = useAppSelector((state) => state.utils);
    const prefered_items = Form.useWatch('prefered_items', complexForm)
    const [isBodyVisisble, setIsBodyVisible] = useState(true)


    const simpleFormSubmitHandler = (fields) => {
        console.log('submit simple')
        const requestObject = {
            query: fields.query,
            avg_price_total: JSON.parse(fields.preferedProductPrice),
            competition_level: fields.competitionLevel,
            sorting: undefined
            // sorting: {
            //     sort_field: "niche_rating",
            //     sort_order: "DESC"
            // }
        }
        dispatch(requestsMonitoringActions.setRequestObject({ data: requestObject, formType: 'easy' }))
        //resetTableConfig()
    }

    const complexFormSubmitHandler = (fields) => {
        const requestObject = complexRequestObjectGenerator(fields);
        dispatch(requestsMonitoringActions.setRequestObject({ data: requestObject, formType: 'complex' }))
    }

    useEffect(() => {
        if (skuFrequencyMode === 'Простой') {
            simpleForm.submit()
        }
        if (skuFrequencyMode === 'Продвинутый') {

            complexForm.validateFields()
                .then(() => {
                    complexForm.submit()
                })
                .catch((errorInfo) => {
                    const values = complexForm.getFieldsValue()
                    complexFormSubmitHandler(values)
                })
        }
    }, [skuFrequencyMode, complexForm, simpleForm, isBodyVisisble])

    useEffect(() => {
        complexForm.setFieldValue('frequency_30_start', 6000)
        complexForm.setFieldValue('freq_per_good_start', 2)
        complexForm.setFieldValue('dynamic_30_days', 'Рост')
        complexForm.setFieldValue('dynamic_30_days_from', 100)
    }, [])

    return (
        <section className={styles.widget}>
            <div className={!isBodyVisisble ? `${styles.widget__header} ${styles.widget__header_noGap}` : styles.widget__header}>
                <div
                    className={styles.widget__titleWrapper}
                    style={{ cursor: skuFrequencyMode === 'Продвинутый' ? 'pointer' : '' }}
                    onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        // console.log('t', e.target)
                        // console.log('ct', e.currentTarget)
                        // console.log('type', e.type)
                        if (skuFrequencyMode === 'Продвинутый') {
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
                    <h2 className={styles.widget__title}>Параметры</h2>
                    {skuFrequencyMode === 'Продвинутый' &&
                        <button className={isBodyVisisble ? styles.widget__openButton : `${styles.widget__openButton} ${styles.widget__openButton_closed}`}>
                            <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 7.5L7 1.5L1 7.5" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>
                    }
                </div>
                {skuFrequencyMode === 'Продвинутый' && requestObject &&
                    <div className={styles.widget__summaryBlock}>
                        {/* {Object.keys(requestObject).map(_ => {
                            return (
                                <div className={styles.widget__summaryItem}>

                                </div>
                            )
                        })} */}
                    </div>
                }
            </div>
            <ConfigProvider
                theme={{
                    token: {
                        fontFamily: 'Mulish'
                    },
                    components: {
                        Form: {
                            labelFontSize: 16
                        },
                    }
                }}
            >
                {/* ---------------------------- Простой фильтр опций -------------------------------*/}
                {skuFrequencyMode === 'Простой' &&
                    <Form
                        className={isSidebarHidden ? styles.form__simpleLayout : `${styles.form__simpleLayout} ${styles.form__simpleLayout_menuOpen}`}
                        scrollToFirstError
                        layout='vertical'
                        onFinish={simpleFormSubmitHandler}
                        form={simpleForm}
                        initialValues={{
                            competitionLevel: 3,
                            preferedProductPrice: JSON.stringify({ start: 500, end: 1500 })
                        }}
                    >
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: '#5329FF',
                                    colorBorder: '#5329FF'
                                },
                                components: {
                                    Input: {}
                                }
                            }}
                        >
                            <Form.Item
                                className={`${styles.form__item} ${styles.form__item_mid}`}
                                label='Содержит поисковый запрос'
                                name='query'
                                rules={[
                                    //{ required: true, message: 'Пожалуйста, заполните это поле!' }
                                ]}
                            >
                                <Input
                                    prefix={
                                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.37598 0C14.5538 0.000222652 18.751 4.19813 18.751 9.37598C18.7509 11.6947 17.9064 13.8146 16.5117 15.4512L20.5439 19.4834L19.4834 20.5439L15.4512 16.5117C13.8146 17.9064 11.6947 18.7509 9.37598 18.751C4.19813 18.751 0.000222647 14.5538 0 9.37598C0 4.198 4.198 0 9.37598 0ZM9.37598 1.5C5.02642 1.5 1.5 5.02642 1.5 9.37598C1.50022 13.7253 5.02656 17.251 9.37598 17.251C13.7252 17.2508 17.2508 13.7252 17.251 9.37598C17.251 5.02656 13.7253 1.50022 9.37598 1.5Z" fill="#5329FF" fillOpacity="0.5" />
                                        </svg>

                                    }
                                    placeholder='Введите поисковый запрос'
                                    size='large'
                                />
                            </Form.Item>
                        </ConfigProvider>
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: '#5329FF',
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
                                className={styles.form__item}
                                label='Желаемая цена товара'
                                name='preferedProductPrice'
                            >
                                <Select
                                    placeholder='Выберите цену'
                                    size='large'
                                    options={priceValues}
                                    suffixIcon={
                                        <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1.27197L7 7.27197L13 1.27197" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    }
                                />
                            </Form.Item>
                            <Form.Item
                                className={styles.form__item}
                                label={
                                    <>
                                        {'Насколько тяжело конкурировать?'}
                                        <ConfigProvider
                                            theme={{
                                                token: {
                                                    colorTextLightSolid: 'black',
                                                }
                                            }}
                                        >
                                            <Tooltip
                                                title='Комплексный показатель, который учитывает коэффициент спроса, монопольность, рекламу и другие параметры.'
                                                arrow={false}
                                                color='white'
                                            >
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: 10, cursor: 'pointer' }}>
                                                    <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="9.25" stroke="black" strokeOpacity="0.1" strokeWidth="1.5" />
                                                    <path d="M9.064 15V7.958H10.338V15H9.064ZM8.952 6.418V5.046H10.464V6.418H8.952Z" fill="#1A1A1A" fillOpacity="0.5" />
                                                </svg>
                                            </Tooltip>
                                        </ConfigProvider>
                                    </>
                                }
                                name='competitionLevel'
                            >
                                <Select
                                    placeholder='Выберите уровень конкуренции'
                                    size='large'
                                    options={competitionLevelValues}
                                    suffixIcon={
                                        <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1.27197L7 7.27197L13 1.27197" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    }
                                />
                            </Form.Item>
                        </ConfigProvider>
                        <div className={`${styles.form__submitWrapper} ${styles.form__submitWrapper_simple}`}>
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
                                    onClick={() => simpleForm.resetFields()}
                                    type='text'
                                    size='large'
                                    style={{ height: 45, width: 112 }}
                                >
                                    Очистить
                                </Button>
                            </ConfigProvider>
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorPrimary: '#5329FF'
                                    }
                                }}
                            >
                                <Button
                                    htmlType='submit'
                                    type='primary'
                                    size='large'
                                    style={{ height: 45, minWidth: 112 }}
                                    loading={isLoadingForButton}
                                >
                                    Применить
                                </Button>
                            </ConfigProvider>
                        </div>
                    </Form>
                }
                {/* --------------------------Продвинутый фильтр опций ------------------------------*/}
                {skuFrequencyMode === 'Продвинутый' && isBodyVisisble &&
                    <div className={styles.widget__body}>
                        <Form
                            className={`${styles.form} ${styles.form_complexForm}`}
                            scrollToFirstError={{ behavior: 'smooth', block: 'center' }}
                            layout='vertical'
                            onFinish={complexFormSubmitHandler}
                            form={complexForm}
                            initialValues={{
                                //frequency_30_start: 6000,
                                // freq_per_good_start: 2,
                                // dynamic_30_days: 'Рост',
                                // dynamic_30_days_from: 100,
                                prefered_items: [],
                                niche_rating: [],
                                dynamic_30_days: 'Изменение',
                                dynamic_60_days: 'Изменение',
                                dynamic_90_days: 'Изменение',
                            }}
                        >
                            <MainFieldset optionsConfig={optionsConfig} form={complexForm} />
                            <DynamicFieldset form={complexForm} />
                            <SubjectFieldset prefered_items={prefered_items} form={complexForm} />
                            <QualityFieldset />
                            <SideParamsFieldset />

                            {/* submit */}
                            <div className={styles.form__submitWrapper}>
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
                                        onClick={() => complexForm.resetFields()}
                                        style={{ height: 45, width: 112 }}
                                    >
                                        Очистить
                                    </Button>
                                </ConfigProvider>
                                <ConfigProvider
                                    theme={{
                                        token: {
                                            colorPrimary: '#5329FF'
                                        }
                                    }}
                                >
                                    <Button
                                        htmlType='submit'
                                        type='primary'
                                        size='large'
                                        style={{ height: 45, minWidth: 112 }}
                                        loading={isLoadingForButton}
                                    >
                                        Применить
                                    </Button>
                                </ConfigProvider>
                            </div>
                        </Form>
                    </div>
                }
            </ConfigProvider>
            {/* -------------------------------------------------------------------------------- */}
        </section>
    )
}

export default OptionsWidget