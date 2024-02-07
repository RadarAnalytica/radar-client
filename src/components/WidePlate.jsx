import React from 'react'

const WidePlate = ({ title, titles, income, products }) => {
    return (
        <div className='wide-plate w-100'>
            <p className="fw-bold fs-4 mb-2">{title}</p>
            <div className='d-flex mb-2'>
                <span className="col fw-bold">&nbsp;</span>
                {titles && titles.map((t, i) => <div className='col' key={i}><span className='mr-2'>{t}</span><span>value</span></div>)}
            </div>
            <div className='d-flex mb-2'>
                <span className="col fw-bold">Выручка</span>
                {income && income.map((t, i) => <div className='col' key={i}><span className='mr-2'>{t}</span><span>value</span></div>)}
            </div>
            <div className='d-flex mb-2'>
                <span className="col fw-bold">Товар</span>
                {products && products.map((t, i) => <div className='col' key={i}><span className='mr-2'>{t}</span><span>value</span></div>)}
            </div>
        </div>
    )
}

export default WidePlate