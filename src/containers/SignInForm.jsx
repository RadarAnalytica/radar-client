import React, { useContext, useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import InputField from '../components/InputField'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../service/AuthContext'

import Modal from 'react-bootstrap/Modal';


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

    const [show, setShow] = useState(false);
    const [error, setError] = useState('')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [emailErrorText, setEmailErrorText] = useState()
    const [passErrorText, setPassErrorText] = useState()

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    useEffect(() => {
        if (email && !isValidEmail(email)) {
            setEmailErrorText('Введите корректный Email')
        }
        else if (password && password.length < 6) {
            setPassErrorText("Пароль должен быть не короче 6 символов")
        }
        else {
            setEmailErrorText()
            setPassErrorText()
        }
    }, [email, password])

    const handleSubmit = (e) => {
        if (!email || !password) {
            e.preventDefault()
            setError('Введите корректное значение для всех полей')
            setShow(true)
        }
        else {
            login(email, password, setError, setShow)
        }
    }

    const warningIcon = require('../assets/warning.png')

    return (
        <div className='signin-form'>
            <div className='d-flex flex-column align-items-center'>
                <img src={logo} alt="" className='logo' />
                <h1 style={{ fontWeight: 700, fontSize: '24px' }} className='mt-3'>Вход в аккаунт</h1>
                <p className="clue-text mb-0" style={{ fontSize: '2vh' }}>Проще не бывает</p>
            </div>
            <div className='fields-container'>
                <InputField
                    type={'email'}
                    placeholder={'Указанный при регистрации'}
                    label={'Email'}
                    callback={emailHandler}
                    emailErrorText={emailErrorText}
                    subtext={'Обещаем не слать рекламу и звонить только по делу'}
                // required={true}
                />
                <InputField
                    type={'password'}
                    placeholder={'Введите пароль'}
                    label={'Пароль'}
                    callback={passHandler}
                    passErrorText={passErrorText}
                    hide={true}
                // required={true}
                />
            </div>
            <div className="mb-0 mt-1" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p className="clue-text"
                    style={{ cursor: 'pointer' }}
                    onClick={() => { navigate('/development/reset') }}
                >
                    Забыли пароль?
                </p>
            </div>
            <button className='prime-btn mt-0 mb-3' onClick={handleSubmit} style={{ height: '7vh' }}>Войти</button>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <p className='clue-text mb-0'>Еще нет аккаунта? <Link className='link' to={'/development/signup'}>Регистрация</Link></p>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <div>
                        <div className='d-flex gap-3 mb-2 mt-2 align-items-center'>
                            <img src={warningIcon} alt="" style={{ height: '3vh' }} />
                            <p className="fw-bold mb-0">Ошибка!</p>
                        </div>
                        <p className='fs-6 mb-1' style={{ fontWeight: 600 }}>
                            {error}
                        </p>
                    </div>
                </Modal.Header>
            </Modal>
        </div>
    )
}

export default SignInForm