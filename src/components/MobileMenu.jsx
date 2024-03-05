import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../service/AuthContext'
import { IoMdClose } from "react-icons/io";
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom';
import greygrow from '../assets/grey-grow.png'
import purplegrow from '../assets/purple-grow.png'


const MobileMenu = () => {

    const { showMobile, setShowMobile, logout } = useContext(AuthContext)

    const navigate = useNavigate()

    const url = document.location.href
    const chunkArray = url ? url.split('/').reverse() : null
    const location = chunkArray ? chunkArray[0] : null

    const [active, setActive] = useState('')
    useEffect(() => {
        setActive(location)
    }, [location])

    return (
        <div className={showMobile ? 'mobile-menu mobile-open' : 'mobile-menu'}>
            <div className="text-end">
                <IoMdClose style={{ fontSize: '32px', cursor: 'pointer' }} onClick={() => setShowMobile(false)} />
            </div>
            <div className='d-flex justify-content-center'>
                <img src={logo} alt="" style={{ maxWidth: '140px' }} />
            </div>
            <div className='mt-4 mb-4'>
                <div className='sidenav-el' onClick={() => { setShowMobile(false); navigate('/development/dashboard') }}>
                    <div className="d-flex align-items-center">
                        <img src={active === 'dashboard' ? purplegrow : greygrow} alt="" className='side-nav-icon' />
                        <span className='sidenav-title' style={active === 'dashboard' ? { fontWeight: 'bold', color: 'black' } : {}}>Сводка продаж</span>
                    </div>
                </div>
            </div>
            <hr style={{ border: '1px solid black' }} />
            <div>
                <a href="#" className='link'>
                    Получить полный доступ
                </a>
                <div className='pt-2'>
                    {/* <p className='mt-3 mb-2'>Сотрудники</p>
                                    <p className='mb-2'>Настройки аккаунта</p> */}
                    <p
                        className='mb-1 mt-2'
                        onClick={() => { setShowMobile(false); navigate('/development/linked-shops') }}>
                        Подключенный магазины
                    </p>
                    {/* <p className='mb-2'>Экспорт отчетов</p>
                                    <p className='mb-2'>Тарифы</p> */}
                </div>
                <hr style={{ minWidth: '220px', height: '1px', border: '1px solid silver', marginBottom: '4px' }} />
                <a href="/development/signin" className='link'
                    style={{
                        paddingTop: '4px',
                        width: '240px'
                    }}
                    onClick={() => {
                        setShowMobile(false);
                        logout();
                    }}
                >
                    Выход
                </a>
            </div>
        </div>
    )
}

export default MobileMenu