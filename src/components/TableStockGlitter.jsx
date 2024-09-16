import React, { useState } from 'react';
import sortArrow from '../assets/sortarrow.svg';
import SortArrows from './SortArrows';
import TableStock from './TableStock';

const TableStockGlitter = ({
  dataSaleDay,
  setDataSaleDay,
  dataOrderDay,
  setDataOrderDay,
  activeTabDay,
}) => {
  const [asc, setAsc] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const renderSortArrows = (columnKey) => {
    return <SortArrows columnKey={columnKey} sortConfig={sortConfig} />;
  };

  const sortData = (key) => {
    const sortedData = [...dataSaleDay].sort((a, b) => {
      if (typeof a[key] === 'number' && typeof b[key] === 'number') {
        return asc ? a[key] - b[key] : b[key] - a[key];
      } else {
        return asc
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      }
    });
    setAsc(!asc);
    return setDataSaleDay(sortedData);
  };

  const dataTable = [
    {
      date: '15 янв, 2023',
      sales: 1,
      amount: '360,00 ₽',
      returns: 0,
      logisticsTo: '0,00 ₽',
      logisticsFrom: '0,00 ₽',
      fines: '0,00 ₽',
      commission: '0,00 ₽',
      profit: '300,00 ₽',
    },
    // ... more data objects
  ];

  return (
    //   <div style={{ width: '100%' }}>
    //     <div className='tableWrapper'>
    //   <div className='headerRow'>
    //     {columns?.map((column, index) => (
    //       <div key={index} className={`${headerCell} ${[column.className]}`}>
    //         <span>{column.header}</span>
    //         <span className='sortIcons'>
    //           <img src={sortArrow} alt='sortArrow' onClick={() => sortData(column.key)} />
    //         </span>
    //       </div>
    //     ))}
    //   </div>
    //   {data.map((row, rowIndex) => (
    //     <div key={rowIndex} className='dataRow'>
    //       {columns?.map((column, cellIndex) => (
    //         <span key={cellIndex} className={`${dataCell} ${[column.className]}`}>
    //           {row[column.key]}
    //         </span>
    //       ))}
    //     </div>
    //   ))}
    // </div>
    // </div>
    <>
      <div className='custom-table' style={{ marginLeft: '3.5vw' }}>
        <div className='table-container'>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {/* Fixed columns */}
            <div
              className={`fixed-columns ${
                isScrolled ? 'fixed-columns-shadow' : ''
              }`}
            >
              <div className='column'>
                {/* <div
                    className='cell header-cell goods-cell'
                    style={{ border: 'none', paddingLeft: '50px' }}
                  >
                    О товаре
                  </div> */}
                <div
                  className='cell'
                  onClick={() => sortData('productName')}
                  style={{
                    minHeight: '70px',
                    borderTopLeftRadius: '12px',
                    borderBottomLeftRadius: '12px',
                  }}
                >
                  Дата
                  <div
                    className='icon-sort-wrap'
                    style={{ background: 'transparent' }}
                    onClick={() => sortData('saleSum')}
                  >
                    {renderSortArrows('productName')}
                  </div>
                </div>
                {dataTable.map((row, index) => (
                  <div
                    key={index}
                    className='cell data-cell'
                    style={{
                      minWidth: '260px',
                      marginLeft: '17px',
                      padding: '10px',
                      zIndex: '1',
                    }}
                  >
                    {/* <div className='empty-box'>
                        <img
                          src={row.photo}
                          style={{
                            width: '30px',
                            height: '40px',
                            objectFit: 'cover',
                            borderRadius: '3px',
                          }}
                          onError={(e) => {
                            e.target.style.backgroundColor = '#D3D3D3';
                            e.target.alt = '';
                            e.target.src =
                              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/HHpC6UAAAAASUVORK5CYII=';
                          }}
                        />
                      </div> */}
                    <span
                      style={{
                        color: 'rgba(83, 41, 255, 1)',
                        width: '200px',
                        height: '100%',
                        cursor: 'pointer',
                      }}
                      // onClick={() => handleClickProductName(row)}
                    >
                      {row.date}
                    </span>
                  </div>
                ))}
              </div>
              <div className='column' style={{ width: '200px' }}>
                {/* <div
                    className='cell header-cell'
                    style={{ border: 'none' }}
                  ></div> */}
                <div
                  className='cell'
                  style={{
                    width: '200px',
                    border: 'none',
                    minHeight: '70px',
                  }}
                  onClick={() => sortData('brandName')}
                >
                  Продажи
                  <div
                    className='icon-sort-wrap'
                    style={{ background: 'transparent' }}
                    onClick={() => sortData('saleSum')}
                  >
                    {renderSortArrows('brandName')}
                  </div>
                </div>
                {dataTable.map((row, index) => (
                  <div
                    key={index}
                    className='cell data-cell'
                    style={{ minWidth: '200px', zIndex: '1' }}
                  >
                    {row.sales}
                  </div>
                ))}
              </div>
              <div className='column'>
                {/* <div
                    className='cell header-cell'
                    style={{ minWidth: '200px', border: 'none' }}
                  ></div> */}
                <div
                  className='cell'
                  style={{
                    minWidth: '200px',
                    minHeight: '70px',
                    border: 'none',
                  }}
                  onClick={() => sortData('vendorСode')}
                >
                  Сумма продаж
                  <div
                    className='icon-sort-wrap'
                    style={{ background: 'transparent' }}
                    onClick={() => sortData('saleSum')}
                  >
                    {renderSortArrows('vendorСode')}
                  </div>
                </div>
                {dataTable.map((row, index) => (
                  <div
                    key={index}
                    className='cell data-cell'
                    style={{ minWidth: '200px', zIndex: '1' }}
                  >
                    {row.amount}
                  </div>
                ))}
              </div>
            </div>
            {/* Scrollable columns */}
            <div className='scrollable-columns'>
              <div className='column'>
                {/* <div
                    className='cell header-cell'
                    style={{ minWidth: '100px', border: 'none' }}
                  ></div> */}
                <div
                  className='cell'
                  style={{
                    minWidth: '100px',
                    minHeight: '70px',
                    border: 'none',
                  }}
                  onClick={() => sortData('sku')}
                >
                  Возвраты, шт
                  <div
                    className='icon-sort-wrap'
                    style={{ background: 'transparent' }}
                    onClick={() => sortData('saleSum')}
                  >
                    {renderSortArrows('sku')}
                  </div>
                </div>
                {dataTable.map((row, index) => (
                  <div
                    key={index}
                    className='cell data-cell'
                    style={{ minWidth: '100px' }}
                  >
                    {row.returns}
                  </div>
                ))}
              </div>
              <div className='column'>
                {/* <div
                    className='cell header-cell'
                    style={{ minWidth: '100px', border: 'none' }}
                  ></div> */}
                <div
                  className='cell '
                  style={{
                    minWidth: '100px',
                    minHeight: '70px',
                    border: 'none',
                  }}
                  onClick={() => sortData('size')}
                >
                  Логистика к клиенту
                  <div
                    className='icon-sort-wrap'
                    style={{ background: 'transparent' }}
                    onClick={() => sortData('saleSum')}
                  >
                    {renderSortArrows('size')}
                  </div>
                </div>
                {dataTable.map((row, index) => (
                  <div
                    key={index}
                    className='cell data-cell'
                    style={{ minWidth: '100px' }}
                  >
                    {row.logisticsTo}
                  </div>
                ))}
              </div>
              <div className='column'>
                {/* <div
                    className='cell header-cell'
                    style={{ minWidth: '200px', border: 'none' }}
                  ></div> */}
                <div
                  className='cell'
                  style={{
                    minWidth: '200px',
                    minHeight: '70px',
                    border: 'none',
                  }}
                  onClick={() => sortData('category')}
                >
                  Логистика от клиента
                  <div
                    className='icon-sort-wrap'
                    style={{ background: 'transparent' }}
                    onClick={() => sortData('saleSum')}
                  >
                    {renderSortArrows('category')}
                  </div>
                </div>
                {dataTable.map((row, index) => (
                  <div
                    key={index}
                    className='cell data-cell'
                    style={{ minWidth: '200px' }}
                  >
                    {row.logisticsFrom}
                  </div>
                ))}
              </div>
              <div className='column'>
                {/* <div
                    className='cell header-cell'
                    style={{
                      minWidth: '150px',
                      borderRight: 'none',
                      borderBottom: 'none',
                      borderTop: 'none',
                      borderLeft: '1px solid #e0e0e0',
                    }}
                  >
                    Продажи
                  </div> */}
                <div
                  className='cell'
                  style={{
                    minWidth: '150px',
                    minHeight: '70px',
                    borderRight: 'none',
                    borderBottom: 'none',
                    borderTop: 'none',
                    borderLeft: '1px solid #e0e0e0',
                  }}
                  onClick={() => sortData('saleSum')}
                >
                  Штрафы
                  <div
                    className='icon-sort-wrap'
                    style={{ background: 'transparent' }}
                    onClick={() => sortData('saleSum')}
                  >
                    {renderSortArrows('saleSum')}
                  </div>
                </div>
                {dataTable.map((row, index) => (
                  <div
                    key={index}
                    className='cell data-cell'
                    style={{
                      minWidth: '150px',
                      borderLeft: '1px solid #e0e0e0',
                    }}
                  >
                    {row.fines} ₽
                  </div>
                ))}
              </div>
              <div className='column'>
                {/* <div
                    className='cell header-cell'
                    style={{ minWidth: '100px', border: 'none' }}
                  ></div> */}
                <div
                  className='cell'
                  style={{
                    minWidth: '100px',
                    minHeight: '70px',
                    border: 'none',
                  }}
                >
                  Комиссия
                  <div
                    className='icon-sort-wrap'
                    style={{ background: 'transparent' }}
                    onClick={() => sortData('quantity')}
                  >
                    {renderSortArrows('quantity')}
                  </div>
                </div>
                {dataTable.map((row, index) => (
                  <div
                    key={index}
                    className='cell data-cell'
                    style={{ minWidth: '100px' }}
                  >
                    {row.commission} ₽
                  </div>
                ))}
              </div>
              <div className='column'>
                {/* <div
                    className='cell header-cell'
                    style={{ minWidth: '150px', border: 'none' }}
                  ></div> */}
                <div
                  className='cell'
                  style={{
                    minWidth: '150px',
                    minHeight: '70px',
                    border: 'none',
                  }}
                  onClick={() => sortData('lessReturns')}
                >
                  Маржинальная
                  <br />
                  прибыль
                  <div
                    className='icon-sort-wrap'
                    style={{ background: 'transparent' }}
                    onClick={() => sortData('quantity')}
                  >
                    {renderSortArrows('lessReturns')}
                  </div>
                </div>
                {dataTable.map((row, index) => (
                  <div
                    key={index}
                    className='cell data-cell'
                    style={{ minWidth: '150px' }}
                  >
                    {row.profit} ₽
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableStockGlitter;
