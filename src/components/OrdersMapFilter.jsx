import React from 'react';

const OrdersMapFilter = ({
  brandNames,
  changeBrand,
  defaultValue,
  setDays,
  shops,
  setChangeBrand,
  setPrimary,
  activeShopId,
}) => {
  const shopName =
    activeShopId == 0
      ? 'Все'
      : shops?.find((item) => item.id == activeShopId)?.brand_name;
  return (
    <div className='filter container dash-container p-3 pb-4 pt-0 d-flex'>
      <div className='row'>
        <div className='filter-item col' style={{ maxWidth: '12vw' }}>
          <label
            htmlFor='period'
            style={{ fontWeight: 600, marginBottom: '4px ' }}
          >
            Период:
          </label>
          <select
            style={{
              padding: '1vh 1.75vh',
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              borderRadius: '8px',
            }}
            className='form-control'
            id='period'
            defaultValue={'30'}
            onChange={(e) => setDays(e.target.value)}
          >
            {/* <option selected={defaultValue === 1 ? true : false} value={'1'}>1 день</option> */}
            <option selected={defaultValue === 7 ? true : false} value={'7'}>
              7 дней
            </option>
            <option selected={defaultValue === 14 ? true : false} value={'14'}>
              14 дней
            </option>
            <option selected={defaultValue === 30 ? true : false} value={'30'}>
              30 дней
            </option>
            <option selected={defaultValue === 90 ? true : false} value={'90'}>
              90 дней
            </option>
          </select>
          <svg
            style={{
              position: 'absolute',
              right: '1.75vw',
              top: '5.5vh',
              width: '1.5vh',
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
        {/* <div className="filter-item col me-2" st0le={{maxWidth: '12vw'}}>
                    <label htmlFor="marketplace">Маркетплейс:</label>
                    <select className='form-control' id="marketplace" disabled>
                        <option value="wildberries">Wildeberries</option>
                    </select>
                </div> */}
        <div className='filter-item col' style={{ position: 'relative' }}>
          <label
            style={{ fontWeight: 600, marginBottom: '4px', display: 'block' }}
            htmlFor='store'
          >
            Магазин:
          </label>
          <div style={{ position: 'relative', width: '13vw' }}>
            <select
              style={{
                width: '100%',
                padding: '1vh 1.75vh',
                paddingRight: '3vh',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                borderRadius: '8px',
                appearance: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              className='form-control'
              id='store'
              defaultValue={`${activeShopId !== undefined ? activeShopId : shops?.[0]?.id
                }`}
              onChange={(e) => {
                const [firstValue, secondValue, lastValue] = e.target.value.split('|');
                setPrimary(lastValue);
                setChangeBrand(secondValue);
                changeBrand(firstValue);
              }}
              onMouseEnter={(e) => {
                const selectedOption = e.target.options[e.target.selectedIndex];
                const tooltip = document.getElementById('shop-tooltip');
                if (selectedOption.text.length > 15) {
                  tooltip.style.display = 'block';
                  tooltip.textContent = selectedOption.text;
                }
              }}
              onMouseLeave={() => {
                document.getElementById('shop-tooltip').style.display = 'none';
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
                shops.map((brand) => (
                  <option
                    key={brand.id}
                    value={`${brand.id}|${brand.is_primary_collect}|${brand.is_valid}`}
                  >
                    {brand.brand_name.length > 15
                      ? `${brand.brand_name.slice(0, 15)}...`
                      : brand.brand_name}
                  </option>
                ))}
            </select>
            <div
              id='shop-tooltip'
              style={{
                display: 'none',
                position: 'absolute',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '5px',
                whiteSpace: 'nowrap',
                fontSize: '12px',
                zIndex: 1000,
                left: '20px',
                top: '40px',
                textAlign: 'center',
              }}
            ></div>
            <svg
              style={{
                position: 'absolute',
                right: '1.75vh',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '1.5vh',
                height: '1.5vh',
                pointerEvents: 'none',
                marginLeft: '5px',
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
