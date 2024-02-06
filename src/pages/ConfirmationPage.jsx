import React, { useEffect, useState } from 'react'
import { URL } from '../service/config';
import { useNavigate } from 'react-router-dom';

const ConfirmationPage = () => {

    const navigate = useNavigate()

    const [state, setState] = useState({})
    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = {}
        for (const [key, value] of urlSearchParams) {
            params[key] = value
        }
        setState(params)
    }, [])

    const [errorMsg, setErrorMsg] = useState(null)

    const confirmRegistration = async (state) => {
        const res = await fetch(`${URL}/api/user/confirm`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(state)
        })
        const data = res.json()
        return data
    }

    useEffect(() => {
        const hasKeys = Object.keys(state)?.length > 0
        if (hasKeys) {
            confirmRegistration(state).then(data => {
                if (data) {
                    navigate('/signin')
                } else {
                    setErrorMsg('Ошибка подтвержения регистрации. Повторите попытку.')
                }
            })
        }
    }, [state])

    return (
        <div className='confirmation-page'>
            {
                !errorMsg ?
                    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <span className="loader"></span>
                        <p className="mt-2 text-center" style={{ color: 'black', fontSize: '24px' }}>Поддтвердите регистрацию, пройдя по ссылке, <br />
                            отправленной Вам на почту</p>
                    </div>
                    :
                    <div>
                        <p>{errorMsg}</p>
                    </div>
            }
        </div>
    )
}

export default ConfirmationPage