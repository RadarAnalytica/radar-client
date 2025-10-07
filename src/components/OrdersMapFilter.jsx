import React from 'react';
import Period from './period/Period';
import { format } from 'date-fns';

const OrdersMapFilter = ({
  shops,
  setActiveBrand,
  selectedRange,
  setSelectedRange,
  activeBrand
}) => {
  const allShopOptionAsShopObject = {
    id: 0,
    brand_name: "Все",
    is_active: true,
    is_primary_collect: shops.some(_ => _.is_primary_collect),
    is_valid: true,
  };
  const shopArrayFormSelect = [allShopOptionAsShopObject, ...shops];
  console.log(shopArrayFormSelect);
  return (
    <div className='filter container dash-container p-3 pb-4 pt-0 d-flex'>
      <div className='row w-100'>
        <div className='filter-item col'>
          <Period
            setSelectedRange={setSelectedRange}
            selectedRange={selectedRange}
          />
        </div>
        <div className='filter-item col'>
          <label
            htmlFor='store'
            style={{ fontWeight: 600, marginBottom: '4px ' }}
          >
            Магазин:
          </label>
          <div style={{ position: 'relative' }}>
            <select
              style={{
                padding: '1vh 1.75vh',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                borderRadius: '8px'
              }}
              className='form-control'
              id='store'
              value={activeBrand.id}
              onChange={(e) => {
                const { value } = e.target;
                const selectedShop = shopArrayFormSelect.find(_ => _.id.toString() === value);
                setActiveBrand(selectedShop);
              }}
            >
              {shopArrayFormSelect &&
                shopArrayFormSelect?.map((brand) => (
                  <option key={brand.id} value={brand.id.toString()}>
                    {brand.brand_name}
                  </option>
                ))}
            </select>
            <svg
              style={{
                position: 'absolute',
                right: '1.75vh',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '14px',
                height: '9px'
              }}
              viewBox='0 0 28 17'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M2 2L14 14L26 2'
                stroke='rgba(140, 140, 140, 1)'
                strokeWidth='4'
                strokeLinecap='round'
              />
            </svg>
          </div>
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
  );
};

export default OrdersMapFilter;
