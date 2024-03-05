import React from 'react'

const OrderTableExtended = ({ title, data }) => {

    data?.data?.forEach(item => {
        if (item.name && item.name.length) {
            let name = item.name.split(' ')?.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
            item.name = name
        }
        else {
            item.name = "Регион не определен"
        }
    })

    return (
        <div className='order-table-extended'>
            <h5 className='fw-bold' style={{ fontSize: '2.5vh' }}>{title}</h5>
            <div className='d-flex justify-content-between'>
                <p className="mb-2 clue-text col-5 pe-2">Регион</p>
                <p className="mb-2 clue-text col-2">Рубли</p>
                <p className="mb-2 clue-text col-3 text-center">Общая доля</p>
                <p className="mb-2 clue-text col-2 text-end">По складу</p>
            </div>
            {
                data && data.data && data.data.length ?
                    data.data.map((item, key) => (
                        <div key={key} className='d-flex'>
                            <p style={{ fontWeight: 600 }} className="mb-2 col-5 pe-2">{item.name}</p>
                            <p style={{ fontWeight: 600 }} className="mb-2 col-2">{(item.sum)?.toFixed(1)} ₽</p>
                            <p style={{ fontWeight: 600 }} className="mb-2 col-3 text-center">{(item.percent)?.toFixed(1)}%</p>
                            <p style={{ fontWeight: 600 }} className="mb-2 col-2 fw-bold text-end">{(item.percentTotal)?.toFixed(1)}%</p>
                        </div>
                    )) : null
            }
        </div>
    )
}

export default OrderTableExtended