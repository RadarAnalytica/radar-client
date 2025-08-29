import { useState, useEffect } from 'react'
import styles from './contactForm.module.css'
import { Form, ConfigProvider, Input, Button, Checkbox } from 'antd'
import { Link } from 'react-router-dom'
import { URL } from '../../../../../service/config'

const initRequestStatusObject = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

const sendFormDataFunc = async (
    initRequestStatus,
    setRequestStatus,
    url,
    fields,
) => {
    setRequestStatus({ ...initRequestStatus, isLoading: true})

    try {

        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(fields)
        })

        if (!res.ok) {
            setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось отправить данные формы' })
            return
        }

        setRequestStatus({ ...initRequestStatus, isSuccess: true, message: 'Данные успешно отправлены!' })
        res = await res.json()
        return res

    } catch (e) {
        setRequestStatus({ ...initRequestStatus, isError: true, message: 'Не удалось отправить данные формы' })
        console.error(e)
    }
}



const phoneFormatter = (value) => {
    if (!value) return '+7'
    if (value.length > 0) {
        const formattedValue = '+' + value.slice(0, 1) + ' ' + value.slice(1, 4) + ' ' + value.slice(4, 7) + ' ' + value.slice(7, 9) + ' ' + value.slice(9, 11)
        return formattedValue.trim()
    }
};



export const ContactForm = () => {
    const [requestStatus, setRequestStatus] = useState(initRequestStatusObject)
    const [form] = Form.useForm()

    const submitHandler = (fields) => {
        sendFormDataFunc(initRequestStatusObject, setRequestStatus, `${URL}/api/common/landing/consult`, fields)
    }

    // сбрасываем статус запроса
    useEffect(() => {
        let timeout;

        if (requestStatus.isError || requestStatus.isSuccess) {
            if (requestStatus.isSuccess) {
                form.resetFields()
            }
            timeout = setTimeout(() => {
                setRequestStatus(initRequestStatusObject)
            }, 2000)
        }

        return () => {
            if (timeout) {
                clearTimeout(timeout)
            }
        }
    }, [requestStatus])

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#6083E7',
                    controlHeightLG: 48,
                    colorBorder: '#E0EBFF'
                }
            }}
        >
            <Form
                form={form}
                layout='vertical'
                className={styles.form}
                onFinish={submitHandler}
                initialValues={{
                    message: ''
                }}
            >
                <Form.Item
                    name='name'
                    className={styles.form__item}
                    rules={[
                        { required: true, message: 'Пожалуйста, заполните это поле!' },
                        { min: 2, message: 'Пожалуйста, введите не менее 2 символов!' },
                        () => ({
                            validator(_, value) {
                                if (value && !value.trim()) {
                                    return Promise.reject(new Error('Пожалуйста, заполните поле корректно!'));
                                }
                                return Promise.resolve();
                            },
                        })
                    ]}
                >
                    <Input
                        size='large'
                        placeholder='Имя*'
                        className={styles.form__input}
                    />
                </Form.Item>
                <div className={styles.form__itemWrapper}>
                    <Form.Item
                        name='phone'
                        className={styles.form__item}
                        rules={[
                            { required: true, message: 'Пожалуйста, заполните это поле!' },
                            { min: 16, message: 'Пожалуйста, введите корректный номер телефона' },
                            { max: 16, message: 'Пожалуйста, введите корректный номер телефона' },
                        ]}
                        normalize={(value) => {
                            const transformedValue = phoneFormatter(value.replace(/\D/g, '').trim())
                            return transformedValue
                        }}
                    >
                        <Input
                            size='large'
                            placeholder='Телефон*'
                            className={styles.form__input}
                        />
                    </Form.Item>
                    <Form.Item
                        name='email'
                        className={styles.form__item}
                        rules={[
                            { required: true, message: 'Пожалуйста, заполните это поле!' },
                            { type: 'email', message: 'Пожалуйста, введите корректный email!' }
                        ]}
                    >
                        <Input
                            size='large'
                            placeholder='E-mail*'
                            className={styles.form__input}
                        />
                    </Form.Item>
                </div>
                <Form.Item
                    name='message'
                    className={styles.form__item}
                    rules={[
                        {max: 500, message: 'Пожалуйста, введите не более 500 символов!'}
                    ]}
                >
                    <Input.TextArea
                        rows={3}
                        autoSize={{ minRows: 3, maxRows: 3 }}
                        size='large'
                        placeholder='Введите сообщение'
                    />
                </Form.Item>
                <ConfigProvider
                    theme={{
                        token: {
                            controlHeightLG: 68
                        }
                    }}
                >
                    <Button
                        type='primary'
                        size='large'
                        className={styles.form__button}
                        loading={requestStatus.isLoading}
                        htmlType='submit'
                    >
                        Отправить
                    </Button>
                </ConfigProvider>
                <Form.Item
                    className={styles.form__item}
                    style={{margin: 0, padding: 0}}
                    name='policy'
                    valuePropName='checked'
                    rules={[
                        {
                            validator: (_, value) => {
                                if (value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Пожалуйста, ознакомьтесь с нашей политикой обработки данных'));
                            }
                        }
                    ]}
                >
                    <Checkbox
                    >
                        <div className={styles.form__text} style={{ marginLeft: 10 }}>
                            Я соглашаюсь с <Link style={{ color: '#6083E7' }} to={`${URL}/offer`}>Договором публичной оферты </Link>и <Link style={{ color: '#6083E7' }} to={`${URL}/politics`}>Политикой конфиденциальности</Link>
                        </div>
                    </Checkbox>
                </Form.Item>
                {requestStatus.isError &&
                    <div className={`${styles.form__status} ${styles.form__status_error}`}>
                        {requestStatus.message}
                    </div>
                }
                {requestStatus.isSuccess &&
                    <div className={`${styles.form__status} ${styles.form__status_success}`}>
                        {requestStatus.message}
                    </div>
                }
            </Form>
        </ConfigProvider>
    )
}
