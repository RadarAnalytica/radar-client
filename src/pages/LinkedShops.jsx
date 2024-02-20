import React, { useContext, useEffect, useState } from 'react'
import SideNav from '../components/SideNav'
import TopNav from '../components/TopNav'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../service/AuthContext'
import wblogo from '../assets/wblogo.png'
import redcircle from '../assets/redcircle.png'
import greencircle from '../assets/greencircle.png'
import { URL } from '../service/config'

const LinkedShops = () => {

    const { user, authToken } = useContext(AuthContext)

    const navigate = useNavigate()

    const status = user && user.stage && user.stage?.indexOf('Предприниматель') >= 0 ? "ИП" : user && user.stage?.indexOf('Менеджер') >= 0 ||
        user && user.stage?.indexOf('менеджер') >= 0 ?
        'Менеджер' : null

    const getTokenExp = async (user) => {
        const res = await fetch(`${URL}/api/user/exp/${user.id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + authToken
            }
        })
        const data = await res.json()
        return data
    }

    const [data, setData] = useState()
    useEffect(() => {
        if (user) {
            getTokenExp(user).then(data => setData(data))
        }
    }, [])

    const [expDate, setExpDate] = useState()
    useEffect(() => {
        if (data) setExpDate(new Date(data.exp * 1000).toLocaleDateString())
    }, [data])

    const active = expDate && new Date(expDate).getTime() > new Date().getTime()

    return (
        <div className='linked-shops-page'>
            <SideNav />
            <div className="linked-shops-content">
                <TopNav title={'Подключенные магазины'} />

                <div className="container d-flex" style={{ padding: '24px', gap: '20px' }}>
                    <div className="linked-shop-block col">
                        <div className="d-flex justify-content-between">
                            <div>
                                <p className='p-0 m-0' style={{ fontWeight: 700, fontSize: 24 }}>
                                    {user && `${status ? status : ''} ${user.firstName} ${user.lastName} ${user.patronym ? user.patronym : ''}`}
                                </p>
                                <p className="clue-text p-0 m-0">Последнее обновление {new Date(user?.updatedAt).toLocaleDateString() || null}</p>
                            </div>
                            <div>
                                <img src={wblogo} alt="" />
                            </div>
                        </div>
                        <div className='user-tokens'>
                            {/* <div className="user-token-item">
                                <span>Токен статистика</span>
                                <div className='d-flex token-status'>
                                    <div className='token-active'>
                                        <img src={active ? greencircle : redcircle} alt="" />
                                        <span>Активен до 3 авг. 2024</span>
                                    </div>
                                </div>
                            </div> */}
                            <div className="user-token-item">
                                <span>Токен статистика</span>
                                <div className='d-flex token-status'>
                                    <div className={active ? 'token-active' : 'token-inactive'}>
                                        <img src={active ? greencircle : redcircle} alt="" />
                                        <span>
                                            {expDate ? 'Активен до ' + expDate : 'Неактивен'}
                                            {
                                                !active ?
                                                    <span
                                                        className="refresh-token-btn prime-text ms-2"
                                                        onClick={() => navigate('/development/onboarding')}
                                                    >
                                                        Обновить
                                                    </span>
                                                    : null
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="user-token-item">
                                <span>Токен реклама</span>
                                <div className='d-flex token-status'>
                                    <div className='token-inactive'>
                                        <img src={redcircle} alt="" />
                                        <span>Неактивен</span>
                                    </div>
                                    <span className="refresh-token-btn prime-text">Обновить</span>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="linked-shop-block col">
                        <h3 className="fw-bold">
                            Новый магазин
                        </h3>
                        <p>Добавьте новые данные, чтобы отслеживать статистику по всем магазинам вашим в одном месте</p>
                        <div>
                            <button className="mt-2 secondary-btn" style={{ maxWidth: '200px' }}
                                onClick={() => navigate('/development/onboarding')}
                            >
                                Подключить
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default LinkedShops