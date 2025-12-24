import { useState } from 'react';
import styles from './mainFieldset.module.css';
import { Form, ConfigProvider, Input, Tooltip } from 'antd';

const MainFieldset = ({ optionsConfig, form }) => {

    const [isBodyVisisble, setIsBodyVisible] = useState(true);


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
                <h3
                    className={styles.fieldset__title}
                >
                    Основные
                </h3>
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
                            colorBgContainer: 'white',
                            colorBorder: '#5329FF1A',
                            borderRadius: 8,
                            fontFamily: 'Manrope',
                            fontSize: 12,
                            fontWeight: 500,
                        },
                        components: {
                            Input: {
                                activeBorderColor: '#5329FF1A',
                                hoverBorderColor: '#5329FF1A',
                                activeOutlineColor: 'transparent',
                                activeShadow: 'transparent',
                                controlHeight: 38,
                                controlHeightLG: 38,
                            },
                        }
                    }}
                >

                    <Form.Item
                        className={`${styles.form__item} ${styles.form__item_wide}`}
                        label='Содержит поисковый запрос'
                        name='query'
                        rules={[
                            //{ required: true, message: 'Пожалуйста, заполните это поле!' },
                        ]}
                    >
                        <Input
                            prefix={
                                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.37598 0C14.5538 0.000222652 18.751 4.19813 18.751 9.37598C18.7509 11.6947 17.9064 13.8146 16.5117 15.4512L20.5439 19.4834L19.4834 20.5439L15.4512 16.5117C13.8146 17.9064 11.6947 18.7509 9.37598 18.751C4.19813 18.751 0.000222647 14.5538 0 9.37598C0 4.198 4.198 0 9.37598 0ZM9.37598 1.5C5.02642 1.5 1.5 5.02642 1.5 9.37598C1.50022 13.7253 5.02656 17.251 9.37598 17.251C13.7252 17.2508 17.2508 13.7252 17.251 9.37598C17.251 5.02656 13.7253 1.50022 9.37598 1.5Z" fill="#5329FF1A" fillOpacity="1" />
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
                            colorBgContainer: 'white',
                            colorBorder: '#5329FF1A',
                            borderRadius: 8,
                            fontFamily: 'Manrope',
                            fontSize: 12,
                            fontWeight: 500,
                        },
                        components: {
                            Input: {
                                activeBorderColor: '#5329FF1A',
                                hoverBorderColor: '#5329FF1A',
                                activeOutlineColor: 'transparent',
                                activeShadow: 'transparent',
                                controlHeight: 38,
                                controlHeightLG: 38,
                            },
                        }
                    }}
                >
                    {optionsConfig.map((i, id) => {
                        return i.isActive && (
                            <FormItemBlock key={id} i={i} />
                        );
                    })}
                </ConfigProvider>
            </div>
        </fieldset>
    );
};

