import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import AuthContext from '../service/AuthContext'

const InfoForm = () => {

    return (
        <div className='signin-form'>
            <div className='d-flex flex-column align-items-center'>
                <img src={logo} alt="" className='logo' />
                <h1 style={{ fontWeight: 700, fontSize: '24px' }} className='mt-3'>Остался всего один шаг</h1>
            </div>
            <p style={{ fontWeight: 700, fontSize: '16px' }} className='mt-3 text-center'>Отправили письмо с подтверждением на вашу почту, указанную при регистрации</p>
            <div className="mt-3 mb-3" style={{ padding: '1rem', backgroundColor: 'rgba(247, 246, 254, 1)', borderRadius: '1rem' }}>
                <p className='text-left' style={{ fontWeight: 600 }}>
                    После перехода по ссылке в письме вы сможете пользоваться нашим сервисом. Обязательно проверьте папку “Спам”
                </p>
            </div>
            <div>
                <p className='clue-text text-center'>Уже подтвердили аккаунт? <Link className='link' to={'/development/signin'}>Войти</Link></p>
            </div>
        </div>
    )
}

export default InfoForm