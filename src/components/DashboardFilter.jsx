import React, { useContext } from 'react';
import DownloadButton from './DownloadButton';
import { ServiceFunctions } from '../service/serviceFunctions';
import AuthContext from '../service/AuthContext';
import { URL } from '../service/config';

const DashboardFilter = ({
  setActiveBrand,
  periodValue,
  setDays,
  shops,
  setChangeBrand,
  setPrimary,
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
          <label
            style={{ fontWeight: 600, marginBottom: '4px', display: 'block' }}
            htmlFor='period'
          >
            Период:
          </label>
          <div style={{ position: 'relative', width: "13vw" }}>
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
          </div>
        </div>

        <div className='filter-item col' style={{ position: 'relative' }}>
          <label
            style={{ fontWeight: 600, marginBottom: '4px', display: 'block' }}
            htmlFor='store'
          >
            Магазин:
          </label>
          <div style={{ position: 'relative', width: "13vw" }}>
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
              defaultValue={activeShopId !== undefined ? activeShopId : shops?.[0]?.id}
              onChange={(e) => {
                const [firstValue, secondValue, lastValue] = e.target.value.split('|');
                setPrimary(lastValue);
                setChangeBrand(secondValue);
                setActiveBrand(firstValue);
              }}
              onMouseEnter={(e) => {
                const selectedOption = e.target.options[e.target.selectedIndex];
                const tooltip = document.getElementById('shop-tooltip');
                if (selectedOption.text.length > 15) {
                  tooltip.style.display = 'block';
                  tooltip.textContent = selectedOption.text;
                  // tooltip.style.left = `${e.target.getBoundingClientRect().left}px`;
                  // tooltip.style.top = `${e.target.getBoundingClientRect().bottom + 5}px`;
                }
              }}
              onMouseLeave={() => {
                document.getElementById('shop-tooltip').style.display = 'none';
              }}
            >
              <option value='0'>Все</option>
              {shops &&
                shops.map((brand) => (
                  <option key={brand.id} value={`${brand.id}|${brand.is_primary_collect}|${brand.is_valid}`}>
                    {brand.brand_name.length > 15 ? `${brand.brand_name.slice(0, 15)}...` : brand.brand_name}
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
                left: "20px",
                top: "40px",
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
                marginLeft: "5px",
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
        <DownloadButton handleDownload={handleDownload} />
      )}
    </div>
  );
};

export default DashboardFilter;
