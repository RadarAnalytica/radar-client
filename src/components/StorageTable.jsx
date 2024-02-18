import React from 'react'
import { formatPrice } from '../service/utils'

const TableRow = ({ values }) => {

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
                                    { textAlign: 'right', fontWeight: 700 }
                                    :
                                    { fontWeight: 700, textAlign: 'right' }
                        }
                    >{(i === 1 || i === 2) && val !== '-' ? val + ' ₽' : i === 3 ? val + ' шт.' : i === 1 && val === '-' ? formatPrice(values[3] * 1000) + ' ₽' : val}</span>
                ))
                    : null
            }
        </div >
    )
}

const StorageTable = ({ title, data, titles, subtitles }) => {

    return (
        <div className='storage-table mt-3'>
            <p className="fw-bold fs-4 mb-2">{title}</p>
            <div className='d-flex'>
                {
                    titles && titles.map((t, i) => <span className='col' style={
                        i === 0 ?
                            { textAlign: 'left', fontWeight: 'bold' } :
                            i > 1 ?
                                { textAlign: 'right', fontWeight: 700 }
                                :
                                { fontWeight: 700, textAlign: 'right' }
                    } key={i}>{t}</span>)
                }
            </div>
            <div className='d-flex mt-2 mb-2 clue-text'>
                {
                    subtitles && subtitles.map((t, i) => <span className='col' style={
                        i === 0 ?
                            { textAlign: 'left', fontWeight: 'bold' } :
                            i > 1 ?
                                { textAlign: 'right', fontWeight: 400 }
                                :
                                { fontWeight: 700, textAlign: 'right' }
                    } key={i}>{t}</span>)
                }
            </div>
            {
                data && data.map((item, i) => {
                    let values = item ? Object.values(item) : []

                    return <TableRow key={i} values={values} />

                })
            }
        </div>
    )
}

export default StorageTable