import React from "react";
import Period from "./period/Period";

const StockAnalysisFilter = ({shops, setActiveBrand, setSelectedRange, selectedRange, activeShopId}) => {
  const currentShop = shops?.find((item) => item.id == activeShopId);
  const shopName = activeShopId == 0 ? 'Все' : currentShop?.brand_name;

  return (
    <div className='filter container dash-container p-3 pb-4 pt-0 d-flex'>
      <div className='row w-100'>
        <div className='filter-item col'>
          <Period 
            selectedRange={selectedRange}
            setSelectedRange={setSelectedRange}
          />
          {/* <label
            style={{ fontWeight: 600, marginBottom: '4px ' }}
            htmlFor='period'
          >
            Период
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
            onChange={(e) => {
              setDays(e.target.value);
            }}
          >
            <option value={'7'}>7 дней</option>
            <option value={'14'}>14 дней</option>
            <option value={'30'}>30 дней</option>
            <option value={'90'}>90 дней</option>
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
          </svg> */}
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
        <div className='filter-item col'>
          <label
            style={{ display: 'block', fontWeight: 600, marginBottom: '4px ' }}
            htmlFor='store'
          >
            Магазин:
          </label>
          <div style={{position: 'relative'}}>
            <select
              style={{
                padding: '1vh 1.75vh',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                borderRadius: '8px',
              }}
              className='form-control'
              id='store'
              defaultValue={`${
                activeShopId !== undefined ? activeShopId : shops?.[0]?.id
              }`}
              onChange={(e) => {
                const firstValue = e.target.value.split('|')[0];
                // const secondValue = e.target.value.split('|')[1];
                // const lastValue = e.target.value.split('|')[2];
                // setPrimary(lastValue);
                // setChangeBrand(secondValue);
                setActiveBrand(firstValue);
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
              <option value='0'>
                Все
              </option>
              {shops &&
                shops?.map((brand) => (
                  <option key={brand.id} value={`${brand.id}|${brand.is_primary_collect}|${brand.is_valid}`}>
                    {brand.brand_name}
                  </option>
                ))}
              {/* <option value="store1">Магазин 1</option>
                      <option value="store2">Магазин 2</option>
                      <option value="store3">Магазин 3</option> */}
            </select>
            <svg
              style={{
                position: 'absolute',
                right: '1.75vh',
                top: '50%',
                width: '1.5vh',
                height: '1.5vh',
                pointerEvents: 'none',
                transform: 'translateY(-50%)'
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
