import React, { useEffect, useState } from 'react'
import { URL } from '../service/config';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'

const ConfirmationPage = () => {

    const navigate = useNavigate()

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');
    const code = searchParams.get('code');

    useEffect(() => {
        if (email && code) {
            const postData = { email, code };
            axios.post('/api/confirm', postData)
                .then(response => {
                    console.log('Успешно подтверждено', response.data);
                })
                .catch(error => {
                    console.error('Ошибка при подтверждении', error);
                });
        }
    }, [email, code]);

    // const [errorMsg, setErrorMsg] = useState(null)

    // const confirmRegistration = async (state) => {
    //     const res = await fetch(`${URL}/api/user/confirm`, {
    //         method: 'PATCH',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(state)
    //     })
    //     const data = res.json()
    //     return data
    // }

    // useEffect(() => {
    //     const hasKeys = Object.keys(state)?.length > 0
    //     if (hasKeys) {
    //         confirmRegistration(state).then(data => {
    //             if (data) {
    //                 navigate('/signin')
    //             } else {
    //                 setErrorMsg('Ошибка подтвержения регистрации. Повторите попытку.')
    //             }
    //         })
    //     }
    // }, [state])

    return (
        <div className='confirmation-page'>
            {
                <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="loader"></span>
                    <p className="mt-2 text-center" style={{ color: 'black', fontSize: '24px' }}>Поддтвердите регистрацию, пройдя по ссылке, <br />
                        отправленной Вам на почту</p>
                </div>
            }
        </div>
    )
}

export default ConfirmationPage