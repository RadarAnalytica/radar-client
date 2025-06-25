import { useEffect } from 'react'
import styles from './optionsWidget.module.css'
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks'
import { Form, ConfigProvider, Input, Select, Button } from 'antd'
import { complexRequestObjectGenerator } from '../../shared'
import { actions as requestsMonitoringActions } from '../../../../redux/requestsMonitoring/requestsMonitoringSlice'


const competitionLevelValues = [
    {value: 1, label: 'Легко'},
    {value: 2, label: 'Средне'},
    {value: 3, label: 'Сложно'},
    {value: 4, label: 'Очень сложно'},
]

const priceValues = [
    {value: JSON.stringify({start: 1, end: 500}), label: '1 - 500 ₽'},
    {value: JSON.stringify({start: 500, end: 1500}), label: '500 - 1500 ₽'},
    {value: JSON.stringify({start: 1500, end: 3000}), label: '1500 - 3000 ₽'},
    {value: JSON.stringify({start: 3000, end: 3500}), label: '3000 - 3500 ₽'},
    {value: JSON.stringify({start: 3500, end: 5500}), label: '3500 - 5500 ₽'},
    {value: JSON.stringify({start: 5500, end: 8500}), label: '5500 - 8500 ₽'},
    {value: JSON.stringify({start: 8500, end: 0}), label: '8500 ₽ +'},
]


const OptionsWidget = () => {
    const dispatch = useAppDispatch()
    const [simpleForm] = Form.useForm();
    const [complexForm] = Form.useForm();
    const { skuFrequencyMode } = useAppSelector(store => store.filters) // 'Простой' | 'Продвинутый'
    const { optionsConfig } = useAppSelector(store => store.requestsMonitoring) // 'Простой' | 'Продвинутый'


    const simpleFormSubmitHandler = (fields) => {
        const requestObject = {
            query: fields.query,
            price: JSON.parse(fields.preferedProductPrice),
            competition_level: fields.competitionLevel
        }
        dispatch(requestsMonitoringActions.setRequestObject({data: requestObject, formType: 'easy'}))
    }

    const complexFormSubmitHandler = (fields) => {
        const requestObject = complexRequestObjectGenerator(fields);
        dispatch(requestsMonitoringActions.setRequestObject({data: requestObject, formType: 'complex'}))
    }


    return (
        <section className={styles.widget}>
            {/* ---------------------------- Простой фильтр опций -------------------------------*/}
            {skuFrequencyMode === 'Простой' &&
                <Form
                    className={`${styles.form} ${styles.form_simpleLayout}`}
                    scrollToFirstError
                    layout='vertical'
                    onFinish={simpleFormSubmitHandler}
                    form={simpleForm}
                    initialValues={{
                        competitionLevel: 2,
                        preferedProductPrice: JSON.stringify({start: 500, end: 1500})
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
                            className={styles.form__item}
                            label='Содержит поисковый запрос'
                            name='query'
                            rules={[
                                { required: true, message: 'Пожалуйста, заполните это поле!' }
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
                            label='На сколько тяжело конкурировать?'
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
                            >
                                Применить
                            </Button>
                        </ConfigProvider>
                    </div>
                </Form>
            }
            {/* --------------------------Продвинутый фильтр опций ------------------------------*/}
            {skuFrequencyMode === 'Продвинутый' &&
                <Form
                    className={`${styles.form} ${styles.form_complexLayout}`}
                    scrollToFirstError
                    layout='vertical'
                    onFinish={complexFormSubmitHandler}
                    form={complexForm}
                //initialValues={{}}
                >
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: '#5329FF',
                                colorBorder: '#5329FF',
                                fontFamily: 'Mulish'
                            },
                            components: {
                                Input: {}
                            }
                        }}
                    >
                        <Form.Item
                            className={`${styles.form__item} ${styles.form__item_wide}`}
                            label='Содержит поисковый запрос'
                            name='query'
                            rules={[
                                { required: true, message: 'Пожалуйста, заполните это поле!' }
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
                                colorPrimary: '#d9d9d9',
                            },
                            components: {
                                Input: {
                                    activeBorderColor: '#d9d9d9',
                                    hoverBorderColor: '#d9d9d9',
                                }
                            }
                        }}
                    >
                        {optionsConfig.map((i, id) => {
                            return i.isActive && (
                                <div className={styles.form__complexInputWrapper} key={id}>
                                    <label className={styles.form__complexWrapperLabel}>{i.label}</label>
                                    <div className={styles.form__inputsContainer}>
                                        <Form.Item
                                            className={styles.form__item}
                                            name={`${i.name}_start`}
                                        >
                                            <Input
                                                size='large'
                                                placeholder='от'
                                                //prefix={<span className={styles.form__inputTextSuffix}>от</span>}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            className={styles.form__item}
                                            name={`${i.name}_end`}
                                        >
                                            <Input
                                                size='large'
                                                  placeholder='до'
                                                //prefix={<span className={styles.form__inputTextSuffix}>до</span>}
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                            )
                        })}
                    </ConfigProvider>
                    <div className={`${styles.form__submitWrapper} ${styles.form__submitWrapper_complex}`}>
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
                            >
                                Применить
                            </Button>
                        </ConfigProvider>
                    </div>
                </Form>
            }
            {/* -------------------------------------------------------------------------------- */}
        </section>
    )
}

export default OptionsWidget