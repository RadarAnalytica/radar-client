import React from 'react'
import { formatPrice } from '../service/utils'

const SmallPlate = ({ name, value, type, percent, quantity, nochart, smallText }) => {

    const green = require('../assets/greenarrow.png')
    const red = require('../assets/redarrow.png')

    return (
        <div className='small-plate'>
            {
                value === null || value === undefined ?
                    <div className='d-flex flex-column align-items-center justify-content-center'
                        style={{ height: '100%' }}
                    >
                        <span className="loader"></span>
                    </div>
                    :
                    <div>
                        <p className='p-0 m-0 mb-1 clue-text small-title' style={{ fontSize: '1.75vh' }} >{name}</p>
                        <div className='d-flex justify-content-between align-items-end'>
                            <p className='p-0 m-0 fw-bold numbers'>{value ? formatPrice(value) : 0}{type === 'price' ? ' ₽' : ' %'}</p>
                            {
                                !quantity ?
                                    <div>
                                        {
                                            nochart === undefined ?
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <img src={percent > 0 ? green : red} alt="" className='me-2' />
                                                    <p className='m-0 p-0 clue-text tiny-numbers' style={percent > 0 ? { color: 'rgba(0, 182, 155, 1)' } : { color: 'rgba(249, 60, 101, 1)' }}>{formatPrice(percent)}%</p>
                                                </div> : null
                                        }
                                    </div>
                                    :
                                    <p className='fw-bold p-0 mb-1 small-numbers'>
                                        {`${quantity} шт`}
                                    </p>
                            }
                        </div>
                    </div>
            }
        </div>
    )
}

export default SmallPlate