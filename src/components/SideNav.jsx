import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import greygrow from '../assets/grey-grow.png'
import purplegrow from '../assets/purple-grow.png'
import goods from '../assets/mygoods.png'
import magic from '../assets/magic.png'
import support from '../assets/support.png'
import { useNavigate } from 'react-router-dom'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";


const SideNav = () => {

    const navigate = useNavigate()

    const url = document.location.href
    const chunkArray = url ? url.split('/').reverse() : null
    const location = chunkArray ? chunkArray[0] : null

    const [active, setActive] = useState('')
    useEffect(() => {
        setActive(location)
    }, [location])

    const [goodsShown, setGoodsShown] = useState(true)
    const [promotionShown, setPromotionShown] = useState(true)

    return (
        <div className='side-nav'>
            <div>
                <img src={logo} alt="" style={{ maxWidth: '160px' }} />

                <div className='mt-4'>
                    <div className='sidenav-el' onClick={() => navigate('/development/dashboard')}>
                        <div className='d-flex align-items-center'>
                            <img src={active === 'dashboard' ? purplegrow : greygrow} alt="" className='side-nav-icon' />
                            <span className='sidenav-title' style={active === 'dashboard' ? { fontWeight: 'bold', color: 'black' } : {}}>Сводка продаж</span>
                        </div>
                    </div>
                    <div className='sidenav-el' onClick={() => setGoodsShown(!goodsShown)}>
                        <div className="d-flex align-items-center">
                            <img src={goods} alt="" className='side-nav-icon' />
                            <span className='sidenav-title'>Мои товары</span>
                        </div>
                        <span>
                            {goodsShown ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </span>
                    </div>
                    {
                        goodsShown ?
                            <div>
                                <p
                                    className='sidenav-title ps-4 submenu-item'
                                    onClick={() => navigate('/development/orders-map')}
                                >
                                    География заказов
                                </p>
                            </div>
                            : null
                    }
                    <div className='sidenav-el' onClick={() => setPromotionShown(!promotionShown)}>
                        <div className="d-flex align-items-center">
                            <img src={magic} alt="" className='side-nav-icon' />
                            <span className='sidenav-title'>Продвижение</span>
                        </div>
                        <span>
                            {promotionShown ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </span>
                    </div>
                    {
                        promotionShown ?
                            <div>
                                <p
                                    className='sidenav-title ps-4 submenu-item'
                                    onClick={() => navigate('/development/calculate')}
                                >
                                    Калькулятор unit-экономики товаров
                                </p>
                            </div>
                            : null
                    }
                </div>
            </div>
            <div className='support-block'>
                <img src={support} alt="" className='support-icon' />
                <p className='fw-bold mb-0 mt-2 p-0' style={{ fontSize: '1.8vh' }}>Обратиться в поддержку</p>
                <p className='m-0 p-0' style={{ fontSize: '1.8vh' }}>или предложить идею</p>
            </div>
        </div>
    )

}

export default SideNav