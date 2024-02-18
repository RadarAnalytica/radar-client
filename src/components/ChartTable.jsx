import React from 'react'
import { formatPrice } from '../service/utils'

const ChartTableRow = ({ object }) => {

    const green = require('../assets/greenarrow.png')
    const red = require('../assets/redarrow.png')

    const redchart1 = require('../assets/redchart1.png')
    const redchart2 = require('../assets/redchart2.png')
    const redchart3 = require('../assets/redchart3.png')
    const greenchart1 = require('../assets/greenchart1.png')

    return (
        <div className='chart-table-row '>
            <p className="clue-text mb-2" style={{ fontSize: '14px' }}>{object.name}</p>
            <div className="d-flex justify-content-between">
                <div className="container d-flex justify-content-between">
                    <div className="chart-row-data col">
                        <div>
                            <p className='m-0 p-0 fw-bold'>{formatPrice(object.amount) || 0} ₽</p>
                            <div className="d-flex align-items-center mt-2">
                                <img src={object.percentRate < 19 ? green : red} alt="" className='me-2' />
                                <p className="m-0 p-0" style={object.percentRate >= 19 ? { color: 'red' } : { color: 'green' }}>{formatPrice(object.percentRate) + '%'}</p>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <img src={object.percentRate <= 22 ? redchart1 : redchart3} alt="" />
                        </div>
                    </div>
                    <div className="row-chart col">
                        <div>
                            <p className='m-0 p-0 fw-bold'>{formatPrice(object.percent) || 0} %</p>
                            <div className="d-flex align-items-center mt-2">
                                <img src={object.percentRate2 < 19 ? green : red} alt="" className='me-2' />
                                <p className="m-0 p-0" style={object.percentRate2 >= 19 ? { color: 'red' } : { color: 'green' }}>{formatPrice(object.percentRate2) + '%'}</p>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <img src={object.percentRate <= 19 ? greenchart1 : redchart2} alt="" />
                        </div>
                    </div>
                </div>
                <div className="col">

                </div>
            </div>
        </div>
    )
}

const ChartTable = ({ data, title }) => {

    return (
        <div className='chart-table mt-3'>
            <p className="fw-bold fs-4 mb-2">{title}</p>
            {
                data && data.map((obj, i) => (
                    <ChartTableRow object={obj} key={i} />
                ))
            }
            <p></p>
        </div>
    )
}

export default ChartTable