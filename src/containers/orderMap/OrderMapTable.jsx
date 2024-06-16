import React from 'react'

const OrderMapTable = ({ title, data }) => {

    const withName = data.filter(item => item.districtName).slice(0, 5)
    // const otherRegion = withName.slice(-5)
    const withoutName = data.filter(item => !item.districtName)

    const refreshed = withName.concat(withoutName)

    return (
        <div className='order-map-table'>
            <h5 className="fw-bold" style={{ fontSize: '2.5vh' }}>{title}</h5>
            <div className='d-flex justify-content-between'>
                <p className="mb-2 clue-text col-6 pe-2">Регион</p>
                <p className="mb-2 clue-text col">Штуки</p>
                <p className="mb-2 clue-text col">Рубли</p>
                <p className="mb-2 clue-text col text-end">Доля</p>
            </div>
            {
                refreshed && refreshed.length > 5 ?
                    refreshed.slice(5).map((item, key) => (
                        <div key={key} className='d-flex justify-content-between'>
                            <p className="mb-2 col-6 pe-2">{item.districtName || 'Регион не определен'}</p>
                            <p className="mb-2 col">{item.saleAmount}&nbsp;шт</p>
                            <p className="mb-2 col">{item.saleCount}&nbsp;₽</p>
                            <p className="mb-2 col text-end fw-bold">{item.percent.toFixed(1)}&nbsp;%</p>
                        </div>
                    ))
                    :
                    refreshed.map((item, key) => (
                        <div key={key} className='d-flex justify-content-between'>
                            <p className="mb-2 col-6 pe-2">{item.districtName}</p>
                            <p className="mb-2 col">{item.saleAmount}&nbsp;шт</p>
                            <p className="mb-2 col">{item.saleCount}&nbsp;₽</p>
                            <p className="mb-2 col text-end fw-bold">{item.percent.toFixed(1)}&nbsp;%</p>
                        </div>
                    ))
            }
        </div>
    )
}

export default OrderMapTable