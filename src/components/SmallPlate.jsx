import React from 'react'
import { formatPrice } from '../service/utils'

const SmallPlate = ({ name, value, type }) => {

    return (
        <div className='small-plate'>
            <p className='p-0 m-0 mb-1 clue-text'>{name}</p>
            <div className='d-flex justify-content-between'>
                <p className='p-0 m-0 mb-1 fw-bold'>{value ? formatPrice(value) : 0}{type === 'price' ? ' ₽' : ' %'}</p>
                {/* <p className='p-0 m-0 mb-1 clue-text'>График и показатели</p> */}
            </div>
        </div>
    )
}

export default SmallPlate