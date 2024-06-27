import React from 'react'

const TableStock = () => {
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
      <th style={{borderTopLeftRadius:'8px', borderBottomLeftRadius:'8px'}}>Товар</th>
      <th>Бренд</th>
      <th>Артикул</th>
      <th>Баркод</th>
      <th>SKU</th>
      <th>Размер</th>
      <th>Категория</th>
      <th>Сумма</th>
      <th>Кол-во</th>
      <th>За вычетом возвратов</th>
      <th>Себестоимость проданных товаров</th>
      <th>Сумма</th>
      <th>Кол-во</th>
      <th>Себестоимость возвращенных товаров</th>
      <th>За еденицу</th>
      <th>Себестоимость товарного запроса(сегодня)</th>
      <th>К клиенту</th>
      <th>От клиента</th>
      <th>Комиссия WB</th>
      <th>Штрафы</th>
      <th>Доплаты</th>
      <th>Расходы услуг проверенного</th>
      <th>К выплоте</th>
      <th>Маржинальная прибыль</th>
      <th>Средняя прибыль</th>
      <th>Рентабельность реализованной продукции </th>
      <th>Маржинальность</th>
      <th>Годовая рентабельность товарных запасов</th>
      <th>Упущеная выручка</th>
      <th>По выручке</th>
      <th>По прибыли</th>
      <th>Базовая</th>
      <th>Макс. скидка</th>
      <th>Мин. цена со скидкой</th>
      <th>Кол-во</th>
      <th>Сумма</th>
      <th>Выкуплено</th>
      <th>Не выкуплено</th>
      <th>Процент выкупа</th>
      <th>Завершены</th>
      <th>Заказов, шт/день</th>
      <th>Продаж, р/день</th>
      <th>Данные Радар</th>
      <th>Данные Вайлдберриз</th>
    </tr>
    <tr> 
        <td style={{color: '#5329FF'}}>Назвние товара</td>
        <td>Название бренда</td>
        <td>000000</td>
        <td>2000662320049</td>
        <td>16367820</td>
        <td>0</td>
        <td>Красота</td>
        <td>34 377,28р</td>
        <td>134</td>
        <td>34 828,77</td>
        <td>16 828,77</td>
        <td>289,77</td>
        <td>0</td>
        <td>0,00р</td>
        <td>120</td>
        <td>0,00р</td>
        <td>4 933,00р</td>
        <td>333,00р</td>
        <td>3 933,00р</td>
        <td>0,00р</td>
        <td>0,00р</td>
        <td>322,00р</td>
        <td>25 332,00р</td>
        <td>9 322,00р</td>
        <td>81,00р</td>
        <td>60%</td>
        <td>29%</td>
        <td>1892,33%</td>
        <td>1892,33р</td>
        <td>А</td>
        <td>А</td>
        <td>505,33р</td>
        <td>73%</td>
        <td>122,33р</td>
        <td>12</td>
        <td>3 373,00р</td>
        <td>15</td>
        <td>2</td>
        <td>33,77%</td>
        <td>18</td>
        <td>0,66</td>
        <td>1 267,00</td>
        <td>65</td>
        <td>3</td>
    </tr>
    <tr> 
        <td style={{color: '#5329FF'}}>Назвние товара</td>
        <td>Название бренда</td>
        <td>000000</td>
        <td>2000662320049</td>
        <td>16367820</td>
        <td>0</td>
        <td>Красота</td>
        <td>34 377,28р</td>
        <td>134</td>
        <td>34 828,77</td>
        <td>16 828,77</td>
        <td>289,77</td>
        <td>0</td>
        <td>0,00р</td>
        <td>120</td>
        <td>0,00р</td>
        <td>4 933,00р</td>
        <td>333,00р</td>
        <td>3 933,00р</td>
        <td>0,00р</td>
        <td>0,00р</td>
        <td>322,00р</td>
        <td>25 332,00р</td>
        <td>9 322,00р</td>
        <td>81,00р</td>
        <td>60%</td>
        <td>29%</td>
        <td>1892,33%</td>
        <td>1892,33р</td>
        <td>А</td>
        <td>А</td>
        <td>505,33р</td>
        <td>73%</td>
        <td>122,33р</td>
        <td>12</td>
        <td>3 373,00р</td>
        <td>15</td>
        <td>2</td>
        <td>33,77%</td>
        <td>18</td>
        <td>0,66</td>
        <td>1 267,00</td>
        <td>65</td>
        <td>3</td>
    </tr>
    <tr> 
        <td style={{color: '#5329FF'}}>Назвние товара</td>
        <td>Название бренда</td>
        <td>000000</td>
        <td>2000662320049</td>
        <td>16367820</td>
        <td>0</td>
        <td>Красота</td>
        <td>34 377,28р</td>
        <td>134</td>
        <td>34 828,77</td>
        <td>16 828,77</td>
        <td>289,77</td>
        <td>0</td>
        <td>0,00р</td>
        <td>120</td>
        <td>0,00р</td>
        <td>4 933,00р</td>
        <td>333,00р</td>
        <td>3 933,00р</td>
        <td>0,00р</td>
        <td>0,00р</td>
        <td>322,00р</td>
        <td>25 332,00р</td>
        <td>9 322,00р</td>
        <td>81,00р</td>
        <td>60%</td>
        <td>29%</td>
        <td>1892,33%</td>
        <td>1892,33р</td>
        <td>А</td>
        <td>А</td>
        <td>505,33р</td>
        <td>73%</td>
        <td>122,33р</td>
        <td>12</td>
        <td>3 373,00р</td>
        <td>15</td>
        <td>2</td>
        <td>33,77%</td>
        <td>18</td>
        <td>0,66</td>
        <td>1 267,00</td>
        <td>65</td>
        <td>3</td>
    </tr>
    
  </table>

    </div>
  )
}

export default TableStock