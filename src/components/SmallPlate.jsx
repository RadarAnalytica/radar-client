import React from 'react'
import { formatPrice } from '../service/utils'

const SmallPlate = ({ name, value, type, percent, quantity, nochart, smallText }) => {

    const green = require('../assets/greenarrow.png')
    const red = require('../assets/redarrow.png')

    return (
        <div className='small-plate'>
            <p className='p-0 m-0 mb-1 clue-text' style={smallText ? { fontSize: '12px' } : {}}>{name}</p>
            <div className='d-flex justify-content-between align-items-center'>
                <p className='p-0 m-0 mb-1 fw-bold numbers'>{value ? formatPrice(value) : 0}{type === 'price' ? ' ₽' : ' %'}</p>
                {
                    !quantity ?
                        <div>
                            {
                                nochart === undefined ?
                                    <div className="d-flex align-items-center justify-content-between">
                                        <img src={percent > 20 ? green : red} alt="" className='me-2' />
                                        <p className='m-0 p-0 clue-text small-numbers' style={percent > 20 ? { color: 'rgba(0, 182, 155, 1)' } : { color: 'rgba(249, 60, 101, 1)' }}>{formatPrice(percent)}%</p>
                                    </div> : null
                            }
                        </div>
                        :
                        <p className='fw-bold p-0 mb-1'>
                            {`${quantity} шт`}
                        </p>
                }
            </div>
        </div>
    )
}

export default SmallPlate