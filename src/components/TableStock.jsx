import React, { useState, useCallback, useEffect, useRef } from 'react';
import SortArrows from './SortArrows';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../service/utils';

const VIRTUAL_QUANTITY = 300;

const TableStock = ({ data, setDataTable, loading }) => {
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [isScrolled, setIsScrolled] = useState(false);
  const [ dataTable, setFilteredDataTable ] = useState()
  const [ virtualLimit, setVirtualLimit ] = useState({min: 0, max: 100})


  useEffect(() => {
    if (data) {
      const filteredData = [];
      data.forEach((_, id) => {
        if (id >= virtualLimit.min && id <= virtualLimit.max) {
          filteredData.push(_)
        }
      })
      setFilteredDataTable(filteredData)
    }
   
  }, [data, virtualLimit])

  const observerRef = useRef(null);
  const containerRef = useRef(null)
  const bottomObserverOptions = {
      root: containerRef.current,
      rootMargin: '0px 0px 70px 0px',
      threshold: 0.1,
  }

  useEffect(() => {
    const bottomObserver = new IntersectionObserver((entries) => {
     
        const [entry] = entries;
        if (dataTable && entry.isIntersecting && virtualLimit.max < dataTable.length + 100) {
          let newMinLimit = virtualLimit.min;
          let newMaxLimit = virtualLimit.max + 100;
            setVirtualLimit(
              {
                min: newMinLimit,
                max: newMaxLimit,
              }
            )
        }
    }, bottomObserverOptions);


    const currentRef = observerRef.current;
    if (currentRef) {
      bottomObserver.observe(currentRef);
    }

    

    return () => {
        if (currentRef) {
          bottomObserver.unobserve(currentRef);
        }
    };
}, [observerRef, virtualLimit, dataTable, bottomObserverOptions]);
  

  const handleMouseEnter = (e) => {
    const element = e.target;
    const isTruncated = element.scrollHeight > element.clientHeight;
    element.title = isTruncated ? element.textContent : '';
  };

  const sortData = useCallback(
    (key) => {
      let direction = 'asc';
      if (sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
      }
      const sortedData = [...dataTable].sort((a, b) => {
        if (typeof a[key] === 'number' && typeof b[key] === 'number') {
          return direction === 'asc' ? a[key] - b[key] : b[key] - a[key];
        } else {
          console.log(a, b)
          return direction === 'asc'
            ? a[key].localeCompare(b[key])
            : b[key].localeCompare(a[key]);
        }
      });
      setSortConfig({ key, direction });
      setDataTable(sortedData);
    },
    [dataTable, sortConfig]
  );

  const renderSortArrows = (columnKey) => {
    return <SortArrows columnKey={columnKey} sortConfig={sortConfig} />;
  };

  

  
  useEffect(() => {
    const handleScroll = () => {
      const tableContainer = document.querySelector('.custom-table');
      if (tableContainer) {
        setIsScrolled(tableContainer.scrollLeft > 0.1);
      }
    };

    const tableContainer = document.querySelector('.custom-table');
    if (tableContainer) {
      tableContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (tableContainer) {
        tableContainer.removeEventListener('scroll', handleScroll);
      }
    };

    
  }, []);

  // const handleClickProductName = (shop) => {
  //   navigate(`/product/${shop.sku}`);
  // };

  function formatNumber(num) {
    if (num == null) return ''; // Return an empty string or any default value for null/undefined
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100%', overflow: 'hidden'}} ref={containerRef}>
      {/* <div style={{ width: '3.5vw', height: '100%' }}></div> */}
      <div 
        className='custom-table' 
        style=
        {{ 
          overflow: loading ? 'hidden' : '',
          maxHeight: '650px',
        }}
      >
        <div className='table-container' style={{ minWidth: '100%'}}>
          {/* {dataTable.length === 0 && 
            <div
              className='cell header-cell'
              style={{paddingLeft: 50, background: 'none', border: 'none' }}
            >
              Ничего не найдено
            </div> } */}
          {(dataTable === undefined || loading) && (
            <div
              className='d-flex flex-column align-items-center justify-content-center'
              style={{
                width: '100%',
                height: '100%',
                padding: '10%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                background: 'white',
                zIndex: 999
              }}
            >
              <span className='loader'></span>
            </div>
          )}
          
         {dataTable && dataTable.length === 0 && (
          <div
              className='cell header-cell'
              style={{paddingLeft: 50, background: 'none', border: 'none' }}
            >
              Ничего не найдено
            </div>
         )

          }
         {dataTable && dataTable.length > 0 &&
         (
            <div style={{ display: 'flex', flexDirection: 'row', background: 'white' }}>
              {/* Fixed columns */}
              <div className={`fixed-columns ${isScrolled ? 'fixed-columns-shadow' : ''}`}>
                <div className='column goods-cell'>
                  <div
                    className='cell header-cell goods-cell'
                    style={{ border: 'none', paddingLeft: '50px' }}
                  >
                    О товаре
                  </div>
                  <div
                    className='goods-cell-header'
                    onClick={() => sortData('productName')}
                    style={{ minHeight: '70px', borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px' }}
                  >
                    Товар
                    <div
                      className='icon-sort-wrap'
                      style={{ background: 'transparent' }}
                    >
                      {renderSortArrows('productName')}
                    </div>
                  </div>
                  {dataTable.map((row, index) => (
                    <div
                      key={index}
                      className='cell data-cell goods-cell'
                      style={{
                        minWidth: '260px',
                        marginLeft: '17px',
                        padding: '10px',
                        zIndex: '1',
                      }}
                      ref={observerRef}
                    >
                      <div className='empty-box'>
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
                      </div>
                      <span
                        onMouseEnter={handleMouseEnter}
                        style={{
                          color: 'rgba(83, 41, 255, 1)',
                          width: '200px',
                          height: '2.5rem',
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          textOverflow: 'ellipsis',
                          // cursor: 'pointer',
                        }}
                        title={row.productName}
                        // onClick={() => handleClickProductName(row)}
                      >
                        {row.productName}
                      </span>
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{ minWidth: '200px', border: 'none' }}
                  ></div>
                  <div
                    className='cell cell-header'
                    style={{
                      maxWidth: '200px', 
                      minWidth: '150px',
                      minHeight: '70px',
                      border: 'none',
                    }}
                    onClick={() => sortData('vendorСode')}
                  >
                    Артикул
                    <div
                      className='icon-sort-wrap'
                      style={{ background: 'transparent' }}
                    >
                      {renderSortArrows('vendorСode')}
                    </div>
                  </div>
                  {dataTable.map((row, index) => (
                    <div
                      key={index}
                      className='cell data-cell'
                      style={{ maxWidth: '200px', minWidth: '150px', zIndex: '1' }}
                    >
                      <div className='text-truncate' title={row.vendorСode}>
                        {row.vendorСode}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Scrollable columns */}
              <div className='scrollable-columns'>
              <div className='column' style={{ width: '200px' }}>
                  <div
                    className='cell header-cell'
                    style={{ border: 'none' }}
                  ></div>
                  <div
                    className='cell goods-cell cell-header'
                    style={{
                      width: '200px',
                      border: 'none',
                      minHeight: '70px',
                    }}
                    onClick={() => sortData('brandName')}
                  >
                    Бренд
                    <div
                      className='icon-sort-wrap'
                      style={{ background: 'transparent' }}
                    >
                      {renderSortArrows('brandName')}
                    </div>
                  </div>
                  {dataTable.map((row, index) => (
                    <div
                      key={index}
                      className='cell data-cell'
                      style={{ minWidth: '200px' }}
                    >
                      {row.brandName}
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{ minWidth: '100px', border: 'none' }}
                  ></div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '100px',
                      minHeight: '70px',
                      border: 'none',
                    }}
                    onClick={() => sortData('sku')}
                  >
                    SKU
                    <div
                      className='icon-sort-wrap'
                      style={{ background: 'transparent' }}
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
                      {row.sku}
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{ minWidth: '100px', border: 'none' }}
                  ></div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '100px',
                      minHeight: '70px',
                      border: 'none',
                    }}
                    onClick={() => sortData('size')}
                  >
                    Размер
                    <div
                      className='icon-sort-wrap'
                      style={{ background: 'transparent' }}
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
                      {row.size}
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{ minWidth: '200px', border: 'none' }}
                  ></div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '200px',
                      minHeight: '70px',
                      border: 'none',
                    }}
                    onClick={() => sortData('category')}
                  >
                    Категория
                    <div
                      className='icon-sort-wrap'
                      style={{ background: 'transparent' }}
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
                      {row.category}
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
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
                  </div>
                  <div
                    className='cell cell-header'
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
                    Сумма
                    <div
                      className='icon-sort-wrap'
                      style={{ background: 'transparent' }}
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
                      {formatNumber(row.saleSum)} ₽
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{ minWidth: '100px', border: 'none' }}
                  ></div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '100px',
                      minHeight: '70px',
                      border: 'none',
                    }}
                    onClick={() => sortData('quantity')}
                  >
                    Кол-во
                    <div
                      className='icon-sort-wrap'
                      style={{ background: 'transparent' }}
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
                      {row.quantity}
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{ minWidth: '150px', border: 'none' }}
                  ></div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '150px',
                      minHeight: '70px',
                      border: 'none',
                    }}
                    onClick={() => sortData('lessReturns')}
                  >
                    За вычетом
                    <br /> возвратов
                    <div
                      className='icon-sort-wrap'
                      style={{ background: 'transparent' }}
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
                      {formatNumber(row.lessReturns)} ₽
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{ minWidth: '150px', border: 'none' }}
                  ></div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '150px',
                      minHeight: '70px',
                      border: 'none',
                    }}
                  >
                    Себестоимость
                    <br /> проданных
                    <br /> товаров
                  </div>
                  {dataTable.map((row, index) => (
                    <div
                      key={index}
                      className='cell data-cell'
                      style={{ minWidth: '150px' }}
                    >
                      {formatNumber(row.costGoodsSold)} ₽
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{
                      minWidth: '150px',
                      borderRight: 'none',
                      borderBottom: 'none',
                      borderTop: 'none',
                      borderLeft: '1px solid #e0e0e0',
                    }}
                  >
                    Возвраты
                  </div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '150px',
                      minHeight: '70px',
                      borderRight: 'none',
                      borderBottom: 'none',
                      borderTop: 'none',
                      borderLeft: '1px solid #e0e0e0',
                    }}
                    onClick={() => sortData('returnsSum')}
                  >
                    Сумма
                    <div
                      className='icon-sort-wrap'
                      style={{ background: 'transparent' }}
                    >
                      {renderSortArrows('returnsSum')}
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
                      {formatNumber(row.returnsSum)} ₽
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{ minWidth: '100px', border: 'none' }}
                  ></div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '100px',
                      minHeight: '70px',
                      border: 'none',
                    }}
                    onClick={() => sortData('returnsQuantity')}
                  >
                    Кол-во
                    <div
                      className='icon-sort-wrap'
                      style={{ background: 'transparent' }}
                    >
                      {renderSortArrows('returnsQuantity')}
                    </div>
                  </div>
                  {dataTable.map((row, index) => (
                    <div
                      key={index}
                      className='cell data-cell'
                      style={{ minWidth: '100px' }}
                    >
                      {row.returnsQuantity}
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{ minWidth: '150px', border: 'none' }}
                  ></div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '150px',
                      minHeight: '70px',
                      border: 'none',
                    }}
                  >
                    Себестоимость
                    <br /> возвращенных
                    <br /> товаров
                  </div>
                  {dataTable.map((row, index) => (
                    <div
                      key={index}
                      className='cell data-cell'
                      style={{ minWidth: '150px' }}
                    >
                      {formatNumber(row.returnsCostSold)} ₽
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{
                      borderRight: 'none',
                      borderBottom: 'none',
                      borderTop: 'none',
                      borderLeft: '1px solid #e0e0e0',
                    }}
                  >
                    Себестоимость
                  </div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '150px',
                      minHeight: '70px',
                      borderRight: 'none',
                      borderBottom: 'none',
                      borderTop: 'none',
                      borderLeft: '1px solid #e0e0e0',
                    }}
                  >
                    За единицу
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
                      {formatNumber(row.costPriceOne)}
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{ minWidth: '170px', border: 'none' }}
                  ></div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '170px',
                      minHeight: '70px',
                      border: 'none',
                    }}
                  >
                    Себестоимость
                    <br /> товарного запаса
                    <br /> (сегодня)
                  </div>
                  {dataTable.map((row, index) => (
                    <div
                      key={index}
                      className='cell data-cell'
                      style={{ minWidth: '170px' }}
                    >
                      {formatNumber(row.costOfProductStockToday)} ₽
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{
                      minWidth: '150px',
                      borderRight: 'none',
                      borderBottom: 'none',
                      borderTop: 'none',
                      borderLeft: '1px solid #e0e0e0',
                    }}
                  >
                    Логистика
                  </div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '150px',
                      minHeight: '70px',
                      borderRight: 'none',
                      borderBottom: 'none',
                      borderTop: 'none',
                      borderLeft: '1px solid #e0e0e0',
                    }}
                    onClick={() => sortData('toClient')}
                  >
                    К клиенту
                    <div
                      className='icon-sort-wrap'
                      style={{ background: 'transparent' }}
                    >
                      {renderSortArrows('toClient')}
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
                      {formatPrice(row.toClient, '₽')}
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{
                      minWidth: '150px',
                      borderRight: 'none',
                      borderBottom: 'none',
                      borderTop: 'none',
                    }}
                  >
                  </div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '150px',
                      minHeight: '70px',
                      borderRight: 'none',
                      borderBottom: 'none',
                      borderTop: 'none',
                    }}
                  >
                    Сумма
                  </div>
                  {dataTable.map((row, index) => (
                    <div
                      key={index}
                      className='cell data-cell'
                      style={{
                        minWidth: '150px',
                      }}
                    >
                      {formatPrice(row.to_client_sum, '₽')}
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{ minWidth: '150px', border: 'none' }}
                  ></div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '150px',
                      minHeight: '70px',
                      border: 'none',
                    }}
                    onClick={() => sortData('fromClient')}
                  >
                    От клиента
                    <div
                      className='icon-sort-wrap'
                      style={{ background: 'transparent' }}
                    >
                      {renderSortArrows('fromClient')}
                    </div>
                  </div>
                  {dataTable.map((row, index) => (
                    <div
                      key={index}
                      className='cell data-cell'
                      style={{ minWidth: '150px' }}
                    >
                      {row.fromClient}
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{ minWidth: '150px', border: 'none' }}
                  ></div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '150px',
                      minHeight: '70px',
                      border: 'none',
                    }}
                  >
                    Сумма
                  </div>
                  {dataTable.map((row, index) => (
                    <div
                      key={index}
                      className='cell data-cell'
                      style={{ minWidth: '150px' }}
                    >
                      {formatNumber(row.from_client_sum || '0')} ₽
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{
                      minWidth: '170px',
                      borderRight: 'none',
                      borderBottom: 'none',
                      borderTop: 'none',
                      borderLeft: '1px solid #e0e0e0',
                    }}
                  >
                    Прочие расходы
                  </div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '170px',
                      minHeight: '70px',
                      borderRight: 'none',
                      borderBottom: 'none',
                      borderTop: 'none',
                      borderLeft: '1px solid #e0e0e0',
                    }}
                    onClick={() => sortData('commissionWB')}
                  >
                    Комиссия WB
                    <div
                      className='icon-sort-wrap'
                      style={{ background: 'transparent' }}
                    >
                      {renderSortArrows('commissionWB')}
                    </div>
                  </div>
                  {dataTable.map((row, index) => (
                    <div
                      key={index}
                      className='cell data-cell'
                      style={{
                        minWidth: '170px',
                        borderLeft: '1px solid #e0e0e0',
                      }}
                    >
                      {formatNumber(row.commissionWB)} ₽
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{ minWidth: '150px', border: 'none' }}
                  ></div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '150px',
                      minHeight: '70px',
                      border: 'none',
                    }}
                    onClick={() => sortData('fines')}
                  >
                    Штрафы
                    <div
                      className='icon-sort-wrap'
                      style={{ background: 'transparent' }}
                    >
                      {renderSortArrows('fines')}
                    </div>
                  </div>
                  {dataTable.map((row, index) => (
                    <div
                      key={index}
                      className='cell data-cell'
                      style={{ minWidth: '150px' }}
                    >
                      {row.fines} ₽
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{ minWidth: '150px', border: 'none' }}
                  ></div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '150px',
                      minHeight: '70px',
                      border: 'none',
                    }}
                    onClick={() => sortData('additionalpayment')}
                  >
                    Доплаты
                    <div
                      className='icon-sort-wrap'
                      style={{ background: 'transparent' }}
                    >
                      {renderSortArrows('additionalpayment')}
                    </div>
                  </div>
                  {dataTable.map((row, index) => (
                    <div
                      key={index}
                      className='cell data-cell'
                      style={{ minWidth: '150px' }}
                    >
                      {row.additionalpayment} ₽
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{
                      minWidth: '150px',
                      borderRight: 'none',
                      borderBottom: 'none',
                      borderTop: 'none',
                      borderLeft: '1px solid #e0e0e0',
                    }}
                  >
                    Прибыль
                  </div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '150px',
                      minHeight: '70px',
                      borderRight: 'none',
                      borderBottom: 'none',
                      borderTop: 'none',
                      borderLeft: '1px solid #e0e0e0',
                    }}
                    onClick={() => sortData('toPayoff')}
                  >
                    К выплате
                    <div
                      className='icon-sort-wrap'
                      style={{ background: 'transparent' }}
                    >
                      {renderSortArrows('toPayoff')}
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
                      {formatNumber(row.toPayoff)} ₽
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{ minWidth: '150px', border: 'none' }}
                  ></div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '150px',
                      minHeight: '70px',
                      border: 'none',
                    }}
                  >
                    Маржинальная
                    <br /> прибыль
                  </div>
                  {dataTable.map((row, index) => (
                    <div
                      key={index}
                      className='cell data-cell'
                      style={{ minWidth: '150px' }}
                    >
                      {formatNumber(row.marginalProfit)} ₽
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{ minWidth: '150px', border: 'none' }}
                  ></div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '150px',
                      minHeight: '70px',
                      border: 'none',
                    }}
                  >
                    Средняя прибыль
                  </div>
                  {dataTable.map((row, index) => (
                    <div
                      key={index}
                      className='cell data-cell'
                      style={{ minWidth: '150px' }}
                    >
                      {formatNumber(row.averageProfit)} ₽
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{ minWidth: '180px', border: 'none' }}
                  ></div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '180px',
                      minHeight: '70px',
                      border: 'none',
                    }}
                  >
                    Рентабельность
                    <br /> реализованной
                    <br /> продукции
                  </div>
                  {dataTable.map((row, index) => (
                    <div
                      key={index}
                      className='cell data-cell'
                      style={{ minWidth: '180px' }}
                    >
                      {row.profitabilityOfProductsSold} %
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{ minWidth: '160px', border: 'none' }}
                  ></div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '160px',
                      minHeight: '70px',
                      border: 'none',
                    }}
                  >
                    Маржинальность
                  </div>
                  {dataTable.map((row, index) => (
                    <div
                      key={index}
                      className='cell data-cell'
                      style={{ minWidth: '160px' }}
                    >
                      {row.marginal} %
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{ minWidth: '180px', border: 'none' }}
                  ></div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '180px',
                      minHeight: '70px',
                      border: 'none',
                    }}
                  >
                    Годовая
                    <br /> рентабельность
                    <br /> товарных запасов
                  </div>
                  {dataTable.map((row, index) => (
                    <div
                      key={index}
                      className='cell data-cell'
                      style={{ minWidth: '180px' }}
                    >
                      {row.annualReturnOnInventory} %
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{ minWidth: '150px', border: 'none' }}
                  ></div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '150px',
                      minHeight: '70px',
                      border: 'none',
                    }}
                  >
                    Упущенная
                    <br /> выручка
                  </div>
                  {dataTable.map((row, index) => (
                    <div
                      key={index}
                      className='cell data-cell'
                      style={{ minWidth: '150px' }}
                    >
                      {formatNumber(row.lostRevenue)} ₽
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{
                      minWidth: '120px',
                      borderRight: 'none',
                      borderBottom: 'none',
                      borderTop: 'none',
                      borderLeft: '1px solid #e0e0e0',
                    }}
                  >
                    АВС анализ
                  </div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '120px',
                      minHeight: '70px',
                      borderRight: 'none',
                      borderBottom: 'none',
                      borderTop: 'none',
                      borderLeft: '1px solid #e0e0e0',
                    }}
                    onClick={() => sortData('byRevenue')}
                  >
                    По
                    <br /> выручке
                    <div
                      className='icon-sort-wrap'
                      style={{ background: 'transparent' }}
                    >
                      {renderSortArrows('byRevenue')}
                    </div>
                  </div>
                  {dataTable.map((row, index) => (
                    <div
                      key={index}
                      className='cell data-cell'
                      style={{
                        minWidth: '120px',
                        borderLeft: '1px solid #e0e0e0',
                      }}
                    >
                      {row.byRevenue}
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{ minWidth: '120px', border: 'none' }}
                  ></div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '120px',
                      minHeight: '70px',
                      border: 'none',
                    }}
                    onClick={() => sortData('byProfit')}
                  >
                    По
                    <br /> прибыли
                    <div
                      className='icon-sort-wrap'
                      style={{ background: 'transparent' }}
                    >
                      {renderSortArrows('byProfit')}
                    </div>
                  </div>
                  {dataTable.map((row, index) => (
                    <div
                      key={index}
                      className='cell data-cell'
                      style={{ minWidth: '120px' }}
                    >
                      {row.byProfit}
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{
                      minWidth: '150px',
                      borderRight: 'none',
                      borderBottom: 'none',
                      borderTop: 'none',
                      borderLeft: '1px solid #e0e0e0',
                    }}
                  >
                    Цена
                  </div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '150px',
                      minHeight: '70px',
                      borderRight: 'none',
                      borderBottom: 'none',
                      borderTop: 'none',
                      borderLeft: '1px solid #e0e0e0',
                    }}
                    onClick={() => sortData('basic')}
                  >
                    Базовая
                    <div
                      className='icon-sort-wrap'
                      style={{ background: 'transparent' }}
                    >
                      {renderSortArrows('basic')}
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
                      {formatNumber(row.basic)} ₽
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{ minWidth: '120px', border: 'none' }}
                  ></div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '120px',
                      minHeight: '70px',
                      border: 'none',
                    }}
                    onClick={() => sortData('maxDiscount')}
                  >
                    Макс.
                    <br /> скидка
                    <div
                      className='icon-sort-wrap'
                      style={{ background: 'transparent' }}
                    >
                      {renderSortArrows('maxDiscount')}
                    </div>
                  </div>
                  {dataTable.map((row, index) => (
                    <div
                      key={index}
                      className='cell data-cell'
                      style={{ minWidth: '120px' }}
                    >
                      {row.maxDiscount} %
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{ minWidth: '150px', border: 'none' }}
                  ></div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '150px',
                      minHeight: '70px',
                      border: 'none',
                    }}
                    onClick={() => sortData('minDiscountPrice')}
                  >
                    Мин. цена
                    <br /> со скидкой
                    <div
                      className='icon-sort-wrap'
                      style={{ background: 'transparent' }}
                    >
                      {renderSortArrows('minDiscountPrice')}
                    </div>
                  </div>
                  {dataTable.map((row, index) => (
                    <div
                      key={index}
                      className='cell data-cell'
                      style={{ minWidth: '150px' }}
                    >
                      {formatNumber(row.minDiscountPrice)} ₽
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{
                      minWidth: '100px',
                      borderRight: 'none',
                      borderBottom: 'none',
                      borderTop: 'none',
                      borderLeft: '1px solid #e0e0e0',
                    }}
                  >
                    Заказы
                  </div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '100px',
                      minHeight: '70px',
                      borderRight: 'none',
                      borderBottom: 'none',
                      borderTop: 'none',
                      borderLeft: '1px solid #e0e0e0',
                    }}
                    onClick={() => sortData('orderQuantity')}
                  >
                    Кол-во
                    <div
                      className='icon-sort-wrap'
                      style={{ background: 'transparent' }}
                    >
                      {renderSortArrows('orderQuantity')}
                    </div>
                  </div>
                  {dataTable.map((row, index) => (
                    <div
                      key={index}
                      className='cell data-cell'
                      style={{
                        minWidth: '100px',
                        borderLeft: '1px solid #e0e0e0',
                      }}
                    >
                      {row.orderQuantity}
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{ minWidth: '150px', border: 'none' }}
                  ></div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '150px',
                      minHeight: '70px',
                      border: 'none',
                    }}
                    onClick={() => sortData('orderSum')}
                  >
                    Сумма
                    <div
                      className='icon-sort-wrap'
                      style={{ background: 'transparent' }}
                    >
                      {renderSortArrows('orderSum')}
                    </div>
                  </div>
                  {dataTable.map((row, index) => (
                    <div
                      key={index}
                      className='cell data-cell'
                      style={{ minWidth: '150px' }}
                    >
                      {formatNumber(row.orderSum)} ₽
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{
                      minWidth: '135px',
                      borderRight: 'none',
                      borderBottom: 'none',
                      borderTop: 'none',
                      borderLeft: '1px solid #e0e0e0',
                    }}
                  >
                    Выкупы
                  </div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '135px',
                      minHeight: '70px',
                      borderRight: 'none',
                      borderBottom: 'none',
                      borderTop: 'none',
                      borderLeft: '1px solid #e0e0e0',
                    }}
                    onClick={() => sortData('purchased')}
                  >
                    Выкуплено
                    <div
                      className='icon-sort-wrap'
                      style={{ background: 'transparent' }}
                    >
                      {renderSortArrows('purchased')}
                    </div>
                  </div>
                  {dataTable.map((row, index) => (
                    <div
                      key={index}
                      className='cell data-cell'
                      style={{
                        minWidth: '135px',
                        borderLeft: '1px solid #e0e0e0',
                      }}
                    >
                      {formatNumber(row.purchased)}
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{ minWidth: '135px', border: 'none' }}
                  ></div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '135px',
                      minHeight: '70px',
                      border: 'none',
                    }}
                    onClick={() => sortData('notPurchased')}
                  >
                    Не выкуплено
                    <div
                      className='icon-sort-wrap'
                      style={{ background: 'transparent' }}
                    >
                      {renderSortArrows('notPurchased')}
                    </div>
                  </div>
                  {dataTable.map((row, index) => (
                    <div
                      key={index}
                      className='cell data-cell'
                      style={{ minWidth: '135px' }}
                    >
                      {formatNumber(row.notPurchased)}
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{ minWidth: '150px', border: 'none' }}
                  ></div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '150px',
                      minHeight: '70px',
                      border: 'none',
                    }}
                    onClick={() => sortData('purchasedPercent')}
                  >
                    Процент
                    <br /> выкупа
                    <div
                      className='icon-sort-wrap'
                      style={{ background: 'transparent' }}
                    >
                      {renderSortArrows('purchasedPercent')}
                    </div>
                  </div>
                  {dataTable.map((row, index) => (
                    <div
                      key={index}
                      className='cell data-cell'
                      style={{ minWidth: '150px' }}
                    >
                      {row.purchasedPercent} %
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{ minWidth: '150px', border: 'none' }}
                  ></div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '150px',
                      minHeight: '70px',
                      border: 'none',
                    }}
                    onClick={() => sortData('completed')}
                  >
                    Завершены
                    <div
                      className='icon-sort-wrap'
                      style={{ background: 'transparent' }}
                    >
                      {renderSortArrows('completed')}
                    </div>
                  </div>
                  {dataTable.map((row, index) => (
                    <div
                      key={index}
                      className='cell data-cell'
                      style={{ minWidth: '150px' }}
                    >
                      {formatNumber(row.completed)}
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{
                      minWidth: '120px',
                      borderRight: 'none',
                      borderBottom: 'none',
                      borderTop: 'none',
                      borderLeft: '1px solid #e0e0e0',
                    }}
                  >
                    Скорость
                  </div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '120px',
                      minHeight: '70px',
                      borderRight: 'none',
                      borderBottom: 'none',
                      borderTop: 'none',
                      borderLeft: '1px solid #e0e0e0',
                    }}
                  >
                    Заказов,
                    <br />
                    шт/день
                  </div>
                  {dataTable.map((row, index) => (
                    <div
                      key={index}
                      className='cell data-cell'
                      style={{
                        minWidth: '120px',
                        borderLeft: '1px solid #e0e0e0',
                      }}
                    >
                      {formatNumber(row.orderCountDay)}
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{ minWidth: '150px', border: 'none' }}
                  ></div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '150px',
                      minHeight: '70px',
                      borderRight: 'none',
                      borderBottom: 'none',
                      borderTop: 'none',
                    }}
                  >
                    Продаж,
                    <br />
                    ₽/день
                  </div>
                  {dataTable.map((row, index) => (
                    <div
                      key={index}
                      className='cell data-cell'
                      style={{ minWidth: '150px' }}
                    >
                      {formatNumber(row.saleCountDay)}
                    </div>
                  ))}
                </div>
                <div className='column'>
                  <div
                    className='cell header-cell'
                    style={{
                      minWidth: '150px',
                      borderRight: 'none',
                      borderBottom: 'none',
                      borderTop: 'none',
                      borderLeft: '1px solid #e0e0e0',
                    }}
                  >
                    Остаток
                  </div>
                  <div
                    className='cell cell-header'
                    style={{
                      minWidth: '150px',
                      minHeight: '70px',
                      borderRight: 'none',
                      borderBottom: 'none',
                      borderTop: 'none',
                      // marginRight: '17px',
                      borderLeft: '1px solid #e0e0e0',
                    }}
                  >
                    Данные Радар
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
                      {formatNumber(row.dataRadar)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableStock;
