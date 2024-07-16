import React, { useState } from 'react';
import sortArrow from '../assets/sortarrow.svg';
import TableStock from './TableStock';

const TableStockGlitter = ({
  dataSaleDay,
  setDataSaleDay,
  dataOrderDay,
  setDataOrderDay,
  activeTabDay,
}) => {
  const [asc, setAsc] = useState(true);

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

  return (
    <div class='scrollable-table table-content'>
      <table className='table-glit'>
        <tr className='table-header'>
          <th
            style={{
              borderTopLeftRadius: '8px',
              borderBottomLeftRadius: '8px',
            }}
          >
            День
            <img src={sortArrow} alt='' />
          </th>
          <th>
            Продажи
            <img src={sortArrow} alt='' />
          </th>
          <th>
            Сумма продаж
            <img src={sortArrow} alt='' />
          </th>
          <th>
            Возвраты, шт
            <img src={sortArrow} alt='' />
          </th>
          <th>
            Логистика к клиенту
            <img src={sortArrow} alt='' />
          </th>
          <th>
            Логистика от клиента
            <img src={sortArrow} alt='' />
          </th>
          <th>
            Штрафы
            <img src={sortArrow} alt='' />
          </th>
          <th>
            Комиссия
            <img src={sortArrow} alt='' />
          </th>
          <th>
            Маржинальная прибыль
            <img src={sortArrow} alt='' />
          </th>
        </tr>

        {activeTabDay === 'saleDay'
          ? dataSaleDay.map((item, i) => (
              <tr>
                <td style={{ color: '#5329FF' }}>{item.productName}</td>
                <td>{item.brandName}</td>
                <td>{item.vendorСode}</td>
                <td>{item.barCode}</td>
                <td>{item.sku}</td>
                <td>{item.size}</td>
                <td>{item.category}</td>
                <td>{item.saleSum} р</td>
                <td>{item.quantity}</td>
              </tr>
            ))
          : dataOrderDay.map((item, i) => (
              <tr>
                <td style={{ color: '#5329FF' }}>{item.productName}</td>
                <td>{item.brandName}</td>
                <td>{item.vendorСode}</td>
                <td>{item.barCode}</td>
                <td>{item.sku}</td>
                <td>{item.size}</td>
                <td>{item.category}</td>
                <td>{item.saleSum} р</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
      </table>
    </div>
  );
};

export default TableStockGlitter;
