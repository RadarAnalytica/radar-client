import React, { useContext, useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import InputField from '../components/InputField';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../service/AuthContext';
import { URL } from '../service/config';

const RestorePass = ({ email }) => {
  const [pass, setPass] = useState();
  const [confPass, setConfPass] = useState();
  const [ passInputErrMessage, setPassInputErrMessage ] = useState('')
  const [ confPassInputErrMessage, setConfPassInputErrMessage ] = useState('')

  const handlePass = (e) => setPass(e.target.value);
  const handleConfPass = (e) => setConfPass(e.target.value);
  const navigate = useNavigate();

  const updatePass = async (email, pass) => {
    let loc_string = window.location.href
    try {
      const res = await fetch(`${URL}/api/user/restore_password`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password: pass,
          confirm: pass,
          confirm_code: loc_string.split('/').at(-1)
        }),
      });
      if (!res.ok) {
        alert('Возникла ошибка. Поторите попытку');
        return
      }

      alert('Пароль успешно обновлен');
      window.location.href = `${URL}/signin`
      //const data = await res.json();
      //return data;
    } catch {
      alert('Возникла ошибка. Поторите попытку');
    }
  };

  const handler = async (e) => {
    if (pass?.length < 6) {
      setPassInputErrMessage('Пожалуйста, введите не менеe 6 символов')
    }
    if (pass !== confPass) {
      setConfPassInputErrMessage('Пароли не совпадают')
    }
    if (pass && confPass && pass === confPass && pass?.length >= 6) {
      setPassInputErrMessage('')
      setConfPassInputErrMessage('')
      await updatePass(email, pass)
    } else {
      e.preventDefault();
    }
  };
  localStorage.removeItem('authToken')


  useEffect(() => {
    if (pass?.length < 6) {
      setPassInputErrMessage('Пожалуйста, введите не менеe 6 символов')
    } else {
      setPassInputErrMessage('')
    }
    if (pass === confPass) {
      setConfPassInputErrMessage('')
    }
  }, [pass, confPass])

  return (
    <div className='signin-form'>
      <div className='d-flex flex-column align-items-center'>
        <img src={logo} alt='' className='logo' />
        <h1 style={{ fontWeight: 700, fontSize: '24px' }} className='mt-3'>
          Восстановление пароля
        </h1>
      </div>
      <div className='fields-container'>
        <InputField
          type={'password'}
          placeholder={'Новый пароль'}
          label={'Новый пароль'}
          callback={handlePass}
          required={true}
          hide={true}
          passErrorText={passInputErrMessage}
        />
        <InputField
          type={'password'}
          placeholder={'Подтвердите пароль'}
          label={'Подтвердите пароль'}
          callback={handleConfPass}
          required={true}
          hide={true}
          passErrorText={confPassInputErrMessage}
        />
      </div>
      <button
        className='prime-btn'
        onClick={(e) => handler(e)}
        style={{ height: '7vh', width: '100%' }}
      >
        Обновить
      </button>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button className='link' style={{ marginRight: '20px' }} onClick={() => { window.location.href = `${URL}/signup` }}>Регистрация</button>
        <button className='link' onClick={() => { window.location.href = `${URL}/signin` }}>Вход</button>
      </div>
    </div>
  );
};

export default RestorePass;
