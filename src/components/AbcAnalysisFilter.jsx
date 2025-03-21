import React from "react";
import Period from "./period/Period"

const AbcAnalysisFilter = ({
  shops, setActiveBrand, setSelectedRange, selectedRange, activeBrand
}) => {

  const allShopOptionAsShopObject = {
    id: 0,
    brand_name: "Все",
    is_active: true,
    is_primary_collect: shops.some(_ => _.is_primary_collect),
    is_valid: true,
  };

  const shopArrayFormSelect = [allShopOptionAsShopObject, ...shops]

  const weekAgo = new Date(new Date().setDate(new Date().getDate() - 7))
    .toLocaleDateString("ru")
    ?.split(".")
    .reverse()
    .join("-");
  const twoWeeksAgo = new Date(new Date().setDate(new Date().getDate() - 14))
    .toLocaleDateString("ru")
    ?.split(".")
    .reverse()
    .join("-");
  const monthAgo = new Date(new Date().setDate(new Date().getDate() - 31))
    .toLocaleDateString("ru")
    ?.split(".")
    .reverse()
    .join("-");


  

  return (
    <div className='filter container filter-panel dash-container d-flex'>
      <div className='row w-100'>
        <div className='filter-item col'>
          <Period
            selectedRange={selectedRange}
            setSelectedRange={setSelectedRange}
          />
        </div>
        <div className='filter-item col' style={{ position: "relative" }}>
          <label
            style={{ fontWeight: 600, marginBottom: "4px", display: "block" }}
            htmlFor='store'
          >
            Магазин:
          </label>
          <div style={{ position: "relative" }}>
            <select
              style={{
                width: "100%",
                padding: "1vh 1.75vh",
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                borderRadius: "8px",
                appearance: "none",
                cursor: "pointer",
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
                  <option
                    key={brand.id}
                    value={brand.id}
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
                width: '14px',
                height: '9px',
                // width: "1.5vh",
                // height: "1.5vh",
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
      </div>
      {/* {(currentShop?.is_primary_collect || allShop) && (
        <div className='download-button'>
          <img src={downloadIcon} />
          Скачать Excel
        </div>
      )} */}
    </div>
  );
};

export default AbcAnalysisFilter;
