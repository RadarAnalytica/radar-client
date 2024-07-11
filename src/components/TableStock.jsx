import React, { useState } from 'react'
import sortArrow from '../assets/sortarrow.svg'


const TableStock = ({dataTable, setDataTable}) => {



  const [asc, setAsc] = useState(true);
  console.log(asc, 'ASC');

  

  const sortData = (key) => {
    const sortedData = [...dataTable].sort((a, b) => {
      if (typeof a[key] === 'number' && typeof b[key] === 'number') {
        return asc ? a[key] - b[key] : b[key] - a[key];
      } else {
        return asc ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
      }
    });
    setAsc(!asc); 
    return setDataTable(sortedData);
  };

  return (
    <div class="scrollable-table table-content">
    <table className='table'>
    <tr style={{fontSize: '24px', fontWeight: '700'}}>
      <th colspan="7">О товаре</th>
      <th colspan="4">Продажи</th>
      <th colspan='3'>Возвраты</th>
      <th colspan ='2'>Себестоимость </th>
      <th colspan ='2'>Логистика </th>
      <th colspan ='4'>Прочие расходы </th>
      <th colspan ='7'>Прибыль </th>
      <th colspan ='2'>АВС анализ </th>
      <th colspan ='3'>Цена </th>
      <th colspan ='2'>Заказы </th>
      <th colspan ='4'>Выкуп </th>
      <th colspan ='2'>Скорость </th>
      <th colspan ='2'>Остаток </th>


    </tr>
    <tr className='table-header'>
      <th  style={{borderTopLeftRadius:'8px', borderBottomLeftRadius:'8px'}}>
        Товар
        <img onClick={() => sortData('productName')} src={sortArrow} alt="" />
      </th>
      <th>
        Бренд
        <img onClick={() => sortData('brandName')} src={sortArrow} alt="" />
      </th>
      <th>
        Артикул
        <img onClick={() => sortData('vendorСode')} src={sortArrow} alt="" />
      </th>
      <th>
        Баркод
        <img onClick={() => sortData('barCode')} src={sortArrow} alt="" />
      </th>
      <th>
        SKU
        <img onClick={() => sortData('sku')} src={sortArrow} alt="" />
      </th>
      <th>
        Размер
        <img onClick={() => sortData('size')} src={sortArrow} alt="" />
      </th>
      <th>
        Категория
        <img onClick={() => sortData('category')}  src={sortArrow} alt="" />
      </th>
      <th>
        Сумма
        <img onClick={() => sortData('saleSum')} src={sortArrow} alt="" />
      </th>
      <th>
        Кол-во
        <img onClick={() => sortData('quantity')} src={sortArrow} alt="" />
      </th>
      <th>
        За вычетом возвратов
        <img onClick={() => sortData('lessReturns')} src={sortArrow} alt="" />
      </th>
      <th>
        Себестоимость проданных товаров
      </th>
      <th>
        Сумма
        <img onClick={() => sortData('returnsSum')} src={sortArrow} alt="" />
      </th>
      <th>
        Кол-во
        <img onClick={() => sortData('returnsQuantity')} src={sortArrow} alt="" />
      </th>
      <th>
        Себестоимость возвращенных товаров
      </th>
      <th>
        За еденицу
        <img onClick={() => sortData('costPriceOne')} src={sortArrow} alt="" />
      </th>
      <th>
        Себестоимость товарного запаса(сегодня)
      </th>
      <th>
        К клиенту
        <img onClick={() => sortData('toClient')} src={sortArrow} alt="" />
      </th>
      <th>
        От клиента
        <img onClick={() => sortData('fromClient')} src={sortArrow} alt="" />
      </th>
      <th>
        Комиссия WB
        <img onClick={() => sortData('commissionWB')} src={sortArrow} alt="" />
      </th>
      <th>
        Штрафы
        <img onClick={() => sortData('fines')} src={sortArrow} alt="" />
      </th>
      <th>
        Доплаты
        <img onClick={() => sortData('additionalpayment')} src={sortArrow} alt="" />
      </th>
      <th>
        Расходы услуг проверенного
        <img onClick={() => sortData('serviceExpenses')} src={sortArrow} alt="" />
      </th>
      <th>
        К выплоте
        <img onClick={() => sortData('toPayoff')} src={sortArrow} alt="" />
      </th>
      <th>
        Маржинальная прибыль
      </th>
      <th>
        Средняя прибыль
      </th>
      <th>
        Рентабельность реализованной продукции
      </th>
      <th>
        Маржинальность
      </th>
      <th>
        Годовая рентабельность товарных запасов
      </th>
      <th>
        Упущеная выручка
      </th>
      <th>
        По выручке
        <img onClick={() => sortData('byRevenue')} src={sortArrow} alt="" />
      </th>
      <th>
        По прибыли
        <img onClick={() => sortData('byProfit')} src={sortArrow} alt="" />
      </th>
      <th>
        Базовая
        <img onClick={() => sortData('basic')} src={sortArrow} alt="" />
      </th>
      <th>
        Макс. скидка
        <img onClick={() => sortData('maxDiscount')} src={sortArrow} alt="" />
      </th>
      <th>
        Мин. цена со скидкой
        <img onClick={() => sortData('minDiscountPrice')} src={sortArrow} alt="" />
      </th>
      <th>
        Кол-во
        <img onClick={() => sortData('orderQuantity')} src={sortArrow} alt="" />
      </th>
      <th>
        Сумма
        <img onClick={() => sortData('orderSum')} src={sortArrow} alt="" />
      </th>
      <th>
        Выкуплено
        <img onClick={() => sortData('purchased')} src={sortArrow} alt="" />
      </th>
      <th>
        Не выкуплено
        <img onClick={() => sortData('notPurchased')} src={sortArrow} alt="" />
      </th>
      <th>
        Процент выкупа
        <img onClick={() => sortData('purchasedPrecent')} src={sortArrow} alt="" />
      </th>
      <th>
        Завершены
        <img onClick={() => sortData('completed')} src={sortArrow} alt="" />
      </th>
      <th>
        Заказов, шт/день
      </th>
      <th>
        Продаж, р/день
      </th>
      <th>
        Данные Радар
      </th>
      <th>
        Данные Вайлдберриз
        <img onClick={() => sortData('dataWB')} src={sortArrow} alt="" />
      </th>
    </tr>
    
      {dataTable.map((item, i) => (
        <tr>
        <td style={{color: '#5329FF'}}>{item.productName}</td>
        <td>{item.brandName}</td>
        <td>{item.vendorСode}</td>
        <td>{item.barCode}</td>
        <td>{item.sku}</td>
        <td>{item.size}</td>
        <td>{item.category}</td>
        <td>{item.saleSum} р</td>
        <td>{item.quantity}</td>
        <td>{item.lessReturns}</td>
        <td>{item.costGoodsSold}</td>
        <td>{item.returnsSum}</td>
        <td>{item.returnsQuantity}</td>
        <td>{item.returnsCostSold}р</td>
        <td>{item.costPriceOne}</td>
        <td>{item.costOfProductStockToday}р</td>
        <td>{item.toClient}р</td>
        <td>{item.fromClient}р</td>
        <td>{item.commissionWB}р</td>
        <td>{item.fines}р</td>
        <td>{item.additionalpayment}р</td>
        <td>{item.serviceExpenses}р</td>
        <td>{item.toPayoff}р</td>
        <td>{item.marginalProfit}р</td>
        <td>{item.averageProfit}р</td>
        <td>{item.profitabilityOfProductsSold}%</td>
        <td>{item.marginal}%</td>
        <td>{item.annualReturnOnInventory}%</td>
        <td>{item.lostRevenue}р</td>
        <td>{item.byRevenue}</td>
        <td>{item.byProfit}</td>
        <td>{item.basic}р</td>
        <td>{item.maxDiscount}%</td>
        <td>{item.minDiscountPrice}р</td>
        <td>{item.orderQuantity}</td>
        <td>{item.orderSum}р</td>
        <td>{item.purchased}</td>
        <td>{item.notPurchased}</td>
        <td>{item.purchasedPrecent}%</td>
        <td>{item.completed}</td>
        <td>{item.orderCountDay}</td>
        <td>{item.slaeCountDay}</td>
        <td>{item.dataRadar}</td>
        <td>{item.dataWB}</td>
    </tr>
      ))}
        
    
    
  </table>

    </div>
  )
}


export default TableStock