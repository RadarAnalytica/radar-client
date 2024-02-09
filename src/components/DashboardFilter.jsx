import React from 'react'

const DashboardFilter = ({ warehouses, changePeriod, defaultValue }) => {

    const weekAgo = new Date(new Date().setDate(new Date().getDate() - 7)).toLocaleDateString('ru')?.split('.').reverse().join('-')
    const twoWeeksAgo = new Date(new Date().setDate(new Date().getDate() - 14)).toLocaleDateString('ru')?.split('.').reverse().join('-')
    const monthAgo = new Date(new Date().setDate(new Date().getDate() - 31)).toLocaleDateString('ru')?.split('.').reverse().join('-')

    console.log(defaultValue);

    return (
        <div className="filter container p-4 pt-0 d-flex">
            <div className="filter-item col-2 me-2">
                <label htmlFor="period">Период:</label>
                <select className='form-control' id="period"
                    defaultValue={
                        defaultValue === 7 ? { period: weekAgo, days: 7 }
                            : defaultValue === 14 ? { period: twoWeeksAgo, days: 14 }
                                : { period: monthAgo, days: 31 }
                    }
                    onChange={e => { changePeriod(e) }}
                >
                    <option selected={defaultValue === 7 ? true : false} value={JSON.stringify({ period: weekAgo, days: 7 })}>Неделя</option>
                    <option selected={defaultValue === 14 ? true : false} value={JSON.stringify({ period: twoWeeksAgo, days: 14 })}>14 дней</option>
                    <option selected={defaultValue === 31 ? true : false} value={JSON.stringify({ period: monthAgo, days: 31 })}>Месяц</option>
                </select>
            </div>
            <div className="filter-item col-2 me-2">
                <label htmlFor="marketplace">Маркетплейс:</label>
                <select className='form-control' id="marketplace" disabled>
                    <option value="amazon">Wildeberries</option>
                </select>
            </div>
            <div className="filter-item col-2 me-2">
                <label htmlFor="store">Магазин:</label>
                <select className='form-control' id="store" disabled>
                    <option value={null}>Все</option>
                    {
                        warehouses && warehouses.map((w, i) => (
                            <option key={i} value={w.name}>{w.name}</option>
                        ))
                    }
                    {/* <option value="store1">Магазин 1</option>
                    <option value="store2">Магазин 2</option>
                    <option value="store3">Магазин 3</option> */}
                </select>
            </div>
            {/* <div className="filter-item col-2 me-2">
                <label htmlFor="brand">Бренд:</label>
                <select className='form-control' id="brand">
                    <option value="brand1">Бренд 1</option>
                    <option value="brand2">Бренд 2</option>
                    <option value="brand3">Бренд 3</option>
                </select>
            </div> */}
        </div>
    )
}

export default DashboardFilter