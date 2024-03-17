import React from 'react'
import { formatPrice } from '../service/utils'

export const TableRow = ({ values, percent, sign }) => {

    const green = require('../assets/greenarrow.png')
    const red = require('../assets/redarrow.png')

    return (
        <div className='d-flex'>
            {
                values ? values.map((val, i) => (
                    <span
                        className={i < 2 ? 'col fin-row' : 'col-2 fin-row'}
                        key={i}
                        style={
                            i === 0 ?
                                { textAlign: 'left', fontWeight: 'bold' } :
                                i > 1 ?
                                    { textAlign: 'right', fontWeight: 400 }
                                    :
                                    { fontWeight: 700, textAlign: 'right' }
                        }
                    >
                        {
                            (percent || percent === 0) && i === 2 ?
                                <img src={percent > 0 ? green : red} alt="" className='me-2' style={{ width: '1.5vh' }} />
                                : null
                        }
                        <span style={percent <= 0 && i > 1 ? { fontWeight: 700, fontSize: '1.75vh', color: 'red' } : percent > 0 && i > 1 ? { fontWeight: 700, fontSize: '1.75vh', color: 'rgba(0, 182, 155, 1)' } : {}}>
                            {i === 1 ? formatPrice(val) + (sign ? sign : ' ₽') : i > 1 ? (val + ' %') : val}
                        </span>
                    </span>
                ))
                    : null
            }
        </div >
    )
}

const FinanceTable = ({ title, data, sign }) => {

    return (
        <div className='finance-table mb-0'>
            {
                // !data || (!data[0]?.value === null || !data[0]?.amount === null) ?
                //     <div className='d-flex flex-column align-items-center justify-content-center'
                //         style={{ height: '100%' }}
                //     >
                //         <span className="loader"></span>
                //     </div>
                //     :
                <div>
                    <p className="fw-bold numbers mb-2">{title}</p>
                    {
                        data && data.map((item, i) => {
                            let values = item ? Object.values(item) : []
                            let keys = item ? Object.keys(item) : []
                            let rate = keys ? keys.find(el => el === 'rate') : null
                            return <TableRow key={i} values={values} sign={sign} percent={rate ? item['rate'] : null} />

                        })
                    }
                </div>
            }
        </div>
    )
}

export default FinanceTable