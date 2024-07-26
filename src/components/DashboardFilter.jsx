import React, { useContext } from 'react';
import downloadIcon from '../pages/images/Download.svg';
import { ServiceFunctions } from '../service/serviceFunctions';
import AuthContext from '../service/AuthContext';
import { URL } from '../service/config';

const DashboardFilter = ({
  setActiveBrand,
  periodValue,
  setDays,
  shop,
  setChangeBrand,
  setPrimary,
  activeShopId,
}) => {
  const { authToken } = useContext(AuthContext);
  const currentShop = shop?.find((item) => item.id == activeShopId);
  const shopName = currentShop?.brand_name;

  const weekAgo = new Date(new Date().setDate(new Date().getDate() - 7))
    .toLocaleDateString('ru')
    ?.split('.')
    .reverse()
    .join('-');
  const twoWeeksAgo = new Date(new Date().setDate(new Date().getDate() - 14))
    .toLocaleDateString('ru')
    ?.split('.')
    .reverse()
    .join('-');
  const monthAgo = new Date(new Date().setDate(new Date().getDate() - 31))
    .toLocaleDateString('ru')
    ?.split('.')
    .reverse()
    .join('-');

  const handleDownload = async () => {
    fetch(
      `${URL}/api/dashboard/download?period=${periodValue}&shop=${activeShopId}`,
      {
        method: 'GET',
        headers: {
          authorization: 'JWT ' + authToken,
        },
      }
    )
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Сводка_продаж.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((e) => console.error(e));
  };

  return (
    <div className='filter container filter-panel  dash-container p-3 pb-4 pt-0 d-flex'>
      <div className='row'>
        <div className='filter-item col'>
          <label
            style={{ fontWeight: 600, marginBottom: '4px ' }}
            htmlFor='period'
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
            value={periodValue}
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
          </svg>
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
            style={{ fontWeight: 600, marginBottom: '4px ' }}
            htmlFor='store'
          >
            Магазин:
          </label>
          <select
            style={{
              padding: '1vh 1.75vh',
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              borderRadius: '8px',
            }}
            className='form-control'
            id='store'
            defaultValue={activeShopId || `${shop?.[0]?.id}`}
            onChange={(e) => {
              const firstValue = e.target.value.split('|')[0];
              const secondValue = e.target.value.split('|')[1];
              const lastValue = e.target.value.split('|')[2];
              setPrimary(lastValue);
              setChangeBrand(secondValue);
              setActiveBrand(firstValue);
            }}
          >
            <option
              value={`${shop?.[0]?.id}|${shop?.[0]?.is_primary_collect}|${shop?.[0]?.is_valid}`}
              hidden
            >
              {shopName ||
                shop?.[activeShopId]?.brand_name ||
                shop?.[0]?.brand_name}
            </option>
            <option value='0'>Все</option>
            {shop &&
              shop?.map((brand) => (
                <option
                  key={brand.id}
                  value={`${brand.id}|${brand.is_primary_collect}|${brand.is_valid}`}
                >
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
      {currentShop.is_primary_collect && (
        <div className='download-button' onClick={handleDownload}>
          <img src={downloadIcon} />
          Скачать Excel
        </div>
      )}
    </div>
  );
};

export default DashboardFilter;
