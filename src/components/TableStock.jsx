import React, { useState, useCallback } from 'react';
import sortArrow from '../assets/sortarrow.svg';
import ArrowUp from '../assets/ArrowUp.svg';
import ArrowDown from '../assets/ArrowDown.svg';
import sortByIcon from '../pages/images/sortByIcon.svg';

const TableStock = ({ dataTable, setDataTable }) => {
  console.log(dataTable, 'dataTable');
  const [asc, setAsc] = useState(true);
  const sortData = useCallback((key) => {
    const sortedData = [...dataTable].sort((a, b) => {
      if (typeof a[key] === 'number' && typeof b[key] === 'number') {
        return asc ? a[key] - b[key] : b[key] - a[key];
      } else {
        return asc
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      }
    });
    setAsc(!asc);
    setDataTable(sortedData);
  }, [dataTable, asc]);

  const toggleRotate = (element) => {
    const iconUp = element.querySelector('.icon-sort-up');
    const iconDown = element.querySelector('.icon-sort-down');
    iconUp.classList.toggle('sort-icon_rotate');
    iconDown.classList.toggle('sort-icon_rotate');
  };

  const handleSort = (element, columnName) => {
    toggleRotate(element);
    sortData(columnName);
  };

  return (
    <div class='scrollable-table table-content'>
      <table className='table-stock table-alignment' style={{ height: '100%' }}>
        <span className='table-caption'>
        <caption className='about-goods-title'>О товаре</caption>
        <caption className='about-goods-title-sells'>Продажи</caption>
        <caption className='about-goods-title-returns'>Возвраты</caption>
        <caption className='about-goods-title-selfcost'>Себестоимость</caption>
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
            <th className='goods-cell-first' style={{paddingLeft: '15px !important'}}>
              <span className='about-goods height-100'>
              <div style={{width: '30px', height: '40px', marginLeft: '10px'}}></div>
              <span className='name-of-goods'>
                Товар
                <img onClick={() => sortData('productName')} src={sortByIcon} style={{marginLeft: '5px', cursor: 'pointer'}}/>    
              </span>
              
              </span>
            </th>
            <th className='goods-cell'>
              <span className='height-100'>
                Бренд
                <img onClick={() => sortData('brandName')} src={sortByIcon} style={{marginLeft: '5px', cursor: 'pointer'}}/> 
                </span>
              </th>
            <th className='goods-cell'>
              <span className='height-100'>
                Артикул
                <img onClick={() => sortData('vendorСode')} src={sortByIcon} style={{marginLeft: '5px', cursor: 'pointer'}}/> 
                </span>
            </th>
            <th className='goods-cell-150'>
              <span className='height-100'>
                Баркод
                <img onClick={() => sortData('barCode')} src={sortByIcon} style={{marginLeft: '5px', cursor: 'pointer'}}/> 
                </span>
            </th>
            <th className='goods-cell-100'>
              <span className='height-100'>
                SKU
                <img onClick={() => sortData('sku')} src={sortByIcon} style={{marginLeft: '5px', cursor: 'pointer'}}/> 
                </span>
            </th>
            <th className='goods-cell-100'>
              <span className='height-100'>
                Размер
                <img onClick={() => sortData('size')} src={sortByIcon} style={{marginLeft: '5px', cursor: 'pointer'}}/> 
                </span>
            </th>
            <th className='goods-cell border-right'>
              <span className='height-100'>
                Категория
                <img onClick={() => sortData('category')} src={sortByIcon} style={{marginLeft: '5px', cursor: 'pointer'}}/> 
                </span>
            </th>
            {/* Sells cells */}
            <th className='goods-cell-150'>
              <span className='height-100'>
                Сумма
                <img onClick={() => sortData('saleSum')} src={sortByIcon} style={{marginLeft: '5px', cursor: 'pointer'}}/> 
                </span>
            </th>
            <th className='goods-cell-100'>
              <span className='height-100'>
                Кол-во
                <img onClick={() => sortData('quantity')} src={sortByIcon} style={{marginLeft: '5px', cursor: 'pointer'}}/> 
                </span>
            </th>
            <th className='goods-cell-150'>
              <span className='height-100'>
                За вычетом<br/> возвратов
                <img onClick={() => sortData('lessReturns')} src={sortByIcon} style={{marginLeft: '5px', cursor: 'pointer'}}/> 
                </span>
            </th>
            <th className='goods-cell-150 border-right'>
              <span className='height-100'>Себестоимость<br/> проданных<br/> товаров</span>
            </th>
            {/* Returns cells */}
            <th className='goods-cell-150'>
              <span className='height-100'>
                Сумма
                <img  onClick={() => sortData('returnsSum')} src={sortByIcon} style={{marginLeft: '5px', cursor: 'pointer'}}/> 
                </span>
            </th>
            <th className='goods-cell-100'>
              <span className='height-100'>
                Кол-во
                <img onClick={() => sortData('returnsQuantity')} src={sortByIcon} style={{marginLeft: '5px', cursor: 'pointer'}}/> 
                </span>
            </th>
            <th className='goods-cell-150'>
              <span className='height-100'>
                Себестоимость<br/> возвращенных<br/> товаров
                </span>
            </th>
            {/* Sebestoimost cells */}
            <th className='goods-cell-150'>
              <span className='height-100'>За единицу</span>
            </th>
            <th className='goods-cell-150 border-right'>
              <span className='height-100'>Себестоимость<br/> товарного запаса<br/> (сегодня)</span>
            </th>
            {/* Logistic cells */}
            <th className='goods-cell-150'>
              <span className='height-100'>
                К клиенту
                <img onClick={() => sortData('toClient')} src={sortByIcon} style={{marginLeft: '5px', cursor: 'pointer'}}/> 
                </span>
            </th>
            <th className='goods-cell-150'>
              <span className='height-100 border-right'>
                От клиента
                <img onClick={() => sortData('fromClient')} src={sortByIcon} style={{marginLeft: '5px', cursor: 'pointer'}}/> 
                </span>
            </th>
            {/* Other expenses cells */}
            <th className='goods-cell-150'>
              <span className='height-100'>
                Комиссия WB
                <img onClick={() => sortData('commissionWB')} src={sortByIcon} style={{marginLeft: '5px', cursor: 'pointer'}}/> 
                </span>
            </th>
            <th className='goods-cell-150'>
              <span onClick={() => sortData('fines')} className='height-100'>
                Штрафы
                <img src={sortByIcon} style={{marginLeft: '5px', cursor: 'pointer'}}/> 
                </span>
            </th>
            <th className='goods-cell-150'>
              <span className='height-100'>
                Доплаты
                <img onClick={() => sortData('additionalpayment')} src={sortByIcon} style={{marginLeft: '5px', cursor: 'pointer'}}/> 
                </span>
            </th>
            <th className='goods-cell-160'>
              <span className='height-100 border-right'>
                Расходы услуг<br/> проверенного
                <img onClick={() => sortData('serviceExpenses')} src={sortByIcon} style={{marginLeft: '5px', cursor: 'pointer'}}/> 
                </span></th>
            {/* Profit cells */}
            <th className='goods-cell-150'>
              <span className='height-100'>
                К выплате
                <img onClick={() => sortData('toPayoff')} src={sortByIcon} style={{marginLeft: '5px', cursor: 'pointer'}}/> 
                </span>
            </th>
            <th className='goods-cell-150'>
              <span className='height-100'>Маржинальная<br/> прибыль</span>
            </th>
            <th className='goods-cell-150'>
              <span className='height-100'>Средняя прибыль</span>
            </th>
            <th className='goods-cell-180'>
              <span className='height-100'>Рентабельность<br /> реализованной<br/> продукции</span>
            </th>
            <th className='goods-cell-160'>
              <span className='height-100'>Маржинальность</span>
            </th>
            <th className='goods-cell-180'>
              <span className='height-100'>Годовая<br/> рентабельность<br/> товарных запасов</span>
            </th>
            <th className='goods-cell-150 border-right'>
              <span className='height-100'>Упущенная<br/> выручка</span>
            </th>
            {/* Abc cells */}
            <th className='goods-cell-120'>
              <span className='height-100'>
                По<br/> выручке
                <img onClick={() => sortData('byRevenue')} src={sortByIcon} style={{marginLeft: '5px', cursor: 'pointer'}}/> 
                </span>
            </th>
            <th className='goods-cell-120'>
              <span className='height-100 border-right'>
                По<br/> прибыли
                <img onClick={() => sortData('byProfit')} src={sortByIcon} style={{marginLeft: '5px', cursor: 'pointer'}}/> 
                </span>
            </th>
            {/* Price cells */}
            <th className='goods-cell-150'>
              <span className='height-100'>
                Базовая
                <img onClick={() => sortData('basic')} src={sortByIcon} style={{marginLeft: '5px', cursor: 'pointer'}}/> 
                </span>
            </th>
            <th className='goods-cell-120'>
              <span className='height-100'>
                Макс.<br/> скидка
                <img onClick={() => sortData('maxDiscount')} src={sortByIcon} style={{marginLeft: '5px', cursor: 'pointer'}}/> 
                </span>
            </th>
            <th className='goods-cell-150'>
              <span className='height-100 border-right'>
                Мин. цена<br/> со скидкой
                <img onClick={() => sortData('minDiscountPrice')} src={sortByIcon} style={{marginLeft: '5px', cursor: 'pointer'}}/> 
                </span>
            </th>
             {/* Orders cells */}
             <th className='goods-cell-100'>
              <span className='height-100'>
                Кол-во
                <img onClick={() => sortData('orderQuantity')} src={sortByIcon} style={{marginLeft: '5px', cursor: 'pointer'}}/> 
                </span>
            </th>
             <th className='goods-cell-150'>
              <span className='height-100 border-right'>
                Сумма
                <img onClick={() => sortData('orderSum')} src={sortByIcon} style={{marginLeft: '5px', cursor: 'pointer'}}/> 
                </span>
            </th>
             {/* Buy out cells */}
             <th className='goods-cell-135'>
              <span className='height-100'>
                Выкуплено
                <img onClick={() => sortData('purchased')} src={sortByIcon} style={{marginLeft: '5px', cursor: 'pointer'}}/> 
                </span>
            </th>
             <th className='goods-cell-135'>
              <span className='height-100'>
                Не<br/> выкуплено
                <img  onClick={() => sortData('notPurchased')} src={sortByIcon} style={{marginLeft: '5px', cursor: 'pointer'}}/> 
                </span>
            </th>
             <th className='goods-cell-150'>
              <span className='height-100'>
                Процент<br/> выкупа
                <img onClick={() => sortData('purchasedPrecent')} src={sortByIcon} style={{marginLeft: '5px', cursor: 'pointer'}}/> 
                </span>
            </th>
             <th className='goods-cell-150'>
              <span className='height-100 border-right'>
                Завершены
                <img onClick={() => sortData('completed')} src={sortByIcon} style={{marginLeft: '5px', cursor: 'pointer'}}/> 
                </span>
            </th>
             {/* Speed cells */}
             <th className='goods-cell-100'>
              <span className='height-100'>Заказов,<br/>шт/день</span>
            </th>
             <th className='goods-cell-150 border-right'>
              <span className='height-100'>Продаж,<br/>₽/день</span>
            </th>
            {/* Left cells */}
            <th className='goods-cell-150'>
              <span className='height-100'>Остаток</span>
            </th>
            <th className='goods-cell-160'>
              <span className='height-100'>Данные<br/> Вайлдберриз</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {dataTable.map((item, i) => (
          <tr key={i}>
            {/* <span style={{display: 'flex', gap: '20px'}}> */}
            <td className='goods-cell-first'>
            <span style={{display: 'flex', alignItems: 'center', paddingLeft: '7px'}}>
            <div className='empty-box'><img src={item.photo} style={{width: '30px', height: '40px'}}/></div>
              
              <span className='name-of-goods'>{item.productName}</span>
              </span>
            </td>
            <td className='goods-cell'>
            <span className='height-100' style={{minHeight: '44px'}}><span>{item.brandName}</span></span>
            </td>
            <td className='goods-cell'>{item.vendorСode}</td>
            <td className='goods-cell-150'>{item.barCode}</td>
            <td className='goods-cell-100' style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}} title={item.sku}>{item.sku}</td>
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
            <td className='goods-cell-150'>{item.costOfProductStockToday} ₽</td>
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
            <td className='goods-cell-180'>{item.profitabilityOfProductsSold} %</td>
            <td className='goods-cell-160'>{item.marginal} %</td>
            <td className='goods-cell-180'>{item.annualReturnOnInventory} %</td>
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
            <td className='goods-cell-160'></td>
            {/* </span> */}
          </tr>  
          ))}
          
        </tbody>
        {/* <div className='about-goods-wrapper'>
          <div className='empty-box'></div>
          <span className='about-goods-cell'>
            <span>О товаре</span>
            <span>Товар</span>
            <span></span>
          </span>
        </div>
        <span>Продажи</span>
        <span>Возвраты</span>
        <span>Себестоимость</span>
        <span>Логистика</span>
        <span>Прочие расходы</span>
        <span>Прибыль</span>
        <span>АВС анализ</span>
        <span>Цена</span>
        <span>Заказы</span>
        <span>Выкупы</span>
        <span>Скорость</span>
        <span>Остаток</span>

        {/* <div style={{display: 'flex', width: '100%'}}>
          <div style={{minWidth: '30px', margin: '0 10px 0 10px', height: '40px'}}></div>
          <span style={{width: '200px'}}>Товар</span>
          <span>Бренд</span>
          <span>Артикул</span>
          <span>Баркод</span>
          <span>SKU</span>
          <span>Размер</span>
          <span>Категория</span>
          
        </div> */}
        {/* <div>Discription</div>  */}
      </table>
    </div>
  );
};

export default TableStock;
