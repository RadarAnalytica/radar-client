import React from 'react'

const OrdersMapFilter = ({ brandNames, changeBrand, defaultValue, setDays, shop }) => {

    return (
        <div className='orders-filter container dash-container'>
            <div className="row">
                <div className="filter-item col me-0" style={{ maxWidth: '12vw' }}>
                    <label htmlFor="period">Период:</label>
                    <select className='form-control' id="period"
                        defaultValue={'14'}
                        onChange={e => setDays(e.target.value)}
                    >
                        {/* <option selected={defaultValue === 1 ? true : false} value={'1'}>1 день</option> */}
                        <option selected={defaultValue === 7 ? true : false} value={'7'}>Неделя</option>
                        <option selected={defaultValue === 14 ? true : false} value={'14'}>14 дней</option>
                        <option selected={defaultValue === 31 ? true : false} value={'30'}>Месяц</option>
                        <option selected={defaultValue === 92 ? true : false} value={'90'}>3 месяца</option>
                    </select>
                    <svg style={{ position: 'absolute', right: '1.75vw', top: '4.5vh', width: '1.5vh', }} viewBox="0 0 28 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 2L14 14L26 2" stroke="rgba(140, 140, 140, 1)" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                </div>
                {/* <div className="filter-item col me-2" st0le={{maxWidth: '12vw'}}>
                    <label htmlFor="marketplace">Маркетплейс:</label>
                    <select className='form-control' id="marketplace" disabled>
                        <option value="wildberries">Wildeberries</option>
                    </select>
                </div> */}
                <div className="filter-item col me-0" style={{ maxWidth: '12vw' }}>
                    <label htmlFor="store">Магазин:</label>
                    <select className='form-control' defaultValue={shop?.slice(0, 1)[0].id} onChange={e => changeBrand(e.target.value)}>
                        <option value="Все" selected>Все</option>
                        {
                            shop && shop.map((brand, i) => (
                                <option key={i} value={brand.id}>{brand.brand_name}</option>
                            ))
                        }
                    </select>
                    <svg style={{ position: 'absolute', right: '1.75vw', top: '4.5vh', width: '1.5vh', }} viewBox="0 0 28 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 2L14 14L26 2" stroke="rgba(140, 140, 140, 1)" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                </div>
                {/* <div className="filter-item col me-2" st0le={{maxWidth: '12vw'}}>
                    <label htmlFor="store">Бренд:</label>
                    <select className='form-control' disabled>
                        <option value="">Brand 1</option>
                        <option value="">Brand 2</option>
                    </select>
                </div>
                <div className="filter-item col me-2" st0le={{maxWidth: '12vw'}}>
                    <label htmlFor="store">Артикул:</label>
                    <input className='form-control' disabled />
                </div>
                <div className="filter-item col me-2" st0le={{maxWidth: '12vw'}}>
                    <label htmlFor="store">Размер:</label>
                    <input className='form-control' disabled />
                </div> */}
            </div>
        </div>
    )
}

export default OrdersMapFilter