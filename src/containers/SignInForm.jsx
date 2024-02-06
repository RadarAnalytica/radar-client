import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import InputField from '../components/InputField'
import { Link } from 'react-router-dom'
import AuthContext from '../service/AuthContext'


const SignInForm = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const emailHandler = (e) => {
        setEmail(e.target.value);
    }

    const passHandler = (e) => {
        setPassword(e.target.value);
    }

    const { login } = useContext(AuthContext)


    return (
        <div className='signin-form'>
            <div className='d-flex flex-column align-items-center'>
                <img src={logo} alt="" className='logo' />
                <h1 style={{ fontWeight: 700, fontSize: '24px' }} className='mt-3'>Регистрация</h1>
            </div>
            <div className='fields-container'>
                <InputField
                    type={'text'}
                    placeholder={'Указанный при регистрации'}
                    label={'ФИО'}
                    callback={emailHandler}
                    defautlValue={'test'}
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
            <button className='prime-btn' onClick={() => login(email, password)}>Войти</button>
            <div>
                <p className='clue-text'>Еще нет аккаунта? <Link className='link' to={'/signin'}>Регистрация</Link></p>
            </div>
        </div>
    )
}

export default SignInForm