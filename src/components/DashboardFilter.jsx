import React from 'react'

const DashboardFilter = ({ brandNames, changeBrand, defaultValue, setDays }) => {

    const weekAgo = new Date(new Date().setDate(new Date().getDate() - 7)).toLocaleDateString('ru')?.split('.').reverse().join('-')
    const twoWeeksAgo = new Date(new Date().setDate(new Date().getDate() - 14)).toLocaleDateString('ru')?.split('.').reverse().join('-')
    const monthAgo = new Date(new Date().setDate(new Date().getDate() - 31)).toLocaleDateString('ru')?.split('.').reverse().join('-')

    return (
        <div className="filter container dash-container p-4 pt-0 d-flex">
            <div className="row">
                <div className="filter-item col">
                    <label style={{ fontWeight: 600, marginBottom: '4px ' }} htmlFor="period">Период:</label>
                    <select className='form-control' id="period"
                        defaultValue={'14'}
                        onChange={e => { setDays(e.target.value) }}
                    >
                        <option selected={defaultValue === 1 ? true : false} value={'1'}>1 день</option>
                        <option selected={defaultValue === 7 ? true : false} value={'7'}>Неделя</option>
                        <option selected={defaultValue === 14 ? true : false} value={'14'}>Последние 14 дней</option>
                        <option selected={defaultValue === 30 ? true : false} value={'30'}>Месяц</option>
                        <option selected={defaultValue === 92 ? true : false} value={'92'}>3 месяца</option>
                    </select>
                </div>
                <div className="filter-item col">
                    <label style={{ fontWeight: 600, marginBottom: '4px ' }} htmlFor="marketplace">Маркетплейс:</label>
                    <select className='form-control' id="marketplace" disabled>
                        <option value="amazon">Wildberries</option>
                    </select>
                </div>
                <div className="filter-item col">
                    <label style={{ fontWeight: 600, marginBottom: '4px ' }} htmlFor="store">Магазин:</label>
                    <select className='form-control' id="store" defaultValue={brandNames ? brandNames[0] : null} onChange={e => changeBrand(e.target.value)}>
                        {
                            brandNames && brandNames.map((brand, i) => (
                                <option key={i} value={brand}>{brand}</option>
                            ))
                        }
                        {/* <option value="store1">Магазин 1</option>
                    <option value="store2">Магазин 2</option>
                    <option value="store3">Магазин 3</option> */}
                    </select>
                </div>
                <div className="filter-item col-2 me-2">
                    <label style={{ fontWeight: 600, marginBottom: '4px ' }} htmlFor="brand">Бренд:</label>
                    <select className='form-control' id="brand" disabled>
                        <option value="brand1">Не выбрано</option>
                        <option value="brand2">Бренд 2</option>
                        <option value="brand3">Бренд 3</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default DashboardFilter