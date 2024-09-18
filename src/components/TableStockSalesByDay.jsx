import React, { useState, useCallback, useEffect } from 'react';
import SortArrows from './SortArrows';
import styles from './TableStockSalesByDay.module.css';

const TableStockSalesByDay = ({dataTable, setDataTable}) => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [isScrolled, setIsScrolled] = useState(false);
  
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
    return (
        <div className={styles.tableWrapper}>
      <div className={styles.tableLeftMargin}></div>
      <div className='custom-table'>
        <div className={styles.tableContainer}>
          {dataTable.length === 0 && (
            <div
              className='d-flex flex-column align-items-center justify-content-center'
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                background: 'white',
              }}
            >
              <span className='loader'></span>
            </div>
          )}
          {dataTable.length > 0 && (
            <div className={styles.columnsWrapper}>
              {/* Fixed columns */}
              <div className={`fixed-columns ${isScrolled ? 'fixed-columns-shadow' : ''}`}>
                <div 
                className={styles.columnWidth}
                >
                  <div
                    className={styles.tableOverHeader}
                  >
                  </div>
                  <div
                    // className='goods-cell-header'
                    className={styles.tableHeader}
                    onClick={() => sortData('date')}
                  >
                    Дата
                    <div
                      className='icon-sort-wrap'
                      style={{ background: 'transparent' }}
                      onClick={() => sortData('date')}
                    >
                      {renderSortArrows('date')}
                    </div>
                  </div>
                  {dataTable.map((row, index) => (
                    <div
                      key={index}
                      className={styles.tableRow}
                      style={{marginLeft: '17px'}}
                    >
                        {row.date}
                      
                    </div>
                  ))}
                </div>
                <div className={styles.columnWidth}>
                  <div
                    className={styles.tableOverHeader}
                  ></div>
                  <div
                  className={styles.tableHeaderNotFirst}
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
                      className={styles.tableRow}
                    >
                      {row.sales}
                    </div>
                  ))}
                </div>
                <div className={styles.columnWidth}>
                <div
                    className={styles.tableOverHeader}
                  ></div>
                  {/* <div
                    className='cell header-cell'
                    style={{ minWidth: '200px', border: 'none' }}
                  ></div> */}
                  <div
                  className={styles.tableHeaderNotFirst}
                    // className='cell cell-header'
                    // style={{
                    //   minWidth: '200px',
                    //   minHeight: '70px',
                    //   border: 'none',
                    // }}
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
                      className={styles.tableRow}
                    //   className='cell data-cell'
                    //   style={{ minWidth: '200px', zIndex: '1' }}
                    >
                      {row.amount}
                    </div>
                  ))}
                </div>
              </div>
              {/* Scrollable columns */}
              <div className='scrollable-columns'>
                <div 
                className={styles.columnWidth}
                >
                     <div
                    className={styles.tableOverHeader}
                  ></div>
                  <div
                  className={styles.tableHeaderScrollable}
                    onClick={() => sortData('sku')}
                  >
                    Возвраты, шт
                    <div
                      className='icon-sort-wrap'
                      style={{ background: 'transparent' }}
                      onClick={() => sortData('sku')}
                    >
                      {renderSortArrows('sku')}
                    </div>
                  </div>
                  {dataTable.map((row, index) => (
                    <div
                      key={index}
                      className={styles.tableRow}
                    >
                      {row.returns}
                    </div>
                  ))}
                </div>
                <div 
                className={styles.columnWidth}
                // className='column'
                >
                     <div
                    className={styles.tableOverHeader}
                  ></div>
                  <div
                  className={styles.tableHeaderScrollable}
                    onClick={() => sortData('size')}
                  >
                    Логистика к<br/> клиенту
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
                      className={styles.tableRow}
                    //   className='cell data-cell'
                    //   style={{ minWidth: '100px' }}
                    >
                      {row.logisticsTo}
                    </div>
                  ))}
                </div>
                <div className={styles.columnWidth}>
                <div
                    className={styles.tableOverHeader}
                  ></div>
                  <div
                  className={styles.tableHeaderScrollable}
                    onClick={() => sortData('category')}
                  >
                    Логистика от<br/> клиента
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
                      className={styles.tableRow}
                      // className='cell data-cell'
                      // style={{ minWidth: '200px' }}
                    >
                      {row.logisticsFrom}
                    </div>
                  ))}
                </div>
                <div className={styles.columnWidth}>
                <div
                    className={styles.tableOverHeader}
                  ></div>
                  <div
                    className={styles.tableHeaderScrollable}
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
                      className={styles.tableRow}
                    >
                      {row.fines} ₽
                    </div>
                  ))}
                </div>
                <div className={styles.columnWidth}>
                <div
                    className={styles.tableOverHeader}
                  ></div>
                  <div
                    className={styles.tableHeaderScrollable}
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
                      className={styles.tableRow}
                    >
                      {row.commission}
                    </div>
                  ))}
                </div>
                <div className={styles.columnWidth}>
                <div
                    className={styles.tableOverHeader}
                  ></div>
                  <div
                    className={styles.tableHeaderScrollable}
                    onClick={() => sortData('lessReturns')}
                  >
                    Маржиналь<br/>ная прибыль
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
                      className={styles.tableRow}
                    >
                      {row.profit} ₽
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    )
};

export default TableStockSalesByDay;
  