const FormItemBlock = ({ i }) => {

    const [errorState, setErrorState] = useState({ fromInput: '', toInput: '' });

    return (
        <div className={styles.form__complexInputWrapper}>
            <label className={i.hasTooltip ? `${styles.form__complexWrapperLabel} ${styles.form__complexWrapperLabel_lowMargin}` : styles.form__complexWrapperLabel}>
                <span style={{ color: errorState.fromInput || errorState.toInput ? '#F93C65' : '#1A1A1A', fontSize: 12 }}>{i.label}</span>
                {i.hasTooltip &&
                    <ConfigProvider
                        theme={{
                            token: {
                                colorTextLightSolid: 'black',
                                fontSize: 12
                            }
                        }}
                    >
                        <Tooltip
                            title={i.tooltipText}
                            arrow={false}
                            color='white'
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: 10, cursor: 'pointer' }}>
                                <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="9.25" stroke="black" strokeOpacity="0.1" strokeWidth="1.5" />
                                <path d="M9.064 15V7.958H10.338V15H9.064ZM8.952 6.418V5.046H10.464V6.418H8.952Z" fill="#1A1A1A" fillOpacity="0.5" />
                            </svg>
                        </Tooltip>
                    </ConfigProvider>
                }
            </label>
            <div className={styles.form__inputsContainer}>
                <ConfigProvider
                    theme={{
                        token: {
                            colorTextLightSolid: '#F93C65',
                        }
                    }}
                >
                    <Tooltip
                        title={errorState.fromInput}
                        color='white'
                        open={errorState.fromInput}
                    >
                        <Form.Item
                            className={styles.form__item}
                            name={`${i.name}_start`}
                            normalize={(value) => {
                                // Удаляем все символы кроме цифр, точки и минуса
                                return value ? value.replace(/[^0-9.-]/g, '') : value;
                            }}
                            rules={[
                                () => ({
                                    validator(_, value) {

                                        if (i.name === 'freq_per_good') {
                                            const regex = /^-?\d*\.?\d*$/; // только целые и дробные числа
                                            if (value && !regex.test(value)) {
                                                return Promise.reject(new Error(''));
                                            }
                                        } else {
                                            const regex = /^(|\d+)$/; // только целые числа
                                            if (value && !regex.test(value)) {
                                                return Promise.reject(new Error(''));
                                            }
                                        }


                                        if (i.units === '%' && value && value.trim()) {
                                            const int = parseInt(value);
                                            if (int && typeof int === 'number' && (int < 0 || int > 100)) {
                                                setErrorState({ ...errorState, fromInput: 'Пожалуйста, введите значения от 0 до 100!' });
                                                return Promise.reject(new Error(''));
                                            }
                                        }

                                        setErrorState({ ...errorState, fromInput: '' });
                                        return Promise.resolve();
                                    },
                                }),
                            ]}
                        >
                            <Input
                                size='large'
                                prefix={<span className={styles.form__inputTextSuffix}>от</span>}
                                suffix={i.units && <span className={styles.form__inputTextSuffix}>{i.units}</span>}
                            />
                        </Form.Item>
                    </Tooltip>
                </ConfigProvider>
                <ConfigProvider
                    theme={{
                        token: {
                            colorTextLightSolid: '#F93C65',
                        }
                    }}
                >
                    <Tooltip
                        title={errorState.toInput}
                        color='white'
                        open={errorState.toInput}
                    >
                        <Form.Item
                            className={styles.form__item}
                            name={`${i.name}_end`}
                            normalize={(value) => {
                                // Удаляем все символы кроме цифр, точки и минуса
                                return value ? value.replace(/[^0-9.-]/g, '') : value;
                            }}
                            rules={[
                                () => ({
                                    validator(_, value) {

                                        if (i.name === 'freq_per_good') {
                                            const regex = /^-?\d*\.?\d*$/; // только целые и дробные числа
                                            if (value && !regex.test(value)) {
                                                return Promise.reject(new Error(''));
                                            }
                                        } else {
                                            const regex = /^(|\d+)$/; // только целые числа
                                            if (value && !regex.test(value)) {
                                                return Promise.reject(new Error(''));
                                            }
                                        }
                                        if (i.units === '%' && value && value.trim()) {
                                            const int = parseInt(value);
                                            if (int && typeof int === 'number' && (int < 0 || int > 100)) {
                                                setErrorState({ ...errorState, toInput: 'Пожалуйста, введите значения от 0 до 100!' });
                                                return Promise.reject(new Error(''));
                                            }
                                        }
                                        setErrorState({ ...errorState, toInput: '' });
                                        return Promise.resolve();
                                    },
                                }),
                            ]}
                        >
                            <Input
                                size='large'
                                prefix={<span className={styles.form__inputTextSuffix}>до</span>}
                                suffix={i.units && <span className={styles.form__inputTextSuffix}>{i.units}</span>}
                            />
                        </Form.Item>
                    </Tooltip>
                </ConfigProvider>
            </div>
        </div>
    );
};

export default MainFieldset;
