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
                                {object.percentRate > 0 ? <svg style={{ height: '1.25vh', marginRight: '4px' }} viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 0L16.29 2.29L11.41 7.17L7.41 3.17L0 10.59L1.41 12L7.41 6L11.41 10L17.71 3.71L20 6V0H14Z" fill="#00B69B" />
                                </svg>
                                    :
                                    <svg style={{ height: '1.25vh', marginRight: '4px' }} viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14 12L16.29 9.71L11.41 4.83L7.41 8.83L0 1.41L1.41 0L7.41 6L11.41 2L17.71 8.29L20 6V12H14Z" fill="#F93C65" />
                                    </svg>}
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
                                {object.percentRate2 > 0 ? <svg style={{ height: '1.25vh', marginRight: '4px' }} viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 0L16.29 2.29L11.41 7.17L7.41 3.17L0 10.59L1.41 12L7.41 6L11.41 10L17.71 3.71L20 6V0H14Z" fill="#00B69B" />
                                </svg>
                                    :
                                    <svg style={{ height: '1.25vh', marginRight: '4px' }} viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14 12L16.29 9.71L11.41 4.83L7.41 8.83L0 1.41L1.41 0L7.41 6L11.41 2L17.71 8.29L20 6V12H14Z" fill="#F93C65" />
                                    </svg>}
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

const ChartTable = ({ data, title, wbData, dataDashBoard }) => {

    return (
        <div className='chart-table mt-3'>
            {
                !dataDashBoard ?
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