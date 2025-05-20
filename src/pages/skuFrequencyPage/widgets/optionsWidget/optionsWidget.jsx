import { useEffect } from 'react'
import styles from './optionsWidget.module.css'
import { useAppSelector } from '../../../../redux/hooks'
import { Form, ConfigProvider, Input, Select, Button } from 'antd'
import { optionsConfig } from '../../shared'


const OptionsWidget = () => {

    const [simpleForm] = Form.useForm();
    const [complexForm] = Form.useForm();


    const { skuFrequencyMode } = useAppSelector(store => store.filters) // 'Простой' | 'Продвинутый'

    return (
        <section className={styles.widget}>
            {/* ---------------------------- Простой фильтр опций -------------------------------*/}
            {skuFrequencyMode === 'Простой' &&
                <Form
                    className={`${styles.form} ${styles.form_simpleLayout}`}
                    scrollToFirstError
                    layout='vertical'
                    //onFinish={submitHandler}
                    form={simpleForm}
                    //onFieldsChange={onFieldsChanged}
                    initialValues={{
                        // product_price: 3000,
                        // product_cost: 1000,
                        // isSPP: false,
                        // isHeavy: false,
                        // is_paid_cargo_acceptance: false,
                        // storage_price: 'daily',
                        // tax_state: 'УСН-доходы',
                        // tax_rate: 6,
                        // defective_percentage: 2,
                        // equiring_fee: 1,
                        // package_length: 10,
                        // package_width: 10,
                        // package_height: 10,
                        // PackageType: 'Короб'
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
                            components: {
                                Select: {
                                    activeBorderColor: '#5329FF',
                                    hoverBorderColor: '#d9d9d9'
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
                    //onFinish={submitHandler}
                    form={complexForm}
                    //onFieldsChange={onFieldsChanged}
                    initialValues={{
                        // product_price: 3000,
                        // product_cost: 1000,
                        // isSPP: false,
                        // isHeavy: false,
                        // is_paid_cargo_acceptance: false,
                        // storage_price: 'daily',
                        // tax_state: 'УСН-доходы',
                        // tax_rate: 6,
                        // defective_percentage: 2,
                        // equiring_fee: 1,
                        // package_length: 10,
                        // package_width: 10,
                        // package_height: 10,
                        // PackageType: 'Короб'
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
                            return (
                                <div className={styles.form__complexInputWrapper} key={id}>
                                    <label className={styles.form__complexWrapperLabel}>{i.label}</label>
                                    <div className={styles.form__inputsContainer}>
                                        <Form.Item
                                            className={styles.form__item}
                                            name={`${i.name}From`}
                                        >
                                            <Input
                                                size='large'
                                                prefix={<span className={styles.form__inputTextSuffix}>от</span>}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            className={styles.form__item}
                                            name={`${i.name}To`}
                                        >
                                            <Input
                                                size='large'
                                                prefix={<span className={styles.form__inputTextSuffix}>до</span>}
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