import React from 'react'
import { formatPrice } from '../service/utils';

const WidePlate = ({ title, titles, income, products, data }) => {

    const sales = data ? Object.values(data)?.map(array => array?.totalSales) : []
    const salesPerc = data ? Object.values(data)?.map(array => array?.salesPercentage) : []
    const amount = data ? Object.values(data)?.map(array => array?.totalAmount) : []
    const amountPerc = data ? Object.values(data)?.map(array => array?.quantityPercentage) : []

    return (
        <div className='wide-plate w-100'>
            <p className="fw-bold mb-2 numbers">{title}</p>
            <div className='d-flex mb-2' >
                <span className="col-2 fw-bold">&nbsp;</span>
                {
                    titles && titles.map((t, i) =>
                        <div className={'col medium-numbers'} key={i}>
                            <span className='mr-2'>{t}</span>
                            <span></span>
                        </div>)
                }
            </div>
            <div className='d-flex mb-2' style={{ borderTop: '1px solid silver', paddingTop: '8px' }}>
                <span className="col-2 medium-numbers">Выручка</span>
                {
                    sales && sales.map((t, i) =>
                        <div className={'col '} key={i}>
                            <span className='me-2 medium-numbers'>{formatPrice(t) + ' ₽' || 0}</span>
                            <span className='tiny-numbers' style={true ? { fontSize: '12px', color: 'rgba(0, 182, 155, 1)' } : { fontSize: '12px', color: 'rgba(249, 60, 101, 1)' }}>{salesPerc ? formatPrice(salesPerc[i]) + ' %' : 0}</span>
                        </div>)
                }
            </div>
            <div className='d-flex mb-2' style={{ borderTop: '1px solid silver', paddingTop: '8px' }}>
                <span className="col-2 medium-numbers">Товар</span>
                {
                    amount && amount.map((t, i) =>
                        <div className={'col'} key={i}>
                            <span className='me-2 medium-numbers'>{t + ' шт'}</span>
                            <span className='tiny-numbers' style={true ? { fontSize: '12px', color: 'rgba(0, 182, 155, 1)' } : { fontSize: '12px', color: 'rgba(249, 60, 101, 1)' }}>{amountPerc ? formatPrice(amountPerc[i]) + ' %' : 0}</span>
                        </div>)
                }
            </div>
        </div>
    )
}

export default WidePlate