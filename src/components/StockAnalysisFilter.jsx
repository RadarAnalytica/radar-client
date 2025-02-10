import React from "react";

const StockAnalysisFilter = ({ shops, setActiveBrand, setDays, activeShopId }) => {
  const currentShop = shops?.find((item) => item.id == activeShopId);
  const shopName = activeShopId == 0 ? 'Все' : currentShop?.brand_name;

  return (
    <div className='filter container dash-container pb-4 pt-0 d-flex  dashboardMobile'>
      <div className='row'>
        <div className='filter-item col'>
          <label
            style={{ fontWeight: 600, marginBottom: '4px ' }}
            htmlFor='period'
          >
            Период
          </label>
          <div className="period-select">
            <select
              style={{
                width: '100%',
                padding: '1vh 1.75vh',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                borderRadius: '8px',
                appearance: 'none',
                cursor: 'pointer',
              }}
              className='form-control'
              id='period'
              defaultValue={'30'}
              onChange={(e) => {
                setDays(e.target.value);
              }}
            >
              {/* <option selected={defaultValue === 1 ? true : false} value={'1'}>1 день</option> */}
              <option value={'7'}>7 дней</option>
              <option value={'14'}>14 дней</option>
              <option value={'30'}>30 дней</option>
              <option value={'90'}>90 дней</option>
            </select>
            <svg
              style={{
                position: 'absolute',
                right: '1.75vh',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '1.5vh',
                height: '1.5vh',
                pointerEvents: 'none',
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
        {/* <div className="filter-item col">
                    <label style={{ fontWeight: 600, marginBottom: '4px ' }} htmlFor="marketplace">Маркетплейс:</label>
                    <select style={{padding: '1vh 1.75vh'}} className='form-control' id="marketplace" disabled>
                        <option value="amazon" style={{ opacity: 0.8 }}>Не выбрано</option>
                        <option value="amazon">Wildberries</option>
                    </select>
                    <svg style={{ position: 'absolute', right: '1.75vw', top: '5.5vh', width: '1.5vh', }} viewBox="0 0 28 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 2L14 14L26 2" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                </div> */}
        <div className='filter-item col' style={{ position: 'relative' }}>
          <label
            style={{ fontWeight: 600, marginBottom: '4px', display: 'block' }}
            htmlFor='store'
          >
            Магазин
          </label>
          <div className="shop-select">
            <select
              style={{
                width: '100%',
                padding: '1vh 1.75vh',
                paddingRight: "3vh",
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
                const firstValue = e.target.value.split('|')[0];
                setActiveBrand(firstValue);
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
                {shopName ||
                  shops?.[activeShopId]?.brand_name ||
                  shops?.[0]?.brand_name}
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
        {/* <div className="filter-item col-2 me-2">
                    <label style={{ fontWeight: 600, marginBottom: '4px ' }} htmlFor="brand">Бренд:</label>
                    <select className='form-control' id="brand" disabled>
                        <option value="brand1">Не выбрано</option>
                        <option value="brand2">Бренд 2</option>
                        <option value="brand3">Бренд 3</option>
                    </select>
                    <svg style={{ position: 'absolute', right: '1.5vw', top: '5.25vh', width: '1.5vh', }} viewBox="0 0 28 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 2L14 14L26 2" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                </div> */}
      </div>
    </div>
  );
};

export default StockAnalysisFilter;
