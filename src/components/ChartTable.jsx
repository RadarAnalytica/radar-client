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
                            <p className='m-0 p-0 fw-bold' style={{ fontSize: '1.25vw !important' }}>{formatPrice(object.amount) || 0} ₽</p>
                            <div className="d-flex align-items-center mt-2">
                                <img src={object.percentRate > 0 ? green : red} alt="" className='me-2' />
                                <p className="m-0 p-0 tiny-numbers" style={object.percentRate <= 0 ? { color: 'red' } : { color: 'rgb(0, 182, 155)' }}>{formatPrice(object.percentRate) + '%'}</p>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <img src={object.percentRate <= 0 ? redchart1 : greenchart1} alt="" />
                        </div>
                    </div>
                    <div className="row-chart col">
                        <div>
                            <p className='m-0 p-0 fw-bold' style={{ fontSize: '1.25vw !important' }}>{formatPrice(object.percent) || 0} %</p>
                            <div className="d-flex align-items-center mt-2">
                                <img src={object.percentRate2 > 0 ? green : red} alt="" className='me-2' />
                                <p className="m-0 p-0 tiny-numbers" style={object.percentRate2 <= 0 ? { color: 'red' } : { color: 'rgb(0, 182, 155)' }}>{formatPrice(object.percentRate2) + '%'}</p>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <img src={object.percentRate2 > 0 ? greenchart1 : redchart2} alt="" />
                        </div>
                    </div>
                </div>
                <div className="col">

                </div>
            </div>
        </div>
    )
}

const ChartTable = ({ data, title, wbData }) => {

    return (
        <div className='chart-table mt-3'>
            {
                !wbData ?
                    <div className='d-flex flex-column align-items-center justify-content-center'
                        style={{ height: '100%', paddingTop: '20%' }}
                    >
                        <span className="loader"></span>
                    </div>
                    :
                    <div>
                        <p className="fw-bold numbers mb-2">{title}</p>
                        {
                            data && data.map((obj, i) => (
                                <ChartTableRow object={obj} key={i} />
                            ))
                        }
                        <p></p>
                    </div>
            }
        </div>
    )
}

export default ChartTable