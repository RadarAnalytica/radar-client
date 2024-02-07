import React from 'react'
import logo from '../assets/logo.png'
import mock from '../assets/desktop-mockup.png'

const MockUpPage = () => {

    return (
        <div className='mockup-page'>
            <div className='mockup-wrapper' style={{ paddingLeft: '150px', display: 'flex' }}>
                <div className="mockup-start col">
                    <img src={logo} alt="" style={{ width: '200px' }} />
                    <p style={{ fontSize: 32, fontWeight: 600 }}>
                        Скоро здесь откроется <span style={{ fontWeight: 900 }}>очень удобный сервис</span> для всех, кто работает с Маркетплейсами
                    </p>
                </div>
                <div className="mockup-end col">
                    <img src={mock} alt="" id='mockup' style={{ fontSize: 500 }} />
                </div>
            </div>
        </div>
    )
}

export default MockUpPage