import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import InputField from '../components/InputField'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../service/AuthContext'
import { URL } from '../service/config'

const RestorePass = ({ email }) => {

    const [pass, setPass] = useState()
    const [confPass, setConfPass] = useState()

    const handlePass = (e) => setPass(e.target.value)
    const handleConfPass = (e) => setConfPass(e.target.value)
    const navigate = useNavigate()

    const updatePass = async (email, pass) => {
        const res = await fetch(`${URL}/api/user/restore_password`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password: pass,
                confirm: pass
            })
        })
        const data = await res.json()
        return data
    }

    const handler = (e) => {
        if (pass && confPass && (pass === confPass)) {
            updatePass(email, pass).then(data => {
                console.log(data);
                if (data) {
                    alert('Пароль успешно обновлен!')
                    navigate('/signin')
                } else {
                    alert('Возникла ошибка. Поторите попытку')
                }
            }).then(data => {
                alert('Пароль успешно обновлен')
                navigate('/signin')
            })
        }
        else {
            e.preventDefault()
        }
    }

    return (
        <div className='signin-form'>
            <div className='d-flex flex-column align-items-center'>
                <img src={logo} alt="" className='logo' />
                <h1 style={{ fontWeight: 700, fontSize: '24px' }} className='mt-3'>Восстановление пароля</h1>
            </div>
            <div className='fields-container'>
                <InputField
                    type={'password'}
                    placeholder={'Новый пароль'}
                    label={'Новый пароль'}
                    callback={handlePass}
                    required={true}
                />
                <InputField
                    type={'password'}
                    placeholder={'Подтвердите пароль'}
                    label={'Подтвердите пароль'}
                    callback={handleConfPass}
                    required={true}
                />
            </div>
            <button className='prime-btn' onClick={(e) => handler(e)} style={{ height: '7vh', width: '100%' }}>Обновить</button>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <p className='clue-text'>
                    <Link className='link' to={'/signup'} style={{ marginRight: '20px' }}>Регистрация</Link>
                    <Link className='link' to={'/signin'}>Вход</Link></p>
            </div>
        </div>
    )
}

export default RestorePass