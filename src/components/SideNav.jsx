import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import greygrow from '../assets/grey-grow.png'
import purplegrow from '../assets/purple-grow.png'
import goods from '../assets/mygoods.png'
import magic from '../assets/magic.png'
import support from '../assets/support.png'
import { useNavigate } from 'react-router-dom'

const SideNav = () => {

    const navigate = useNavigate()

    const url = document.location.href
    const chunkArray = url ? url.split('/').reverse() : null
    const location = chunkArray ? chunkArray[0] : null

    const [active, setActive] = useState('')
    useEffect(() => {
        setActive(location)
    }, [location])

    return (
        <div className='side-nav'>
            <div>
                <img src={logo} alt="" style={{ maxWidth: '160px' }} />

                <div className='mt-4'>
                    <div className='sidenav-el' onClick={() => navigate('/development/dashboard')}>
                        <img src={active === 'dashboard' ? purplegrow : greygrow} alt="" className='side-nav-icon' />
                        <span className='sidenav-title' style={active === 'dashboard' ? { fontWeight: 'bold', color: 'black' } : {}}>Сводка продаж</span>
                    </div>
                    {/* <div className='sidenav-el'>
                        <img src={goods} alt="" className='side-nav-icon' />
                        <span className='sidenav-title'>Мои товары</span>
                    </div>
                    <div className='sidenav-el'>
                        <img src={magic} alt="" className='side-nav-icon' />
                        <span className='sidenav-title'>Продвижение</span>
                    </div> */}
                </div>
            </div>
            <div className='support-block'>
                <img src={support} alt="" className='support-icon' />
                <p className='fw-bold mb-0 mt-2 p-0'>Обратиться в поддержку</p>
                <p className='m-0 p-0'>или предложить идею</p>
            </div>
        </div>
    )

}

export default SideNav