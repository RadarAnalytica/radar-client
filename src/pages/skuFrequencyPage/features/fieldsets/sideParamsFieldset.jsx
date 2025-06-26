import { useState } from 'react'
import styles from './sideParamsFieldset.module.css'
import { Form, ConfigProvider, Input } from 'antd'
import { sideOptionsConfig } from '../../shared'

const SideParamsFieldset = () => {
    const [isBodyVisisble, setIsBodyVisible] = useState(false)

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
                <h3 className={styles.fieldset__title}>Дополнительные параметры</h3>
                <button className={isBodyVisisble ? styles.widget__openButton : `${styles.widget__openButton} ${styles.widget__openButton_closed}`}>
                    <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 7.5L7 1.5L1 7.5" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>
            </div>
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
                <div className={styles.widget__body} hidden={!isBodyVisisble}>
                    {sideOptionsConfig.map((_, id) => {
                        const layoutStyles = _.isWideLayout ? `${styles.fieldset__layout} ${styles.fieldset__layout_5cols}` : `${styles.fieldset__layout} ${styles.fieldset__layout_3cols}`;

                        return (
                            <div className={styles.fieldset__block} key={id}>
                                {_.title && <p className={styles.fieldset__title}>{_.title}</p>}
                                <div className={layoutStyles} key={id}>
                                    {_.options.map((i, id) => {
                                        const itemStyles = i.isWide ? `${styles.form__complexInputWrapper} ${styles.form__complexInputWrapper_wide}` : styles.form__complexInputWrapper;
                                        return (
                                            <div className={itemStyles} key={id}>
                                                <label className={styles.form__complexWrapperLabel}>{i.label}</label>
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
                                                            placeholder='от'
                                                        //prefix={<span className={styles.form__inputTextSuffix}>от</span>}
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
                                                            placeholder='до'
                                                        //prefix={<span className={styles.form__inputTextSuffix}>до</span>}
                                                        />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>

            </ConfigProvider>
        </fieldset>
    )
}

export default SideParamsFieldset;