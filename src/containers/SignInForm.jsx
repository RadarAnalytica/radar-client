import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import InputField from '../components/InputField'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../service/AuthContext'


const SignInForm = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const emailHandler = (e) => {
        setEmail(e.target.value);
    }

    const navigate = useNavigate()

    const passHandler = (e) => {
        setPassword(e.target.value);
    }

    const { login } = useContext(AuthContext)


    return (
        <div className='signin-form'>
            <div className='d-flex flex-column align-items-center'>
                <img src={logo} alt="" className='logo' />
                <h1 style={{ fontWeight: 700, fontSize: '24px' }} className='mt-3'>Вход</h1>
            </div>
            <div className='fields-container'>
                <InputField
                    type={'email'}
                    placeholder={'Указанный при регистрации'}
                    label={'Email'}
                    callback={emailHandler}
                    required={true}
                />
                <InputField
                    type={'password'}
                    placeholder={'Введите пароль'}
                    label={'Пароль'}
                    callback={passHandler}
                    required={true}
                />
            </div>
            <div className="mb-2 mt-2" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p className="clue-text"
                    style={{ cursor: 'pointer' }}
                    onClick={() => { navigate('/development/reset') }}
                >
                    Забыли пароль?
                </p>
            </div>
            <button className='prime-btn' onClick={() => login(email, password)}>Войти</button>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <p className='clue-text'>Еще нет аккаунта? <Link className='link' to={'/development/signup'}>Регистрация</Link></p>
            </div>
        </div>
    )
}

export default SignInForm