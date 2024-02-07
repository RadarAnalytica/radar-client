import React from 'react'

const DashboardFilter = () => {

    return (
        <div className="filter container p-4 pt-0 d-flex">
            <div className="filter-item col-2 me-2">
                <label htmlFor="period">Период:</label>
                <select className='form-control' id="period">
                    <option value="week">Неделя</option>
                    <option value="year">14 дней</option>
                    <option value="month">Месяц</option>
                </select>
            </div>
            <div className="filter-item col-2 me-2">
                <label htmlFor="marketplace">Маркетплейс:</label>
                <select className='form-control' id="marketplace">
                    <option value="amazon">Wildeberries</option>
                </select>
            </div>
            <div className="filter-item col-2 me-2">
                <label htmlFor="store">Магазин:</label>
                <select className='form-control' id="store">
                    <option value="store1">Магазин 1</option>
                    <option value="store2">Магазин 2</option>
                    <option value="store3">Магазин 3</option>
                </select>
            </div>
            <div className="filter-item col-2 me-2">
                <label htmlFor="brand">Бренд:</label>
                <select className='form-control' id="brand">
                    <option value="brand1">Бренд 1</option>
                    <option value="brand2">Бренд 2</option>
                    <option value="brand3">Бренд 3</option>
                </select>
            </div>
        </div>
    )
}

export default DashboardFilter