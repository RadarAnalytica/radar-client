import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import InputField from '../components/InputField'
import SelectField from '../components/SelectField'
import { Link, useNavigate } from 'react-router-dom'
import { ServiceFunctions } from '../service/serviceFunctions'
import InfoForm from './InfoForm'
import CustomSelect from '../components/CustomSelect'

import Modal from 'react-bootstrap/Modal';

const SignUpForm = () => {

    const navigate = useNavigate()

    const options = [
        'Хочу продавать на маркетплейсах',
        'Хочу стать менеджером маркетплейсов',
        'Действующий менеджер маркетплейсов',
        'Предприниматель. Уже продаю на маркетплейсах'
    ]

    const [name, setName] = useState()
    const [regData, setRegData] = useState({
        firstName: null,
        lastName: null,
        patronym: null,
        phone: '',
        stage: options[0],
        email: null,
        password: null,
        promoCode: null,
        confirmed: false,
        isOnboarded: false
    })

    const nameHandler = (e) => {
        setName(e.target.value)
    }

    const getPhone = (e) => {
        let value = e.target.value;
        value = value.replace(/\D/g, '');
        // Форматируем номер, добавляя "+7" в начале и разделяя группы цифр
        if (value.length > 1) {
            value = value.replace(/^(\+7|\+8)/, '+7'); // Убираем 8 в начале и заменяем его на +7
            let formattedValue = '+7';
            if (value.length > 1) {
                formattedValue += '-' + value.slice(1, 2);
            }
            if (value.length > 2) {
                formattedValue += value.slice(2, 4);
            }
            if (value.length > 4) {
                formattedValue += '-' + value.slice(4, 7);
            }
            if (value.length > 7) {
                formattedValue += '-' + value.slice(7, 9);
            }
            if (value.length > 9) {
                formattedValue += '-' + value.slice(9);
            }
            value = formattedValue;
        }
        // Устанавливаем отформатированное значение в поле
        setRegData({ ...regData, phone: value });
    }

    const getEmail = (e) => {
        setRegData({ ...regData, email: e.target.value })
    }

    const getStage = (e) => {
        setRegData({ ...regData, stage: e.target.value })
    }

    const getPass = (e) => {
        setRegData({ ...regData, password: `${e.target.value}` })
    }

    const [sent, setSent] = useState(false)

    useEffect(() => {
        let firstName = name?.split(' ')[0]
        let lastName = name?.split(' ')[1]
        let patronym = name?.split(' ')[2]
        setRegData({ ...regData, firstName, lastName, patronym })
    }, [name])

    const [show, setShow] = useState(false);
    const [error, setError] = useState('')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const sumbitHandler = (e, obj) => {
        const nullable = Object.values(obj)?.filter(item => item === null)
        if (!obj || nullable?.length > 1 || !isValidEmail(obj.email)) {
            e.preventDefault()
            setError('Введите корректное значение для всех полей')
            setShow(true)
        }
        else {
            ServiceFunctions.register(obj).then(data => {
                if (!data) {
                    setSent(!sent)
                }
                else if (data && data.success === false) {
                    setError(data.message)
                    setShow(true)
                }
                else {
                    navigate('/development/dashboard')
                }
            })
        }
    }


    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const warningIcon = require('../assets/warning.png')

    return (
        sent ?
            <InfoForm />
            :
            <div className='signup-form'>
                <div className='d-flex flex-column align-items-center'>
                    <img src={logo} alt="" className='logo' />
                    <h1 style={{ fontWeight: 700, fontSize: '24px' }} className='mt-2 mb-1'>Регистрация</h1>
                </div>
                <div className='fields-container'>
                    <InputField
                        type={'text'}
                        placeholder={'Фамилия Имя Отчество'}
                        label={'ФИО'}
                        callback={nameHandler}
                    />
                    <CustomSelect
                        options={options}
                        label={'На каком этапе вы находитесь?'}
                        defautlValue={'На каком этапе вы находитесь?'}
                        callback={getStage}
                    />
                    <InputField
                        type={'tel'}
                        placeholder={'+7'}
                        label={'Номер телефона'}
                        callback={getPhone}
                        value={regData.phone}
                    />
                    <InputField
                        type={'text'}
                        placeholder={'На него придет подтвеждение'}
                        label={'Email'}
                        callback={getEmail}
                        required={true}
                    />
                    <InputField
                        type={'password'}
                        placeholder={'Минимум 6 символов'}
                        label={'Пароль'}
                        callback={getPass}
                        hide={true}
                        maxLength={40}
                    />
                </div>
                <button className='prime-btn' onClick={e => sumbitHandler(e, regData)} style={{ width: '100%', height: '7vh' }}>Зарегистрироваться</button>
                <div>
                    <p className='clue-text mb-2 mt-2'>Уже есть аккаунт? <Link className='link' to={'/development/signin'}>Войти</Link></p>
                </div>
                <div className="text-center mb-0 pb-0">
                    <p className='m-0 p-0 clue-text' style={{ fontSize: '1.75vh' }}>
                        Нажимая кнопку “Зарегистрироваться”, вы соглашаетесь с <span className="fw-bold" style={{ textDecoration: 'underline', }}>Пользовательским соглашением</span> и <span className="fw-bold" style={{ textDecoration: 'underline', }}>Политикой конфиденциальности</span>
                    </p>
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

export default SignUpForm