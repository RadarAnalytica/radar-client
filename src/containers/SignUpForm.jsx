import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import InputField from '../components/InputField'
import SelectField from '../components/SelectField'
import { Link, useNavigate } from 'react-router-dom'
import { ServiceFunctions } from '../service/serviceFunctions'

const SignUpForm = () => {

    const navigate = useNavigate()

    const [name, setName] = useState()
    const [regData, setRegData] = useState({
        firstName: null,
        lastName: null,
        patronym: null,
        phone: null,
        stage: '',
        email: null,
        password: null,
        promoCode: null
    })

    const nameHandler = (e) => {
        setName(e.target.value)
    }

    const getPhone = (e) => {
        setRegData({ ...regData, phone: e.target.value })
    }

    const getEmail = (e) => {
        setRegData({ ...regData, email: e.target.value })
    }

    const getStage = (e) => {
        setRegData({ ...regData, stage: 'test' })
    }

    const getPass = (e) => {
        setRegData({ ...regData, password: e.target.value })
    }

    const getPromo = (e) => {
        setRegData({ ...regData, promoCode: e.target.value })
    }

    useEffect(() => {
        let firstName = name?.split(' ')[0]
        let lastName = name?.split(' ')[1]
        let patronym = name?.split(' ')[2]
        setRegData({ ...regData, firstName, lastName, patronym })
    }, [name])

    const sumbitHandler = (e, obj) => {
        const nullable = Object.values(obj)?.filter(item => item === null)
        if (!obj || nullable?.length > 1) {
            e.preventDefault()
        }
        else {
            ServiceFunctions.register(obj).then(data => {
                localStorage.setItem('authToken', JSON.stringify(data))
                if (!data) {
                    navigate('/confirmation')
                }
                else {
                    navigate('/dashboard')
                }
            })
        }
    }

    return (
        <div className='signup-form'>
            <div className='d-flex flex-column align-items-center'>
                <img src={logo} alt="" className='logo' />
                <h1 style={{ fontWeight: 700, fontSize: '24px' }} className='mt-3'>Регистрация</h1>
            </div>
            <div className='fields-container'>
                <InputField
                    type={'text'}
                    placeholder={'Фамилия Имя Отчество'}
                    label={'ФИО'}
                    callback={nameHandler}
                    defautlValue={'test'}
                    required={true}
                />
                <SelectField
                    options={[]}
                    label={'На каком этапе вы находитесь?'}
                    defautlValue={'На каком этапе вы находитесь?'}
                    callback={getStage}
                />
                <InputField
                    type={'text'}
                    placeholder={'+7'}
                    label={'Номер телефона'}
                    callback={getPhone}
                    defautlValue={'test'}
                    required={true}
                />
                <InputField
                    type={'text'}
                    placeholder={'На него придет подтвеждение'}
                    label={'Email'}
                    callback={getEmail}
                    defautlValue={'test'}
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
                <p className='clue-text'>Уже есть аккаунт? <Link className='link' to={'/signin'}>Войти</Link></p>
            </div>
            <div className="text-center">
                <p className='m-0 p-0 clue-text'>
                    Нажимая кнопку “Зарегистрироваться”, вы соглашаетесь с Пользовательским соглашением и Политикой
                    конфиденциальности
                </p>
            </div>
        </div>
    )
}

export default SignUpForm