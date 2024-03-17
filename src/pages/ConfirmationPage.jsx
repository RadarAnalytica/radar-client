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

    useEffect(() => {
        if (email && code) {
            const postData = { email, code };

            axios.patch(`${URL}/api/user/confirm`, postData)
                .then(response => {
                    if (response.status === 200) {
                        console.log('Успешно подтверждено', response.data);
                        navigate('/development/signin')
                    }
                })
                .catch(error => {
                    alert(error.message)
                    console.error('Ошибка при подтверждении', error);
                });
        }
    }, [email, code]);

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