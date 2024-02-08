import React, { useEffect, useState } from 'react'
import { URL } from '../service/config';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'

const ConfirmationPage = () => {

    const navigate = useNavigate()


    const loca = document.location.href
    const array = loca ? loca.split('/') : []

    const reverseArr = array.reverse()


    const email = reverseArr && reverseArr.length ? reverseArr[1] : null
    const code = reverseArr && reverseArr.length ? reverseArr[0] : null

    const [error, setError] = useState()

    console.log(code);

    useEffect(() => {
        if (email && code) {
            const postData = { email, code };
            axios.post(`${URL}/api/confirm`, postData)
                .then(response => {
                    console.log('Успешно подтверждено', response.data);
                    navigate('/signin')
                })
                .catch(error => {
                    console.error('Ошибка при подтверждении', error);
                    setError('Ошибка при подтверждении')
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