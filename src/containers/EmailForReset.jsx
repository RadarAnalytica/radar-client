import React, { useContext, useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import InputField from '../components/InputField'
import { Link, useNavigate } from 'react-router-dom'
import { URL } from '../service/config'

const EmailForReset = () => {

    const [email, setEmail] = useState()
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
    const [emailErrorText, setEmailErrorText] = useState()
    const emailHandler = (e) => {
        const { value } = e.target;
        setEmail(value);

        if (!value) {
            setEmailErrorText('Пожалуйста, заполните это поле!')
            setIsSubmitDisabled(true)
            return
        }
        if (!isValidEmail(value)) {
            setEmailErrorText('Пожалуйста, введите корректный Email')
            setIsSubmitDisabled(true)
            return
        }
        setEmailErrorText('')
        setIsSubmitDisabled(false)
    }

    const requestLink = async (email) => {
        localStorage.removeItem("authToken")
        const res = await fetch(`${URL}/api/user/reset`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email
            })
        })
        const data = await res.json()
        return data
    }


    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    return (
        <div className='signin-form'>
            <div className='d-flex flex-column align-items-center'>
                <Link to={`${URL}`}>
                    <img src={logo} alt="" className='logo' />
                </Link>
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
                disabled={isSubmitDisabled}
                onClick={() => {
                    alert('Сыылка на сброс пароля была направлена на Вашу почту')
                    email ? requestLink(email).then(data => {
                       window.location.href = `${URL}/signin`
                    }) : console.log();
                }}

            >Получить ссылку</button>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <p className='clue-text'>
                    <button className='link' style={{ marginRight: '20px' }} onClick={() => {window.location.href = `${URL}/signup`}}>Регистрация</button>
                    <button className='link' onClick={() => {window.location.href = `${URL}/signin`}}>Вход</button>
                </p>
            </div>
        </div>
    )
}

export default EmailForReset