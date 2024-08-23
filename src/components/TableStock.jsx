import React, { useState } from 'react';
import sortArrow from '../assets/sortarrow.svg';
import ArrowUp from '../assets/ArrowUp.svg';
import ArrowDown from '../assets/ArrowDown.svg';
import sortByIcon from '../pages/images/sortByIcon.svg';

const TableStock = ({ dataTable, setDataTable }) => {
  console.log(dataTable, 'dataTable');
  const [asc, setAsc] = useState(true);
  const sortData = (key) => {
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
    return setDataTable(sortedData);
  };

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
    <div class=' dash-container scrollable-table table-content '>
      <table className='table'>
        <tr style={{ fontSize: '24px', fontWeight: '700', lineHeight: '30px', padding: '6.5px 0 8.5px 0' }}>
          <th colspan='7' className='about-product-title'>О товаре</th>
          <th colspan='4' className='sells-title'>
            Продажи
          </th>
          <th className='returns-title' colspan='3'>
            Возвраты
          </th>
          <th className='cost-title' colspan='2'>
            Себестоимость
          </th>
          <th className='logistics-title' colspan='2'>
            Логистика
          </th>
          <th className='other-title' colspan='4'>
            Прочие расходы
          </th>
          <th className='profit-title' colspan='7'>
            Прибыль
          </th>
          <th className='abc-title' colspan='2'>
            АВС анализ
          </th>
          <th className='price-title' colspan='3'>
            Цена
          </th>
          <th className='orders-title' colspan='2'>
            Заказы
          </th>
          <th className='purchase-title' colspan='4'>
            Выкуп
          </th>
          <th className='speed-title' colspan='2'>
            Скорость
          </th>
          <th className='left-title' colspan='2'>
            Остаток
          </th>
        </tr>
        <tr className='table-header'>
          <th
            style={{
              borderTopLeftRadius: '8px',
              borderBottomLeftRadius: '8px',
              width: '200px',
            }}
            className='table-header-item-product'
          >
            Товар
            <div
              className='icon-sort-wrap'
              onClick={(e) => {
                toggleRotate(e.currentTarget);
                sortData('productName');
              }}
              style={{ background: 'transparent' }}
            >
              <img src={sortByIcon} alt='sort by' />
              {/* <img className='icon-sort icon-sort-up' src={ArrowUp} alt='' />
              <img
                className='icon-sort icon-sort-down'
                src={ArrowDown}
                alt=''
              /> */}
            </div>
          </th>
          <th>
            Бренд
            <img onClick={() => sortData('brandName')} src={sortByIcon} alt='brand' style={{ background: 'transparent' }}/>
          </th>
          <th>
            Артикул
            <img
              onClick={() => sortData('vendorСode')}
              src={sortByIcon}
              alt='article'
              style={{ background: 'transparent' }}
            />
          </th>
          <th>
            Баркод
            <img onClick={() => sortData('barCode')} src={sortByIcon} alt='barcode' style={{ background: 'transparent' }}/>
          </th>
          <th>
            SKU
            <img onClick={() => sortData('sku')} src={sortByIcon} alt='sku' style={{ background: 'transparent' }}/>
          </th>
          <th>
            Размер
            <img onClick={() => sortData('size')} src={sortByIcon} alt='size' style={{ background: 'transparent' }}/>
          </th>
          <th>
            Категория
            <img onClick={() => sortData('category')} src={sortByIcon} alt='category' style={{ background: 'transparent' }}/>
          </th>
          <th style={{}}>
            Сумма
            <img onClick={() => sortData('saleSum')} src={sortByIcon} alt='sum' style={{ background: 'transparent' }}/>
          </th>
          <th>
            Кол-во
            <img onClick={() => sortData('quantity')} src={sortByIcon} alt='quantity' style={{ background: 'transparent' }}/>
          </th>
          <th>
            За вычетом возвратов
            <img
              onClick={() => sortData('lessReturns')}
              src={sortByIcon}
              alt='minus-returns'
              style={{ background: 'transparent' }}
            />
          </th>
          <th>Себестоимость проданных<br/> товаров</th>
          <th>
            Сумма
            <img
              onClick={() => sortData('returnsSum')}
              src={sortByIcon}
              alt='returned-sum'
              style={{ background: 'transparent' }}
            />
          </th>
          <th>
            Кол-во
            <img
              onClick={() => sortData('returnsQuantity')}
              src={sortByIcon}
              alt='quantity'
              style={{ background: 'transparent' }}
            />
          </th>
          <th>Себестоимость возвращенных товаров</th>
          <th>
            За еденицу
            <img
              onClick={() => sortData('costPriceOne')}
              src={sortByIcon}
              alt='for a single unit'
              style={{ background: 'transparent' }}
            />
          </th>
          <th>Себестоимость товарного запаса(сегодня)</th>
          <th>
            К клиенту
            <img onClick={() => sortData('toClient')} src={sortByIcon} alt='goods for today' style={{ background: 'transparent' }}/>
          </th>
          <th>
            От клиента
            <img
              onClick={() => sortData('fromClient')}
              src={sortByIcon}
              alt='from a client'
              style={{ background: 'transparent' }}
            />
          </th>
          <th>
            Комиссия WB
            <img
              onClick={() => sortData('commissionWB')}
              src={sortByIcon}
              alt='commission'
              style={{ background: 'transparent' }}
            />
          </th>
          <th>
            Штрафы
            <img onClick={() => sortData('fines')} src={sortByIcon} alt='fines' style={{ background: 'transparent' }}/>
          </th>
          <th>
            Доплаты
            <img
              onClick={() => sortData('additionalpayment')}
              src={sortByIcon}
              alt='additional payments'
              style={{ background: 'transparent' }}
            />
          </th>
          <th>
            Расходы услуг проверенного
            <img
              onClick={() => sortData('serviceExpenses')}
              src={sortByIcon}
              alt='service expenses'
              style={{ background: 'transparent' }}
            />
          </th>
          <th>
            К выплоте
            <img onClick={() => sortData('toPayoff')} src={sortByIcon} alt='to pay off' style={{ background: 'transparent' }}/>
          </th>
          <th>Маржинальная прибыль</th>
          <th>Средняя прибыль</th>
          <th>Рентабельность реализованной продукции</th>
          <th>Маржинальность</th>
          <th>Годовая рентабельность товарных запасов</th>
          <th>Упущеная выручка</th>
          <th>
            По <br/> выручке
            <img onClick={() => sortData('byRevenue')} src={sortByIcon} alt='be revenue' style={{ background: 'transparent' }}/>
          </th>
          <th>
            По<br/>  прибыли
            <img onClick={() => sortData('byProfit')} src={sortByIcon} alt='by profit' style={{ background: 'transparent' }}/>
          </th>
          <th>
            Базовая
            <img onClick={() => sortData('basic')} src={sortByIcon} alt='basic' style={{ background: 'transparent' }}/>
          </th>
          <th>
            Макс. скидка
            <img
              onClick={() => sortData('maxDiscount')}
              src={sortByIcon}
              alt='max discount'
              style={{ background: 'transparent' }}
            />
          </th>
          <th>
            Мин. цена со скидкой
            <img
              onClick={() => sortData('minDiscountPrice')}
              src={sortByIcon}
              alt='minimum price with discount'
              style={{ background: 'transparent' }}
            />
          </th>
          <th>
            Кол-во
            <img
              onClick={() => sortData('orderQuantity')}
              src={sortByIcon}
              alt='quantity'
              style={{ background: 'transparent' }}
            />
          </th>
          <th>
            Сумма
            <img onClick={() => sortData('orderSum')} src={sortByIcon} alt='sum' style={{ background: 'transparent' }}/>
          </th>
          <th>
            Выкуплено
            <img onClick={() => sortData('purchased')} src={sortByIcon} alt='purchased' style={{ background: 'transparent' }}/>
          </th>
          <th>
            Не выкуплено
            <img
              onClick={() => sortData('notPurchased')}
              src={sortByIcon}
              alt='not purchased'
              style={{ background: 'transparent' }}
            />
          </th>
          <th>
            Процент<br /> выкупа
            <img
              onClick={() => sortData('purchasedPrecent')}
              src={sortByIcon}
              alt='purchased precent'
              style={{ background: 'transparent' }}
            />
          </th>
          <th>
            Завершены
            <img onClick={() => sortData('completed')} src={sortByIcon} alt='closed' style={{ background: 'transparent' }}/>
          </th>
          <th>Заказов, шт/день</th>
          <th>Продаж, р/день</th>
          <th>Остаток</th>
        </tr>

        {Array.isArray(dataTable) &&dataTable?.map((item, i) => (
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
            <td>{item.slaeCountDay}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default TableStock;
