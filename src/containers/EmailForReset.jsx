import React, { useContext, useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import InputField from '../components/InputField'
import { Link, useNavigate } from 'react-router-dom'
import { URL } from '../service/config'
import ErrorModal from '../components/sharedComponents/modals/errorModal/errorModal'
import SuccessModal from '../components/sharedComponents/modals/successModal/successModal'

const initRequestStatus = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

const EmailForReset = () => {

    const [email, setEmail] = useState()
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
    const [emailErrorText, setEmailErrorText] = useState()
    const [requestState, setRequestState] = useState(initRequestStatus)

    const navigate = useNavigate()

    const emailHandler = (e) => {
        const { value } = e.target;
        setEmail(value);
        if (!value) {
            setEmailErrorText('Пожалуйста, заполните это поле!')
            setIsSubmitDisabled(true)
            return
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            setEmailErrorText('Пожалуйста, введите корректный Email')
            setIsSubmitDisabled(true)
            return
        }
        setEmailErrorText('')
        setIsSubmitDisabled(false)
    }

    const submitHandler = async () => {
        setRequestState({ ...initRequestStatus, isLoading: true })        
        
        try {
            let res = await fetch(`${URL}/api/user/reset`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ email })
            })

            if (!res.ok) {
                res = await res.json()
                return setRequestState({ ...initRequestStatus, isError: true, message: res?.detail && typeof (res.detail) === 'string' ? res.detail : 'Что-то пошло не так :(' })
            }
            setRequestState({...initRequestStatus, isSuccess: true, message: 'success'})
            setEmail('')
        } catch (e) {
            console.log(e)
            setRequestState({ ...initRequestStatus, isError: true, message: res.detail || 'Что-то пошло не так :(' })
        }
    }

    return (
        <div className='signin-form'>
            <div className='d-flex flex-column align-items-center'>
                <a href={`${URL}`}>
                    <img src={logo} alt="" className='logo' />
                </a>
                <h1 style={{ fontWeight: 700, fontSize: '24px' }} className='mt-3'>Восстановление пароля</h1>
            </div>
            <div className='fields-container'>
                <InputField
                    type={'text'}
                    placeholder={'Указанный при регистрации'}
                    label={'Email'}
                    callback={emailHandler}
                    required={true}
                    emailErrorText={emailErrorText}
                />
            </div>
            <button className='prime-btn'
                style={{ height: '7vh', width: '100%', background: isSubmitDisabled && '#E8E8E8' }}
                disabled={isSubmitDisabled || requestState.isLoading}
                onClick={submitHandler}
            >Получить ссылку</button>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <p className='clue-text'>
                    <button className='link' style={{ marginRight: '20px' }} onClick={() => { window.location.href = `${URL}/signup` }}>Регистрация</button>
                    <button className='link' onClick={() => { window.location.href = `${URL}/signin` }}>Вход</button>
                </p>
            </div>

            <ErrorModal
                open={requestState.isError}
                onOk={() => setRequestState(initRequestStatus)}
                onCancel={() => setRequestState(initRequestStatus)}
                onClose={() => setRequestState(initRequestStatus)}
                footer={null}
                message={requestState.message}
            />
            <SuccessModal
                open={requestState.isSuccess}
                onOk={() => { location.href = '/signin' }}
                onClose={() => { location.href = '/signin' }}
                onCancel={() => { location.href = '/signin' }}
                footer={null}
                message={'Ссылка на сброс пароля была направлена на Вашу почту'}
            />
        </div>
    )
}

export default EmailForReset