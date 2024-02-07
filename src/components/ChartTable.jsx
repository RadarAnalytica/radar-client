import React from 'react'

const ChartTableRow = ({ object }) => {

    return (
        <div className='chart-table-row '>
            <p className="clue-text">{object.name}</p>
            <div className="d-flex justify-content-between">
                <div className="col d-flex justify-content-between">
                    <div className="chart-row-data">
                        <h5>Price</h5>
                        <div className="d-flex align-items-center">
                            <span>icon</span>
                            <p className="m-0 p-0">value</p>
                        </div>
                    </div>
                    <div className="row-chart">

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
            <p>lorem12</p>
        </div>
    )
}

export default ChartTable