import React, { useContext } from 'react';
import DownloadButton from './DownloadButton';
import { ServiceFunctions } from '../service/serviceFunctions';
import AuthContext from '../service/AuthContext';
import { URL } from '../service/config';
import Period from './period/Period';
import {fileDownload} from '../service/utils';

const DashboardFilter = ({
  shops, setActiveBrand, setSelectedRange, selectedRange, activeBrand
}) => {
  const { authToken } = useContext(AuthContext);
  

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
    const fileBlob = await ServiceFunctions.getDownloadDashBoard(authToken, selectedRange, activeShopId);
    fileDownload(fileBlob, 'Сводка_продаж.xlsx');
    // fetch(
    //   `${URL}/api/dashboard/download?period=${periodValue}&shop=${activeShopId}`,
    //   {
    //     method: 'GET',
    //     headers: {
    //       authorization: 'JWT ' + authToken,
    //     },
    //   }
    // )
    //   .then((response) => {
    //     return response.blob();
    //   })
    //   .then((blob) => {
    //     const url = window.URL.createObjectURL(new Blob([blob]));
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.setAttribute('download', `Сводка_продаж.xlsx`);
    //     document.body.appendChild(link);
    //     link.click();
    //     link.parentNode.removeChild(link);
    //   })
    //   .catch((e) => console.error(e));
  };

  const allShopOptionAsShopObject = {
    id: 0,
    brand_name: "Все",
    is_active: true,
    is_primary_collect: shops.some(_ => _.is_primary_collect),
    is_valid: true,
  };

  const shopArrayFormSelect = [allShopOptionAsShopObject, ...shops]

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
              value={activeBrand?.id}
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
                position: 'absolute',
                right: '1.75vh',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '14px',
                height: '9px',
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
      {(!activeBrand?.is_primary_collect) && (
        <DownloadButton handleDownload={handleDownload}/>
      )}
    </div>
  );
};

export default DashboardFilter;
