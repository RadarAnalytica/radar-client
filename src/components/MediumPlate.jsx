import React from 'react'
import sales from '../assets/sales.png'
import returnicon from '../assets/return.png'
import order from '../assets/order.png'
import { formatPrice } from '../service/utils'

const MediumPlate = ({ name, value, quantity, percent, percent2, text, text2 }) => {

    const green = require('../assets/greenarrow.png')
    const red = require('../assets/redarrow.png')

    const getIcon = (name) => {
        switch (name) {
            case 'Заказы':
                return order
            case 'Продажи':
                return sales
            case 'Возвраты':
                return returnicon
            default: return null
        }
    }

    return (
        <div className='medium-plate col'>
            <div className="d-flex align-items-start justify-content-between" style={{ position: 'relative' }}>
                <div className='w-100'>
                    <div className='mb-3'>
                        <p className='p-0 m-0 mb-2 clue-text' style={{ fontSize: '1.75vh' }}>{name}</p>
                        <p className='p-0 m-0 mb-1 fw-bold numbers'>{formatPrice(value) || '0,00'} ₽</p>
                        <div className="d-flex align-items-center gap-2">
                            <div className="d-flex align-items-center">
                                <img src={percent > 0 ? green : red} alt="" style={{ width: '20px', height: '12px', marginRight: '10px' }} />
                                <p className='m-0 p-0 tiny-numbers' style={percent > 0 ? { color: 'rgba(0, 182, 155, 1)' } : { color: 'rgba(249, 60, 101, 1)' }}>{formatPrice(percent)}%</p>
                            </div>
                            {text && <p className='m-0 p-0 clue-text' style={{ fontSize: '1.75vh', fontWeight: 600 }}>{"В день ~ " + formatPrice(text) + ' ₽'}</p>}
                        </div>
                    </div>
                    <div>
                        <p className='p-0 m-0 mb-1 fw-bold numbers'>{quantity} шт.</p>
                        <div className="d-flex align-items-center gap-2">
                            <div className="d-flex align-items-center">
                                <img src={percent2 > 0 ? green : red} alt="" style={{ width: '20px', height: '12px', marginRight: '10px' }} />
                                <p className='m-0 p-0 tiny-numbers' style={percent2 > 0 ? { color: 'rgba(0, 182, 155, 1)' } : { color: 'rgba(249, 60, 101, 1)' }}>{formatPrice(percent2)}%</p>
                            </div>
                            {text2 && <p className='m-0 p-0 clue-text' style={{ fontSize: '1.75vh', fontWeight: 600 }}>{'В день ~ ' + formatPrice(text2) + ' шт'}</p> || <p className='m-0 p-0'>&nbsp;</p>}
                        </div>
                    </div>
                </div>
                <img className='' src={getIcon(name)} alt="" style={{ position: 'absolute', right: '0', top: '0' }} />
            </div>
        </div>
    )
}

export default MediumPlate