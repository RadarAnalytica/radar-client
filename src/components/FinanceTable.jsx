import React from 'react'

export const TableRow = ({ values }) => {

    return (
        <div className='d-flex'>
            {
                values ? values.map((val, i) => (
                    <span
                        className='col fin-row'
                        key={i}
                        style={
                            i === 0 ?
                                { textAlign: 'left', fontWeight: 'bold' } :
                                i > 1 ?
                                    { textAlign: 'right', fontWeight: 400 }
                                    :
                                    { fontWeight: 700, textAlign: 'right' }
                        }
                    >{val}</span>
                ))
                    : null
            }
        </div >
    )
}

const FinanceTable = ({ title, data }) => {

    return (
        <div className='finance-table'>
            <p className="fw-bold fs-4 mb-2">{title}</p>
            {
                data && data.map((item, i) => {
                    let values = item ? Object.values(item) : []

                    return <TableRow key={i} values={values} />

                })
            }
        </div>
    )
}

export default FinanceTable