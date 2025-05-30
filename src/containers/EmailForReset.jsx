import React, { useContext, useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import InputField from '../components/InputField'
import { Link, useNavigate } from 'react-router-dom'
import { URL } from '../service/config'

const EmailForReset = () => {

    const [email, setEmail] = useState()

    const emailHandler = (e) => {
        console.log('emailHandler')
        setEmail(e.target.value);
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

    const submitHandler = () => {
        if (!isValidEmail(email)){
            setEmailErrorText('Введите корректный Email')
            return
        }
        
        requestLink(email).then(data => {
            window.location.href = `${URL}/signin`
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
                    label={'Email'}
                    callback={emailHandler}
                    required={true}
                    emailErrorText={emailErrorText}
                />
            </div>
            <button className='prime-btn'
                style={{ height: '7vh', width: '100%' }}
                onClick={submitHandler}
                // onClick={() => {
                //     email && alert('Сcылка на сброс пароля была направлена на Вашу почту')
                //     email ? requestLink(email).then(data => {
                //        window.location.href = `${URL}/signin`
                //     }) : console.log();
                // }}

            >Получить ссылку</button>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <p className='clue-text'>
                    <button className='link' style={{ marginRight: '20px' }} onClick={() => {window.location.href = `${URL}/signup`}}>Регистрация</button>
                    <button className='link' onClick={() => {window.location.href = `${URL}/signin`}}>Вход</button>
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
                onOk={() => {setRequestState(initRequestStatus); navigate(`/signin`)}}
                onClose={() => {setRequestState(initRequestStatus); navigate(`/signin`)}}
                onCancel={() => {setRequestState(initRequestStatus); navigate(`/signin`)}}
                footer={null}
                message={'Ссылка на сброс пароля была направлена на Вашу почту'}
            />
        </div>
    )
}

export default EmailForReset