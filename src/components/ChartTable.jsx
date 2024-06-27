import React from 'react'
import { formatPrice } from '../service/utils'
import GreenArrow from '../assets/greenarrow.svg'
import RedArrow from '../assets/redarrow.svg'

const ChartTableRow = ({ object }) => {

    return (
        <div className='chart-table-row '>
            <p className="clue-text mb-2" style={{ fontSize: '14px' }}>{object.name}</p>
            <div className="d-flex justify-content-between">
                <div className="container d-flex justify-content-between">
                    <div className="chart-row-data col">
                        <div>
                            <p className='m-0 p-0 fw-bold' style={{ fontSize: '1.25vw !important' }}>{formatPrice(object.amount)} ₽</p>
                            <div className="d-flex align-items-center mt-2">
                                {formatPrice(object.percentRate) > 0 ?  <img style={{ height: '1.25vh', marginRight: '4px' }} src= {GreenArrow} alt="" />
                                    :
                                    <img style={{ height: '1.25vh', marginRight: '4px' }} src= {RedArrow} alt="" />}
                                <p className="m-0 p-0 tiny-numbers" style={formatPrice(object.percentRate) <= 0 ? { color: 'red' } : { color: 'rgb(0, 182, 155)' }}>{formatPrice(object.percentRate)} %</p>
                            </div>
                        </div>
                        {/* <div className='mt-2'>
                            <img src={object.percentRate <= 0 ? redchart1 : greenchart1} alt="" />
                        </div> */}
                    </div>
                    <div className="row-chart col">
                        <div>
                            <p className='m-0 p-0 fw-bold' style={{ fontSize: '1.25vw !important' }}>{formatPrice(object.percent)} %</p>
                            <div className="d-flex align-items-center mt-2">
                                {formatPrice(object.percentRate2) > 0 ? <img style={{ height: '1.25vh', marginRight: '4px' }} src= {GreenArrow} alt="" />
                                    :
                                   <img style={{ height: '1.25vh', marginRight: '4px' }} src= {RedArrow} alt="" />}
                                <p className="m-0 p-0 tiny-numbers" style={formatPrice(object.percentRate2) <= 0 ? { color: 'red' } : { color: 'rgb(0, 182, 155)' }}>{formatPrice(object.percentRate2)} %</p>
                            </div>
                        </div>
                        {/* <div className='mt-2'>
                            <img src={object.percentRate2 > 0 ? greenchart1 : redchart2} alt="" />
                        </div> */}
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