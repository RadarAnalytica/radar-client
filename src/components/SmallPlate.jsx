import React from 'react'
import { formatPrice } from '../service/utils'

const SmallPlate = ({ name, value, type, percent }) => {

    const green = require('../assets/greenarrow.png')
    const red = require('../assets/redarrow.png')

    return (
        <div className='small-plate'>
            <p className='p-0 m-0 mb-1 clue-text'>{name}</p>
            <div className='d-flex justify-content-between'>
                <p className='p-0 m-0 mb-1 fw-bold'>{value ? formatPrice(value) : 0}{type === 'price' ? ' ₽' : ' %'}</p>
                <div className="d-flex align-items-center justify-content-between">
                    <img src={percent > 100 ? green : red} alt="" className='me-2' />
                    <p className='m-0 p-0 clue-text' style={percent > 100 ? { color: 'rgba(0, 182, 155, 1)' } : { color: 'rgba(249, 60, 101, 1)' }}>{percent}%</p>
                </div>
            </div>
        </div>
    )
}

export default SmallPlate