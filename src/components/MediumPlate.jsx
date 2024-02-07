import React from 'react'
import sales from '../assets/sales.png'
import returnicon from '../assets/return.png'
import order from '../assets/order.png'

const MediumPlate = ({ name, array }) => {

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
            <div className="d-flex align-items-start justify-content-between">
                <div>
                    <div className='mb-3'>
                        <p className='p-0 m-0 mb-1 clue-text'>{name}</p>
                        <p className='p-0 m-0 mb-1 fw-bold'>Price</p>
                        <p className='p-0 m-0 mb-1 clue-text'>График и показатели</p>
                    </div>
                    <div>
                        <p className='p-0 m-0 mb-1 fw-bold'>Количество</p>
                        <p className='p-0 m-0 mb-1 clue-text'>График и показатели</p>
                    </div>
                </div>
                <img src={getIcon(name)} alt="" style={{ maxWidth: '48px' }} />
            </div>
        </div>
    )
}

export default MediumPlate