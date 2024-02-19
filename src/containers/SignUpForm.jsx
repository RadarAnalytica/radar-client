import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import InputField from '../components/InputField'
import SelectField from '../components/SelectField'
import { Link, useNavigate } from 'react-router-dom'
import { ServiceFunctions } from '../service/serviceFunctions'
import InfoForm from './InfoForm'

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
        phone: null,
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
        const phoneNumber = e.target.value.replace(/\D/g, '');
        // Проверяем, не превышает ли длина номера 10 символов
        if (phoneNumber.length <= 10) {
            // Форматируем номер, добавляя "+7" в начале и разделяя группы цифр
            const formattedPhoneNumber = `+7${phoneNumber.slice(-10, -7)}-${phoneNumber.slice(-7, -4)}-${phoneNumber.slice(-4)}`;

            // Устанавливаем отформатированное значение в поле
            setRegData({ ...regData, phone: formattedPhoneNumber });
        }
    }

    const getEmail = (e) => {
        setRegData({ ...regData, email: e.target.value })
    }

    const getStage = (e) => {
        setRegData({ ...regData, stage: e.target.value })
    }

    const getPass = (e) => {
        setRegData({ ...regData, password: e.target.value })
    }

    const getPromo = (e) => {
        setRegData({ ...regData, promoCode: e.target.value })
    }

    const [sent, setSent] = useState(false)

    useEffect(() => {
        let firstName = name?.split(' ')[0]
        let lastName = name?.split(' ')[1]
        let patronym = name?.split(' ')[2]
        setRegData({ ...regData, firstName, lastName, patronym })
    }, [name])

    const sumbitHandler = (e, obj) => {
        const nullable = Object.values(obj)?.filter(item => item === null)
        if (!obj || nullable?.length > 1 || !isValidEmail(obj.email)) {
            e.preventDefault()
            alert('Пожалуйста, заполните все поля правильно.');
        }
        else {
            ServiceFunctions.register(obj).then(data => {
                if (!data) {
                    alert('Подтвердите регистрацию по ссылке, высланной Вам на почте')
                    // navigate('/development/signin')
                    setSent(!sent)
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
                        required={true}
                    />
                    <SelectField
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
                        required={true}
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
                        required={true}
                    />
                    <InputField
                        type={'text'}
                        placeholder={'Промокод'}
                        label={'Промокод'}
                        callback={getPromo}
                    />
                </div>
                <button className='prime-btn' onClick={e => sumbitHandler(e, regData)}>Зарегистрироваться</button>
                <div>
                    <p className='clue-text mb-1'>Уже есть аккаунт? <Link className='link' to={'/development/signin'}>Войти</Link></p>
                </div>
                <div className="text-center">
                    <p className='m-0 p-0 clue-text' style={{ fontSize: '1.75vh' }}>
                        Нажимая кнопку “Зарегистрироваться”, вы соглашаетесь с <span className="fw-bold" style={{ textDecoration: 'underline', }}>Пользовательским соглашением</span> и <span className="fw-bold" style={{ textDecoration: 'underline', }}>Политикой конфиденциальности</span>
                    </p>
                </div>
            </div>
    )
}

export default SignUpForm