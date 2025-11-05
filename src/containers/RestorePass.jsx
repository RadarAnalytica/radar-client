import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../service/AuthContext';
import { URL } from '../service/config';
import { ConfigProvider, Form, Input, Button } from 'antd';
import ErrorModal from '../components/sharedComponents/modals/errorModal/errorModal';
import SuccessModal from '../components/sharedComponents/modals/successModal/successModal';
import styles from './RestorePass.module.css';

const initRequestStatus = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ''
};

const RestorePass = ({ email }) => {
  const [requestState, setRequestState] = useState(initRequestStatus);
  const [form] = Form.useForm()

  const updatePass = async (fields) => {
    const { password, confirmPassword } = fields;
    setRequestState({ ...initRequestStatus, isLoading: true });
    let loc_string = window.location.href;
    try {
      let res = await fetch(`${URL}/api/user/restore_password`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password: password,
          confirm: confirmPassword,
          confirm_code: loc_string.split('/').at(-1)
        }),
      });
      if (!res.ok) {
        res = await res.json();
        return setRequestState({ ...initRequestStatus, isError: true, message: res?.detail && typeof (res.detail) === 'string' ? res.detail : 'Что-то пошло не так :(' });
      }

      //setRequestState({ ...initRequestStatus, isSuccess: true, message: 'Пароль успешно обновлен' });
      window.location.href = `${URL}/signin`;
    } catch {
      setRequestState({ ...initRequestStatus, isError: true, message: 'Возникла ошибка. Поторите попытку' });
    }
  };


  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#6083E7',
          //controlHeightLG: 60,
          colorBorder: '#E0EBFF',
          fontFamily: 'Manrope'
        },
        components: {
          Form: {
            labelColor: '#8F8F8F',
            labelFontSize: 16
          },
          Select: {
            optionFontSize: 14
          }
        }
      }}
    >
      <Form
        form={form}
        scrollToFirstError
        layout='vertical'
        className={styles.form}
      //onFinish={submitHandler}
      >
        <Form.Item
          className={styles.form__item}
          name='password'
          label='Новый пароль *'
          rules={[
            { required: true, message: 'Пожалуйста, заполните это поле!' },
            { min: 6, message: 'Пожалуйста, введите корректный пароль!' },
          ]}
        >
          <Input.Password
            placeholder='Новый пароль'
            size='large'
            className={styles.form__input}
            // disabled={isDemoMode}
            iconRender={(visible) => {
              if (!visible) {
                return (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.5" d="M2 12C2 13.6394 2.42496 14.1915 3.27489 15.2957C4.97196 17.5004 7.81811 20 12 20C16.1819 20 19.028 17.5004 20.7251 15.2957C21.575 14.1915 22 13.6394 22 12C22 10.3606 21.575 9.80853 20.7251 8.70433C19.028 6.49956 16.1819 4 12 4C7.81811 4 4.97196 6.49956 3.27489 8.70433C2.42496 9.80853 2 10.3606 2 12Z" fill="#6083E7" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.25 12C8.25 9.92893 9.92893 8.25 12 8.25C14.0711 8.25 15.75 9.92893 15.75 12C15.75 14.0711 14.0711 15.75 12 15.75C9.92893 15.75 8.25 14.0711 8.25 12ZM9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z" fill="#6083E7" />
                  </svg>

                )
              } else {
                return (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M2.91858 6.60514C2.70062 6.09833 2.11327 5.86373 1.60603 6.08111C1.0984 6.29867 0.863613 6.88739 1.08117 7.39502L1.0816 7.39602L1.08267 7.3985L1.08566 7.40539L1.09505 7.42667C1.10282 7.44415 1.11363 7.46814 1.12752 7.4982C1.15529 7.55832 1.19539 7.64283 1.2481 7.74825C1.35345 7.95894 1.5096 8.25405 1.71879 8.60549C2.12772 9.2925 2.74529 10.2048 3.59029 11.1245L2.79285 11.922C2.40232 12.3125 2.40232 12.9457 2.79285 13.3362C3.18337 13.7267 3.81654 13.7267 4.20706 13.3362L5.04746 12.4958C5.61245 12.952 6.24405 13.3819 6.94417 13.7524L6.16177 14.9549C5.86056 15.4178 5.99165 16.0372 6.45457 16.3384C6.91748 16.6397 7.53693 16.5086 7.83814 16.0456L8.82334 14.5315C9.50014 14.7391 10.2253 14.8869 11 14.9561V16.5003C11 17.0525 11.4477 17.5003 12 17.5003V13.0003C9.25227 13.0003 7.18102 11.8017 5.69633 10.4114C5.68823 10.4036 5.68003 10.3958 5.67173 10.3883C5.47324 10.2014 5.28532 10.011 5.10775 9.81981C4.35439 9.0085 3.80137 8.19404 3.43737 7.58253C3.25594 7.27771 3.12302 7.02595 3.03696 6.85383C2.99397 6.76784 2.96278 6.70196 2.94319 6.65954C2.93339 6.63834 2.92651 6.62302 2.9225 6.61401L2.91858 6.60514ZM1.08117 7.39502L1.99995 7.00026C1.08081 7.39418 1.08117 7.39502 1.08117 7.39502Z" fill="#6083E7" />
                    <path opacity="0.5" d="M15.2209 12.3984C14.2784 12.7694 13.209 13.0002 12 13.0002V17.5002C12.5523 17.5002 13 17.0525 13 16.5002V14.9559C13.772 14.8867 14.4974 14.7392 15.1764 14.5311L16.1618 16.0456C16.463 16.5085 17.0825 16.6396 17.5454 16.3384C18.0083 16.0372 18.1394 15.4177 17.8382 14.9548L17.0558 13.7524C17.757 13.3816 18.3885 12.9517 18.9527 12.496L19.7929 13.3361C20.1834 13.7267 20.8166 13.7267 21.2071 13.3361C21.5976 12.9456 21.5976 12.3124 21.2071 11.9219L20.4097 11.1245C21.1521 10.3164 21.7181 9.51502 22.1207 8.86887C22.384 8.44627 22.5799 8.08609 22.7116 7.82793C22.7775 7.69874 22.8274 7.59476 22.8619 7.5209C22.8791 7.48397 22.8924 7.45453 22.902 7.4332L22.9134 7.40736L22.917 7.39913L22.9191 7.39411C23.1367 6.88648 22.9015 6.2986 22.3939 6.08105C21.8864 5.86355 21.2985 6.09892 21.0809 6.60627L21.0759 6.61747C21.0706 6.62926 21.0617 6.6489 21.0492 6.6758C21.0241 6.72962 20.9844 6.81235 20.9299 6.91928C20.8207 7.13337 20.6526 7.4431 20.4233 7.81119C19.9628 8.55023 19.2652 9.50857 18.3156 10.3999C17.4746 11.1893 16.4469 11.9158 15.2209 12.3984Z" fill="#6083E7" />
                  </svg>

                )
              }
            }}
          />
        </Form.Item>
        <Form.Item
          className={styles.form__item}
          name='confirmPassword'
          label='Подтвердите пароль *'
          dependencies={['password']}
          rules={[
            { required: true, message: 'Пожалуйста, заполните это поле!' },
            { min: 6, message: 'Пожалуйста, введите корректный пароль!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Пароли не совпадают'));
              },
            }),
          ]}
        >
          <Input.Password
            placeholder='Подтвердите пароль'
            size='large'
            className={styles.form__input}
            // disabled={isDemoMode}
            iconRender={(visible) => {
              if (!visible) {
                return (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.5" d="M2 12C2 13.6394 2.42496 14.1915 3.27489 15.2957C4.97196 17.5004 7.81811 20 12 20C16.1819 20 19.028 17.5004 20.7251 15.2957C21.575 14.1915 22 13.6394 22 12C22 10.3606 21.575 9.80853 20.7251 8.70433C19.028 6.49956 16.1819 4 12 4C7.81811 4 4.97196 6.49956 3.27489 8.70433C2.42496 9.80853 2 10.3606 2 12Z" fill="#6083E7" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.25 12C8.25 9.92893 9.92893 8.25 12 8.25C14.0711 8.25 15.75 9.92893 15.75 12C15.75 14.0711 14.0711 15.75 12 15.75C9.92893 15.75 8.25 14.0711 8.25 12ZM9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z" fill="#6083E7" />
                  </svg>

                )
              } else {
                return (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M2.91858 6.60514C2.70062 6.09833 2.11327 5.86373 1.60603 6.08111C1.0984 6.29867 0.863613 6.88739 1.08117 7.39502L1.0816 7.39602L1.08267 7.3985L1.08566 7.40539L1.09505 7.42667C1.10282 7.44415 1.11363 7.46814 1.12752 7.4982C1.15529 7.55832 1.19539 7.64283 1.2481 7.74825C1.35345 7.95894 1.5096 8.25405 1.71879 8.60549C2.12772 9.2925 2.74529 10.2048 3.59029 11.1245L2.79285 11.922C2.40232 12.3125 2.40232 12.9457 2.79285 13.3362C3.18337 13.7267 3.81654 13.7267 4.20706 13.3362L5.04746 12.4958C5.61245 12.952 6.24405 13.3819 6.94417 13.7524L6.16177 14.9549C5.86056 15.4178 5.99165 16.0372 6.45457 16.3384C6.91748 16.6397 7.53693 16.5086 7.83814 16.0456L8.82334 14.5315C9.50014 14.7391 10.2253 14.8869 11 14.9561V16.5003C11 17.0525 11.4477 17.5003 12 17.5003V13.0003C9.25227 13.0003 7.18102 11.8017 5.69633 10.4114C5.68823 10.4036 5.68003 10.3958 5.67173 10.3883C5.47324 10.2014 5.28532 10.011 5.10775 9.81981C4.35439 9.0085 3.80137 8.19404 3.43737 7.58253C3.25594 7.27771 3.12302 7.02595 3.03696 6.85383C2.99397 6.76784 2.96278 6.70196 2.94319 6.65954C2.93339 6.63834 2.92651 6.62302 2.9225 6.61401L2.91858 6.60514ZM1.08117 7.39502L1.99995 7.00026C1.08081 7.39418 1.08117 7.39502 1.08117 7.39502Z" fill="#6083E7" />
                    <path opacity="0.5" d="M15.2209 12.3984C14.2784 12.7694 13.209 13.0002 12 13.0002V17.5002C12.5523 17.5002 13 17.0525 13 16.5002V14.9559C13.772 14.8867 14.4974 14.7392 15.1764 14.5311L16.1618 16.0456C16.463 16.5085 17.0825 16.6396 17.5454 16.3384C18.0083 16.0372 18.1394 15.4177 17.8382 14.9548L17.0558 13.7524C17.757 13.3816 18.3885 12.9517 18.9527 12.496L19.7929 13.3361C20.1834 13.7267 20.8166 13.7267 21.2071 13.3361C21.5976 12.9456 21.5976 12.3124 21.2071 11.9219L20.4097 11.1245C21.1521 10.3164 21.7181 9.51502 22.1207 8.86887C22.384 8.44627 22.5799 8.08609 22.7116 7.82793C22.7775 7.69874 22.8274 7.59476 22.8619 7.5209C22.8791 7.48397 22.8924 7.45453 22.902 7.4332L22.9134 7.40736L22.917 7.39913L22.9191 7.39411C23.1367 6.88648 22.9015 6.2986 22.3939 6.08105C21.8864 5.86355 21.2985 6.09892 21.0809 6.60627L21.0759 6.61747C21.0706 6.62926 21.0617 6.6489 21.0492 6.6758C21.0241 6.72962 20.9844 6.81235 20.9299 6.91928C20.8207 7.13337 20.6526 7.4431 20.4233 7.81119C19.9628 8.55023 19.2652 9.50857 18.3156 10.3999C17.4746 11.1893 16.4469 11.9158 15.2209 12.3984Z" fill="#6083E7" />
                  </svg>

                )
              }
            }}
          />
        </Form.Item>

        <ConfigProvider
          theme={{
            token: {
              //controlHeightLG: 68
            }
          }}
        >
          <Button
            htmlType='submit'
            type='primary'
            size='large'
            className={styles.form__button}
            loading={requestState.isLoading}
            disabled={requestState.isError}
          >
            Обновить
          </Button>
        </ConfigProvider>
        <div className={styles.form__textWrapper}>
          <div className={styles.form__text}>
            Если у вас ещё нет личного кабинета, <Link href='https://radar-analytica.ru/signup' style={{ color: '#6083E7' }}>Зарегистрируйтесь</Link>
          </div>
          <div className={styles.form__text}>
            Вспомнили пароль? <Link href='https://radar-analytica.ru/signin' style={{ color: '#6083E7' }}>Вход</Link>
          </div>
        </div>
      </Form>

      {/* modal */}
      <ErrorModal
        open={requestState.isError}
        onOk={() => setRequestState(initRequestStatus)}
        onCancel={() => setRequestState(initRequestStatus)}
        onClose={() => setRequestState(initRequestStatus)}
        footer={null}
        message={requestState.message}
      />
      {/* <SuccessModal
        open={requestState.isSuccess}
        onOk={() => { location.href = 'https://radar-analytica.ru/signin'; }}
        onClose={() => { location.href = 'https://radar-analytica.ru/signin'; }}
        onCancel={() => { location.href = 'https://radar-analytica.ru/signin'; }}
        footer={null}
        message={'Ссылка на сброс пароля была направлена на Вашу почту'}
      /> */}
    </ConfigProvider>
  )
};

export default RestorePass;
