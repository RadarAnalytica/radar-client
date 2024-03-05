import React from 'react'
import '../../pages/styles.css'

const CalculateForm = () => {
    return (
        <div className='calc-form'>
            <p className="fw-bold mb-1" style={{ fontSize: '2.25vh' }}>Базовый продажи</p>
            <div className="calc-inputs row pl-3">
                <div className='col'>
                    <label style={{ fontSize: '1.75vh' }} htmlFor="">Цена продажи, руб</label>
                    <input type="text" className='form-control' />
                </div>
                <div className='col'>
                    <label style={{ fontSize: '1.75vh' }} htmlFor="">Ваша цель по прибыли, руб</label>
                    <input type="text" className='form-control' />
                </div>
            </div>
            <p className="fw-bold mb-1 mt-2" style={{ fontSize: '2.25vh' }}>Комиссии маркетплейса</p>
            <div className="calc-inputs row pl-3">
                <div className='col'>
                    <label style={{ fontSize: '1.75vh' }} htmlFor="">Комиссия маркетплейса, %</label>
                    <input type="text" className='form-control' />
                </div>
                <div className='col'>
                    <label style={{ fontSize: '1.75vh' }} htmlFor="">Логистика МП клиенту, руб</label>
                    <input type="text" className='form-control' />
                </div>
                <div className='col'>
                    <label style={{ fontSize: '1.75vh' }} htmlFor="">Обратная логистика, руб</label>
                    <input type="text" className='form-control' />
                </div>
            </div>
            <p className="fw-bold mb-1 mt-2" style={{ fontSize: '2.25vh' }}>Себестоимость товара</p>
            <div className="calc-inputs row pl-3">
                <div className='col'>
                    <label style={{ fontSize: '1.75vh' }} htmlFor="">Цена закупки, руб</label>
                    <input type="text" className='form-control' />
                </div>
                <div className='col'>
                    <label style={{ fontSize: '1.75vh' }} htmlFor="">Логистика, руб</label>
                    <input type="text" className='form-control' />
                </div>
                <div className='col'>
                    <label style={{ fontSize: '1.75vh' }} htmlFor="">Упаковка, фулфилмент и др., руб</label>
                    <input type="text" className='form-control' />
                </div>
            </div>
            <p className="fw-bold mb-1 mt-2" style={{ fontSize: '2.25vh' }}>Дополнительно</p>
            <div className="calc-inputs row pl-3">
                <div className='col'>
                    <label style={{ fontSize: '1.75vh' }} htmlFor="">Процент выкупа, %</label>
                    <input type="text" className='form-control' />
                </div>
                <div className='col'>
                    <label style={{ fontSize: '1.75vh' }} htmlFor="">Налоговая ставка, %</label>
                    <input type="text" className='form-control' />
                </div>
                <div className='col'>
                    <label style={{ fontSize: '1.75vh' }} htmlFor="">Амортизация, %</label>
                    <input type="text" className='form-control' />
                </div>
            </div>
        </div>
    )
}

export default CalculateForm