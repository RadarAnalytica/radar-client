import React, { useEffect, useState } from 'react'
import RestorePass from '../containers/RestorePass'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ResetPage = () => {

    const navigate = useNavigate()


    const loca = document.location.href
    const array = loca ? loca.split('/') : []
    const reverseArr = array.reverse()

    const email = reverseArr && reverseArr.length ? reverseArr[1] : null
    const code = reverseArr && reverseArr.length ? reverseArr[0] : null

    const [confirmed, setConfirmed] = useState(false)

    useEffect(() => {
        if (email && code) {
            const postData = { email, code };

            axios.patch(`${URL}/api/user/confirm-reset`, postData)
                .then(response => {
                    console.log('Успешно подтверждено', response.data);
                    setConfirmed(true)
                })
                .catch(error => {
                    console.error('Ошибка при подтверждении', error);
                });
        }
    }, [email, code]);

    return (
        <div className='confirmation-page'>
            {
                <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    {
                        confirmed ?
                            <RestorePass email={email} />
                            : null
                    }
                </div>
            }
        </div>
    )
}

export default ResetPage