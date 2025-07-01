import { useState } from 'react'
import styles from './mainFieldset.module.css'
import { Form, ConfigProvider, Input, Tooltip } from 'antd'

const MainFieldset = ({ optionsConfig }) => {

    const [isBodyVisisble, setIsBodyVisible] = useState(true)

    return (
        <fieldset
            className={styles.fieldset}
        >
            <div
                className={styles.fieldset__header}
                id='header'
                onDoubleClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (window.getSelection) {
                        const selection = window.getSelection();
                        if (selection) selection.removeAllRanges();
                    } else if (document.selection) {
                        document.selection.empty();
                    }
                }}
                onClick={e => {
                    // console.log('t', e.target)
                    // console.log('ct', e.currentTarget)
                    // console.log('type', e.type)
                    if (e.currentTarget.id === 'header' && e.type === 'click') {
                        setIsBodyVisible(!isBodyVisisble);
                    }
                }}
            >
                <h3 className={styles.fieldset__title}>Основные</h3>
                <button className={isBodyVisisble ? styles.widget__openButton : `${styles.widget__openButton} ${styles.widget__openButton_closed}`} type='button'>
                    <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 7.5L7 1.5L1 7.5" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>
            </div>

            <div className={styles.fieldset__layout} hidden={!isBodyVisisble}>
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
                            { required: true, message: 'Пожалуйста, заполните это поле!' },
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
                                colorBorder: 'transparent'
                            }
                        }
                    }}
                >
                    {optionsConfig.map((i, id) => {
                        return i.isActive && (
                            <div className={styles.form__complexInputWrapper} key={id}>
                                <label className={styles.form__complexWrapperLabel}>
                                    {i.label}
                                    {i.hasTooltip &&
                                        <ConfigProvider
                                            theme={{
                                                token: {
                                                    colorTextLightSolid: 'black',
                                                }
                                            }}
                                        >
                                            <Tooltip
                                                title={i.tooltipText}
                                                arrow={false}
                                                color='white'
                                            >
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: 10 }}>
                                                    <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="9.25" stroke="black" strokeOpacity="0.1" strokeWidth="1.5" />
                                                    <path d="M9.064 15V7.958H10.338V15H9.064ZM8.952 6.418V5.046H10.464V6.418H8.952Z" fill="#1A1A1A" fillOpacity="0.5" />
                                                </svg>
                                            </Tooltip>
                                        </ConfigProvider>
                                    }
                                </label>
                                <div className={styles.form__inputsContainer}>
                                    <Form.Item
                                        className={styles.form__item}
                                        name={`${i.name}_start`}
                                        rules={[
                                            () => ({
                                                validator(_, value) {
                                                    const regex = /^(|\d+)$/ // только целые числа
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
                                            prefix={<span className={styles.form__inputTextSuffix}>от</span>}
                                            suffix={i.units && <span className={styles.form__inputTextSuffix}>{i.units}</span>}
                                            type="number"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        className={styles.form__item}
                                        name={`${i.name}_end`}
                                        rules={[
                                            () => ({
                                                validator(_, value) {
                                                    const regex = /^(|\d+)$/ // только целые числа
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
                                            prefix={<span className={styles.form__inputTextSuffix}>до</span>}
                                            suffix={i.units && <span className={styles.form__inputTextSuffix}>{i.units}</span>}
                                            type="number"
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                        )
                    })}
                </ConfigProvider>
            </div>
        </fieldset>
    )
}

export default MainFieldset;