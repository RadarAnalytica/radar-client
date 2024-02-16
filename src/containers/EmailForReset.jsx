import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import InputField from '../components/InputField'
import { Link } from 'react-router-dom'
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
    }

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
                    label={'ФИО'}
                    callback={emailHandler}
                    required={true}
                />
            </div>
            <button className='prime-btn' onClick={() => { email ? requestLink(email) : console.log(); }}>Получить ссылку</button>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <p className='clue-text'>
                    <Link className='link' to={'/development/signup'}>Регистрация</Link>
                    <Link className='link' to={'/development/signin'}>Вход</Link>
                </p>
            </div>
        </div>
    )
}

export default EmailForReset