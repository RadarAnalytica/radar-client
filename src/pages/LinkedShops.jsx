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

    let [activeTokens, setActiveTokens] = useState([])
    let [inactiveTokens, setInactiveTokens] = useState([])

    const [expDate, setExpDate] = useState()
    useEffect(() => {
        if (data) setExpDate(data.map(token => ({ date: new Date(token?.token?.exp * 1000), brandName: token.brandName })))
    }, [data])

    useEffect(() => {
        if (expDate) {
            for (let i in expDate) {
                if (new Date(expDate[i]?.date).getTime() > new Date().getTime()) {
                    setActiveTokens([...activeTokens, { date: expDate[i], brandName: expDate[i]?.brandName }])
                } else {
                    setInactiveTokens([...activeTokens, { date: expDate[i], brandName: expDate[i]?.brandName }])
                }
            }
        }
    }, [expDate])

    // console.log(activeTokens);

    return (
        <div className='linked-shops-page'>
            <SideNav />
            <div className="linked-shops-content">
                <TopNav title={'Подключенные магазины'} />

                <div className="container linked-shops-container d-flex" style={{ padding: '24px', gap: '20px' }}>
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
                            {
                                activeTokens?.length ? activeTokens?.map((item, i) => (
                                    <div className="user-token-item" key={i}>
                                        <div>
                                            <span className="fw-bold">{item.brandName}</span>
                                            <br />
                                            <span>Токен статистика</span>
                                        </div>
                                        <div className='d-flex token-status'>
                                            <div className='token-active'>
                                                <img src={greencircle} alt="" />
                                                <span>
                                                    {item.date ? 'Активен до ' + new Date(item.date.date).toLocaleDateString() : ''}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )) : null
                            }
                            {
                                inactiveTokens?.length ? inactiveTokens?.map((item, i) => (
                                    <div className="user-token-item" key={i}>
                                        <div>
                                            <span className="fw-bold">{item.brandName}</span>
                                            <span>Токен статистика</span>
                                        </div>
                                        <div className='d-flex token-status'>
                                            <div className='token-active'>
                                                <img src={redcircle} alt="" />
                                                <span>
                                                    {'Неактивен'}
                                                    <span
                                                        className="refresh-token-btn prime-text ms-2"
                                                        onClick={() => navigate('/development/onboarding')}
                                                    >
                                                        Обновить
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )) : null
                            }
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