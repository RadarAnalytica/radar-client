import React from 'react';
import Period from './period/Period';
import { format } from 'date-fns';

const OrdersMapFilter = ({
  changeBrand,
  shops,
  setChangeBrand,
  activeShopId,
  selectedRange,
  setSelectedRange
}) => {
  const shopName =
    activeShopId == 0
      ? 'Все'
      : shops?.find((item) => item.id == activeShopId)?.brand_name;
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
          <div style={{ position: "relative" }}>
            <select
              style={{
                padding: '1vh 1.75vh',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                borderRadius: '8px',
                appearance: "none",
              }}
              className='form-control'
              id='store'
              defaultValue={`${
                activeShopId != undefined ? activeShopId : shops?.[0]?.id
              }`}
              onChange={(e) => {
                const firstValue = e.target.value.split('|')[0];
                const secondValue = e.target.value.split('|')[1];
                const lastValue = e.target.value.split('|')[2];
                // setPrimary(lastValue);

                setChangeBrand(secondValue);
                changeBrand(firstValue);
              }}
            >
              <option
                value={`${shops?.[0]?.id}|${shops?.[0]?.is_primary_collect}|${shops?.[0]?.is_valid}`}
                hidden
              >
                {shopName || shops?.[0]?.brand_name}
              </option>
              <option value='0'>Все</option>
              {shops &&
                shops.map((brand, i) => (
                  <option
                    key={i}
                    value={`${brand.id}|${brand.is_primary_collect}|${brand.is_valid}`}
                  >
                    {brand.brand_name}
                  </option>
                ))}
            </select>
            <svg
              style={{
                position: "absolute",
                right: "1.75vh",
                top: "50%",
                transform: "translateY(-50%)",
                width: "1.5vh",
                height: "1.5vh",
                pointerEvents: "none",
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
