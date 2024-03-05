import React from 'react'

const OrderMapTable = ({ title, data }) => {

    const withName = data.filter(item => item.fo)
    const withoutName = data.filter(item => !item.fo)

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
                            <p className="mb-2 col-6 pe-2">{item.fo || 'Регион не определен'}</p>
                            <p className="mb-2 col">{item.amount}&nbsp;шт</p>
                            <p className="mb-2 col">{item.sum}&nbsp;₽</p>
                            <p className="mb-2 col text-end fw-bold">{item.percent}&nbsp;%</p>
                        </div>
                    ))
                    :
                    refreshed.map((item, key) => (
                        <div key={key} className='d-flex justify-content-between'>
                            <p className="mb-2 col-6 pe-2">{item.fo}</p>
                            <p className="mb-2 col">{item.amount}&nbsp;шт</p>
                            <p className="mb-2 col">{item.sum}&nbsp;₽</p>
                            <p className="mb-2 col text-end fw-bold">{item.percent}&nbsp;%</p>
                        </div>
                    ))
            }
        </div>
    )
}

export default OrderMapTable