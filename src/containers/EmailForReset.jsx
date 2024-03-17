import React, { useContext, useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import InputField from '../components/InputField'
import { Link, useNavigate } from 'react-router-dom'
import { URL } from '../service/config'

const EmailForReset = () => {

    const [email, setEmail] = useState()

    const emailHandler = (e) => {
        setEmail(e.target.value);
    }

    const requestLink = async (email) => {
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

    const navigate = useNavigate()

    const [emailErrorText, setEmailErrorText] = useState()

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    useEffect(() => {
        if (email && !isValidEmail(email)) {
            setEmailErrorText('Введите корректный Email')
        }
        else {
            setEmailErrorText()
        }
    }, [email])

    return (
        <div className='signin-form'>
            <div className='d-flex flex-column align-items-center'>
                <img src={logo} alt="" className='logo' />
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
                style={{ height: '7vh', width: '100%' }}
                onClick={() => {
                    alert('Сыылка на сброс пароля была направлена на Вашу почту')
                    email ? requestLink(email).then(data => {
                        navigate('/development/signin')
                    }) : console.log();
                }}

            >Получить ссылку</button>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <p className='clue-text'>
                    <Link className='link' style={{ marginRight: '20px' }} to={'/development/signup'}>Регистрация</Link>
                    <Link className='link' to={'/development/signin'}>Вход</Link>
                </p>
            </div>
        </div>
    )
}

export default EmailForReset