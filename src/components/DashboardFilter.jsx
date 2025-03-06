import React, { useContext } from 'react';
import DownloadButton from './DownloadButton';
import { ServiceFunctions } from '../service/serviceFunctions';
import AuthContext from '../service/AuthContext';
import { URL } from '../service/config';

const DashboardFilter = ({
  setActiveBrand,
  selectedRange,
  setSelectedRange,
  shops,
  // setChangeBrand,
  // setPrimary,
  activeShopId,
}) => {
  const { authToken } = useContext(AuthContext);
  const currentShop = shops?.find((item) => item.id == activeShopId);
  const shopName = activeShopId == 0 ? 'Все' : currentShop?.brand_name;
  const allShop =
    activeShopId == 0 &&
    shops?.some((item) => item?.is_primary_collect === true);

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
        <div className='filter-item col' style={{ position: 'relative' }}>
          <Period 
            selectedRange={selectedRange}
            setSelectedRange={setSelectedRange}
          />
          {/* <label
            style={{ fontWeight: 600, marginBottom: '4px', display: 'block' }}
            htmlFor='period'
          >
            Период:
          </label>
          <div style={{ position: 'relative' }}>
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
              value={periodValue}
              onChange={(e) => {
                setDays(e.target.value);
              }}
            >
              <option value='7'>7 дней</option>
              <option value='14'>14 дней</option>
              <option value='30'>30 дней</option>
              <option value='90'>90 дней</option>
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
          </div> */}
        </div>

        <div className='filter-item col' style={{ position: 'relative' }}>
          <label
            style={{ fontWeight: 600, marginBottom: '4px', display: 'block' }}
            htmlFor='store'
          >
            Магазин:
          </label>
          <div style={{ position: 'relative' }}>
            <select
              style={{
                minWidth: 220,
                width: '100%',
                padding: '1vh 1.75vh',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                borderRadius: '8px',
                appearance: 'none',
                cursor: 'pointer',
              }}
              className='form-control'
              id='store'
              defaultValue={`${
                activeShopId !== undefined ? activeShopId : shops?.[0]?.id
              }`}
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
                value={`${shops?.[0]?.id}|${shops?.[0]?.is_primary_collect}|${shops?.[0]?.is_valid}`}
                hidden
              >
                {shopName ||
                  shops?.[activeShopId]?.brand_name ||
                  shops?.[0]?.brand_name}
              </option>
              <option value='0'>Все</option>
              {shops &&
                shops?.map((brand) => (
                  <option
                    key={brand.id}
                    value={`${brand.id}|${brand.is_primary_collect}|${brand.is_valid}`}
                  >
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
      </div>
      {(currentShop?.is_primary_collect || allShop) && (
        <DownloadButton handleDownload={handleDownload}/>
      )}
    </div>
  );
};

export default DashboardFilter;
