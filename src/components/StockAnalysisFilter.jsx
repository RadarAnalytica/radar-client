import React from "react";
import Period from "./period/Period";

const StockAnalysisFilter = ({shops, setActiveBrand, setSelectedRange, selectedRange, activeBrand}) => {
  const allShopOptionAsShopObject = {
    id: 0,
    brand_name: "Все",
    is_active: true,
    is_primary_collect: shops.some(_ => _.is_primary_collect),
    is_valid: true,
  };

  const shopArrayFormSelect = [allShopOptionAsShopObject, ...shops]
  return (
    <div className='filter container filter-panel dash-container d-flex' style={{ marginTop: '16px'}}>
      <div className='row w-100 flex gap-3'>
        <div className='filter-item col'>
          <Period 
            selectedRange={selectedRange}
            setSelectedRange={setSelectedRange}
          />
        </div>
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
              value={activeBrand.id}
              onChange={(e) => {
                const { value } = e.target
                const selectedShop = shopArrayFormSelect.find(_ => _.id.toString() === value)
                setActiveBrand(selectedShop)
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
                height: '14px',
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
