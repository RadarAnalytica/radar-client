import React, { useState, useCallback } from 'react';
import SortArrows from './SortArrows';

const TableStock = ({ dataTable, setDataTable }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

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

  return (
    <div class='table-content-stock'>
      <table className='table-stock table-alignment' style={{ height: '100%' }}>
        <span className='table-caption'>
          <caption className='about-goods-title'>О товаре</caption>
          <caption className='about-goods-title-sells'>Продажи</caption>
          <caption className='about-goods-title-returns'>Возвраты</caption>
          <caption className='about-goods-title-selfcost'>
            Себестоимость
          </caption>
          <caption className='about-goods-title-logistic'>Логистика</caption>
          <caption className='about-goods-title-other'>Прочие расходы</caption>
          <caption className='about-goods-title-profit'>Прибыль</caption>
          <caption className='about-goods-title-abc'>АВС анализ</caption>
          <caption className='about-goods-title-price'>Цена</caption>
          <caption className='about-goods-title-orders'>Заказы</caption>
          <caption className='about-goods-title-purchase'>Выкупы</caption>
          <caption className='about-goods-title-speed'>Скорость</caption>
          <caption className='about-goods-title-remainder'>Остаток</caption>
        </span>
        <thead>
          <tr>
            <th
              className='goods-cell-first'
              style={{ paddingLeft: '15px !important' }}
            >
              <span className='about-goods height-100'>
                <div
                  style={{ width: '30px', height: '40px', marginLeft: '10px' }}
                ></div>
                <span className='name-of-goods'>
                  Товар
                  <div
                    className='icon-sort-wrap'
                    style={{ background: 'transparent' }}
                    onClick={() => sortData('productName')}
                  >
                    {renderSortArrows('productName')}
                  </div>
                </span>
              </span>
            </th>
            <th className='goods-cell'>
              <span className='height-100'>
                Бренд
                <div
                  className='icon-sort-wrap'
                  style={{ background: 'transparent' }}
                  onClick={() => sortData('brandName')}
                >
                  {renderSortArrows('brandName')}
                </div>
              </span>
            </th>
            <th className='goods-cell'>
              <span className='height-100'>
                Артикул
                <div
                  className='icon-sort-wrap'
                  style={{ background: 'transparent' }}
                  onClick={() => sortData('vendorСode')}
                >
                  {renderSortArrows('vendorСode')}
                </div>
              </span>
            </th>
            <th className='goods-cell-150'>
              <span className='height-100'>
                Баркод
                <div
                  className='icon-sort-wrap'
                  style={{ background: 'transparent' }}
                  onClick={() => sortData('barCode')}
                >
                  {renderSortArrows('barCode')}
                </div>
              </span>
            </th>
            <th className='goods-cell-100'>
              <span className='height-100'>
                SKU
                <div
                  className='icon-sort-wrap'
                  style={{ background: 'transparent' }}
                  onClick={() => sortData('sku')}
                >
                  {renderSortArrows('sku')}
                </div>
              </span>
            </th>
            <th className='goods-cell-100'>
              <span className='height-100'>
                Размер
                <div
                  className='icon-sort-wrap'
                  style={{ background: 'transparent' }}
                  onClick={() => sortData('size')}
                >
                  {renderSortArrows('size')}
                </div>
              </span>
            </th>
            <th className='goods-cell border-right'>
              <span className='height-100'>
                Категория
                <div
                  className='icon-sort-wrap'
                  style={{ background: 'transparent' }}
                  onClick={() => sortData('category')}
                >
                  {renderSortArrows('category')}
                </div>
              </span>
            </th>
            {/* Sells cells */}
            <th className='goods-cell-150'>
              <span className='height-100'>
                Сумма
                <div
                  className='icon-sort-wrap'
                  style={{ background: 'transparent' }}
                  onClick={() => sortData('saleSum')}
                >
                  {renderSortArrows('saleSum')}
                </div>
              </span>
            </th>
            <th className='goods-cell-100'>
              <span className='height-100'>
                Кол-во
                <div
                  className='icon-sort-wrap'
                  style={{ background: 'transparent' }}
                  onClick={() => sortData('quantity')}
                >
                  {renderSortArrows('quantity')}
                </div>
              </span>
            </th>
            <th className='goods-cell-150'>
              <span className='height-100'>
                За вычетом
                <br /> возвратов
                <div
                  className='icon-sort-wrap'
                  style={{ background: 'transparent' }}
                  onClick={() => sortData('lessReturns')}
                >
                  {renderSortArrows('lessReturns')}
                </div>
              </span>
            </th>
            <th className='goods-cell-150 border-right'>
              <span className='height-100'>
                Себестоимость
                <br /> проданных
                <br /> товаров
              </span>
            </th>
            {/* Returns cells */}
            <th className='goods-cell-150'>
              <span className='height-100'>
                Сумма
                <div
                  className='icon-sort-wrap'
                  style={{ background: 'transparent' }}
                  onClick={() => sortData('returnsSum')}
                >
                  {renderSortArrows('returnsSum')}
                </div>
              </span>
            </th>
            <th className='goods-cell-100'>
              <span className='height-100'>
                Кол-во
                <div
                  className='icon-sort-wrap'
                  style={{ background: 'transparent' }}
                  onClick={() => sortData('returnsQuantity')}
                >
                  {renderSortArrows('returnsQuantity')}
                </div>
              </span>
            </th>
            <th className='goods-cell-150'>
              <span className='height-100'>
                Себестоимость
                <br /> возвращенных
                <br /> товаров
              </span>
            </th>
            {/* Sebestoimost cells */}
            <th className='goods-cell-150'>
              <span className='height-100'>За единицу</span>
            </th>
            <th className='goods-cell-150 border-right'>
              <span className='height-100'>
                Себестоимость
                <br /> товарного запаса
                <br /> (сегодня)
              </span>
            </th>
            {/* Logistic cells */}
            <th className='goods-cell-150'>
              <span className='height-100'>
                К клиенту
                <div
                  className='icon-sort-wrap'
                  style={{ background: 'transparent' }}
                  onClick={() => sortData('toClient')}
                >
                  {renderSortArrows('toClient')}
                </div>
              </span>
            </th>
            <th className='goods-cell-150'>
              <span className='height-100 border-right'>
                От клиента
                <div
                  className='icon-sort-wrap'
                  style={{ background: 'transparent' }}
                  onClick={() => sortData('fromClient')}
                >
                  {renderSortArrows('fromClient')}
                </div>
              </span>
            </th>
            {/* Other expenses cells */}
            <th className='goods-cell-150'>
              <span className='height-100'>
                Комиссия WB
                <div
                  className='icon-sort-wrap'
                  style={{ background: 'transparent' }}
                  onClick={() => sortData('commissionWB')}
                >
                  {renderSortArrows('commissionWB')}
                </div>
              </span>
            </th>
            <th className='goods-cell-150'>
              <span className='height-100'>
                Штрафы
                <div
                  className='icon-sort-wrap'
                  style={{ background: 'transparent' }}
                  onClick={() => sortData('fines')}
                >
                  {renderSortArrows('fines')}
                </div>
              </span>
            </th>
            <th className='goods-cell-150'>
              <span className='height-100'>
                Доплаты
                <div
                  className='icon-sort-wrap'
                  style={{ background: 'transparent' }}
                  onClick={() => sortData('additionalpayment')}
                >
                  {renderSortArrows('additionalpayment')}
                </div>
              </span>
            </th>
            <th className='goods-cell-160'>
              <span className='height-100 border-right'>
                Расходы услуг
                <br /> проверенного
                <div
                  className='icon-sort-wrap'
                  style={{ background: 'transparent' }}
                  onClick={() => sortData('serviceExpenses')}
                >
                  {renderSortArrows('serviceExpenses')}
                </div>
              </span>
            </th>
            {/* Profit cells */}
            <th className='goods-cell-150'>
              <span className='height-100'>
                К выплате
                <div
                  className='icon-sort-wrap'
                  style={{ background: 'transparent' }}
                  onClick={() => sortData('toPayoff')}
                >
                  {renderSortArrows('toPayoff')}
                </div>
              </span>
            </th>
            <th className='goods-cell-150'>
              <span className='height-100'>
                Маржинальная
                <br /> прибыль
              </span>
            </th>
            <th className='goods-cell-150'>
              <span className='height-100'>Средняя прибыль</span>
            </th>
            <th className='goods-cell-180'>
              <span className='height-100'>
                Рентабельность
                <br /> реализованной
                <br /> продукции
              </span>
            </th>
            <th className='goods-cell-160'>
              <span className='height-100'>Маржинальность</span>
            </th>
            <th className='goods-cell-180'>
              <span className='height-100'>
                Годовая
                <br /> рентабельность
                <br /> товарных запасов
              </span>
            </th>
            <th className='goods-cell-150 border-right'>
              <span className='height-100'>
                Упущенная
                <br /> выручка
              </span>
            </th>
            {/* Abc cells */}
            <th className='goods-cell-120'>
              <span className='height-100'>
                По
                <br /> выручке
                <div
                  className='icon-sort-wrap'
                  style={{ background: 'transparent' }}
                  onClick={() => sortData('byRevenue')}
                >
                  {renderSortArrows('byRevenue')}
                </div>
              </span>
            </th>
            <th className='goods-cell-120'>
              <span className='height-100 border-right'>
                По
                <br /> прибыли
                <div
                  className='icon-sort-wrap'
                  style={{ background: 'transparent' }}
                  onClick={() => sortData('byProfit')}
                >
                  {renderSortArrows('byProfit')}
                </div>
              </span>
            </th>
            {/* Price cells */}
            <th className='goods-cell-150'>
              <span className='height-100'>
                Базовая
                <div
                  className='icon-sort-wrap'
                  style={{ background: 'transparent' }}
                  onClick={() => sortData('basic')}
                >
                  {renderSortArrows('basic')}
                </div>
              </span>
            </th>
            <th className='goods-cell-120'>
              <span className='height-100'>
                Макс.
                <br /> скидка
                <div
                  className='icon-sort-wrap'
                  style={{ background: 'transparent' }}
                  onClick={() => sortData('maxDiscount')}
                >
                  {renderSortArrows('maxDiscount')}
                </div>
              </span>
            </th>
            <th className='goods-cell-150'>
              <span className='height-100 border-right'>
                Мин. цена
                <br /> со скидкой
                <div
                  className='icon-sort-wrap'
                  style={{ background: 'transparent' }}
                  onClick={() => sortData('minDiscountPrice')}
                >
                  {renderSortArrows('minDiscountPrice')}
                </div>
              </span>
            </th>
            {/* Orders cells */}
            <th className='goods-cell-100'>
              <span className='height-100'>
                Кол-во
                <div
                  className='icon-sort-wrap'
                  style={{ background: 'transparent' }}
                  onClick={() => sortData('orderQuantity')}
                >
                  {renderSortArrows('orderQuantity')}
                </div>
              </span>
            </th>
            <th className='goods-cell-150'>
              <span className='height-100 border-right'>
                Сумма
                <div
                  className='icon-sort-wrap'
                  style={{ background: 'transparent' }}
                  onClick={() => sortData('orderSum')}
                >
                  {renderSortArrows('orderSum')}
                </div>
              </span>
            </th>
            {/* Buy out cells */}
            <th className='goods-cell-135'>
              <span className='height-100'>
                Выкуплено
                <div
                  className='icon-sort-wrap'
                  style={{ background: 'transparent' }}
                  onClick={() => sortData('purchased')}
                >
                  {renderSortArrows('purchased')}
                </div>
              </span>
            </th>
            <th className='goods-cell-135'>
              <span className='height-100'>
                Не
                <br /> выкуплено
                <div
                  className='icon-sort-wrap'
                  style={{ background: 'transparent' }}
                  onClick={() => sortData('notPurchased')}
                >
                  {renderSortArrows('notPurchased')}
                </div>
              </span>
            </th>
            <th className='goods-cell-150'>
              <span className='height-100'>
                Процент
                <br /> выкупа
                <div
                  className='icon-sort-wrap'
                  style={{ background: 'transparent' }}
                  onClick={() => sortData('purchasedPrecent')}
                >
                  {renderSortArrows('purchasedPrecent')}
                </div>
              </span>
            </th>
            <th className='goods-cell-150'>
              <span className='height-100 border-right'>
                Завершены
                <div
                  className='icon-sort-wrap'
                  style={{ background: 'transparent' }}
                  onClick={() => sortData('completed')}
                >
                  {renderSortArrows('completed')}
                </div>
              </span>
            </th>
            {/* Speed cells */}
            <th className='goods-cell-100'>
              <span className='height-100'>
                Заказов,
                <br />
                шт/день
              </span>
            </th>
            <th className='goods-cell-150 border-right'>
              <span className='height-100'>
                Продаж,
                <br />
                ₽/день
              </span>
            </th>
            {/* Left cells */}
            <th className='goods-cell-150'>
              <span className='height-100'>Остаток</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {dataTable.map((item, i) => (
            <tr key={i}>
              <td className='goods-cell-first'>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '7px',
                  }}
                >
                  <div className='empty-box'>
                    <img
                      src={item.photo}
                      style={{
                        width: '30px',
                        height: '40px',
                        objectFit: 'cover',
                      }}
                      onError={(e) => {
                        e.target.style.backgroundColor = '#D3D3D3';
                        e.target.alt = '';
                        e.target.src =
                          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/HHpC6UAAAAASUVORK5CYII=';
                      }}
                    />
                  </div>

                  <span className='name-of-goods'>{item.productName}</span>
                </span>
              </td>
              <td className='goods-cell'>
                <span className='height-100' style={{ minHeight: '44px' }}>
                  <span>{item.brandName}</span>
                </span>
              </td>
              <td className='goods-cell'>{item.vendorСode}</td>
              <td className='goods-cell-150'>{item.barCode}</td>
              <td
                className='goods-cell-100'
                style={{
                  width: '100px',
                  maxWidth: '100px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                title={item.sku}
              >
                {item.sku}
              </td>
              <td className='goods-cell-100'>{item.size}</td>
              <td className='goods-cell'>{item.category}</td>
              {/* Sells cells */}
              <td className='goods-cell-150'>{item.saleSum} </td>
              <td className='goods-cell-100'>{item.quantity}</td>
              <td className='goods-cell-150'>{item.lessReturns}</td>
              <td className='goods-cell-150'>{item.costGoodsSold}</td>
              {/* Returns cells */}
              <td className='goods-cell-150'>{item.returnsSum}</td>
              <td className='goods-cell-100'>{item.returnsQuantity}</td>
              <td className='goods-cell-150'>{item.returnsCostSold}</td>
              {/* Sebestoimost cells */}
              <td className='goods-cell-150'>{item.costPriceOne}</td>
              <td className='goods-cell-150'>
                {item.costOfProductStockToday} ₽
              </td>
              {/* Logistic cells */}
              <td className='goods-cell-150'>{item.toClient}</td>
              <td className='goods-cell-150'>{item.fromClient}</td>
              {/* Other expenses cells */}
              <td className='goods-cell-150'>{item.commissionWB}</td>
              <td className='goods-cell-150'>{item.fines}</td>
              <td className='goods-cell-150'>{item.additionalpayment}</td>
              <td className='goods-cell-160'>{item.serviceExpenses} ₽</td>
              {/* Profit cells */}
              <td className='goods-cell-150'>{item.toPayoff} ₽</td>
              <td className='goods-cell-150'>{item.marginalProfit} ₽</td>
              <td className='goods-cell-150'>{item.averageProfit} ₽</td>
              <td className='goods-cell-180'>
                {item.profitabilityOfProductsSold} %
              </td>
              <td className='goods-cell-160'>{item.marginal} %</td>
              <td className='goods-cell-180'>
                {item.annualReturnOnInventory} %
              </td>
              <td className='goods-cell-150'>{item.lostRevenue} ₽</td>
              {/* Abc cells */}
              <td className='goods-cell-120'>{item.byRevenue}</td>
              <td className='goods-cell-120'>{item.byProfit}</td>
              {/* Price cells */}
              <td className='goods-cell-150'>{item.basic} ₽</td>
              <td className='goods-cell-120'>{item.maxDiscount} %</td>
              <td className='goods-cell-150'>{item.minDiscountPrice} ₽</td>
              {/* Orders cells */}
              <td className='goods-cell-100'>{item.orderQuantity}</td>
              <td className='goods-cell-150'>{item.orderSum} ₽</td>
              {/* Buy out cells */}
              <td className='goods-cell-135'>{item.purchased}</td>
              <td className='goods-cell-135'>{item.notPurchased}</td>
              <td className='goods-cell-150'>{item.purchasedPrecent} %</td>
              <td className='goods-cell-150'>{item.completed}</td>
              {/* Speed cells */}
              <td className='goods-cell-100'>{item.orderCountDay}</td>
              <td className='goods-cell-150'>{item.slaeCountDay}</td>
              {/* Left cells */}
              <td className='goods-cell-150'>{item.slaeCountDay}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableStock;
